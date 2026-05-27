import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-white shadow-soft hover:bg-[var(--accent-strong)] hover:shadow-glow",
        secondary:
          "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--fg-subtle)] hover:bg-[var(--surface-2)]",
        ghost:
          "text-[var(--fg-muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--fg)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)]",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type Variants = VariantProps<typeof buttonStyles>;

interface ButtonLinkProps extends Variants {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
}

export function ButtonLink({
  href,
  className,
  children,
  external,
  variant,
  size,
}: ButtonLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(buttonStyles({ variant, size }), className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(buttonStyles({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Variants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonStyles };
