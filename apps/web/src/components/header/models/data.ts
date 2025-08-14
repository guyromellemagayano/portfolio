import type {
  AvatarComponentLabels,
  HeaderNavLinks,
  MobileHeaderNav,
} from "@web/components/header/models";

/** Labels for mobile nav */
export const HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS = {
  menu: "Menu",
  navigation: "Navigation",
  closeMenu: "Close menu",
} as const satisfies MobileHeaderNav;

/** Mobile nav links */
export const MOBILE_HEADER_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "Speaking", href: "/speaking" },
  { label: "Uses", href: "/uses" },
] as const satisfies HeaderNavLinks;

/** Desktop nav links */
export const DESKTOP_HEADER_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "Speaking", href: "/speaking" },
  { label: "Uses", href: "/uses" },
] as const satisfies HeaderNavLinks;

/** Avatar labels */
export const AVATAR_COMPONENT_LABELS = {
  home: "Home",
  link: "/",
} as const satisfies AvatarComponentLabels;
