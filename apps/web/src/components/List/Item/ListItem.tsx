import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { ArticleListItem } from "./_internal";
import styles from "./ListItem.module.css";

// ============================================================================
// LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ListItemProps
  extends React.ComponentProps<"li">,
    CommonComponentProps,
    Omit<CommonComponentProps, "as"> {}
export type ListItemComponent = React.FC<ListItemProps>;

// ============================================================================
// BASE LIST ITEM COMPONENT
// ============================================================================

/** Renders the base list item as a `<li>` element. */
const BaseListItem: ListItemComponent = setDisplayName(
  function BaseListItem(props) {
    const { className, children, internalId, debugMode, ...rest } = props;

    const element = (
      <li
        {...rest}
        className={cn(styles.listItem, className)}
        {...createComponentProps(internalId, "list-item", debugMode)}
      >
        {children}
      </li>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED LIST ITEM COMPONENT
// ============================================================================

/** A memoized list item component. */
const MemoizedListItem = React.memo(BaseListItem);

// ============================================================================
// MAIN LIST ITEM COMPONENT
// ============================================================================

/** Top-level list item component rendered as a `<li>` element. */
export const ListItem = setDisplayName(function ListItem(props) {
  const {
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

  if (!hasAnyRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedListItem : BaseListItem;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
} as ListItemCompoundComponent);

// ============================================================================
// LIST ITEM COMPOUND COMPONENTS
// ============================================================================

type ListItemCompoundComponent = React.FC<ListItemProps> & {
  /** A list item article component. */
  Article: typeof ArticleListItem;
};

ListItem.Article = ArticleListItem;
