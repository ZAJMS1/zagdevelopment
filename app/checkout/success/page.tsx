import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment received",
  robots: { index: false },
};

async function getCompletedSession(sessionId: string | undefined) {
  if (!sessionId || !sessionId.startsWith("cs_")) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return session.status === "complete" ? session : null;
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { session_id } = await searchParams;
  const session = await getCompletedSession(
    typeof session_id === "string" ? session_id : undefined,
  );

  if (!session) {
    return (
      <Section
        className="pt-16 sm:pt-20"
        eyebrow="Checkout"
        title="We couldn't find that payment."
      >
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          If you were charged, you&apos;ll get a receipt from Stripe by email and
          we&apos;ll be in touch. Otherwise, email us at{" "}
          <a className="text-[var(--fg)] underline" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>{" "}
          and we&apos;ll sort it out.
        </p>
        <div className="mt-8">
          <ButtonLink href="/pricing" variant="secondary">
            Back to pricing
          </ButtonLink>
        </div>
      </Section>
    );
  }

  const amount = ((session.amount_total ?? 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: (session.currency ?? "usd").toUpperCase(),
  });
  const email = session.customer_details?.email;
  const paid = session.payment_status === "paid";

  if (session.mode === "subscription") {
    return (
      <Section className="pt-16 sm:pt-20" eyebrow="Monthly plan" title="You're all set.">
        <div className="-mt-4 max-w-2xl space-y-4 text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          <p className="flex items-start gap-2.5 text-[var(--fg)]">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-strong)]" aria-hidden />
            Your {amount}/mo maintenance plan is active.
          </p>
          <p>
            Your card will be charged automatically each month, starting
            today. Need to update your card or cancel? Just email{" "}
            <a className="text-[var(--fg)] underline" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
            .
          </p>
        </div>
        <div className="mt-8">
          <ButtonLink href="/">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-16 sm:pt-20" eyebrow="Deposit received" title="You're on the schedule.">
      <div className="-mt-4 max-w-2xl space-y-4 text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
        <p className="flex items-start gap-2.5 text-[var(--fg)]">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-strong)]" aria-hidden />
          {paid
            ? <>Your {amount} deposit went through.</>
            : <>Your {amount} deposit is processing. Bank payments can take a few business days to clear.</>}
        </p>
        <p>
          {email && paid ? <>Stripe will email your receipt to {email}. </> : null}
          We&apos;ll reach out within one business day ({site.hours.short}) to
          set up your kickoff call. The remaining balance is due at launch,
          and the ${site.pricing.monthly}/mo retainer starts the month after.
        </p>
      </div>
      <div className="mt-8">
        <ButtonLink href="/process">
          See what happens next
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}
