import { formatDateSafely } from "@guyromellemagayano/utils";

import type {
  FooterComponentLabels,
  FooterComponentNavLinks,
} from "./Footer.types";

const BRAND_NAME = "Guy Romelle Magayano" as const;

const FOOTER_COMPONENT_LABELS = {
  legalText: `&copy; ${formatDateSafely(new Date(), { year: "numeric" })} ${BRAND_NAME}. All rights reserved.`,
} as const satisfies FooterComponentLabels;

const FOOTER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Speaking", href: "/speaking" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies FooterComponentNavLinks;

export { FOOTER_COMPONENT_LABELS, FOOTER_COMPONENT_NAV_LINKS };
