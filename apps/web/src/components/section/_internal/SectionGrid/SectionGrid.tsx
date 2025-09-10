import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { isRenderableContent, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./SectionGrid.module.css";

// ============================================================================
// BASE SECTION GRID COMPONENT
// ============================================================================

interface SectionGridProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type SectionGridComponent = React.FC<SectionGridProps>;

/** A section grid component that arranges section content in a grid layout. */
const BaseSectionGrid: SectionGridComponent = setDisplayName(
  function BaseSectionGrid(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.sectionGrid, className)}
        data-section-grid-id={`${_internalId}-section-grid`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid={`${_internalId}-section-grid`}
      >
        {children}
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SECTION GRID COMPONENT
// ============================================================================

/** A memoized section grid component. */
const MemoizedSectionGrid = React.memo(BaseSectionGrid);

// ============================================================================
// MAIN SECTION GRID COMPONENT
// ============================================================================

/** A section grid component that arranges section content in a grid layout. */
const SectionGrid: SectionGridComponent = setDisplayName(
  function SectionGrid(props) {
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

    const Component = isMemoized ? MemoizedSectionGrid : BaseSectionGrid;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { SectionGrid };
