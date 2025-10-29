import React from "react";

import Link from "next/link";

import { CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { CardLinkCustom } from "../CardLinkCustom";

// ============================================================================
// CARD CTA COMPONENT TYPES & INTERFACES
// ============================================================================

export type CardCtaLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href" | "target" | "title"
> & {
  /** The href of the link */
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  /** The target of the link */
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  /** The title of the link */
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
};
export type CardCtaProps<T extends React.ComponentPropsWithRef<"div">> = Omit<
  T,
  "as"
> &
  CommonComponentProps &
  Omit<CardCtaLinkProps, keyof React.ComponentPropsWithoutRef<"div">>;

// ============================================================================
// MAIN CARD CTA COMPONENT
// ============================================================================

export const CardCta = setDisplayName(function CardCta<
  T extends React.ComponentPropsWithRef<"div">,
>(props: CardCtaProps<T>) {
  const {
    as: Component = "div" as unknown as React.ElementType,
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
        <Icon.ChevronRight />
      </CardLinkCustom>
    ) : (
      children
    );
  };

  const element = (
    <Component
      {...rest}
      className={cn(
        "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500",
        className
      )}
      {...createComponentProps(componentId, "card-cta", isDebugMode)}
    >
      <LinkComponent />
    </Component>
  );

  return element;
});

// ============================================================================
// MEMOIZED CARD CTA COMPONENT
// ============================================================================

export const MemoizedCardCta = React.memo(CardCta);
