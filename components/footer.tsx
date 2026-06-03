import Link from "next/link";
import { ArrowUpRight, CalendarClock, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg)] py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
              {site.description}
            </p>
            <div className="mt-6 space-y-3 text-sm text-[var(--fg-muted)]">
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[var(--fg)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
              >
                <span className="font-medium">Contact us</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden />
                  <span>{site.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" aria-hidden />
                  <span>{site.hours.short}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
              Sitemap
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
              What we do
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--fg-muted)]">
              <li>Custom Next.js websites</li>
              <li>Mobile-first responsive design</li>
              <li>Monthly maintenance & hosting</li>
              <li>SEO + Core Web Vitals</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--fg-subtle)]">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--fg-subtle)]">
            Hand-built in {site.location}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
