import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type EmRef = PrimitiveRef<"em">;
export type EmProps<TAs extends PrimitiveElement = "em"> = PrimitiveProps<
  "em",
  TAs
>;

/** Render the native <em> HTML element. */
export const Em = createHtmlPrimitive("Em", "em");
