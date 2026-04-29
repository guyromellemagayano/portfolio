import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SRef = PrimitiveRef<"s">;
export type SProps<TAs extends PrimitiveElement = "s"> = PrimitiveProps<
  "s",
  TAs
>;

/** Render the native <s> HTML element. */
export const S = createHtmlPrimitive("S", "s");
