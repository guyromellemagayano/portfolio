import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { isRenderableContent, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./SectionTitle.module.css";

// ============================================================================
// BASE SECTION TITLE COMPONENT
// ============================================================================

interface SectionTitleProps
  extends React.ComponentProps<"h2">,
    CommonComponentProps {}
type SectionTitleComponent = React.FC<SectionTitleProps>;

/** A section title component that renders a heading with proper styling and accessibility. */
const BaseSectionTitle: SectionTitleComponent = setDisplayName(
  function BaseSectionTitle(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <h2
        {...rest}
        id={_internalId}
        className={cn(styles.sectionTitle, className)}
        data-section-title-id={`${_internalId}-section-title`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={`${_internalId}-section-title`}
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

const SectionTitle: SectionTitleComponent = setDisplayName(
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

    if (!isRenderableContent(children)) return null;

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

export { SectionTitle };
