import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasValidContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CommonContainerComponent } from "../../_data";
import styles from "./ContainerInner.module.css";

// ============================================================================
// BASE CONTAINER INNER COMPONENT
// ============================================================================

/** Provides the inner structure for the `Container` compound component. */
const BaseContainerInner: CommonContainerComponent = setDisplayName(
  function BaseContainerInner(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.containerInner, className)}
        {...createComponentProps(internalId, "container-inner", debugMode)}
      >
        <div className={styles.containerInnerContent}>{children}</div>
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CONTAINER INNER COMPONENT
// ============================================================================

const MemoizedContainerInner = React.memo(BaseContainerInner);

// ============================================================================
// MAIN CONTAINER INNER COMPONENT
// ============================================================================

/** A container inner component that provides consistent inner structure for page content. */
export const ContainerInner: CommonContainerComponent = setDisplayName(
  function ContainerInner(props) {
    const {
      children,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasValidContent(children)) return null;

    const updatedProps = {
      ...rest,
      internalId: id,
      debugMode: isDebugMode,
      children,
    };

    const Component = isMemoized ? MemoizedContainerInner : BaseContainerInner;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
