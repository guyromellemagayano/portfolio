/**
 * @file apps/web/src/data/portfolio-showcase.ts
 * @author Guy Romelle Magayano
 * @description Shared portfolio showcase content for the public web experience.
 */

import { contentSnapshot } from "@portfolio/content-data";

import {
  getPortfolioBuildSequence,
  getPortfolioCapabilityClusters,
  getPortfolioServiceOfferings,
  getPortfolioShowcaseApps,
} from "@web/utils/portfolio";

export type PortfolioShowcaseApp = Readonly<{
  anchor: string;
  href: string;
  name: string;
  path: string;
  summary: string;
  proofPoints: readonly string[];
}>;

export type PortfolioShowcaseStep = Readonly<{
  title: string;
  detail: string;
}>;

export type PortfolioServiceOffering = Readonly<{
  anchor: string;
  ctaLabel: string;
  href: string;
  name: string;
  summary: string;
  deliverables: readonly string[];
  bestFor: string;
}>;

export type PortfolioCapabilityCluster = Readonly<{
  name: string;
  items: readonly string[];
}>;

export const PORTFOLIO_SHOWCASE_APPS: ReadonlyArray<PortfolioShowcaseApp> =
  getPortfolioShowcaseApps(contentSnapshot.portfolio).map((app) => ({
    anchor: app.anchor,
    href: app.href,
    name: app.name,
    path: app.path,
    summary: app.summary,
    proofPoints: [...app.proofPoints],
  }));

export const PORTFOLIO_FOUNDATION_CAPABILITIES: ReadonlyArray<string> = [
  ...contentSnapshot.portfolio.foundationCapabilities,
];

export const PORTFOLIO_FOCUS_AREAS: ReadonlyArray<string> = [
  ...contentSnapshot.portfolio.focusAreas,
];

export const PORTFOLIO_SERVICE_OFFERINGS: ReadonlyArray<PortfolioServiceOffering> =
  getPortfolioServiceOfferings(contentSnapshot.portfolio).map((service) => ({
    anchor: service.anchor,
    ctaLabel: service.ctaLabel,
    href: service.href,
    name: service.name,
    summary: service.summary,
    deliverables: [...service.deliverables],
    bestFor: service.bestFor,
  }));

export const PORTFOLIO_CAPABILITY_CLUSTERS: ReadonlyArray<PortfolioCapabilityCluster> =
  getPortfolioCapabilityClusters(contentSnapshot.portfolio).map((cluster) => ({
    name: cluster.name,
    items: [...cluster.items],
  }));

export const PORTFOLIO_BUILD_SEQUENCE: ReadonlyArray<PortfolioShowcaseStep> =
  getPortfolioBuildSequence(contentSnapshot.portfolio).map((step) => ({
    title: step.title,
    detail: step.detail,
  }));

export const PORTFOLIO_OPERATING_PRINCIPLES: ReadonlyArray<string> = [
  ...contentSnapshot.portfolio.operatingPrinciples,
];
