import { createHtmlPrimitive, createNativeDefaultProps } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type ButtonRef = PrimitiveRef<"button">;
export type ButtonProps<TAs extends PrimitiveElement = "button"> =
  PrimitiveProps<"button", TAs>;

/** Render the native <button> HTML element. */
export const Button = createHtmlPrimitive("Button", "button", {
  defaultProps: createNativeDefaultProps("button", { type: "button" }),
});
