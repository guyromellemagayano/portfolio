import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type RpRef = PrimitiveRef<"rp">;
export type RpProps<TAs extends PrimitiveElement = "rp"> = PrimitiveProps<
  "rp",
  TAs
>;

/** Render the native <rp> HTML element. */
export const Rp = createHtmlPrimitive("Rp", "rp");
