import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type MetaRef = PrimitiveRef<"meta">;
export type MetaProps<TAs extends PrimitiveElement = "meta"> = PrimitiveProps<
  "meta",
  TAs
>;

/** Render the native <meta> HTML element. */
export const Meta = createHtmlPrimitive("Meta", "meta");
