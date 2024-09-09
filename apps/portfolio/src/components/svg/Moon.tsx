import { Path, Svg, SvgProps } from '@react-components'

/**
 * Renders an SVG image of a moon.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a moon.
 */
const MoonSvg = (rest: SvgProps) => {
  return (
    <Svg aria-hidden="true" viewBox="0 0 24 24" {...rest}>
      <Path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

MoonSvg.displayName = 'MoonSvg'

export default MoonSvg
