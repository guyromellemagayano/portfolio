/**
 * Converts an array of strings into a URL slug.
 * @param array - The array of strings to be converted.
 * @returns The URL slug generated from the array.
 */
export const arrayToUrlSlug = (array: string[]): string => {
  const slugArray = array.map(item =>
    item.toLowerCase().replace(/[\s\W-]+/g, '/')
  )

  return slugArray.join('-')
}

export type TClampProps = {
  number: number
  min: number
  max: number
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param number - The number to clamp.
 * @param min - The minimum value to clamp to.
 * @param max - The maximum value to clamp to.
 * @returns The clamped number.
 */
const clamp = ({ number, min, max }: TClampProps): number => {
  const a = Math.min(min, max)
  const b = Math.max(min, max)

  return Math.min(Math.max(number, a), b)
}

export default clamp
