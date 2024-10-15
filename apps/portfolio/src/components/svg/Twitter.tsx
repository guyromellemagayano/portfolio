'use client'

import { memo } from 'react'

import { Path, Svg, type TSvgProps } from '@react-components'

/**
 * Renders an SVG image of a Twitter logo.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a Twitter logo.
 */
const TwitterSvg = memo(({ ...rest }: TSvgProps) => {
  return (
    <Svg aria-hidden="true" fill="currentColor" viewBox="0 0 512 512" {...rest}>
      <Path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z" />
    </Svg>
  )
})

TwitterSvg.displayName = 'TwitterSvg'

export default TwitterSvg
