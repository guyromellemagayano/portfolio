/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { cn, getDataSlot } from "../utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

export const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <SheetPrimitive.Overlay
      ref={ref}
      {...rest}
      className={cn(
        "bg-background/80 fixed inset-0 z-50 backdrop-blur-sm",
        className
      )}
      data-slot={getDataSlot(props, "sheet-overlay")}
    />
  );
});

SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = cva(
  "bg-background fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export type SheetContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  "title"
> &
  VariantProps<typeof sheetVariants> & {
    closeLabel?: string;
    description?: React.ReactNode;
    descriptionProps?: React.ComponentPropsWithoutRef<
      typeof SheetPrimitive.Description
    >;
    headerProps?: React.HTMLAttributes<HTMLDivElement>;
    title?: React.ReactNode;
    titleProps?: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;
  };

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>((props, ref) => {
  const {
    children,
    className,
    closeLabel = "Close",
    description,
    descriptionProps,
    headerProps,
    side,
    title,
    titleProps,
    ...rest
  } = props;
  const hasDescription = description !== undefined && description !== null;
  const hasTitle = title !== undefined && title !== null;
  const hasGeneratedHeader = hasTitle || hasDescription;

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        {...rest}
        className={cn(sheetVariants({ side }), className)}
        data-slot={getDataSlot(props, "sheet-content")}
      >
        {hasGeneratedHeader ? (
          <SheetHeader {...headerProps}>
            {hasTitle ? <SheetTitle {...titleProps}>{title}</SheetTitle> : null}
            {hasDescription ? (
              <SheetDescription {...descriptionProps}>
                {description}
              </SheetDescription>
            ) : null}
          </SheetHeader>
        ) : null}
        {children}
        <SheetPrimitive.Close className="focus-visible:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none">
          <X aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});

SheetContent.displayName = "SheetContent";

export const SheetHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      data-slot={getDataSlot(props, "sheet-header")}
    />
  );
};

SheetHeader.displayName = "SheetHeader";

export const SheetFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      data-slot={getDataSlot(props, "sheet-footer")}
    />
  );
};

SheetFooter.displayName = "SheetFooter";

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <SheetPrimitive.Title
      ref={ref}
      {...rest}
      className={cn("text-foreground text-lg font-semibold", className)}
      data-slot={getDataSlot(props, "sheet-title")}
    />
  );
});

SheetTitle.displayName = "SheetTitle";

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <SheetPrimitive.Description
      ref={ref}
      {...rest}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot={getDataSlot(props, "sheet-description")}
    />
  );
});

SheetDescription.displayName = "SheetDescription";
