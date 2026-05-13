import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Utilities ─────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Rate Limiting (In-Memory) ─────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(request: NextRequest): boolean {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const limit = 5;
  const windowMs = 10 * 60 * 1000;

  const rateData = rateLimitMap.get(ip);

  if (!rateData || now > rateData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (rateData.count >= limit) {
    return true;
  }

  rateData.count++;
  return false;
}

// ── Types ─────────────────────────────────────────────────────────────────

type ContactSource = "inquiry" | "quote" | "audit";

interface ContactPayload {
  source: ContactSource;
  name: string;
  email: string;
  phone?: string;
  product?: string;
  message?: string;
  pumpIds?: string[];
  notes?: string;
  requirements?: string[];
}

// ── Validation ────────────────────────────────────────────────────────────

function validatePayload(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body.");
  }

  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const source = typeof b.source === "string" ? b.source : "";

  if (!name) throw new Error("Name is required.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("A valid email address is required.");
  }
  if (!["inquiry", "quote", "audit"].includes(source)) {
    throw new Error("Unknown form source.");
  }

  return {
    source: source as ContactSource,
    name,
    email,
    phone: typeof b.phone === "string" ? b.phone.trim() : undefined,
    product: typeof b.product === "string" ? b.product.trim() : undefined,
    message: typeof b.message === "string" ? b.message.trim() : undefined,
    pumpIds: Array.isArray(b.pumpIds)
      ? (b.pumpIds as unknown[]).filter((v): v is string => typeof v === "string")
      : undefined,
    notes: typeof b.notes === "string" ? b.notes.trim() : undefined,
    requirements: Array.isArray(b.requirements)
      ? (b.requirements as unknown[]).filter((v): v is string => typeof v === "string")
      : undefined,
  };
}

// ── Email Templates ───────────────────────────────────────────────────────

