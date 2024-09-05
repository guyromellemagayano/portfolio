'use client'

import React from 'react'

export type OptionRef = HTMLOptionElement
export type OptionProps = React.OptionHTMLAttributes<OptionRef>

/**
 * Render the option component.
 * @param {OptionProps} props - The option component properties
 * @param {OptionRef} ref - The option component reference
 * @returns The rendered option component
 */
const Option = React.forwardRef<OptionRef, OptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <option ref={ref} {...rest}>
        {children}
      </option>
    )
  }
)

Option.displayName = 'Option'

export default Option
