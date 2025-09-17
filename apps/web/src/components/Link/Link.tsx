import React from "react";

import { default as NextLink } from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  hasAnyRenderableContent,
  hasValidContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CommonLinkProps } from "./_data";
import { SocialLink } from "./_internal";
import styles from "./Link.module.css";

// ============================================================================
// LINK COMPONENT TYPES & INTERFACES
// ============================================================================

interface LinkProps extends CommonLinkProps {}
type LinkComponent = React.FC<LinkProps>;

// ============================================================================
// BASE LINK COMPONENT
// ============================================================================

/** Base link component. */
const BaseLink: LinkComponent = setDisplayName(function BaseLink(props) {
  const {
    children,
    className,
    href,
    target,
    title,
    internalId,
    debugMode,
    ...rest
  } = props;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTitle = title && hasValidContent(title) ? title : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  const element = (
    <NextLink
      {...rest}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={linkTitle}
      className={cn(styles.link, className)}
      aria-label={linkTitle}
      {...createComponentProps(internalId, "link", debugMode)}
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
  const {
    href,
    children,
    isMemoized = false,
    internalId,
    debugMode,
    ...rest
  } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!isValidLink(href) && !hasAnyRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    href,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedLink : BaseLink;
  const element = <Component {...updatedProps}>{children}</Component>;
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
