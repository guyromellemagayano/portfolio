import { Path, Svg, SvgProps } from '@react-components'

/**
 * Renders an SVG image of a close icon.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a close icon.
 */
const CloseSvg = (rest: SvgProps) => {
  return (
    <Svg aria-hidden="true" viewBox="0 0 24 24" {...rest}>
      <Path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

CloseSvg.displayName = 'CloseSvg'

export default CloseSvg
