import React from "react";

import {
  Div,
  Heading,
  Section as GRMSectionComponent,
  type SectionProps as SectionComponentProps,
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { useComponentId } from "@web/hooks/useComponentId";
import { cn } from "@web/lib";

import styles from "./Section.module.css";

type SectionRef = SectionComponentRef;
interface SectionProps
  extends SectionComponentProps,
    CommonWebAppComponentProps {}

type SectionComponent = React.ForwardRefExoticComponent<
  SectionProps & React.RefAttributes<SectionRef>
>;

/** A layout section component with optional title and content, styled for web app usage. */
export const Section: SectionComponent = React.forwardRef(
  function Section(props, ref) {
    const { title, children, className, _internalId, _debugMode, ...rest } =
      props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    // If there is no title or children, return null
    if (!title && !children) return null;

    // Render the section with the provided title and children
    const element = (
      <GRMSectionComponent
        {...rest}
        ref={ref}
        aria-labelledby={id}
        className={cn(styles.section, className)}
        data-section-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
      >
        <Div className={styles.sectionGrid}>
          {title && (
            <Heading as="h2" id={id} className={styles.sectionTitle}>
              {title}
            </Heading>
          )}

          {children && <Div className={styles.sectionContent}>{children}</Div>}
        </Div>
      </GRMSectionComponent>
    );

    return element;
  }
);

Section.displayName = "Section";
