"use client";

import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createCompoundComponent,
  isRenderableContent,
} from "@guyromellemagayano/utils";

import { ContainerInner, ContainerOuter } from "./_internal";

interface ContainerProps extends React.ComponentProps<typeof ContainerOuter> {}

interface ContainerInternalProps extends ContainerProps {
  /** Generated or custom component ID */
  componentId: string;
  /** Processed debug mode */
  isDebugMode: boolean;
}

/** Top-level layout container that provides consistent outer and inner structure for page content. */
const ContainerInternal: React.FC<ContainerInternalProps> = function Container(
  props
) {
  const { children, componentId, isDebugMode, ...rest } = props;

  if (!isRenderableContent(children)) return null;

  const element = (
    <ContainerOuter {...rest} internalId={componentId} debugMode={isDebugMode}>
      <ContainerInner internalId={componentId} debugMode={isDebugMode}>
        {children}
      </ContainerInner>
    </ContainerOuter>
  );

  return element;
};

type ContainerCompoundComponent = React.ComponentType<ContainerProps> & {
  /** A container inner component that provides consistent inner structure for page content. */
  Inner: typeof ContainerInner;
  /** A container outer component that provides consistent outer structure for page content. */
  Outer: typeof ContainerOuter;
};

/** Public container component with `useComponentId` integration */
const Container = createCompoundComponent(
  "Container",
  ContainerInternal,
  useComponentId,
  {
    Inner: ContainerInner,
    Outer: ContainerOuter,
  }
) as ContainerCompoundComponent;

export { Container };
