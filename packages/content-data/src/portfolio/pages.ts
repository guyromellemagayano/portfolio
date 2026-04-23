/**
 * @file packages/content-data/src/portfolio/pages.ts
 * @author Guy Romelle Magayano
 * @description Portfolio page documents for the local portfolio snapshot.
 */

import type { ContentPortfolioPage } from "@portfolio/api-contracts/content";

import {
  ctaListSection,
  definePortfolioPage,
  experienceSection,
  heroSection,
  photoGallerySection,
  projectsSection,
  richTextSection,
  speakingSection,
  usesSection,
} from "../authoring";
import {
  PUBLISHED_STATUS,
  SEEDED_PUBLISHED_AT,
  SEEDED_UPDATED_AT,
} from "./shared";

/** Portfolio page documents consumed by brochure routes and the API snapshot. */
export const portfolioPages: ReadonlyArray<ContentPortfolioPage> = [
  definePortfolioPage({
    id: "page-home",
    slug: "",
    subheading: "Home",
    title: "Home",
    intro:
      "The public shell for a reusable product platform spanning admin, SaaS, commerce, operations, and content workflows.",
    template: "home",
    sections: [
      heroSection("profile-guy-romelle", [
        "social-instagram",
        "social-github",
        "social-linkedin",
        "social-email",
      ]),
      projectsSection(
        "Featured projects",
        ["guy-os", "taskflow"],
        "The highest-signal apps in the portfolio monorepo."
      ),
      speakingSection(
        "Speaking",
        [
          "scaling-design-systems-without-losing-velocity",
          "building-reliable-content-platforms",
          "engineering-leadership-office-hours",
        ],
        "Talks and interviews on product engineering and systems design."
      ),
      photoGallerySection(
        ["photo-1", "photo-2", "photo-3", "photo-4", "photo-5"],
        "From my camera roll"
      ),
    ],
    seoTitle: "Guy Romelle Magayano",
    seoDescription:
      "Product engineer and platform builder writing about systems, delivery, and reusable software foundations.",
    seoCanonicalPath: "/",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-about",
    slug: "about",
    subheading: "About",
    title:
      "A product engineer who prefers systems that stay calm under growth.",
    intro:
      "How I think about product engineering, reusable systems, and maintainable delivery.",
    template: "about",
    sections: [
      richTextSection(
        "I design and ship software systems that stay coherent as product scope grows. My work sits at the intersection of frontend architecture, platform foundations, design systems, and pragmatic backend delivery.",
        "Hi, I’m Guy."
      ),
      experienceSection(
        "Work",
        ["work-planetaria", "work-airbnb", "work-facebook", "work-starbucks"],
        "A few roles and teams that shaped my approach."
      ),
    ],
    seoTitle: "About - Guy Romelle Magayano",
    seoDescription:
      "Background, priorities, and engineering principles behind the way I build software systems.",
    seoCanonicalPath: "/about",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-articles",
    slug: "articles",
    subheading: "Articles",
    title:
      "Articles on architecture, systems, and reusable product foundations.",
    intro:
      "Writing on architecture, delivery, reusable UI systems, and the mechanics behind good product engineering.",
    template: "articles",
    sections: [
      richTextSection(
        "Article list content is sourced from article documents and rendered in reverse chronological order."
      ),
    ],
    seoTitle: "Articles - Guy Romelle Magayano",
    seoDescription:
      "Essays and notes on frontend architecture, platform systems, and pragmatic product engineering.",
    seoCanonicalPath: "/articles",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-services",
    slug: "services",
    subheading: "Services",
    title: "Architecture review, advisory, and direct implementation work.",
    intro:
      "I help teams make better frontend and platform decisions, then turn those decisions into maintainable implementation work.",
    template: "services",
    sections: [
      richTextSection(
        "Service offerings are sourced from the shared portfolio snapshot so the public brochure copy stays aligned with the API contract."
      ),
    ],
    seoTitle: "Services - Guy Romelle Magayano",
    seoDescription:
      "Consulting, architecture review, advisory, and senior implementation work for frontend and platform systems.",
    seoCanonicalPath: "/services",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-projects",
    slug: "projects",
    subheading: "Projects",
    title: "One platform story, several product surfaces.",
    intro:
      "A lineup of domain-specific apps built on one shared platform foundation.",
    template: "projects",
    sections: [
      projectsSection("Projects", [
        "guy-os",
        "taskflow",
        "cartforge",
        "pulseops",
        "contentforge",
      ]),
    ],
    seoTitle: "Projects - Guy Romelle Magayano",
    seoDescription:
      "A catalog of reusable, product-style applications across admin, SaaS, commerce, operations, and content workflows.",
    seoCanonicalPath: "/projects",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-speaking",
    slug: "speaking",
    subheading: "Speaking",
    title: "Speaking",
    intro: "Talks, podcasts, and workshops.",
    template: "speaking",
    sections: [
      speakingSection("Recent appearances", [
        "scaling-design-systems-without-losing-velocity",
        "building-reliable-content-platforms",
        "engineering-leadership-office-hours",
      ]),
    ],
    seoTitle: "Speaking - Guy Romelle Magayano",
    seoDescription:
      "Conversations on platform engineering, frontend systems, and leadership.",
    seoCanonicalPath: "/speaking",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-uses",
    slug: "uses",
    subheading: "Uses",
    title: "The setup behind the work.",
    intro:
      "Software, hardware, and workflow tools I use to ship maintainable product systems.",
    template: "uses",
    sections: [
      usesSection("Uses", [
        "workstation",
        "developer-tooling",
        "productivity",
        "recording",
      ]),
    ],
    seoTitle: "Uses - Guy Romelle Magayano",
    seoDescription:
      "Recommended tools, setup details, and workflow choices for product and platform engineering.",
    seoCanonicalPath: "/uses",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-hire",
    slug: "hire",
    subheading: "Hire",
    title: "Share the current constraint and the outcome you need.",
    intro:
      "Share your context and constraints, and I’ll help you move faster with the right product engineering move.",
    template: "hire",
    sections: [
      ctaListSection("Other ways to start", [
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
      ]),
    ],
    seoTitle: "Hire - Guy Romelle Magayano",
    seoDescription:
      "Start a consulting or product engineering conversation about architecture, advisory, or implementation work.",
    seoCanonicalPath: "/hire",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
  definePortfolioPage({
    id: "page-book",
    slug: "book",
    subheading: "Book",
    title: "Choose the starting path that matches the work.",
    intro:
      "If you're not sure whether you need a review, advisory, or hands-on implementation, this page gives you a clean starting point.",
    template: "book",
    sections: [
      ctaListSection("Starting points", [
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
      ]),
    ],
    seoTitle: "Book - Guy Romelle Magayano",
    seoDescription:
      "Choose the right first step for a project inquiry, architecture review, advisory engagement, or delivery sprint.",
    seoCanonicalPath: "/book",
    hideFromSitemap: false,
    seoNoIndex: false,
    status: PUBLISHED_STATUS,
    publishedAt: SEEDED_PUBLISHED_AT,
    updatedAt: SEEDED_UPDATED_AT,
  }),
];
