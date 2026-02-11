/**
 * @file Link.tsx
 * @author Guy Romelle Magayano
 * @description Link component for the web application.
 */

import { type ComponentPropsWithRef } from "react";

import { default as NextLink } from "next/link";

import { getLinkTargetProps, isValidLink } from "@guyromellemagayano/utils";

import { cn } from "@web/utils/helpers";

import { Icon, type IconProps } from "../icon";

// ============================================================================
// COMMON LINK COMPONENT TYPES
// ============================================================================

export type LinkElementType = typeof NextLink;
export type LinkProps<P extends Record<string, unknown> = {}> =
  ComponentPropsWithRef<LinkElementType> &
    P & {
      as?: LinkElementType;
      icon?: IconProps["name"];
      page?: IconProps["page"];
      hasLabel?: boolean;
      label?: string;
    };

// ============================================================================
// SOCIAL LINK COMPONENT
// ============================================================================

export function SocialLink<P extends Record<string, unknown> = {}>(
  props: LinkProps<P>
) {
  const {
    as: Component = NextLink,
    href,
    icon,
    page,
    hasLabel = false,
    label,
    target,
    title,
    ...rest
  } = props;

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...rest}
      href={linkHref}
      target={linkTargetProps?.target}
      rel={linkTargetProps?.rel}
      title={title}
      aria-label={label ?? title}
    >
      {icon ? (
        <Icon
          name={icon}
          page={page}
          className={cn(
            "h-6 w-6 fill-zinc-500 transition",
            "group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300",
            hasLabel && "flex-none group-hover:fill-gray-500"
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

export const Link = function Link<P extends Record<string, unknown> = {}>(
  props: LinkProps<P>
) {
  const {
    as: Component = NextLink,
    children,
    href,
    target,
    title,
    label,
    ...rest
  } = props;

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...rest}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={title ?? label}
      aria-label={label}
    >
      {children}
    </Component>
  );
};

Link.displayName = "Link";

// ============================================================================
// LINK COMPONENT EXPORTS
// ============================================================================

Link.Social = SocialLink;
