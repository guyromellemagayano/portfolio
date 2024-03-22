import { SharedRC } from '@guy-romelle-magayano/react-components'

import { TCommonSvgImageProps } from '@guy-romelle-magayano/portfolio/types/common'

/**
 * Renders an SVG image of an arrow pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of an arrow pointing down.
 */
const ArrowDownSvg = (rest: TCommonSvgImageProps) => {
  return (
    <SharedRC.Svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...rest}>
      <SharedRC.Path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SharedRC.Svg>
  )
}

export default ArrowDownSvg
