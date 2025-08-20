import type { Route } from "next";

type InternalHref = Route | (string & {});

export type HeaderLink =
  | { kind: "internal"; label: string; href: InternalHref }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

export type HeaderComponentLabels = Readonly<{
  brandName: string;
  tagline?: string;
}>;

export type HeaderComponentNavLinks = ReadonlyArray<
  Extract<HeaderLink, { kind: "internal" }>
>;

export type MobileHeaderNavLabels = Readonly<Record<string, string>>;

export type AvatarComponentLabels = Readonly<Record<string, string>>;

export type ThemeToggleLabels = Readonly<Record<string, string>>;

export const BRAND_NAME = "Guy Romelle Magayano";

export const HEADER_COMPONENT_LABELS = {
  brandName: BRAND_NAME,
  tagline: "Software Engineer & Developer",
} as const satisfies HeaderComponentLabels;

export const HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS = {
  menu: "Menu",
  navigation: "Navigation",
  closeMenu: "Close menu",
} as const satisfies MobileHeaderNavLabels;

export const AVATAR_COMPONENT_LABELS = {
  home: "Home",
  link: "/",
} as const satisfies AvatarComponentLabels;

export const THEME_TOGGLE_LABELS = {
  toggleTheme: "Toggle theme",
} as const satisfies ThemeToggleLabels;

export const HEADER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Speaking", href: "/speaking" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies HeaderComponentNavLinks;

export const MOBILE_HEADER_NAV_LINKS = HEADER_COMPONENT_NAV_LINKS;

export const DESKTOP_HEADER_NAV_LINKS = HEADER_COMPONENT_NAV_LINKS;
