import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type UlRef = PrimitiveRef<"ul">;
export type UlProps<TAs extends PrimitiveElement = "ul"> = PrimitiveProps<
  "ul",
  TAs
>;

/** Render the native <ul> HTML element. */
export const Ul = createHtmlPrimitive("Ul", "ul");
