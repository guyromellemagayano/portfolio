import React from "react";

import { Div, type DivProps, type DivRef } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type SkeletonProps = DivProps;

export const Skeleton = React.forwardRef<DivRef, SkeletonProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-hidden="true"
        {...rest}
        className={cn("bg-muted animate-pulse rounded-md", className)}
        data-slot={getDataSlot(props, "skeleton")}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
