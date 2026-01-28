/**
 * @file Footer.tsx
 * @author Guy Romelle Magayano
 * @description Footer component for the website.
 */

"use client";

// eslint-disable-next-line simple-import-sort/imports
import React from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import {
  filterValidNavigationLinks,
  formatDateSafely,
  getLinkTargetProps,
  hasValidNavigationLinks,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils/helpers";

import { Container } from "../container";

// ============================================================================
// COMMON FOOTER COMPONENT TYPES
// ============================================================================

type FooterLink =
  | {
      kind: "internal";
      label: string;
      href: React.ComponentProps<typeof Link>["href"];
    }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

type FooterData = {
  legalText: string;
  nav: ReadonlyArray<FooterLink>;
  year?: number;
};

// ============================================================================
// FOOTER NAVIGATION LINKS CONFIGURATION
// ============================================================================

type FooterNavLinkConfig = {
  kind: "internal";
  labelKey: "about" | "articles" | "projects" | "uses";
  href: string;
};

const FOOTER_COMPONENT_NAV_LINKS: ReadonlyArray<FooterNavLinkConfig> = [
  { kind: "internal", labelKey: "about", href: "/about" },
  { kind: "internal", labelKey: "articles", href: "/articles" },
  { kind: "internal", labelKey: "projects", href: "/projects" },
  { kind: "internal", labelKey: "uses", href: "/uses" },
] as const;

// ============================================================================
// FOOTER NAVIGATION COMPONENT
// ============================================================================

type FooterNavigationElementType = "nav";
type FooterNavigationProps<
  T extends FooterNavigationElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
    navLinks?: ReadonlyArray<FooterLink>;
  };

function FooterNavigation<
  T extends FooterNavigationElementType,
  P extends Record<string, unknown> = {},
>(props: FooterNavigationProps<T, P>) {
  const { as: Component = "nav", className, navLinks, ...rest } = props;

  // Internationalization
  const t = useTranslations("footer.navigation");
  const tAria = useTranslations("footer.ariaLabels");

  // Footer navigation ARIA label and default nav links
  const FOOTER_I18N = React.useMemo(
    () => ({
      footerNavigation: tAria("navigation"),
      defaultNavLinks: FOOTER_COMPONENT_NAV_LINKS.map((link) => ({
        kind: link.kind,
        label: t(link.labelKey),
        href: link.href,
      })),
    }),
    [t, tAria]
  );

  const linksToUse = navLinks || FOOTER_I18N.defaultNavLinks;
  const validNavLinks = filterValidNavigationLinks(linksToUse);

  if (!hasValidNavigationLinks(validNavLinks)) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      aria-label={FOOTER_I18N.footerNavigation}
      className={cn(
        "flex list-none flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200",
        className
      )}
    >
      {validNavLinks.map(({ kind, label, href }) => {
        const isExternal = kind === "external";
        const hrefString = isExternal ? href : href?.toString() || "";
        const hasLabelandLink =
          typeof label === "string" &&
          label.length > 0 &&
          hrefString.length > 0;

        const targetProps = getLinkTargetProps(
          hrefString,
          isExternal ? "_blank" : "_self"
        );

        if (!hasLabelandLink) return null;

        return (
          <li key={`${kind}-${label}-${hrefString}`}>
            <Link
              {...targetProps}
              href={hrefString}
              className="transition hover:text-teal-500 dark:hover:text-teal-400"
            >
              {label}
            </Link>
          </li>
        );
      })}
    </Component>
  );
}

FooterNavigation.displayName = "FooterNavigation";

// ============================================================================
// FOOTER LEGAL COMPONENT
// ============================================================================

type FooterLegalElementType = "p";
type FooterLegalProps<
  T extends FooterLegalElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
  };

function FooterLegal<
  T extends FooterLegalElementType,
  P extends Record<string, unknown> = {},
>(props: FooterLegalProps<T, P>) {
  const { as: Component = "p", className, ...rest } = props;

  // Internationalization
  const t = useTranslations("footer");
  const brandName = t("brandName");
  const currentYear = formatDateSafely(new Date(), { year: "numeric" });

  // Footer legal text and copyright text
  const FOOTER_I18N = React.useMemo(
    () => ({
      legalText: t("legal.copyright", {
        year: currentYear,
        brandName,
      }),
    }),
    [t, currentYear, brandName]
  );

  if (!FOOTER_I18N.legalText) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      className={cn("text-sm text-zinc-400 dark:text-zinc-500", className)}
    >
      {FOOTER_I18N.legalText}
    </Component>
  );
}

FooterLegal.displayName = "FooterLegal";

// ============================================================================
// MAIN FOOTER COMPONENT
// ============================================================================

type FooterElementType = "footer";

export type FooterProps<
  T extends FooterElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
    data?: FooterData;
    navLinks?: ReadonlyArray<FooterLink>;
    legalText?: string;
  };

export function Footer<
  T extends FooterElementType,
  P extends Record<string, unknown> = {},
>(props: FooterProps<T, P>) {
  const { as: Component = "footer", className, data, ...rest } = props;

  // Internationalization
  const tAria = useTranslations("footer.ariaLabels");

  // Footer ARIA label and default nav links
  const FOOTER_I18N = React.useMemo(
    () => ({
      footerAriaLabel: tAria("footer"),
    }),
    [tAria]
  );

  if (!data || !data.nav) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      aria-label={FOOTER_I18N.footerAriaLabel}
      className={cn("mt-32 flex-none", className)}
    >
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <FooterNavigation navLinks={data.nav} />
              <FooterLegal />
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </Component>
  );
}

Footer.displayName = "Footer";

// ============================================================================
// MEMOIZED FOOTER COMPONENT
// ============================================================================

export const MemoizedFooter = React.memo(Footer);
