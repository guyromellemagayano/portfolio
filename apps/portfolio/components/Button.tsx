'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'

import type { TWithChildren, TWithClassName } from '@/types/common'

export type ButtonVariant = 'primary' | 'secondary'

export type TButtonProps<T = object> = T &
  ButtonHTMLAttributes<HTMLButtonElement> &
  TWithChildren<T> &
  TWithClassName<T> & {
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary'
    className?: string
  }

/**
 * Generate the class name for the button.
 * @param variant - The visual style of the button.
 * @param className - Additional CSS classes to apply to the button.
 * @returns The class name for the button.
 */
const generateButtonClassName = (
  variant: ButtonVariant,
  className?: string
): string => {
  const baseStyle =
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none'
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
    secondary:
      'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'
  }

  return clsx(baseStyle, variantStyles[variant], className)
}

/**
 * Renders the button component.
 * @param type - The type of the button.
 * @param variant - The visual style of the button.
 * @param className - Additional CSS classes to apply to the button.
 * @param children - The children of the button.
 * @param rest - The rest of the props of the button.
 * @returns The rendered button component.
 */
const Button = ({
  type = 'button',
  variant = 'primary',
  className,
  children,
  ...rest
}: TButtonProps): ReactNode => {
  const updatedClassName = generateButtonClassName(variant, className)

  return (
    <button type={type} className={updatedClassName} {...rest}>
      {children}
    </button>
  )
}

export default Button
