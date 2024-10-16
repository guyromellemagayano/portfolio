import { memo } from 'react'

import { Path, Svg, type TSvgProps } from '@react-components'

/**
 * Renders an SVG image of a chevron pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a chevron pointing down.
 */
const ChevronDownSvg = memo(({ ...rest }: TSvgProps) => {
  return (
    <Svg aria-hidden="true" viewBox="0 0 8 6" {...rest}>
      <Path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  )
})

ChevronDownSvg.displayName = 'ChevronDownSvg'

export default ChevronDownSvg
