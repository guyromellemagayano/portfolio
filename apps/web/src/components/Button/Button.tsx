"use client";

import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { AppContext } from "@web/app/context";
import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { BUTTON_I18N } from "./Button.i18n";

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

type ButtonElementType = "button";
type ButtonVariant = "default" | "article-nav";
type ButtonVariantStyles = "primary" | "secondary";

const BUTTON_VARIANT_STYLES: Record<ButtonVariantStyles, string> = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

export type ButtonProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "button" and "Link" are allowed */
    as?: T;
    /** The href for link functionality */
    href?: string;
    /** The variant of the button */
    variant?: ButtonVariant;
    /** The variant style of the button */
    variantStyle?: ButtonVariantStyles;
  };

export const Button = setDisplayName(function Button<
  T extends ButtonElementType,
>(props: ButtonProps<T>) {
  const {
    as: Component = "button",
    variant = "default",
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

  // Define a mapping of variants to components
  const variantComponentMap: Record<ButtonVariant, React.ElementType> = {
    default: Component,
    "article-nav": ArticleNav,
  };

  // Choose the component based on a variant
  const VariantComponent = variantComponentMap[variant] || Component;

  // For the default variant, use a string element directly
  // Respect the `as` prop if provided, otherwise use "button" from a variant map
  if (variant === "default") {
    return (
      <Component
        {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
        role="button"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
          BUTTON_VARIANT_STYLES[variantStyle],
          className
        )}
        {...createComponentProps(componentId, `button-${variant}`, isDebugMode)}
      >
        {children}
      </Component>
    );
  }

  const variantProps = {
    ...rest,
    as: Component,
    variant,
    debugId,
    debugMode,
  };

  return <VariantComponent {...variantProps}>{children}</VariantComponent>;
});

// ============================================================================
// MEMOIZED BUTTON COMPONENT
// ============================================================================

export const MemoizedButton = React.memo(Button);

// ============================================================================
// ARTICLE NAV BUTTON COMPONENT
// ============================================================================

const ArticleNav = setDisplayName(function ArticleNav(
  props: ButtonProps<ButtonElementType>
) {
  const {
    as: Component = "button",
    variant = "article-nav",
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Article nav button component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  let router = useRouter();
  let { previousPathname } = useContext(AppContext);

  if (!previousPathname) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role="button"
      className={cn(
        "group articleNavButtondark:hover:ring-white/20 mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700",
        className
      )}
      aria-label={BUTTON_I18N.goBackToArticles}
      onClick={() => router.back()}
      {...createComponentProps(componentId, `button-${variant}`, isDebugMode)}
    >
      <Icon
        name="arrow-left"
        className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
        aria-hidden="true"
        debugMode={isDebugMode}
        debugId={componentId}
      />
      <span
        className="sr-only"
        aria-hidden="true"
        {...createComponentProps(
          componentId,
          `${variant}-button-description`,
          isDebugMode
        )}
      >
        {BUTTON_I18N.goBackToArticles}
      </span>
    </Component>
  );
});
