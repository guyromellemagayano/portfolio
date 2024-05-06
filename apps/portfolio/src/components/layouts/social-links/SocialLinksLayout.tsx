import { forwardRef, memo } from 'react'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { isArrayType, isEmpty } from '@guy-romelle-magayano/react-utils'

import {
  SocialLink,
  type SocialLinkProps
} from '@guy-romelle-magayano/portfolio/components/links/social'

export type SocialLinksLayoutRef = DivisionRef
export type SocialLinksLayoutProps = DivisionProps & {
  data?: Array<SocialLinkProps>
}

/**
 * Render the social links layout component.
 * @param data - The data of the social links layout.
 * @param children - The children of the social links layout.
 * @returns The rendered social links layout component.
 */
const SocialLinksLayout = memo(
  forwardRef<SocialLinksLayoutRef, SocialLinksLayoutProps>(
    ({ data, ...rest }, ref) => {
      return (
        !isEmpty(data) &&
        isArrayType(data) && (
          <Div ref={ref} {...rest}>
            {data?.map((rest, index: number) => (
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
