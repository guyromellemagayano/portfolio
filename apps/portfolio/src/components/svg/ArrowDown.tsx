import { Path, Svg, TSvgProps } from '@react-components'

/**
 * Renders an SVG image of an arrow pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of an arrow pointing down.
 */
const ArrowDownSvg = (rest: TSvgProps) => {
  return (
    <Svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

ArrowDownSvg.displayName = 'ArrowDownSvg'

export default ArrowDownSvg
