import React from "react";

import { useFieldContext } from "../field/context";
import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FieldLabelRef = PrimitiveRef<"label">;
export type FieldLabelProps<TAs extends PrimitiveElement = "label"> =
  PrimitiveProps<"label", TAs>;

const FieldLabelRoot = createHtmlPrimitive("FieldLabel", "label");

/** Render an unstyled label wired to the nearest Field control id. */
export const FieldLabel = React.forwardRef<FieldLabelRef, FieldLabelProps>(
  (props, ref) => {
    const field = useFieldContext();
    const { htmlFor = field?.controlId, id = field?.labelId, ...rest } = props;

    return (
      <FieldLabelRoot
        ref={ref}
        data-required={field?.required ? "" : undefined}
        htmlFor={htmlFor}
        id={id}
        {...rest}
      />
    );
  }
);

FieldLabel.displayName = "FieldLabel";
