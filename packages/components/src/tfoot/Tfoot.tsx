import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TfootRef = PrimitiveRef<"tfoot">;
export type TfootProps<TAs extends PrimitiveElement = "tfoot"> = PrimitiveProps<
  "tfoot",
  TAs
>;

/** Render the native <tfoot> HTML element. */
export const Tfoot = createHtmlPrimitive("Tfoot", "tfoot");
