import React from "react";

import Link from "next/link";

// ============================================================================
// FOOTER LINK TYPES
// ============================================================================

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
// FOOTER COMPONENT NAV LINKS
// ============================================================================

export type FooterComponentNavLinks = ReadonlyArray<
  Extract<FooterLink, { kind: "internal" }>
>;

// ============================================================================
// FOOTER DATA TYPES
// ============================================================================

export interface FooterData {
  /** Legal text displayed in the footer */
  legalText: string;
  /** Navigation links */
  nav: ReadonlyArray<FooterLink>;
  /** Optional year override (default: current year) */
  year?: number;
}

// ============================================================================
// FOOTER COMPONENT LABELS
// ============================================================================

export type FooterComponentLabels = Readonly<{
  /** Legal text */
  legalText?: string;
}>;
