/**
 * @file packages/content-data/src/portfolio.ts
 * @author Guy Romelle Magayano
 * @description Local Portfolio-style content snapshot structured for headless CMS portability.
 */

import type { ContentPortfolioSnapshot } from "@portfolio/api-contracts/content";

import { definePortfolioSnapshot } from "./authoring";
import {
  portfolioPhotos,
  portfolioProjects,
  portfolioSpeakingAppearances,
  portfolioUseCategories,
  portfolioWorkExperience,
} from "./portfolio/collections";
import {
  portfolioBookingPaths,
  portfolioBuildSequence,
  portfolioCapabilityClusters,
  portfolioFocusAreas,
  portfolioFoundationCapabilities,
  portfolioOperatingPrinciples,
  portfolioServiceOfferings,
  portfolioShowcaseApps,
} from "./portfolio/offerings";
import { portfolioPages } from "./portfolio/pages";
import {
  portfolioNavigation,
  portfolioProfile,
  portfolioSocialLinks,
} from "./portfolio/site-shell";

/** Portfolio-style local snapshot used to model a Django/Wagtail-ready content graph. */
export const portfolioSnapshot: ContentPortfolioSnapshot =
  definePortfolioSnapshot({
    schemaVersion: "1.0",
    profile: portfolioProfile,
    navigation: [...portfolioNavigation],
    socialLinks: [...portfolioSocialLinks],
    pages: [...portfolioPages],
    showcaseApps: [...portfolioShowcaseApps],
    serviceOfferings: [...portfolioServiceOfferings],
    capabilityClusters: [...portfolioCapabilityClusters],
    focusAreas: [...portfolioFocusAreas],
    foundationCapabilities: [...portfolioFoundationCapabilities],
    buildSequence: [...portfolioBuildSequence],
    bookingPaths: [...portfolioBookingPaths],
    operatingPrinciples: [...portfolioOperatingPrinciples],
    projects: [...portfolioProjects],
    speakingAppearances: [...portfolioSpeakingAppearances],
    useCategories: [...portfolioUseCategories],
    workExperience: [...portfolioWorkExperience],
    photos: [...portfolioPhotos],
  });
