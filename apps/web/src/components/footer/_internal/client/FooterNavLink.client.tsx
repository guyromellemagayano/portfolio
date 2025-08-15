"use client";

import React, { useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type {
  FooterNavLinkProps,
  FooterNavLinkRef,
} from "@web/components/footer";
import { cn, isActivePath } from "@web/lib";

import styles from "./FooterNavLink.client.module.css";

/** Client leaf: active-state + external link safety. */
export const FooterNavLink = React.forwardRef<
  FooterNavLinkRef,
  FooterNavLinkProps
>(function FooterNavLink(props, ref) {
  const { children, className, href = "#", target, rel, ...rest } = props;

  const pathname = usePathname();
  const isActive = typeof href === "string" && isActivePath(pathname, href);

  const computedRel =
    target === "_blank" ? (rel ?? "noopener noreferrer") : rel;

  const element = useMemo(
    () => (
      <Link
        ref={ref}
        href={href}
        target={target}
        rel={computedRel}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          styles.footerNavLink,
          isActive && styles.footerNavLinkActive,
          className
        )}
        {...rest}
      >
        {children}
      </Link>
    ),
    [ref, href, target, computedRel, isActive, className, rest, children]
  );

  return element;
});

FooterNavLink.displayName = "FooterNavLink";
