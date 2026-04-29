import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type WbrRef = PrimitiveRef<"wbr">;
export type WbrProps<TAs extends PrimitiveElement = "wbr"> = PrimitiveProps<
  "wbr",
  TAs
>;

/** Render the native <wbr> HTML element. */
export const Wbr = createHtmlPrimitive("Wbr", "wbr");
