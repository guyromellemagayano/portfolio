import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { isRenderableContent, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardDescription.module.css";

// ============================================================================
// BASE CARD DESCRIPTION COMPONENT
// ============================================================================

interface CardDescriptionProps
  extends React.ComponentPropsWithRef<"p">,
    CommonComponentProps {}
type CardDescriptionComponent = React.FC<CardDescriptionProps>;

/** A card description component that can optionally be wrapped in a link for navigation */
const BaseCardDescription: CardDescriptionComponent = setDisplayName(
  function BaseCardDescription(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <p
        {...rest}
        className={cn(styles.cardDescription, className)}
        data-card-description-id={`${_internalId}-card-description`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="card-description-root"
      >
        {children}
      </p>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD DESCRIPTION COMPONENT
// ============================================================================

/** A memoized card description component. */
const MemoizedCardDescription = React.memo(BaseCardDescription);

// ============================================================================
// MAIN CARD DESCRIPTION COMPONENT
// ============================================================================

/** A card description component that can optionally be wrapped in a link for navigation */
const CardDescription: CardDescriptionComponent = setDisplayName(
  function CardDescription(props) {
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

    const Component = isMemoized
      ? MemoizedCardDescription
      : BaseCardDescription;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { CardDescription };
