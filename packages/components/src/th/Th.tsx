import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ThRef = PrimitiveRef<"th">;
export type ThProps<TAs extends PrimitiveElement = "th"> = PrimitiveProps<
  "th",
  TAs
>;

/** Render the native <th> HTML element. */
export const Th = createHtmlPrimitive("Th", "th");
