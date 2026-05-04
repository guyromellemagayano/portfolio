/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn, getDataSlot } from "../utils";

export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>;

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AccordionPrimitive.Item
      ref={ref}
      {...rest}
      className={cn("border-b", className)}
      data-slot={getDataSlot(props, "accordion-item")}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  icon?: React.ReactNode;
};

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>((props, ref) => {
  const { children, className, icon, ...rest } = props;
  const indicator =
    icon === undefined ? (
      <ChevronDown
        aria-hidden="true"
        className="size-4 transition-transform duration-200"
        data-slot="accordion-trigger-icon"
      />
    ) : (
      icon
    );

  return (
    <AccordionPrimitive.Header className="flex" data-slot="accordion-header">
      <AccordionPrimitive.Trigger
        ref={ref}
        {...rest}
        className={cn(
          "focus-visible:ring-ring flex flex-1 items-center justify-between py-4 text-left text-sm leading-6 font-medium transition-all hover:underline focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]_[data-slot=accordion-trigger-icon]]:rotate-180",
          className
        )}
        data-slot={getDataSlot(props, "accordion-trigger")}
      >
        {children}
        {indicator !== null ? (
          <span
            className="ml-4 flex shrink-0 items-center"
            data-slot="accordion-trigger-indicator"
          >
            {indicator}
          </span>
        ) : null}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> & {
  innerProps?: React.ComponentPropsWithoutRef<"div">;
};

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>((props, ref) => {
  const { children, className, innerProps, ...rest } = props;

  return (
    <AccordionPrimitive.Content
      ref={ref}
      {...rest}
      className={cn("overflow-hidden text-sm", className)}
      data-slot={getDataSlot(props, "accordion-content")}
    >
      <div
        {...innerProps}
        className={cn("pt-0 pb-4", innerProps?.className)}
        data-slot={getDataSlot(innerProps ?? {}, "accordion-content-inner")}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = "AccordionContent";

export type AccordionPanelProps = Omit<AccordionItemProps, "children"> & {
  children: React.ReactNode;
  contentProps?: Omit<AccordionContentProps, "children">;
  description?: React.ReactNode;
  descriptionProps?: React.ComponentPropsWithoutRef<"p">;
  title: React.ReactNode;
  titleProps?: React.ComponentPropsWithoutRef<"span">;
  triggerProps?: Omit<AccordionTriggerProps, "children">;
};

export const AccordionPanel = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionPanelProps
>((props, ref) => {
  const {
    children,
    contentProps,
    description,
    descriptionProps,
    title,
    titleProps,
    triggerProps,
    ...itemProps
  } = props;
  const hasDescription = description !== undefined && description !== null;

  return (
    <AccordionItem ref={ref} {...itemProps}>
      <AccordionTrigger {...triggerProps}>
        <span
          {...titleProps}
          className={cn("text-left", titleProps?.className)}
          data-slot={getDataSlot(titleProps ?? {}, "accordion-panel-title")}
        >
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent {...contentProps}>
        {hasDescription ? (
          <p
            {...descriptionProps}
            className={cn(
              "text-muted-foreground mb-2",
              descriptionProps?.className
            )}
            data-slot={getDataSlot(
              descriptionProps ?? {},
              "accordion-panel-description"
            )}
          >
            {description}
          </p>
        ) : null}
        {children}
      </AccordionContent>
    </AccordionItem>
  );
});

AccordionPanel.displayName = "AccordionPanel";
