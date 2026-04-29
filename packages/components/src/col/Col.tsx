import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ColRef = PrimitiveRef<"col">;
export type ColProps<TAs extends PrimitiveElement = "col"> = PrimitiveProps<
  "col",
  TAs
>;

/** Render the native <col> HTML element. */
export const Col = createHtmlPrimitive("Col", "col");
