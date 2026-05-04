import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
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

import { StatusMessage, type StatusMessageProps } from "../live-region";
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

export type FormStatusProps = StatusMessageProps;

export const FormStatus = React.forwardRef<
  React.ComponentRef<typeof StatusMessage>,
  FormStatusProps
>((props, ref) => {
  return (
    <StatusMessage
      ref={ref}
      {...props}
      data-slot={getDataSlot(props, "form-status")}
    />
  );
});

FormStatus.displayName = "FormStatus";

export type FormErrorSummaryProps = DivProps & {
  errors?: readonly React.ReactNode[];
  title?: React.ReactNode;
};

export const FormErrorSummary = React.forwardRef<DivRef, FormErrorSummaryProps>(
  (props, ref) => {
    const {
      children,
      className,
      errors,
      role = "alert",
      title = "There is a problem",
      ...rest
    } = props;
    const hasErrors = errors && errors.length > 0;

    return (
      <Div
        ref={ref}
        role={role}
        {...rest}
        className={cn(
          "border-destructive/40 bg-destructive/5 text-destructive rounded-lg border p-4",
          className
        )}
        data-slot={getDataSlot(props, "form-error-summary")}
      >
        <p className="font-medium" data-slot="form-error-summary-title">
          {title}
        </p>
        {hasErrors ? (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errors.map((error) => (
              <li key={getFormErrorKey(error)}>{error}</li>
            ))}
          </ul>
        ) : null}
        {children}
      </Div>
    );
  }
);

FormErrorSummary.displayName = "FormErrorSummary";

function getFormErrorKey(error: React.ReactNode) {
  if (React.isValidElement(error) && error.key !== null) {
    return error.key;
  }

  return String(error);
}
