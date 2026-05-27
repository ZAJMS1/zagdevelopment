import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getTransporter, mailConfig, renderContactEmail } from "@/lib/mail";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please share your name.").max(120),
  email: z.string().trim().email("That doesn't look like a valid email."),
  business: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least a sentence or two.")
    .max(5000),
  // Honeypot - bots will fill this; humans won't see it.
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = checkRateLimit(`contact:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: firstIssue?.message ?? "Please check the form and try again.",
        field: firstIssue?.path?.[0],
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!mailConfig.from || !mailConfig.to) {
    console.error("Mail config missing 'from' or 'to'.");
    return NextResponse.json(
      { ok: false, error: "Email isn't configured on the server yet. Please email us directly." },
      { status: 500 },
    );
  }

  try {
    const transporter = getTransporter();
    const { html, text } = renderContactEmail({
      name: data.name,
      email: data.email,
      business: data.business || undefined,
      phone: data.phone || undefined,
      budget: data.budget || undefined,
      message: data.message,
    });

    await transporter.sendMail({
      from: `ZAG Website <${mailConfig.from}>`,
      to: mailConfig.to,
      replyTo: `${data.name} <${data.email}>`,
      subject: `New inquiry from ${data.name}${data.business ? ` (${data.business})` : ""}`,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
