import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { ResumeDownloadButton, ResumeRoleList, ResumeTitle } from "./_internal";

// ============================================================================
// RESUME COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ResumeProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
export type ResumeComponent = React.FC<ResumeProps>;

// ============================================================================
// BASE RESUME COMPONENT
// ============================================================================

const BaseResume: ResumeComponent = setDisplayName(function BaseResume(props) {
  const {
    as: Component = "div",
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  const element = (
    <Component
      {...rest}
      className={cn(
        "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
        className
      )}
      {...createComponentProps(componentId, "resume", isDebugMode)}
    >
      <ResumeTitle debugId={componentId} debugMode={isDebugMode} />
      <ResumeRoleList debugId={componentId} debugMode={isDebugMode} />
      <ResumeDownloadButton debugId={componentId} debugMode={isDebugMode} />
    </Component>
  );

  return element;
});

// ============================================================================
// MEMOIZED RESUME COMPONENT
// ============================================================================

const MemoizedResume = React.memo(BaseResume);

// ============================================================================
// MAIN RESUME COMPONENT
// ============================================================================

export const Resume: ResumeComponent = setDisplayName(function Resume(props) {
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedResume : BaseResume;
  const element = <Component {...rest} />;
  return element;
});
