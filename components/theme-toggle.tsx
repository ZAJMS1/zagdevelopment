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
        "group inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--fg)]",
        className,
      )}
    >
      <Sun
        className={cn(
          "h-[18px] w-[18px] transition-all",
          isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0",
          "absolute",
        )}
      />
      <Moon
        className={cn(
          "h-[18px] w-[18px] transition-all",
          isDark ? "rotate-90 scale-0" : "rotate-0 scale-100",
          "absolute",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
