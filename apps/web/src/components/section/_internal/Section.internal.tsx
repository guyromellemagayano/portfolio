import React from "react";

import {
  Div,
  Section as GRMSectionComponent,
  Heading,
} from "@guyromellemagayano/components";
import {
  hasAnyRenderableContent,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "../Section.module.css";
import type { InternalSectionComponent } from "../Section.types";

// ============================================================================
// INTERNAL SECTION COMPONENT
// ============================================================================

/** A layout section component with optional title and content, styled for web app usage. */
export const InternalSection = setDisplayName(
  React.memo(
    React.forwardRef(function InternalSection(props, ref) {
      const { title, children, className, componentId, isDebugMode, ...rest } =
        props;

      // Use utility for better content validation
      if (!hasAnyRenderableContent(title, children)) return null;

      // Render the section with the provided title and children
      const element = (
        <GRMSectionComponent
          {...rest}
          ref={ref}
          className={cn(styles.section, className)}
          aria-labelledby={componentId}
          data-section-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
          data-testid="section-root"
        >
          <Div className={styles.sectionGrid}>
            {title && hasMeaningfulText(title) && (
              <Heading as="h2" id={componentId} className={styles.sectionTitle}>
                {title}
              </Heading>
            )}
            {children && (
              <Div className={styles.sectionContent}>{children}</Div>
            )}
          </Div>
        </GRMSectionComponent>
      );

      return element;
    })
  )
) as InternalSectionComponent;
