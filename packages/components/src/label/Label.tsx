import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type LabelRef = PrimitiveRef<"label">;
export type LabelProps<TAs extends PrimitiveElement = "label"> = PrimitiveProps<
  "label",
  TAs
>;

/** Render the native <label> HTML element. */
export const Label = createHtmlPrimitive("Label", "label");
