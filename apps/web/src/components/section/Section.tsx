import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  hasValidContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { SectionContent, SectionGrid, SectionTitle } from "./_internal";
import styles from "./Section.module.css";

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

/** A layout section component with optional title and content, styled for web app usage. */
const BaseSection: SectionComponent = setDisplayName(
  function BaseSection(props) {
    const { children, className, title, internalId, debugMode, ...rest } =
      props;

    const element = (
      <section
        {...rest}
        className={cn(styles.section, className)}
        {...createComponentProps(internalId, "section", debugMode)}
      >
        <SectionGrid _internalId={internalId} _debugMode={debugMode}>
          {hasValidContent(title) ? (
            <SectionTitle _internalId={internalId} _debugMode={debugMode}>
              {title}
            </SectionTitle>
          ) : null}
          {hasAnyRenderableContent(children) ? (
            <SectionContent _internalId={internalId} _debugMode={debugMode}>
              {children}
            </SectionContent>
          ) : null}
        </SectionGrid>
      </section>
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
    const {
      children,
      isMemoized = false,
      title,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    // Section should render if either title or children have valid content
    if (!hasValidContent(title) && !hasAnyRenderableContent(children))
      return null;

    const updatedProps = {
      ...rest,
      children,
      title,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedSection : BaseSection;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
