/**
 * @file apps/web/src/config/header.ts
 * @author Guy Romelle Magayano
 * @description Static configuration for header content and settings.
 */

import { navigationLinks } from "@web/data/site";

// ============================================================================
// HEADER LINK TYPES
// ============================================================================

type InternalHref = string;

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

export type HeaderNavLinkConfig = Readonly<
  Extract<HeaderLink, { kind: "internal" }>
>;
export type HeaderComponentNavLinks = ReadonlyArray<
  Extract<HeaderLink, { kind: "internal" }>
>;

// ============================================================================
// HEADER CONFIG DATA
// ============================================================================

type HeaderConfigData = Readonly<{
  avatarLinkHref: string;
  navLinks: HeaderComponentNavLinks;
}>;

const createHeaderConfigData = (): HeaderConfigData => {
  const avatarLinkHref = "/";
  const navLinks = navigationLinks
    .filter((link) => link.showInHeader)
    .map((link) => ({
      kind: "internal" as const,
      label: link.label,
      href: link.href as InternalHref,
    }));

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
    label: link.label,
    href: link.href,
  }));
