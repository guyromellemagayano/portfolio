import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { ContainerInner, ContainerOuter } from "./_internal";

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

interface ContainerProps extends React.ComponentProps<"div">, ComponentProps {}

type ContainerCompoundComponent = React.ComponentType<ContainerProps> & {
  /** A container inner component that provides consistent inner structure for page content. */
  Inner: typeof ContainerInner;
  /** A container outer component that provides consistent outer structure for page content. */
  Outer: typeof ContainerOuter;
};

/** Top-level layout container that provides consistent outer and inner structure for page content. */
const Container = setDisplayName(function Container(props) {
  const { children, internalId, debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!isRenderableContent(children)) return null;

  const element = (
    <ContainerOuter {...rest} internalId={id} debugMode={isDebugMode}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  );

  return element;
} as ContainerCompoundComponent);

// ============================================================================
// CONTAINER COMPOUND COMPONENTS
// ============================================================================

Container.Outer = ContainerOuter;
Container.Inner = ContainerInner;

export { Container };
