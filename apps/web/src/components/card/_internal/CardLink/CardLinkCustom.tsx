import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CardLinkCustomComponent } from "../../../_shared";

// ============================================================================
// BASE CARD LINK CUSTOM COMPONENT
// ============================================================================

/** A custom Link component for Card components */
const BaseCardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function BaseCardLinkCustom(props) {
    const { children, href, target, title, debugId, debugMode, ...rest } =
      props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!children) return null;

    const linkHref = href && isValidLink(href) ? href : "";
    const linkTargetProps = getLinkTargetProps(linkHref, target);

    const element = (
      <Link
        {...rest}
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        aria-label={title}
        {...createComponentProps(componentId, "card-link-custom", isDebugMode)}
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
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardLinkCustom : BaseCardLinkCustom;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);

export default CardLinkCustom;
