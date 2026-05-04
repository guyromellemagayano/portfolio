import React from "react";

import { X } from "lucide-react";

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
import { Input, type InputProps } from "../input";
import { cn, getDataSlot } from "../utils";
import { VisuallyHidden } from "../visually-hidden";

export type SearchInputProps = InputProps & {
  clearLabel?: string;
  onClear?: () => void;
  showClear?: boolean;
};

export const SearchInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  SearchInputProps
>((props, ref) => {
  const {
    className,
    clearLabel = "Clear search",
    onClear,
    showClear,
    type = "search",
    value,
    ...rest
  } = props;
  const hasValue =
    typeof value === "number" ||
    (typeof value === "string" && value.length > 0);
  const shouldShowClear = showClear ?? Boolean(onClear && hasValue);

  return (
    <div className="relative" data-slot="search-input-wrapper">
      <Input
        ref={ref}
        type={type}
        value={value}
        {...rest}
        className={cn(shouldShowClear ? "pr-10" : undefined, className)}
        data-slot={getDataSlot(props, "search-input")}
      />
      {shouldShowClear ? (
        <button
          aria-label={clearLabel}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded focus-visible:ring-2 focus-visible:outline-none"
          data-slot="search-input-clear"
          onClick={onClear}
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
          <VisuallyHidden>{clearLabel}</VisuallyHidden>
        </button>
      ) : null}
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export type SearchFieldProps = Omit<FieldProps, "children"> & {
  description?: React.ReactNode;
  descriptionProps?: FieldDescriptionProps;
  error?: React.ReactNode;
  errorProps?: FieldErrorProps;
  inputProps?: SearchInputProps;
  label: React.ReactNode;
  labelProps?: FieldLabelProps;
};

export const SearchField = React.forwardRef<
  React.ComponentRef<typeof Field>,
  SearchFieldProps
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
      data-slot={getDataSlot(props, "search-field")}
      invalid={invalid ?? (hasError ? true : undefined)}
    >
      <FieldLabel {...labelProps}>{label}</FieldLabel>
      <SearchInput {...inputProps} />
      {description !== undefined && description !== null ? (
        <FieldDescription {...descriptionProps}>{description}</FieldDescription>
      ) : null}
      {hasError ? <FieldError {...errorProps}>{error}</FieldError> : null}
    </Field>
  );
});

SearchField.displayName = "SearchField";
