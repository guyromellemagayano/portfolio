import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardDescription.module.css";

interface CardDescriptionProps
  extends React.ComponentProps<"p">,
    ComponentProps {}

/** A card description component that can optionally be wrapped in a link for navigation */
const CardDescription: React.FC<CardDescriptionProps> = setDisplayName(
  function CardDescription(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const element = (
      <p
        {...rest}
        className={cn(styles.cardDescription, className)}
        data-card-description-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-description-root"
      >
        {children}
      </p>
    );

    return element;
  }
);

export { CardDescription };
