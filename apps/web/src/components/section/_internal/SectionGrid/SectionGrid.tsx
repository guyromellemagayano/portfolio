import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./SectionGrid.module.css";

// ============================================================================
// SECTION GRID COMPONENT TYPES & INTERFACES
// ============================================================================

interface SectionGridProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type SectionGridComponent = React.FC<SectionGridProps>;

// ============================================================================
// BASE SECTION GRID COMPONENT
// ============================================================================

/** A section grid component that arranges section content in a grid layout. */
const BaseSectionGrid: SectionGridComponent = setDisplayName(
  function BaseSectionGrid(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.sectionGrid, className)}
        {...createComponentProps(_internalId, "section-grid", _debugMode)}
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
export const SectionGrid: SectionGridComponent = setDisplayName(
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

    if (!hasAnyRenderableContent(children)) return null;

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
