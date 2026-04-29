import { createHtmlPrimitive, createNativeDefaultProps } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type InputRef = PrimitiveRef<"input">;
export type InputProps<TAs extends PrimitiveElement = "input"> = PrimitiveProps<
  "input",
  TAs
>;

/** Render the native <input> HTML element. */
export const Input = createHtmlPrimitive("Input", "input", {
  defaultProps: createNativeDefaultProps("input", { type: "text" }),
});
