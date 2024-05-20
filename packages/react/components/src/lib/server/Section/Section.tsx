import { HTMLAttributes, forwardRef } from 'react'

export type SectionRef = HTMLElement
export type SectionProps = HTMLAttributes<SectionRef>

/**
 * Render the section component.
 * @param {SectionProps} props - The section component properties.
 * @param {SectionRef} ref - The section component reference.
 * @returns The rendered section component.
 */
const Section = forwardRef<SectionRef, SectionProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  )
})

Section.displayName = 'Section'

export default Section
