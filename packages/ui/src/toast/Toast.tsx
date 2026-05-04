/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { X } from "lucide-react";
import { Toast as ToastPrimitive } from "radix-ui";

import { cn, getDataSlot } from "../utils";
import { VisuallyHidden } from "../visually-hidden";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ToastPrimitive.Viewport
      ref={ref}
      {...rest}
      className={cn(
        "fixed right-4 bottom-4 z-50 flex max-h-screen w-96 max-w-[calc(100vw-2rem)] flex-col gap-2",
        className
      )}
      data-slot={getDataSlot(props, "toast-viewport")}
    />
  );
});

ToastViewport.displayName = "ToastViewport";

export const Toaster = (props: React.ComponentProps<typeof ToastProvider>) => {
  const { children, ...rest } = props;

  return (
    <ToastProvider {...rest}>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
};

Toaster.displayName = "Toaster";

export type ToastProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitive.Root
> & {
  intent?: "error" | "info" | "neutral" | "success" | "warning";
};

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>((props, ref) => {
  const { className, intent = "neutral", ...rest } = props;

  return (
    <ToastPrimitive.Root
      ref={ref}
      {...rest}
      className={cn(
        "bg-background text-foreground grid gap-1 rounded-lg border p-4 shadow-lg",
        intent === "error" ? "border-destructive/50" : undefined,
        intent === "success" ? "border-emerald-500/40" : undefined,
        intent === "warning" ? "border-amber-500/40" : undefined,
        className
      )}
      data-intent={intent}
      data-slot={getDataSlot(props, "toast")}
    />
  );
});

Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ToastPrimitive.Title
      ref={ref}
      {...rest}
      className={cn("text-sm font-semibold", className)}
      data-slot={getDataSlot(props, "toast-title")}
    />
  );
});

ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ToastPrimitive.Description
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "toast-description")}
    />
  );
});

ToastDescription.displayName = "ToastDescription";

export const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ToastPrimitive.Action
      ref={ref}
      {...rest}
      className={cn("text-primary text-sm font-medium", className)}
      data-slot={getDataSlot(props, "toast-action")}
    />
  );
});

ToastAction.displayName = "ToastAction";

export type ToastCloseProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitive.Close
> & {
  closeLabel?: string;
};

export const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>((props, ref) => {
  const { className, closeLabel = "Close notification", ...rest } = props;

  return (
    <ToastPrimitive.Close
      ref={ref}
      {...rest}
      className={cn(
        "focus-visible:ring-ring absolute top-2 right-2 rounded opacity-70 hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      data-slot={getDataSlot(props, "toast-close")}
    >
      <X aria-hidden="true" className="size-4" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </ToastPrimitive.Close>
  );
});

ToastClose.displayName = "ToastClose";
