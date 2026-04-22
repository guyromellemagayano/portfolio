/**
 * @file packages/content-data/src/portfolio/collections.ts
 * @author Guy Romelle Magayano
 * @description Collection-style records for the local portfolio snapshot.
 */

import type {
  ContentPhoto,
  ContentProject,
  ContentSpeakingAppearance,
  ContentUseCategory,
  ContentWorkExperience,
} from "@portfolio/api-contracts/content";

import { PUBLISHED_STATUS } from "./shared";

/** Project records referenced by brochure pages and portfolio sections. */
export const portfolioProjects: ReadonlyArray<ContentProject> = [
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
  },
];

/** Speaking appearances referenced by speaking sections and metadata. */
export const portfolioSpeakingAppearances: ReadonlyArray<ContentSpeakingAppearance> =
  [
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
      status: PUBLISHED_STATUS,
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
      status: PUBLISHED_STATUS,
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
      status: PUBLISHED_STATUS,
    },
  ];

/** Uses categories powering the `/uses` route. */
export const portfolioUseCategories: ReadonlyArray<ContentUseCategory> = [
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
  },
];

/** Work experience records used by the about route and supporting sections. */
export const portfolioWorkExperience: ReadonlyArray<ContentWorkExperience> = [
  {
    id: "work-planetaria",
    company: "Planetaria",
    role: "CEO",
    startDate: "2019-01-01",
    isCurrentRole: true,
    summary: "Leading product strategy, engineering direction, and operations.",
    order: 1,
    status: PUBLISHED_STATUS,
  },
  {
    id: "work-airbnb",
    company: "Airbnb",
    role: "Product Designer",
    startDate: "2014-01-01",
    endDate: "2019-01-01",
    summary: "Designed user-facing product surfaces and collaborative systems.",
    order: 2,
    status: PUBLISHED_STATUS,
  },
  {
    id: "work-facebook",
    company: "Facebook",
    role: "iOS Software Engineer",
    startDate: "2011-01-01",
    endDate: "2014-01-01",
    summary: "Built iOS features with a focus on reliability and performance.",
    order: 3,
    status: PUBLISHED_STATUS,
  },
  {
    id: "work-starbucks",
    company: "Starbucks",
    role: "Shift Supervisor",
    startDate: "2008-01-01",
    endDate: "2011-01-01",
    summary: "Learned early leadership and operations fundamentals.",
    order: 4,
    status: PUBLISHED_STATUS,
  },
];

/** Photo records used by gallery sections in the brochure pages. */
export const portfolioPhotos: ReadonlyArray<ContentPhoto> = [
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
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
    status: PUBLISHED_STATUS,
  },
];
