/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

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

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>((props, ref) => {
  const { children, className, ...rest } = props;
  const controlProps = useFieldControlProps(rest, { nativeRequired: false });

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      {...controlProps}
      className={cn(
        "border-input bg-background focus-visible:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot={getDataSlot(props, "select-trigger")}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown aria-hidden="true" className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>((props, ref) => {
  const { className, position = "popper", ...rest } = props;

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        {...rest}
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-md border shadow-md",
          className
        )}
        data-slot={getDataSlot(props, "select-content")}
      />
    </SelectPrimitive.Portal>
  );
});

SelectContent.displayName = "SelectContent";

export const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.Label
      ref={ref}
      {...rest}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      data-slot={getDataSlot(props, "select-label")}
    />
  );
});

SelectLabel.displayName = "SelectLabel";

export const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <SelectPrimitive.Item
      ref={ref}
      {...rest}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      data-slot={getDataSlot(props, "select-item")}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check aria-hidden="true" className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "SelectItem";

export const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.Separator
      ref={ref}
      {...rest}
      className={cn("bg-muted -mx-1 my-1 h-px", className)}
      data-slot={getDataSlot(props, "select-separator")}
    />
  );
});

SelectSeparator.displayName = "SelectSeparator";

export type SelectFieldProps = Omit<FieldProps, "children"> & {
  children: React.ReactNode;
  contentProps?: Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    "children"
  >;
  description?: React.ReactNode;
  descriptionProps?: FieldDescriptionProps;
  error?: React.ReactNode;
  errorProps?: FieldErrorProps;
  label: React.ReactNode;
  labelProps?: FieldLabelProps;
  placeholder?: React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.Value
  >["placeholder"];
  selectProps?: Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    "children"
  >;
  triggerProps?: Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    "children"
  >;
  valueProps?: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;
};

export const SelectField = React.forwardRef<
  React.ComponentRef<typeof Field>,
  SelectFieldProps
>((props, ref) => {
  const {
    children,
    className,
    contentProps,
    description,
    descriptionProps,
    error,
    errorProps,
    invalid,
    label,
    labelProps,
    placeholder,
    selectProps,
    triggerProps,
    valueProps,
    ...fieldProps
  } = props;
  const hasError = error !== undefined && error !== null;

  return (
    <Field
      ref={ref}
      {...fieldProps}
      className={cn("gap-2", className)}
      data-slot={getDataSlot(props, "select-field")}
      invalid={invalid ?? (hasError ? true : undefined)}
    >
      <FieldLabel {...labelProps}>{label}</FieldLabel>
      <Select {...selectProps}>
        <SelectTrigger {...triggerProps}>
          <SelectValue
            {...valueProps}
            placeholder={valueProps?.placeholder ?? placeholder}
          />
        </SelectTrigger>
        <SelectContent {...contentProps}>{children}</SelectContent>
      </Select>
      {description !== undefined && description !== null ? (
        <FieldDescription {...descriptionProps}>{description}</FieldDescription>
      ) : null}
      {hasError ? <FieldError {...errorProps}>{error}</FieldError> : null}
    </Field>
  );
});

SelectField.displayName = "SelectField";
