import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SampRef = PrimitiveRef<"samp">;
export type SampProps<TAs extends PrimitiveElement = "samp"> = PrimitiveProps<
  "samp",
  TAs
>;

/** Render the native <samp> HTML element. */
export const Samp = createHtmlPrimitive("Samp", "samp");
