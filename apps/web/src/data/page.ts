/**
 * @file apps/web/src/data/page.ts
 * @author Guy Romelle Magayano
 * @description Static data and typed constants for page.
 */

import { type IconProps } from "@web/components/icon";
import { socialLinks } from "@web/data/site";
import { type ImageSource } from "@web/lib/media";

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
  logo: ImageSource;
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
  const socialLinkLabels: SocialListComponentLabels = socialLinks.map(
    (link) => ({
      label: link.label,
      icon: (link.platform === "email"
        ? "mail"
        : link.platform) as IconProps["name"],
      href: link.href,
      target: link.href.startsWith("http") ? "_blank" : "_self",
    })
  );

  return {
    socialLinks: socialLinkLabels,
  };
};

const PAGE_DATA = createPageData();

// ============================================================================
// SOCIAL LIST DATA
// ============================================================================

export const SOCIAL_LIST_COMPONENT_LABELS: SocialListComponentLabels =
  PAGE_DATA.socialLinks;
