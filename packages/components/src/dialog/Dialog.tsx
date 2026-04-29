import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DialogRef = PrimitiveRef<"dialog">;
export type DialogProps<TAs extends PrimitiveElement = "dialog"> =
  PrimitiveProps<"dialog", TAs>;

/** Render the native <dialog> HTML element. */
export const Dialog = createHtmlPrimitive("Dialog", "dialog");
