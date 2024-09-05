import React from 'react'

export type SectionRef = HTMLElement
export type SectionProps = React.HTMLAttributes<SectionRef>

/**
 * Render the section component.
 * @param {SectionProps} props - The section component properties
 * @param {SectionRef} ref - The section component reference
 * @returns The rendered section component
 */
const Section = React.forwardRef<SectionRef, SectionProps>(
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
