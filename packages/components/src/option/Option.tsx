import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type OptionRef = PrimitiveRef<"option">;
export type OptionProps<TAs extends PrimitiveElement = "option"> =
  PrimitiveProps<"option", TAs>;

/** Render the native <option> HTML element. */
export const Option = createHtmlPrimitive("Option", "option");
