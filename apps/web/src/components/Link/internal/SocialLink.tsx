import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CommonLinkProps } from "../data";

// ============================================================================
// SOCIAL LINK COMPONENT TYPES & INTERFACES
// ============================================================================

/** `SocialLinkProps` component props. */
export interface SocialLinkProps extends CommonLinkProps {
  icon: React.ComponentType<{ className?: string }>;
}

/** `SocialLinkComponent` component type. */
export type SocialLinkComponent = React.FC<SocialLinkProps>;

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
      debugId,
      debugMode,
      className,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

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
        className={cn("group -m-1 p-1", className)}
        {...createComponentProps(componentId, "social-link", isDebugMode)}
      >
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
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
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedSocialLink : BaseSocialLink;
  const element = <Component {...rest} />;
  return element;
});
