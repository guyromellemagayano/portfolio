import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { ArticleList } from "./_internal";
import styles from "./List.module.css";

// ============================================================================
// LIST COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ListProps
  extends Omit<React.ComponentProps<"ul">, "as">,
    CommonComponentProps {
  /** The HTML element to render as. Defaults to "ul" for unordered list. */
  as?: "ul" | "ol";
}
export type ListComponent = React.FC<ListProps>;

// ============================================================================
// BASE LIST COMPONENT
// ============================================================================

/** A base list component rendered as a `<ul>` or `<ol>` element. */
const BaseList: ListComponent = setDisplayName(function BaseList(props) {
  const {
    className,
    children,
    internalId,
    debugMode,
    as = "ul",
    ...rest
  } = props;

  const Element = as as React.ElementType;

  const element = (
    <Element
      {...rest}
      className={cn(styles.list, className)}
      {...createComponentProps(internalId, "list", debugMode)}
    >
      {children}
    </Element>
  );

  return element;
});

// ============================================================================
// MEMOIZED LIST COMPONENT
// ============================================================================

/** A memoized list component. */
const MemoizedList = React.memo(BaseList);

// ============================================================================
// MAIN LIST COMPONENT
// ============================================================================

/** Top-level list component rendered as a `<ul>` or `<ol>` element. */
export const List = setDisplayName(function List(props) {
  const {
    children,
    isMemoized = false,
    internalId,
    debugMode,
    as,
    ...rest
  } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!hasAnyRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    as,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedList : BaseList;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
} as ListCompoundComponent);

// ============================================================================
// LIST COMPOUND COMPONENTS
// ============================================================================

type ListCompoundComponent = React.FC<ListProps> & {
  /** Compound component for rendering a list of articles. */
  Article: typeof ArticleList;
};

List.Article = ArticleList;
