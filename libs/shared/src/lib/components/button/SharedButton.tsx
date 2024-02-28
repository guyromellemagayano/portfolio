'use client'

import { ButtonHTMLAttributes, ForwardedRef, forwardRef, useId } from 'react'

import { cn, isEmpty } from '@guy-romelle-magayano/shared'

type SharedButtonRef = HTMLButtonElement

type ButtonType = 'button' | 'submit' | 'reset'

type ButtonVariant = 'primary' | 'secondary'

/* eslint-disable-next-line */
interface SharedButtonProps extends ButtonHTMLAttributes<SharedButtonRef> {
  type?: ButtonType
  variant?: ButtonVariant
  [key: string]: any
}

type GenerateButtonClassName = (
  variant: ButtonVariant,
  className?: SharedButtonProps['className']
) => string

/**
 * Generate the class name for the button.
 * @param variant - The visual style of the button.
 * @param className - Additional CSS classes to apply to the button.
 * @returns The class name for the button.
 */
const generateButtonClassName: GenerateButtonClassName = (
  variant,
  className
) => {
  const baseStyle =
      'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
      secondary:
        'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'
    }

  return cn(baseStyle, variantStyles[variant], className)
}

/**
 * Render the shared button component.
 * @param type - The type of the shared button.
 * @param variant - The variant of the shared button.
 * @param id - The ID of the shared button.
 * @param children - The children of the shared button.
 * @param rest - The rest of the props of the shared button.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared button component.
 */
export const SharedButton = forwardRef<SharedButtonRef, SharedButtonProps>(
  (
    { type = 'button', variant = 'primary', id, children, ...rest },
    ref: ForwardedRef<SharedButtonRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const updatedClassName = generateButtonClassName(
        variant,
        rest['data-tw'] ?? rest['className']
      ),
      customId = useId()

    if (!isEmpty(rest['data-tw'])) {
      rest['data-tw'] = updatedClassName
    } else {
      rest['className'] = updatedClassName
    }

    return (
      <button ref={ref} type={type} {...rest} id={id ?? customId}>
        {children}
      </button>
    )
  }
)

SharedButton.displayName = 'SharedButton'
