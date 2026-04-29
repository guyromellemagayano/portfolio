import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type LinkRef = PrimitiveRef<"link">;
export type LinkProps<TAs extends PrimitiveElement = "link"> = PrimitiveProps<
  "link",
  TAs
>;

/** Render the native <link> HTML element. */
export const Link = createHtmlPrimitive("Link", "link");
