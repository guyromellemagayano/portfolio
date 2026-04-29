import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type MathRef = PrimitiveRef<"math">;
export type MathProps<TAs extends PrimitiveElement = "math"> = PrimitiveProps<
  "math",
  TAs
>;

/** Render the native <math> HTML element. */
export const Math = createHtmlPrimitive("Math", "math");
