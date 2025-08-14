import React from "react";

import Link from "next/link";

import { Div } from "@guyromellemagayano/components";

import {
  type CardCtaComponent,
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
      href,
      title = "",
      target = "_self",
      ...rest
    } = props;

    const element = (
      <Div
        ref={ref}
        className={cn(styles.cardCtaContainer, className)}
        aria-hidden="true"
        {...rest}
      >
        {href ? (
          <Link
            href={href}
            title={title}
            target={target}
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
) as CardCtaComponent;

CardCta.displayName = "CardCta";
