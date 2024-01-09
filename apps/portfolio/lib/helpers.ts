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
