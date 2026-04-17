/**
 * @file apps/web/src/data/page.ts
 * @author Guy Romelle Magayano
 * @description Static data and typed constants for page.
 */

import { type ImageProps } from "next/image";

import { contentSnapshot } from "@portfolio/content-data";

import { type IconProps } from "@web/components/icon";
import { getPortfolioSocialLinks } from "@web/utils/portfolio";

// ============================================================================
// SOCIAL LIST DATA
// ============================================================================

export type SocialListComponentLabels = ReadonlyArray<{
  label?: string;
  icon: IconProps["name"];
  href?: string;
  target?: string;
}>;

// ============================================================================
// COMMON LAYOUT COMPONENT DATA
// ============================================================================

export type CommonLayoutComponentData = Readonly<{
  subheading?: string;
  title?: string;
  intro?: string;
}>;

// ============================================================================
// PROJECTS DATA
// ============================================================================

// const PROJECT_LOGOS = {
//   planetaria: logoPlanetaria,
//   animaginary: logoAnimaginary,
//   heliostream: logoHelioStream,
//   cosmos: logoCosmos,
//   openshuttle: logoOpenShuttle,
// } as const;

// type ProjectLogoKey = keyof typeof PROJECT_LOGOS;

// type ProjectData = Readonly<{
//   name: string;
//   description: string;
//   link: { href: string; label: string };
//   logoKey: ProjectLogoKey;
// }>;

export type ProjectsComponentData = ReadonlyArray<{
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: ImageProps["src"];
}>;

export type ProjectsPageLayoutData = CommonLayoutComponentData &
  Readonly<{
    projects: ProjectsComponentData;
  }>;

// ============================================================================
// PAGE DATA SHAPE
// ============================================================================

type PageData = Readonly<{
  socialLinks: SocialListComponentLabels;
}>;

const createPageData = (): PageData => {
  const socialLinks: SocialListComponentLabels = getPortfolioSocialLinks(
    contentSnapshot.portfolio
  ).map((link) => ({
    label: link.label,
    icon: link.icon as IconProps["name"],
    href: link.href,
    target: link.target,
  }));

  return {
    socialLinks,
  };
};

const PAGE_DATA = createPageData();

// ============================================================================
// SOCIAL LIST DATA
// ============================================================================

export const SOCIAL_LIST_COMPONENT_LABELS: SocialListComponentLabels =
  PAGE_DATA.socialLinks;
