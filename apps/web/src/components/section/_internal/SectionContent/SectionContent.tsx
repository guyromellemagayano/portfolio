import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./SectionContent.module.css";

// ============================================================================
// SECTION CONTENT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface SectionContentProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
export type SectionContentComponent = React.FC<SectionContentProps>;

// ============================================================================
// BASE SECTION CONTENT COMPONENT
// ============================================================================

/** A section content component that wraps section content with proper styling. */
const BaseSectionContent: SectionContentComponent = setDisplayName(
  function BaseSectionContent(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.sectionContent, className)}
        {...createComponentProps(_internalId, "section-content", _debugMode)}
      >
        {children}
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SECTION CONTENT COMPONENT
// ============================================================================

/** A memoized section content component. */
const MemoizedSectionContent = React.memo(BaseSectionContent);

// ============================================================================
// MAIN SECTION CONTENT COMPONENT
// ============================================================================

/** A section content component that wraps section content with proper styling. */
export const SectionContent: SectionContentComponent = setDisplayName(
  function SectionContent(props) {
    const {
      children,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!hasAnyRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedSectionContent : BaseSectionContent;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
