/**
 * @file apps/web/src/data/projects.ts
 * @author Guy Romelle Magayano
 * @description Project and product-surface data for portfolio pages.
 */

export interface ProjectLink {
  label: string;
  href: string;
  target?: "_blank" | "_self";
  rel?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  path: string;
  description: string;
  bullets: string[];
  tags: string[];
  website?: ProjectLink;
  repository?: ProjectLink;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "guy-os",
    slug: "guy-os",
    title: "Guy OS",
    path: "apps/web",
    description:
      "The public portfolio app that frames the monorepo as a coherent product platform.",
    bullets: [
      "Branding restraint and frontend quality",
      "Case study storytelling and SEO",
      "A clear entry point into the broader platform",
    ],
    tags: ["portfolio", "branding", "platform"],
    website: {
      label: "guyromellemagayano.com",
      href: "https://www.guyromellemagayano.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    featured: true,
  },
  {
    id: "taskflow",
    slug: "taskflow",
    title: "TaskFlow",
    path: "apps/saas-demo",
    description:
      "A multi-tenant SaaS product designed around teams, projects, tasks, billing, events, and automation.",
    bullets: [
      "Multi-tenant application modeling",
      "Product-grade data relationships",
      "Full-stack delivery with clear UX tradeoffs",
    ],
    tags: ["saas", "multi-tenant", "product"],
    repository: {
      label: "github.com",
      href: "https://github.com/guyromellemagayano",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    featured: true,
  },
  {
    id: "cartforge",
    slug: "cartforge",
    title: "CartForge",
    path: "apps/commerce-demo",
    description:
      "A commerce-focused surface for catalog, cart, checkout, fulfillment, and transaction-state orchestration.",
    bullets: [
      "Commerce flows and transactional states",
      "Pricing, checkout, and order thinking",
      "High-friction UI paths handled pragmatically",
    ],
    tags: ["commerce", "checkout", "transactions"],
    repository: {
      label: "github.com",
      href: "https://github.com/guyromellemagayano",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    featured: true,
  },
  {
    id: "pulseops",
    slug: "pulseops",
    title: "PulseOps",
    path: "apps/ops-demo",
    description:
      "An operational console for queues, incidents, jobs, retries, and visibility into system health and manual interventions.",
    bullets: [
      "Operations UX for high-signal data",
      "Observability-aware product design",
      "Recovery paths and failure handling",
    ],
    tags: ["ops", "observability", "reliability"],
    repository: {
      label: "github.com",
      href: "https://github.com/guyromellemagayano",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: "contentforge",
    slug: "contentforge",
    title: "ContentForge",
    path: "apps/cms-demo",
    description:
      "A content workflow app for structured editorial systems, preview, approvals, versioning, and headless content thinking.",
    bullets: [
      "Editorial and publishing workflows",
      "Structured content relationships",
      "Preview, approval, and governance layers",
    ],
    tags: ["content", "editorial", "workflow"],
    repository: {
      label: "github.com",
      href: "https://github.com/guyromellemagayano",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
];
