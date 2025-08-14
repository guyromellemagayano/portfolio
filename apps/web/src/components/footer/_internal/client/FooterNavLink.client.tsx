"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type {
  FooterNavLinkProps,
  FooterNavLinkRef,
} from "@web/components/footer/models";
import { cn, isActivePath } from "@web/lib";

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

  return (
    <Link
      ref={ref}
      href={href}
      target={target}
      rel={computedRel}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "transition hover:text-teal-500 dark:hover:text-teal-400",
        isActive && "text-teal-600 dark:text-teal-300",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
});
