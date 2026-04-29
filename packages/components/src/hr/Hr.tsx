import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type HrRef = PrimitiveRef<"hr">;
export type HrProps<TAs extends PrimitiveElement = "hr"> = PrimitiveProps<
  "hr",
  TAs
>;

/** Render the native <hr> HTML element. */
export const Hr = createHtmlPrimitive("Hr", "hr");
