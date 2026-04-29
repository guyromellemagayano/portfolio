import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SmallRef = PrimitiveRef<"small">;
export type SmallProps<TAs extends PrimitiveElement = "small"> = PrimitiveProps<
  "small",
  TAs
>;

/** Render the native <small> HTML element. */
export const Small = createHtmlPrimitive("Small", "small");
