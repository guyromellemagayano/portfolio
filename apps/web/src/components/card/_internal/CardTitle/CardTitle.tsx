import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { CardLinkCustom } from "../CardLink/CardLinkCustom";
import styles from "./CardTitle.module.css";

// ============================================================================
// CARD TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardTitleProps
  extends React.ComponentPropsWithRef<"h2">,
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "target" | "title"
    >,
    CommonComponentProps {}
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
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const element = (
      <h2
        {...rest}
        className={cn(styles.cardTitleHeading, className)}
        {...createComponentProps(_internalId, "card-title", _debugMode)}
      >
        {isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
            title={title}
            _internalId={_internalId}
            _debugMode={_debugMode}
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
const CardTitle: CardTitleComponent = setDisplayName(function CardTitle(props) {
  const {
    children,
    isMemoized = false,
    _internalId,
    _debugMode,
    ...rest
  } = props;

  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  if (!isRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    _internalId: id,
    _debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedCardTitle : BaseCardTitle;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
});

export { CardTitle };
