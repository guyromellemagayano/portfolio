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
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "a" or "Link (NextLink)" are allowed */
    as?: T;
    /** The variant of the link */
    variant?: LinkVariant;
    /** The icon to display */
    icon?: IconProps["name"];
    /** The page to display */
    page?: IconProps["page"];
    /** Whether to display a label */
    hasLabel?: boolean;
    /** The label to display */
    label?: string;
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
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Link component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  // Define a mapping of variants to components
  const variantComponentMap: Record<LinkVariant, React.ElementType> = {
    default: Component,
    social: SocialLink,
  };

  // Choose the component based on variant
  const VariantComponent = variantComponentMap[variant] || Component;

  // For default variant, use string element directly
  // Respect the `as` prop if provided, otherwise use "Link (NextLink)" from variant map
  if (variant === "default") {
    const linkHref = href && isValidLink(href) ? href : "";
    const linkTargetProps = getLinkTargetProps(linkHref, target);
    const Element = (
      Component !== NextLink ? Component : VariantComponent
    ) as React.ElementType;

    return (
      <Element
        {...(rest as React.ComponentPropsWithoutRef<typeof Element>)}
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        aria-label={title}
        {...createComponentProps(componentId, "link", isDebugMode)}
      >
        {children}
      </Element>
    );
  }

  const variantProps = {
    ...rest,
    href,
    target,
    title,
    variant,
    debugId,
    debugMode,
  };

  return <VariantComponent {...variantProps}>{children}</VariantComponent>;
});

// ============================================================================
// MEMOIZED LINK COMPONENT
// ============================================================================

export const MemoizedLink = React.memo(Link);

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

  const element = (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={title}
      aria-label={hasLabel && label ? label : (title ?? "")}
      {...createComponentProps(componentId, "social-link", isDebugMode)}
    >
      {icon && (icon as IconProps["name"]) ? (
        <Icon
          name={icon}
          page={page}
          className={cn(
            "h-6 w-6 fill-zinc-500 transition",
            "group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300",
            hasLabel && "flex-none group-hover:fill-teal-500"
          )}
          {...createComponentProps(
            componentId,
            "social-link-icon",
            isDebugMode
          )}
        />
      ) : null}

      {hasLabel && label ? <span className="ml-4">{label}</span> : null}
    </Component>
  );

  return element;
});
