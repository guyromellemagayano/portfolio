import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type MeterRef = PrimitiveRef<"meter">;
export type MeterProps<TAs extends PrimitiveElement = "meter"> = PrimitiveProps<
  "meter",
  TAs
>;

/** Render the native <meter> HTML element. */
export const Meter = createHtmlPrimitive("Meter", "meter");
