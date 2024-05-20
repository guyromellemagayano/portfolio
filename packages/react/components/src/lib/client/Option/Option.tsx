'use client'

import { OptionHTMLAttributes, forwardRef } from 'react'

export type OptionRef = HTMLOptionElement
export type OptionProps = OptionHTMLAttributes<OptionRef>

/**
 * Render the option component.
 * @param {OptionProps} props - The option component properties.
 * @param {OptionRef} ref - The option component reference.
 * @returns The rendered option component.
 */
const Option = forwardRef<OptionRef, OptionProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <option ref={ref} {...rest}>
      {children}
    </option>
  )
})

Option.displayName = 'Option'

export default Option
