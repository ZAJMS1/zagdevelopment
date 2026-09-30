import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Called by a plain HTML form on /pricing, so every outcome is a redirect.
export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = checkRateLimit(`checkout:${ip}`);
  if (!rl.ok) {
    return NextResponse.redirect(`${origin}/pricing?checkout=error#checkout`, 303);
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            // Amount is fixed server-side; never taken from the request.
            unit_amount: site.pricing.deposit * 100,
            product_data: {
              name: "Website setup deposit (50%)",
              description: `50% upfront deposit on the $${site.pricing.setup} ${site.name} website setup. The remaining balance is due at launch.`,
            },
          },
        },
      ],
      // Create a Customer so the launch balance and monthly retainer can be
      // billed to the same record later.
      customer_creation: "always",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      submit_type: "pay",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=canceled#checkout`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Stripe checkout failed:", err);
    return NextResponse.redirect(`${origin}/pricing?checkout=error#checkout`, 303);
  }
}
