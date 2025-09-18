import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./HeaderAvatarContainer.module.css";

// ============================================================================
// HEADER AVATAR CONTAINER COMPONENT TYPES & INTERFACES
// ============================================================================

interface HeaderAvatarContainerProps
  extends React.ComponentPropsWithRef<"div">,
    Omit<CommonComponentProps, "as"> {}
type HeaderAvatarContainerComponent = React.FC<HeaderAvatarContainerProps>;

// ============================================================================
// BASE HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

/** A container `div` for the `header` avatar, providing styling and debug attributes. */
const BaseHeaderAvatarContainer: HeaderAvatarContainerComponent =
  setDisplayName(function BaseHeaderAvatarContainer(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.avatarContainer, className)}
        {...createComponentProps(
          _internalId,
          "header-avatar-container",
          _debugMode
        )}
      />
    );

    return element;
  });

// ============================================================================
// MEMOIZED HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

/** A memoized container for the header avatar, used within the `Header` compound component. */
const MemoizedHeaderAvatarContainer = React.memo(BaseHeaderAvatarContainer);

// ============================================================================
// MAIN HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

/** Renders the container div for the `Header` avatar with styling and debug attributes. */
export const HeaderAvatarContainer: HeaderAvatarContainerComponent =
  setDisplayName(function HeaderAvatarContainer(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const updatedProps = {
      ...rest,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized
      ? MemoizedHeaderAvatarContainer
      : BaseHeaderAvatarContainer;
    const element = <Component {...updatedProps} />;
    return element;
  });
