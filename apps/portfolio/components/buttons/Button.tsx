'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { ButtonVariant, TButtonProps } from 'types/components'

/**
 * Generate a class name for the button based on its variant.
 * @param {ButtonVariant} variant - The visual style of the button (e.g. "primary", "secondary", "outline").
 * @param {String} className - Additional CSS classes to apply to the button.
 * @returns {String} The generated class name.
 */
function generateButtonClassName(
  variant: ButtonVariant,
  className?: string
): string {
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
 * Render a button component.
 * @param {String} type - The type of the button (e.g. "button", "submit").
 * @param {ButtonVariant} variant - The visual style of the button (e.g. "primary", "secondary", "outline").
 * @param {String} className - Additional CSS classes to apply to the button.
 * @param {String} href - The URL to link to.
 * @param {any} children - The content to render inside the button.
 * @returns {JSX.Element} The rendered component.
 */
export default function Button({
  type = 'button',
  variant = 'primary',
  className,
  href,
  children,
  ...rest
}: TButtonProps): JSX.Element {
  const updatedClassName = generateButtonClassName(variant, className)

  if (href) {
    return (
      <Link href={href} passHref>
        <span className={updatedClassName}>{children}</span>
      </Link>
    )
  }

  return (
    <button type={type} className={updatedClassName} {...rest}>
      {children}
    </button>
  )
}
