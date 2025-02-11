'use client';

import { type FormHTMLAttributes, forwardRef } from 'react';

export type TFormRef = HTMLFormElement;
export type TFormProps = FormHTMLAttributes<TFormRef>;

/**
 * Render the form component.
 * @param {TFormProps} props - The form component properties
 * @param {TFormRef} ref - The form component reference
 * @returns The rendered form component
 */
const Form = forwardRef<TFormRef, TFormProps>(({ children, ...rest }, ref) => {
  return (
    <form ref={ref} {...rest}>
      {children}
    </form>
  );
});

Form.displayName = 'Form';

export default Form;
