/**
 * @file page.ts
 * @author Guy Romelle Magayano
 * @description Data for the pages layouts.
 */

import { type ImageProps } from "next/image";

import { type IconProps } from "@web/components/icon";

// import logoAnimaginary from "@web/images/logos/animaginary.svg";
// import logoCosmos from "@web/images/logos/cosmos.svg";
// import logoHelioStream from "@web/images/logos/helio-stream.svg";
// import logoOpenShuttle from "@web/images/logos/open-shuttle.svg";
// import logoPlanetaria from "@web/images/logos/planetaria.svg";
import pageData from "./page.json";

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

const SOCIAL_ICON_NAMES: ReadonlyArray<IconProps["name"]> = [
  "instagram",
  "github",
  "linkedin",
  "mail",
];

const isSocialIconName = (
  value: string | undefined
): value is IconProps["name"] =>
  SOCIAL_ICON_NAMES.includes(value as IconProps["name"]);

// const isProjectLogoKey = (value: string): value is ProjectLogoKey =>
//   Object.prototype.hasOwnProperty.call(PROJECT_LOGOS, value);

const createPageData = (): PageData => {
  const socialLinks: SocialListComponentLabels = pageData.socialLinks.map(
    (link) => {
      if (!isSocialIconName(link.icon)) {
        throw new Error(`Invalid social icon: ${link.icon}`);
      }

      return {
        label: link.label,
        icon: link.icon,
        href: link.href,
        target: link.target,
      };
    }
  );

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
