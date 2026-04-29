import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type BoxRef = PrimitiveRef<"div">;
export type BoxProps<TAs extends PrimitiveElement = "div"> = PrimitiveProps<
  "div",
  TAs
>;

/** Render an unstyled polymorphic layout container. */
export const Box = createHtmlPrimitive("Box", "div");
