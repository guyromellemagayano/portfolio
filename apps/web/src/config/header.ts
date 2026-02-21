/**
 * @file apps/web/src/config/header.ts
 * @author Guy Romelle Magayano
 * @description Static configuration for header content and settings.
 */

import { type Route } from "next";

import headerConfig from "@web/data/header.json";

// ============================================================================
// HEADER LINK TYPES
// ============================================================================

type InternalHref = Route | (string & {});

export type HeaderLink =
  | {
      kind: "internal";
      label: string;
      href: InternalHref;
    }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

// ============================================================================
// HEADER NAV LINK CONFIG
// ============================================================================

export type HeaderNavLabelKey =
  | "about"
  | "articles"
  | "projects"
  | "uses"
  | "contact";
export type HeaderNavLinkConfig = Readonly<{
  kind: "internal";
  labelKey: HeaderNavLabelKey;
  href: InternalHref;
}>;
export type HeaderComponentNavLinks = ReadonlyArray<
  Extract<HeaderLink, { kind: "internal" }>
>;

// ============================================================================
// HEADER CONFIG DATA
// ============================================================================

type HeaderConfigData = Readonly<{
  avatarLinkHref: string;
  navLinks: ReadonlyArray<{
    labelKey: HeaderNavLabelKey;
    href: InternalHref;
  }>;
}>;

const HEADER_NAV_LABEL_KEYS: ReadonlyArray<HeaderNavLabelKey> = [
  "about",
  "articles",
  "projects",
  "uses",
  "contact",
];

const isHeaderNavLabelKey = (value: string): value is HeaderNavLabelKey =>
  HEADER_NAV_LABEL_KEYS.includes(value as HeaderNavLabelKey);

const createHeaderConfigData = (): HeaderConfigData => {
  const avatarLinkHref =
    typeof headerConfig.avatarLinkHref === "string"
      ? headerConfig.avatarLinkHref
      : "/";

  const navLinks: ReadonlyArray<{
    labelKey: HeaderNavLabelKey;
    href: InternalHref;
  }> = headerConfig.navLinks.map((link) => {
    if (!isHeaderNavLabelKey(link.labelKey)) {
      throw new Error(`Invalid header nav labelKey: ${link.labelKey}`);
    }

    return {
      labelKey: link.labelKey,
      href: link.href as InternalHref,
    };
  });

  return {
    avatarLinkHref,
    navLinks,
  };
};

const HEADER_CONFIG_DATA = createHeaderConfigData();

// ============================================================================
// AVATAR STATIC CONFIG
// ============================================================================

export const AVATAR_LINK_HREF =
  HEADER_CONFIG_DATA.avatarLinkHref as InternalHref;

// ============================================================================
// HEADER NAV LINK CONFIG
// ============================================================================

export const HEADER_NAV_LINK_CONFIG: ReadonlyArray<HeaderNavLinkConfig> =
  HEADER_CONFIG_DATA.navLinks.map((link) => ({
    kind: "internal",
    labelKey: link.labelKey,
    href: link.href,
  }));
