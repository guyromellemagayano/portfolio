// ============================================================================
// SHARED CONTAINER COMPONENT TYPES
// ============================================================================

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

// ============================================================================
// CONTAINER COMPONENT TYPES & INTERFACES
// ============================================================================

/** `Container` component props. */
export interface ContainerProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

/** `Container` component type. */
export type ContainerComponent = React.FC<ContainerProps>;
