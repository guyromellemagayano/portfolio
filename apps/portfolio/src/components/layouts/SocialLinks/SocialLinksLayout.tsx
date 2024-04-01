import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'
import { CommonComponentsProps } from '@guy-romelle-magayano/react-components/types'

import { isEmpty } from '@guy-romelle-magayano/react-utils'

import { SocialLinkProps } from '@guy-romelle-magayano/portfolio/components/Links/Social'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const SocialLink = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Links/Social').then(
    mod => mod.SocialLink
  )
)

export type SocialLinksLayoutRef = DivisionRef
export type SocialLinksLayoutProps = DivisionProps &
  CommonComponentsProps & {
    data: Array<SocialLinkProps>
  }

/**
 * Render the social links layout component.
 * @param data - The data of the social links layout.
 * @param id - The id of the social links layout.
 * @param children - The children of the social links layout.
 * @returns The rendered social links layout component.
 */
const SocialLinksLayout = forwardRef<
  SocialLinksLayoutRef,
  SocialLinksLayoutProps
>(({ data, id, ...rest }, ref) => {
  return (
    (!isEmpty(data) && (
      <Div ref={ref} {...rest}>
        {data?.map((rest, index: number) => (
          <SocialLink key={index} {...rest} />
        ))}
      </Div>
    )) ||
    undefined
  )
})

SocialLinksLayout.displayName = 'SocialLinksLayout'

export default SocialLinksLayout
