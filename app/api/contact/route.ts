import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Types ─────────────────────────────────────────────────────────────────

type ContactSource = "inquiry" | "quote" | "audit";

interface ContactPayload {
  source: ContactSource;
  // Shared
  name: string;
  email: string;
  // Inquiry (ContactClient)
  phone?: string;
  product?: string;
  message?: string;
  // Quote (QuoteModal)
  pumpIds?: string[];
  notes?: string;
  // Audit (TechnicalServices)
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

// ── Email templates ───────────────────────────────────────────────────────

function buildSubject(payload: ContactPayload): string {
  const labels: Record<ContactSource, string> = {
    inquiry: "New Industrial Inquiry",
    quote: "New Quote Request",
    audit: "New System Audit Request",
  };
  return `[FlowCore] ${labels[payload.source]} — ${payload.name}`;
}

function buildHtml(payload: ContactPayload): string {
  const rows: Array<[string, string | undefined]> = [
    ["Source", payload.source],
    ["Name / Company", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Product Interest", payload.product],
    ["Pump Model IDs", payload.pumpIds?.join(", ")],
    ["Operating Notes", payload.notes],
    ["Service Requirements", payload.requirements?.join(", ")],
    ["Message", payload.message],
  ];

  const tableRows = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#0f3d91;white-space:nowrap;vertical-align:top;border-bottom:1px solid #e5e7eb;">${label}</td>
          <td style="padding:8px 12px;color:#0f172a;vertical-align:top;border-bottom:1px solid #e5e7eb;">${value}</td>
        </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
        <tr><td align="center">
          <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <!-- Header -->
            <tr>
              <td style="background:#0f3d91;padding:28px 32px;">
                <p style="margin:0;color:#4da3ff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;">FlowCore Solutions</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:800;">${buildSubject(payload)}</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:28px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
                  ${tableRows}
                </table>
                <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">
                  Submitted at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST via flowcoresolutions.in
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

function buildAutoReplyHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
        <tr><td align="center">
          <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <tr>
              <td style="background:#0f3d91;padding:28px 32px;">
                <p style="margin:0;color:#4da3ff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;">FlowCore Solutions</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:800;">We received your inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0;font-size:16px;color:#0f172a;">Hi <strong>${name}</strong>,</p>
                <p style="margin:16px 0;font-size:15px;line-height:1.7;color:#475569;">
                  Thank you for reaching out to FlowCore Solutions. Our engineering team has received your submission and will respond within <strong>1 business day</strong>.
                </p>
                <p style="margin:16px 0;font-size:15px;line-height:1.7;color:#475569;">
                  In the meantime, feel free to browse our <a href="https://flowcoresolutions.in/products" style="color:#1e5bb8;">full pump catalogue</a> or learn more about our <a href="https://flowcoresolutions.in/applications" style="color:#1e5bb8;">system applications</a>.
                </p>
                <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;">
                  FlowCore Solutions · Bangalore, Karnataka<br>
                  Authorized Berlington Pump Dealer · Flowchar WTP Chemicals
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

// ── Transporter ───────────────────────────────────────────────────────────

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 2. Validate
  let payload: ContactPayload;
  try {
    payload = validatePayload(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Validation failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // 3. Send email
  try {
    const transporter = createTransporter();
    const contactEmail = process.env.CONTACT_EMAIL ?? process.env.GMAIL_USER;

    await transporter.sendMail({
      from: `"FlowCore Website" <${process.env.GMAIL_USER}>`,
      to: contactEmail,
      subject: buildSubject(payload),
      html: buildHtml(payload),
      replyTo: payload.email,
    });

    // Auto-reply to submitter
    await transporter.sendMail({
      from: `"FlowCore Solutions" <${process.env.GMAIL_USER}>`,
      to: payload.email,
      subject: "We received your inquiry — FlowCore Solutions",
      html: buildAutoReplyHtml(payload.name),
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

// Reject non-POST methods explicitly
export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
