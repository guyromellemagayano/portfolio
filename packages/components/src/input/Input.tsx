import React from "react";

import { useFieldControlProps } from "../field";
import { createHtmlPrimitive, createNativeDefaultProps } from "../primitive";
import {
  type HtmlPrimitiveComponent,
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type InputRef = PrimitiveRef<"input">;
export type InputProps<TAs extends PrimitiveElement = "input"> = PrimitiveProps<
  "input",
  TAs
>;

const InputRoot = createHtmlPrimitive("Input", "input", {
  defaultProps: createNativeDefaultProps("input", { type: "text" }),
});

/** Render the native <input> HTML element. */
const InputComponent = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const controlProps = useFieldControlProps(props);

  return <InputRoot ref={ref} {...controlProps} />;
});

InputComponent.displayName = "Input";

export const Input = InputComponent as HtmlPrimitiveComponent<"input">;
