import React from "react";

import { Span, Time } from "@guyromellemagayano/components";

import type {
  CardEyebrowComponent,
  CardEyebrowProps,
  CardEyebrowRef,
} from "@web/components/card";
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
          className,
          decorate && styles.cardEyebrowDecorated
        )}
        {...rest}
      >
        {decorate && (
          <Span
            className={styles.cardEyebrowDecoratorWrapper}
            aria-hidden="true"
          >
            <Span className={styles.cardEyebrowDecorator} />
          </Span>
        )}

        {children}
      </Time>
    );

    return element;
  }
) as CardEyebrowComponent;

CardEyebrow.displayName = "CardEyebrow";
