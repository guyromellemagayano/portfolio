import { forwardRef, memo } from 'react'

import {
  Div,
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import {
  SocialLink,
  SocialLinkProps
} from '@guy-romelle-magayano/portfolio/components'

export type SocialLinksLayoutRef = DivisionRef
export type SocialLinksLayoutProps = DivisionProps & {
  data?: Array<SocialLinkProps>
}

/**
 * Render the social links layout component.
 * @param {SocialLinksLayoutProps} props - The props of the social links layout.
 * @param {SocialLinksLayoutRef} ref - The reference of the social links layout.
 * @returns The rendered social links layout component.
 */
const SocialLinksLayout = memo(
  forwardRef<SocialLinksLayoutRef, SocialLinksLayoutProps>(
    ({ data, ...rest }, ref) => {
      return (
        data &&
        data?.length > 0 && (
          <Div {...rest} ref={ref}>
            {data.map((rest, index: number) => (
              <SocialLink key={index} {...rest} />
            ))}
          </Div>
        )
      )
    }
  )
)

SocialLinksLayout.displayName = 'SocialLinksLayout'

export default SocialLinksLayout
