import type { Metadata } from "next";
import { ArrowRight, Check, CreditCard, Sparkles, MessageCircle } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Plain pricing for ZAG Development - $750 one-time setup plus $75/mo maintenance. Pricing is negotiable.",
};

const included = [
  "Custom design from scratch",
  "Up to 6 polished pages",
  "Mobile-first responsive layouts",
  "Contact form with email delivery",
  "Basic SEO + sitemap + meta tags",
  "Hosting + SSL configured for you",
  "Domain setup help",
  "Launch checklist + handoff",
];

const monthlyIncluded = [
  "Hosting, SSL, uptime monitoring",
  "Up to 30 min content edits / month",
  "Security + dependency updates",
  "Backups with one-click rollback",
  "Same-day email support",
  "Quarterly performance review",
];

const faqs = [
  {
    q: "Is pricing really negotiable?",
    a: "Yes. The $750 + $75/mo is a starting point. If you're a non-profit, a friend of a friend, or have a really tight budget - talk to us. We'd rather build the site at a fair price than not build it.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. Anything beyond the included scope (extra pages, e-commerce, custom illustrations) gets quoted up front and added to the SOW you sign. You'll never see a surprise invoice.",
  },
  {
    q: "What about the domain?",
    a: "If you don't have one yet, expect $10–20/year directly to a registrar like Namecheap or Cloudflare - paid in your name, not ours. You always own the domain.",
  },
  {
    q: "How do payments work?",
    a: "We're rolling out secure Stripe checkout soon. For now, we invoice directly after the project is scoped. Setup is paid 50% upfront, 50% at launch. The $75/mo retainer starts the month after launch.",
  },
  {
    q: "Can I cancel the monthly retainer?",
    a: "Anytime, no contract lock-in. If you cancel, your site stays yours - we'll hand off the code and help you migrate hosting wherever you'd like.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20" eyebrow="Pricing" title="Plain pricing. No surprises.">
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          One flat setup fee plus a simple monthly retainer. Both numbers go on
          the SOW you sign - no hidden fees, ever.
        </p>
      </Section>

      <Section className="!pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-2)] p-8 shadow-soft sm:p-12">
            <div
              aria-hidden
              className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--accent)] opacity-[0.12] blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-[var(--color-silver-300)] opacity-[0.06] blur-3xl"
            />

            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                  <Sparkles className="h-3 w-3 text-[var(--accent-strong)]" />
                  Standard package
                </div>

                <div className="mt-6 flex flex-wrap items-baseline gap-4">
                  <span className="font-display text-6xl font-semibold text-[var(--fg)] sm:text-7xl">
                    ${site.pricing.setup}
                  </span>
                  <span className="text-[15px] text-[var(--fg-muted)]">
                    one-time setup
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-2 text-[var(--fg-muted)]">
                  <span className="text-2xl font-semibold text-[var(--fg)]">
                    + ${site.pricing.monthly}
                  </span>
                  <span>/ month maintenance</span>
                </div>

                <p className="mt-6 max-w-md text-[var(--fg-muted)]">
                  {site.pricing.negotiableNote}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" size="lg">
                    Get a quote
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <button
                    type="button"
                    disabled
                    title="Stripe checkout coming soon"
                    className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-[var(--border-strong)] bg-transparent px-7 text-[15px] font-medium text-[var(--fg-subtle)]"
                  >
                    <CreditCard className="h-4 w-4" />
                    Stripe checkout - coming soon
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/40 p-6 backdrop-blur sm:p-8">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                  What's included in setup
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[var(--fg)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow="Monthly maintenance"
        title="What $75 a month actually covers."
        description="The monthly retainer is what keeps your site alive after launch. Hosting, updates, and a real human to email when something needs fixing."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {monthlyIncluded.map((m, i) => (
            <Reveal key={m} delay={i * 0.04}>
              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" aria-hidden />
                <span className="text-sm text-[var(--fg)]">{m}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Beyond the basics"
        title="Need something custom?"
        description="Bigger e-commerce, custom integrations, or a totally bespoke build? We do those too - quoted up front."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card>
              <CardTitle>Custom packages</CardTitle>
              <CardDescription>
                More than six pages, booking flows, e-commerce, integrations
                with your existing tools - anything outside the standard scope
                is quoted as a custom build. You see the number before you
                commit.
              </CardDescription>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="secondary">
                  Request a custom quote
                  <MessageCircle className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card>
              <CardTitle>Non-profits & friends-of-friends</CardTitle>
              <CardDescription>
                We're three college freshmen running this between classes - if
                you're a non-profit, a student org, or someone our families
                know, just tell us. We're happy to work something out.
              </CardDescription>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="secondary">
                  Let's talk
                  <MessageCircle className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Common questions.">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="text-base font-semibold text-[var(--fg)]">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {f.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
