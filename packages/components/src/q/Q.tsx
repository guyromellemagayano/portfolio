import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type QRef = PrimitiveRef<"q">;
export type QProps<TAs extends PrimitiveElement = "q"> = PrimitiveProps<
  "q",
  TAs
>;

/** Render the native <q> HTML element. */
export const Q = createHtmlPrimitive("Q", "q");
