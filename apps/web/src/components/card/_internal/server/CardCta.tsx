import React from "react";

import Link from "next/link";

import { Div } from "@guyromellemagayano/components";

import {
  type CardCtaProps,
  type CardCtaRef,
  ChevronRightIcon,
} from "@web/components/card";
import { cn } from "@web/lib";

import styles from "./CardCta.module.css";

/** A card call to action component that can optionally be wrapped in a link for navigation. */
export const CardCta = React.forwardRef<CardCtaRef, CardCtaProps>(
  function CardCta(props, ref) {
    const {
      children,
      className,
      href = "#",
      target = "_self",
      title = "",
      ...rest
    } = props;

    if (!children && !href) return null;

    const element = (
      <Div
        ref={ref}
        className={cn(styles.cardCtaContainer, className)}
        {...rest}
      >
        {href ? (
          <Link
            href={href}
            target={target}
            title={title}
            className={styles.cardCtaLink}
          >
            {children}
            <ChevronRightIcon className={styles.cardCtaIcon} />
          </Link>
        ) : (
          children
        )}
      </Div>
    );

    return element;
  }
);

CardCta.displayName = "CardCta";
