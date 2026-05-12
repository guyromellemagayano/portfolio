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
  footerGroup?: "primary" | "reference";
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

export interface SitePathway {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
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
    label: "Services",
    href: "/capabilities",
    showInHeader: true,
    showInFooter: true,
    footerGroup: "primary",
  },
  {
    label: "Notes",
    href: "/notes",
    showInHeader: true,
    showInFooter: true,
    footerGroup: "primary",
  },
  {
    label: "About",
    href: "/about",
    showInHeader: true,
    showInFooter: true,
    footerGroup: "primary",
  },
  {
    label: "Contact",
    href: "/contact",
    showInHeader: false,
    showInFooter: true,
    footerGroup: "primary",
  },
  {
    label: "Labs",
    href: "/labs",
    showInHeader: false,
    showInFooter: true,
    footerGroup: "reference",
  },
  {
    label: "Uses",
    href: "/uses",
    showInHeader: false,
    showInFooter: true,
    footerGroup: "reference",
  },
  {
    label: "Privacy",
    href: "/privacy",
    showInHeader: false,
    showInFooter: true,
    footerGroup: "reference",
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

export const homePathways: SitePathway[] = [
  {
    id: "production-proof",
    title: "Review production proof",
    description:
      "Production examples across platform, commerce, publishing, SaaS, and operational systems.",
    href: "/about#selected-work",
    cta: "See case studies",
  },
  {
    id: "service-fit",
    title: "Find the right service",
    description:
      "Architecture review, advisory input, and direct implementation for contained product surfaces.",
    href: "/capabilities",
    cta: "View services",
  },
  {
    id: "engineering-judgment",
    title: "Read the thinking",
    description:
      "Practical writing on architecture, delivery risk, content systems, and maintainable product work.",
    href: "/notes",
    cta: "Read notes",
  },
];

export const pagePathways = {
  about: [
    {
      id: "about-notes",
      title: "Read the thinking behind the work",
      description:
        "Architecture and delivery notes that show how the product and platform decisions are made.",
      href: "/notes",
      cta: "Read notes",
    },
    {
      id: "about-services",
      title: "Map the experience to your need",
      description:
        "Architecture review, advisory, and delivery sprint paths for different constraints.",
      href: "/capabilities",
      cta: "View services",
    },
    {
      id: "about-contact",
      title: "Start with direct context",
      description:
        "Share the workflow, risk, or product surface where senior engineering judgment would help.",
      href: "/contact",
      cta: "Contact me",
    },
  ],
  capabilities: [
    {
      id: "services-work",
      title: "Validate the services against proof",
      description:
        "Selected work showing how the services map to real product systems.",
      href: "/about#selected-work",
      cta: "See case studies",
    },
    {
      id: "services-notes",
      title: "Read the technical thinking",
      description:
        "Architecture and delivery notes that show the decision-making style behind the work.",
      href: "/notes",
      cta: "Read notes",
    },
    {
      id: "services-contact",
      title: "Discuss the engagement shape",
      description:
        "Send the product context, delivery risk, and outcome that would make the work worthwhile.",
      href: "/contact",
      cta: "Start a conversation",
    },
  ],
  labs: [
    {
      id: "labs-work",
      title: "Compare labs with production work",
      description:
        "Move from product-system experiments into production examples with client and platform context.",
      href: "/about#selected-work",
      cta: "See case studies",
    },
    {
      id: "labs-services",
      title: "Turn an experiment into implementation",
      description:
        "Services for teams that want similar product-system thinking applied to a real codebase.",
      href: "/capabilities",
      cta: "View services",
    },
  ],
  notes: [
    {
      id: "notes-services",
      title: "Turn the thinking into a scope",
      description:
        "Service paths for product surfaces or platforms facing similar constraints.",
      href: "/capabilities",
      cta: "View services",
    },
    {
      id: "notes-work",
      title: "See where the ideas show up",
      description:
        "Review selected work for production examples of architecture, delivery, and platform decisions.",
      href: "/about#selected-work",
      cta: "See case studies",
    },
    {
      id: "notes-contact",
      title: "Start a focused conversation",
      description:
        "Send the system constraint, team context, and outcome you need to make real.",
      href: "/contact",
      cta: "Contact me",
    },
  ],
} satisfies Record<string, SitePathway[]>;

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
      "Background, selected work, priorities, and working principles behind the way I build and stabilize web platforms.",
    seoTitle: "About - Guy Romelle Magayano",
    seoDescription:
      "Background, selected work, and engineering principles behind Guy Romelle Magayano's full-stack platform work.",
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
    subheading: "Services",
    title:
      "Senior engineering services for clearer systems and safer delivery.",
    intro:
      "Architecture review, technical advisory, and implementation support for teams working through platform, commerce, CMS, performance, and release constraints.",
    seoTitle: "Services - Guy Romelle Magayano",
    seoDescription:
      "Senior engineering services across architecture review, technical advisory, delivery sprints, platform engineering, commerce and CMS architecture, performance, testing, and release reliability.",
    seoCanonicalPath: "/capabilities",
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
