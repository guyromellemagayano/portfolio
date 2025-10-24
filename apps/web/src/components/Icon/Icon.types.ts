import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON ICON COMPONENT PROPS TYPES & INTERFACES
// ============================================================================

export interface CommonIconProps
  extends React.ComponentProps<"svg">,
    CommonComponentProps {
  page?: string;
}
export type CommonIconComponent = React.FC<CommonIconProps>;
