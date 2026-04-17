/**
 * @file packages/content-data/src/portfolio.ts
 * @author Guy Romelle Magayano
 * @description Local Portfolio-style content snapshot structured for headless CMS portability.
 */

import type { ContentPortfolioSnapshot } from "@portfolio/api-contracts/content";

/** Portfolio-style local snapshot used to model a Django/Wagtail-ready content graph. */
export const portfolioSnapshot: ContentPortfolioSnapshot = {
  schemaVersion: "1.0",
  profile: {
    id: "profile-guy-romelle",
    name: "Guy Romelle Magayano",
    role: "Product engineer, platform builder, and systems thinker",
    location: "New York City, NY",
    heroTitle: "I build reusable product systems for the web.",
    heroIntro:
      "This portfolio frames a product-focused monorepo built around shared platform foundations, production-style demos, and practical engineering case studies.",
    avatar: {
      id: "image-avatar-guy-romelle",
      src: "https://cdn.example.com/images/avatar-guy-romelle.jpg",
      alt: "Portrait of Guy Romelle Magayano",
      width: 512,
      height: 512,
    },
    status: "published",
  },
  navigation: [
    {
      id: "nav-services",
      label: "Services",
      href: "/services",
      order: 1,
      showInHeader: true,
      showInFooter: true,
    },
    {
      id: "nav-blog",
      label: "Blog",
      href: "/articles",
      order: 2,
      showInHeader: true,
      showInFooter: true,
    },
    {
      id: "nav-projects",
      label: "Projects",
      href: "/projects",
      order: 3,
      showInHeader: true,
      showInFooter: true,
    },
    {
      id: "nav-hire",
      label: "Hire",
      href: "/hire",
      order: 4,
      showInHeader: true,
      showInFooter: true,
    },
  ],
  socialLinks: [
    {
      id: "social-instagram",
      platform: "instagram",
      label: "Follow me on Instagram",
      href: "https://www.instagram.com/guyromellemagayano",
      order: 1,
    },
    {
      id: "social-github",
      platform: "github",
      label: "Follow me on GitHub",
      href: "https://github.com/guyromellemagayano",
      order: 2,
    },
    {
      id: "social-linkedin",
      platform: "linkedin",
      label: "Follow me on LinkedIn",
      href: "https://www.linkedin.com/in/guyromellemagayano",
      order: 3,
    },
    {
      id: "social-email",
      platform: "email",
      label: "Send me an email",
      href: "mailto:aspiredtechie2010@gmail.com",
      order: 4,
    },
  ],
  showcaseApps: [
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
      status: "published",
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
      status: "published",
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
      status: "published",
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
      status: "published",
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
      status: "published",
    },
  ],
  serviceOfferings: [
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
      status: "published",
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
      status: "published",
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
      status: "published",
    },
  ],
  capabilityClusters: [
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
      status: "published",
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
      status: "published",
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
      status: "published",
    },
  ],
  focusAreas: [
    "Frontend Architecture",
    "Design Systems",
    "Platform Engineering",
    "Content Modeling",
    "Developer Experience",
    "Product Systems",
  ],
  foundationCapabilities: [
    "Shared UI primitives, layout systems, and interaction patterns",
    "Typed API contracts and reusable client integrations",
    "Authentication, role checks, and permission-aware routing",
    "Observability helpers for errors, logs, and runtime confidence",
    "Reusable data tables, forms, notifications, and audit log primitives",
  ],
  buildSequence: [
    {
      id: "build-sequence-foundation",
      title: "Foundation",
      detail:
        "Build the shared platform first: UI, auth, layouts, forms, tables, notifications, and audit log primitives.",
      order: 1,
      status: "published",
    },
    {
      id: "build-sequence-public-proof",
      title: "Public Proof",
      detail:
        "Use `apps/portfolio` to frame the system and explain why the monorepo exists.",
      order: 2,
      status: "published",
    },
    {
      id: "build-sequence-strongest-signal",
      title: "Strongest Signal",
      detail:
        "Prioritize `apps/saas-demo` because it proves the highest-value day-to-day engineering work.",
      order: 3,
      status: "published",
    },
    {
      id: "build-sequence-specialization",
      title: "Specialization",
      detail:
        "Layer in commerce and operations once the platform foundation is reusable enough to accelerate both surfaces.",
      order: 4,
      status: "published",
    },
    {
      id: "build-sequence-workflow-depth",
      title: "Workflow Depth",
      detail:
        "Round out the story with content tooling to show editorial systems, governance, and structured publishing.",
      order: 5,
      status: "published",
    },
  ],
  bookingPaths: [
    {
      id: "booking-path-email",
      title: "Email me directly",
      description:
        "Best when you already know the project context and want to send a compact brief.",
      href: "mailto:aspiredtechie2010@gmail.com?subject=Project%20Inquiry",
      cta: "Send email",
      target: "_blank",
      order: 1,
      status: "published",
    },
    {
      id: "booking-path-hire-form",
      title: "Start with the hire form",
      description:
        "Best when you want a simple path and a little more structure around the inquiry.",
      href: "/hire",
      cta: "Open hire form",
      order: 2,
      status: "published",
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
      status: "published",
    },
  ],
  operatingPrinciples: [
    "Design the system before polishing the screen.",
    "Reuse aggressively, but only where the abstraction stays honest.",
    "Model real product constraints instead of portfolio-safe happy paths.",
    "Keep the frontend expressive while the platform layer stays boring and reliable.",
  ],
  pages: [
    {
      id: "page-home",
      slug: "",
      subheading: "Home",
      title: "Home",
      intro:
        "The public shell for a reusable product platform spanning admin, SaaS, commerce, operations, and content workflows.",
      template: "home",
      sections: [
        {
          type: "hero",
          profileId: "profile-guy-romelle",
          socialLinkIds: [
            "social-instagram",
            "social-github",
            "social-linkedin",
            "social-email",
          ],
        },
        {
          type: "projects",
          title: "Featured projects",
          intro: "The highest-signal apps in the portfolio monorepo.",
          projectSlugs: ["guy-os", "taskflow"],
        },
        {
          type: "speaking",
          title: "Speaking",
          intro:
            "Talks and interviews on product engineering and systems design.",
          appearanceSlugs: [
            "scaling-design-systems-without-losing-velocity",
            "building-reliable-content-platforms",
            "engineering-leadership-office-hours",
          ],
        },
        {
          type: "photoGallery",
          title: "From my camera roll",
          photoIds: ["photo-1", "photo-2", "photo-3", "photo-4", "photo-5"],
        },
      ],
      seoTitle: "Guy Romelle Magayano",
      seoDescription:
        "Product engineer and platform builder writing about systems, delivery, and reusable software foundations.",
      seoCanonicalPath: "/",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-about",
      slug: "about",
      subheading: "About",
      title: "About",
      intro:
        "How I think about product engineering, reusable systems, and maintainable delivery.",
      template: "about",
      sections: [
        {
          type: "richText",
          title: "Hi, I’m Guy.",
          body: "I design and ship software systems that stay coherent as product scope grows. My work sits at the intersection of frontend architecture, platform foundations, design systems, and pragmatic backend delivery.",
        },
        {
          type: "experience",
          title: "Work",
          intro: "A few roles and teams that shaped my approach.",
          experienceIds: [
            "work-planetaria",
            "work-airbnb",
            "work-facebook",
            "work-starbucks",
          ],
        },
      ],
      seoTitle: "About - Guy Romelle Magayano",
      seoDescription:
        "Background, priorities, and engineering principles behind the way I build software systems.",
      seoCanonicalPath: "/about",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-articles",
      slug: "articles",
      subheading: "Articles",
      title: "Articles",
      intro:
        "Writing on architecture, delivery, reusable UI systems, and the mechanics behind good product engineering.",
      template: "articles",
      sections: [
        {
          type: "richText",
          body: "Article list content is sourced from article documents and rendered in reverse chronological order.",
        },
      ],
      seoTitle: "Articles - Guy Romelle Magayano",
      seoDescription:
        "Essays and notes on frontend architecture, platform systems, and pragmatic product engineering.",
      seoCanonicalPath: "/articles",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-services",
      slug: "services",
      subheading: "Services",
      title: "Architecture, advisory, and delivery for product systems.",
      intro:
        "I help teams make better frontend and platform decisions, then turn those decisions into maintainable implementation work.",
      template: "services",
      sections: [
        {
          type: "richText",
          body: "Service offerings are sourced from the shared portfolio snapshot so the public brochure copy stays aligned with the API contract.",
        },
      ],
      seoTitle: "Services - Guy Romelle Magayano",
      seoDescription:
        "Consulting, architecture review, advisory, and senior implementation work for frontend and platform systems.",
      seoCanonicalPath: "/services",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-projects",
      slug: "projects",
      subheading: "Projects",
      title: "Projects",
      intro:
        "A lineup of domain-specific apps built on one shared platform foundation.",
      template: "projects",
      sections: [
        {
          type: "projects",
          title: "Projects",
          projectSlugs: [
            "guy-os",
            "taskflow",
            "cartforge",
            "pulseops",
            "contentforge",
          ],
        },
      ],
      seoTitle: "Projects - Guy Romelle Magayano",
      seoDescription:
        "A catalog of reusable, product-style applications across admin, SaaS, commerce, operations, and content workflows.",
      seoCanonicalPath: "/projects",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-speaking",
      slug: "speaking",
      subheading: "Speaking",
      title: "Speaking",
      intro: "Talks, podcasts, and workshops.",
      template: "speaking",
      sections: [
        {
          type: "speaking",
          title: "Recent appearances",
          appearanceSlugs: [
            "scaling-design-systems-without-losing-velocity",
            "building-reliable-content-platforms",
            "engineering-leadership-office-hours",
          ],
        },
      ],
      seoTitle: "Speaking - Guy Romelle Magayano",
      seoDescription:
        "Conversations on platform engineering, frontend systems, and leadership.",
      seoCanonicalPath: "/speaking",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-uses",
      slug: "uses",
      subheading: "Uses",
      title: "Uses",
      intro:
        "Software, hardware, and workflow tools I use to ship maintainable product systems.",
      template: "uses",
      sections: [
        {
          type: "uses",
          title: "Uses",
          categorySlugs: [
            "workstation",
            "developer-tooling",
            "productivity",
            "recording",
          ],
        },
      ],
      seoTitle: "Uses - Guy Romelle Magayano",
      seoDescription:
        "Recommended tools, setup details, and workflow choices for product and platform engineering.",
      seoCanonicalPath: "/uses",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-hire",
      slug: "hire",
      subheading: "Hire",
      title: "Let’s build a clean next step together.",
      intro:
        "Share your context and constraints, and I’ll help you move faster with the right product engineering move.",
      template: "hire",
      sections: [
        {
          type: "ctaList",
          title: "Other ways to start",
          ctas: [
            {
              label: "Send me an email",
              href: "mailto:aspiredtechie2010@gmail.com",
              target: "_blank",
            },
            {
              label: "Connect on LinkedIn",
              href: "https://www.linkedin.com/in/guyromellemagayano",
              target: "_blank",
            },
          ],
        },
      ],
      seoTitle: "Hire - Guy Romelle Magayano",
      seoDescription:
        "Start a consulting or product engineering conversation about architecture, advisory, or implementation work.",
      seoCanonicalPath: "/hire",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
    {
      id: "page-book",
      slug: "book",
      subheading: "Book",
      title: "Choose the best way to start the conversation.",
      intro:
        "If you're not sure whether you need a review, advisory, or hands-on implementation, this page gives you a clean starting point.",
      template: "book",
      sections: [
        {
          type: "ctaList",
          title: "Starting points",
          ctas: [
            {
              label: "Email me directly",
              href: "mailto:aspiredtechie2010@gmail.com?subject=Project%20Inquiry",
              target: "_blank",
            },
            {
              label: "Open hire form",
              href: "/hire",
            },
            {
              label: "Reach out on LinkedIn",
              href: "https://www.linkedin.com/in/guyromellemagayano",
              target: "_blank",
            },
          ],
        },
      ],
      seoTitle: "Book - Guy Romelle Magayano",
      seoDescription:
        "Choose the right first step for a project inquiry, architecture review, advisory engagement, or delivery sprint.",
      seoCanonicalPath: "/book",
      hideFromSitemap: false,
      seoNoIndex: false,
      status: "published",
      publishedAt: "2026-03-13T00:00:00.000Z",
      updatedAt: "2026-03-13T00:00:00.000Z",
    },
  ],
  projects: [
    {
      id: "project-guy-os",
      slug: "guy-os",
      name: "Guy OS",
      summary:
        "The public portfolio app that frames the monorepo as a coherent product platform.",
      description:
        "A portfolio surface built to explain reusable systems, case studies, and shared engineering foundations.",
      website: {
        label: "guyromellemagayano.com",
        href: "https://www.guyromellemagayano.com",
        target: "_blank",
      },
      tags: ["portfolio", "branding", "platform"],
      featured: true,
      order: 1,
      status: "published",
    },
    {
      id: "project-taskflow",
      slug: "taskflow",
      name: "TaskFlow",
      summary:
        "A multi-tenant SaaS product designed around teams, projects, tasks, billing, events, and automation.",
      repository: {
        label: "github.com",
        href: "https://github.com/guyromellemagayano",
        target: "_blank",
      },
      tags: ["saas", "multi-tenant", "product"],
      featured: true,
      order: 2,
      status: "published",
    },
    {
      id: "project-cartforge",
      slug: "cartforge",
      name: "CartForge",
      summary:
        "A commerce demo focused on catalog, cart, checkout, order state, and fulfillment flows.",
      repository: {
        label: "github.com",
        href: "https://github.com/guyromellemagayano",
        target: "_blank",
      },
      tags: ["commerce", "checkout", "transactions"],
      order: 3,
      status: "published",
    },
    {
      id: "project-pulseops",
      slug: "pulseops",
      name: "PulseOps",
      summary:
        "An operations console for queues, retries, incidents, and the workflows around system recovery.",
      repository: {
        label: "github.com",
        href: "https://github.com/guyromellemagayano",
        target: "_blank",
      },
      tags: ["ops", "observability", "reliability"],
      order: 4,
      status: "published",
    },
    {
      id: "project-contentforge",
      slug: "contentforge",
      name: "ContentForge",
      summary:
        "A structured content workflow demo for editorial modeling, approvals, preview, and versioning.",
      repository: {
        label: "github.com",
        href: "https://github.com/guyromellemagayano",
        target: "_blank",
      },
      tags: ["cms", "editorial", "content"],
      order: 6,
      status: "published",
    },
  ],
  speakingAppearances: [
    {
      id: "speaking-design-systems-velocity",
      slug: "scaling-design-systems-without-losing-velocity",
      title: "Scaling Design Systems Without Losing Velocity",
      event: "Frontend Foundry Conference",
      category: "conference",
      date: "2025-11-12T00:00:00.000Z",
      location: "San Francisco, CA",
      summary:
        "Practical strategies for balancing governance and shipping speed across product teams.",
      cta: {
        label: "Watch recording",
        href: "https://www.youtube.com/",
        target: "_blank",
      },
      featured: true,
      order: 1,
      status: "published",
    },
    {
      id: "speaking-content-platforms",
      slug: "building-reliable-content-platforms",
      title: "Building Reliable Content Platforms",
      event: "Platform Engineering Podcast",
      category: "podcast",
      date: "2025-09-04T00:00:00.000Z",
      summary:
        "How to make content pipelines resilient while keeping editorial workflows simple.",
      cta: {
        label: "Listen now",
        href: "https://www.youtube.com/",
        target: "_blank",
      },
      featured: true,
      order: 2,
      status: "published",
    },
    {
      id: "speaking-leadership-office-hours",
      slug: "engineering-leadership-office-hours",
      title: "Engineering Leadership Office Hours",
      event: "Builders Guild",
      category: "panel",
      date: "2025-06-21T00:00:00.000Z",
      summary:
        "A panel session on coaching IC growth, architecture reviews, and delivery confidence.",
      order: 3,
      status: "published",
    },
  ],
  useCategories: [
    {
      id: "use-category-workstation",
      slug: "workstation",
      title: "Workstation",
      intro: "Hardware I use every day.",
      items: [
        {
          id: "use-macbook-pro",
          name: "16-inch MacBook Pro",
          summary: "My primary machine for engineering and design work.",
          order: 1,
        },
        {
          id: "use-studio-display",
          name: "Apple Studio Display",
          summary: "Main display for coding and visual review tasks.",
          order: 2,
        },
      ],
      order: 1,
      status: "published",
    },
    {
      id: "use-category-developer-tooling",
      slug: "developer-tooling",
      title: "Developer tooling",
      intro: "Core tools in my build and delivery workflow.",
      items: [
        {
          id: "use-nextjs",
          name: "Next.js + Turborepo",
          summary: "App framework and monorepo pipeline foundation.",
          order: 1,
        },
        {
          id: "use-playwright",
          name: "Playwright",
          summary: "Primary browser automation and end-to-end test tooling.",
          order: 2,
        },
      ],
      order: 2,
      status: "published",
    },
    {
      id: "use-category-productivity",
      slug: "productivity",
      title: "Productivity",
      intro: "How I organize daily planning and notes.",
      items: [
        {
          id: "use-notion",
          name: "Notion",
          summary: "Roadmaps, planning docs, and weekly review workflows.",
          order: 1,
        },
        {
          id: "use-linear",
          name: "Linear",
          summary: "Issue tracking and product delivery operations.",
          order: 2,
        },
      ],
      order: 3,
      status: "published",
    },
    {
      id: "use-category-recording",
      slug: "recording",
      title: "Recording",
      intro: "Tools for audio/video calls and content creation.",
      items: [
        {
          id: "use-shure-mv7",
          name: "Shure MV7",
          summary: "Mic for calls, workshops, and recordings.",
          order: 1,
        },
        {
          id: "use-obs",
          name: "OBS Studio",
          summary: "Scene composition and recording for demos and talks.",
          order: 2,
        },
      ],
      order: 4,
      status: "published",
    },
  ],
  workExperience: [
    {
      id: "work-planetaria",
      company: "Planetaria",
      role: "CEO",
      startDate: "2019-01-01",
      isCurrentRole: true,
      summary:
        "Leading product strategy, engineering direction, and operations.",
      order: 1,
      status: "published",
    },
    {
      id: "work-airbnb",
      company: "Airbnb",
      role: "Product Designer",
      startDate: "2014-01-01",
      endDate: "2019-01-01",
      summary:
        "Designed user-facing product surfaces and collaborative systems.",
      order: 2,
      status: "published",
    },
    {
      id: "work-facebook",
      company: "Facebook",
      role: "iOS Software Engineer",
      startDate: "2011-01-01",
      endDate: "2014-01-01",
      summary:
        "Built iOS features with a focus on reliability and performance.",
      order: 3,
      status: "published",
    },
    {
      id: "work-starbucks",
      company: "Starbucks",
      role: "Shift Supervisor",
      startDate: "2008-01-01",
      endDate: "2011-01-01",
      summary: "Learned early leadership and operations fundamentals.",
      order: 4,
      status: "published",
    },
  ],
  photos: [
    {
      id: "photo-1",
      image: {
        id: "photo-image-1",
        src: "https://cdn.example.com/photos/image-1.jpg",
        alt: "Desk setup near a window",
        width: 1280,
        height: 1422,
      },
      order: 1,
      status: "published",
    },
    {
      id: "photo-2",
      image: {
        id: "photo-image-2",
        src: "https://cdn.example.com/photos/image-2.jpg",
        alt: "Notebook and keyboard on a wooden desk",
        width: 1280,
        height: 1422,
      },
      order: 2,
      status: "published",
    },
    {
      id: "photo-3",
      image: {
        id: "photo-image-3",
        src: "https://cdn.example.com/photos/image-3.jpg",
        alt: "City lights from a rooftop at dusk",
        width: 1280,
        height: 1422,
      },
      order: 3,
      status: "published",
    },
    {
      id: "photo-4",
      image: {
        id: "photo-image-4",
        src: "https://cdn.example.com/photos/image-4.jpg",
        alt: "Coffee cup beside laptop during writing session",
        width: 1280,
        height: 1422,
      },
      order: 4,
      status: "published",
    },
    {
      id: "photo-5",
      image: {
        id: "photo-image-5",
        src: "https://cdn.example.com/photos/image-5.jpg",
        alt: "Candid travel photo on a city street",
        width: 1280,
        height: 1422,
      },
      order: 5,
      status: "published",
    },
  ],
};
