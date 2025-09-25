import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { type CardCtaComponent } from "@web/components/_shared";
import { cn } from "@web/utils";

import CardLinkCustom from "../CardLink/CardLinkCustom";
import styles from "./CardCta.module.css";

// ============================================================================
// BASE CARD CTA COMPONENT
// ============================================================================

/** A call-to-action subcomponent for `Card`, optionally rendering as a link if href is provided. */
const BaseCardCta: CardCtaComponent = setDisplayName(
  function BaseCardCta(props) {
    const {
      as: Component = "div",
      children,
      className,
      href,
      target,
      title,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!children) return null;

    const element = (
      <Component
        {...rest}
        id={`${componentId}-card-cta`}
        className={cn(styles.cardCtaContainer, className)}
        {...createComponentProps(componentId, "card-cta", isDebugMode)}
      >
        {href && isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
            title={title}
            className={styles.cardCtaLink}
            debugId={componentId}
            debugMode={isDebugMode}
          >
            {children}
            <Icon.ChevronRight />
          </CardLinkCustom>
        ) : (
          children
        )}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD CTA COMPONENT
// ============================================================================

/** A memoized card call to action component. */
const MemoizedCardCta = React.memo(BaseCardCta);

// ============================================================================
// MAIN CARD CTA COMPONENT
// ============================================================================

/** A card call to action component that can optionally be wrapped in a link for navigation */
const CardCta: CardCtaComponent = setDisplayName(function CardCta(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedCardCta : BaseCardCta;
  const element = <Component {...rest}>{children}</Component>;
  return element;
});

export default CardCta;
