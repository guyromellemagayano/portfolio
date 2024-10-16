import { forwardRef, memo } from 'react'

import dynamic from 'next/dynamic'

import { Div, type TDivisionProps, type TDivisionRef } from '@react-components'

import type { HomePageAppDataQuery } from '@portfolio/graphql'

// Dynamic imports
const SocialLink = dynamic(() =>
  import('@portfolio/components').then(mod => mod.SocialLink)
)

export type SocialLinksLayoutRef = TDivisionRef
export type SocialLinksLayoutProps = TDivisionProps & {
  data?: HomePageAppDataQuery['links']['social']
}

/**
 * Render the social links layout component.
 * @param {SocialLinksLayoutProps} props - The component props
 * @param {SocialLinksLayoutRef} ref - The component reference
 * @returns The rendered social links layout component
 */
const SocialLinksLayout = memo(
  forwardRef<SocialLinksLayoutRef, SocialLinksLayoutProps>(
    ({ data, ...rest }, ref) => {
      if (!data) return null

      return (
        data && (
          <Div ref={ref} {...rest}>
            {data?.map(({ id, ...rest }) => {
              return <SocialLink key={id} {...rest} />
            })}
          </Div>
        )
      )
    }
  )
)

SocialLinksLayout.displayName = 'SocialLinksLayout'

export default SocialLinksLayout
