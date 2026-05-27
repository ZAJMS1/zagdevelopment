import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
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
            <div className="mt-6 space-y-2 text-sm text-[var(--fg-muted)]">
              <a
                href={`mailto:${site.contactEmail}`}
                className="inline-flex items-center gap-2 hover:text-[var(--fg)]"
              >
                <Mail className="h-4 w-4" aria-hidden />
                <span>{site.contactEmail}</span>
              </a>
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                <span>{site.location}</span>
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
