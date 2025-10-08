import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// SECTION GRID COMPONENT TYPES & INTERFACES
// ============================================================================

/** `SectionGrid` component props. */
export interface SectionGridProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

/** `SectionGrid` component type. */
export type SectionGridComponent = React.FC<SectionGridProps>;

// ============================================================================
// BASE SECTION GRID COMPONENT
// ============================================================================

/** A section grid component that arranges section content in a grid layout. */
const BaseSectionGrid: SectionGridComponent = setDisplayName(
  function BaseSectionGrid(props) {
    const {
      as: Component = "div",
      children,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

    const element = (
      <Component
        {...rest}
        id={`${componentId}-section-grid-root`}
        className={cn(
          "grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4",
          className
        )}
        {...createComponentProps(componentId, "section-grid", isDebugMode)}
      >
        {children}
      </Component>
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
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSectionGrid : BaseSectionGrid;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
