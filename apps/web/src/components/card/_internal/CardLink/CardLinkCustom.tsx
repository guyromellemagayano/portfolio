import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import {
  getLinkTargetProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

// ============================================================================
// BASE CARD LINK CUSTOM COMPONENT
// ============================================================================

interface CardLinkCustomProps
  extends React.ComponentProps<typeof Link>,
    Omit<CommonComponentProps, "as"> {}
type CardLinkCustomComponent = React.FC<CardLinkCustomProps>;

/** A custom Link component for Card components */
const BaseCardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function BaseCardLinkCustom(props) {
    const {
      children,
      href = "#",
      target = "_self",
      title = "",
      _internalId,
      _debugMode,
      ...rest
    } = props;

    /** Gets the target and rel props for the link */
    const linkTargetProps = getLinkTargetProps(href, target);

    const element = (
      <Link
        {...rest}
        href={href}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        data-card-link-id={`${_internalId}-link-custom`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={(rest as any)["data-testid"] || "card-link-custom-root"}
      >
        {children}
      </Link>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD LINK CUSTOM COMPONENT
// ============================================================================

const MemoizedCardLinkCustom = React.memo(BaseCardLinkCustom);

// ============================================================================
// MAIN CARD LINK CUSTOM COMPONENT
// ============================================================================

const CardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function CardLinkCustom(props) {
    const {
      children,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    if (!isRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      _internalId,
      _debugMode,
    };

    const Component = isMemoized ? MemoizedCardLinkCustom : BaseCardLinkCustom;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { CardLinkCustom };
