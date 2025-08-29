import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./ContainerInner.module.css";

// ============================================================================
// BASE CONTAINER INNER COMPONENT
// ============================================================================

interface ContainerInnerProps
  extends React.ComponentProps<"div">,
    ComponentProps {}
type ContainerInnerComponent = React.FC<ContainerInnerProps>;

/** Provides the inner structure for the `Container` compound component. */
const BaseContainerInner: ContainerInnerComponent = setDisplayName(
  function BaseContainerInner(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.containerInner, className)}
        data-container-inner-id={internalId}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid="container-inner-root"
      >
        <div
          className={styles.containerInnerContent}
          data-testid="container-inner-content"
        >
          {children}
        </div>
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
const ContainerInner: ContainerInnerComponent = setDisplayName(
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

    if (!isRenderableContent(children)) return null;

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

export { ContainerInner };
