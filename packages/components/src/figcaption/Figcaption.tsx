import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FigcaptionRef = PrimitiveRef<"figcaption">;
export type FigcaptionProps<TAs extends PrimitiveElement = "figcaption"> =
  PrimitiveProps<"figcaption", TAs>;

/** Render the native <figcaption> HTML element. */
export const Figcaption = createHtmlPrimitive("Figcaption", "figcaption");
