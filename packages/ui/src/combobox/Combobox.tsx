import React from "react";

import { Div, type DivProps, type DivRef } from "@portfolio/components";

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

export type ComboboxOption = {
  description?: React.ReactNode;
  disabled?: boolean;
  label: React.ReactNode;
  searchText?: string;
  value: string;
};

export type ComboboxProps = Omit<DivProps, "onChange"> & {
  defaultValue?: string;
  emptyMessage?: React.ReactNode;
  inputProps?: Omit<InputProps, "role" | "value">;
  listProps?: React.HTMLAttributes<HTMLUListElement>;
  onValueChange?: (value: string) => void;
  options: readonly ComboboxOption[];
  placeholder?: string;
  value?: string;
};

function getOptionText(option: ComboboxOption) {
  return option.searchText ?? String(option.label);
}

export const Combobox = React.forwardRef<DivRef, ComboboxProps>(
  (props, ref) => {
    const {
      className,
      defaultValue,
      emptyMessage = "No results.",
      inputProps,
      listProps,
      onValueChange,
      options,
      placeholder,
      value,
      ...rest
    } = props;
    const reactId = React.useId();
    const listboxId = inputProps?.["aria-controls"] ?? `combobox-${reactId}`;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ""
    );
    const [query, setQuery] = React.useState("");
    const resolvedValue = isControlled ? value : internalValue;
    const selectedOption = options.find(
      (option) => option.value === resolvedValue
    );
    const filteredOptions = options.filter((option) =>
      getOptionText(option).toLowerCase().includes(query.toLowerCase())
    );

    function selectOption(option: ComboboxOption) {
      if (option.disabled) {
        return;
      }

      if (!isControlled) {
        setInternalValue(option.value);
      }

      setQuery(getOptionText(option));
      onValueChange?.(option.value);
    }

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("grid gap-2", className)}
        data-slot={getDataSlot(props, "combobox")}
      >
        <Input
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded="true"
          placeholder={placeholder}
          role="combobox"
          {...inputProps}
          data-slot={getDataSlot(inputProps ?? {}, "combobox-input")}
          value={
            query || getOptionText(selectedOption ?? { label: "", value: "" })
          }
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            inputProps?.onChange?.(event);
          }}
        />
        <ul
          id={listboxId}
          role="listbox"
          {...listProps}
          className={cn(
            "bg-popover text-popover-foreground max-h-60 overflow-auto rounded-md border p-1 shadow-sm",
            listProps?.className
          )}
          data-slot={getDataSlot(listProps ?? {}, "combobox-listbox")}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                aria-disabled={option.disabled ? true : undefined}
                aria-selected={option.value === resolvedValue}
                className={cn(
                  "focus:bg-accent focus:text-accent-foreground cursor-default rounded-sm px-2 py-1.5 text-sm outline-none",
                  option.disabled ? "opacity-50" : undefined
                )}
                data-slot="combobox-option"
                onClick={() => selectOption(option)}
                role="option"
              >
                <span>{option.label}</span>
                {option.description ? (
                  <span className="text-muted-foreground block text-xs">
                    {option.description}
                  </span>
                ) : null}
              </li>
            ))
          ) : (
            <li className="text-muted-foreground px-2 py-1.5 text-sm">
              {emptyMessage}
            </li>
          )}
        </ul>
      </Div>
    );
  }
);

Combobox.displayName = "Combobox";

export type ComboboxFieldProps = Omit<FieldProps, "children"> & {
  comboboxProps: ComboboxProps;
  description?: React.ReactNode;
  descriptionProps?: FieldDescriptionProps;
  error?: React.ReactNode;
  errorProps?: FieldErrorProps;
  label: React.ReactNode;
  labelProps?: FieldLabelProps;
};

export const ComboboxField = React.forwardRef<
  React.ComponentRef<typeof Field>,
  ComboboxFieldProps
>((props, ref) => {
  const {
    className,
    comboboxProps,
    description,
    descriptionProps,
    error,
    errorProps,
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
      data-slot={getDataSlot(props, "combobox-field")}
      invalid={invalid ?? (hasError ? true : undefined)}
    >
      <FieldLabel {...labelProps}>{label}</FieldLabel>
      <Combobox {...comboboxProps} />
      {description !== undefined && description !== null ? (
        <FieldDescription {...descriptionProps}>{description}</FieldDescription>
      ) : null}
      {hasError ? <FieldError {...errorProps}>{error}</FieldError> : null}
    </Field>
  );
});

ComboboxField.displayName = "ComboboxField";
