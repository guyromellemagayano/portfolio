// ============================================================================
// SHARED FOOTER COMPONENT DATA
// ============================================================================

import React from "react";

import Link from "next/link";

import { formatDateSafely } from "@guyromellemagayano/utils";

// ============================================================================
// FOOTER LINK TYPES
// ============================================================================

/** `Footer` component link types. */
export type FooterLink =
  | {
      /** Internal link */
      kind: "internal";
      /** Link label */
      label: string;
      /** Link href */
      href: React.ComponentProps<typeof Link>["href"];
    }
  | {
      /** External link */
      kind: "external";
      /** Link label */
      label: string;
      /** Link href */
      href: string;
      /** Open link in new tab */
      newTab?: boolean;
      /** Link rel */
      rel?: string;
    };

// ============================================================================
// FOOTER DATA TYPES
// ============================================================================

/** `Footer` component data. */
export interface FooterData {
  /** Legal text */
  legalText: string;
  /** Navigation links */
  nav: ReadonlyArray<FooterLink>;
  /** Optional year override (default: current year) */
  year?: number;
}

// ============================================================================
// FOOTER COMPONENT LABELS
// ============================================================================

/** `Footer` component labels. */
export type FooterComponentLabels = Readonly<{
  /** Legal text */
  legalText?: string;
}>;

/** `Footer` component brand name. */
export const FOOTER_BRAND_NAME = "Guy Romelle Magayano" as const;

/** `Footer` component labels data. */
export const FOOTER_COMPONENT_LABELS = {
  legalText: `© ${formatDateSafely(new Date(), { year: "numeric" })} ${FOOTER_BRAND_NAME}. All rights reserved.`,
} as const satisfies FooterComponentLabels;

// ============================================================================
// FOOTER NAV LINKS
// ============================================================================

/** `Footer` component navigation links type. */
export type FooterComponentNavLinks = ReadonlyArray<
  Extract<FooterLink, { kind: "internal" }>
>;

/** `Footer` component navigation links data. */
export const FOOTER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies FooterComponentNavLinks;
