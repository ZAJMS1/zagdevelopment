"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { site } from "@/lib/site";

// Shown on /pricing when /api/checkout redirects back with ?checkout=error.
export function CheckoutNotice() {
  const status = useSearchParams().get("checkout");
  if (status !== "error") return null;

  return (
    <p
      role="alert"
      className="mt-4 flex items-start gap-2 text-sm text-[var(--fg-muted)]"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden />
      Checkout couldn&apos;t start right now. Please try again in a minute, or
      email {site.contactEmail}.
    </p>
  );
}
