import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type StyleRef = PrimitiveRef<"style">;
export type StyleProps<TAs extends PrimitiveElement = "style"> = PrimitiveProps<
  "style",
  TAs
>;

/** Render the native <style> HTML element. */
export const Style = createHtmlPrimitive("Style", "style");
