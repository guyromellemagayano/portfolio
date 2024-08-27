'use client'

import React from 'react'

export type TextareaRef = HTMLTextAreaElement
export type TextareaProps = React.TextareaHTMLAttributes<TextareaRef>

/**
 * Render the textarea component
 * @param {TextareaProps} props - The textarea component properties
 * @param {TextareaRef} ref - The textarea component reference
 * @returns The rendered textarea component
 */
const Textarea = React.forwardRef<TextareaRef, TextareaProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <textarea ref={ref} {...rest}>
      {children}
    </textarea>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
