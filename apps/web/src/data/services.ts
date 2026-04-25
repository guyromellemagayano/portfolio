/**
 * @file apps/web/src/data/services.ts
 * @author Guy Romelle Magayano
 * @description Service offering data stored as simple page-ready records.
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  price: string;
  priceNote?: string;
  bestFor: string;
  cta: string;
  href: string;
  featured?: boolean;
}

export interface CapabilityCluster {
  id: string;
  title: string;
  items: string[];
}

export interface BookingPath {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  target?: "_blank" | "_self";
}

export const services: Service[] = [
  {
    id: "architecture-review",
    title: "Architecture Review",
    description:
      "A focused audit of your frontend or product platform: structure, boundaries, delivery risks, and the changes that will create the most leverage.",
    bullets: [
      "Codebase and architecture review",
      "A prioritized remediation plan",
      "A working session to align next steps",
    ],
    icon: "Review",
    price: "$3,000",
    priceNote: "starting point",
    bestFor:
      "Teams about to scale a product surface, redesign a frontend foundation, or clean up a monorepo that is starting to fight back.",
    cta: "Start a review",
    href: "/hire",
    featured: true,
  },
  {
    id: "technical-advisory",
    title: "Technical Advisory",
    description:
      "Ongoing product and platform guidance for teams that need strong engineering judgment without hiring a full-time staff-level lead immediately.",
    bullets: [
      "Architecture and design reviews",
      "Async guidance on implementation direction",
      "Ongoing input on standards and system boundaries",
    ],
    icon: "Advisory",
    price: "$2,500",
    priceNote: "per month",
    bestFor:
      "Founders, engineering leads, and teams working through product/platform tradeoffs in real time.",
    cta: "Discuss advisory",
    href: "/hire",
    featured: true,
  },
  {
    id: "delivery-sprint",
    title: "Delivery Sprint",
    description:
      "A fixed-scope implementation sprint for high-leverage work like navigation refactors, design system foundations, content delivery layers, or portfolio/platform restructuring.",
    bullets: [
      "Scoped implementation plan",
      "Hands-on code and architecture changes",
      "Verification and handoff notes",
    ],
    icon: "Sprint",
    price: "From $15,000",
    priceNote: "fixed scope",
    bestFor:
      "Teams that already know the problem and need a senior engineer to push through the actual implementation.",
    cta: "Scope a sprint",
    href: "/hire",
    featured: true,
  },
];

export const capabilityClusters: CapabilityCluster[] = [
  {
    id: "frontend-systems",
    title: "Frontend Systems",
    items: [
      "Astro",
      "React",
      "TypeScript",
      "Design systems",
      "Accessible component architecture",
    ],
  },
  {
    id: "platform-work",
    title: "Platform Work",
    items: [
      "Monorepos",
      "Typed contracts",
      "Local content data",
      "Observability",
      "Developer tooling",
    ],
  },
  {
    id: "product-domains",
    title: "Product Domains",
    items: [
      "Admin tools",
      "Multi-tenant SaaS",
      "Commerce flows",
      "Operational consoles",
      "Content workflows",
    ],
  },
];

export const bookingPaths: BookingPath[] = [
  {
    id: "review-call",
    title: "Architecture review call",
    description:
      "Best when you need a fast read on structure, risk, and the next few changes worth making.",
    cta: "Start with review",
    href: "/hire",
  },
  {
    id: "advisory-fit",
    title: "Advisory fit check",
    description:
      "Best when you want recurring senior engineering judgment around product and platform direction.",
    cta: "Discuss advisory",
    href: "/hire",
  },
  {
    id: "sprint-scope",
    title: "Delivery sprint scope",
    description:
      "Best when the problem is clear and you need direct implementation on a contained product surface.",
    cta: "Scope a sprint",
    href: "/hire",
  },
];
