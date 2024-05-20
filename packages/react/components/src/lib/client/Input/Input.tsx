'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

export type InputRef = HTMLInputElement
export type InputProps = InputHTMLAttributes<InputRef>

/**
 * Render the input component.
 * @param {InputProps} props - The input component properties.
 * @param {InputRef} ref - The input component reference.
 * @returns The rendered input component.
 */
const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const { type = 'text', ...rest } = props

  return <input ref={ref} type={type} {...rest} />
})

Input.displayName = 'Input'

export default Input
