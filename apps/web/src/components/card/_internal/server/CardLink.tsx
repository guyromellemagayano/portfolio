import React from "react";

import Link from "next/link";

import { Div, Heading, Span } from "@guyromellemagayano/components";

import type { CardLinkProps, CardLinkRef } from "@web/components/card";
import { cn } from "@web/lib";

import styles from "./CardLink.module.css";

/** A card link component that provides interactive hover effects and accessibility features. */
export const CardLink = React.forwardRef<CardLinkRef, CardLinkProps>(
  function CardLink(props, ref) {
    const {
      children,
      className,
      as = "h2",
      href = "#",
      title = "",
      target = "_self",
      ...rest
    } = props;

    if (!children && !href) return null;

    const element = (
      <Heading
        as={as}
        className={cn(styles.cardLinkHeading, className)}
        {...rest}
      >
        <Div className={styles.cardLinkBackground} />

        {href ? (
          <Link ref={ref} href={href} target={target} title={title}>
            <Span className={styles.cardLinkClickableArea} />
            <Span className={styles.cardLinkContent}>{children}</Span>
          </Link>
        ) : (
          children
        )}
      </Heading>
    );

    return element;
  }
);

CardLink.displayName = "CardLink";
