import React from "react";

import { CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CardCtaLinkProps } from "../CardCta";
import { CardLinkCustom } from "../CardLinkCustom";

// ============================================================================
// CARD TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

export type CardTitleProps<T extends React.ComponentPropsWithRef<"h2">> = Omit<
  T,
  "as"
> &
  CommonComponentProps &
  Omit<CardCtaLinkProps, keyof React.ComponentPropsWithoutRef<"h2">>;

// ============================================================================
// MAIN CARD TITLE COMPONENT
// ============================================================================

export const CardTitle = setDisplayName(function CardTitle<
  T extends React.ComponentPropsWithRef<"h2">,
>(props: CardTitleProps<T>) {
  const {
    as: Component = "h2" as unknown as React.ElementType,
    children,
    className,
    href,
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

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  const LinkComponent = function () {
    return isValidLink(linkHref) ? (
      <CardLinkCustom
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        {children}
      </CardLinkCustom>
    ) : (
      <>{children}</>
    );
  };

  const element = (
    <Component
      {...rest}
      className={cn(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className
      )}
      {...createComponentProps(componentId, "card-title", isDebugMode)}
    >
      <LinkComponent />
    </Component>
  );

  return element;
});

// ============================================================================
// MEMOIZED CARD TITLE COMPONENT
// ============================================================================

export const MemoizedCardTitle = React.memo(CardTitle);
