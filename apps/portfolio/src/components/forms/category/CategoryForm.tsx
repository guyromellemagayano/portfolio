'use client'

import { forwardRef } from 'react'

import { Form, TFormProps, TFormRef } from '@react-components'

export type CategoryFormRef = TFormRef
export type CategoryFormProps = TFormProps

/**
 * Renders the category form component.
 * @param {CategoryFormProps} props - The component props
 * @param {CategoryFormRef} ref - The component reference
 * @returns The rendered category form component
 */
const CategoryForm = forwardRef<CategoryFormRef, CategoryFormProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Form ref={ref} {...rest}>
        {children}
      </Form>
    )
  }
)

CategoryForm.displayName = 'CategoryForm'

export default CategoryForm
