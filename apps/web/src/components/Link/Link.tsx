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

import { Icon, type IconNames, type IconProps } from "@web/components";
import { cn } from "@web/utils";

// ============================================================================
// LINK COMPONENT
// ============================================================================

type LinkElementType = typeof NextLink;
type LinkVariant = "default" | "social";

export type LinkProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only `Link (NextLink)` is allowed */
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
    as: Component,
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
  props: LinkProps<typeof Link>
) {
  const {
    as: Component = Link,
    href,
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

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  const element = (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={title}
      aria-label={label ?? title}
      {...createComponentProps(componentId, "social-link", isDebugMode)}
    >
      {icon ? (
        <>
          <Icon
            name={icon}
            className={cn(
              "h-6 w-6 fill-zinc-500 transition",
              "group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300",
              hasLabel && "flex-none group-hover:fill-teal-500"
            )}
            page={page}
            {...createComponentProps(
              componentId,
              "social-link-icon",
              isDebugMode
            )}
          />
          {
            // data check if icon is within IconNames union type
            !(icon as any as IconNames) && (
              <span
                style={{ color: "red", fontSize: "0.75em", marginLeft: 4 }}
                data-icon-warning="true"
              >
                Invalid icon name: {icon as string}
              </span>
            )
          }
        </>
      ) : null}

      {hasLabel && label ? <span className="ml-4">{label}</span> : null}
    </Component>
  );

  return element;
});
