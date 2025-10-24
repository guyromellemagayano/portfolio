import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

// ============================================================================
// SOCIAL LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface SocialListItemProps
  extends React.ComponentPropsWithRef<"li">,
    CommonComponentProps {}
export type SocialListItemComponent = React.FC<SocialListItemProps>;

// ============================================================================
// BASE SOCIAL LIST ITEM COMPONENT
// ============================================================================

const BaseSocialListItem: SocialListItemComponent = setDisplayName(
  function BaseSocialListItem(props) {
    const {
      as: Component = "li",
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
        role="listitem"
        {...createComponentProps(componentId, "social-list-item", isDebugMode)}
      >
        {children}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED SOCIAL LIST ITEM COMPONENT
// ============================================================================

const MemoizedSocialListItem = React.memo(BaseSocialListItem);

// ============================================================================
// MAIN SOCIAL LIST ITEM COMPONENT
// ============================================================================

export const SocialListItem: SocialListItemComponent = setDisplayName(
  function SocialListItem(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSocialListItem : BaseSocialListItem;
    const element = <Component {...rest} />;
    return element;
  }
);
