import React from "react";

import {
  Textarea as TextareaPrimitive,
  type TextareaProps as TextareaPrimitiveProps,
  type TextareaRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type TextareaProps = TextareaPrimitiveProps;

export const Textarea = React.forwardRef<TextareaRef, TextareaProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <TextareaPrimitive
        ref={ref}
        {...rest}
        className={cn(
          "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        data-slot={getDataSlot(props, "textarea")}
      />
    );
  }
);

Textarea.displayName = "Textarea";
