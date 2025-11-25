"use client";

import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { Button, Icon } from "@web/components";
import { cn } from "@web/utils";

import { RESUME_I18N } from "../../Resume.i18n";

// ============================================================================
// RESUME DOWNLOAD BUTTON COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ResumeDownloadButtonProps
  extends React.ComponentPropsWithRef<"button">,
    CommonComponentProps {}
export type ResumeDownloadButtonComponent = React.FC<ResumeDownloadButtonProps>;

// ============================================================================
// BASE RESUME DOWNLOAD BUTTON COMPONENT
// ============================================================================

const BaseResumeDownloadButton: ResumeDownloadButtonComponent = setDisplayName(
  function BaseResumeDownloadButton(props) {
    const {
      as: Component = Button,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

    const element = (
      <Component
        {...rest}
        href="/resume.pdf"
        variant="secondary"
        className={cn("group mt-6 w-full", className)}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        {RESUME_I18N.download}
        <Icon
          name="arrow-down"
          className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
          debugMode={isDebugMode}
          debugId={componentId}
        />
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED RESUME DOWNLOAD BUTTON COMPONENT
// ============================================================================

const MemoizedResumeDownloadButton = React.memo(BaseResumeDownloadButton);

// ============================================================================
// MAIN RESUME DOWNLOAD BUTTON COMPONENT
// ============================================================================

export const ResumeDownloadButton: ResumeDownloadButtonComponent =
  setDisplayName(function ResumeDownloadButton(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedResumeDownloadButton
      : BaseResumeDownloadButton;
    const element = <Component {...rest} />;
    return element;
  });
