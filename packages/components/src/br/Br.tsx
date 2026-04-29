import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BrRef = PrimitiveRef<"br">;
export type BrProps<TAs extends PrimitiveElement = "br"> = PrimitiveProps<
  "br",
  TAs
>;

/** Render the native <br> HTML element. */
export const Br = createHtmlPrimitive("Br", "br");
