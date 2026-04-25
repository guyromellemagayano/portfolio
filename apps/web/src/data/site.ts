/**
 * @file apps/web/src/data/site.ts
 * @author Guy Romelle Magayano
 * @description Core profile, page, and shell data for the Astro site.
 */

export interface PageData {
  slug: string;
  subheading: string;
  title: string;
  intro: string;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath: string;
  seoNoIndex?: boolean;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  heroTitle: string;
  heroIntro: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  showInHeader: boolean;
  showInFooter: boolean;
}

export interface SocialLink {
  id: string;
  platform: "email" | "github" | "instagram" | "linkedin" | "website" | "x";
  label: string;
  href: string;
}

export interface BuildStep {
  id: string;
  title: string;
  detail: string;
}

export interface ClientOutcome {
  id: string;
  title: string;
  detail: string;
}

export const profile: Profile = {
  name: "Guy Romelle Magayano",
  role: "Product engineer and platform builder",
  location: "Manila, Philippines",
  heroTitle:
    "I help teams turn messy product surfaces into systems they can ship with.",
  heroIntro:
    "Hire me for architecture review, senior product engineering advisory, or focused implementation sprints across frontend systems, platform foundations, and content-heavy product surfaces.",
};

export const navigationLinks: NavigationLink[] = [
  { label: "About", href: "/about", showInHeader: true, showInFooter: true },
  {
    label: "Services",
    href: "/services",
    showInHeader: true,
    showInFooter: true,
  },
  {
    label: "Projects",
    href: "/projects",
    showInHeader: true,
    showInFooter: true,
  },
  {
    label: "Articles",
    href: "/articles",
    showInHeader: true,
    showInFooter: true,
  },
  { label: "Uses", href: "/uses", showInHeader: false, showInFooter: false },
  { label: "Hire", href: "/hire", showInHeader: true, showInFooter: true },
];

export const socialLinks: SocialLink[] = [
  {
    id: "social-instagram",
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/guyromellemagayano",
  },
  {
    id: "social-github",
    platform: "github",
    label: "GitHub",
    href: "https://github.com/guyromellemagayano",
  },
  {
    id: "social-linkedin",
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guyromellemagayano",
  },
  {
    id: "social-email",
    platform: "email",
    label: "Email",
    href: "mailto:aspiredtechie2010@gmail.com",
  },
];

export const focusAreas = [
  "Frontend Architecture",
  "Design Systems",
  "Platform Engineering",
  "Content Modeling",
  "Developer Experience",
  "Product Systems",
] as const;

export const foundationCapabilities = [
  "Shared UI primitives, layout systems, and interaction patterns",
  "Typed contracts and reusable client integrations",
  "Authentication, role checks, and permission-aware routing",
  "Observability helpers for errors, logs, and runtime confidence",
  "Reusable data tables, forms, notifications, and audit log primitives",
] as const;

export const clientOutcomes: ClientOutcome[] = [
  {
    id: "architecture-clarity",
    title: "Architecture clarity",
    detail:
      "Find the boundaries, ownership lines, and delivery risks that are making the product harder to extend.",
  },
  {
    id: "implementation-momentum",
    title: "Implementation momentum",
    detail:
      "Move from recommendations to code with scoped product engineering work that lands in the repo.",
  },
  {
    id: "system-confidence",
    title: "System confidence",
    detail:
      "Tighten accessibility, SEO, performance, testing, and data structure before the surface becomes expensive to change.",
  },
];

export const operatingPrinciples = [
  "Make the domain obvious before making the component reusable.",
  "Prefer fewer moving parts when the product does not need a platform yet.",
  "Use tests to protect behavior and accessibility, not just implementation details.",
  "Keep data close to the page until a real integration earns its weight.",
] as const;

