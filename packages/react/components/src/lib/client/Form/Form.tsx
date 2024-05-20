'use client'

import { FormHTMLAttributes, forwardRef } from 'react'

export type FormRef = HTMLFormElement
export type FormProps = FormHTMLAttributes<FormRef>

/**
 * Render the form component.
 * @param {FormProps} props - The form component properties.
 * @param {FormRef} ref - The form component reference.
 * @returns The rendered form component.
 */
const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <form ref={ref} {...rest}>
      {children}
    </form>
  )
})

Form.displayName = 'Form'

export default Form
