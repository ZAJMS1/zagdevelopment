import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ZAG Development. We reply within one business day.",
};

const facts = [
  {
    icon: Mail,
    label: "Email",
    value: site.contactEmail,
    href: `mailto:${site.contactEmail}`,
  },
  {
    icon: MapPin,
    label: "Based in",
    value: site.location,
  },
  {
    icon: Clock,
    label: "Reply time",
    value: "Within one business day",
  },
  {
    icon: MessageSquare,
    label: "Consultations",
    value: "Always free, never pushy",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20" eyebrow="Contact" title="Tell us about your project.">
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          A few sentences is plenty to get started. We'll come back with a
          written quote and - if you'd like - a free homepage concept. No
          commitment, no pressure.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                  Quick facts
                </h3>
                <ul className="mt-5 space-y-4">
                  {facts.map((f) => (
                    <li key={f.label} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--accent-strong)]">
                        <f.icon className="h-4 w-4" aria-hidden />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                          {f.label}
                        </div>
                        {f.href ? (
                          <a
                            href={f.href}
                            className="text-sm text-[var(--fg)] hover:text-[var(--accent-strong)]"
                          >
                            {f.value}
                          </a>
                        ) : (
                          <div className="text-sm text-[var(--fg)]">
                            {f.value}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] p-6">
                <h3 className="text-base font-semibold text-[var(--fg)]">
                  Not sure what to write?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  Start with these - answer whichever feel useful:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--fg-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-strong)]" />
                    What does your business do, in one sentence?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-strong)]" />
                    Who are you trying to reach?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-strong)]" />
                    Do you already have a site? (If so, what's wrong with it?)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-strong)]" />
                    Any rough timeline or budget in mind?
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
