import {
  SharedReactComponent,
  TSharedSvgProps
} from '@guy-romelle-magayano/react-components/server'

/**
 * Renders an SVG image of a chevron pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a chevron pointing down.
 */
const ChevronDownSvg = (rest: TSharedSvgProps) => {
  return (
    <SharedReactComponent.Svg viewBox="0 0 8 6" aria-hidden="true" {...rest}>
      <SharedReactComponent.SvgPath
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SharedReactComponent.Svg>
  )
}

export default ChevronDownSvg
