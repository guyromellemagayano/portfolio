/**
 * @file apps/web/src/config/footer.ts
 * @author Guy Romelle Magayano
 * @description Static configuration for footer content and settings.
 */

import { type ComponentPropsWithoutRef } from "react";

import { type Route } from "next";
import Link from "next/link";

import { contentSnapshot } from "@portfolio/content-data";

import { getPortfolioNavigationLinks } from "@web/utils/portfolio";

// ============================================================================
// FOOTER LINK TYPES
// ============================================================================

type InternalHref = Route | (string & {});

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
// FOOTER NAV LINK CONFIG
// ============================================================================

export type FooterNavLinkConfig = Readonly<
  Extract<FooterLink, { kind: "internal" }>
>;

// ============================================================================
// FOOTER CONFIG DATA
// ============================================================================

type FooterConfigData = Readonly<{
  navLinks: ReadonlyArray<Extract<FooterLink, { kind: "internal" }>>;
}>;

const createFooterConfigData = (): FooterConfigData => {
  const navLinks = getPortfolioNavigationLinks(
    contentSnapshot.portfolio,
    "footer"
  ).map((link) => ({
    kind: "internal" as const,
    label: link.label,
    href: link.href as InternalHref,
  }));

  return { navLinks };
};

const FOOTER_CONFIG_DATA = createFooterConfigData();

// ============================================================================
// FOOTER NAV LINK CONFIG
// ============================================================================

export const FOOTER_NAV_LINK_CONFIG: ReadonlyArray<FooterNavLinkConfig> =
  FOOTER_CONFIG_DATA.navLinks.map((link) => ({
    kind: "internal",
    label: link.label,
    href: link.href,
  }));