function buildHtml(payload: ContactPayload, inquiryId: string, subject: string): string {
  const sourceLabel = payload.source.charAt(0).toUpperCase() + payload.source.slice(1);

  const sourceColors: Record<ContactSource, string> = {
    inquiry: "#0f3d91",
    quote: "#2fa84f",
    audit: "#ea580c",
  };

  const headerBg = sourceColors[payload.source];

  const rows: Array<[string, string | undefined]> = [
    ["Inquiry ID", `<span style="white-space:nowrap;font-weight:700;">${escapeHtml(inquiryId)}</span>`],
    ["Source", escapeHtml(payload.source)],
    ["Name / Company", escapeHtml(payload.name)],
    ["Email", escapeHtml(payload.email)],
    ["Phone", payload.phone ? escapeHtml(payload.phone) : undefined],
    ["Product Interest", payload.product ? escapeHtml(payload.product) : undefined],
    ["Pump Model IDs", payload.pumpIds?.map(escapeHtml).join(", ")],
    ["Operating Notes", payload.notes ? escapeHtml(payload.notes) : undefined],
    ["Service Requirements", payload.requirements?.map(escapeHtml).join(", ")],
    ["Message", payload.message ? escapeHtml(payload.message) : undefined],
  ];

  const filteredRows = rows.filter(([, v]) => v);

  const tableRows = filteredRows
    .map(([label, value], index) => {
      const isLast = index === filteredRows.length - 1;
      const borderStyle = isLast ? "none" : "1px solid #e5e7eb";
      return `
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#0f3d91;white-space:nowrap;vertical-align:top;border-bottom:${borderStyle};line-height:1.6;">${label}</td>
          <td style="padding:12px 16px;color:#0f172a;vertical-align:top;border-bottom:${borderStyle};line-height:1.6;">${value}</td>
        </tr>`;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 12px;">
        <tr><td align="center">
          <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <!-- Logo Header -->
            <tr>
              <td align="center" style="background:#0f172a;padding:24px 32px;">
                <img src="https://flowcoresolutions.in/assets/logos/flowcore-logo-horizontal.png" alt="FlowCore Solutions" height="64" style="display:block;max-width:220px;width:auto;border:0;" />
              </td>
            </tr>
            <!-- Dynamic Branding Header -->
            <tr>
              <td style="background:${headerBg};padding:28px 32px;">
                <p style="margin:0;color:#ffffff;opacity:0.75;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;">FlowCore Solutions — ${escapeHtml(sourceLabel)}</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:800;">${escapeHtml(subject)}</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:28px 24px;">
                <h2 style="margin:0 0 20px;color:#0f172a;font-size:18px;font-weight:700;">Inquiry Details from ${escapeHtml(payload.name)}</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
                  ${tableRows}
                </table>
                <hr style="border:0;border-top:1px solid #e5e7eb;margin:28px 0;">
                <p style="margin:0;font-size:12px;color:#94a3b8;">
                  Submitted at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST via
                  <a href="https://flowcoresolutions.in" style="color:#1e5bb8;text-decoration:none;">flowcoresolutions.in</a>
                </p>
                <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">
                  <strong style="color:#0f3d91;">FlowCore Solutions</strong> &middot; Bangalore, Karnataka<br>
                  Authorized Berlington Pump Dealer &middot; Advanced Hydraulic Systems &middot; Flowchar WTP Chemicals
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

function buildAutoReplyHtml(name: string, inquiryId: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 12px;">
        <tr><td align="center">
          <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <!-- Logo Header -->
            <tr>
              <td align="center" style="background:#0f172a;padding:24px 32px;">
                <img src="https://flowcoresolutions.in/assets/logos/flowcore-logo-horizontal.png" alt="FlowCore Solutions" height="64" style="display:block;max-width:220px;width:auto;border:0;" />
              </td>
            </tr>
            <!-- Blue Branding Header -->
            <tr>
              <td style="background:#0f3d91;padding:28px 32px;">
                <p style="margin:0;color:#4da3ff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;">FlowCore Solutions</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:800;">We received your inquiry</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:28px 24px;">
                <p style="margin:0;font-size:16px;color:#0f172a;">Hi <strong>${escapeHtml(name)}</strong>,</p>
                <p style="margin:16px 0;font-size:15px;line-height:1.7;color:#475569;">
                  Thank you for reaching out to FlowCore Solutions. Our engineering team has received your submission and will respond within <strong>1 business day</strong>.
                </p>
                <p style="margin:16px 0;font-size:15px;line-height:1.7;color:#0f3d91;">
                  Your Inquiry ID: <span style="white-space:nowrap;font-weight:700;">${escapeHtml(inquiryId)}</span>
                </p>
                <p style="margin:16px 0;font-size:15px;line-height:1.7;color:#475569;">
                  In the meantime, feel free to explore our industrial solutions:
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                  <tr>
                    <td style="padding-bottom:12px;">
                      <a href="https://flowcoresolutions.in/products" style="display:block;background:#1e5bb8;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;text-align:center;box-shadow:0 4px 12px rgba(30,91,184,0.2);">Full Pump Catalogue</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://flowcoresolutions.in/applications" style="display:block;background:#0f3d91;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;text-align:center;box-shadow:0 4px 12px rgba(15,61,145,0.2);">System Applications</a>
                    </td>
                  </tr>
                </table>
                <hr style="border:0;border-top:1px solid #e5e7eb;margin:32px 0;">
                <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
                  <strong style="color:#0f3d91;">FlowCore Solutions</strong><br>
                  Bangalore, Karnataka &middot; Authorized Berlington Pump Dealer<br>
                  Advanced Hydraulic Systems &middot; Flowchar WTP Chemicals<br>
                  <a href="https://flowcoresolutions.in" style="color:#1e5bb8;text-decoration:none;">flowcoresolutions.in</a>
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

// ── Route Handler ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // 1. Rate limit check (fast exit)
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 3. Validate
  let payload: ContactPayload;
  try {
    payload = validatePayload(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Validation failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // 4. Send emails
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const contactEmail = process.env.CONTACT_EMAIL ?? "info@flowcoresolutions.in";
    const inquiryId = `FC-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const sourceLabel = payload.source.charAt(0).toUpperCase() + payload.source.slice(1);
    const subject = `[FlowCore] New ${sourceLabel} Request from ${payload.name}`;

    // Admin notification
    await resend.emails.send({
      from: "FlowCore Website <noreply@flowcoresolutions.in>",
      to: contactEmail,
      subject: subject,
      html: buildHtml(payload, inquiryId, subject),
      replyTo: payload.email,
    });

    // Customer auto-reply
    await resend.emails.send({
      from: "FlowCore Solutions <noreply@flowcoresolutions.in>",
      to: payload.email,
      subject: "We received your inquiry — FlowCore Solutions",
      html: buildAutoReplyHtml(payload.name, inquiryId),
    });
  } catch (err) {
    console.error("[/api/contact] Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// Reject non-POST methods
export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
