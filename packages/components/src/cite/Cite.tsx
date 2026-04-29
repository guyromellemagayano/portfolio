import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type CiteRef = PrimitiveRef<"cite">;
export type CiteProps<TAs extends PrimitiveElement = "cite"> = PrimitiveProps<
  "cite",
  TAs
>;

/** Render the native <cite> HTML element. */
export const Cite = createHtmlPrimitive("Cite", "cite");
