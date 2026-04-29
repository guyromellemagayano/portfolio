import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BlockquoteRef = PrimitiveRef<"blockquote">;
export type BlockquoteProps<TAs extends PrimitiveElement = "blockquote"> =
  PrimitiveProps<"blockquote", TAs>;

/** Render the native <blockquote> HTML element. */
export const Blockquote = createHtmlPrimitive("Blockquote", "blockquote");
