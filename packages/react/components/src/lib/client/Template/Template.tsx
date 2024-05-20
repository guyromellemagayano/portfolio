'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type TemplateRef = HTMLTemplateElement
export type TemplateProps = HTMLAttributes<TemplateRef>

/**
 * Render the template component.
 * @param {TemplateProps} props - The template component properties.
 * @param {TemplateRef} ref - The template component reference.
 * @returns The rendered template component.
 */
const Template = forwardRef<TemplateRef, TemplateProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <template ref={ref} {...rest}>
      {children}
    </template>
  )
})

Template.displayName = 'Template'

export default Template
