import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { SectionContent, SectionGrid, SectionTitle } from "./_internal";

// ============================================================================
// SECTION COMPONENT TYPES & INTERFACES
// ============================================================================

export interface SectionProps
  extends React.ComponentProps<"section">,
    CommonComponentProps {
  /** Section title */
  title?: string;
}
export type SectionComponent = React.FC<SectionProps>;

// ============================================================================
// BASE SECTION COMPONENT
// ============================================================================

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

const MemoizedSection = React.memo(BaseSection);

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

export const Section: SectionComponent = setDisplayName(
  function Section(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSection : BaseSection;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
