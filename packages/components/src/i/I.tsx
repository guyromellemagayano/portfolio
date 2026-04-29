import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type IRef = PrimitiveRef<"i">;
export type IProps<TAs extends PrimitiveElement = "i"> = PrimitiveProps<
  "i",
  TAs
>;

/** Render the native <i> HTML element. */
export const I = createHtmlPrimitive("I", "i");
