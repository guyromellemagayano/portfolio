import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// COMMON CONTAINER COMPONENT TYPES
// ============================================================================

const ContainerElement: React.ElementType = "div";

// ============================================================================
// OUTER CONTAINER COMPONENT
// ============================================================================

type OuterContainerRef = React.ComponentRef<typeof ContainerElement>;
interface OuterContainerProps
  extends
    React.ComponentPropsWithoutRef<typeof ContainerElement>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {}

const ContainerOuter = setDisplayName(
  React.forwardRef<OuterContainerRef, OuterContainerProps>(
    function ContainerOuter(props, ref) {
      const {
        as: Component = ContainerElement,
        children,
        className,
        debugId,
        debugMode,
        ...rest
      } = props;

      // Container outer component ID and debug mode
      const { componentId, isDebugMode } = useComponentId({
        debugId,
        debugMode,
      });

      if (!children) return null;

      return (
        <Component
          {...rest}
          ref={ref}
          className={cn("sm:px-8", className)}
          {...createComponentProps(componentId, "container-outer", isDebugMode)}
        >
          <div
            className="mx-auto w-full max-w-7xl lg:px-8"
            {...createComponentProps(
              componentId,
              "container-outer-content",
              isDebugMode
            )}
          >
            {children}
          </div>
        </Component>
      );
    }
  )
);

// ============================================================================
// INNER CONTAINER COMPONENT
// ============================================================================

type InnerContainerRef = React.ComponentRef<typeof ContainerElement>;
interface InnerContainerProps
  extends
    React.ComponentPropsWithoutRef<typeof ContainerElement>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {}

const ContainerInner = setDisplayName(
  React.forwardRef<InnerContainerRef, InnerContainerProps>(
    function ContainerInner(props, ref) {
      const {
        as: Component = ContainerElement,
        children,
        className,
        debugId,
        debugMode,
        ...rest
      } = props;

      // Container inner component ID and debug mode
      const { componentId, isDebugMode } = useComponentId({
        debugId,
        debugMode,
      });

      if (!children) return null;

      return (
        <Component
          {...rest}
          ref={ref}
          className={cn("relative px-4 sm:px-8 lg:px-12", className)}
          {...createComponentProps(componentId, "container-inner", isDebugMode)}
        >
          <div
            className="mx-auto max-w-2xl lg:max-w-5xl"
            {...createComponentProps(
              componentId,
              "container-inner-content",
              isDebugMode
            )}
          >
            {children}
          </div>
        </Component>
      );
    }
  )
);

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

type ContainerRef = React.ComponentRef<typeof ContainerOuter> | null;
interface ContainerProps extends OuterContainerProps {}
interface ContainerCompoundComponent extends React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<ContainerRef>
> {
  Inner: typeof ContainerInner;
  Outer: typeof ContainerOuter;
}

export const Container = setDisplayName(
  React.forwardRef<ContainerRef, ContainerProps>(
    function Container(props, ref) {
      const {
        as: Component = ContainerOuter,
        children,
        debugId,
        debugMode,
        ...rest
      } = props;

      // Container component ID and debug mode
      const { componentId, isDebugMode } = useComponentId({
        debugId,
        debugMode,
      });

      if (!children) return null;

      return (
        <Component
          {...rest}
          ref={ref}
          debugId={componentId}
          debugMode={isDebugMode}
        >
          <ContainerInner debugId={componentId} debugMode={isDebugMode}>
            {children}
          </ContainerInner>
        </Component>
      );
    }
  )
) as ContainerCompoundComponent;

// ============================================================================
// CONTAINER COMPOUND COMPONENT
// ============================================================================

Container.Inner = ContainerInner;
Container.Outer = ContainerOuter;

// ============================================================================
// MEMOIZED CONTAINER COMPONENT
// ============================================================================

export const MemoizedContainer = React.memo(Container);
