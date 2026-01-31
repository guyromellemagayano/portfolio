/* eslint-disable simple-import-sort/imports */

/**
 * @file Footer.tsx
 * @author Guy Romelle Magayano
 * @description Footer component for the website.
 */

"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  useMemo,
} from "react";

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
import {
  FOOTER_COMPONENT_NAV_LINKS,
  FooterData,
  type FooterLink,
} from "./Footer.data";

// ============================================================================
// FOOTER NAVIGATION COMPONENT
// ============================================================================

export type FooterNavigationElementType = "nav";
export type FooterNavigationProps<P extends Record<string, unknown> = {}> =
  Omit<ComponentPropsWithRef<FooterNavigationElementType>, "as"> &
    P & {
      as?: FooterNavigationElementType;
    };

function FooterNavigation<P extends Record<string, unknown> = {}>(
  props: FooterNavigationProps<P>
) {
  const { as: Component = "nav", className, ...rest } = props;

  // Internationalization
  const t = useTranslations("footer.navigation");
  const tAria = useTranslations("footer.ariaLabels");

  // Footer navigation ARIA label and default nav links
  const FOOTER_I18N = useMemo(
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

  const linksToUse = FOOTER_I18N.defaultNavLinks;
  const validNavLinks = filterValidNavigationLinks(linksToUse);

  if (!hasValidNavigationLinks(validNavLinks)) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithRef<FooterNavigationElementType>)}
      aria-label={FOOTER_I18N.footerNavigation}
      className={cn(
        "flex list-none flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200",
        className
      )}
    >
      {validNavLinks.map(({ kind, label, href }) => {
        const isExternal = kind !== "internal";
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

export type FooterLegalElementType = "p";
export type FooterLegalProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<FooterLegalElementType>,
  "as"
> &
  P & {
    as?: FooterLegalElementType;
  };

function FooterLegal<P extends Record<string, unknown> = {}>(
  props: FooterLegalProps<P>
) {
  const { as: Component = "p", className, ...rest } = props;

  // Internationalization
  const t = useTranslations("footer");
  const brandName = t("brandName");
  const currentYear = formatDateSafely(new Date(), { year: "numeric" });
  const legalText = t("legal.copyright", {
    year: currentYear,
    brandName: brandName.trim(),
  });

  // Footer legal text and copyright text
  const FOOTER_I18N = useMemo(
    () => ({
      legalText,
    }),
    [legalText]
  );

  if (!FOOTER_I18N.legalText) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithRef<FooterLegalElementType>)}
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

export type FooterElementType = "footer";
export type FooterProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<FooterElementType>,
  "as"
> &
  P & {
    as?: FooterElementType;
    data?: FooterData;
    navLinks?: ReadonlyArray<FooterLink>;
    legalText?: string;
  };

export function Footer<P extends Record<string, unknown> = {}>(
  props: FooterProps<P>
) {
  const { as: Component = "footer", className, ...rest } = props;

  // Internationalization
  const tAria = useTranslations("footer.ariaLabels");

  // Footer ARIA label and default nav links
  const FOOTER_I18N = useMemo(
    () => ({
      footerAriaLabel: tAria("footer"),
    }),
    [tAria]
  );

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<FooterElementType>)}
      aria-label={FOOTER_I18N.footerAriaLabel}
      className={cn("mt-32 flex-none", className)}
    >
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <FooterNavigation />
              <FooterLegal />
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </Component>
  );
}

Footer.displayName = "Footer";
