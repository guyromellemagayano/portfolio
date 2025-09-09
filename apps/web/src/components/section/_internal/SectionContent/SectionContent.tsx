import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { isRenderableContent, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./SectionContent.module.css";

// ============================================================================
// BASE SECTION CONTENT COMPONENT
// ============================================================================

interface SectionContentProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type SectionContentComponent = React.FC<SectionContentProps>;

/** A section content component that wraps section content with proper styling. */
const BaseSectionContent: SectionContentComponent = setDisplayName(
  function BaseSectionContent(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.sectionContent, className)}
        data-section-content-id={`${_internalId}-section-content`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={`${_internalId}-section-content`}
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
const SectionContent: SectionContentComponent = setDisplayName(
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

    if (!isRenderableContent(children)) return null;

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

export { SectionContent };
