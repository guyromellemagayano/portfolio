import React from "react";

import { Switch as SwitchPrimitive } from "radix-ui";

import { useFieldControlProps } from "@portfolio/components";

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

export type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
>;

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const controlProps = useFieldControlProps(rest, {
    includeLabel: true,
    nativeRequired: false,
  });

  return (
    <SwitchPrimitive.Root
      ref={ref}
      {...controlProps}
      className={cn(
        "focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot={getDataSlot(props, "switch")}
    >
      {children ?? (
        <SwitchPrimitive.Thumb
          className="bg-background pointer-events-none block size-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          data-slot="switch-thumb"
        />
      )}
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";

export type SwitchFieldProps = Omit<FieldProps, "children"> & {
  description?: React.ReactNode;
  descriptionProps?: FieldDescriptionProps;
  error?: React.ReactNode;
  errorProps?: FieldErrorProps;
  label: React.ReactNode;
  labelProps?: FieldLabelProps;
  switchProps?: SwitchProps;
};

export const SwitchField = React.forwardRef<
  React.ComponentRef<typeof Field>,
  SwitchFieldProps
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
    switchProps,
    ...fieldProps
  } = props;
  const hasError = error !== undefined && error !== null;

  return (
    <Field
      ref={ref}
      {...fieldProps}
      className={cn("gap-2", className)}
      data-slot={getDataSlot(props, "switch-field")}
      invalid={invalid ?? (hasError ? true : undefined)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-1">
          <FieldLabel {...labelProps}>{label}</FieldLabel>
          {description !== undefined && description !== null ? (
            <FieldDescription {...descriptionProps}>
              {description}
            </FieldDescription>
          ) : null}
        </div>
        <Switch {...switchProps} />
      </div>
      {hasError ? <FieldError {...errorProps}>{error}</FieldError> : null}
    </Field>
  );
});

SwitchField.displayName = "SwitchField";
