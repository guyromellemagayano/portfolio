import React from "react";

import { Circle } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { useFieldControlProps } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>((props, ref) => {
  const { className, ...rest } = props;
  const controlProps = useFieldControlProps(rest, {
    includeLabel: true,
    nativeRequired: false,
  });

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      {...controlProps}
      className={cn("grid gap-2", className)}
      data-slot={getDataSlot(props, "radio-group")}
    />
  );
});

RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      {...rest}
      className={cn(
        "border-primary text-primary focus-visible:ring-ring aspect-square size-4 rounded-full border shadow focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot={getDataSlot(props, "radio-group-item")}
    >
      {children ?? (
        <RadioGroupPrimitive.Indicator
          className="flex items-center justify-center"
          data-slot="radio-group-indicator"
        >
          <Circle aria-hidden="true" className="size-2.5 fill-current" />
        </RadioGroupPrimitive.Indicator>
      )}
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";
