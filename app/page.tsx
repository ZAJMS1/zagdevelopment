import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Code2,
  Smartphone,
  Search,
  ShieldCheck,
  Headphones,
  Sparkles,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardEyebrow } from "@/components/ui/card";
import { site } from "@/lib/site";

const valueProps = [
  {
    icon: Gauge,
    title: "Fast on every device",
    description:
      "Server-rendered Next.js, optimized images, and modern caching. Pages load in under a second — not five.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first by default",
    description:
      "Most of your visitors are on a phone. We design for that screen first, then scale up to tablets and desktops.",
  },
  {
    icon: Search,
    title: "Built to be found",
    description:
      "Clean HTML, structured data, sitemaps, and meta tags so Google can index every page and your customers can find you.",
  },
  {
    icon: ShieldCheck,
    title: "Yours to own",
    description:
      "Your domain, your hosting account, your source code. If we ever part ways, you walk with everything.",
  },
  {
    icon: Headphones,
    title: "Real humans, fast replies",
    description:
      "Support handled by the same three people who built your site. Same-day responses on business days.",
  },
  {
    icon: Code2,
    title: "Hand-coded, not stretched",
    description:
      "Every page is custom-built around your business — no bloated templates, no drag-and-drop page-builders.",
  },
];

const services = [
  {
    eyebrow: "Most popular",
    title: "New Website",
    description:
      "A custom site, hand-coded from scratch in Next.js. Built around your brand, your customers, and what you actually need to show them.",
    href: "/services",
    bullets: [
      "Up to 6 polished pages",
      "Contact form that emails you",
      "Hosting + SSL configured",
      "Basic SEO out of the gate",
    ],
  },
  {
    eyebrow: "Refresh",
    title: "Website Rebuild",
    description:
      "Already have a site that's slow, dated, or held together with duct tape? We rebuild it on a modern stack — cleaner, faster, easier to update.",
    href: "/services",
    bullets: [
      "Migrate existing content",
      "Modern responsive design",
      "Speed + SEO optimization",
      "Same flat pricing",
    ],
  },
];

const processSteps = [
  {
    n: "01",
    title: "Free consultation",
    description:
      "Tell us what you need. We'll sketch a plan and a fixed quote — no obligation, no pressure.",
  },
  {
    n: "02",
    title: "Design & revise",
    description:
      "We design the layout, show you mockups, and iterate until it looks like you.",
  },
  {
    n: "03",
    title: "Build & launch",
    description:
      "We build the full site in Next.js, hook up your domain, and deploy to Vercel.",
  },
  {
    n: "04",
    title: "Ongoing care",
    description:
      "$75/mo covers hosting, updates, content edits, and same-day support.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        align="center"
        eyebrow="Why ZAG"
        title="A site that looks good isn't enough."
        description="Every detail — speed, SEO, accessibility, the way a button feels under your thumb — adds up to whether visitors stay or bounce. We sweat all of it."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((vp, i) => (
            <Reveal key={vp.title} delay={i * 0.05}>
              <Card className="h-full">
                <vp.icon
                  className="h-6 w-6 text-[var(--accent-strong)]"
                  aria-hidden
                />
                <CardTitle>{vp.title}</CardTitle>
                <CardDescription>{vp.description}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="What we build"
        title="Two ways we can help."
        description="Most small businesses need one of these. Both come with the same flat pricing and ongoing maintenance."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <Card className="flex h-full flex-col">
                <CardEyebrow>{svc.eyebrow}</CardEyebrow>
                <CardTitle className="text-2xl">{svc.title}</CardTitle>
                <CardDescription>{svc.description}</CardDescription>
                <ul className="mt-6 space-y-2.5 text-sm text-[var(--fg-muted)]">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2">
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg)] hover:text-[var(--accent-strong)]"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How it works"
        title="Concept to launch in four steps."
        description="No mystery, no scope creep. Here's exactly how we go from your first message to a live site."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="group relative h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--border-strong)]">
                <span className="font-display text-3xl font-semibold text-[var(--accent-strong)]">
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[var(--fg)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Pricing" title="Plain pricing. No surprises.">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-2)] p-8 sm:p-10">
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--accent)] opacity-10 blur-3xl"
            />
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                  <Sparkles className="h-3 w-3 text-[var(--accent-strong)]" />
                  Flat rate
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-[var(--fg)] sm:text-4xl">
                  ${site.pricing.setup} setup + ${site.pricing.monthly}/mo maintenance.
                </h3>
                <p className="mt-3 max-w-md text-[var(--fg-muted)]">
                  One-time build fee plus a flat monthly retainer that covers
                  hosting, updates, and same-day support. Pricing is negotiable.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/pricing">See what's included</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Get a quote
                  </ButtonLink>
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/40 p-6 backdrop-blur">
                <ul className="space-y-3.5 text-sm">
                  {[
                    "Custom design from scratch",
                    "Mobile-responsive everything",
                    "Contact form + email delivery",
                    "Basic SEO + sitemap",
                    "Hosting + SSL handled for you",
                    "Monthly content updates",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[var(--fg)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section align="center">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center shadow-soft sm:p-14">
            <h2 className="text-balance text-3xl font-semibold leading-tight text-[var(--fg)] sm:text-4xl">
              Ready to see what your site could look like?
            </h2>
            <p className="mt-4 text-[var(--fg-muted)]">
              Reach out with a few sentences about your business. We'll come
              back with a quote and a homepage concept — no commitment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" size="lg">
                Start a project
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/process" variant="secondary" size="lg">
                See how we work
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
