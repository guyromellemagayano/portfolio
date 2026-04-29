/* eslint-disable react-refresh/only-export-components */
import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import {
  Div,
  type DivProps,
  type DivRef,
  Heading,
  type HeadingProps,
  type HeadingRef,
  P,
  type PProps,
  type PRef,
} from "@portfolio/components";

import { cn, getDataSlot } from "../utils";

export const alertVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive:
        "border-destructive/50 text-destructive dark:border-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AlertProps = DivProps & VariantProps<typeof alertVariants>;

export const Alert = React.forwardRef<DivRef, AlertProps>((props, ref) => {
  const { className, role = "alert", variant, ...rest } = props;

  return (
    <Div
      ref={ref}
      role={role}
      {...rest}
      className={cn(alertVariants({ variant }), className)}
      data-slot={getDataSlot(props, "alert")}
    />
  );
});

Alert.displayName = "Alert";

export type AlertTitleProps = HeadingProps;

export const AlertTitle = React.forwardRef<HeadingRef, AlertTitleProps>(
  (props, ref) => {
    const { as = "h5", className, ...rest } = props;

    return (
      <Heading
        ref={ref}
        as={as}
        {...rest}
        className={cn(
          "mb-1 leading-none font-medium tracking-normal",
          className
        )}
        data-slot={getDataSlot(props, "alert-title")}
      />
    );
  }
);

AlertTitle.displayName = "AlertTitle";

export type AlertDescriptionProps = PProps;

export const AlertDescription = React.forwardRef<PRef, AlertDescriptionProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <P
        ref={ref}
        {...rest}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        data-slot={getDataSlot(props, "alert-description")}
      />
    );
  }
);

AlertDescription.displayName = "AlertDescription";
