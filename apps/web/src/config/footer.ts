/**
 * @file footer.ts
 * @author Guy Romelle Magayano
 * @description Footer configuration for the web application.
 */

import { type ComponentPropsWithoutRef } from "react";

import { type Route } from "next";
import Link from "next/link";

import footerConfig from "@web/data/footer.json";

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

export type FooterNavLabelKey = "about" | "articles" | "projects" | "uses";
export type FooterNavLinkConfig = Readonly<{
  kind: "internal";
  labelKey: FooterNavLabelKey;
  href: InternalHref;
}>;

// ============================================================================
// FOOTER CONFIG DATA
// ============================================================================

type FooterConfigData = Readonly<{
  navLinks: ReadonlyArray<{
    labelKey: FooterNavLabelKey;
    href: InternalHref;
  }>;
}>;

const FOOTER_NAV_LABEL_KEYS: ReadonlyArray<FooterNavLabelKey> = [
  "about",
  "articles",
  "projects",
  "uses",
];

const isFooterNavLabelKey = (value: string): value is FooterNavLabelKey =>
  FOOTER_NAV_LABEL_KEYS.includes(value as FooterNavLabelKey);

const createFooterConfigData = (): FooterConfigData => {
  const navLinks: ReadonlyArray<{
    labelKey: FooterNavLabelKey;
    href: InternalHref;
  }> = footerConfig.navLinks.map((link) => {
    if (!isFooterNavLabelKey(link.labelKey)) {
      throw new Error(`Invalid footer nav labelKey: ${link.labelKey}`);
    }

    return {
      labelKey: link.labelKey,
      href: link.href as InternalHref,
    };
  });

  return { navLinks };
};

const FOOTER_CONFIG_DATA = createFooterConfigData();

// ============================================================================
// FOOTER NAV LINK CONFIG
// ============================================================================

export const FOOTER_NAV_LINK_CONFIG: ReadonlyArray<FooterNavLinkConfig> =
  FOOTER_CONFIG_DATA.navLinks.map((link) => ({
    kind: "internal",
    labelKey: link.labelKey,
    href: link.href,
  }));
