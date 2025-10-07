import React from "react";

import { default as NextLink } from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonLinkProps } from "./data";
import { SocialLink } from "./internal";

// ============================================================================
// LINK COMPONENT TYPES & INTERFACES
// ============================================================================

/** `LinkProps` component props. */
export interface LinkProps extends CommonLinkProps {}

/** `LinkComponent` component type. */
export type LinkComponent = React.FC<LinkProps>;

// ============================================================================
// BASE LINK COMPONENT
// ============================================================================

/** Base link component. */
const BaseLink: LinkComponent = setDisplayName(function BaseLink(props) {
  const { children, href, target, title, debugId, debugMode, ...rest } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  const element = (
    <NextLink
      {...rest}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={title}
      aria-label={title}
      {...createComponentProps(componentId, "link", isDebugMode)}
    >
      {children}
    </NextLink>
  );

  return element;
});

// ============================================================================
// MEMOIZED LINK COMPONENT
// ============================================================================

/** A memoized link component. */
const MemoizedLink = React.memo(BaseLink);

// ============================================================================
// MAIN LINK COMPONENT
// ============================================================================

/** A default link component. */
export const Link = setDisplayName(function Link(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedLink : BaseLink;
  const element = <Component {...rest}>{children}</Component>;
  return element;
} as LinkCompoundComponent);

// ============================================================================
// LINK COMPOUND COMPONENTS
// ============================================================================

type LinkCompoundComponent = React.FC<LinkProps> & {
  /** A link social component that provides consistent social structure for page content. */
  Social: typeof SocialLink;
};

Link.Social = SocialLink;
