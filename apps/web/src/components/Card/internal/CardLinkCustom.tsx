import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

// ============================================================================
// CARD LINK CUSTOM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardLinkCustomProps
  extends React.ComponentPropsWithRef<typeof Link>,
    Omit<CommonComponentProps, "as"> {}
export type CardLinkCustomComponent = React.FC<CardLinkCustomProps>;

// ============================================================================
// BASE CARD LINK CUSTOM COMPONENT
// ============================================================================

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

const MemoizedCardLinkCustom = React.memo(BaseCardLinkCustom);

// ============================================================================
// MAIN CARD LINK CUSTOM COMPONENT
// ============================================================================

export const CardLinkCustom: CardLinkCustomComponent = setDisplayName(
  function CardLinkCustom(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardLinkCustom : BaseCardLinkCustom;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
