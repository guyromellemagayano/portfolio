import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type HeaderRef = PrimitiveRef<"header">;
export type HeaderProps<TAs extends PrimitiveElement = "header"> =
  PrimitiveProps<"header", TAs>;

/** Render the native <header> HTML element. */
export const Header = createHtmlPrimitive("Header", "header");
