import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type NavRef = PrimitiveRef<"nav">;
export type NavProps<TAs extends PrimitiveElement = "nav"> = PrimitiveProps<
  "nav",
  TAs
>;

/** Render the native <nav> HTML element. */
export const Nav = createHtmlPrimitive("Nav", "nav");
