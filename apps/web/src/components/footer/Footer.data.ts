/**
 * @file Footer.data.ts
 * @author Guy Romelle Magayano
 * @description Footer data for the website.
 */

// ============================================================================
// COMMON FOOTER COMPONENT TYPES
// ============================================================================

import { type ComponentPropsWithoutRef } from "react";

import Link from "next/link";

export type FooterLink =
  | {
      kind: "internal";
      label: string;
      href: ComponentPropsWithoutRef<typeof Link>["href"];
    }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

export type FooterData = {
  legalText: string;
  nav: ReadonlyArray<FooterLink>;
  year?: number;
};

// ============================================================================
// FOOTER NAVIGATION LINKS CONFIGURATION
// ============================================================================

export type FooterNavLinkConfig = {
  kind: "internal";
  labelKey: "about" | "articles" | "projects" | "uses";
  href: string;
};

export const FOOTER_COMPONENT_NAV_LINKS: ReadonlyArray<FooterNavLinkConfig> = [
  { kind: "internal", labelKey: "about", href: "/about" },
  { kind: "internal", labelKey: "articles", href: "/articles" },
  { kind: "internal", labelKey: "projects", href: "/projects" },
  { kind: "internal", labelKey: "uses", href: "/uses" },
] as const;
