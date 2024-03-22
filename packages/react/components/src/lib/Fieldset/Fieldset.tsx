'use client'

import { FieldsetHTMLAttributes, forwardRef } from 'react'

export type FieldsetRef = HTMLFieldSetElement
export type FieldsetProps = FieldsetHTMLAttributes<FieldsetRef>

/**
 * Render the fieldset component.
 * @param children - The children of the fieldset.
 * @param rest - The rest of the props of the fieldset.
 * @returns The rendered fieldset component.
 */
export const Fieldset = forwardRef<FieldsetRef, FieldsetProps>(
  ({ children, ...rest }, ref) => {
    return (
      <fieldset ref={ref} {...rest}>
        {children}
      </fieldset>
    )
  }
)

Fieldset.displayName = 'Fieldset'

export default Fieldset
