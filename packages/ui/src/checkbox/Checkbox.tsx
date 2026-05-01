import React from "react";

import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { useFieldControlProps } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const controlProps = useFieldControlProps(rest, {
    includeLabel: true,
    nativeRequired: false,
  });

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      {...controlProps}
      className={cn(
        "border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground group size-4 shrink-0 rounded-sm border shadow focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot={getDataSlot(props, "checkbox")}
    >
      {children ?? (
        <CheckboxPrimitive.Indicator
          className="flex items-center justify-center text-current"
          data-slot="checkbox-indicator"
        >
          <Check
            aria-hidden="true"
            className="size-3.5 group-data-[state=indeterminate]:hidden"
          />
          <Minus
            aria-hidden="true"
            className="hidden size-3.5 group-data-[state=indeterminate]:block"
          />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";
