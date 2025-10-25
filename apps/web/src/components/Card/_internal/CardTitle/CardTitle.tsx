import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { CardLinkCustom } from "../CardLinkCustom";

// ============================================================================
// CARD TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardTitleProps
  extends React.ComponentPropsWithRef<"h2">,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title">,
    Omit<CommonComponentProps, "as"> {
  /** Optional href for linking the title */
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
}
export type CardTitleComponent = React.FC<CardTitleProps>;

// ============================================================================
// BASE CARD TITLE COMPONENT
// ============================================================================

const BaseCardTitle: CardTitleComponent = setDisplayName(
  function BaseCardTitle(props) {
    const {
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

    const element = (
      <h2
        {...rest}
        className={cn(
          "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
          className
        )}
        {...createComponentProps(componentId, "card-title", isDebugMode)}
      >
        {isValidLink(linkHref) ? (
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
          children
        )}
      </h2>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD TITLE COMPONENT
// ============================================================================

const MemoizedCardTitle = React.memo(BaseCardTitle);

// ============================================================================
// MAIN CARD TITLE COMPONENT
// ============================================================================

export const CardTitle: CardTitleComponent = setDisplayName(
  function CardTitle(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardTitle : BaseCardTitle;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
