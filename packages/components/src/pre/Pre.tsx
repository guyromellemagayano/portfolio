import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type PreRef = PrimitiveRef<"pre">;
export type PreProps<TAs extends PrimitiveElement = "pre"> = PrimitiveProps<
  "pre",
  TAs
>;

/** Render the native <pre> HTML element. */
export const Pre = createHtmlPrimitive("Pre", "pre");
