/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import {
  Div,
  type DivProps,
  type DivRef,
  Heading,
  type HeadingProps,
  type HeadingRef,
  P,
  type PProps,
  type PRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export const calloutVariants = cva("rounded-lg border p-4", {
  variants: {
    intent: {
      error: "border-destructive/50 bg-destructive/5 text-destructive",
      info: "border-primary/20 bg-primary/5 text-foreground",
      neutral: "bg-muted/50 text-foreground",
      success:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
      warning:
        "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
});

export type CalloutIntent = NonNullable<
  VariantProps<typeof calloutVariants>["intent"]
>;
export type CalloutIconProps = DivProps;
export type CalloutTitleProps = HeadingProps;
export type CalloutDescriptionProps = PProps;
export type CalloutActionsProps = DivProps;

export type CalloutProps = Omit<DivProps, "title"> &
  VariantProps<typeof calloutVariants> & {
    actions?: React.ReactNode;
    actionsProps?: CalloutActionsProps;
    description?: React.ReactNode;
    descriptionProps?: CalloutDescriptionProps;
    icon?: React.ReactNode;
    iconProps?: CalloutIconProps;
    title?: React.ReactNode;
    titleProps?: CalloutTitleProps;
  };

function hasRenderableContent(value: React.ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

export const Callout = React.forwardRef<DivRef, CalloutProps>((props, ref) => {
  const {
    actions,
    actionsProps,
    children,
    className,
    description,
    descriptionProps,
    icon,
    iconProps,
    intent,
    role = intent === "error" ? "alert" : "note",
    title,
    titleProps,
    ...rest
  } = props;
  const hasIcon = hasRenderableContent(icon);
  const hasTitle = hasRenderableContent(title);
  const hasDescription = hasRenderableContent(description);
  const hasActions = hasRenderableContent(actions);

  return (
    <Div
      ref={ref}
      role={role}
      {...rest}
      className={cn(calloutVariants({ intent }), className)}
      data-intent={intent ?? "neutral"}
      data-slot={getDataSlot(props, "callout")}
    >
      <Div className="flex gap-3" data-slot="callout-layout">
        {hasIcon ? <CalloutIcon {...iconProps}>{icon}</CalloutIcon> : null}
        <Div className="min-w-0 flex-1 space-y-2" data-slot="callout-content">
          {hasTitle ? (
            <CalloutTitle {...titleProps}>{title}</CalloutTitle>
          ) : null}
          {hasDescription ? (
            <CalloutDescription {...descriptionProps}>
              {description}
            </CalloutDescription>
          ) : null}
          {children}
          {hasActions ? (
            <CalloutActions {...actionsProps}>{actions}</CalloutActions>
          ) : null}
        </Div>
      </Div>
    </Div>
  );
});

Callout.displayName = "Callout";

export const CalloutIcon = React.forwardRef<DivRef, CalloutIconProps>(
  (props, ref) => {
    const { "aria-hidden": ariaHidden = true, className, ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-hidden={ariaHidden}
        {...rest}
        className={cn("mt-0.5 shrink-0", className)}
        data-slot={getDataSlot(props, "callout-icon")}
      />
    );
  }
);

CalloutIcon.displayName = "CalloutIcon";

export const CalloutTitle = React.forwardRef<HeadingRef, CalloutTitleProps>(
  (props, ref) => {
    const { as = "h3", className, ...rest } = props;

    return (
      <Heading
        ref={ref}
        as={as}
        {...rest}
        className={cn("leading-tight font-semibold tracking-normal", className)}
        data-slot={getDataSlot(props, "callout-title")}
      />
    );
  }
);

CalloutTitle.displayName = "CalloutTitle";

export const CalloutDescription = React.forwardRef<
  PRef,
  CalloutDescriptionProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <P
      ref={ref}
      {...rest}
      className={cn("text-sm leading-6", className)}
      data-slot={getDataSlot(props, "callout-description")}
    />
  );
});

CalloutDescription.displayName = "CalloutDescription";

export const CalloutActions = React.forwardRef<DivRef, CalloutActionsProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("flex flex-wrap items-center gap-2 pt-1", className)}
        data-slot={getDataSlot(props, "callout-actions")}
      />
    );
  }
);

CalloutActions.displayName = "CalloutActions";
