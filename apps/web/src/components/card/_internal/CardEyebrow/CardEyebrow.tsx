import React from "react";

import { P, Time } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardEyebrow.module.css";

interface CardEyebrowProps
  extends React.ComponentProps<typeof P>,
    Pick<ComponentProps, "internalId" | "debugMode"> {
  /** ISO date string for the eyebrow content */
  dateTime?: string;
  /** Enable decorative styling */
  decorate?: boolean;
}

/** Public card eyebrow component with `useComponentId` integration */
const CardEyebrow: React.FC<CardEyebrowProps> = setDisplayName(
  function CardEyebrow(props) {
    const {
      internalId,
      debugMode,
      children,
      className,
      dateTime,
      decorate,
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
        className={cn(
          styles.cardEyebrow,
          decorate && styles.cardEyebrowDecorated,
          className
        )}
        data-card-eyebrow-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-eyebrow-root"
      >
        {dateTime ? <Time dateTime={dateTime}>{children}</Time> : children}
      </Component>
    );

    return element;
  }
);

export { CardEyebrow };
