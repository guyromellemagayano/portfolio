import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./ContainerInner.module.css";

interface ContainerInnerProps
  extends React.ComponentProps<"div">,
    ComponentProps {}

/** Provides the inner structure for the `Container` compound component. */
const ContainerInner: React.FC<ContainerInnerProps> = setDisplayName(
  function ContainerInner(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const element = (
      <div
        {...rest}
        className={cn(styles.containerInner, className)}
        data-container-inner-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
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

export { ContainerInner };
