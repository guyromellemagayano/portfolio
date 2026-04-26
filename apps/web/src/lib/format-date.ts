/** Format a date string to a readable date string. */
export const formatDate = (date: string): string => {
  const normalizedDate = typeof date === "string" ? date.trim() : "";

  if (!normalizedDate) {
    return "";
  }

  const parsedDate = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)
      ? `${normalizedDate}T00:00:00Z`
      : normalizedDate
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return normalizedDate;
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};
