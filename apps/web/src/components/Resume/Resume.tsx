import React from "react";

import Image, { type ImageProps } from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Button, Icon, List, ListItem } from "@web/components";
import {
  logoAirbnb,
  logoFacebook,
  logoPlanetaria,
  logoStarbucks,
} from "@web/images";
import { cn, getRoleItemKey, parseRoleDate } from "@web/utils";

// ============================================================================
// RESUME COMPONENT I18N
// ============================================================================

type ResumeI18n = Readonly<Record<string, string>>;

const RESUME_I18N = {
  // Content labels
  work: "Work",
  download: "Download CV",
  company: "Company",
  role: "Role",
  date: "Date",
} as const satisfies ResumeI18n;

// ============================================================================
// RESUME COMPONENT DATA
// ============================================================================

export interface Role {
  company: string;
  title: string;
  logo: ImageProps["src"];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
}
export interface ResumeData extends Array<Role> {}

const RESUME_DATA: ResumeData = [
  {
    company: "Planetaria",
    title: "CEO",
    logo: logoPlanetaria,
    start: "2019",
    end: {
      label: "Present",
      dateTime: new Date().getFullYear().toString(),
    },
  },
  {
    company: "Airbnb",
    title: "Product Designer",
    logo: logoAirbnb,
    start: "2014",
    end: "2019",
  },
  {
    company: "Facebook",
    title: "iOS Software Engineer",
    logo: logoFacebook,
    start: "2011",
    end: "2014",
  },
  {
    company: "Starbucks",
    title: "Shift Supervisor",
    logo: logoStarbucks,
    start: "2008",
    end: "2011",
  },
];

export const RESUME_FILE_NAME = "/resume.pdf";

// ============================================================================
// RESUME DOWNLOAD BUTTON COMPONENT
// ============================================================================

type ResumeDownloadButtonElementType = typeof Button;

export type ResumeDownloadButtonProps<
  T extends ResumeDownloadButtonElementType,
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as whatever element within `ResumeDownloadButtonElementType` is allowed */
    as?: T;
  };

export const ResumeDownloadButton = setDisplayName(
  function ResumeDownloadButton<T extends ResumeDownloadButtonElementType>(
    props: ResumeDownloadButtonProps<T>
  ) {
    const {
      as: Component = Button,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    // Resume download button component ID and debug mode
    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    return (
      <Component
        {...(rest as React.ComponentPropsWithoutRef<T>)}
        href={RESUME_FILE_NAME}
        variantStyle="secondary"
        className={cn("group mt-6 w-full", className)}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        {RESUME_I18N.download}
        <Icon
          name="arrow-down"
          className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
          debugId={componentId}
          debugMode={isDebugMode}
        />
      </Component>
    );
  }
);

// ============================================================================
// RESUME ROLE LIST COMPONENT
// ============================================================================

type ResumeRoleListElementType = typeof List;

export type ResumeRoleListProps<T extends ResumeRoleListElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as whatever element within `ResumeRoleListElementType` is allowed */
    as?: T;
  };

const ResumeRoleList = setDisplayName(function ResumeRoleList<
  T extends ResumeRoleListElementType,
>(props: ResumeRoleListProps<T>) {
  const {
    as: Component = List,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Resume role list component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  if (!RESUME_DATA?.length || !Array.isArray(RESUME_DATA)) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      className={cn("mt-6 space-y-4", className)}
      debugId={componentId}
      debugMode={isDebugMode}
    >
      {RESUME_DATA.map((role, index) => (
        <ResumeRoleListItem
          key={getRoleItemKey(role, index)}
          roleData={role}
          debugId={componentId}
          debugMode={isDebugMode}
        />
      ))}
    </Component>
  );
});

// ============================================================================
// RESUME ROLE LIST ITEM COMPONENT
// ============================================================================

type ResumeRoleListItemElementType = typeof ListItem;

export type ResumeRoleListItemProps<T extends ResumeRoleListItemElementType> =
  Omit<React.ComponentPropsWithRef<T>, "as"> &
    Omit<CommonComponentProps, "as"> & {
      /** The component to render as whatever element within `ResumeRoleListItemElementType` is allowed */
      as?: T;
      /** The data for the role */
      roleData: Role;
    };

const ResumeRoleListItem = setDisplayName(function ResumeRoleListItem<
  T extends ResumeRoleListItemElementType,
>(props: ResumeRoleListItemProps<T>) {
  const {
    as: Component = ListItem,
    roleData,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Resume role list item component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  const { label: startLabel, dateTime: startDate } = parseRoleDate(
    roleData.start
  );
  const { label: endLabel, dateTime: endDate } = parseRoleDate(roleData.end);

  return (
    <Component
      {...rest}
      role="listitem"
      className={cn("flex gap-4", className)}
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
});

// ============================================================================
// RESUME TITLE COMPONENT
// ============================================================================

type ResumeTitleElementType = "h2";

export type ResumeTitleProps<T extends ResumeTitleElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as whatever element within `ResumeTitleElementType` is allowed */
    as?: T;
  };

const ResumeTitle = setDisplayName(function ResumeTitle<
  T extends ResumeTitleElementType,
>(props: ResumeTitleProps<T>) {
  const {
    as: Component = "h2",
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Resume title component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  return (
    <Component
      {...rest}
      role="heading"
      className={cn(
        "flex text-sm font-semibold text-zinc-900 dark:text-zinc-100",
        className
      )}
      {...createComponentProps(componentId, "resume-title", isDebugMode)}
    >
      <Icon
        name="briefcase"
        className="h-6 w-6 flex-none"
        debugId={componentId}
        debugMode={isDebugMode}
      />
      <span
        className="ml-3"
        {...createComponentProps(componentId, "resume-title-text", isDebugMode)}
      >
        {RESUME_I18N.work}
      </span>
    </Component>
  );
});

// ============================================================================
// RESUME COMPONENT
// ============================================================================

type ResumeElementType = "div";

export type ResumeProps<T extends ResumeElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as whatever element within `ResumeElementType` is allowed */
    as?: T;
  };

export const Resume = setDisplayName(function Resume<
  T extends ResumeElementType,
>(props: ResumeProps<T>) {
  const {
    as: Component = "div",
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
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
});

// ============================================================================
// MEMOIZED RESUME COMPONENT
// ============================================================================

export const MemoizedResume = React.memo(Resume);
