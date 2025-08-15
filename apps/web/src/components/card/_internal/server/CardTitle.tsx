import React from "react";

import { Heading } from "@guyromellemagayano/components";

import {
  CardLink,
  type CardTitleProps,
  type CardTitleRef,
} from "@web/components/card";
import { cn } from "@web/lib";

import styles from "./CardTitle.module.css";

/** A card title component that can optionally be wrapped in a link for navigation. */
export const CardTitle = React.forwardRef<CardTitleRef, CardTitleProps>(
  function CardTitle(props, ref) {
    const {
      children,
      className,
      href = "#",
      title = "",
      target = "_self",
      ...rest
    } = props;

    if (!children && !href) return null;

    const element = (
      <Heading
        ref={ref}
        as={"h2"}
        className={cn(styles.cardTitle, className)}
        {...rest}
      >
        {href ? (
          <CardLink href={href} target={target} title={title}>
            {children}
          </CardLink>
        ) : (
          children
        )}
      </Heading>
    );

    return element;
  }
);

CardTitle.displayName = "CardTitle";
