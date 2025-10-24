import React from "react";

import { default as NextLink } from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { ArticleNavButton } from "./_internal";

// ============================================================================
// BUTTON VARIANT STYLES
// ============================================================================

type ButtonVariant = "primary" | "secondary";
const BUTTON_VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

// ============================================================================
// BUTTON COMPONENT TYPES & INTERFACES
// ============================================================================

export type ButtonProps = CommonComponentProps & {
  variant?: ButtonVariant;
} & (
    | (React.ComponentPropsWithRef<"button"> & { href?: undefined })
    | React.ComponentPropsWithRef<typeof NextLink>
  );
export type ButtonComponent = React.FC<ButtonProps>;

// ============================================================================
// BASE BUTTON COMPONENT
// ============================================================================

const BaseButton: ButtonComponent = setDisplayName(function BaseButton(props) {
  const {
    as: Component = typeof props.href === "undefined" ? "button" : NextLink,
    variant = "primary",
    className,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  if (!children) return null;

  const element = (
    <Component
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
        BUTTON_VARIANT_STYLES[variant],
        className
      )}
      {...createComponentProps(componentId, "button", isDebugMode)}
    >
      {children}
    </Component>
  );

  return element;
});

// ============================================================================
// MEMOIZED BUTTON COMPONENT
// ============================================================================

const MemoizedButton = React.memo(BaseButton);

// ============================================================================
// MAIN BUTTON COMPONENT
// ============================================================================

export const Button = setDisplayName(function Button(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedButton : BaseButton;
  const element = <Component {...rest}>{children}</Component>;
  return element;
} as ButtonCompoundComponent);

// ============================================================================
// BUTTON COMPOUND COMPONENTS
// ============================================================================

type ButtonCompoundComponent = React.FC<ButtonProps> & {
  /** A article navigation button component that provides a consistent layout for the article navigation button. */
  ArticleNav: typeof ArticleNavButton;
};

Button.ArticleNav = ArticleNavButton;
