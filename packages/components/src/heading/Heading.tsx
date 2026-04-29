import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type HeadingRef = PrimitiveRef<"h1">;
export type HeadingProps<TAs extends PrimitiveElement = "h1"> = PrimitiveProps<
  "h1",
  TAs
>;

/** Render the HTML section heading component. */
export const Heading = createHtmlPrimitive("Heading", "h1");
