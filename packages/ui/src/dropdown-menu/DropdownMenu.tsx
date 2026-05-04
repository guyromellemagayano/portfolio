/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { type ComponentAnalyticsAttributes } from "@portfolio/components";

import { cn, getAnalyticsAttributes, getDataSlot } from "../utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>((props, ref) => {
  const { className, sideOffset = 4, ...rest } = props;

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        {...rest}
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        data-slot={getDataSlot(props, "dropdown-menu-content")}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  analytics?: ComponentAnalyticsAttributes;
  destructive?: boolean;
  shortcut?: React.ReactNode;
};

export const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>((props, ref) => {
  const { analytics, children, className, destructive, shortcut, ...rest } =
    props;

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      {...getAnalyticsAttributes(analytics)}
      {...rest}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none disabled:pointer-events-none disabled:opacity-50",
        destructive
          ? "text-destructive focus:bg-destructive/10 focus:text-destructive"
          : undefined,
        className
      )}
      data-destructive={destructive ? "" : undefined}
      data-slot={getDataSlot(props, "dropdown-menu-item")}
    >
      <span className="min-w-0 flex-1" data-slot="dropdown-menu-item-label">
        {children}
      </span>
      {shortcut ? (
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      {...rest}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      data-slot={getDataSlot(props, "dropdown-menu-label")}
    />
  );
});

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      {...rest}
      className={cn("bg-muted -mx-1 my-1 h-px", className)}
      data-slot={getDataSlot(props, "dropdown-menu-separator")}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuShortcut = (
  props: React.HTMLAttributes<HTMLSpanElement>
) => {
  const { className, ...rest } = props;

  return (
    <span
      {...rest}
      className={cn("text-muted-foreground ml-6 text-xs", className)}
      data-slot={getDataSlot(props, "dropdown-menu-shortcut")}
    />
  );
};

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
