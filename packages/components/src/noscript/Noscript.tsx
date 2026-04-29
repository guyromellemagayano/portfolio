import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type NoscriptRef = PrimitiveRef<"noscript">;
export type NoscriptProps<TAs extends PrimitiveElement = "noscript"> =
  PrimitiveProps<"noscript", TAs>;

/** Render the native <noscript> HTML element. */
export const Noscript = createHtmlPrimitive("Noscript", "noscript");
