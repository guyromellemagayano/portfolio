import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
  P,
  type PProps,
  type PRef,
  Span,
  type SpanProps,
  type SpanRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type StatGroupProps = DivProps;
export type StatLabelProps = PProps;
export type StatValueProps = SpanProps;
export type StatDescriptionProps = PProps;

export type StatProps = DivProps & {
  description?: React.ReactNode;
  descriptionProps?: StatDescriptionProps;
  label?: React.ReactNode;
  labelProps?: StatLabelProps;
  value?: React.ReactNode;
  valueProps?: StatValueProps;
};

function hasRenderableContent(value: React.ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

export const StatGroup = React.forwardRef<DivRef, StatGroupProps>(
  (props, ref) => {
    const { className, role = "list", ...rest } = props;

    return (
      <Div
        ref={ref}
        role={role}
        {...rest}
        className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
        data-slot={getDataSlot(props, "stat-group")}
      />
    );
  }
);

StatGroup.displayName = "StatGroup";

export const Stat = React.forwardRef<DivRef, StatProps>((props, ref) => {
  const {
    children,
    className,
    description,
    descriptionProps,
    label,
    labelProps,
    role = "listitem",
    value,
    valueProps,
    ...rest
  } = props;
  const hasLabel = hasRenderableContent(label);
  const hasValue = hasRenderableContent(value);
  const hasDescription = hasRenderableContent(description);

  return (
    <Div
      ref={ref}
      role={role}
      {...rest}
      className={cn("space-y-1", className)}
      data-slot={getDataSlot(props, "stat")}
    >
      {hasLabel ? <StatLabel {...labelProps}>{label}</StatLabel> : null}
      {hasValue ? <StatValue {...valueProps}>{value}</StatValue> : null}
      {hasDescription ? (
        <StatDescription {...descriptionProps}>{description}</StatDescription>
      ) : null}
      {children}
    </Div>
  );
});

Stat.displayName = "Stat";

export const StatLabel = React.forwardRef<PRef, StatLabelProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <P
        ref={ref}
        {...rest}
        className={cn("text-muted-foreground text-sm", className)}
        data-slot={getDataSlot(props, "stat-label")}
      />
    );
  }
);

StatLabel.displayName = "StatLabel";

export const StatValue = React.forwardRef<SpanRef, StatValueProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Span
        ref={ref}
        {...rest}
        className={cn("text-3xl font-semibold tracking-normal", className)}
        data-slot={getDataSlot(props, "stat-value")}
      />
    );
  }
);

StatValue.displayName = "StatValue";

export const StatDescription = React.forwardRef<PRef, StatDescriptionProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <P
        ref={ref}
        {...rest}
        className={cn("text-muted-foreground text-sm leading-6", className)}
        data-slot={getDataSlot(props, "stat-description")}
      />
    );
  }
);

StatDescription.displayName = "StatDescription";
