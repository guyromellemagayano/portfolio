import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import { type ComponentProps, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./HeaderAvatarContainer.module.css";

interface HeaderAvatarContainerProps
  extends React.ComponentProps<"div">,
    ComponentProps {}
type HeaderAvatarContainerComponent = React.FC<HeaderAvatarContainerProps>;

/** A container `div` for the `header` avatar, providing styling and debug attributes. */
const HeaderAvatarContainer: HeaderAvatarContainerComponent = setDisplayName(
  function HeaderAvatarContainer(props) {
    const { className, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const element = (
      <div
        {...rest}
        className={cn(styles.avatarContainer, className)}
        data-header-avatar-container-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="header-avatar-container-root"
      />
    );

    return element;
  }
);

export { HeaderAvatarContainer };
