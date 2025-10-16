import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON ICON COMPONENT PROPS TYPES & INTERFACES
// ============================================================================

/** `CommonIconProps` component props. */
export interface CommonIconProps
  extends React.ComponentProps<"svg">,
    CommonComponentProps {}

/** `CommonIconComponent` component. */
export type CommonIconComponent = React.FC<CommonIconProps>;
