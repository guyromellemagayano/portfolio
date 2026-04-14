/**
 * @file apps/jobs/src/components/ui/separator.tsx
 * @author Guy Romelle Magayano
 * @description Shadcn-style separator primitive for visual grouping in the jobs app.
 */

import type { ComponentProps } from "react";

import { cn } from "@jobs/lib/utils";

type SeparatorProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

/** Renders a simple horizontal or vertical separator. */
export function Separator(props: SeparatorProps) {
  const {
    className,
    orientation = "horizontal",
    role = "separator",
    ...rest
  } = props;

  return (
    <div
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-zinc-200",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      data-orientation={orientation}
      data-slot="separator"
      role={role}
      {...rest}
    />
  );
}
