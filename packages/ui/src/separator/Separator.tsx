import React from "react";

import { Div, type DivProps, type DivRef } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export interface SeparatorProps extends DivProps {
  orientation?: "horizontal" | "vertical";
}

export const Separator = React.forwardRef<DivRef, SeparatorProps>(
  (props, ref) => {
    const { className, orientation = "horizontal", ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-orientation={orientation}
        role="separator"
        {...rest}
        className={cn(
          "bg-border shrink-0",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        )}
        data-slot={getDataSlot(props, "separator")}
      />
    );
  }
);

Separator.displayName = "Separator";
