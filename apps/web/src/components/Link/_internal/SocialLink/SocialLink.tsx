import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  type CommonIconProps,
  type IconCompoundComponent,
} from "@web/components";
import { cn } from "@web/utils";

import { type CommonLinkProps } from "../../Link.types";

// ============================================================================
// SOCIAL LINK COMPONENT TYPES & INTERFACES
// ============================================================================

export interface SocialLinkProps extends CommonLinkProps {
  icon: IconCompoundComponent;
  page?: CommonIconProps["page"];
  hasLabel?: boolean;
  label?: string;
}
export type SocialLinkComponent = React.FC<SocialLinkProps>;

// ============================================================================
// BASE SOCIAL LINK COMPONENT
// ============================================================================

const BaseSocialLink: SocialLinkComponent = setDisplayName(
  function BaseSocialLink(props) {
    const {
      href,
      icon: Icon,
      page,
      hasLabel = false,
      label,
      target,
      title,
      debugId,
      debugMode,
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
        aria-label={label ?? title}
        {...createComponentProps(componentId, "social-link", isDebugMode)}
      >
        <Icon
          className={cn(
            "h-6 w-6 fill-zinc-500 transition",
            "group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300",
            hasLabel && "flex-none group-hover:fill-teal-500"
          )}
          page={page}
          {...createComponentProps(
            componentId,
            "social-link-icon",
            isDebugMode
          )}
        />

        {hasLabel && label ? <span className="ml-4">{label}</span> : null}
      </Link>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SOCIAL LINK COMPONENT
// ============================================================================

const MemoizedSocialLink = React.memo(BaseSocialLink);

// ============================================================================
// MAIN SOCIAL LINK COMPONENT
// ============================================================================

export const SocialLink = setDisplayName(function SocialLink(props) {
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedSocialLink : BaseSocialLink;
  const element = <Component {...rest} />;
  return element;
});
