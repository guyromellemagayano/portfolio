import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { hasMeaningfulText, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { SectionContent, SectionGrid, SectionTitle } from "./_internal";
import styles from "./Section.module.css";

// ============================================================================
// BASE SECTION COMPONENT
// ============================================================================

export interface SectionProps
  extends React.ComponentProps<"section">,
    CommonComponentProps {
  /** Section title */
  title: string;
}
export type SectionComponent = React.FC<SectionProps>;

/** A layout section component with optional title and content, styled for web app usage. */
const BaseSection: SectionComponent = setDisplayName(
  function BaseSection(props) {
    const { title, children, className, internalId, debugMode, ...rest } =
      props;

    const element = (
      <section
        {...rest}
        className={cn(styles.section, className)}
        aria-labelledby={
          title && hasMeaningfulText(title) ? internalId : undefined
        }
        data-section-id={`${internalId}-section`}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid={`${internalId}-section-root`}
      >
        <SectionGrid _internalId={internalId} _debugMode={debugMode}>
          <SectionTitle _internalId={internalId} _debugMode={debugMode}>
            {title}
          </SectionTitle>
          {children && (
            <SectionContent _internalId={internalId} _debugMode={debugMode}>
              {children}
            </SectionContent>
          )}
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
const Section: SectionComponent = setDisplayName(function Section(props) {
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

  if (title && !hasMeaningfulText(title)) return null;

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
});

export { Section };