export const buildSteps: BuildStep[] = [
  {
    id: "foundation",
    title: "Foundation",
    detail:
      "Build the shared platform first: UI, layouts, forms, tables, notifications, and content primitives.",
  },
  {
    id: "public-proof",
    title: "Public Proof",
    detail:
      "Use the public portfolio to frame the system and explain why the monorepo exists.",
  },
  {
    id: "strongest-signal",
    title: "Strongest Signal",
    detail:
      "Prioritize product surfaces that prove the highest-value day-to-day engineering work.",
  },
  {
    id: "specialization",
    title: "Specialization",
    detail:
      "Layer in domain-specific flows once the foundation is reusable enough to accelerate each surface.",
  },
];

export const pages: PageData[] = [
  {
    slug: "",
    subheading: "Available for client work",
    title: "Senior product engineering for teams that need cleaner systems.",
    intro:
      "Architecture review, advisory, and implementation support for frontend platforms, product surfaces, and content-driven systems.",
    seoTitle: "Guy Romelle Magayano - Product Engineering Consultant",
    seoDescription:
      "Hire Guy Romelle Magayano for architecture review, product engineering advisory, and implementation sprints for frontend and platform systems.",
    seoCanonicalPath: "/",
  },
  {
    slug: "about",
    subheading: "About",
    title:
      "A product engineer who prefers systems that stay calm under growth.",
    intro:
      "How I think about product engineering, reusable systems, and maintainable delivery.",
    seoTitle: "About - Guy Romelle Magayano",
    seoDescription:
      "Background, priorities, and engineering principles behind the way I build software systems.",
    seoCanonicalPath: "/about",
  },
  {
    slug: "articles",
    subheading: "Articles",
    title:
      "Articles on architecture, systems, and reusable product foundations.",
    intro:
      "Writing on architecture, delivery, reusable UI systems, and the mechanics behind good product engineering.",
    seoTitle: "Articles - Guy Romelle Magayano",
    seoDescription:
      "Essays and notes on frontend architecture, platform systems, and pragmatic product engineering.",
    seoCanonicalPath: "/articles",
  },
  {
    slug: "services",
    subheading: "Services",
    title: "Architecture review, advisory, and direct implementation work.",
    intro:
      "I help teams make better frontend and platform decisions, then turn those decisions into maintainable implementation work.",
    seoTitle: "Services - Guy Romelle Magayano",
    seoDescription:
      "Consulting, architecture review, advisory, and senior implementation work for frontend and platform systems.",
    seoCanonicalPath: "/services",
  },
  {
    slug: "projects",
    subheading: "Projects",
    title: "One platform story, several product surfaces.",
    intro:
      "A lineup of domain-specific apps built on one shared platform foundation.",
    seoTitle: "Projects - Guy Romelle Magayano",
    seoDescription:
      "A catalog of reusable, product-style applications across admin, SaaS, commerce, operations, and content workflows.",
    seoCanonicalPath: "/projects",
  },
  {
    slug: "uses",
    subheading: "Uses",
    title: "The setup behind the work.",
    intro:
      "Software, hardware, and workflow tools I use to ship maintainable product systems.",
    seoTitle: "Uses - Guy Romelle Magayano",
    seoDescription:
      "Recommended tools, setup details, and workflow choices for product and platform engineering.",
    seoCanonicalPath: "/uses",
  },
  {
    slug: "hire",
    subheading: "Hire",
    title: "Share the current constraint and the outcome you need.",
    intro:
      "Share your context and constraints, and I’ll help you move faster with the right product engineering move.",
    seoTitle: "Hire - Guy Romelle Magayano",
    seoDescription:
      "Start a consulting or product engineering conversation about architecture, advisory, or implementation work.",
    seoCanonicalPath: "/hire",
  },
  {
    slug: "book",
    subheading: "Book",
    title: "Choose the best starting point.",
    intro:
      "Pick the path that matches your current constraint, from focused review to a scoped implementation sprint.",
    seoTitle: "Book - Guy Romelle Magayano",
    seoDescription:
      "Choose a starting path for architecture review, advisory, or implementation work.",
    seoCanonicalPath: "/book",
  },
];

export function getPage(slug: string): PageData {
  const normalizedSlug = slug.trim();
  const page = pages.find((entry) => entry.slug === normalizedSlug);

  if (!page) {
    throw new Error(
      `Page data not found for slug "${normalizedSlug || "home"}".`
    );
  }

  return page;
}
