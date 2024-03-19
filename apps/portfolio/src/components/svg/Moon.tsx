import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

import { TCommonSvgImageProps } from '@guy-romelle-magayano/portfolio/types/common'

/**
 * Renders an SVG image of a moon.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a moon.
 */
const MoonSvg = (rest: TCommonSvgImageProps) => {
  return (
    <SharedReactComponent.Svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <SharedReactComponent.SvgPath
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SharedReactComponent.Svg>
  )
}

export default MoonSvg