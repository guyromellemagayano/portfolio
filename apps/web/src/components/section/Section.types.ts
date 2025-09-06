import React from "react";

import { Section as GRMSectionComponent } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@guyromellemagayano/utils";

// ============================================================================
// SECTION COMPONENT TYPES
// ============================================================================

export type SectionRef = React.ComponentRef<typeof GRMSectionComponent>;

export interface SectionProps
  extends React.ComponentPropsWithoutRef<typeof GRMSectionComponent>,
    CommonWebAppComponentProps {}

export interface InternalSectionProps
  extends Omit<SectionProps, "_internalId" | "_debugMode"> {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

export type InternalSectionComponent = React.ForwardRefExoticComponent<
  InternalSectionProps & React.RefAttributes<SectionRef>
>;

export type SectionComponent = React.ForwardRefExoticComponent<
  SectionProps & React.RefAttributes<SectionRef>
>;
