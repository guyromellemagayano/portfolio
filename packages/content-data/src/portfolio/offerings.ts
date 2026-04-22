/**
 * @file packages/content-data/src/portfolio/offerings.ts
 * @author Guy Romelle Magayano
 * @description Showcase, service, and operating-principle records for the local portfolio snapshot.
 */

import type {
  ContentPortfolioBookingPath,
  ContentPortfolioBuildStep,
  ContentPortfolioCapabilityCluster,
  ContentPortfolioServiceOffering,
  ContentPortfolioShowcaseApp,
} from "@portfolio/api-contracts/content";

import { PUBLISHED_STATUS } from "./shared";

/** Showcase applications framed on the projects and home pages. */
export const portfolioShowcaseApps: ReadonlyArray<ContentPortfolioShowcaseApp> =
  [
    {
      id: "showcase-guy-os",
      anchor: "guy-os",
      href: "/projects#guy-os",
      name: "Guy OS",
      path: "apps/portfolio",
      summary:
        "The public shell for the entire portfolio monorepo, designed to frame products, reusable systems, and case studies as one coherent platform story.",
      proofPoints: [
        "Branding restraint and frontend quality",
        "Case study storytelling and SEO",
        "A clear entry point into the broader platform",
      ],
      order: 1,
      status: PUBLISHED_STATUS,
    },
    {
      id: "showcase-taskflow",
      anchor: "taskflow",
      href: "/projects#taskflow",
      name: "TaskFlow",
      path: "apps/saas-demo",
      summary:
        "A multi-tenant SaaS app that shows product engineering depth across accounts, teams, permissions, billing, events, and automation.",
      proofPoints: [
        "Multi-tenant application modeling",
        "Product-grade data relationships",
        "Full-stack delivery with clear UX tradeoffs",
      ],
      order: 2,
      status: PUBLISHED_STATUS,
    },
    {
      id: "showcase-cartforge",
      anchor: "cartforge",
      href: "/projects#cartforge",
      name: "CartForge",
      path: "apps/commerce-demo",
      summary:
        "A commerce-focused surface for catalog, cart, checkout, fulfillment, and transaction-state orchestration.",
      proofPoints: [
        "Commerce flows and transactional states",
        "Pricing, checkout, and order thinking",
        "High-friction UI paths handled pragmatically",
      ],
      order: 3,
      status: PUBLISHED_STATUS,
    },
    {
      id: "showcase-pulseops",
      anchor: "pulseops",
      href: "/projects#pulseops",
      name: "PulseOps",
      path: "apps/ops-demo",
      summary:
        "An operational console for queues, incidents, jobs, retries, and visibility into system health and manual interventions.",
      proofPoints: [
        "Operations UX for high-signal data",
        "Observability-aware product design",
        "Recovery paths and failure handling",
      ],
      order: 4,
      status: PUBLISHED_STATUS,
    },
    {
      id: "showcase-contentforge",
      anchor: "contentforge",
      href: "/projects#contentforge",
      name: "ContentForge",
      path: "apps/cms-demo",
      summary:
        "A content workflow app for structured editorial systems, preview, approvals, versioning, and headless CMS thinking.",
      proofPoints: [
        "Editorial and publishing workflows",
        "Structured content relationships",
        "Preview, approval, and governance layers",
      ],
      order: 5,
      status: PUBLISHED_STATUS,
    },
  ];

/** Service offerings used by hire and services surfaces. */
export const portfolioServiceOfferings: ReadonlyArray<ContentPortfolioServiceOffering> =
  [
    {
      id: "service-architecture-review",
      anchor: "architecture-review",
      name: "Architecture Review",
      summary:
        "A focused audit of your frontend or product platform: structure, boundaries, delivery risks, and the changes that will create the most leverage.",
      deliverables: [
        "Codebase and architecture review",
        "A prioritized remediation plan",
        "A working session to align next steps",
      ],
      bestFor:
        "Teams about to scale a product surface, redesign a frontend foundation, or clean up a monorepo that is starting to fight back.",
      ctaLabel: "Start a review",
      href: "/hire",
      order: 1,
      status: PUBLISHED_STATUS,
    },
    {
      id: "service-technical-advisory",
      anchor: "advisory",
      name: "Technical Advisory",
      summary:
        "Ongoing product and platform guidance for teams that need strong engineering judgment without hiring a full-time staff-level lead immediately.",
      deliverables: [
        "Architecture and design reviews",
        "Async guidance on implementation direction",
        "Ongoing input on standards and system boundaries",
      ],
      bestFor:
        "Founders, engineering leads, and teams working through product/platform tradeoffs in real time.",
      ctaLabel: "Discuss advisory",
      href: "/hire",
      order: 2,
      status: PUBLISHED_STATUS,
    },
    {
      id: "service-delivery-sprint",
      anchor: "delivery-sprint",
      name: "Delivery Sprint",
      summary:
        "A fixed-scope implementation sprint for high-leverage work like navigation refactors, design system foundations, CMS delivery layers, or portfolio/platform restructuring.",
      deliverables: [
        "Scoped implementation plan",
        "Hands-on code and architecture changes",
        "Verification and handoff notes",
      ],
      bestFor:
        "Teams that already know the problem and need a senior engineer to push through the actual implementation.",
      ctaLabel: "Scope a sprint",
      href: "/hire",
      order: 3,
      status: PUBLISHED_STATUS,
    },
  ];

