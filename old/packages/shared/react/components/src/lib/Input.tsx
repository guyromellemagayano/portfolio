import React from 'react'

export type TInputRef = HTMLInputElement
export type TInputProps = React.InputHTMLAttributes<TInputRef>

/**
 * Render the input component
 * @param {TInputProps} props - The input component properties
 * @param {TInputRef} ref - The input component reference
 * @returns The rendered input component
 */
export const Input = React.forwardRef<TInputRef, TInputProps>(
  ({ type = 'text', ...rest }, ref) => {
    return <input ref={ref} type={type} {...rest} />
  }
)

Input.displayName = 'Input'
