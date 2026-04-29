import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SelectRef = PrimitiveRef<"select">;
export type SelectProps<TAs extends PrimitiveElement = "select"> =
  PrimitiveProps<"select", TAs>;

/** Render the native <select> HTML element. */
export const Select = createHtmlPrimitive("Select", "select");
