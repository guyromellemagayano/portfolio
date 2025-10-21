import React from "react";

import { default as NextLink } from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { SocialLink } from "./_internal";
import { type CommonLinkProps } from "./_types";

// ============================================================================
// LINK COMPONENT TYPES & INTERFACES
// ============================================================================

export interface LinkProps extends CommonLinkProps {}
export type LinkComponent = React.FC<LinkProps>;

// ============================================================================
// BASE LINK COMPONENT
// ============================================================================

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
      {...createComponentProps(componentId, "link-root", isDebugMode)}
    >
      {children}
    </NextLink>
  );

  return element;
});

// ============================================================================
// MEMOIZED LINK COMPONENT
// ============================================================================

const MemoizedLink = React.memo(BaseLink);

// ============================================================================
// MAIN LINK COMPONENT
// ============================================================================

type LinkCompoundComponent = React.FC<LinkProps> & {
  /** A link social component that provides consistent social structure for page content. */
  Social: typeof SocialLink;
};

export const Link = setDisplayName(function Link(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedLink : BaseLink;
  const element = <Component {...rest}>{children}</Component>;
  return element;
} as LinkCompoundComponent);

Link.Social = SocialLink;
