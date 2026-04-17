/**
 * @file apps/web/src/components/route-shell/RouteShell.tsx
 * @author Guy Romelle Magayano
 * @description Orchestrates route-aware shell composition for web app pages.
 */

import React from "react";
import type { Route } from "next";

import { Layout, type LayoutProps } from "@web/components/layout";
import type { FooterLink } from "@web/config/footer";
import type { HeaderComponentNavLinks } from "@web/config/header";

import { getBrochureSnapshot } from "@web/app/_lib/portfolio-brochure";

type InternalHref = Route | (string & {});

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
  const headerNavLinks: HeaderComponentNavLinks = snapshot.navigation
    .filter((entry) => entry.showInHeader)
    .sort((left, right) => left.order - right.order)
    .map((entry) => ({
      kind: "internal" as const,
      label: entry.label,
      href: entry.href as InternalHref,
    }));
  const footerNavLinks: ReadonlyArray<FooterLink> = snapshot.navigation
    .filter((entry) => entry.showInFooter)
    .sort((left, right) => left.order - right.order)
    .map((entry) => ({
      kind: "internal" as const,
      label: entry.label,
      href: entry.href as InternalHref,
    }));

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<RouteShellElementType>)}
      footerProps={{
        navLinks: footerNavLinks,
      }}
      headerProps={{
        navLinks: headerNavLinks,
        avatarAlt: snapshot.profile.avatar?.alt || snapshot.profile.name,
        avatarHref: "/",
        avatarSrc: snapshot.profile.avatar?.src,
      }}
    >
      {children}
    </Component>
  );
}

RouteShell.displayName = "RouteShell";
