import React from 'react'

export type TSectionRef = HTMLElement
export type TSectionProps = React.HTMLAttributes<TSectionRef>

/**
 * Render the section component.
 * @param {TSectionProps} props - The section component properties
 * @param {TSectionRef} ref - The section component reference
 * @returns The rendered section component
 */
const Section = React.forwardRef<TSectionRef, TSectionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <section ref={ref} {...rest}>
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section
