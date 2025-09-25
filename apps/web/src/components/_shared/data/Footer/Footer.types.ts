// ============================================================================
// SHARED FOOTER COMPONENT DATA TYPES
// ============================================================================

import React from "react";

import Link from "next/link";

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
