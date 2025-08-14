import React from "react";

import { P } from "@guyromellemagayano/components";

import type {
  CardDescriptionComponent,
  CardDescriptionProps,
  CardDescriptionRef,
} from "@web/components/card";
import { cn } from "@web/lib";

import styles from "./CardDescription.module.css";

/** A card description component that can optionally be wrapped in a link for navigation. */
export const CardDescription = React.forwardRef<
  CardDescriptionRef,
  CardDescriptionProps
>(function CardDescription(props, ref) {
  const { children, className, ...rest } = props;

  if (!children) return null;

  const element = (
    <P ref={ref} className={cn(styles.cardDescription, className)} {...rest}>
      {children}
    </P>
  );

  return element;
}) as CardDescriptionComponent;

CardDescription.displayName = "CardDescription";
