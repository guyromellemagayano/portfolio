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

export type CardLinkProps<T extends React.ComponentPropsWithRef<"div">> = Omit<
  T,
  "as"
> &
  Omit<
    React.ComponentPropsWithoutRef<typeof CardLinkCustom>,
    keyof React.ComponentPropsWithRef<"div">
  > &
  CommonComponentProps;

// ============================================================================
// MAIN CARD LINK COMPONENT
// ============================================================================

export const CardLink = setDisplayName(function CardLink<
  T extends React.ComponentPropsWithRef<"div">,
>(props: CardLinkProps<T>) {
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

  const CustomLinkComponent = function () {
    return href && isValidLink(href) ? (
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
    );
  };

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
      <CustomLinkComponent />
    </>
  );

  return element;
});

// ============================================================================
// MEMOIZED CARD LINK COMPONENT
// ============================================================================

export const MemoizedCardLink = React.memo(CardLink);
