import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type CaptionRef = PrimitiveRef<"caption">;
export type CaptionProps<TAs extends PrimitiveElement = "caption"> =
  PrimitiveProps<"caption", TAs>;

/** Render the native <caption> HTML element. */
export const Caption = createHtmlPrimitive("Caption", "caption");
