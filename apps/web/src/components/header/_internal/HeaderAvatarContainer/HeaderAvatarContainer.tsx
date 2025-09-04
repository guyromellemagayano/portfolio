import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./HeaderAvatarContainer.module.css";

// ============================================================================
// BASE HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

interface HeaderAvatarContainerProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type HeaderAvatarContainerComponent = React.FC<HeaderAvatarContainerProps>;

/** A container `div` for the `header` avatar, providing styling and debug attributes. */
const BaseHeaderAvatarContainer: HeaderAvatarContainerComponent =
  setDisplayName(function BaseHeaderAvatarContainer(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.avatarContainer, className)}
        data-header-avatar-container-id={`${_internalId}-header-avatar-container`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="header-avatar-container-root"
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
const HeaderAvatarContainer: HeaderAvatarContainerComponent = setDisplayName(
  function HeaderAvatarContainer(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    // Pass internal props directly - no transformation needed
    const updatedProps = {
      ...rest,
      _internalId,
      _debugMode,
    };

    const Component = isMemoized
      ? MemoizedHeaderAvatarContainer
      : BaseHeaderAvatarContainer;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { HeaderAvatarContainer };
