import React from "react";

import {
  Input as InputPrimitive,
  type InputProps as InputPrimitiveProps,
  type InputRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type InputProps = InputPrimitiveProps;

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { className, type, ...rest } = props;

  return (
    <InputPrimitive
      ref={ref}
      type={type}
      {...rest}
      className={cn(
        "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot={getDataSlot(props, "input")}
    />
  );
});

Input.displayName = "Input";
