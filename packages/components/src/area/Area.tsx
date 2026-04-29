import { createHtmlPrimitive, createNativeDefaultProps } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type AreaRef = PrimitiveRef<"area">;
export type AreaProps<TAs extends PrimitiveElement = "area"> = PrimitiveProps<
  "area",
  TAs
>;

/** Render the native <area> HTML element. */
export const Area = createHtmlPrimitive("Area", "area", {
  defaultProps: createNativeDefaultProps("area", { alt: "" }),
});
