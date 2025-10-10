import type { Route } from "next";
import { StaticImageData } from "next/image";

import avatarImage from "@web/images/avatar.jpg";

// ============================================================================
// HEADER COMPONENT LABELS
// ============================================================================

/** `HeaderComponentLabels` type. */
export type HeaderComponentLabels = Readonly<{
  /** The brand name. */
  brandName: string;
  /** The tagline. */
  tagline?: string;
}>;

/** `HEADER_COMPONENT_LABELS` constant. */
export const HEADER_COMPONENT_LABELS = {
  brandName: "Guy Romelle Magayano",
  tagline: "Software Engineer & Developer",
} as const satisfies HeaderComponentLabels;

// ============================================================================
// MOBILE HEADER NAV LABELS
// ============================================================================

/** `MobileHeaderNavLabels` type. */
export type MobileHeaderNavLabels = Readonly<Record<string, string>>;
export const MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS = {
  menu: "Menu",
  navigation: "Navigation",
  closeMenu: "Close menu",
} as const satisfies MobileHeaderNavLabels;

// ============================================================================
// AVATAR COMPONENT LABELS
// ============================================================================

/** `AvatarComponentLabels` type. */
export type AvatarComponentLabels = Readonly<{
  /** The home label. */
  home: string;
  /** The link. */
  link: string;
  /** The alt text. */
  alt: string;
  /** The avatar image. */
  src: StaticImageData;
}>;

/** `AVATAR_COMPONENT_LABELS` constant. */
export const AVATAR_COMPONENT_LABELS = {
  home: "Home",
  link: "/",
  alt: "Guy Romelle Magayano",
  src: avatarImage,
} as const satisfies AvatarComponentLabels;

// ============================================================================
// THEME TOGGLE LABELS
// ============================================================================

/** `ThemeToggleLabels` type. */
export type ThemeToggleLabels = Readonly<Record<string, string>>;
export const THEME_TOGGLE_LABELS = {
  toggleTheme: "Toggle theme",
} as const satisfies ThemeToggleLabels;

// ============================================================================
// HEADER LINK TYPES
// ============================================================================

type InternalHref = Route | (string & {});

/** `HeaderLink` type. */
export type HeaderLink =
  | {
      /** The kind of link. */
      kind: "internal";
      /** The label. */
      label: string;
      /** The href. */
      href: InternalHref;
    }
  | {
      /** The kind of link. */
      kind: "external";
      /** The label. */
      label: string;
      /** The href. */
      href: string;
      /** Whether the link should open in a new tab. */
      newTab?: boolean;
      /** The rel attribute. */
      rel?: string;
    };

// ============================================================================
// HEADER COMPONENT NAV LINKS
// ============================================================================

/** `HeaderComponentNavLinks` type. */
export type HeaderComponentNavLinks = ReadonlyArray<
  Extract<HeaderLink, { kind: "internal" }>
>;

// ============================================================================
// HEADER COMPONENT NAV LINKS
// ============================================================================

/** `HEADER_COMPONENT_NAV_LINKS` constant. */
export const HEADER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Speaking", href: "/speaking" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies HeaderComponentNavLinks;

// ============================================================================
// MOBILE HEADER NAV LINKS
// ============================================================================

/** `MOBILE_HEADER_NAV_LINKS` constant. */
export const MOBILE_HEADER_NAV_LINKS = HEADER_COMPONENT_NAV_LINKS;

// ============================================================================
// DESKTOP HEADER NAV LINKS
// ============================================================================

/** `DESKTOP_HEADER_NAV_LINKS` constant. */
export const DESKTOP_HEADER_NAV_LINKS = HEADER_COMPONENT_NAV_LINKS;
