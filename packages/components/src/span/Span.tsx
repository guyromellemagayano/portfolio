import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SpanRef = PrimitiveRef<"span">;
export type SpanProps<TAs extends PrimitiveElement = "span"> = PrimitiveProps<
  "span",
  TAs
>;

/** Render the native <span> HTML element. */
export const Span = createHtmlPrimitive("Span", "span");
