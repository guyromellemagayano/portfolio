import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type AbbrRef = PrimitiveRef<"abbr">;
export type AbbrProps<TAs extends PrimitiveElement = "abbr"> = PrimitiveProps<
  "abbr",
  TAs
>;

/** Render the native <abbr> HTML element. */
export const Abbr = createHtmlPrimitive("Abbr", "abbr");
