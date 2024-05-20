'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonRef = HTMLButtonElement
export type ButtonProps = ButtonHTMLAttributes<ButtonRef>

/**
 * Render the button component.
 * @param {ButtonProps} props - The button component properties.
 * @param {ButtonRef} ref - The button component reference.
 * @returns The rendered button component.
 */
const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const { type = 'button', children, ...rest } = props

  return (
    <button ref={ref} type={type} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
