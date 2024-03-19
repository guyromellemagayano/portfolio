import { OptionHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type OptionRef = HTMLOptionElement
export type OptionProps = OptionHTMLAttributes<OptionRef>

/**
 * Render the option component.
 * @param children - The children of the option.
 * @param rest - The rest of the props of the option.
 * @returns The rendered option component.
 */
const Option = forwardRef<OptionRef, OptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <option ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </option>
    )
  }
)

Option.displayName = 'Option'

export default Option