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

export interface SectionTitleProps
  extends React.ComponentProps<"h2">,
    CommonComponentProps {}
export type SectionTitleComponent = React.FC<SectionTitleProps>;

// ============================================================================
// BASE SECTION TITLE COMPONENT
// ============================================================================

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

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
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

const MemoizedSectionTitle = React.memo(BaseSectionTitle);

// ============================================================================
// MAIN SECTION TITLE COMPONENT
// ============================================================================

export const SectionTitle: SectionTitleComponent = setDisplayName(
  function SectionTitle(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSectionTitle : BaseSectionTitle;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
