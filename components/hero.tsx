import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-20 sm:pt-28 lg:pt-32">
      <div
        aria-hidden
        className="bg-radial-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]"
      />
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative">
            <Reveal delay={0.05}>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--fg)] sm:text-5xl lg:text-[64px]">
                Affordable, professional websites for{" "}
                <span className="bg-gradient-to-br from-[var(--color-navy-200)] via-[var(--color-silver-200)] to-[var(--color-navy-400)] bg-clip-text text-transparent">
                  businesses that mean business.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
                ZAG Development builds modern, hand-coded Next.js websites that
                load fast, look polished, and grow with your business. One flat
                setup fee, simple monthly maintenance, no surprises.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact" size="lg">
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/pricing" variant="secondary" size="lg">
                  See pricing
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--border)] pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                    Setup
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-[var(--fg)]">
                    $750
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                    Monthly
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-[var(--fg)]">
                    $75
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                    Launch in
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-[var(--fg)]">
                    5 days
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-[var(--color-navy-700)]/30 via-transparent to-[var(--color-silver-300)]/10 blur-2xl"
              />
              <div className="relative h-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)]/60 p-8 shadow-soft backdrop-blur">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--surface-2)] to-transparent" />
                <div className="flex h-full items-center justify-center">
                  <Image
                    src="/logo-icon.png"
                    alt="ZAG Development emblem"
                    width={320}
                    height={320}
                    priority
                    className="h-auto w-3/4 max-w-xs drop-shadow-[0_18px_60px_rgba(30,58,95,0.5)]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
