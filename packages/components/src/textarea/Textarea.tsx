import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TextareaRef = PrimitiveRef<"textarea">;
export type TextareaProps<TAs extends PrimitiveElement = "textarea"> =
  PrimitiveProps<"textarea", TAs>;

/** Render the native <textarea> HTML element. */
export const Textarea = createHtmlPrimitive("Textarea", "textarea");
