/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { buttonVariants } from "../button";
import { cn, getDataSlot } from "../utils";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      {...rest}
      className={cn(
        "bg-background/80 fixed inset-0 z-50 backdrop-blur-sm",
        className
      )}
      data-slot={getDataSlot(props, "alert-dialog-overlay")}
    />
  );
});

AlertDialogOverlay.displayName = "AlertDialogOverlay";

export const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        {...rest}
        className={cn(
          "bg-background fixed top-1/2 left-1/2 z-50 grid w-[min(calc(100%-2rem),32rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg",
          className
        )}
        data-slot={getDataSlot(props, "alert-dialog-content")}
      />
    </AlertDialogPortal>
  );
});

AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      data-slot={getDataSlot(props, "alert-dialog-header")}
    />
  );
};

AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogFooter = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      data-slot={getDataSlot(props, "alert-dialog-footer")}
    />
  );
};

AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      {...rest}
      className={cn("text-lg font-semibold", className)}
      data-slot={getDataSlot(props, "alert-dialog-title")}
    />
  );
});

AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "alert-dialog-description")}
    />
  );
});

AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      {...rest}
      className={cn(buttonVariants(), className)}
      data-slot={getDataSlot(props, "alert-dialog-action")}
    />
  );
});

AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      {...rest}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      data-slot={getDataSlot(props, "alert-dialog-cancel")}
    />
  );
});

AlertDialogCancel.displayName = "AlertDialogCancel";
