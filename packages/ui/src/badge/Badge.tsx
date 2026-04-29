/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { Span, type SpanProps, type SpanRef } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground border-transparent",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeProps = SpanProps & VariantProps<typeof badgeVariants>;

export const Badge = React.forwardRef<SpanRef, BadgeProps>((props, ref) => {
  const { className, variant, ...rest } = props;

  return (
    <Span
      ref={ref}
      {...rest}
      className={cn(badgeVariants({ variant }), className)}
      data-slot={getDataSlot(props, "badge")}
    />
  );
});

Badge.displayName = "Badge";
