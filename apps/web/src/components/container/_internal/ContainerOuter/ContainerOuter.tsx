import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./ContainerOuter.module.css";

interface ContainerOuterProps
  extends React.ComponentProps<"div">,
    ComponentProps {}

/** Provides the outer structure for the `Container` compound component. */
const ContainerOuter: React.FC<ContainerOuterProps> = setDisplayName(
  function ContainerOuter(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const element = (
      <div
        {...rest}
        className={cn(styles.containerOuter, className)}
        data-container-outer-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="container-outer-root"
      >
        <div
          className={styles.containerOuterContent}
          data-testid="container-outer-content"
        >
          {children}
        </div>
      </div>
    );

    return element;
  }
);

export { ContainerOuter };
