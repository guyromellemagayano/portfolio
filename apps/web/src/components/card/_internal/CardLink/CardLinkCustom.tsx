import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

// ============================================================================
// CARD LINK CUSTOM COMPONENT TYPES & INTERFACES
// ============================================================================

interface CardLinkCustomProps
  extends React.ComponentPropsWithRef<typeof Link>,
    Omit<CommonComponentProps, "as"> {}
type CardLinkCustomComponent = React.FC<CardLinkCustomProps>;

// ============================================================================
// BASE CARD LINK CUSTOM COMPONENT
// ============================================================================

/** A custom Link component for Card components */
const BaseCardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function BaseCardLinkCustom(props) {
    const { children, href, target, title, _internalId, _debugMode, ...rest } =
      props;

    const linkHref = href && isValidLink(href) ? href : "";
    const linkTargetProps = getLinkTargetProps(linkHref, target);

    const element = (
      <Link
        {...rest}
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        {...createComponentProps(_internalId, "card-link-custom", _debugMode)}
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
export const CardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function CardLinkCustom(props) {
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

    if (!isValidLink(href) && !isRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      href,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedCardLinkCustom : BaseCardLinkCustom;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
