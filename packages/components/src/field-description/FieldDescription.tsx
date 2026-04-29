import React from "react";

import { useFieldContext } from "../field/context";
import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FieldDescriptionRef = PrimitiveRef<"p">;
export type FieldDescriptionProps<TAs extends PrimitiveElement = "p"> =
  PrimitiveProps<"p", TAs>;

const FieldDescriptionRoot = createHtmlPrimitive("FieldDescription", "p");

/** Render unstyled helper text wired to the nearest Field description id. */
export const FieldDescription = React.forwardRef<
  FieldDescriptionRef,
  FieldDescriptionProps
>((props, ref) => {
  const field = useFieldContext();
  const { id = field?.descriptionId, ...rest } = props;

  return <FieldDescriptionRoot ref={ref} id={id} {...rest} />;
});

FieldDescription.displayName = "FieldDescription";
