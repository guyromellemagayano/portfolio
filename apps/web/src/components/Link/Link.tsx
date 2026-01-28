/**
 * @file Link.tsx
 * @author Guy Romelle Magayano
 * @description Link component for the web application.
 */

import React from "react";

import { default as NextLink } from "next/link";

import { getLinkTargetProps, isValidLink } from "@guyromellemagayano/utils";

import { cn } from "@web/utils/helpers";

import { Icon, type IconProps } from "../icon";

// ============================================================================
// COMMON LINK COMPONENT TYPES
// ============================================================================

type LinkElementType = typeof NextLink;

export type LinkProps<
  T extends LinkElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as" | "href"> &
  P & {
    as?: T;
    icon?: IconProps<"svg">["name"];
    page?: IconProps<"svg">["page"];
    hasLabel?: boolean;
    label?: string;
    href?: string;
  };

// ============================================================================
// SOCIAL LINK COMPONENT
// ============================================================================

function SocialLink<
  T extends LinkElementType,
  P extends Record<string, unknown> = {},
>(props: LinkProps<T, P>) {
  const {
    as: Component = NextLink,
    href = null,
    icon,
    page,
    hasLabel = false,
    label,
    target,
    title,
    ...rest
  } = props;

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      href={linkHref}
      target={linkTargetProps?.target ?? undefined}
      rel={linkTargetProps?.rel ?? undefined}
      title={title ?? undefined}
      aria-label={label ?? title ?? undefined}
    >
      {icon ? (
        <Icon
          name={icon}
          page={page}
          className={cn(
            "h-6 w-6 fill-zinc-500 transition",
            "group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300",
            hasLabel && "flex-none group-hover:fill-teal-500"
          )}
        />
      ) : null}

      {hasLabel && label ? <span className="ml-4">{label}</span> : null}
    </Component>
  );
}

SocialLink.displayName = "SocialLink";

// ============================================================================
// LINK COMPONENT
// ============================================================================

export const Link = function Link<
  T extends LinkElementType,
  P extends Record<string, unknown> = {},
>(props: LinkProps<T, P>) {
  const {
    as: Component = NextLink,
    children,
    href,
    target,
    label,
    ...rest
  } = props;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={label}
      aria-label={label}
    >
      {children}
    </Component>
  );
};

Link.displayName = "Link";

// ============================================================================
// LINK COMPOUND COMPONENTS
// ============================================================================

Link.Social = SocialLink;
