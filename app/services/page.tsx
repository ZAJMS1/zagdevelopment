import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardEyebrow, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom Next.js websites, rebuilds, and ongoing maintenance - built for small businesses by ZAG Development.",
};

const services = [
  {
    eyebrow: "Most popular",
    title: "New Website",
    description:
      "A custom site, hand-coded from scratch in Next.js. Designed around your brand and built for the screen most of your visitors are actually using - their phone.",
    bullets: [
      "Up to 6 polished pages",
      "Custom design from scratch",
      "Mobile-first responsive layouts",
      "Contact form that emails you",
      "Basic SEO + structured data",
      "Hosting + SSL configured for you",
    ],
  },
  {
    eyebrow: "Refresh",
    title: "Website Rebuild",
    description:
      "Already have a site that's slow, dated, or duct-taped together? We rebuild it on a modern stack with proper SEO, faster load times, and a cleaner look.",
    bullets: [
      "Migrate your existing content",
      "Modern Next.js + Vercel stack",
      "Speed + Core Web Vitals fixes",
      "Cleaner, on-brand design",
      "Same flat $750 setup",
      "Hosted and maintained ongoing",
    ],
  },
];

const addOns = [
  {
    title: "Extra pages",
    description: "Need more than six? Each additional page is a flat add-on, quoted up front.",
  },
  {
    title: "Booking & forms",
    description:
      "Multi-step forms, scheduling, file uploads - anything that turns visitors into leads.",
  },
  {
    title: "E-commerce starter",
    description:
      "A small Stripe-powered storefront - built only when you need it, not bolted on by default.",
  },
  {
    title: "Custom illustrations",
    description:
      "On-brand SVG illustrations or icons made for your site, not pulled from a stock library.",
  },
  {
    title: "Analytics setup",
    description:
      "Privacy-friendly analytics (Plausible or Vercel) configured so you can actually see what's working.",
  },
  {
    title: "Google Business profile",
    description:
      "We help you claim, verify, and optimize your Google Business listing for local search.",
  },
];

const maintenance = [
  "Hosting, SSL, and uptime monitoring",
  "Up to 30 minutes of content edits per month",
  "Security patches & dependency updates",
  "Backups + rollback in one click",
  "Same-business-day email support",
  "Quarterly performance check",
];

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20" align="left" eyebrow="Services" title="What we actually do.">
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          Two core services and a handful of add-ons. Everything's quoted up
          front in writing - no scope creep, no surprise invoices.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <Card className="flex h-full flex-col">
                <CardEyebrow>{svc.eyebrow}</CardEyebrow>
                <CardTitle className="text-2xl">{svc.title}</CardTitle>
                <CardDescription>{svc.description}</CardDescription>
                <ul className="mt-7 space-y-3 text-sm">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[var(--fg)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <ButtonLink href="/contact" variant="secondary">
                    Start with this
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Add-ons"
        title="Bolt-on whatever you need."
        description="Pick from these à la carte if your project calls for it. Quoted on top of the flat setup fee, in plain English."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.04}>
              <Card className="h-full">
                <CardTitle className="text-base">{a.title}</CardTitle>
                <CardDescription className="text-sm">{a.description}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Maintenance"
        title="What $75/mo actually covers."
        description="Most sites die because no one updates them. The monthly retainer keeps yours alive and current - and gives you a real human to email when something breaks."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {maintenance.map((m, i) => (
            <Reveal key={m} delay={i * 0.04}>
              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" aria-hidden />
                <span className="text-sm text-[var(--fg)]">{m}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/contact" size="lg">
            Get a custom quote
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
