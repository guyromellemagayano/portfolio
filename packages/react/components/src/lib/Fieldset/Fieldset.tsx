import { FieldsetHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type FieldsetRef = HTMLFieldSetElement
export type FieldsetProps = FieldsetHTMLAttributes<FieldsetRef>

/**
 * Render the fieldset component.
 * @param children - The children of the fieldset.
 * @param rest - The rest of the props of the fieldset.
 * @returns The rendered fieldset component.
 */
const Fieldset = forwardRef<FieldsetRef, FieldsetProps>(
  ({ children, ...rest }, ref) => {
    return (
      <fieldset ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </fieldset>
    )
  }
)

Fieldset.displayName = 'Fieldset'

export default Fieldset
