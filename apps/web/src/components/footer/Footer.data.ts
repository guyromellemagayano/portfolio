import type { Route } from "next";

type InternalHref = Route | (string & {});

export type FooterLink =
  | { kind: "internal"; label: string; href: InternalHref }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

export const BRAND_NAME = "Guy Romelle Magayano";

export type FooterComponentLabels = Readonly<{
  brandName: string;
  legalText: string;
}>;

export const FOOTER_COMPONENT_LABELS = {
  brandName: BRAND_NAME,
  legalText: `${BRAND_NAME}. All rights reserved.`,
} as const satisfies FooterComponentLabels;

export type FooterComponentNavLinks = ReadonlyArray<
  Extract<FooterLink, { kind: "internal" }>
>;

export const FOOTER_COMPONENT_NAV_LINKS = [
  { kind: "internal", label: "About", href: "/about" },
  { kind: "internal", label: "Articles", href: "/articles" },
  { kind: "internal", label: "Projects", href: "/projects" },
  { kind: "internal", label: "Speaking", href: "/speaking" },
  { kind: "internal", label: "Uses", href: "/uses" },
] as const satisfies FooterComponentNavLinks;
