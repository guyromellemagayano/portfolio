import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { CardLinkCustom } from "../CardLink/CardLinkCustom";
import styles from "./CardCta.module.css";

// ============================================================================
// CARD CTA COMPONENT TYPES & INTERFACES
// ============================================================================

interface CardCtaProps
  extends React.ComponentPropsWithRef<"div">,
    Omit<CommonComponentProps, "as"> {
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
}
type CardCtaComponent = React.FC<CardCtaProps>;

// ============================================================================
// BASE CARD CTA COMPONENT
// ============================================================================

/** A call-to-action subcomponent for `Card`, optionally rendering as a link if href is provided. */
const BaseCardCta: CardCtaComponent = setDisplayName(
  function BaseCardCta(props) {
    const {
      children,
      className,
      href,
      target,
      title,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.cardCtaContainer, className)}
        {...createComponentProps(_internalId, "card-cta", _debugMode)}
      >
        {href && isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
            title={title}
            className={styles.cardCtaLink}
            _internalId={_internalId}
            _debugMode={_debugMode}
          >
            {children}
            <Icon.ChevronRight />
          </CardLinkCustom>
        ) : (
          children
        )}
      </div>
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
export const CardCta: CardCtaComponent = setDisplayName(
  function CardCta(props) {
    const {
      children,
      href,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      href,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedCardCta : BaseCardCta;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
