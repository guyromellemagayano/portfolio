/**
 * @file apps/web/src/utils/portfolio.ts
 * @author Guy Romelle Magayano
 * @description Shared portfolio snapshot selectors and view-model helpers for brochure routes and shell data.
 */

import type {
  ContentPortfolioBookingPath,
  ContentPortfolioBuildStep,
  ContentPortfolioCapabilityCluster,
  ContentPortfolioPage,
  ContentPortfolioServiceOffering,
  ContentPortfolioShowcaseApp,
  ContentPortfolioSnapshot,
  ContentSocialLink,
} from "@portfolio/api-contracts/content";

import type { IconNames } from "@web/components/icon/Icon";

export type PortfolioNavigationLink = Readonly<{
  kind: "internal";
  label: string;
  href: string;
}>;

export type PortfolioSocialLinkData = Readonly<{
  label?: string;
  icon: Extract<
    IconNames,
    "github" | "instagram" | "linkedin" | "link" | "mail" | "x"
  >;
  href?: string;
  target?: string;
}>;

function sortByOrder<T extends { order: number }>(
  records: ReadonlyArray<T>
): T[] {
  return [...records].sort((left, right) => left.order - right.order);
}

function isPublished(status: string): boolean {
  return status === "published";
}

function toSocialIcon(
  platform: ContentSocialLink["platform"]
): PortfolioSocialLinkData["icon"] {
  switch (platform) {
    case "email":
      return "mail";
    case "youtube":
    case "website":
      return "link";
    default:
      return platform;
  }
}

export function getPortfolioPage(
  snapshot: ContentPortfolioSnapshot,
  slug: string
): ContentPortfolioPage | null {
  const normalizedSlug = slug.trim();

  return (
    snapshot.pages.find((page) => page.slug.trim() === normalizedSlug) ?? null
  );
}

export function requirePortfolioPage(
  snapshot: ContentPortfolioSnapshot,
  slug: string
): ContentPortfolioPage {
  const page = getPortfolioPage(snapshot, slug);

  if (!page) {
    throw new Error(`Portfolio page "${slug}" not found.`);
  }

  return page;
}

export function getPortfolioNavigationLinks(
  snapshot: ContentPortfolioSnapshot,
  placement: "header" | "footer"
): ReadonlyArray<PortfolioNavigationLink> {
  const shouldShow =
    placement === "header"
      ? (item: ContentPortfolioSnapshot["navigation"][number]) =>
          item.showInHeader
      : (item: ContentPortfolioSnapshot["navigation"][number]) =>
          item.showInFooter;

  return sortByOrder(snapshot.navigation)
    .filter((item) => shouldShow(item))
    .map((item) => ({
      kind: "internal" as const,
      label: item.label,
      href: item.href,
    }));
}

export function getPortfolioSocialLinks(
  snapshot: ContentPortfolioSnapshot
): ReadonlyArray<PortfolioSocialLinkData> {
  return sortByOrder(snapshot.socialLinks).map((link) => ({
    label: link.label,
    icon: toSocialIcon(link.platform),
    href: link.href,
    target:
      link.href.startsWith("http://") ||
      link.href.startsWith("https://") ||
      link.href.startsWith("mailto:")
        ? "_blank"
        : "_self",
  }));
}

export function getPortfolioShowcaseApps(
  snapshot: ContentPortfolioSnapshot
): ReadonlyArray<ContentPortfolioShowcaseApp> {
  return sortByOrder(snapshot.showcaseApps).filter((app) =>
    isPublished(app.status)
  );
}

export function getPortfolioServiceOfferings(
  snapshot: ContentPortfolioSnapshot
): ReadonlyArray<ContentPortfolioServiceOffering> {
  return sortByOrder(snapshot.serviceOfferings).filter((service) =>
    isPublished(service.status)
  );
}

export function getPortfolioCapabilityClusters(
  snapshot: ContentPortfolioSnapshot
): ReadonlyArray<ContentPortfolioCapabilityCluster> {
  return sortByOrder(snapshot.capabilityClusters).filter((cluster) =>
    isPublished(cluster.status)
  );
}

export function getPortfolioBuildSequence(
  snapshot: ContentPortfolioSnapshot
): ReadonlyArray<ContentPortfolioBuildStep> {
  return sortByOrder(snapshot.buildSequence).filter((step) =>
    isPublished(step.status)
  );
}

export function getPortfolioBookingPaths(
  snapshot: ContentPortfolioSnapshot
): ReadonlyArray<ContentPortfolioBookingPath> {
  return sortByOrder(snapshot.bookingPaths).filter((path) =>
    isPublished(path.status)
  );
}
