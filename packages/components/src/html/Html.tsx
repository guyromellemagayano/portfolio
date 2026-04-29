import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type HtmlRef = PrimitiveRef<"html">;
export type HtmlProps<TAs extends PrimitiveElement = "html"> = PrimitiveProps<
  "html",
  TAs
>;

/** Render the native <html> HTML element. */
export const Html = createHtmlPrimitive("Html", "html");
