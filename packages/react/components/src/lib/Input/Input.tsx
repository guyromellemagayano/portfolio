import { InputHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type InputRef = HTMLInputElement
export type InputProps = InputHTMLAttributes<InputRef>

/**
 * Render the input component.
 * @param type - The type of the input.
 * @param rest - The rest of the props of the input.
 * @returns The rendered input component.
 */
const Input = forwardRef<InputRef, InputProps>(
  ({ type = 'text', ...rest }, ref) => {
    return <input ref={ref} type={type} {...rest} id={rest.id ?? customId} />
  }
)

Input.displayName = 'Input'

export default Input