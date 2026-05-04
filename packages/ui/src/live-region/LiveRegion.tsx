/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import {
  Div,
  type DivProps,
  type DivRef,
  P,
  type PProps,
  type PRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type LiveRegionPoliteness = "assertive" | "off" | "polite";
export type LiveRegionRole = "alert" | "log" | "status";

function getLiveRegionPoliteness(
  role: LiveRegionRole,
  politeness: LiveRegionPoliteness | undefined
) {
  if (politeness) {
    return politeness;
  }

  return role === "alert" ? "assertive" : "polite";
}

export type LiveRegionProps = DivProps & {
  atomic?: boolean;
  politeness?: LiveRegionPoliteness;
  role?: LiveRegionRole;
  visuallyHidden?: boolean;
};

export const LiveRegion = React.forwardRef<DivRef, LiveRegionProps>(
  (props, ref) => {
    const {
      "aria-atomic": ariaAtomic,
      "aria-live": ariaLive,
      atomic = true,
      className,
      politeness,
      role = "status",
      visuallyHidden,
      ...rest
    } = props;

    return (
      <Div
        ref={ref}
        role={role}
        {...rest}
        aria-atomic={ariaAtomic ?? atomic}
        aria-live={ariaLive ?? getLiveRegionPoliteness(role, politeness)}
        className={cn(visuallyHidden ? "sr-only" : undefined, className)}
        data-slot={getDataSlot(props, "live-region")}
      />
    );
  }
);

LiveRegion.displayName = "LiveRegion";

export const statusMessageVariants = cva("text-sm", {
  variants: {
    intent: {
      error: "text-destructive",
      info: "text-primary",
      loading: "text-muted-foreground",
      neutral: "text-muted-foreground",
      success: "text-emerald-700 dark:text-emerald-400",
      warning: "text-amber-700 dark:text-amber-400",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
});

type StatusMessageVariantProps = VariantProps<typeof statusMessageVariants>;
export type StatusMessageIntent = NonNullable<
  StatusMessageVariantProps["intent"]
>;

function getStatusMessageRole(
  intent: StatusMessageIntent,
  role: LiveRegionRole | undefined
) {
  return role ?? (intent === "error" ? "alert" : "status");
}

export type StatusMessageProps = PProps &
  StatusMessageVariantProps & {
    atomic?: boolean;
    politeness?: LiveRegionPoliteness;
    role?: LiveRegionRole;
  };

export const StatusMessage = React.forwardRef<PRef, StatusMessageProps>(
  (props, ref) => {
    const {
      "aria-atomic": ariaAtomic,
      "aria-busy": ariaBusy,
      "aria-live": ariaLive,
      atomic = true,
      className,
      intent = "neutral",
      politeness,
      role,
      ...rest
    } = props;
    const resolvedIntent = intent ?? "neutral";
    const resolvedRole = getStatusMessageRole(resolvedIntent, role);

    return (
      <P
        ref={ref}
        role={resolvedRole}
        {...rest}
        aria-atomic={ariaAtomic ?? atomic}
        aria-busy={resolvedIntent === "loading" ? true : ariaBusy}
        aria-live={
          ariaLive ?? getLiveRegionPoliteness(resolvedRole, politeness)
        }
        className={cn(
          statusMessageVariants({ intent: resolvedIntent }),
          className
        )}
        data-intent={resolvedIntent}
        data-slot={getDataSlot(props, "status-message")}
      />
    );
  }
);

StatusMessage.displayName = "StatusMessage";
