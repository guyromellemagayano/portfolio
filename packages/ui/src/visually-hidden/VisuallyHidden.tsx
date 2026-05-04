import React from "react";

import {
  VisuallyHidden as VisuallyHiddenPrimitive,
  type VisuallyHiddenProps as VisuallyHiddenPrimitiveProps,
  type VisuallyHiddenRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type VisuallyHiddenProps = VisuallyHiddenPrimitiveProps;

export const VisuallyHidden = React.forwardRef<
  VisuallyHiddenRef,
  VisuallyHiddenProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <VisuallyHiddenPrimitive
      ref={ref}
      {...rest}
      className={cn("sr-only", className)}
      data-slot={getDataSlot(props, "visually-hidden")}
    />
  );
});

VisuallyHidden.displayName = "VisuallyHidden";
