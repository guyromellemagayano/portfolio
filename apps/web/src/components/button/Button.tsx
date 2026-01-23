/**
 * @file Button.tsx
 * @author Guy Romelle Magayano
 * @description Button component for the web application.
 */

"use client";

import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

const ButtonElementType = "button";

type ButtonVariantStyles = "primary" | "secondary";

const BUTTON_VARIANT_STYLES: Record<ButtonVariantStyles, string> = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

export interface ButtonProps
  extends
    React.ComponentPropsWithRef<typeof ButtonElementType>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {
  variantStyle?: ButtonVariantStyles;
}

function ButtonComponent(props: ButtonProps) {
  const {
    as: Component = ButtonElementType,
    variantStyle = "primary",
    className,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Button component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  if (!children) return null;

  return (
    <Component
      {...rest}
      role="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
        BUTTON_VARIANT_STYLES[variantStyle],
        className
      )}
      {...createComponentProps(componentId, "button", isDebugMode)}
    >
      {children}
    </Component>
  );
}

export const Button = setDisplayName(ButtonComponent);
