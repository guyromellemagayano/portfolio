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

export type CardLinkCustomProps<
  T extends React.ComponentPropsWithRef<typeof Link>,
> = Omit<T, "as"> & CommonComponentProps;

// ============================================================================
// MAIN CARD LINK CUSTOM COMPONENT
// ============================================================================

export const CardLinkCustom = setDisplayName(function CardLinkCustom<
  T extends React.ComponentPropsWithRef<typeof Link>,
>(props: CardLinkCustomProps<T>) {
  const { children, href, target, title, debugId, debugMode, ...rest } = props;

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
});

// ============================================================================
// MEMOIZED CARD LINK CUSTOM COMPONENT
// ============================================================================

export const MemoizedCardLinkCustom = React.memo(CardLinkCustom);
