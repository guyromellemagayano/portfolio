import { SharedRC } from '@guy-romelle-magayano/react-components'

import { TCommonSvgImageProps } from '@guy-romelle-magayano/portfolio/types/common'

/**
 * Renders an SVG image of a chevron pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a chevron pointing down.
 */
const ChevronDownSvg = (rest: TCommonSvgImageProps) => {
  return (
    <SharedRC.Svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...rest}>
      <SharedRC.Path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SharedRC.Svg>
  )
}

export default ChevronDownSvg
