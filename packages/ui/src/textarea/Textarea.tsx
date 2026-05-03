import React from "react";

import {
  Textarea as TextareaPrimitive,
  type TextareaProps as TextareaPrimitiveProps,
  type TextareaRef,
} from "@portfolio/components";

import {
  Field,
  FieldDescription,
  type FieldDescriptionProps,
  FieldError,
  type FieldErrorProps,
  FieldLabel,
  type FieldLabelProps,
  type FieldProps,
} from "../field";
import { cn, getDataSlot } from "../utils";

export type TextareaProps = TextareaPrimitiveProps;

export const Textarea = React.forwardRef<TextareaRef, TextareaProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <TextareaPrimitive
        ref={ref}
        {...rest}
        className={cn(
          "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        data-slot={getDataSlot(props, "textarea")}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export type TextareaFieldProps = Omit<FieldProps, "children"> & {
  description?: React.ReactNode;
  descriptionProps?: FieldDescriptionProps;
  error?: React.ReactNode;
  errorProps?: FieldErrorProps;
  label: React.ReactNode;
  labelProps?: FieldLabelProps;
  textareaProps?: TextareaProps;
};

export const TextareaField = React.forwardRef<
  React.ComponentRef<typeof Field>,
  TextareaFieldProps
>((props, ref) => {
  const {
    className,
    description,
    descriptionProps,
    error,
    errorProps,
    invalid,
    label,
    labelProps,
    textareaProps,
    ...fieldProps
  } = props;
  const hasError = error !== undefined && error !== null;

  return (
    <Field
      ref={ref}
      {...fieldProps}
      className={cn("gap-2", className)}
      data-slot={getDataSlot(props, "textarea-field")}
      invalid={invalid ?? (hasError ? true : undefined)}
    >
      <FieldLabel {...labelProps}>{label}</FieldLabel>
      <Textarea {...textareaProps} />
      {description !== undefined && description !== null ? (
        <FieldDescription {...descriptionProps}>{description}</FieldDescription>
      ) : null}
      {hasError ? <FieldError {...errorProps}>{error}</FieldError> : null}
    </Field>
  );
});

TextareaField.displayName = "TextareaField";
