import React from "react";

import { useFieldControlProps } from "../field";
import { createHtmlPrimitive } from "../primitive";
import {
  type HtmlPrimitiveComponent,
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type TextareaRef = PrimitiveRef<"textarea">;
export type TextareaProps<TAs extends PrimitiveElement = "textarea"> =
  PrimitiveProps<"textarea", TAs>;

const TextareaRoot = createHtmlPrimitive("Textarea", "textarea");

/** Render the native <textarea> HTML element. */
const TextareaComponent = React.forwardRef<TextareaRef, TextareaProps>(
  (props, ref) => {
    const controlProps = useFieldControlProps(props);

    return <TextareaRoot ref={ref} {...controlProps} />;
  }
);

TextareaComponent.displayName = "Textarea";

export const Textarea = TextareaComponent as HtmlPrimitiveComponent<"textarea">;
