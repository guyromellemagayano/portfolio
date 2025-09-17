import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON CONTAINER COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CommonContainerProps
  extends React.ComponentProps<"div">,
    Omit<CommonComponentProps, "as"> {}
export type CommonContainerComponent = React.FC<CommonContainerProps>;
