import { forwardRef, memo } from 'react'

import {
  ContentLayout,
  type ContentLayoutProps,
  type ContentLayoutRef
} from '@portfolio/components'

export type AboutLayoutRef = ContentLayoutRef
export type AboutLayoutProps = ContentLayoutProps

/**
 * Renders the about layout component.
 * @param {AboutLayoutProps} props - The component props
 * @param {AboutLayoutRef} ref - The component reference
 * @returns The rendered about layout component
 */
const AboutLayout = memo(
  forwardRef<AboutLayoutRef, AboutLayoutProps>(
    ({ title, intro, children, ...rest }, ref) => {
      if (!title && !intro && !children) return null

      return (
        <ContentLayout.Simple ref={ref} title={title} intro={intro} {...rest}>
          {children}
        </ContentLayout.Simple>
      )
    }
  )
)

AboutLayout.displayName = 'AboutLayout'

export default AboutLayout
