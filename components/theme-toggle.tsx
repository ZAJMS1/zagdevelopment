"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute h-[18px] w-[18px] transition-[transform,opacity] duration-500 ease-out",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] transition-[transform,opacity] duration-500 ease-out",
          isDark
            ? "rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        )}
        aria-hidden
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
