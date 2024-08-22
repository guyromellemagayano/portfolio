import { forwardRef, memo } from 'react'

import {
  Div,
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { isEmpty, isValidData } from '@guy-romelle-magayano/react-utils'

import {
  SocialLink,
  SocialLinkProps
} from '@guy-romelle-magayano/portfolio/components'

export type SocialLinksLayoutRef = DivisionRef
export type SocialLinksLayoutProps = DivisionProps & {
  data?: SocialLinkProps[]
}

/**
 * Render the social links layout component.
 * @param {SocialLinksLayoutProps} props - The component props
 * @param {SocialLinksLayoutRef} ref - The component reference
 * @returns The rendered JSX component
 */
const SocialLinksLayout = memo(
  forwardRef<SocialLinksLayoutRef, SocialLinksLayoutProps>(
    ({ data, ...rest }, ref) => {
      const validData =
        data?.filter((item): item is SocialLinkProps =>
          isValidData(item, 'object')
        ) || null

      if (!validData || isEmpty(validData)) {
        return null
      }

      return (
        <Div ref={ref} {...rest}>
          {validData.map(({ id, ...rest }) => {
            return <SocialLink key={id} {...rest} />
          })}
        </Div>
      )
    }
  )
)

SocialLinksLayout.displayName = 'SocialLinksLayout'

export default SocialLinksLayout
