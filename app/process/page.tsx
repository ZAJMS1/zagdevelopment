import type { Metadata } from "next";
import { ArrowRight, MessageSquare, PenLine, Rocket, LifeBuoy } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How ZAG Development takes your project from first email to launch in four straightforward steps.",
};

const steps = [
  {
    icon: MessageSquare,
    n: "01",
    title: "Free consultation",
    duration: "Day 1",
    description:
      "You send us a few sentences about your business. We hop on a 20-minute call (or just trade emails - your call), then come back with a written quote and scope. No charge, no pressure.",
    deliverables: [
      "Discovery call or async questionnaire",
      "Fixed price + timeline in writing",
      "Sample homepage direction",
    ],
  },
  {
    icon: PenLine,
    n: "02",
    title: "Design & revise",
    duration: "Day 2–3",
    description:
      "We design a homepage concept first - the page most visitors will actually see. You tell us what to change. We refine until it looks like you, then map out the rest of the pages.",
    deliverables: [
      "Live, clickable homepage mockup",
      "Unlimited revision rounds",
      "Sitemap + content plan",
    ],
  },
  {
    icon: Rocket,
    n: "03",
    title: "Build & launch",
    duration: "Day 4–5",
    description:
      "We build the full site in Next.js - every page, every form, every optimization. Then we point your domain at Vercel, flip the switch, and your site is live.",
    deliverables: [
      "Custom Next.js build",
      "Domain + SSL configured",
      "Launch checklist signed off",
    ],
  },
  {
    icon: LifeBuoy,
    n: "04",
    title: "Ongoing care",
    duration: "Ongoing",
    description:
      "Your $75/mo retainer kicks in. We host the site, push updates, fix things that break, and reply to your emails the same business day. Cancel anytime.",
    deliverables: [
      "Hosting + uptime monitoring",
      "Monthly content edits",
      "Same-day email support",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20" eyebrow="How it works" title="Concept to launch in four steps.">
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          No mystery, no scope creep, no surprise invoices. Here's exactly how a
          ZAG project flows from your first email to a live site you actually
          own.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[27px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent sm:block"
          />
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <li className="relative grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8 lg:grid-cols-[auto_1.2fr_1fr]">
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--bg)]">
                      <step.icon className="h-6 w-6 text-[var(--accent-strong)]" aria-hidden />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-display text-2xl font-semibold text-[var(--accent-strong)]">
                        {step.n}
                      </span>
                      <h3 className="text-xl font-semibold text-[var(--fg)] sm:text-2xl">
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--fg-muted)]">
                      {step.description}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                      You'll get
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm text-[var(--fg)]">
                      {step.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section align="center">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center sm:p-14">
            <h2 className="text-3xl font-semibold text-[var(--fg)] sm:text-4xl">
              Ready to start at step one?
            </h2>
            <p className="mt-4 text-[var(--fg-muted)]">
              The consultation is free and there's nothing to sign. Tell us
              about your business and we'll do the rest.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" size="lg">
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
