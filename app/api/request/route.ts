import { NextResponse } from "next/server";
import { Resend } from "resend";

interface RequestFormPayload {
  route: string;
  name: string;
  phone: string;
  message: string;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "";
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";

// In-memory sliding-window rate limit (per IP). No Redis — resets on restart.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_KEYS = 10_000;
const rateLimitHits = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(request: Request): number | null {
  const now = Date.now();
  const ip = getClientIp(request);
  const hits = (rateLimitHits.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(ip, hits);
    const oldest = Math.min(...hits);
    return Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
  }

  hits.push(now);
  rateLimitHits.set(ip, hits);

  if (rateLimitHits.size > RATE_LIMIT_MAX_KEYS) {
    for (const [key, timestamps] of rateLimitHits) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitHits.delete(key);
      }
    }
  }

  return null;
}

function buildEmailHtml(payload: RequestFormPayload) {
  const rows = [
    ["Route", payload.route],
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Message", payload.message],
  ];

  const cells = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;width:160px;font-weight:600;color:#0f2e3d;background:#f4efe5;border-bottom:1px solid #e4dbc8;">${label}</td>
          <td style="padding:10px 16px;color:#2a2a2a;border-bottom:1px solid #e4dbc8;white-space:pre-wrap;">${value}</td>
        </tr>`,
    )
    .join("");

  return `
    <div dir="auto" style="font-family:Arial,Helvetica,sans-serif;background:#faf7f0;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4dbc8;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;background:#0f2e3d;">
          <h1 style="margin:0;font-size:18px;color:#c9a227;">New request — Masarrah HR</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">${cells}</table>
        <div style="padding:16px 24px;font-size:12px;color:#8a8578;">
          Sent from the Masarrah HR request form.
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  const retryAfter = isRateLimited(request);
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: "Too many requests, please try again shortly" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let payload: RequestFormPayload;

  try {
    payload = (await request.json()) as RequestFormPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { route, name, phone, message } = payload;

  if (!route || !name || !phone || !message) {
    return NextResponse.json(
      { error: "All fields are required: route, name, phone, message" },
      { status: 400 },
    );
  }

  if (!ADMIN_EMAIL || !EMAIL_FROM || !RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Server email configuration is missing" },
      { status: 500 },
    );
  }

  const emailContent = buildEmailHtml({ route, name, phone, message });
  const subject = `Masarrah HR recruitment request — ${route}`;

  const resend = new Resend(RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [ADMIN_EMAIL],
    subject,
    html: emailContent,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send the request email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}