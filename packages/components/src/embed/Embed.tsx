import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type EmbedRef = PrimitiveRef<"embed">;
export type EmbedProps<TAs extends PrimitiveElement = "embed"> = PrimitiveProps<
  "embed",
  TAs
>;

/** Render the native <embed> HTML element. */
export const Embed = createHtmlPrimitive("Embed", "embed");
