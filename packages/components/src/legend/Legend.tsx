import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type LegendRef = PrimitiveRef<"legend">;
export type LegendProps<TAs extends PrimitiveElement = "legend"> =
  PrimitiveProps<"legend", TAs>;

/** Render the native <legend> HTML element. */
export const Legend = createHtmlPrimitive("Legend", "legend");
