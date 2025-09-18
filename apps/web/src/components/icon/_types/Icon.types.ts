import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// ICON COMPONENT PROPS TYPES & INTERFACES
// ============================================================================

export interface CommonIconProps
  extends React.ComponentProps<"svg">,
    CommonComponentProps {}
export type CommonIconComponent = React.FC<CommonIconProps>;
