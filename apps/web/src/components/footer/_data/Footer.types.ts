import React from "react";

import Link from "next/link";

// ============================================================================
// FOOTER DATA TYPES
// ============================================================================

/**
 * FooterLink type that supports all Next.js Link href types including:
 * - string: "/about", "https://example.com"
 * - URL objects: new URL("https://example.com")
 * - Route types: Next.js Route type
 * - Objects with toString(): { toString: () => "/path" }
 */
type FooterLink =
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

type FooterComponentLabels = Readonly<{
  /** Legal text */
  legalText?: string;
  /** Optional navigation links override */
  navLinks?: ReadonlyArray<FooterLink>;
}>;

type FooterComponentNavLinks = ReadonlyArray<
  Extract<FooterLink, { kind: "internal" }>
>;

// ============================================================================
// API DATA TYPES
// ============================================================================

/** Footer data structure for API responses */
interface FooterData {
  /** Legal text displayed in the footer */
  legalText: string;
  /** Navigation links */
  nav: ReadonlyArray<FooterLink>;
  /** Optional year override (default: current year) */
  year?: number;
}

export type {
  FooterComponentLabels,
  FooterComponentNavLinks,
  FooterData,
  FooterLink,
};
