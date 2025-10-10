import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// SECTION TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

/** `SectionTitle` component props. */
export interface SectionTitleProps
  extends React.ComponentProps<"h2">,
    CommonComponentProps {}

/** `SectionTitle` component type. */
export type SectionTitleComponent = React.FC<SectionTitleProps>;

// ============================================================================
// BASE SECTION TITLE COMPONENT
// ============================================================================

/** A section title component that renders a heading with proper styling and accessibility. */
const BaseSectionTitle: SectionTitleComponent = setDisplayName(
  function BaseSectionTitle(props) {
    const {
      as: Component = "h2",
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
        id={`${componentId}-section-title-root`}
        className={cn(
          "text-sm font-semibold text-zinc-800 dark:text-zinc-100",
          className
        )}
        {...createComponentProps(componentId, "section-title", isDebugMode)}
      >
        {children}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SECTION TITLE COMPONENT
// ============================================================================

/** A memoized section title component. */
const MemoizedSectionTitle = React.memo(BaseSectionTitle);

// ============================================================================
// MAIN SECTION TITLE COMPONENT
// ============================================================================

/** A section title component that renders a heading with proper styling and accessibility. */
export const SectionTitle: SectionTitleComponent = setDisplayName(
  function SectionTitle(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSectionTitle : BaseSectionTitle;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
