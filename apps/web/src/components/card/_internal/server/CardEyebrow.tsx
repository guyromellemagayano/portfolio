import React from "react";

import { Span, Time } from "@guyromellemagayano/components";

import type { CardEyebrowProps, CardEyebrowRef } from "@web/components/card";
import { cn } from "@web/lib";

import styles from "./CardEyebrow.module.css";

/** A card eyebrow component that can optionally be wrapped in a link for navigation. */
export const CardEyebrow = React.forwardRef<CardEyebrowRef, CardEyebrowProps>(
  function CardEyebrow(props, ref) {
    const { children, className, decorate = false, ...rest } = props;

    if (!children) return null;

    const element = (
      <Time
        ref={ref}
        className={cn(
          styles.cardEyebrow,
          decorate && styles.cardEyebrowDecorated,
          className
        )}
        {...rest}
      >
        {decorate && (
          <Span className={styles.cardEyebrowDecoratorWrapper}>
            <Span className={styles.cardEyebrowDecorator} />
          </Span>
        )}
        {children}
      </Time>
    );

    return element;
  }
);

CardEyebrow.displayName = "CardEyebrow";
