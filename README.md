# ZAG Development

Marketing site for **ZAG Development** - a Springfield, MO startup building affordable, hand-coded Next.js websites for small businesses.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Nodemailer. Deploys to Vercel.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Type safety:** TypeScript + Zod (form validation)
- **Theming:** next-themes (dark default + light toggle)
- **Email:** Nodemailer over SMTP (Gmail by default)
- **Payments:** Stripe Checkout (50% setup deposit)
- **Icons / motion:** lucide-react, motion (framer-motion successor)
- **Hosting:** Vercel

## Pages

| Route        | Purpose                                                           |
| ------------ | ----------------------------------------------------------------- |
| `/`          | Hero, value props, services teaser, process, pricing snapshot, CTA |
| `/services`  | New website + rebuild + add-ons + monthly maintenance              |
| `/process`   | 4-step concept-to-launch walkthrough                               |
| `/pricing`   | $750 setup + $75/mo retainer + FAQ + Stripe deposit button         |
| `/portfolio` | Placeholder "coming soon" cards + open-slot CTA                    |
| `/about`     | Founder story (Zain Saquer, Andrew Stanfield, Gavin Luo)           |
| `/contact`   | Form that POSTs to `/api/contact`                                  |
| `/api/contact` | Server route - Zod-validated, rate-limited, sends email via SMTP |
| `/api/checkout` | Creates a Stripe Checkout session for the $375 deposit and redirects to it |
| `/api/stripe/webhook` | Verifies Stripe events; emails `CONTACT_TO` when a deposit is paid (card or delayed bank payment) |
| `/checkout/success` | Post-payment confirmation page |
| `/billing` | Unlisted page for existing clients to start the $75/mo plan by card |

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in real SMTP creds
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

The contact form needs SMTP credentials. See [`.env.example`](./.env.example) for the full list:

- `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USE_TLS`
- `MAIL_USERNAME`, `MAIL_PASSWORD` (Gmail uses a 16-char App Password)
- `MAIL_DEFAULT_SENDER`
- `CONTACT_TO` (optional override - defaults to `MAIL_DEFAULT_SENDER`)

Stripe checkout needs:

- `STRIPE_SECRET_KEY` (`sk_test_...` locally, `sk_live_...` in production)
- `STRIPE_WEBHOOK_SECRET` (`whsec_...` for the webhook endpoint)

## Stripe

The "Pay $375 deposit" button on `/pricing` and the "Start monthly plan" button on `/billing` post to `/api/checkout` with `plan=deposit` or `plan=monthly`. Amounts are fixed on the server (`site.pricing`), and the Stripe page is branded to match the site via `branding_settings`. To move an existing client onto card payments, send them the `/billing` link on the day their next payment is due. No products need to exist in the Stripe dashboard. Each payment creates a Stripe Customer, so the launch balance and the $75/mo retainer can be billed to the same customer later with Invoices or Subscriptions in the dashboard.

Local testing:

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded \
  --forward-to localhost:3000/api/stripe/webhook   # prints a whsec_ for .env.local
```

Pay with test card `4242 4242 4242 4242`, any future expiry, any CVC.

Production: in the Stripe Dashboard → Developers → Webhooks, add an endpoint at `https://zagdevelopment.vercel.app/api/stripe/webhook` listening for `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Put its signing secret and the live secret key in Vercel's environment variables, then redeploy.

## Deploy

Production is [zagdevelopment.vercel.app](https://zagdevelopment.vercel.app), connected to this GitHub repo.

Push to `main` and Vercel deploys automatically:

```bash
git add -A
git commit -m "Your message"
git push origin main
```

SMTP env vars already live in the Vercel project settings. To change them, use the Vercel dashboard → Project Settings → Environment Variables.

## Brand

The brand palette is pulled directly from the logo:

- **Navy** `#1e3a5f` (primary accent)
- **Charcoal** `#15181d` (dark-mode background)
- **Silver** `#c7ccd1` (dividers, secondary text)
- Fonts: **Inter** (body) + **Space Grotesk** (display)

Tokens live in [`app/globals.css`](./app/globals.css) and are referenced via CSS custom properties so light/dark mode swaps cleanly.

## Editing content

Most copy lives in two places:

- [`lib/site.ts`](./lib/site.ts) - name, tagline, pricing, nav, founders
- Page files in [`app/`](./app/) - each section's headline, body copy, and bullet lists

Founder bios, pricing numbers, and the contact email can all be updated by editing `lib/site.ts` alone.

## What's intentionally not built yet

- **Real portfolio entries** - placeholder cards only. Replace as projects ship.
- **Analytics** - one click to enable Vercel Analytics post-deploy.

## License

© 2026 ZAG Development. All rights reserved.
