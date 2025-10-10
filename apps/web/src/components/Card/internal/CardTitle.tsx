import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { CardLinkCustom } from "./CardLinkCustom";

// ============================================================================
// CARD TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CardTitle` component props. */
export interface CardTitleProps
  extends React.ComponentPropsWithRef<"h2">,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title">,
    Omit<CommonComponentProps, "as"> {
  /** Optional href for linking the title */
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
}

/** `CardTitle` component type. */
export type CardTitleComponent = React.FC<CardTitleProps>;

// ============================================================================
// BASE CARD TITLE COMPONENT
// ============================================================================

/** Public card title component with `useComponentId` integration */
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

    const element = (
      <h2
        {...rest}
        className={cn(
          "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
          className
        )}
        {...createComponentProps(componentId, "card-title", isDebugMode)}
      >
        {href && isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
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

/** A memoized card title component. */
const MemoizedCardTitle = React.memo(BaseCardTitle);

// ============================================================================
// MAIN CARD TITLE COMPONENT
// ============================================================================

/** A card title component that can optionally be wrapped in a link for navigation */
export const CardTitle: CardTitleComponent = setDisplayName(
  function CardTitle(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardTitle : BaseCardTitle;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
