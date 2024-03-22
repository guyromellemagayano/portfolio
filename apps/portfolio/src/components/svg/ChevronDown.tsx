import { SharedRC } from '@guy-romelle-magayano/react-components'

import { TCommonSvgImageProps } from '@guy-romelle-magayano/portfolio/types/common'

/**
 * Renders an SVG image of a chevron pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a chevron pointing down.
 */
const ChevronDownSvg = (rest: TCommonSvgImageProps) => {
  return (
    <SharedRC.Svg viewBox="0 0 8 6" aria-hidden="true" {...rest}>
      <SharedRC.Path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SharedRC.Svg>
  )
}

export default ChevronDownSvg
