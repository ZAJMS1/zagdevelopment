import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/container";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  bleed?: boolean;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

export function Section({
  className,
  children,
  bleed = false,
  eyebrow,
  title,
  description,
  align = "left",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative py-20 sm:py-24 lg:py-28", className)}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <Container>
          {(eyebrow || title || description) && (
            <header
              className={cn(
                "mb-12 sm:mb-16",
                align === "center" && "mx-auto max-w-2xl text-center",
              )}
            >
              {eyebrow && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                  {eyebrow}
                </div>
              )}
              {title && (
                <h2 className="text-balance text-3xl font-semibold leading-[1.1] text-[var(--fg)] sm:text-4xl lg:text-[44px]">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
                  {description}
                </p>
              )}
            </header>
          )}
          {children}
        </Container>
      )}
    </section>
  );
}
