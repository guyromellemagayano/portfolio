import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SubRef = PrimitiveRef<"sub">;
export type SubProps<TAs extends PrimitiveElement = "sub"> = PrimitiveProps<
  "sub",
  TAs
>;

/** Render the native <sub> HTML element. */
export const Sub = createHtmlPrimitive("Sub", "sub");
