/**
 * Return a date string in the format "Month Day, Year" for a given locale
 * @param dateString - Date string in the format "YYYY-MM-DD"
 * @param locale - Locale string for the desired language
 * @returns Date string in the format "Month Day, Year"
 */
export const formatDate = (
  dateString: string,
  locale: string = 'en-US'
): string =>
  new Date(`${dateString}T00:00:00Z`).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
