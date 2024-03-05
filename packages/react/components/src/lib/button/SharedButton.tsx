import { ButtonHTMLAttributes, ForwardedRef, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '../../components'

import { cn, isEmpty } from '@guy-romelle-magayano/react-utils/server'

type SharedButtonRef = HTMLButtonElement
type ButtonType = 'button' | 'submit' | 'reset'
type ButtonVariant = 'primary' | 'secondary'

type TSharedButtonProps = ButtonHTMLAttributes<SharedButtonRef> &
  TCommonSharedComponentsProps & {
    type?: ButtonType
    variant?: ButtonVariant
  }

type TGenerateButtonClassName = (
  variant: ButtonVariant,
  className?: TSharedButtonProps['className']
) => string

/**
 * Generate the class name for the button.
 * @param variant - The visual style of the button.
 * @param className - Additional CSS classes to apply to the button.
 * @returns The class name for the button.
 */
const generateButtonClassName: TGenerateButtonClassName = (
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
export const SharedButton = forwardRef<SharedButtonRef, TSharedButtonProps>(
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
