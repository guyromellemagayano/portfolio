import React from "react";

import { default as NextLink } from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon, type IconProps } from "@web/components";
import { cn } from "@web/utils";

// ============================================================================
// LINK COMPONENT
// ============================================================================

type LinkElementType = typeof NextLink;
type LinkVariant = "default" | "social";

export type LinkProps<T extends LinkElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as" | "href"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "a" or "Link (NextLink)" are allowed */
    as?: T;
    /** The variant of the link */
    variant?: LinkVariant;
    /** The icon to display */
    icon?: IconProps<"svg">["name"];
    /** The page to display */
    page?: IconProps<"svg">["page"];
    /** Whether to display a label */
    hasLabel?: boolean;
    /** The label to display */
    label?: string;
    /** The href of the link */
    href?: string;
  };

export const Link = setDisplayName(function Link<T extends LinkElementType>(
  props: LinkProps<T>
) {
  const {
    as: Component = NextLink,
    variant = "default",
    children,
    href,
    target,
    label,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Link component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  // Define a mapping of variants to components
  const variantComponentMap: Record<LinkVariant, React.ElementType> = {
    default: Component,
    social: SocialLink,
  };

  // Choose the component based on variant
  const VariantComponent = variantComponentMap[variant] || Component;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);
  const Element = (
    Component !== NextLink ? Component : VariantComponent
  ) as React.ElementType;

  // For default variant, use string element directly
  // Respect the `as` prop if provided, otherwise use "Link (NextLink)" from variant map
  if (variant === "default") {
    return (
      <Element
        {...(rest as React.ComponentPropsWithoutRef<typeof Element>)}
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={label}
        aria-label={label}
        {...createComponentProps(componentId, "link", isDebugMode)}
      >
        {children}
      </Element>
    );
  }

  const variantProps = {
    ...rest,
    href: linkHref,
    target: linkTargetProps.target,
    rel: linkTargetProps.rel,
    label,
    title: label,
    variant,
    debugId: componentId,
    debugMode: isDebugMode,
  };

  return <VariantComponent {...variantProps}>{children}</VariantComponent>;
});

// ============================================================================
// SOCIAL LINK COMPONENT
// ============================================================================

const SocialLink = setDisplayName(function SocialLink(
  props: LinkProps<LinkElementType>
) {
  const {
    as: Component = NextLink,
    href = "#",
    icon,
    page,
    hasLabel = false,
    label,
    target,
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={title}
      aria-label={hasLabel && label ? label : (title ?? "")}
      {...createComponentProps(componentId, "social-link", isDebugMode)}
    >
      {icon && (icon as IconProps<"svg">["name"]) ? (
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
});
