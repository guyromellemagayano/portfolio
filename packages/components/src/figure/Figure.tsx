import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FigureRef = PrimitiveRef<"figure">;
export type FigureProps<TAs extends PrimitiveElement = "figure"> =
  PrimitiveProps<"figure", TAs>;

/** Render the native <figure> HTML element. */
export const Figure = createHtmlPrimitive("Figure", "figure");
