import React from "react";

import Image from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type Role } from "../../Resume.data";
import { RESUME_I18N } from "../../Resume.i18n";

// ============================================================================
// RESUME ROLE LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ResumeRoleListItemProps
  extends React.ComponentProps<"li">,
    CommonComponentProps {
  roleData: Role;
}
export type ResumeRoleListItemComponent = React.FC<ResumeRoleListItemProps>;

// ============================================================================
// BASE RESUME ROLE LIST ITEM COMPONENT
// ============================================================================

const BaseResumeRoleListItem: ResumeRoleListItemComponent = setDisplayName(
  function BaseResumeRoleListItem(props) {
    const {
      as: Component = "li",
      roleData,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

    let startLabel =
      typeof roleData.start === "string"
        ? roleData.start
        : roleData.start.label;
    let startDate =
      typeof roleData.start === "string"
        ? roleData.start
        : roleData.start.dateTime;
    let endLabel =
      typeof roleData.end === "string" ? roleData.end : roleData.end.label;
    let endDate =
      typeof roleData.end === "string" ? roleData.end : roleData.end.dateTime;

    const element = (
      <Component
        {...rest}
        role="listitem"
        className={cn("flex gap-4", className)}
        {...createComponentProps(
          componentId,
          "resume-role-list-item",
          isDebugMode
        )}
      >
        <div
          className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
          {...createComponentProps(
            componentId,
            "resume-role-list-item-logo",
            isDebugMode
          )}
        >
          <Image
            src={roleData.logo}
            alt={roleData.company}
            className="h-7 w-7"
            unoptimized
            {...createComponentProps(
              componentId,
              "resume-role-list-item-image",
              isDebugMode
            )}
          />
        </div>
        <dl
          className="flex flex-auto flex-wrap gap-x-2"
          {...createComponentProps(
            componentId,
            "resume-role-list-item-details",
            isDebugMode
          )}
        >
          <dt
            className="sr-only"
            {...createComponentProps(
              componentId,
              "resume-role-list-item-company-label",
              isDebugMode
            )}
          >
            {RESUME_I18N.company}
          </dt>
          <dd
            className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
            {...createComponentProps(
              componentId,
              "resume-role-list-item-company",
              isDebugMode
            )}
          >
            <span
              {...createComponentProps(
                componentId,
                "resume-role-list-item-company",
                isDebugMode
              )}
            >
              {roleData.company}
            </span>
          </dd>
          <dt
            className="sr-only"
            {...createComponentProps(
              componentId,
              "resume-role-list-item-role-label",
              isDebugMode
            )}
          >
            {RESUME_I18N.role}
          </dt>
          <dd
            className="text-xs text-zinc-500 dark:text-zinc-400"
            {...createComponentProps(
              componentId,
              "resume-role-list-item-role",
              isDebugMode
            )}
          >
            <span
              {...createComponentProps(
                componentId,
                "resume-role-list-item-title",
                isDebugMode
              )}
            >
              {roleData.title}
            </span>
          </dd>
          <dt
            className="sr-only"
            {...createComponentProps(
              componentId,
              "resume-role-list-item-date-label",
              isDebugMode
            )}
          >
            {RESUME_I18N.date}
          </dt>
          <dd
            className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
            {...createComponentProps(
              componentId,
              "resume-role-list-item-date",
              isDebugMode
            )}
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time
              dateTime={startDate}
              {...createComponentProps(
                componentId,
                "resume-role-list-item-date-time",
                isDebugMode
              )}
            >
              {startLabel}
            </time>{" "}
            <span aria-hidden="true">—</span>{" "}
            <time
              dateTime={endDate}
              {...createComponentProps(
                componentId,
                "resume-role-list-item-date-time",
                isDebugMode
              )}
            >
              {endLabel}
            </time>
          </dd>
        </dl>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED RESUME ROLE LIST ITEM COMPONENT
// ============================================================================

const MemoizedResumeRoleListItem = React.memo(BaseResumeRoleListItem);

// ============================================================================
// MAIN RESUME ROLE LIST ITEM COMPONENT
// ============================================================================

export const ResumeRoleListItem: ResumeRoleListItemComponent = setDisplayName(
  function ResumeRoleListItem(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedResumeRoleListItem
      : BaseResumeRoleListItem;
    const element = <Component {...rest} />;
    return element;
  }
);
