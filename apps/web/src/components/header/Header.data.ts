import type { Route } from "next";

/** Internal href. */
type InternalHref = Route | (string & {});

/** Header link with discriminated union for internal/external links */
export type HeaderLink =
  | { kind: "internal"; label: string; href: InternalHref }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

/** For config labels shape. */
export type HeaderComponentLabels = Readonly<{
  brandName: string;
  tagline?: string;
}>;

/** Convenience alias when you only need internal links. */
export type HeaderComponentNavLinks = ReadonlyArray<
  Extract<HeaderLink, { kind: "internal" }>
>;

/** Mobile header navigation labels */
export type MobileHeaderNavLabels = Readonly<Record<string, string>>;

/** Avatar component labels */
export type AvatarComponentLabels = Readonly<Record<string, string>>;

/** Theme toggle labels */
export type ThemeToggleLabels = Readonly<Record<string, string>>;

/** Brand used by the header (override via data layer later if needed). */
export const BRAND_NAME = "Guy Romelle Magayano";

/** Default header labels */
export const HEADER_COMPONENT_LABELS = {
  brandName: BRAND_NAME,
  tagline: "Software Engineer & Developer",
} as const satisfies HeaderComponentLabels;

/** Labels for mobile nav */
export const HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS = {
  menu: "Menu",
  navigation: "Navigation",
  closeMenu: "Close menu",
} as const satisfies MobileHeaderNavLabels;

/** Avatar labels */
export const AVATAR_COMPONENT_LABELS = {
  home: "Home",
  link: "/",
} as const satisfies AvatarComponentLabels;

/** Theme toggle labels */
export const THEME_TOGGLE_LABELS = {
  toggleTheme: "Toggle theme",
} as const satisfies ThemeToggleLabels;

/** Default navigation links (strongly typed; add external links as needed). */
export const HEADER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Speaking", href: "/speaking" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies HeaderComponentNavLinks;

/** Mobile nav links (alias for backward compatibility) */
export const MOBILE_HEADER_NAV_LINKS = HEADER_COMPONENT_NAV_LINKS;

/** Desktop nav links (alias for backward compatibility) */
export const DESKTOP_HEADER_NAV_LINKS = HEADER_COMPONENT_NAV_LINKS;
