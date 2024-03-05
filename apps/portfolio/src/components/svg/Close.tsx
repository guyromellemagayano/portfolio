import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

import { TCommonSvgImageProps } from '@guy-romelle-magayano/portfolio/types/common'

/**
 * Renders an SVG image of a close icon.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a close icon.
 */
const CloseSvg = (rest: TCommonSvgImageProps) => {
  return (
    <SharedReactComponent.Svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <SharedReactComponent.SvgPath
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SharedReactComponent.Svg>
  )
}

export default CloseSvg
