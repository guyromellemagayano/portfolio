import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  hasValidContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CommonLinkProps } from "../../_data";
import styles from "./SocialLink.module.css";

// ============================================================================
// SOCIAL LINK COMPONENT TYPES & INTERFACES
// ============================================================================

interface SocialLinkProps extends CommonLinkProps {
  icon: React.ComponentType<{ className?: string }>;
}
type SocialLinkComponent = React.FC<SocialLinkProps>;

// ============================================================================
// BASE SOCIAL LINK COMPONENT
// ============================================================================

/** A base social media link component. */
const BaseSocialLink: SocialLinkComponent = setDisplayName(
  function BaseSocialLink(props) {
    const {
      href,
      icon: Icon,
      target,
      title,
      internalId,
      debugMode,
      className,
      ...rest
    } = props;

    const linkHref = href && isValidLink(href) ? href : "";
    const linkTitle = title && hasValidContent(title) ? title : "";
    const linkTargetProps = getLinkTargetProps(linkHref, target);

    const element = (
      <Link
        {...rest}
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={linkTitle}
        aria-label={linkTitle}
        className={cn(styles.socialLink, className)}
        {...createComponentProps(internalId, "social-link", debugMode)}
      >
        <Icon className={styles.socialLinkIcon} />
      </Link>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SOCIAL LINK COMPONENT
// ============================================================================

/** A memoized social media link component. */
const MemoizedSocialLink = React.memo(BaseSocialLink);

// ============================================================================
// MAIN SOCIAL LINK COMPONENT
// ============================================================================

/** A social media link component with icon support. */
export const SocialLink = setDisplayName(function SocialLink(props) {
  const { href, isMemoized = false, internalId, debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!isValidLink(href)) return null;

  const updatedProps = {
    ...rest,
    href,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedSocialLink : BaseSocialLink;
  const element = <Component {...updatedProps} />;
  return element;
});
