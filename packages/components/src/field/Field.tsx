import React, { useId } from "react";

import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";
import { FieldContext } from "./context";

export type FieldRef = PrimitiveRef<"div">;

export type FieldProps<TAs extends PrimitiveElement = "div"> = PrimitiveProps<
  "div",
  TAs
> & {
  controlId?: string;
  descriptionId?: string;
  errorId?: string;
  invalid?: boolean;
  required?: boolean;
};

const FieldRoot = createHtmlPrimitive("Field", "div");

/** Render an unstyled form field wrapper with shared accessibility ids. */
export const Field = React.forwardRef<FieldRef, FieldProps>((props, ref) => {
  const {
    children,
    controlId,
    descriptionId,
    errorId,
    id,
    invalid,
    required,
    ...rest
  } = props;
  const reactId = useId();
  const fieldId = id ?? `field-${reactId}`;
  const resolvedControlId = controlId ?? `${fieldId}-control`;
  const resolvedDescriptionId = descriptionId ?? `${fieldId}-description`;
  const resolvedErrorId = errorId ?? `${fieldId}-error`;

  return (
    <FieldContext
      value={{
        controlId: resolvedControlId,
        descriptionId: resolvedDescriptionId,
        errorId: resolvedErrorId,
        invalid,
        required,
      }}
    >
      <FieldRoot
        ref={ref}
        aria-invalid={invalid || undefined}
        data-invalid={invalid ? "" : undefined}
        data-required={required ? "" : undefined}
        id={fieldId}
        {...rest}
      >
        {children}
      </FieldRoot>
    </FieldContext>
  );
});

Field.displayName = "Field";
