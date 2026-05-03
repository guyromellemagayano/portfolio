import React from "react";

import { Circle } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { useFieldControlProps } from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

function mergeIdRefs(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(" ") || undefined;
}

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

export type RadioGroupOptionProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> & {
  description?: React.ReactNode;
  descriptionProps?: React.ComponentPropsWithoutRef<"p">;
  itemProps?: Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    "id" | "value"
  >;
  label: React.ReactNode;
  labelProps?: React.ComponentPropsWithoutRef<"label">;
  value: string;
};

export const RadioGroupOption = React.forwardRef<
  HTMLDivElement,
  RadioGroupOptionProps
>((props, ref) => {
  const {
    className,
    description,
    descriptionProps,
    id,
    itemProps,
    label,
    labelProps,
    value,
    ...rest
  } = props;
  const generatedId = React.useId();
  const itemId = id ?? `radio-group-option-${generatedId}`;
  const descriptionId =
    description !== undefined && description !== null
      ? `${itemId}-description`
      : undefined;
  const describedBy = mergeIdRefs(
    itemProps?.["aria-describedby"],
    descriptionId
  );

  return (
    <div
      ref={ref}
      {...rest}
      className={cn("flex items-start gap-3", className)}
      data-slot={getDataSlot(props, "radio-group-option")}
    >
      <RadioGroupItem
        id={itemId}
        value={value}
        {...itemProps}
        aria-describedby={describedBy}
      />
      <div className="grid gap-1">
        <label
          {...labelProps}
          className={cn(
            "text-sm leading-none font-medium",
            labelProps?.className
          )}
          htmlFor={itemId}
        >
          {label}
        </label>
        {description !== undefined && description !== null ? (
          <p
            {...descriptionProps}
            className={cn(
              "text-muted-foreground text-sm",
              descriptionProps?.className
            )}
            id={descriptionId}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
});

RadioGroupOption.displayName = "RadioGroupOption";
