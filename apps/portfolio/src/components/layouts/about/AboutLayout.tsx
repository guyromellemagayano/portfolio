import { forwardRef, memo } from 'react'

import {
  ContentLayout,
  type ContentLayoutProps,
  type ContentLayoutRef
} from '@guy-romelle-magayano/portfolio/components'

export type AboutLayoutRef = ContentLayoutRef
export type AboutLayoutProps = ContentLayoutProps

/**
 * Renders the about layout component.
 * @param {AboutLayoutProps} props - The component props
 * @param {AboutLayoutRef} ref - The component reference
 * @returns The rendered JSX component.
 */
const AboutLayout = memo(
  forwardRef<ContentLayoutRef, ContentLayoutProps>(
    ({ title, intro, ...rest }, ref) => {
      return (
        <ContentLayout.Simple ref={ref} title={title} intro={intro} {...rest} />
      )
    }
  )
)

AboutLayout.displayName = 'AboutLayout'

export default AboutLayout
