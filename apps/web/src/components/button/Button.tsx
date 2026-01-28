/**
 * @file Button.tsx
 * @author Guy Romelle Magayano
 * @description Button component for the web application.
 */

"use client";

import React from "react";

import Link from "next/link";

import { cn } from "@web/utils/helpers";

type ButtonElementType = "button";
type ButtonVariant = "primary" | "secondary";

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

export type ButtonProps<
  T extends ButtonElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
    variant?: ButtonVariant;
    href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  };

export function Button<
  T extends ButtonElementType,
  P extends Record<string, unknown> = {},
>(props: ButtonProps<T, P>) {
  const {
    as: Component = "button",
    variant = "primary",
    className,
    children,
    href,
    ...rest
  } = props;

  if (!children) return null;

  // Common button class name
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
    BUTTON_VARIANT[variant],
    className
  );

  // If href is provided, render a link component instead of a button
  if (href) {
    return (
      <Link
        {...(rest as Omit<React.ComponentPropsWithRef<typeof Link>, "href">)}
        href={href}
        className={buttonClassName}
      >
        {children}
      </Link>
    );
  }

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<T>)}
      role="button"
      className={buttonClassName}
    >
      {children}
    </Component>
  );
}

Button.displayName = "Button";
