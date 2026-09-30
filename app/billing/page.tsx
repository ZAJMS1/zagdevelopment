import type { Metadata } from "next";
import { Suspense } from "react";
import { Check, Lock } from "lucide-react";
import { Section } from "@/components/section";
import { CheckoutButton } from "@/components/checkout-button";
import { CheckoutNotice } from "@/components/checkout-notice";
import { site } from "@/lib/site";

// Unlisted page for existing clients to start paying the monthly retainer by card.
export const metadata: Metadata = {
  title: "Monthly plan",
  description: `Set up automatic $${site.pricing.monthly}/mo payments for your ${site.name} maintenance plan.`,
  robots: { index: false },
};

export default function BillingPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20" eyebrow="For clients" title="Set up your monthly plan.">
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          Pay your maintenance plan by card. Your first payment is today,
          then Stripe charges the same card automatically every month.
        </p>
      </Section>

      <Section className="!pt-0">
        <div
          id="checkout"
          className="max-w-3xl scroll-mt-24 rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 shadow-soft sm:p-10"
        >
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-5xl font-semibold text-[var(--fg)] sm:text-6xl">
              ${site.pricing.monthly}
            </span>
            <span className="text-[var(--fg-muted)]">/ month</span>
          </div>

          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
            {site.monthlyIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[var(--fg)]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-5 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" aria-hidden />
              <p className="max-w-sm text-sm leading-relaxed text-[var(--fg-muted)]">
                Secure checkout by Stripe. Cancel anytime by emailing{" "}
                <a className="text-[var(--fg)] underline underline-offset-4" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
                .
              </p>
            </div>
            <CheckoutButton plan="monthly">Start monthly plan</CheckoutButton>
          </div>

          <Suspense>
            <CheckoutNotice />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
