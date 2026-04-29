import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SvgRef = PrimitiveRef<"svg">;
export type SvgProps<TAs extends PrimitiveElement = "svg"> = PrimitiveProps<
  "svg",
  TAs
>;

/** Render the native <svg> HTML element. */
export const Svg = createHtmlPrimitive("Svg", "svg");
