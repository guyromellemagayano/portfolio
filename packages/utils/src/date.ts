/**
 * Safely formats a date string with fallback handling.
 *
 * @param date - The date to format (string, Date, null, or undefined)
 * @param options - Optional Intl.DateTimeFormatOptions for formatting
 * @returns Formatted date string or empty string if invalid
 */
export function formatDateSafely(
  date: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  // Handle null, undefined, or empty string
  if (!date) {
    return "";
  }

  try {
    // Convert to Date object if it's a string
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "";
    }

    // Format the date using Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(dateObj);
  } catch (error) {
    // Return empty string for any formatting errors
    return "";
  }
}
