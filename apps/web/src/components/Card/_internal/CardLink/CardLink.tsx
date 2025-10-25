import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { CardLinkCustom } from "../CardLinkCustom";

// ============================================================================
// CARD LINK COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardLinkProps
  extends React.ComponentPropsWithRef<"div">,
    Omit<
      React.ComponentPropsWithoutRef<typeof CardLinkCustom>,
      keyof React.ComponentPropsWithRef<"div">
    >,
    Omit<CommonComponentProps, "as"> {}
export type CardLinkComponent = React.FC<CardLinkProps>;

// ============================================================================
// BASE CARD LINK COMPONENT
// ============================================================================

const BaseCardLink: CardLinkComponent = setDisplayName(
  function BaseCardLink(props) {
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
      <>
        <div
          {...rest}
          className={cn(
            "absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50",
            className
          )}
          {...createComponentProps(componentId, "card-link", isDebugMode)}
        />

        {href && isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
            title={title}
            debugId={componentId}
            debugMode={isDebugMode}
          >
            <span
              className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"
              {...createComponentProps(
                componentId,
                "card-link-custom-span",
                isDebugMode
              )}
            />
            <span
              className="relative z-10"
              {...createComponentProps(
                componentId,
                "card-link-custom-span-content",
                isDebugMode
              )}
            >
              {children}
            </span>
          </CardLinkCustom>
        ) : (
          children
        )}
      </>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD LINK COMPONENT
// ============================================================================

const MemoizedCardLink = React.memo(BaseCardLink);

// ============================================================================
// MAIN CARD LINK COMPONENT
// ============================================================================

export const CardLink: CardLinkComponent = setDisplayName(
  function CardLink(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardLink : BaseCardLink;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
