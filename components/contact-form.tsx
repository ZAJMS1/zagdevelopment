"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "loading" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message:
            data.error ??
            "Something went wrong on our end. Please try again in a moment.",
        });
        return;
      }

      setStatus({ kind: "success" });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-strong)]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-[var(--fg)]">
          Got it - message received.
        </h3>
        <p className="mt-2 text-[var(--fg-muted)]">
          We'll be in touch within one business day. Usually faster.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 text-sm font-medium text-[var(--accent-strong)] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name *</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@business.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="business">Business name</Label>
          <Input
            id="business"
            name="business"
            autoComplete="organization"
            placeholder="Jane's Bakery"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(417) 555-0123"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="budget">Rough budget (optional)</Label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--fg)] transition focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/40"
        >
          <option value="">Not sure yet</option>
          <option value="< $750">Under $750 - let's talk</option>
          <option value="$750 standard">$750 standard package</option>
          <option value="$1,000–$2,500">$1,000 – $2,500 (custom build)</option>
          <option value="$2,500+">$2,500+ (full custom)</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message">Tell us about your project *</Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          placeholder="What's the business, who are your customers, and what do you need a website to do? Even a few sentences is plenty to get started."
        />
      </div>

      {/* Honeypot - hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label>
          Don't fill this out if you're human:
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{status.message}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-[var(--fg-subtle)]">
          We reply within one business day. No spam, ever.
        </p>
        <Button
          type="submit"
          disabled={status.kind === "loading"}
          size="lg"
          className="min-w-[160px]"
        >
          {status.kind === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
