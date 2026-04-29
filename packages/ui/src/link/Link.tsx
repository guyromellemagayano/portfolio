/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { A, type AProps, type ARef } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export const linkVariants = cva(
  "focus-visible:ring-ring font-medium underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "text-primary hover:underline",
        muted: "text-muted-foreground hover:text-foreground",
        subtle: "text-foreground hover:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type LinkProps = AProps &
  VariantProps<typeof linkVariants> & {
    newTab?: boolean;
  };

export const Link = React.forwardRef<ARef, LinkProps>((props, ref) => {
  const { className, newTab, target, variant, ...rest } = props;

  return (
    <A
      ref={ref}
      target={newTab ? "_blank" : target}
      {...rest}
      className={cn(linkVariants({ variant }), className)}
      data-slot={getDataSlot(props, "link")}
    />
  );
});

Link.displayName = "Link";
