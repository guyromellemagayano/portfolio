import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TextRef = PrimitiveRef<"span">;
export type TextProps<TAs extends PrimitiveElement = "span"> = PrimitiveProps<
  "span",
  TAs
>;

/** Render an unstyled polymorphic text container. */
export const Text = createHtmlPrimitive("Text", "span");
