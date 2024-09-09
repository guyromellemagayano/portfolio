import { Path, Svg, SvgProps } from '@react-components'

/**
 * Renders an SVG image of a Facebook logo.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a Facebook logo.
 */
const FacebookSvg = (rest: SvgProps) => {
  return (
    <Svg aria-hidden="true" fill="currentColor" viewBox="0 0 320 512" {...rest}>
      <Path d="M80 299.3V512h116V299.3h86.5l18-97.8H196v-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4.4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8h66z" />
    </Svg>
  )
}

FacebookSvg.displayName = 'FacebookSvg'

export default FacebookSvg
