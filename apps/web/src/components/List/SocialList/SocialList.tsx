import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

// ============================================================================
// SOCIAL LIST COMPONENT TYPES & INTERFACES
// ============================================================================

export interface SocialListProps
  extends React.ComponentPropsWithRef<"ul">,
    CommonComponentProps {}
export type SocialListComponent = React.FC<SocialListProps>;

// ============================================================================
// BASE SOCIAL LIST COMPONENT
// ============================================================================

const BaseSocialList: SocialListComponent = setDisplayName(
  function BaseSocialList(props) {
    const {
      as: Component = "ul",
      children,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!children) return null;

    const element = (
      <Component
        {...rest}
        role="list"
        {...createComponentProps(componentId, "social-list", isDebugMode)}
      >
        {children}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SOCIAL LIST COMPONENT
// ============================================================================

const MemoizedSocialList = React.memo(BaseSocialList);

// ============================================================================
// MAIN SOCIAL LIST COMPONENT
// ============================================================================

export const SocialList: SocialListComponent = setDisplayName(
  function SocialList(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSocialList : BaseSocialList;
    const element = <Component {...rest} />;
    return element;
  }
);
