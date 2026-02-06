/* eslint-disable simple-import-sort/imports */

/**
 * @file Resume.tsx
 * @author Guy Romelle Magayano
 * @description Resume component for the web application.
 */

"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  useMemo,
} from "react";

import { useTranslations } from "next-intl";
import Image, { type ImageProps } from "next/image";

import { Button, type ButtonProps } from "@web/components/button";
import { Icon } from "@web/components/icon";
import {
  List,
  ListElementType,
  ListItem,
  ListItemElementType,
  type ListItemProps,
  type ListProps,
} from "@web/components/list";
import logoAirbnb from "@web/images/logos/airbnb.svg";
import logoFacebook from "@web/images/logos/facebook.svg";
import logoPlanetaria from "@web/images/logos/planetaria.svg";
import logoStarbucks from "@web/images/logos/starbucks.svg";
import { cn, getRoleItemKey, parseRoleDate } from "@web/utils/helpers";

// ============================================================================
// RESUME COMPONENT DATA
// ============================================================================

interface Role {
  company: string;
  title: string;
  logo: ImageProps["src"];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
}

const RESUME_DATA: Array<Role> = [
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

const RESUME_FILE_NAME: string = "/resume.pdf";

// ============================================================================
// RESUME DOWNLOAD BUTTON COMPONENT
// ============================================================================

export type ResumeDownloadButtonElementType = typeof Button;
export type ResumeDownloadButtonProps<P extends Record<string, unknown> = {}> =
  Omit<ComponentPropsWithRef<ResumeDownloadButtonElementType>, "as"> &
    P & {
      as?: ResumeDownloadButtonElementType;
      className?: ButtonProps<P>["className"];
      variant?: ButtonProps<P>["variant"];
      isDisabled?: boolean;
    };

export function ResumeDownloadButton<P extends Record<string, unknown> = {}>(
  props: ResumeDownloadButtonProps<P>
) {
  const {
    as: Component = Button,
    className,
    isDisabled = false,
    variant = "primary",
    ...rest
  } = props;

  // Internationalization
  const tLabels = useTranslations("resume.labels");

  // Resume download button ARIA
  const RESUME_DOWNLOAD_BUTTON_I18N = useMemo(
    () => ({
      downloadCV: tLabels("downloadCV"),
    }),
    [tLabels]
  );

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ResumeDownloadButtonElementType>)}
      variant={variant}
      href={RESUME_FILE_NAME}
      isDisabled={isDisabled}
      className={cn("group mt-6 w-full gap-x-1.5 px-6 py-3", className)}
    >
      {RESUME_DOWNLOAD_BUTTON_I18N.downloadCV}
      <Icon
        name="arrow-down"
        className={cn(
          "h-4 w-4",
          isDisabled && "opacity-45",
          variant === "primary"
            ? "stroke-zinc-50 dark:stroke-zinc-900"
            : "stroke-zinc-900 dark:stroke-zinc-50"
        )}
        aria-hidden
      />
    </Component>
  );
}

ResumeDownloadButton.displayName = "ResumeDownloadButton";

// ============================================================================
// RESUME ROLE LIST COMPONENT
// ============================================================================

export type ResumeRoleListProps<P extends Record<string, unknown> = {}> =
  ListProps<P> & P & {};

export function ResumeRoleList<P extends Record<string, unknown> = {}>(
  props: ResumeRoleListProps<P>
) {
  const { as: Component = List, className, ...rest } = props;

  if (!RESUME_DATA.length) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListElementType>)}
      className={cn("mt-6 space-y-4", className)}
    >
      {RESUME_DATA.map((role, index) => (
        <ResumeRoleListItem key={getRoleItemKey(role, index)} roleData={role} />
      ))}
    </Component>
  );
}

ResumeRoleList.displayName = "ResumeRoleList";

// ============================================================================
// RESUME ROLE LIST ITEM COMPONENT
// ============================================================================

export type ResumeRoleListItemProps<P extends Record<string, unknown> = {}> =
  ListItemProps<P> &
    P & {
      roleData: Role;
    };

export function ResumeRoleListItem<P extends Record<string, unknown> = {}>(
  props: ResumeRoleListItemProps<P>
) {
  const { as: Component = ListItem, roleData, className, ...rest } = props;

  // Internationalization
  const tLabels = useTranslations("resume.labels");

  // Resume role list item ARIA
  const RESUME_ROLE_LIST_ITEM_I18N = useMemo(
    () => ({
      company: tLabels("company"),
      role: tLabels("role"),
      date: tLabels("date"),
    }),
    [tLabels]
  );

  const { label: startLabel, dateTime: startDate } = parseRoleDate(
    roleData.start
  );
  const { label: endLabel, dateTime: endDate } = parseRoleDate(roleData.end);

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListItemElementType>)}
      className={cn("flex gap-4", className)}
    >
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={roleData.logo}
          alt={roleData.company}
          className="h-7 w-7"
          unoptimized
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">{RESUME_ROLE_LIST_ITEM_I18N.company}</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <span>{roleData.company}</span>
        </dd>
        <dt className="sr-only">{RESUME_ROLE_LIST_ITEM_I18N.role}</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          <span>{roleData.title}</span>
        </dd>
        <dt className="sr-only">{RESUME_ROLE_LIST_ITEM_I18N.date}</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{" "}
          <span aria-hidden="true">—</span>{" "}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </Component>
  );
}

ResumeRoleListItem.displayName = "ResumeRoleListItem";

// ============================================================================
// RESUME TITLE COMPONENT
// ============================================================================

export type ResumeTitleElementType = "h2" | "h3";
export type ResumeTitleProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<ResumeTitleElementType>,
  "as"
> &
  P & {
    as?: ResumeTitleElementType;
  };

export function ResumeTitle<P extends Record<string, unknown> = {}>(
  props: ResumeTitleProps<P>
) {
  const { as: Component = "h2", className, ...rest } = props;

  // Internationalization
  const tLabels = useTranslations("resume.labels");

  // Resume title ARIA
  const RESUME_TITLE_I18N = useMemo(
    () => ({
      work: tLabels("work"),
    }),
    [tLabels]
  );

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ResumeTitleElementType>)}
      className={cn(
        "flex text-sm font-semibold text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      <Icon name="briefcase" className="h-6 w-6 flex-none" aria-hidden />
      <span className="ml-3">{RESUME_TITLE_I18N.work}</span>
    </Component>
  );
}

ResumeTitle.displayName = "ResumeTitle";

// ============================================================================
// MAIN RESUME COMPONENT
// ============================================================================

export type ResumeElementType = "div" | "section" | "article";
export type ResumeProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<ResumeElementType>,
  "as"
> &
  P & {
    as?: ResumeElementType;
  };

export function Resume<P extends Record<string, unknown> = {}>(
  props: ResumeProps<P>
) {
  const { as: Component = "div", className, ...rest } = props;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ResumeElementType>)}
      className={cn(
        "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
        className
      )}
    >
      <ResumeTitle />
      <ResumeRoleList />
      <ResumeDownloadButton />
    </Component>
  );
}

Resume.displayName = "Resume";
