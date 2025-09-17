import { formatDateSafely } from "@guyromellemagayano/utils";

import type {
  FooterComponentLabels,
  FooterComponentNavLinks,
} from "../_types/Footer.types";

// ============================================================================
// FOOTER DATA
// ============================================================================

const BRAND_NAME = "Guy Romelle Magayano" as const;
export const FOOTER_COMPONENT_LABELS = {
  legalText: `&copy; ${formatDateSafely(new Date(), { year: "numeric" })} ${BRAND_NAME}. All rights reserved.`,
} as const satisfies FooterComponentLabels;

// ============================================================================
// FOOTER NAV LINKS
// ============================================================================

export const FOOTER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Speaking", href: "/speaking" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies FooterComponentNavLinks;
