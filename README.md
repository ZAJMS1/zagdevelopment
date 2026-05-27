# ZAG Development

Marketing site for **ZAG Development** - a Springfield, MO startup building affordable, hand-coded Next.js websites for small businesses.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Nodemailer. Deploys to Vercel.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Type safety:** TypeScript + Zod (form validation)
- **Theming:** next-themes (dark default + light toggle)
- **Email:** Nodemailer over SMTP (Gmail by default)
- **Icons / motion:** lucide-react, motion (framer-motion successor)
- **Hosting:** Vercel

## Pages

| Route        | Purpose                                                           |
| ------------ | ----------------------------------------------------------------- |
| `/`          | Hero, value props, services teaser, process, pricing snapshot, CTA |
| `/services`  | New website + rebuild + add-ons + monthly maintenance              |
| `/process`   | 4-step concept-to-launch walkthrough                               |
| `/pricing`   | $750 setup + $75/mo retainer + FAQ + Stripe placeholder            |
| `/portfolio` | Placeholder "coming soon" cards + open-slot CTA                    |
| `/about`     | Founder story (Zain Saquer, Andrew Stanfield, Gavin Luo)           |
| `/contact`   | Form that POSTs to `/api/contact`                                  |
| `/api/contact` | Server route - Zod-validated, rate-limited, sends email via SMTP |

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

## Deploy to Vercel

1. Push this repo to GitHub.
2. In the Vercel dashboard, **Import Project** and pick the repo.
3. Under **Environment Variables**, add each key from `.env.example` with its production value.
4. Deploy. Visit `/contact`, send a test message, and confirm it lands in the configured inbox.

That's it - no build configuration changes needed.

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

- **Stripe checkout** - pricing page has a placeholder button. Wire up Stripe Checkout when ready.
- **Real portfolio entries** - placeholder cards only. Replace as projects ship.
- **Analytics** - one click to enable Vercel Analytics post-deploy.

## License

© 2026 ZAG Development. All rights reserved.
