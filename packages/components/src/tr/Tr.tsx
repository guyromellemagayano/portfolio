import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TrRef = PrimitiveRef<"tr">;
export type TrProps<TAs extends PrimitiveElement = "tr"> = PrimitiveProps<
  "tr",
  TAs
>;

/** Render the native <tr> HTML element. */
export const Tr = createHtmlPrimitive("Tr", "tr");
