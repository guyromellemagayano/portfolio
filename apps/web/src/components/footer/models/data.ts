import type {
  FooterComponentLabels,
  FooterComponentNavLinks,
} from "@web/components/footer/models";

/** Brand used by the footer (override via data layer later if needed). */
export const BRAND_NAME = "Guy Romelle Magayano";

/** Default footer labels + legal text. */
export const FOOTER_COMPONENT_LABELS = {
  brandName: BRAND_NAME,
  legalText: `${BRAND_NAME}. All rights reserved.`,
} as const satisfies FooterComponentLabels;

/** Default navigation (strongly typed; add external links as needed). */
export const FOOTER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Speaking", href: "/speaking" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies FooterComponentNavLinks;
