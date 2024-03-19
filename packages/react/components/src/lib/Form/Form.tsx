import { FormHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type FormRef = HTMLFormElement
export type FormProps = FormHTMLAttributes<FormRef>

/**
 * Render the form component.
 * @param children - The children of the form.
 * @param rest - The rest of the props of the form.
 * @returns The rendered form component.
 */
const Form = forwardRef<FormRef, FormProps>(({ children, ...rest }, ref) => {
  return (
    <form ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </form>
  )
})

Form.displayName = 'Form'

export default Form