/** Capability clusters used to summarize reusable areas of expertise. */
export const portfolioCapabilityClusters: ReadonlyArray<ContentPortfolioCapabilityCluster> =
  [
    {
      id: "capability-frontend-systems",
      name: "Frontend Systems",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Design systems",
        "Accessible component architecture",
      ],
      order: 1,
      status: PUBLISHED_STATUS,
    },
    {
      id: "capability-platform-work",
      name: "Platform Work",
      items: [
        "Monorepos",
        "API contracts",
        "CMS delivery",
        "Observability",
        "Developer tooling",
      ],
      order: 2,
      status: PUBLISHED_STATUS,
    },
    {
      id: "capability-product-domains",
      name: "Product Domains",
      items: [
        "Admin tools",
        "Multi-tenant SaaS",
        "Commerce flows",
        "Operational consoles",
        "Content workflows",
      ],
      order: 3,
      status: PUBLISHED_STATUS,
    },
  ];

/** High-level focus areas surfaced across the public portfolio. */
export const portfolioFocusAreas: ReadonlyArray<string> = [
  "Frontend Architecture",
  "Design Systems",
  "Platform Engineering",
  "Content Modeling",
  "Developer Experience",
  "Product Systems",
];

/** Reusable platform capabilities shown in the public portfolio shell. */
export const portfolioFoundationCapabilities: ReadonlyArray<string> = [
  "Shared UI primitives, layout systems, and interaction patterns",
  "Typed API contracts and reusable client integrations",
  "Authentication, role checks, and permission-aware routing",
  "Observability helpers for errors, logs, and runtime confidence",
  "Reusable data tables, forms, notifications, and audit log primitives",
];

/** Ordered build sequence used to explain the monorepo delivery strategy. */
export const portfolioBuildSequence: ReadonlyArray<ContentPortfolioBuildStep> =
  [
    {
      id: "build-sequence-foundation",
      title: "Foundation",
      detail:
        "Build the shared platform first: UI, auth, layouts, forms, tables, notifications, and audit log primitives.",
      order: 1,
      status: PUBLISHED_STATUS,
    },
    {
      id: "build-sequence-public-proof",
      title: "Public Proof",
      detail:
        "Use `apps/portfolio` to frame the system and explain why the monorepo exists.",
      order: 2,
      status: PUBLISHED_STATUS,
    },
    {
      id: "build-sequence-strongest-signal",
      title: "Strongest Signal",
      detail:
        "Prioritize `apps/saas-demo` because it proves the highest-value day-to-day engineering work.",
      order: 3,
      status: PUBLISHED_STATUS,
    },
    {
      id: "build-sequence-specialization",
      title: "Specialization",
      detail:
        "Layer in commerce and operations once the platform foundation is reusable enough to accelerate both surfaces.",
      order: 4,
      status: PUBLISHED_STATUS,
    },
    {
      id: "build-sequence-workflow-depth",
      title: "Workflow Depth",
      detail:
        "Round out the story with content tooling to show editorial systems, governance, and structured publishing.",
      order: 5,
      status: PUBLISHED_STATUS,
    },
  ];

/** Contact/booking paths exposed by the public portfolio. */
export const portfolioBookingPaths: ReadonlyArray<ContentPortfolioBookingPath> =
  [
    {
      id: "booking-path-email",
      title: "Email me directly",
      description:
        "Best when you already know the project context and want to send a compact brief.",
      href: "mailto:aspiredtechie2010@gmail.com?subject=Project%20Inquiry",
      cta: "Send email",
      target: "_blank",
      order: 1,
      status: PUBLISHED_STATUS,
    },
    {
      id: "booking-path-hire-form",
      title: "Start with the hire form",
      description:
        "Best when you want a simple path and a little more structure around the inquiry.",
      href: "/hire",
      cta: "Open hire form",
      order: 2,
      status: PUBLISHED_STATUS,
    },
    {
      id: "booking-path-linkedin",
      title: "Reach out on LinkedIn",
      description:
        "Best when the first conversation is more exploratory or relationship-driven.",
      href: "https://www.linkedin.com/in/guyromellemagayano",
      cta: "Open LinkedIn",
      target: "_blank",
      order: 3,
      status: PUBLISHED_STATUS,
    },
  ];

/** Operating principles surfaced on brochure-style routes. */
export const portfolioOperatingPrinciples: ReadonlyArray<string> = [
  "Design the system before polishing the screen.",
  "Reuse aggressively, but only where the abstraction stays honest.",
  "Model real product constraints instead of portfolio-safe happy paths.",
  "Keep the frontend expressive while the platform layer stays boring and reliable.",
];
