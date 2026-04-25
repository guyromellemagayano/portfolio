/**
 * @file apps/web/src/data/portfolio-showcase.ts
 * @author Guy Romelle Magayano
 * @description Shared portfolio showcase content for the public web experience.
 */

import { projects } from "@web/data/projects";
import { capabilityClusters, services } from "@web/data/services";
import {
  buildSteps,
  focusAreas,
  foundationCapabilities,
  operatingPrinciples,
} from "@web/data/site";

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
  projects.map((app) => ({
    anchor: app.slug,
    href: `/projects#${app.slug}`,
    name: app.title,
    path: app.path,
    summary: app.description,
    proofPoints: [...app.bullets],
  }));

export const PORTFOLIO_FOUNDATION_CAPABILITIES: ReadonlyArray<string> = [
  ...foundationCapabilities,
];

export const PORTFOLIO_FOCUS_AREAS: ReadonlyArray<string> = [...focusAreas];

export const PORTFOLIO_SERVICE_OFFERINGS: ReadonlyArray<PortfolioServiceOffering> =
  services.map((service) => ({
    anchor: service.id,
    ctaLabel: service.cta,
    href: service.href,
    name: service.title,
    summary: service.description,
    deliverables: [...service.bullets],
    bestFor: service.bestFor,
  }));

export const PORTFOLIO_CAPABILITY_CLUSTERS: ReadonlyArray<PortfolioCapabilityCluster> =
  capabilityClusters.map((cluster) => ({
    name: cluster.title,
    items: [...cluster.items],
  }));

export const PORTFOLIO_BUILD_SEQUENCE: ReadonlyArray<PortfolioShowcaseStep> =
  buildSteps.map((step) => ({
    title: step.title,
    detail: step.detail,
  }));

export const PORTFOLIO_OPERATING_PRINCIPLES: ReadonlyArray<string> = [
  ...operatingPrinciples,
];
