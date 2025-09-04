import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { type CardComponentsWithLinks } from "../../_data";
import { CardLinkCustom } from "../CardLink/CardLinkCustom";
import styles from "./CardTitle.module.css";

// ============================================================================
// BASE CARD TITLE COMPONENT
// ============================================================================

interface CardTitleProps
  extends Omit<React.ComponentProps<"h2">, "title">,
    CardComponentsWithLinks,
    CommonComponentProps {}
type CardTitleComponent = React.FC<CardTitleProps>;

/** Public card title component with `useComponentId` integration */
const BaseCardTitle: CardTitleComponent = setDisplayName(
  function BaseCardTitle(props) {
    const {
      children,
      className,
      href = "#",
      target = "_self",
      title = "",
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const element = (
      <h2
        {...rest}
        className={cn(styles.cardTitleHeading, className)}
        data-card-title-id={`${_internalId}-card-title`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={(rest as any)["data-testid"] || "card-title-root"}
      >
        {href && isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target as React.HTMLAttributeAnchorTarget | undefined}
            title={title as string | undefined}
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
