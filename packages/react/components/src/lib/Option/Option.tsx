import React from 'react'

export type TOptionRef = HTMLOptionElement
export type TOptionProps = React.OptionHTMLAttributes<TOptionRef>

/**
 * Render the option component.
 * @param {TOptionProps} props - The option component properties
 * @param {TOptionRef} ref - The option component reference
 * @returns The rendered option component
 */
const Option = React.forwardRef<TOptionRef, TOptionProps>(
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
