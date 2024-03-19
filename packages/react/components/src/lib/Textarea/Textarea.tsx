'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'

export type TextareaRef = HTMLTextAreaElement
export type TextareaProps = TextareaHTMLAttributes<TextareaRef>

/**
 * Render the textarea component.
 * @param children - The children of the textarea.
 * @param rest - The rest of the props of the textarea.
 * @returns The rendered textarea component.
 */
const Textarea = forwardRef<TextareaRef, TextareaProps>(
  ({ children, ...rest }, ref) => {
    return (
      <textarea ref={ref} {...rest}>
        {children}
      </textarea>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
