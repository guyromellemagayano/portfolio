import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DelRef = PrimitiveRef<"del">;
export type DelProps<TAs extends PrimitiveElement = "del"> = PrimitiveProps<
  "del",
  TAs
>;

/** Render the native <del> HTML element. */
export const Del = createHtmlPrimitive("Del", "del");
