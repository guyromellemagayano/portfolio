import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON CONTAINER COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CommonInternalContainerProps
  extends React.ComponentProps<"div">,
    Omit<CommonComponentProps, "as"> {}
export type CommonInternalContainerComponent =
  React.FC<CommonInternalContainerProps>;
