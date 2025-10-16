import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// HEADER AVATAR CONTAINER COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HeaderAvatarContainerProps
  extends React.ComponentPropsWithRef<"div">,
    CommonComponentProps {}
export type HeaderAvatarContainerComponent =
  React.FC<HeaderAvatarContainerProps>;

// ============================================================================
// BASE HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

const BaseHeaderAvatarContainer: HeaderAvatarContainerComponent =
  setDisplayName(function BaseHeaderAvatarContainer(props) {
    const {
      as: Component = "div",
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
        className={cn(
          "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
          className
        )}
        {...createComponentProps(
          componentId,
          "header-avatar-container",
          isDebugMode
        )}
      />
    );

    return element;
  });

// ============================================================================
// MEMOIZED HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

const MemoizedHeaderAvatarContainer = React.memo(BaseHeaderAvatarContainer);

// ============================================================================
// MAIN HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

export const HeaderAvatarContainer: HeaderAvatarContainerComponent =
  setDisplayName(function HeaderAvatarContainer(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedHeaderAvatarContainer
      : BaseHeaderAvatarContainer;
    const element = <Component {...rest} />;
    return element;
  });
