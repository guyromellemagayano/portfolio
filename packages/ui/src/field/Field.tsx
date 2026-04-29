import React from "react";

import {
  Field as FieldPrimitive,
  FieldDescription as FieldDescriptionPrimitive,
  type FieldDescriptionProps as FieldDescriptionPrimitiveProps,
  type FieldDescriptionRef,
  FieldError as FieldErrorPrimitive,
  type FieldErrorProps as FieldErrorPrimitiveProps,
  type FieldErrorRef,
  FieldLabel as FieldLabelPrimitive,
  type FieldLabelProps as FieldLabelPrimitiveProps,
  type FieldLabelRef,
  type FieldProps as FieldPrimitiveProps,
  type FieldRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type FieldProps = FieldPrimitiveProps;

export const Field = React.forwardRef<FieldRef, FieldProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <FieldPrimitive
      ref={ref}
      {...rest}
      className={cn("grid gap-2", className)}
      data-slot={getDataSlot(props, "field")}
    />
  );
});

Field.displayName = "Field";

export type FieldLabelProps = FieldLabelPrimitiveProps;

export const FieldLabel = React.forwardRef<FieldLabelRef, FieldLabelProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <FieldLabelPrimitive
        ref={ref}
        {...rest}
        className={cn("text-sm leading-none font-medium", className)}
        data-slot={getDataSlot(props, "field-label")}
      />
    );
  }
);

FieldLabel.displayName = "FieldLabel";

export type FieldDescriptionProps = FieldDescriptionPrimitiveProps;

export const FieldDescription = React.forwardRef<
  FieldDescriptionRef,
  FieldDescriptionProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <FieldDescriptionPrimitive
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "field-description")}
    />
  );
});

FieldDescription.displayName = "FieldDescription";

export type FieldErrorProps = FieldErrorPrimitiveProps;

export const FieldError = React.forwardRef<FieldErrorRef, FieldErrorProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <FieldErrorPrimitive
        ref={ref}
        {...rest}
        className={cn("text-destructive text-sm font-medium", className)}
        data-slot={getDataSlot(props, "field-error")}
      />
    );
  }
);

FieldError.displayName = "FieldError";
