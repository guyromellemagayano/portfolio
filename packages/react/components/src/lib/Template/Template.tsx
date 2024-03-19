import { HTMLAttributes, forwardRef } from 'react'

export type TemplateRef = HTMLTemplateElement
export type TemplateProps = HTMLAttributes<TemplateRef>

/**
 * Render the template component.
 * @param children - The children of the template.
 * @param rest - The rest of the props of the template.
 * @returns The rendered template component.
 */
const Template = forwardRef<TemplateRef, TemplateProps>(
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
