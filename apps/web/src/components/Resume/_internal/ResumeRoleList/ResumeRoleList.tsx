import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { ResumeRoleListItem } from "@web/components/Resume/_internal";
import { cn } from "@web/utils";

import { RESUME_DATA } from "../../Resume.data";

// ============================================================================
// RESUME ROLE LIST COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ResumeRoleListProps
  extends React.ComponentProps<"ol">,
    CommonComponentProps {}
export type ResumeRoleListComponent = React.FC<ResumeRoleListProps>;

// ============================================================================
// BASE RESUME ROLE LIST COMPONENT
// ============================================================================

const BaseResumeRoleList: ResumeRoleListComponent = setDisplayName(
  function BaseResumeRoleList(props) {
    const {
      as: Component = "ol",
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

    const element = (
      <Component
        {...rest}
        role="list"
        className={cn("mt-6 space-y-4", className)}
        {...createComponentProps(componentId, "resume-role-list", isDebugMode)}
      >
        {RESUME_DATA.map((role, index) => (
          <ResumeRoleListItem
            key={`${role.company}-${role.title}-${index}`}
            roleData={role}
            debugId={componentId}
            debugMode={isDebugMode}
          />
        ))}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED RESUME ROLE LIST COMPONENT
// ============================================================================

const MemoizedResumeRoleList = React.memo(BaseResumeRoleList);

// ============================================================================
// MAIN RESUME ROLE LIST COMPONENT
// ============================================================================

export const ResumeRoleList: ResumeRoleListComponent = setDisplayName(
  function ResumeRoleList(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedResumeRoleList : BaseResumeRoleList;
    const element = <Component {...rest} />;
    return element;
  }
);
