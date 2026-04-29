import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type KbdRef = PrimitiveRef<"kbd">;
export type KbdProps<TAs extends PrimitiveElement = "kbd"> = PrimitiveProps<
  "kbd",
  TAs
>;

/** Render the native <kbd> HTML element. */
export const Kbd = createHtmlPrimitive("Kbd", "kbd");
