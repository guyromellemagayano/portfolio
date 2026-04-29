import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type LiRef = PrimitiveRef<"li">;
export type LiProps<TAs extends PrimitiveElement = "li"> = PrimitiveProps<
  "li",
  TAs
>;

/** Render the native <li> HTML element. */
export const Li = createHtmlPrimitive("Li", "li");
