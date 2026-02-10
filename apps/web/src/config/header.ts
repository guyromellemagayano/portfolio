/**
 * @file header.ts
 * @author Guy Romelle Magayano
 * @description Header configuration for the web application.
 */

import { type Route } from "next";

// ============================================================================
// AVATAR STATIC CONFIG
// ============================================================================

export const AVATAR_LINK_HREF = "/" as const;

// ============================================================================
// HEADER LINK TYPES
// ============================================================================

type InternalHref = Route | (string & {});

export type HeaderLink =
  | {
      kind: "internal";
      label: string;
      href: InternalHref;
    }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

// ============================================================================
// HEADER NAV LINK CONFIG
// ============================================================================

export type HeaderNavLabelKey = "about" | "articles" | "projects" | "uses";
export type HeaderNavLinkConfig = Readonly<{
  kind: "internal";
  labelKey: HeaderNavLabelKey;
  href: InternalHref;
}>;
export type HeaderComponentNavLinks = ReadonlyArray<
  Extract<HeaderLink, { kind: "internal" }>
>;

export const HEADER_NAV_LINK_CONFIG: ReadonlyArray<HeaderNavLinkConfig> = [
  { kind: "internal", labelKey: "about", href: "/about" },
  { kind: "internal", labelKey: "articles", href: "/articles" },
  { kind: "internal", labelKey: "projects", href: "/projects" },
  { kind: "internal", labelKey: "uses", href: "/uses" },
] as const;
