/**
 * @file apps/web/src/components/route-shell/RouteShell.tsx
 * @author Guy Romelle Magayano
 * @description Orchestrates route-aware shell composition for web app pages.
 */

import React from "react";

import type { Route } from "next";

import { getBrochureSnapshot } from "@web/app/_lib/portfolio-brochure";
import { Layout, type LayoutProps } from "@web/components/layout";

type InternalHref = Route | (string & {});
const CURRENT_YEAR = new Date().getFullYear();

export type RouteShellElementType = typeof Layout;
export type RouteShellProps<P extends Record<string, unknown> = {}> = Omit<
  LayoutProps<P>,
  "as"
> &
  P & {
    as?: RouteShellElementType;
  };

export async function RouteShell<P extends Record<string, unknown> = {}>(
  props: RouteShellProps<P>
) {
  const { as: Component = Layout, children, ...rest } = props;

  if (children == null) return null;

  const snapshot = await getBrochureSnapshot();
  const headerNavLinks = snapshot.navigation
    .filter((entry) => entry.showInHeader)
    .sort((left, right) => left.order - right.order)
    .map((entry) => ({
      label: entry.label,
      href: entry.href as InternalHref,
    }));
  const footerNavLinks = snapshot.navigation
    .filter((entry) => entry.showInFooter)
    .sort((left, right) => left.order - right.order)
    .map((entry) => ({
      label: entry.label,
      href: entry.href as InternalHref,
    }));
  const footerSocialLinks = snapshot.socialLinks
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((entry) => ({
      href: entry.href,
      label: entry.label,
    }));

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<RouteShellElementType>)}
      footerProps={{
        legalText: `Copyright ${CURRENT_YEAR} ${snapshot.profile.name}`,
        navLinks: footerNavLinks,
        socialLinks: footerSocialLinks,
      }}
      headerProps={{
        navLinks: headerNavLinks,
        avatarAlt: snapshot.profile.avatar?.alt || snapshot.profile.name,
        avatarHref: "/",
        avatarSrc: snapshot.profile.avatar?.src,
        brandName: snapshot.profile.name,
      }}
    >
      {children}
    </Component>
  );
}

RouteShell.displayName = "RouteShell";
