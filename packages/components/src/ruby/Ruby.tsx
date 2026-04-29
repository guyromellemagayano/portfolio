import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type RubyRef = PrimitiveRef<"ruby">;
export type RubyProps<TAs extends PrimitiveElement = "ruby"> = PrimitiveProps<
  "ruby",
  TAs
>;

/** Render the native <ruby> HTML element. */
export const Ruby = createHtmlPrimitive("Ruby", "ruby");
