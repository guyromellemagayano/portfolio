import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type RtRef = PrimitiveRef<"rt">;
export type RtProps<TAs extends PrimitiveElement = "rt"> = PrimitiveProps<
  "rt",
  TAs
>;

/** Render the native <rt> HTML element. */
export const Rt = createHtmlPrimitive("Rt", "rt");
