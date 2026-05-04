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
  type PrimitiveElement,
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

export type AlertIconProps = DivProps;
export type AlertActionsProps = DivProps;

export type AlertProps = Omit<DivProps, "title"> &
  VariantProps<typeof alertVariants> & {
    actions?: React.ReactNode;
    actionsProps?: AlertActionsProps;
    description?: React.ReactNode;
    descriptionProps?: AlertDescriptionProps;
    icon?: React.ReactNode;
    iconProps?: AlertIconProps;
    title?: React.ReactNode;
    titleProps?: AlertTitleProps;
  };

function hasRenderableContent(value: React.ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

export const Alert = React.forwardRef<DivRef, AlertProps>((props, ref) => {
  const {
    actions,
    actionsProps,
    children,
    className,
    description,
    descriptionProps,
    icon,
    iconProps,
    role = "alert",
    title,
    titleProps,
    variant,
    ...rest
  } = props;
  const hasIcon = hasRenderableContent(icon);
  const hasTitle = hasRenderableContent(title);
  const hasDescription = hasRenderableContent(description);
  const hasActions = hasRenderableContent(actions);

  return (
    <Div
      ref={ref}
      role={role}
      {...rest}
      className={cn(alertVariants({ variant }), className)}
      data-slot={getDataSlot(props, "alert")}
    >
      <Div className="flex gap-3" data-slot="alert-layout">
        {hasIcon ? <AlertIcon {...iconProps}>{icon}</AlertIcon> : null}
        <Div className="min-w-0 flex-1" data-slot="alert-content">
          {hasTitle ? <AlertTitle {...titleProps}>{title}</AlertTitle> : null}
          {hasDescription ? (
            <AlertDescription {...descriptionProps}>
              {description}
            </AlertDescription>
          ) : null}
          {children}
          {hasActions ? (
            <AlertActions {...actionsProps}>{actions}</AlertActions>
          ) : null}
        </Div>
      </Div>
    </Div>
  );
});

Alert.displayName = "Alert";

export type AlertTitleProps = HeadingProps<PrimitiveElement>;

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

export const AlertIcon = React.forwardRef<DivRef, AlertIconProps>(
  (props, ref) => {
    const { "aria-hidden": ariaHidden = true, className, ...rest } = props;

    return (
      <Div
        ref={ref}
        aria-hidden={ariaHidden}
        {...rest}
        className={cn("mt-0.5 shrink-0", className)}
        data-slot={getDataSlot(props, "alert-icon")}
      />
    );
  }
);

AlertIcon.displayName = "AlertIcon";

export const AlertActions = React.forwardRef<DivRef, AlertActionsProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn("mt-3 flex flex-wrap items-center gap-2", className)}
        data-slot={getDataSlot(props, "alert-actions")}
      />
    );
  }
);

AlertActions.displayName = "AlertActions";
