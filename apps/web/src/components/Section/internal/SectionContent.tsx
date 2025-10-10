import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// SECTION CONTENT COMPONENT TYPES & INTERFACES
// ============================================================================

/** `SectionContent` component props. */
export interface SectionContentProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

/** `SectionContent` component type. */
export type SectionContentComponent = React.FC<SectionContentProps>;

// ============================================================================
// BASE SECTION CONTENT COMPONENT
// ============================================================================

/** A section content component that wraps section content with proper styling. */
const BaseSectionContent: SectionContentComponent = setDisplayName(
  function BaseSectionContent(props) {
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
        id={`${componentId}-section-content-root`}
        className={cn("md:col-span-3", className)}
        {...createComponentProps(componentId, "section-content", isDebugMode)}
      >
        {children}
      </Component>
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
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSectionContent : BaseSectionContent;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
