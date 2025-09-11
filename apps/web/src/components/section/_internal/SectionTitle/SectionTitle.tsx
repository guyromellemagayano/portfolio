import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasValidContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./SectionTitle.module.css";

// ============================================================================
// SECTION TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

interface SectionTitleProps
  extends React.ComponentProps<"h2">,
    CommonComponentProps {}
type SectionTitleComponent = React.FC<SectionTitleProps>;

// ============================================================================
// BASE SECTION TITLE COMPONENT
// ============================================================================

/** A section title component that renders a heading with proper styling and accessibility. */
const BaseSectionTitle: SectionTitleComponent = setDisplayName(
  function BaseSectionTitle(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <h2
        {...rest}
        className={cn(styles.sectionTitle, className)}
        {...createComponentProps(_internalId, "section-title", _debugMode)}
      >
        {children}
      </h2>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SECTION TITLE COMPONENT
// ============================================================================

const MemoizedSectionTitle = React.memo(BaseSectionTitle);

// ============================================================================
// MAIN SECTION TITLE COMPONENT
// ============================================================================

export const SectionTitle: SectionTitleComponent = setDisplayName(
  function SectionTitle(props) {
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

    if (!hasValidContent(children)) return null;

    const updatedProps = {
      ...rest,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedSectionTitle : BaseSectionTitle;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
