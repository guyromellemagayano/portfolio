import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TimeRef = PrimitiveRef<"time">;
export type TimeProps<TAs extends PrimitiveElement = "time"> = PrimitiveProps<
  "time",
  TAs
>;

/** Render the native <time> HTML element. */
export const Time = createHtmlPrimitive("Time", "time");
