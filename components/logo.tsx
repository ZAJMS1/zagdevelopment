import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="ZAG Development home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display tracking-tight",
        className,
      )}
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-md ring-1 ring-[var(--border)] transition group-hover:ring-[var(--border-strong)]">
        <Image
          src="/logo-icon.png"
          alt=""
          width={64}
          height={64}
          priority
          className="h-full w-full object-contain"
        />
      </span>
      {showWordmark && (
        <span className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-semibold leading-none text-[var(--fg)]">
            ZAG
          </span>
          <span className="text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-[var(--fg-subtle)]">
            Development
          </span>
        </span>
      )}
    </Link>
  );
}
