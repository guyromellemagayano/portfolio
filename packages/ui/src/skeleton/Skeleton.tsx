import React from "react";

import { Div, type DivProps, type DivRef } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type SkeletonProps = DivProps;
export type SkeletonTextProps = DivProps & {
  lines?: number;
};
export type SkeletonCardProps = DivProps;

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

export const SkeletonText = React.forwardRef<DivRef, SkeletonTextProps>(
  (props, ref) => {
    const { className, lines = 3, ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-hidden="true"
        {...rest}
        className={cn("space-y-2", className)}
        data-slot={getDataSlot(props, "skeleton-text")}
      >
        {Array.from({ length: lines }, (_, index) => (
          <Skeleton
            key={index}
            className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")}
          />
        ))}
      </Div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

export const SkeletonCard = React.forwardRef<DivRef, SkeletonCardProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-hidden="true"
        {...rest}
        className={cn("space-y-4 rounded-lg border p-6", className)}
        data-slot={getDataSlot(props, "skeleton-card")}
      >
        <Skeleton className="h-5 w-1/3" />
        <SkeletonText />
      </Div>
    );
  }
);

SkeletonCard.displayName = "SkeletonCard";
