import React from 'react'

export type TTemplateRef = HTMLTemplateElement
export type TTemplateProps = React.HTMLAttributes<TTemplateRef>

/**
 * Render the template component.
 * @param {TTemplateProps} props - The template component properties
 * @param {TTemplateRef} ref - The template component reference
 * @returns The rendered template component
 */
const Template = React.forwardRef<TTemplateRef, TTemplateProps>(
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
