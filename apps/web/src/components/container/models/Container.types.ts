import type React from "react";

import type { DivProps, DivRef } from "@guyromellemagayano/components";

/** Container outer wrapper - max-width 7xl */
export type ContainerOuterRef = DivRef;

/** Container outer wrapper props */
export interface ContainerOuterProps extends DivProps {}

/** Container outer component type */
export type ContainerOuterComponent = React.ForwardRefExoticComponent<
  ContainerOuterProps & React.RefAttributes<ContainerOuterRef>
>;

/** Container inner wrapper - max-width 2xl */
export type ContainerInnerRef = DivRef;

/** Container inner wrapper props */
export interface ContainerInnerProps extends DivProps {}

/** Container inner component type */
export type ContainerInnerComponent = React.ForwardRefExoticComponent<
  ContainerInnerProps & React.RefAttributes<ContainerInnerRef>
>;

/** Container ref */
export type ContainerRef = ContainerOuterRef;

/** Container props */
export interface ContainerProps extends ContainerOuterProps {}

/** Container component type */
export type ContainerComponent = React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<ContainerRef>
>;
