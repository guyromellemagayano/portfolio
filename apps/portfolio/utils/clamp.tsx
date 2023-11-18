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
