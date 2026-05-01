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
  role: "Senior full-stack software engineer",
  location: "Davao City, Philippines",
  heroTitle: "Refined engineering for reliable web platforms.",
  heroIntro:
    "I build, modernize, and stabilize production web platforms across commerce, publishing, SaaS, internal tools, and content-heavy systems.",
};

export const navigationLinks: NavigationLink[] = [
  {
    label: "Work",
    href: "/work",
    showInHeader: true,
    showInFooter: true,
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    showInHeader: true,
    showInFooter: true,
  },
  { label: "About", href: "/about", showInHeader: true, showInFooter: true },
  {
    label: "Notes",
    href: "/notes",
    showInHeader: true,
    showInFooter: true,
  },
  {
    label: "Contact",
    href: "/contact",
    showInHeader: true,
    showInFooter: true,
  },
  { label: "Labs", href: "/labs", showInHeader: false, showInFooter: true },
  { label: "Uses", href: "/uses", showInHeader: false, showInFooter: false },
  {
    label: "Privacy",
    href: "/privacy",
    showInHeader: false,
    showInFooter: true,
  },
];

export const socialLinks: SocialLink[] = [
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
  "Full-stack Platform Engineering",
  "Commerce and CMS Architecture",
  "Performance and Release Reliability",
  "Testing and Quality Systems",
  "Technical Leadership",
  "Accessibility and SEO",
] as const;

export const foundationCapabilities = [
  "Production storefront and publishing workflows that stay maintainable under change",
  "Full-stack product surfaces with explicit data flow, release checks, and observability",
  "Accessibility, SEO, and Core Web Vitals treated as product-quality requirements",
  "Technical direction that connects architecture decisions to team delivery risk",
  "Documentation and tests that help teams maintain the work after handoff",
] as const;

export const clientOutcomes: ClientOutcome[] = [
  {
    id: "architecture-clarity",
    title: "Architecture clarity",
    detail:
      "Find the system boundaries, ownership lines, and delivery risks that make production surfaces harder to extend.",
  },
  {
    id: "implementation-momentum",
    title: "Delivery confidence",
    detail:
      "Turn recommendations into scoped implementation work with tests, reviewable checkpoints, and clear handoff notes.",
  },
  {
    id: "system-confidence",
    title: "Operational calm",
    detail:
      "Tighten performance, accessibility, SEO, observability, and release paths before small issues become business risk.",
  },
];

export const operatingPrinciples = [
  "Design the system before polishing the screen.",
  "Make abstractions earn their place.",
  "Treat performance and accessibility as product quality.",
  "Automate checks that protect important releases.",
  "Document decisions so teams can maintain the work.",
] as const;

export const buildSteps: BuildStep[] = [
  {
    id: "foundation",
    title: "Understand the real constraint",
    detail:
      "Start with the workflow, release risk, business constraint, and team context before naming the technical fix.",
  },
  {
    id: "public-proof",
    title: "Map the system",
    detail:
      "Make the data flow, ownership boundaries, coupling, and quality gaps visible enough to discuss calmly.",
  },
  {
    id: "strongest-signal",
    title: "Ship the narrow fix",
    detail:
      "Land the smallest meaningful slice with tests, documentation, and verification tied to the outcome.",
  },
  {
    id: "specialization",
    title: "Leave a maintainable path",
    detail:
      "Hand off decisions, tradeoffs, and follow-up risks so the team can keep moving after the engagement.",
  },
];

export const pages: PageData[] = [
  {
    slug: "",
    subheading: "Senior full-stack engineering",
    title:
      "Reliable web platforms for teams that need clearer architecture and safer delivery.",
    intro:
      "Production-focused engineering across commerce, publishing, SaaS, internal tools, and content-heavy systems.",
    seoTitle: "Guy Romelle Magayano - Senior Full-Stack Software Engineer",
    seoDescription:
      "Senior full-stack software engineer building, modernizing, and stabilizing reliable web platforms across commerce, publishing, SaaS, and internal systems.",
    seoCanonicalPath: "/",
  },
  {
    slug: "about",
    subheading: "About",
    title: "A senior engineer focused on systems that stay clear under growth.",
    intro:
      "Background, priorities, and working principles behind the way I build and stabilize web platforms.",
    seoTitle: "About - Guy Romelle Magayano",
    seoDescription:
      "Background, priorities, and engineering principles behind Guy Romelle Magayano's full-stack platform work.",
    seoCanonicalPath: "/about",
  },
  {
    slug: "notes",
    subheading: "Notes",
    title: "Notes on architecture, delivery, and maintainable web platforms.",
    intro:
      "Short writing on architecture, release safety, content systems, and the mechanics behind reliable product engineering.",
    seoTitle: "Notes - Guy Romelle Magayano",
    seoDescription:
      "Notes on frontend architecture, platform systems, release safety, content modeling, and pragmatic product engineering.",
    seoCanonicalPath: "/notes",
  },
  {
    slug: "capabilities",
    subheading: "Capabilities",
    title:
      "Full-stack engineering for clearer architecture, better performance, and safer releases.",
    intro:
      "Practical support across platform engineering, commerce and CMS architecture, quality systems, and technical leadership.",
    seoTitle: "Capabilities - Guy Romelle Magayano",
    seoDescription:
      "Capabilities across full-stack platform engineering, commerce and CMS architecture, performance, testing, release reliability, and technical leadership.",
    seoCanonicalPath: "/capabilities",
  },
  {
    slug: "work",
    subheading: "Work",
    title:
      "Selected production work across commerce, publishing, SaaS, and operations.",
    intro:
      "A curated view of production systems, platform improvements, and delivery work across business-critical web surfaces.",
    seoTitle: "Work - Guy Romelle Magayano",
    seoDescription:
      "Selected work by Guy Romelle Magayano across commerce, publishing, SaaS, internal tooling, public-sector systems, performance, and release reliability.",
    seoCanonicalPath: "/work",
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
    slug: "contact",
    subheading: "Contact",
    title: "Start with the current constraint and the outcome you need.",
    intro:
      "For roles, consulting, advisory, or platform modernization work, send the context, constraint, and result you need.",
    seoTitle: "Contact - Guy Romelle Magayano",
    seoDescription:
      "Contact Guy Romelle Magayano about senior full-stack engineering roles, architecture review, technical advisory, or implementation work.",
    seoCanonicalPath: "/contact",
  },
  {
    slug: "privacy",
    subheading: "Privacy and consent",
    title: "How this site handles analytics and contact paths.",
    intro:
      "How this portfolio handles hosting logs, analytics, performance measurement, direct contact paths, and external profile links.",
    seoTitle: "Privacy and Consent - Guy Romelle Magayano",
    seoDescription:
      "Privacy and analytics disclosure for the Guy Romelle Magayano portfolio and professional site.",
    seoCanonicalPath: "/privacy",
  },
  {
    slug: "labs",
    subheading: "Labs",
    title:
      "Engineering lab surfaces that show how I think about product systems.",
    intro:
      "Production-style demos exploring platform foundations, product systems, commerce flows, operational consoles, and content workflows.",
    seoTitle: "Labs - Guy Romelle Magayano",
    seoDescription:
      "Engineering lab demos by Guy Romelle Magayano showing platform foundations, SaaS, commerce, operations, and content workflow thinking.",
    seoCanonicalPath: "/labs",
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
