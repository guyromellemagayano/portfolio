import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type FooterRef = PrimitiveRef<"footer">;
export type FooterProps<TAs extends PrimitiveElement = "footer"> =
  PrimitiveProps<"footer", TAs>;

/** Render the native <footer> HTML element. */
export const Footer = createHtmlPrimitive("Footer", "footer");
