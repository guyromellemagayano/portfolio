import { Path, Svg, TSvgProps } from '@react-components'

/**
 * Renders an SVG image of an arrow pointing left.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of an arrow pointing left.
 */
const ArrowLeftSvg = (rest: TSvgProps) => {
  return (
    <Svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

ArrowLeftSvg.displayName = 'ArrowLeftSvg'

export default ArrowLeftSvg
