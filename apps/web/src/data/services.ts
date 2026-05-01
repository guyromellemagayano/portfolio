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
  outcomes: string[];
  process: string[];
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
    outcomes: [
      "A written map of the current architecture, including ownership boundaries and high-risk coupling.",
      "A sequenced remediation plan that separates quick wins from deeper platform work.",
      "Decision notes your team can use to align engineering, product, and design stakeholders.",
    ],
    process: [
      "Inspect route structure, shared packages, data flow, accessibility, SEO, and performance risks.",
      "Review the most important product workflows with the team that owns the surface.",
      "Turn findings into an implementation-ready plan with tradeoffs and first changes.",
    ],
    icon: "Review",
    price: "$3,000",
    priceNote: "starting point",
    bestFor:
      "Teams about to scale a product surface, redesign a frontend foundation, or clean up a monorepo that is starting to fight back.",
    cta: "Start a review",
    href: "/contact",
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
    outcomes: [
      "Clear technical direction before the team commits to costly product or platform decisions.",
      "A recurring decision loop for architecture, standards, accessibility, SEO, and delivery risk.",
      "Practical written guidance that helps senior engineers move without adding process weight.",
    ],
    process: [
      "Set the decision cadence and the product surfaces that need advisory coverage.",
      "Review proposed approaches, pull request direction, and architecture risks asynchronously.",
      "Keep a running recommendation log so decisions remain visible after the engagement.",
    ],
    icon: "Advisory",
    price: "$2,500",
    priceNote: "per month",
    bestFor:
      "Founders, engineering leads, and teams working through product/platform tradeoffs in real time.",
    cta: "Discuss advisory",
    href: "/contact",
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
    outcomes: [
      "A shipped slice of implementation work tied to a clear business or delivery constraint.",
      "Code changes that improve the system boundary instead of only patching one screen.",
      "Verification notes, follow-up recommendations, and handoff context for the owning team.",
    ],
    process: [
      "Define the narrowest high-leverage scope and the acceptance checks for the sprint.",
      "Implement the changes directly in the repo with tests and reviewable checkpoints.",
      "Document what changed, what remains risky, and what should happen next.",
    ],
    icon: "Sprint",
    price: "From $15,000",
    priceNote: "fixed scope",
    bestFor:
      "Teams that already know the problem and need a senior engineer to push through the actual implementation.",
    cta: "Scope a sprint",
    href: "/contact",
    featured: true,
  },
];

export const capabilityClusters: CapabilityCluster[] = [
  {
    id: "platform-engineering",
    title: "Platform Engineering",
    items: [
      "Full-stack product systems",
      "API and data-flow boundaries",
      "Internal tools and admin workflows",
      "Maintainable architecture decisions",
      "Documentation and handoff paths",
    ],
  },
  {
    id: "commerce-cms-architecture",
    title: "Commerce and CMS Architecture",
    items: [
      "Storefront journeys",
      "Checkout and order state",
      "Content models and editorial workflows",
      "SEO metadata and structured data",
      "Localization and publishing operations",
    ],
  },
  {
    id: "performance-release-reliability",
    title: "Performance and Release Reliability",
    items: [
      "Core Web Vitals",
      "Regression coverage",
      "CI/CD quality gates",
      "Observability and runbooks",
      "Safer release workflows",
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
    href: "/contact",
  },
  {
    id: "advisory-fit",
    title: "Advisory fit check",
    description:
      "Best when you want recurring senior engineering judgment around product and platform direction.",
    cta: "Discuss advisory",
    href: "/contact",
  },
  {
    id: "sprint-scope",
    title: "Delivery sprint scope",
    description:
      "Best when the problem is clear and you need direct implementation on a contained product surface.",
    cta: "Scope a sprint",
    href: "/contact",
  },
];
