import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { cn } from "@web/lib";

import { CardLinkCustom } from "../CardLink";
import styles from "./CardCta.module.css";

// ============================================================================
// BASE CARD CTA COMPONENT
// ============================================================================

interface CardCtaProps extends React.ComponentProps<"div">, ComponentProps {
  /** The href of the link. */
  href?: React.ComponentProps<typeof Link>["href"];
  /** The target of the link. */
  target?: React.ComponentProps<typeof Link>["target"];
  /** The title of the link. */
  title?: React.ComponentProps<typeof Link>["title"];
}
type CardCtaComponent = React.FC<CardCtaProps>;

/** A call-to-action subcomponent for `Card`, optionally rendering as a link if href is provided. */
const BaseCardCta: CardCtaComponent = setDisplayName(
  function BaseCardCta(props) {
    const {
      children,
      className,
      href = "#",
      target = "_self",
      title = "",
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.cardCtaContainer, className)}
        data-card-cta-id={`${_internalId}-card-cta`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={(rest as any)["data-testid"] || "card-cta-root"}
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
const CardCta: CardCtaComponent = setDisplayName(function CardCta(props) {
  const {
    children,
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
    _internalId: id,
    _debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedCardCta : BaseCardCta;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
});

export { CardCta };
