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
  caseStudy: {
    problem: string;
    role: string;
    decisions: string[];
    outcome: string;
    proof: string[];
  };
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
    caseStudy: {
      problem:
        "The portfolio needed to stop feeling like a loose collection of demos and start explaining the product engineering judgment behind the monorepo.",
      role: "I rebuilt the public surface as an Astro-first portfolio with local typed data, structured metadata, and service-oriented positioning.",
      decisions: [
        "Moved public pages to static Astro templates instead of client-heavy React routes.",
        "Kept data close to the pages so content can be reviewed without a remote content service.",
        "Added search-friendly schema around the owner, services, contact path, articles, and project proof.",
      ],
      outcome:
        "The site now behaves like a services page and a portfolio at the same time: fast static pages, clear calls to action, and a stronger explanation of the platform work.",
      proof: [
        "Static build with production-safe sitemap and robots output.",
        "Reusable local data records for services, articles, projects, and profile content.",
        "Structured page metadata that identifies Guy Romelle Magayano as owner, author, publisher, and provider.",
      ],
    },
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
    caseStudy: {
      problem:
        "Multi-tenant SaaS surfaces often drift when teams build billing, teams, projects, and permissions as separate feature islands.",
      role: "I use TaskFlow as a product-systems reference for modeling tenant boundaries, shared workflows, and stateful product operations.",
      decisions: [
        "Treat teams, projects, tasks, billing, and events as connected product primitives.",
        "Keep permission-aware routing and reusable UI states visible in the architecture.",
        "Design screens around repeated operator actions rather than one-off marketing flows.",
      ],
      outcome:
        "The project demonstrates how I would help a SaaS team reduce delivery friction before product growth makes the core model expensive to change.",
      proof: [
        "Domain model covers teams, projects, tasks, billing, events, and automation.",
        "Reusable app patterns support repeated operational workflows.",
        "The surface frames platform decisions as product leverage, not only code organization.",
      ],
    },
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
    caseStudy: {
      problem:
        "Commerce flows become fragile when catalog, cart, checkout, fulfillment, and order states are handled as disconnected UI problems.",
      role: "I frame CartForge as a transaction-heavy product surface where the user journey has to stay clear while the state model does the hard work.",
      decisions: [
        "Separate catalog exploration from checkout commitment and fulfillment status.",
        "Make pricing, payment, and order state explicit instead of hiding them in component state.",
        "Design the UI around recovery paths for high-friction moments.",
      ],
      outcome:
        "The case study shows how commerce implementation benefits from boring, explicit state boundaries and careful user-facing feedback.",
      proof: [
        "Flow coverage includes catalog, cart, checkout, fulfillment, and transaction states.",
        "The project highlights pricing and order behavior as architecture concerns.",
        "The UI path is structured for clarity under high user intent.",
      ],
    },
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
    caseStudy: {
      problem:
        "Internal operations tools often bury the signals teams need to recover from incidents, queue failures, and retry-heavy workflows.",
      role: "I use PulseOps to show how operational consoles should prioritize scan density, recovery paths, and accountability over decorative dashboard patterns.",
      decisions: [
        "Prioritize queues, incidents, jobs, retries, and owner context in the information architecture.",
        "Keep failure states visible and actionable instead of treating them as generic alerts.",
        "Design the surface for repeated use by operators under time pressure.",
      ],
      outcome:
        "The project demonstrates the kind of quiet, high-signal interface work I bring to operational and platform-heavy products.",
      proof: [
        "The domain model covers queues, incidents, retries, and manual interventions.",
        "The project frames observability as a product workflow, not only a backend concern.",
        "Recovery paths are treated as first-class user journeys.",
      ],
    },
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
    caseStudy: {
      problem:
        "Content-heavy products slow down when editorial workflow, route metadata, preview, and approvals are modeled after tooling defaults instead of product needs.",
      role: "I use ContentForge to show how structured content can improve navigation, SEO, publishing confidence, and delivery consistency.",
      decisions: [
        "Treat content models as product architecture that shapes routes, metadata, and previews.",
        "Make approval and versioning states visible enough for both editors and engineers.",
        "Keep content delivery portable so the product is not locked to one remote service too early.",
      ],
      outcome:
        "The project gives a concrete story for teams that need content systems without letting the tooling own the product model.",
      proof: [
        "The workflow covers preview, approvals, versioning, and structured editorial relationships.",
        "The case study connects content modeling directly to SEO and delivery reliability.",
        "The data shape remains easy to inspect and evolve.",
      ],
    },
    tags: ["content", "editorial", "workflow"],
    repository: {
      label: "github.com",
      href: "https://github.com/guyromellemagayano",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
];
