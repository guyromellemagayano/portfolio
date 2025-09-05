import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import {
  getLinkTargetProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

// ============================================================================
// BASE CARD LINK CUSTOM COMPONENT
// ============================================================================

interface CardLinkCustomProps
  extends React.ComponentPropsWithRef<typeof Link>,
    Pick<
      CommonComponentProps,
      | "isClient"
      | "isMemoized"
      | "internalId"
      | "_internalId"
      | "debugMode"
      | "_debugMode"
    > {}
type CardLinkCustomComponent = React.FC<CardLinkCustomProps>;

/** A custom Link component for Card components */
const BaseCardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function BaseCardLinkCustom(props) {
    const { children, href, target, title, _internalId, _debugMode, ...rest } =
      props;

    const linkTargetProps = getLinkTargetProps(href, target);

    const element = (
      <Link
        {...rest}
        href={href}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        data-card-link-id={`${_internalId}-card-link-custom`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="card-link-custom-root"
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

/** A memoized card link custom component. */
const MemoizedCardLinkCustom = React.memo(BaseCardLinkCustom);

// ============================================================================
// MAIN CARD LINK CUSTOM COMPONENT
// ============================================================================

/** A custom card link component that supports memoization and internal debug props. */
const CardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function CardLinkCustom(props) {
    const {
      children,
      href,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    if (!isValidLink(href) || !isRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      href,
      _internalId,
      _debugMode,
    };

    const Component = isMemoized ? MemoizedCardLinkCustom : BaseCardLinkCustom;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { CardLinkCustom };
