/**
 * @file packages/content-data/src/portfolio/site-shell.ts
 * @author Guy Romelle Magayano
 * @description Site shell records for the local portfolio snapshot.
 */

import type {
  ContentNavigationItem,
  ContentProfile,
  ContentSocialLink,
} from "@portfolio/api-contracts/content";

import { PUBLISHED_STATUS } from "./shared";

/** Canonical portfolio profile used across brochure pages and metadata. */
export const portfolioProfile: ContentProfile = {
  id: "profile-guy-romelle",
  name: "Guy Romelle Magayano",
  role: "Product engineer, platform builder, and systems thinker",
  location: "Davao City, PH",
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
  status: PUBLISHED_STATUS,
};

/** Navigation entries shown in the header and footer shell. */
export const portfolioNavigation: ReadonlyArray<ContentNavigationItem> = [
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
];

/** Social links used by hero/footer surfaces and contact affordances. */
export const portfolioSocialLinks: ReadonlyArray<ContentSocialLink> = [
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
];
