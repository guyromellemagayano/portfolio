import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DivRef = PrimitiveRef<"div">;
export type DivProps<TAs extends PrimitiveElement = "div"> = PrimitiveProps<
  "div",
  TAs
>;

/** Render the native <div> HTML element. */
export const Div = createHtmlPrimitive("Div", "div");
