import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON CONTAINER COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CommonContainer` component props. */
export interface CommonContainerProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

/** `CommonContainer` component type. */
export type CommonContainerComponent = React.FC<CommonContainerProps>;
