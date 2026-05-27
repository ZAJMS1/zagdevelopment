import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A look at ZAG Development's current and upcoming projects. New work shipping soon.",
};

const placeholders = [
  {
    name: "Coming soon",
    kind: "Local service business",
    tag: "In production",
    palette: ["from-[var(--color-navy-700)]", "via-[var(--color-navy-500)]", "to-[var(--color-silver-400)]"],
  },
  {
    name: "Coming soon",
    kind: "Small e-commerce",
    tag: "Scoping",
    palette: ["from-[var(--color-navy-800)]", "via-[var(--color-navy-600)]", "to-[var(--color-navy-300)]"],
  },
  {
    name: "Coming soon",
    kind: "Restaurant / hospitality",
    tag: "In design",
    palette: ["from-[var(--color-silver-500)]", "via-[var(--color-navy-500)]", "to-[var(--color-navy-700)]"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20" eyebrow="Portfolio" title="Our work is just getting started.">
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          ZAG Development launched in 2026 with a small handful of local clients
          in the Springfield, MO area. Our first projects are in design and
          development right now — we'll be filling this page out as they go
          live. Until then, here's a peek at what's in motion.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--border-strong)]">
                <div
                  className={`relative aspect-[4/3] w-full bg-gradient-to-br ${p.palette.join(" ")}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,white,transparent_60%)] opacity-[0.08]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-5xl font-semibold tracking-tight text-white/60 mix-blend-overlay">
                      ZAG
                    </span>
                  </div>
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    <Clock className="h-3 w-3" />
                    {p.tag}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                    {p.kind}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--fg)]">
                    {p.name}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.18}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)]/40 p-6 transition hover:border-[var(--accent-strong)] hover:bg-[var(--surface)] sm:col-span-2 lg:col-span-3">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--accent)] opacity-[0.12] blur-3xl transition group-hover:opacity-[0.18]"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)]/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                  <Sparkles className="h-3 w-3 text-[var(--accent-strong)]" />
                  Open slot
                </div>
                <h3 className="mt-4 max-w-2xl text-balance text-2xl font-semibold text-[var(--fg)] sm:text-3xl">
                  Your business could be here.
                </h3>
                <p className="mt-3 max-w-xl text-[var(--fg-muted)]">
                  We're actively taking on new projects. If you'd like to be one
                  of our first showcased clients, reach out — early clients get
                  priority scheduling and a discount.
                </p>
              </div>
              <div className="relative mt-8">
                <ButtonLink href="/contact" size="lg">
                  Claim this spot
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section align="center">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center sm:p-14">
            <h2 className="text-3xl font-semibold text-[var(--fg)] sm:text-4xl">
              Want to see live work as it ships?
            </h2>
            <p className="mt-4 text-[var(--fg-muted)]">
              Drop us a note and we'll send you a link the moment our first
              client sites go live.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" size="lg">
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
