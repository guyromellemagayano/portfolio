import React from "react";

import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type VisuallyHiddenRef = PrimitiveRef<"span">;
export type VisuallyHiddenProps<TAs extends PrimitiveElement = "span"> =
  PrimitiveProps<"span", TAs>;

const visuallyHiddenStyle: React.CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
};

const VisuallyHiddenRoot = createHtmlPrimitive("VisuallyHidden", "span");

/** Render content that remains available to assistive technology. */
export const VisuallyHidden = React.forwardRef<
  VisuallyHiddenRef,
  VisuallyHiddenProps
>((props, ref) => {
  const { style, ...rest } = props;

  return (
    <VisuallyHiddenRoot
      ref={ref}
      style={{ ...visuallyHiddenStyle, ...style }}
      {...rest}
    />
  );
});

VisuallyHidden.displayName = "VisuallyHidden";
