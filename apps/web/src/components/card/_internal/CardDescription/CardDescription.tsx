import React from "react";

import { P } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardDescription.module.css";

interface CardDescriptionProps
  extends React.ComponentProps<typeof P>,
    Pick<ComponentProps, "internalId" | "debugMode" | "isClient" | "isMemoized"> {}

/** Public card description component with `useComponentId` integration */
const CardDescription: React.FC<CardDescriptionProps> = setDisplayName(
  function CardDescription(props) {
    const {
      children,
      className,
      internalId,
      debugMode,
      as: Component = P,
      ...rest
    } = props;

    // Use shared hook for ID generation, component naming, and debug logging
    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const element = (
      <Component
        {...rest}
        className={cn(styles.cardDescription, className)}
        data-card-description-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-description-root"
      >
        {children}
      </Component>
    );

    return element;
  }
);

export { CardDescription };
