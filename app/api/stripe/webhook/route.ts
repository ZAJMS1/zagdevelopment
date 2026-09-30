import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getTransporter, mailConfig, renderDepositEmail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Missing required environment variable: STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Signature verification needs the raw, unparsed body.
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("Stripe webhook signature check failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // Card payments are paid on completion; bank debits (e.g. ACH) confirm
  // later via async_payment_succeeded.
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      await notifyDeposit(session);
    }
  }

  return NextResponse.json({ received: true });
}

async function notifyDeposit(session: Stripe.Checkout.Session) {
  if (!mailConfig.from || !mailConfig.to) {
    console.error("Mail config missing 'from' or 'to'; skipping deposit email.");
    return;
  }

  const details = session.customer_details;
  const amount = ((session.amount_total ?? 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: (session.currency ?? "usd").toUpperCase(),
  });

  try {
    const { html, text } = renderDepositEmail({
      name: details?.name ?? undefined,
      email: details?.email ?? undefined,
      phone: details?.phone ?? undefined,
      amount,
      sessionId: session.id,
    });

    await getTransporter().sendMail({
      from: `ZAG Development <${mailConfig.from}>`,
      to: mailConfig.to,
      replyTo: details?.email ?? undefined,
      subject: `Deposit received: ${amount}${details?.name ? ` from ${details.name}` : ""}`,
      html,
      text,
    });
  } catch (err) {
    // The payment itself succeeded; don't make Stripe retry over an email failure.
    console.error("Deposit notification email failed:", err);
  }
}
