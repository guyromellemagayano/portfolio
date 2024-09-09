'use client'

import React from 'react'

export type TemplateRef = HTMLTemplateElement
export type TemplateProps = React.HTMLAttributes<TemplateRef>

/**
 * Render the template component.
 * @param {TemplateProps} props - The template component properties
 * @param {TemplateRef} ref - The template component reference
 * @returns The rendered template component
 */
const Template = React.forwardRef<TemplateRef, TemplateProps>(
  ({ children, ...rest }, ref) => {
    return (
      <template ref={ref} {...rest}>
        {children}
      </template>
    )
  }
)

Template.displayName = 'Template'

export default Template
