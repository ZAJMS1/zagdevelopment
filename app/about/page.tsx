import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, GraduationCap, MapPin, Handshake, HeartHandshake } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ZAG Development is a locally-based startup founded by three college freshmen from Springfield, Missouri.",
};

const values = [
  {
    icon: Handshake,
    title: "Honest scoping",
    description:
      "We quote what it'll actually cost - and stick to it. No surprise invoices, no 'oh, that's extra' moments halfway through.",
  },
  {
    icon: HeartHandshake,
    title: "Built for local",
    description:
      "We're based here, our families shop at your stores, and we plan on still being around in five years. Our reputation rides on every site.",
  },
  {
    icon: GraduationCap,
    title: "Fresh, not green",
    description:
      "Yes, we're in college - and yes, that means we work hard, charge fair rates, and care about every project like it's the only one on our plate.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20" eyebrow="About" title="A small Springfield startup with a big standard.">
        <p className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          {site.name} is a locally-based startup founded by three college
          freshmen from the {site.location} area. We started ZAG because most of
          the small businesses we know are either stuck on a website that's a
          decade out of date or paying way too much for one that still doesn't
          look the part. We're here to fix that.
        </p>
      </Section>

      <Section className="!pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12">
            <div
              aria-hidden
              className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--accent)] opacity-[0.1] blur-3xl"
            />
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-5 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                <p>
                  ZAG was born out of a simple observation: the same local
                  businesses our families have shopped at for years - the
                  diners, the farms, the corner shops - all needed websites
                  that didn't look like they'd been left in a drawer since 2014.
                </p>
                <p>
                  So we put our heads together. Three freshmen, three different
                  skill sets - engineering, design, and client communication -
                  and a stack we know inside out. Hand-coded Next.js, deployed
                  on Vercel, designed for the screen most of your customers are
                  already using: their phone.
                </p>
                <p>
                  We're small on purpose. It means you talk to the same three
                  people who built your site every time you email us. It also
                  means we can keep prices honest and our turnaround fast.
                </p>
              </div>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[var(--color-navy-700)]/30 to-[var(--color-silver-300)]/10 blur-2xl"
                />
                <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg)]/60 p-8">
                  <Image
                    src="/logo-full.png"
                    alt="ZAG Development logo"
                    width={420}
                    height={420}
                    className="mx-auto h-auto w-full max-w-[260px]"
                  />
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--fg-muted)]">
                    <MapPin className="h-4 w-4 text-[var(--accent-strong)]" />
                    {site.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow="The team"
        title="Three founders, one phone number."
        description="No subcontractors, no offshore handoffs. When you hire ZAG, these are the people doing the work."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--border-strong)] sm:p-7">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-gradient-to-br from-[var(--color-navy-600)] to-[var(--color-navy-800)] font-display text-xl font-semibold text-white shadow-soft">
                  {f.initials}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[var(--fg)]">
                  {f.name}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                  {f.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {f.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="What we believe"
        title="How we run the business."
        description="Three principles we hold ourselves to on every project, big or small."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <v.icon className="h-6 w-6 text-[var(--accent-strong)]" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-[var(--fg)]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section align="center">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center sm:p-14">
            <h2 className="text-3xl font-semibold text-[var(--fg)] sm:text-4xl">
              Let's build something local.
            </h2>
            <p className="mt-4 text-[var(--fg-muted)]">
              If you're a small business in or around Springfield - or anywhere
              else, really - we'd love to hear from you.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" size="lg">
                Say hello
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
