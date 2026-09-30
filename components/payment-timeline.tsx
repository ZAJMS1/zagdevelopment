import { Suspense } from "react";
import { Lock } from "lucide-react";
import { CheckoutButton } from "@/components/checkout-button";
import { CheckoutNotice } from "@/components/checkout-notice";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const steps = [
  {
    when: "Today",
    amount: `$${site.pricing.deposit}`,
    what: "Deposit that reserves your build slot.",
  },
  {
    when: "At launch",
    amount: `$${site.pricing.setup - site.pricing.deposit}`,
    what: "Remaining balance, once you've approved the finished site.",
  },
  {
    when: "Every month after",
    amount: `$${site.pricing.monthly}/mo`,
    what: "Hosting, updates, and support. Cancel anytime.",
  },
];

// Slanted marker borrowed from the stripes in the ZAG logo.
function Marker({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-3 w-7 shrink-0 -skew-x-[35deg] rounded-[2px]",
        active
          ? "bg-gradient-to-r from-[var(--color-navy-500)] via-[var(--color-navy-400)] to-[var(--color-silver-300)]"
          : "border border-[var(--border-strong)]",
      )}
    />
  );
}

export function PaymentTimeline() {
  return (
    <div id="checkout" className="mt-10 scroll-mt-24 border-t border-[var(--border)] pt-8 sm:mt-12 sm:pt-10">
      <h3 className="font-display text-xl font-semibold text-[var(--fg)] sm:text-2xl">
        How you&apos;ll pay
      </h3>

      <ol className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-0">
        {steps.map((step, i) => (
          <li key={step.when} className="sm:pr-8">
            <div className="flex items-center gap-3">
              <Marker active={i === 0} />
              {i < steps.length - 1 && (
                <span aria-hidden className="hidden h-px flex-1 bg-[var(--border-strong)] sm:block" />
              )}
            </div>
            <p className="mt-4 text-[13px] text-[var(--fg-subtle)]">{step.when}</p>
            <p
              className={cn(
                "mt-0.5 font-display text-3xl font-semibold tracking-tight",
                i === 0 ? "text-[var(--fg)]" : "text-[var(--fg-muted)]",
              )}
            >
              {step.amount}
            </p>
            <p className="mt-1.5 max-w-[26ch] text-sm leading-relaxed text-[var(--fg-muted)]">
              {step.what}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" aria-hidden />
          <p className="max-w-lg text-sm leading-relaxed text-[var(--fg-muted)]">
            Ready at the standard price? Pay today&apos;s deposit through
            Stripe&apos;s secure checkout. Your card details go straight to
            Stripe - we never see them.
          </p>
        </div>
        <CheckoutButton plan="deposit">Pay ${site.pricing.deposit} deposit</CheckoutButton>
      </div>

      <Suspense>
        <CheckoutNotice />
      </Suspense>
    </div>
  );
}
