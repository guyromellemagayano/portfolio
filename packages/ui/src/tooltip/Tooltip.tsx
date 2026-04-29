/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn, getDataSlot } from "../utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>((props, ref) => {
  const { className, sideOffset = 4, ...rest } = props;

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        {...rest}
        className={cn(
          "bg-primary text-primary-foreground z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs shadow-md",
          className
        )}
        data-slot={getDataSlot(props, "tooltip-content")}
      />
    </TooltipPrimitive.Portal>
  );
});

TooltipContent.displayName = "TooltipContent";
