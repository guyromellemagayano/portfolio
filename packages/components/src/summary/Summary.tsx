import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SummaryRef = PrimitiveRef<"summary">;
export type SummaryProps<TAs extends PrimitiveElement = "summary"> =
  PrimitiveProps<"summary", TAs>;

/** Render the native <summary> HTML element. */
export const Summary = createHtmlPrimitive("Summary", "summary");
