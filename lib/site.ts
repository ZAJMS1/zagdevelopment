export const site = {
  name: "ZAG Development",
  shortName: "ZAG",
  tagline: "Affordable, professional websites for businesses that mean business.",
  description:
    "ZAG Development builds fast, modern, hand-coded websites for small and growing businesses. One-time setup, simple monthly maintenance, no surprises.",
  url: "https://zagdevelopment.com",
  contactEmail: "andrew@zagdevelopment.com",
  location: "Springfield, Missouri",
  hours: {
    days: "Monday – Friday",
    time: "8:00 AM – 6:00 PM CT",
    short: "Mon–Fri · 8am–6pm CT",
  },
  pricing: {
    setup: 750,
    monthly: 75,
    // 50% of setup, charged upfront through Stripe Checkout.
    deposit: 375,
    negotiableNote:
      "Pricing is negotiable - every business is different, so reach out and we'll tailor a quote that fits.",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  founders: [
    {
      name: "Zain Saquer",
      role: "Co-founder · Engineering",
      bio: "Leads build-out and deployment. Focused on writing clean, fast Next.js code that holds up long after launch.",
      initials: "ZS",
    },
    {
      name: "Andrew Stanfield",
      role: "Co-founder · Client Success",
      bio: "Your first point of contact. Handles scoping, communication, and making sure the project lands on time.",
      initials: "AS",
    },
    {
      name: "Gavin Luo",
      role: "Co-founder · Design",
      bio: "Owns the visual side - turning rough ideas into layouts that look polished on every screen size.",
      initials: "GL",
    },
  ],
} as const;
