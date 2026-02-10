/**
 * @file Button.tsx
 * @author Guy Romelle Magayano
 * @description Button component for the web application.
 */

"use client";

import { type ComponentPropsWithoutRef, type ReactNode, useMemo } from "react";

import * as Headless from "@headlessui/react";
import { useTranslations } from "next-intl";

import { Link } from "@web/components/link";
import { COMMON_FOCUS_CLASSNAMES } from "@web/data/common";
import { cn } from "@web/utils/helpers";

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export type ButtonVariant = "primary" | "secondary";
export type ButtonElementType = typeof Headless.Button;
export type ButtonProps<P extends Record<string, unknown> = {}> = Omit<
  Headless.ButtonProps,
  "children" | "as" | "href"
> &
  P & {
    as?: ButtonElementType;
    href?: ComponentPropsWithoutRef<typeof Link>["href"];
    variant?: ButtonVariant;
    children?: ReactNode;
    isDisabled?: boolean;
    onClick?: () => void;
  };

const COMMON_BUTTON_CLASSNAMES = `inline-flex items-center justify-center gap-x-1.5 rounded-full border ${COMMON_FOCUS_CLASSNAMES[0]} border-transparent px-4 py-2 text-sm font-semibold whitespace-nowrap pointer-events-auto cursor-pointer shadow-lg`;
const DISABLED_COMMON_BUTTON_CLASSNAMES =
  "opacity-45 disabled:pointer-events-none disabled:cursor-not-allowed";

const BUTTON_VARIANT = ({
  isDisabled,
  className,
}: Pick<ButtonProps, "isDisabled" | "className">) => ({
  primary: cn(
    "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 dark:shadow-none",
    isDisabled
      ? DISABLED_COMMON_BUTTON_CLASSNAMES
      : "hover:bg-zinc-800 focus-visible:outline-zinc-800 active:bg-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-200 dark:active:bg-zinc-300",
    className
  ),
  secondary: cn(
    "bg-transparent text-zinc-900 ring-1 ring-zinc-900/10 dark:text-zinc-50 dark:shadow-none dark:ring-zinc-50/10",
    isDisabled
      ? DISABLED_COMMON_BUTTON_CLASSNAMES
      : "hover:bg-zinc-900/10 focus-visible:outline-zinc-600 dark:hover:bg-zinc-50/10 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-500 dark:active:outline-zinc-400",
    className
  ),
});

export function Button<P extends Record<string, unknown> = {}>(
  props: ButtonProps<P>
) {
  const {
    as: Component = Headless.Button,
    variant = "primary",
    className,
    children,
    href,
    isDisabled = false,
    onClick,
    ...rest
  } = props;

  const buttonClassNames = cn(
    COMMON_BUTTON_CLASSNAMES,
    BUTTON_VARIANT({ isDisabled, className })[variant]
  );

  // If href is provided, render a link component instead of a button
  if (href) {
    return (
      <Link
        {...(rest as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
        href={isDisabled ? false : href}
        tabIndex={isDisabled ? -1 : 0}
        className={buttonClassNames}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ButtonElementType>)}
      className={buttonClassNames}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {children}
    </Component>
  );
}

Button.displayName = "Button";

// ============================================================================
// SKIP TO MAIN CONTENT BUTTON COMPONENT
// ============================================================================

export type SkipToMainContentButtonElementType = typeof Button;
export type SkipToMainContentButtonProps<
  P extends Record<string, unknown> = {},
> = Omit<ButtonProps<P>, "as" | "href"> &
  P & {
    as?: SkipToMainContentButtonElementType;
    href?: ComponentPropsWithoutRef<typeof Link>["href"];
  };

export function SkipToMainContentButton<P extends Record<string, unknown> = {}>(
  props: SkipToMainContentButtonProps<P>
) {
  const { as: Component = Button, href, className, ...rest } = props;

  // Internationalization
  const buttonI18n = useTranslations("components.layout");

  // Skip to main content ARIA
  const skipToMainContent = useMemo(
    () => buttonI18n("labels.skipToMainContent"),
    [buttonI18n]
  );

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SkipToMainContentButtonElementType>)}
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2",
        className
      )}
      aria-label={skipToMainContent}
    >
      {skipToMainContent}
    </Component>
  );
}

SkipToMainContentButton.displayName = "SkipToMainContentButton";
