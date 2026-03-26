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
      id: "nav-about",
      label: "About",
      href: "/about",
      order: 1,
      showInHeader: true,
      showInFooter: true,
    },
    {
      id: "nav-articles",
      label: "Articles",
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
      id: "nav-speaking",
      label: "Speaking",
      href: "/speaking",
      order: 4,
      showInHeader: true,
      showInFooter: false,
    },
    {
      id: "nav-uses",
      label: "Uses",
      href: "/uses",
      order: 5,
      showInHeader: true,
      showInFooter: true,
    },
    {
      id: "nav-contact",
      label: "Contact",
      href: "/contact",
      order: 6,
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
  pages: [
    {
      id: "page-home",
      slug: "",
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
          projectSlugs: ["guy-os", "opsdesk", "taskflow"],
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
      id: "page-projects",
      slug: "projects",
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
            "opsdesk",
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
      id: "page-contact",
      slug: "contact",
      title: "Contact",
      intro:
        "Open to work that benefits from stronger frontend architecture and reusable platform systems.",
      template: "contact",
      sections: [
        {
          type: "ctaList",
          title: "Get in touch",
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
      seoTitle: "Contact - Guy Romelle Magayano",
      seoDescription:
        "Contact information for consulting, collaborations, and product engineering work.",
      seoCanonicalPath: "/contact",
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
      id: "project-opsdesk",
      slug: "opsdesk",
      name: "OpsDesk",
      summary:
        "An internal-tool style admin product for CRUD, permissions, tables, forms, and auditability.",
      repository: {
        label: "github.com",
        href: "https://github.com/guyromellemagayano",
        target: "_blank",
      },
      tags: ["admin", "rbac", "workflow"],
      featured: true,
      order: 2,
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
      order: 3,
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
      order: 4,
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
      order: 5,
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
