import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { SectionContent, SectionGrid, SectionTitle } from "./internal";

// ============================================================================
// SECTION COMPONENT TYPES & INTERFACES
// ============================================================================

/** `Section` component props. */
export interface SectionProps
  extends React.ComponentProps<"section">,
    CommonComponentProps {
  /** Section title */
  title?: string;
}

/** `Section` component type. */
export type SectionComponent = React.FC<SectionProps>;

// ============================================================================
// BASE SECTION COMPONENT
// ============================================================================

/** A layout section component with optional title and content, styled for web app usage. */
const BaseSection: SectionComponent = setDisplayName(
  function BaseSection(props) {
    const {
      as: Component = "section",
      children,
      className,
      title,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

    const element = (
      <Component
        {...rest}
        id={`${componentId}-section-root`}
        className={cn(
          "md:border-l md:border-zinc-100 md:dark:border-zinc-700/40",
          className
        )}
        {...createComponentProps(componentId, "section", isDebugMode)}
      >
        <SectionGrid debugId={debugId} debugMode={debugMode}>
          {title && title.length > 0 ? (
            <SectionTitle debugId={debugId} debugMode={debugMode}>
              {title}
            </SectionTitle>
          ) : null}

          {children ? (
            <SectionContent debugId={debugId} debugMode={debugMode}>
              {children}
            </SectionContent>
          ) : null}
        </SectionGrid>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SECTION COMPONENT
// ============================================================================

/** A memoized section component. */
const MemoizedSection = React.memo(BaseSection);

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

/** A layout section component with optional title and content, styled for web app usage. */
export const Section: SectionComponent = setDisplayName(
  function Section(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSection : BaseSection;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
