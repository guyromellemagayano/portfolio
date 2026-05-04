/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { Tabs as TabsPrimitive } from "radix-ui";

import { cn, getDataSlot } from "../utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <TabsPrimitive.List
      ref={ref}
      {...rest}
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
        className
      )}
      data-slot={getDataSlot(props, "tabs-list")}
    />
  );
});

TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      {...rest}
      className={cn(
        "focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
        className
      )}
      data-slot={getDataSlot(props, "tabs-trigger")}
    />
  );
});

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <TabsPrimitive.Content
      ref={ref}
      {...rest}
      className={cn(
        "focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      data-slot={getDataSlot(props, "tabs-content")}
    />
  );
});

TabsContent.displayName = "TabsContent";

export type TabsPanelData = {
  content: React.ReactNode;
  contentProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    "children" | "value"
  >;
  label: React.ReactNode;
  triggerProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    "children" | "value"
  >;
  value: string;
};

export type TabsPanelsProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
  "children"
> & {
  listProps?: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
  panels: readonly TabsPanelData[];
};

export const TabsPanels = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  TabsPanelsProps
>((props, ref) => {
  const { defaultValue, listProps, panels, ...rest } = props;
  const resolvedDefaultValue = defaultValue ?? panels[0]?.value;

  return (
    <TabsPrimitive.Root
      ref={ref}
      defaultValue={resolvedDefaultValue}
      {...rest}
      data-slot={getDataSlot(props, "tabs-panels")}
    >
      <TabsList {...listProps}>
        {panels.map((panel) => (
          <TabsTrigger
            key={panel.value}
            value={panel.value}
            {...panel.triggerProps}
          >
            {panel.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {panels.map((panel) => (
        <TabsContent
          key={panel.value}
          value={panel.value}
          {...panel.contentProps}
        >
          {panel.content}
        </TabsContent>
      ))}
    </TabsPrimitive.Root>
  );
});

TabsPanels.displayName = "TabsPanels";
