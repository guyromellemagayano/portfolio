import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type DdRef = PrimitiveRef<"dd">;
export type DdProps<TAs extends PrimitiveElement = "dd"> = PrimitiveProps<
  "dd",
  TAs
>;

/** Render the native <dd> HTML element. */
export const Dd = createHtmlPrimitive("Dd", "dd");
