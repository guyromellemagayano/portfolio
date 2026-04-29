import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ColgroupRef = PrimitiveRef<"colgroup">;
export type ColgroupProps<TAs extends PrimitiveElement = "colgroup"> =
  PrimitiveProps<"colgroup", TAs>;

/** Render the native <colgroup> HTML element. */
export const Colgroup = createHtmlPrimitive("Colgroup", "colgroup");
