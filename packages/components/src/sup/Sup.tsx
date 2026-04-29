import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SupRef = PrimitiveRef<"sup">;
export type SupProps<TAs extends PrimitiveElement = "sup"> = PrimitiveProps<
  "sup",
  TAs
>;

/** Render the native <sup> HTML element. */
export const Sup = createHtmlPrimitive("Sup", "sup");
