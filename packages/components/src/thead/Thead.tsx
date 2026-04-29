import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TheadRef = PrimitiveRef<"thead">;
export type TheadProps<TAs extends PrimitiveElement = "thead"> = PrimitiveProps<
  "thead",
  TAs
>;

/** Render the native <thead> HTML element. */
export const Thead = createHtmlPrimitive("Thead", "thead");
