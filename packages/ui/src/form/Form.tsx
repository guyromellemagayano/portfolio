import React from "react";

import {
  Fieldset as FieldsetPrimitive,
  type FieldsetProps as FieldsetPrimitiveProps,
  type FieldsetRef,
  Form as FormPrimitive,
  type FormProps as FormPrimitiveProps,
  type FormRef,
  Legend as LegendPrimitive,
  type LegendProps as LegendPrimitiveProps,
  type LegendRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type FormProps = FormPrimitiveProps;

export const Form = React.forwardRef<FormRef, FormProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <FormPrimitive
      ref={ref}
      {...rest}
      className={cn("grid gap-6", className)}
      data-slot={getDataSlot(props, "form")}
    />
  );
});

Form.displayName = "Form";

export type FieldsetProps = FieldsetPrimitiveProps;

export const Fieldset = React.forwardRef<FieldsetRef, FieldsetProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <FieldsetPrimitive
        ref={ref}
        {...rest}
        className={cn("grid min-w-0 gap-4 disabled:opacity-50", className)}
        data-slot={getDataSlot(props, "fieldset")}
      />
    );
  }
);

Fieldset.displayName = "Fieldset";

export type LegendProps = LegendPrimitiveProps;

export const Legend = React.forwardRef<LegendRef, LegendProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <LegendPrimitive
      ref={ref}
      {...rest}
      className={cn("mb-3 text-sm leading-none font-semibold", className)}
      data-slot={getDataSlot(props, "legend")}
    />
  );
});

Legend.displayName = "Legend";

export type FormActionsProps = React.ComponentPropsWithoutRef<"div">;

export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <div
        ref={ref}
        {...rest}
        className={cn(
          "flex flex-wrap items-center justify-end gap-2",
          className
        )}
        data-slot={getDataSlot(props, "form-actions")}
      />
    );
  }
);

FormActions.displayName = "FormActions";
