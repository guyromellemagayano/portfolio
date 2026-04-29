import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type MarkRef = PrimitiveRef<"mark">;
export type MarkProps<TAs extends PrimitiveElement = "mark"> = PrimitiveProps<
  "mark",
  TAs
>;

/** Render the native <mark> HTML element. */
export const Mark = createHtmlPrimitive("Mark", "mark");
