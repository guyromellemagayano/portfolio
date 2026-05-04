/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import {
  Div,
  type DivProps,
  type DivRef,
  Span,
  type SpanProps,
  type SpanRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground border-transparent",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeProps = SpanProps & VariantProps<typeof badgeVariants>;

export const Badge = React.forwardRef<SpanRef, BadgeProps>((props, ref) => {
  const { className, variant, ...rest } = props;

  return (
    <Span
      ref={ref}
      {...rest}
      className={cn(badgeVariants({ variant }), className)}
      data-slot={getDataSlot(props, "badge")}
    />
  );
});

Badge.displayName = "Badge";

export type BadgeListProps = DivProps;

export const BadgeList = React.forwardRef<DivRef, BadgeListProps>(
  (props, ref) => {
    const { className, role = "list", ...rest } = props;

    return (
      <Div
        ref={ref}
        role={role}
        {...rest}
        className={cn("flex flex-wrap items-center gap-2", className)}
        data-slot={getDataSlot(props, "badge-list")}
      />
    );
  }
);

BadgeList.displayName = "BadgeList";

export type StatusBadgeProps = BadgeProps & {
  status?: "error" | "info" | "neutral" | "success" | "warning";
};

export const StatusBadge = React.forwardRef<SpanRef, StatusBadgeProps>(
  (props, ref) => {
    const {
      className,
      status = "neutral",
      variant = "outline",
      ...rest
    } = props;

    return (
      <Badge
        ref={ref}
        variant={variant}
        {...rest}
        className={cn(
          status === "error"
            ? "border-destructive/40 text-destructive"
            : undefined,
          status === "info" ? "border-primary/40 text-primary" : undefined,
          status === "success"
            ? "border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
            : undefined,
          status === "warning"
            ? "border-amber-500/40 text-amber-700 dark:text-amber-400"
            : undefined,
          className
        )}
        data-slot={getDataSlot(props, "status-badge")}
        data-status={status}
      />
    );
  }
);

StatusBadge.displayName = "StatusBadge";
