import React from "react";

import { useFieldContext } from "../field/context";
import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FieldErrorRef = PrimitiveRef<"p">;
export type FieldErrorProps<TAs extends PrimitiveElement = "p"> =
  PrimitiveProps<"p", TAs>;

const FieldErrorRoot = createHtmlPrimitive("FieldError", "p");

/** Render unstyled field error text wired to the nearest Field error id. */
export const FieldError = React.forwardRef<FieldErrorRef, FieldErrorProps>(
  (props, ref) => {
    const field = useFieldContext();
    const { id = field?.errorId, role = "alert", ...rest } = props;

    return (
      <FieldErrorRoot
        ref={ref}
        data-invalid={field?.invalid ? "" : undefined}
        id={id}
        role={role}
        {...rest}
      />
    );
  }
);

FieldError.displayName = "FieldError";
