import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type PRef = PrimitiveRef<"p">;
export type PProps<TAs extends PrimitiveElement = "p"> = PrimitiveProps<
  "p",
  TAs
>;

/** Render the native <p> HTML element. */
export const P = createHtmlPrimitive("P", "p");
