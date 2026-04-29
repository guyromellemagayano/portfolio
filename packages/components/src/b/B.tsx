import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BRef = PrimitiveRef<"b">;
export type BProps<TAs extends PrimitiveElement = "b"> = PrimitiveProps<
  "b",
  TAs
>;

/** Render the native <b> HTML element. */
export const B = createHtmlPrimitive("B", "b");
