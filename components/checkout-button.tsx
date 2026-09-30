"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/cn";

// Plain form POST to /api/checkout, which redirects to Stripe. The pending
// state covers the second or so before Stripe's page loads.
export function CheckoutButton({
  plan,
  children,
  className,
}: {
  plan: "deposit" | "monthly";
  children: ReactNode;
  className?: string;
}) {
  const [pending, setPending] = useState(false);

  // Reset when the browser restores this page from cache (back button from Stripe).
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => {
      if (e.persisted) setPending(false);
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  return (
    <form action="/api/checkout" method="POST" onSubmit={() => setPending(true)}>
      <input type="hidden" name="plan" value={plan} />
      <button
        type="submit"
        disabled={pending}
        aria-live="polite"
        className={cn(buttonStyles({ size: "lg" }), "w-full sm:w-auto", className)}
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Opening secure checkout…
          </>
        ) : (
          children
        )}
      </button>
    </form>
  );
}
