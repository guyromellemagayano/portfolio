import React from 'react'

export type FieldsetRef = HTMLFieldSetElement
export type FieldsetProps = React.FieldsetHTMLAttributes<FieldsetRef>

/**
 * Render the fieldset component.
 * @param {FieldsetProps} props - The fieldset component properties
 * @param {FieldsetRef} ref - The fieldset component reference
 * @returns The rendered fieldset component
 */
export const Fieldset = React.forwardRef<FieldsetRef, FieldsetProps>(
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
