/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { Popover as PopoverPrimitive } from "radix-ui";

import { cn, getDataSlot } from "../utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn("space-y-1.5", className)}
      data-slot={getDataSlot(props, "popover-header")}
    />
  );
};

PopoverHeader.displayName = "PopoverHeader";

export const PopoverTitle = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  const { className, ...rest } = props;

  return (
    <h2
      {...rest}
      className={cn("text-sm font-semibold tracking-normal", className)}
      data-slot={getDataSlot(props, "popover-title")}
    />
  );
};

PopoverTitle.displayName = "PopoverTitle";

export const PopoverDescription = (
  props: React.HTMLAttributes<HTMLParagraphElement>
) => {
  const { className, ...rest } = props;

  return (
    <p
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "popover-description")}
    />
  );
};

PopoverDescription.displayName = "PopoverDescription";

export type PopoverContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  "title"
> & {
  description?: React.ReactNode;
  descriptionProps?: React.HTMLAttributes<HTMLParagraphElement>;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  title?: React.ReactNode;
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>;
};

export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>((props, ref) => {
  const {
    align = "center",
    children,
    className,
    description,
    descriptionProps,
    headerProps,
    sideOffset = 4,
    title,
    titleProps,
    ...rest
  } = props;
  const reactId = React.useId();
  const hasTitle = title !== undefined && title !== null;
  const hasDescription = description !== undefined && description !== null;
  const titleId = titleProps?.id ?? `popover-${reactId}-title`;
  const descriptionId =
    descriptionProps?.id ?? `popover-${reactId}-description`;

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        aria-describedby={hasDescription ? descriptionId : undefined}
        aria-labelledby={hasTitle ? titleId : undefined}
        align={align}
        sideOffset={sideOffset}
        {...rest}
        className={cn(
          "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none",
          className
        )}
        data-slot={getDataSlot(props, "popover-content")}
      >
        {hasTitle || hasDescription ? (
          <PopoverHeader {...headerProps}>
            {hasTitle ? (
              <PopoverTitle {...titleProps} id={titleId}>
                {title}
              </PopoverTitle>
            ) : null}
            {hasDescription ? (
              <PopoverDescription {...descriptionProps} id={descriptionId}>
                {description}
              </PopoverDescription>
            ) : null}
          </PopoverHeader>
        ) : null}
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = "PopoverContent";
