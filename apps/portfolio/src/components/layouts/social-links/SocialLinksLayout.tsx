import { forwardRef, memo } from 'react'

import { Div, type TDivisionProps, type TDivisionRef } from '@react-components'

import { SocialLink, type SocialLinkProps } from '@portfolio/components'

export type SocialLinksLayoutRef = TDivisionRef
export type SocialLinksLayoutProps = TDivisionProps & {
  data?: SocialLinkProps[]
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
        <Div ref={ref} {...rest}>
          {data.map(({ id, ...rest }) => {
            return <SocialLink key={id} {...rest} />
          })}
        </Div>
      )
    }
  )
)

SocialLinksLayout.displayName = 'SocialLinksLayout'

export default SocialLinksLayout
