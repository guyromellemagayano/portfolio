'use client'

import { FieldsetHTMLAttributes, forwardRef } from 'react'

export type FieldsetRef = HTMLFieldSetElement
export type FieldsetProps = FieldsetHTMLAttributes<FieldsetRef>

/**
 * Render the fieldset component.
 * @param {FieldsetProps} props - The fieldset component properties.
 * @param {FieldsetRef} ref - The fieldset component reference.
 * @returns The rendered fieldset component.
 */
export const Fieldset = forwardRef<FieldsetRef, FieldsetProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <fieldset ref={ref} {...rest}>
      {children}
    </fieldset>
  )
})

Fieldset.displayName = 'Fieldset'

export default Fieldset
