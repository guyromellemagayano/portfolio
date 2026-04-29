import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type HeadRef = PrimitiveRef<"head">;
export type HeadProps<TAs extends PrimitiveElement = "head"> = PrimitiveProps<
  "head",
  TAs
>;

/** Render the native <head> HTML element. */
export const Head = createHtmlPrimitive("Head", "head");
