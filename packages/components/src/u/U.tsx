import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type URef = PrimitiveRef<"u">;
export type UProps<TAs extends PrimitiveElement = "u"> = PrimitiveProps<
  "u",
  TAs
>;

/** Render the native <u> HTML element. */
export const U = createHtmlPrimitive("U", "u");
