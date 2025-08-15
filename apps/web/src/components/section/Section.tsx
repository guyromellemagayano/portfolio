import React, { useId } from "react";

import {
  Div,
  Heading,
  Section as SectionComponent,
  type SectionProps as SectionComponentProps,
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";
import { logInfo } from "@guyromellemagayano/logger";

import { CommonWebAppComponentProps } from "@web/@types/components";
import { cn } from "@web/lib";

import styles from "./Section.module.css";

type SectionRef = SectionComponentRef;
interface SectionProps
  extends SectionComponentProps,
    CommonWebAppComponentProps {}

/** Section component for rendering a visually distinct, accessible section of content. */
export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    const { title, children, className, _internalId, _debugMode, ...rest } =
      props;

    // Use provided internal ID or generated one
    const generatedId = useId();
    const id = _internalId || generatedId;

    // Internal debug logging
    if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
      logInfo(`Section rendered with ID: ${id}`);
    }

    // If there is no title or children, return null
    if (!title && !children) return null;

    // Render the section with the provided title and children
    const element = (
      <SectionComponent
        ref={ref}
        {...rest}
        aria-labelledby={id}
        className={cn(styles.section, className)}
        data-section-id={id}
        data-debug-mode={_debugMode ? "true" : undefined}
      >
        <Div className={styles.sectionGrid}>
          {title && (
            <Heading as="h2" id={id} className={styles.sectionTitle}>
              {title}
            </Heading>
          )}

          {children && <Div className={styles.sectionContent}>{children}</Div>}
        </Div>
      </SectionComponent>
    );

    return element;
  }
);

Section.displayName = "Section";
