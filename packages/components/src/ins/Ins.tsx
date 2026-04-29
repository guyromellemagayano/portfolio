import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type InsRef = PrimitiveRef<"ins">;
export type InsProps<TAs extends PrimitiveElement = "ins"> = PrimitiveProps<
  "ins",
  TAs
>;

/** Render the native <ins> HTML element. */
export const Ins = createHtmlPrimitive("Ins", "ins");
