/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn, getDataSlot } from "../utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      {...rest}
      className={cn(
        "bg-background/80 fixed inset-0 z-50 backdrop-blur-sm",
        className
      )}
      data-slot={getDataSlot(props, "dialog-overlay")}
    />
  );
});

DialogOverlay.displayName = "DialogOverlay";

export type DialogContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  "title"
> & {
  closeLabel?: string;
  description?: React.ReactNode;
  descriptionProps?: React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Description
  >;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  title?: React.ReactNode;
  titleProps?: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
};

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>((props, ref) => {
  const {
    children,
    className,
    closeLabel = "Close",
    description,
    descriptionProps,
    headerProps,
    title,
    titleProps,
    ...rest
  } = props;
  const hasDescription = description !== undefined && description !== null;
  const hasTitle = title !== undefined && title !== null;
  const hasGeneratedHeader = hasTitle || hasDescription;

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        {...rest}
        className={cn(
          "bg-background fixed top-1/2 left-1/2 z-50 grid w-[min(calc(100%-2rem),32rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg",
          className
        )}
        data-slot={getDataSlot(props, "dialog-content")}
      >
        {hasGeneratedHeader ? (
          <DialogHeader {...headerProps}>
            {hasTitle ? (
              <DialogTitle {...titleProps}>{title}</DialogTitle>
            ) : null}
            {hasDescription ? (
              <DialogDescription {...descriptionProps}>
                {description}
              </DialogDescription>
            ) : null}
          </DialogHeader>
        ) : null}
        {children}
        <DialogPrimitive.Close className="focus-visible:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none">
          <X aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">{closeLabel}</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

DialogContent.displayName = "DialogContent";

export const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      data-slot={getDataSlot(props, "dialog-header")}
    />
  );
};

DialogHeader.displayName = "DialogHeader";

export const DialogFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      data-slot={getDataSlot(props, "dialog-footer")}
    />
  );
};

DialogFooter.displayName = "DialogFooter";

export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <DialogPrimitive.Title
      ref={ref}
      {...rest}
      className={cn(
        "text-lg leading-none font-semibold tracking-normal",
        className
      )}
      data-slot={getDataSlot(props, "dialog-title")}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <DialogPrimitive.Description
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "dialog-description")}
    />
  );
});

DialogDescription.displayName = "DialogDescription";
