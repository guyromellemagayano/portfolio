import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardEyebrow.module.css";

interface CardEyebrowProps extends React.ComponentProps<"p">, ComponentProps {
  /** ISO date string for the eyebrow content */
  dateTime?: string;
  /** Enable decorative styling */
  decorate?: boolean;
}

/** A card eyebrow component that can optionally be wrapped in a link for navigation */
const CardEyebrow: React.FC<CardEyebrowProps> = setDisplayName(
  function CardEyebrow(props) {
    const {
      children,
      className,
      internalId,
      debugMode,
      dateTime,
      decorate,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const element = (
      <p
        {...rest}
        className={cn(
          styles.cardEyebrow,
          decorate && styles.cardEyebrowDecorated,
          className
        )}
        data-card-eyebrow-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-eyebrow-root"
      >
        {dateTime ? <time dateTime={dateTime}>{children}</time> : children}
      </p>
    );

    return element;
  }
);

export { CardEyebrow };
