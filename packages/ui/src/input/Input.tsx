import React from "react";

import {
  Input as InputPrimitive,
  type InputProps as InputPrimitiveProps,
  type InputRef,
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

export type InputProps = InputPrimitiveProps;

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { className, type, ...rest } = props;

  return (
    <InputPrimitive
      ref={ref}
      type={type}
      {...rest}
      className={cn(
        "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot={getDataSlot(props, "input")}
    />
  );
});

Input.displayName = "Input";

export type InputFieldProps = Omit<FieldProps, "children"> & {
  description?: React.ReactNode;
  descriptionProps?: FieldDescriptionProps;
  error?: React.ReactNode;
  errorProps?: FieldErrorProps;
  inputProps?: InputProps;
  label: React.ReactNode;
  labelProps?: FieldLabelProps;
};

export const InputField = React.forwardRef<
  React.ComponentRef<typeof Field>,
  InputFieldProps
>((props, ref) => {
  const {
    className,
    description,
    descriptionProps,
    error,
    errorProps,
    inputProps,
    invalid,
    label,
    labelProps,
    ...fieldProps
  } = props;
  const hasError = error !== undefined && error !== null;

  return (
    <Field
      ref={ref}
      {...fieldProps}
      className={cn("gap-2", className)}
      data-slot={getDataSlot(props, "input-field")}
      invalid={invalid ?? (hasError ? true : undefined)}
    >
      <FieldLabel {...labelProps}>{label}</FieldLabel>
      <Input {...inputProps} />
      {description !== undefined && description !== null ? (
        <FieldDescription {...descriptionProps}>{description}</FieldDescription>
      ) : null}
      {hasError ? <FieldError {...errorProps}>{error}</FieldError> : null}
    </Field>
  );
});

InputField.displayName = "InputField";
