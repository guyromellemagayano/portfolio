import { Path, Svg, TSvgProps } from '@react-components'

/**
 * Renders an SVG image of a chevron pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a chevron pointing down.
 */
const ChevronDownSvg = (rest: TSvgProps) => {
  return (
    <Svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

ChevronDownSvg.displayName = 'ChevronDownSvg'

export default ChevronDownSvg
