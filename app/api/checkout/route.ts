import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Stripe fetches the icon itself, so it must be a public URL (not localhost).
const ICON_URL = "https://zagdevelopment.vercel.app/icon.png";

// Makes the hosted Stripe page match the site's dark theme.
const branding: Stripe.Checkout.SessionCreateParams.BrandingSettings = {
  display_name: site.name,
  background_color: "#15181d",
  button_color: "#2c5489",
  border_style: "pill",
  font_family: "inter",
  icon: { type: "url", url: ICON_URL },
};

// The plan comes from a form field; amounts are fixed here, never taken from the request.
const plans = {
  deposit: {
    returnPath: "/pricing",
    params: {
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
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
      submit_type: "pay",
    },
  },
  monthly: {
    returnPath: "/billing",
    params: {
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: site.pricing.monthly * 100,
            recurring: { interval: "month" },
            product_data: {
              name: "Monthly website maintenance",
              description: "Hosting, SSL, updates, backups, content edits, and support. Cancel anytime.",
            },
          },
        },
      ],
      submit_type: "subscribe",
    },
  },
} satisfies Record<string, { returnPath: string; params: Stripe.Checkout.SessionCreateParams }>;

type Plan = keyof typeof plans;

function isPlan(value: unknown): value is Plan {
  return typeof value === "string" && Object.hasOwn(plans, value);
}

// Called by plain HTML forms, so every outcome is a redirect.
export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;

  let planField: FormDataEntryValue | null = null;
  try {
    planField = (await req.formData()).get("plan");
  } catch {
    // No form body - fall through to the default plan.
  }
  const plan = isPlan(planField) ? plans[planField] : plans.deposit;
  const errorUrl = `${origin}${plan.returnPath}?checkout=error#checkout`;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = checkRateLimit(`checkout:${ip}`);
  if (!rl.ok) {
    return NextResponse.redirect(errorUrl, 303);
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      ...plan.params,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      branding_settings: branding,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${plan.returnPath}?checkout=canceled#checkout`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Stripe checkout failed:", err);
    return NextResponse.redirect(errorUrl, 303);
  }
}
