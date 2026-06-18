import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

interface SourceTheme {
  label: string;
  accent: string;
  accentSoft: string;
  eyebrow: string;
  summary: string;
}

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

function getSourceTheme(source: ContactSource): SourceTheme {
  const themes: Record<ContactSource, SourceTheme> = {
    inquiry: {
      label: "General Inquiry",
      accent: "#0f5bd8",
      accentSoft: "#dbeafe",
      eyebrow: "Commercial contact",
      summary: "A new website inquiry is ready for review.",
    },
    quote: {
      label: "Quote Request",
      accent: "#0f9f6e",
      accentSoft: "#d1fae5",
      eyebrow: "Sales pipeline",
      summary: "A prospect has submitted a quote-oriented request.",
    },
    audit: {
      label: "System Audit",
      accent: "#ea580c",
      accentSoft: "#ffedd5",
      eyebrow: "Technical review",
      summary: "A customer is asking for an operational assessment.",
    },
  };

  return themes[source];
}

function buildEmailShell(content: string, previewText: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title>${escapeHtml(previewText)}</title>
      <style>
        @media only screen and (max-width: 640px) {
          .shell {
            padding: 0 !important;
          }

          .card {
            border-radius: 22px !important;
          }

          .hero-pad {
            padding: 24px 18px 20px !important;
          }

          .body-pad {
            padding: 20px 18px 24px !important;
          }

          .hero-radius {
            border-radius: 22px 22px 0 0 !important;
          }

          .stack-col,
          .stack-col td {
            display: block !important;
            width: 100% !important;
          }

          .stack-col td {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .mobile-tight {
            padding-bottom: 10px !important;
          }

          .hero-copy {
            max-width: none !important;
          }

          .hero-title {
            font-size: 24px !important;
          }

          .ref-card {
            margin: 12px 0 18px !important;
            background: transparent !important;
            border: 0 !important;
            border-top: 1px solid #2b3442 !important;
            border-bottom: 1px solid #2b3442 !important;
            border-left: 0 !important;
            border-radius: 0 !important;
          }

          .ref-label {
            padding: 10px 0 2px !important;
            font-size: 9px !important;
          }

          .ref-value {
            padding: 0 0 10px !important;
            font-size: 14px !important;
            letter-spacing: 0.02em !important;
          }

          .button-row,
          .button-row tbody,
          .button-row tr,
          .button-row td {
            display: block !important;
            width: 100% !important;
          }

          .button-spacer {
            height: 10px !important;
            line-height: 10px !important;
          }

          .button-cell {
            padding: 0 !important;
          }

          .button-link {
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background:#f3f6fb;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">
      <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
        ${escapeHtml(previewText)}
      </div>
      <table class="shell" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f3f6fb;margin:0;padding:20px 10px 32px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;">
              ${content}
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function buildHtml(payload: ContactPayload, inquiryId: string, subject: string): string {
  const sourceTheme = getSourceTheme(payload.source);
  const sourceLabel = sourceTheme.label;
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const rows: Array<[string, string | undefined]> = [
    ["Inquiry ID", `<span style="white-space:nowrap;font-weight:700;">${escapeHtml(inquiryId)}</span>`],
    ["Source", escapeHtml(sourceLabel)],
    ["Name / Company", escapeHtml(payload.name)],
    ["Email", escapeHtml(payload.email)],
    ["Phone", payload.phone ? escapeHtml(payload.phone) : undefined],
    ["Product Interest", payload.product ? escapeHtml(payload.product) : undefined],
    ["Pump Model IDs", payload.pumpIds?.map(escapeHtml).join(", ")],
    ["Operating Notes", payload.notes ? escapeHtml(payload.notes) : undefined],
    ["Service Requirements", payload.requirements?.map(escapeHtml).join(", ")],
    ["Message", payload.message ? escapeHtml(payload.message) : undefined],
  ];

  const filteredRows = rows.filter(([, value]) => value);

  const tableRows = filteredRows
    .map(([label, value], index) => {
      const isLast = index === filteredRows.length - 1;
      const borderStyle = isLast ? "none" : "1px solid #d9e2ec";
      return `
        <tr>
          <td style="padding:14px 16px;font-weight:700;color:#334155;white-space:nowrap;vertical-align:top;border-bottom:${borderStyle};line-height:1.6;text-transform:uppercase;font-size:11px;letter-spacing:0.08em;">${label}</td>
          <td style="padding:14px 16px;color:#0f172a;vertical-align:top;border-bottom:${borderStyle};line-height:1.7;font-size:14px;">${value}</td>
        </tr>`;
    })
    .join("");

  return buildEmailShell(
    `
      <tr>
        <td style="padding-bottom:14px;">
          <table class="card" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0b1220;border-radius:28px;overflow:hidden;">
            <tr>
              <td class="hero-pad" style="padding:30px 24px 22px;background:radial-gradient(circle at top right, rgba(77,163,255,0.18), transparent 34%), linear-gradient(135deg, #09101d 0%, #0f3d91 58%, #16243b 100%);">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td>
                      <div style="display:inline-block;background:${sourceTheme.accentSoft};color:${sourceTheme.accent};padding:8px 12px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
                        ${escapeHtml(sourceTheme.eyebrow)}
                      </div>
                      <h1 class="hero-title" style="margin:18px 0 10px;font-size:30px;line-height:1.15;color:#f8fafc;font-weight:800;">
                        ${escapeHtml(subject)}
                      </h1>
                      <p class="hero-copy" style="margin:0;max-width:420px;font-size:15px;line-height:1.7;color:#cbd5e1;">
                        ${escapeHtml(sourceTheme.summary)}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="card" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border:1px solid #d9e2ec;border-radius:28px;overflow:hidden;box-shadow:0 22px 60px rgba(15, 23, 42, 0.08);">
            <tr>
              <td class="body-pad" style="padding:26px 24px 10px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="mobile-tight" style="padding:0 0 18px;">
                      <table class="stack-col" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="padding:0 8px 12px 0;vertical-align:top;">
                            <div style="background:#f8fafc;border:1px solid #d9e2ec;border-radius:20px;padding:18px 16px;">
                              <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;font-weight:700;padding-bottom:8px;">Contact</div>
                              <div style="font-size:22px;line-height:1.2;color:#0f172a;font-weight:800;">${escapeHtml(payload.name)}</div>
                              <div style="padding-top:8px;font-size:14px;line-height:1.7;color:#475569;">${escapeHtml(payload.email)}</div>
                              ${payload.phone ? `<div style="font-size:14px;line-height:1.7;color:#475569;">${escapeHtml(payload.phone)}</div>` : ""}
                            </div>
                          </td>
                          <td style="padding:0 0 12px 8px;vertical-align:top;">
                            <div style="background:${sourceTheme.accentSoft};border-radius:20px;padding:18px 16px;">
                              <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${sourceTheme.accent};font-weight:700;padding-bottom:8px;">Inquiry Reference</div>
                              <div style="font-size:22px;line-height:1.2;color:#0f172a;font-weight:800;white-space:nowrap;">${escapeHtml(inquiryId)}</div>
                              <div style="padding-top:8px;font-size:14px;line-height:1.7;color:#475569;">${escapeHtml(sourceLabel)}</div>
                              <div style="font-size:14px;line-height:1.7;color:#475569;">${escapeHtml(submittedAt)} IST</div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:22px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #d9e2ec;border-radius:20px;overflow:hidden;">
                        ${tableRows}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:22px 0 0;border-top:1px solid #d9e2ec;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="font-size:12px;line-height:1.8;color:#64748b;">
                            Submitted from <a href="https://flowcoresolutions.in" style="color:${sourceTheme.accent};text-decoration:none;font-weight:700;">flowcoresolutions.in</a> and delivered to the FlowCore commercial desk.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top:10px;font-size:12px;line-height:1.8;color:#94a3b8;">
                            FlowCore Solutions | Bangalore, Karnataka | Industrial Pumps | Water Treatment Support
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `,
    `${sourceLabel} from ${payload.name} is ready for review.`
  );
}

function buildAutoReplyHtml(name: string, inquiryId: string): string {
  return buildEmailShell(
    `
      <tr>
        <td>
          <table class="card" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:30px;overflow:hidden;border:1px solid #d9e2ec;box-shadow:0 24px 64px rgba(15, 23, 42, 0.08);">
            <tr>
              <td class="hero-pad hero-radius" style="padding:24px 24px 30px;background:radial-gradient(circle at top right, rgba(77,163,255,0.16), transparent 34%), linear-gradient(135deg,#08101d 0%,#0f3d91 56%,#163270 100%);">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td>
                      <div style="display:inline-block;padding:7px 12px;border-radius:999px;background:rgba(255,255,255,0.12);color:#dbeafe;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
                        Inquiry received
                      </div>
                      <h1 class="hero-title" style="margin:16px 0 10px;color:#f8fafc;font-size:28px;line-height:1.18;font-weight:800;">
                        We received your inquiry.
                      </h1>
                      <p class="hero-copy" style="margin:0;max-width:470px;color:#dbe6f5;font-size:15px;line-height:1.8;">
                        Thank you for reaching out to FlowCore Solutions.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="body-pad" style="padding:26px 24px 30px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#0f172a;">
                  Hi <strong>${escapeHtml(name)}</strong>,
                </p>
                <p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#475569;">
                  Thank you for contacting FlowCore Solutions. We have received your message and will reply within <strong>1 business day</strong>.
                </p>
                <table class="ref-card" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:18px 0 22px;background:transparent;border-top:1px solid #dbe5f1;border-bottom:1px solid #dbe5f1;">
                  <tr>
                    <td class="ref-label" style="padding:10px 0 2px;font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">
                      Reference ID
                    </td>
                  </tr>
                  <tr>
                    <td class="ref-value" style="padding:0 0 10px;font-size:15px;line-height:1.2;color:#0f172a;font-weight:700;white-space:nowrap;">
                      ${escapeHtml(inquiryId)}
                    </td>
                  </tr>
                </table>
                <table class="button-row" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
                  <tr>
                    <td class="button-cell" style="width:50%;padding:0 6px 0 0;">
                      <a class="button-link" href="https://flowcoresolutions.in/products" style="display:block;width:100%;box-sizing:border-box;text-align:center;text-decoration:none;background:#1e5bb8;color:#ffffff;padding:15px 20px;border-radius:16px;font-size:14px;font-weight:700;">
                        Explore Pump Catalogue
                      </a>
                    </td>
                    <td class="button-spacer" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                    <td class="button-cell" style="width:50%;padding:0 0 0 6px;">
                      <a class="button-link" href="https://flowcoresolutions.in/applications" style="display:block;width:100%;box-sizing:border-box;text-align:center;text-decoration:none;background:#2fa84f;color:#ffffff;padding:15px 20px;border-radius:16px;font-size:14px;font-weight:700;">
                        View Application Solutions
                      </a>
                    </td>
                  </tr>
                </table>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid #d9e2ec;">
                  <tr>
                    <td style="padding-top:18px;font-size:13px;line-height:1.8;color:#64748b;">
                      FlowCore Solutions | Bangalore, Karnataka<br>
                      Industrial Pumps | Water Treatment Support<br>
                      <a href="https://flowcoresolutions.in" style="color:#0f5bd8;text-decoration:none;font-weight:700;">flowcoresolutions.in</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `,
    `FlowCore received your inquiry ${inquiryId}.`
  );
}

export async function POST(request: NextRequest) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = validatePayload(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Validation failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const contactEmail = process.env.CONTACT_EMAIL ?? "info@flowcoresolutions.in";
    const inquiryId = `FC-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const sourceLabel = payload.source.charAt(0).toUpperCase() + payload.source.slice(1);
    const subject = `New ${sourceLabel} Inquiry from ${payload.name}`;

    await resend.emails.send({
      from: "FlowCore Website <noreply@flowcoresolutions.in>",
      to: contactEmail,
      cc: process.env.CC_EMAIL ? [process.env.CC_EMAIL] : undefined,
      subject,
      html: buildHtml(payload, inquiryId, subject),
      replyTo: payload.email,
    });

    await resend.emails.send({
      from: "FlowCore Solutions <noreply@flowcoresolutions.in>",
      to: payload.email,
      subject: "We received your inquiry - FlowCore Solutions",
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

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
