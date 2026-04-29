import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type OutputRef = PrimitiveRef<"output">;
export type OutputProps<TAs extends PrimitiveElement = "output"> =
  PrimitiveProps<"output", TAs>;

/** Render the native <output> HTML element. */
export const Output = createHtmlPrimitive("Output", "output");
