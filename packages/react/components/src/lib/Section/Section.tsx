import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type SectionRef = HTMLElement
export type SectionProps = HTMLAttributes<SectionRef>

/**
 * Render the section component.
 * @param children - The children of the section.
 * @param rest - The rest of the props of the section.
 * @returns The rendered section component.
 */
const Section = forwardRef<SectionRef, SectionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <section ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section
