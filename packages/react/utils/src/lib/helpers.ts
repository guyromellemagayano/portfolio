import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Converts an array of strings into a URL slug.
 * @param array - The array of strings to be converted.
 * @returns The URL slug generated from the array.
 */
export const arrayToUrlSlug = (array: string[]) => {
  const slugArray = array?.map(item =>
    item.toLowerCase().replace(/[\s\W-]+/g, '/')
  )

  return slugArray?.join('-') ?? ''
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
export const clamp = ({ number, min, max }: TClampProps) => {
  const a = Math.min(min, max),
    b = Math.max(min, max)

  return Math.min(Math.max(number, a), b)
}

/**
 * Merges class names together.
 * @param classes - The class names to merge.
 * @returns The merged class names.
 */
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes))
