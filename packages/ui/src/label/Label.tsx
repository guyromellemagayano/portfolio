import React from "react";

import {
  Label as LabelPrimitive,
  type LabelProps as LabelPrimitiveProps,
  type LabelRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type LabelProps = LabelPrimitiveProps;

export const Label = React.forwardRef<LabelRef, LabelProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <LabelPrimitive
      ref={ref}
      {...rest}
      className={cn(
        "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      data-slot={getDataSlot(props, "label")}
    />
  );
});

Label.displayName = "Label";
