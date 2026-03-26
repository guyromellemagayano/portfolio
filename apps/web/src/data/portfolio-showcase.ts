/**
 * @file apps/web/src/data/portfolio-showcase.ts
 * @author Guy Romelle Magayano
 * @description Shared portfolio showcase content for the public web experience.
 */

export type PortfolioShowcaseApp = Readonly<{
  anchor: string;
  href: string;
  name: string;
  path: string;
  summary: string;
  proofPoints: readonly string[];
}>;

export type PortfolioShowcaseStep = Readonly<{
  title: string;
  detail: string;
}>;

export type PortfolioServiceOffering = Readonly<{
  anchor: string;
  ctaLabel: string;
  href: string;
  name: string;
  summary: string;
  deliverables: readonly string[];
  bestFor: string;
}>;

export type PortfolioCapabilityCluster = Readonly<{
  name: string;
  items: readonly string[];
}>;

export const PORTFOLIO_SHOWCASE_APPS: ReadonlyArray<PortfolioShowcaseApp> = [
  {
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
  },
  {
    anchor: "opsdesk",
    href: "/projects#opsdesk",
    name: "OpsDesk",
    path: "apps/admin-demo",
    summary:
      "An internal-tool style product built to demonstrate mature CRUD, permissions, forms, tables, auditability, and everyday admin ergonomics.",
    proofPoints: [
      "RBAC and workflow gating",
      "Reusable table and form infrastructure",
      "Real internal-tool interaction design",
    ],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export const PORTFOLIO_FOUNDATION_CAPABILITIES: ReadonlyArray<string> = [
  "Shared UI primitives, layout systems, and interaction patterns",
  "Typed API contracts and reusable client integrations",
  "Authentication, role checks, and permission-aware routing",
  "Observability helpers for errors, logs, and runtime confidence",
  "Reusable data tables, forms, notifications, and audit log primitives",
];

export const PORTFOLIO_FOCUS_AREAS: ReadonlyArray<string> = [
  "Frontend Architecture",
  "Design Systems",
  "Platform Engineering",
  "Content Modeling",
  "Developer Experience",
  "Product Systems",
];

export const PORTFOLIO_SERVICE_OFFERINGS: ReadonlyArray<PortfolioServiceOffering> =
  [
    {
      anchor: "architecture-review",
      ctaLabel: "Start a review",
      href: "/contact",
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
    },
    {
      anchor: "advisory",
      ctaLabel: "Discuss advisory",
      href: "/contact",
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
    },
    {
      anchor: "delivery-sprint",
      ctaLabel: "Scope a sprint",
      href: "/contact",
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
    },
  ];

export const PORTFOLIO_CAPABILITY_CLUSTERS: ReadonlyArray<PortfolioCapabilityCluster> =
  [
    {
      name: "Frontend Systems",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Design systems",
        "Accessible component architecture",
      ],
    },
    {
      name: "Platform Work",
      items: [
        "Monorepos",
        "API contracts",
        "CMS delivery",
        "Observability",
        "Developer tooling",
      ],
    },
    {
      name: "Product Domains",
      items: [
        "Admin tools",
        "Multi-tenant SaaS",
        "Commerce flows",
        "Operational consoles",
        "Content workflows",
      ],
    },
  ];

export const PORTFOLIO_BUILD_SEQUENCE: ReadonlyArray<PortfolioShowcaseStep> = [
  {
    title: "Foundation",
    detail:
      "Build the shared platform first: UI, auth, layouts, forms, tables, notifications, and audit log primitives.",
  },
  {
    title: "Public Proof",
    detail:
      "Use `apps/portfolio` to frame the system and explain why the monorepo exists.",
  },
  {
    title: "Strongest Signal",
    detail:
      "Prioritize `apps/admin-demo` and `apps/saas-demo` because they prove the highest-value day-to-day engineering work.",
  },
  {
    title: "Specialization",
    detail:
      "Layer in commerce and operations once the platform foundation is reusable enough to accelerate both surfaces.",
  },
  {
    title: "Workflow Depth",
    detail:
      "Round out the story with content tooling to show editorial systems, governance, and structured publishing.",
  },
];

export const PORTFOLIO_OPERATING_PRINCIPLES: ReadonlyArray<string> = [
  "Design the system before polishing the screen.",
  "Reuse aggressively, but only where the abstraction stays honest.",
  "Model real product constraints instead of portfolio-safe happy paths.",
  "Keep the frontend expressive while the platform layer stays boring and reliable.",
];
