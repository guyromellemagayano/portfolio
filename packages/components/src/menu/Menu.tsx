import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type MenuRef = PrimitiveRef<"menu">;
export type MenuProps<TAs extends PrimitiveElement = "menu"> = PrimitiveProps<
  "menu",
  TAs
>;

/** Render the native <menu> HTML element. */
export const Menu = createHtmlPrimitive("Menu", "menu");
