import React from 'react'

export type TTextareaRef = HTMLTextAreaElement
export type TTextareaProps = React.TextareaHTMLAttributes<TTextareaRef>

/**
 * Render the textarea component.
 * @param {TTextareaProps} props - The textarea component properties
 * @param {TTextareaRef} ref - The textarea component reference
 * @returns The rendered textarea component
 */
const Textarea = React.forwardRef<TTextareaRef, TTextareaProps>(
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
