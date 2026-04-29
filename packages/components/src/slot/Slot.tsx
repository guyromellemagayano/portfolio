import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SlotRef = PrimitiveRef<"slot">;
export type SlotProps<TAs extends PrimitiveElement = "slot"> = PrimitiveProps<
  "slot",
  TAs
>;

/** Render the native <slot> HTML element. */
export const Slot = createHtmlPrimitive("Slot", "slot");
