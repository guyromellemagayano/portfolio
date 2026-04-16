/**
 * @file apps/web/src/utils/datetime.ts
 * @author Guy Romelle Magayano
 * @description Utilities for datetime.
 */

import { formatDateSafely } from "@portfolio/utils";

const CUSTOM_DATE_FORMAT = {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
};

/** Sets the custom date format. */
export function setCustomDateFormat(date: string): string {
  if (!date || isNaN(new Date(date).getTime())) return "";

  return formatDateSafely(
    date,
    CUSTOM_DATE_FORMAT as Intl.DateTimeFormatOptions
  );
}
