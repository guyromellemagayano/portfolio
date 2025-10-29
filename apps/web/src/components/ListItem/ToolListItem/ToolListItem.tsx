import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Card } from "@web/components";

// ============================================================================
// TOOL LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

type LinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href" | "target" | "title"
> & {
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
};
type ToolListItemProps<T extends React.ComponentPropsWithRef<typeof Card>> = {
  as?: T;
} & Omit<CommonComponentProps, "as"> &
  LinkProps;

// ============================================================================
// MAIN TOOL LIST ITEM COMPONENT
// ============================================================================

export const ToolListItem = setDisplayName(function ToolListItem<
  T extends React.ComponentPropsWithRef<typeof Card>,
>(props: ToolListItemProps<T>) {
  const { children, href, target, title, debugId, debugMode, ...rest } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children || !title) return null;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  const element = (
    <Card
      {...(rest as any)}
      as="li"
      role="listitem"
      debugId={componentId}
      debugMode={isDebugMode}
    >
      <Card.Title
        as="h3"
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        {title}
      </Card.Title>
      <Card.Description debugId={componentId} debugMode={isDebugMode}>
        {children}
      </Card.Description>
    </Card>
  );

  return element;
});
