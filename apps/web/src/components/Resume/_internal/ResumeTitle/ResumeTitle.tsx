import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { RESUME_I18N } from "../../Resume.i18n";

// ============================================================================
// RESUME TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ResumeTitleProps
  extends React.ComponentProps<"h2">,
    CommonComponentProps {}
export type ResumeTitleComponent = React.FC<ResumeTitleProps>;

// ============================================================================
// BASE RESUME TITLE COMPONENT
// ============================================================================

const BaseResumeTitle: ResumeTitleComponent = setDisplayName(
  function BaseResumeTitle(props) {
    const {
      as: Component = "h2",
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

    const element = (
      <Component
        {...rest}
        role="heading"
        className={cn(
          "flex text-sm font-semibold text-zinc-900 dark:text-zinc-100",
          className
        )}
        {...createComponentProps(componentId, "resume-title", isDebugMode)}
      >
        <Icon.Briefcase
          className="h-6 w-6 flex-none"
          debugId={componentId}
          debugMode={isDebugMode}
        />
        <span
          className="ml-3"
          {...createComponentProps(
            componentId,
            "resume-title-text",
            isDebugMode
          )}
        >
          {RESUME_I18N.work}
        </span>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED RESUME TITLE COMPONENT
// ============================================================================

const MemoizedResumeTitle = React.memo(BaseResumeTitle);

// ============================================================================
// MAIN RESUME TITLE COMPONENT
// ============================================================================

export const ResumeTitle: ResumeTitleComponent = setDisplayName(
  function ResumeTitle(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedResumeTitle : BaseResumeTitle;
    const element = <Component {...rest} />;
    return element;
  }
);
