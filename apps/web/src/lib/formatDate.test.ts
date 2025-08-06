import { describe, expect, it } from "vitest";

import { formatDate } from "./formatDate";

describe("formatDate", () => {
  describe("Basic Date Formatting", () => {
    it("formats a valid date string correctly", () => {
      const result = formatDate("2024-01-15");
      expect(result).toBe("January 15, 2024");
    });

    it("formats a date with leading zeros", () => {
      const result = formatDate("2024-03-05");
      expect(result).toBe("March 5, 2024");
    });

    it("formats a date with double-digit day", () => {
      const result = formatDate("2024-12-25");
      expect(result).toBe("December 25, 2024");
    });

    it("formats a date with zero-padded month", () => {
      const result = formatDate("2024-09-15");
      expect(result).toBe("September 15, 2024");
    });

    it("formats a date with double-digit month", () => {
      const result = formatDate("2024-10-15");
      expect(result).toBe("October 15, 2024");
    });
  });

  describe("Different Years", () => {
    it("formats dates from different years", () => {
      expect(formatDate("2020-01-01")).toBe("January 1, 2020");
      expect(formatDate("2023-06-15")).toBe("June 15, 2023");
      expect(formatDate("2025-12-31")).toBe("December 31, 2025");
    });

    it("handles leap year dates", () => {
      const result = formatDate("2024-02-29");
      expect(result).toBe("February 29, 2024");
    });

    it("handles century years", () => {
      expect(formatDate("2000-01-01")).toBe("January 1, 2000");
      expect(formatDate("2100-12-31")).toBe("December 31, 2100");
    });
  });

  describe("Edge Cases", () => {
    it("handles first day of month", () => {
      const result = formatDate("2024-01-01");
      expect(result).toBe("January 1, 2024");
    });

    it("handles last day of month", () => {
      const result = formatDate("2024-01-31");
      expect(result).toBe("January 31, 2024");
    });

    it("handles leap year February 29", () => {
      const result = formatDate("2024-02-29");
      expect(result).toBe("February 29, 2024");
    });

    it("handles non-leap year February 28", () => {
      const result = formatDate("2023-02-28");
      expect(result).toBe("February 28, 2023");
    });

    it("handles different month lengths", () => {
      expect(formatDate("2024-04-30")).toBe("April 30, 2024"); // 30 days
      expect(formatDate("2024-05-31")).toBe("May 31, 2024"); // 31 days
      expect(formatDate("2024-06-30")).toBe("June 30, 2024"); // 30 days
    });
  });

  describe("Date String Variations", () => {
    it("handles ISO date format", () => {
      const result = formatDate("2024-01-15");
      expect(result).toBe("January 15, 2024");
    });

    it("handles date with leading zeros in month", () => {
      const result = formatDate("2024-01-15");
      expect(result).toBe("January 15, 2024");
    });

    it("handles date with leading zeros in day", () => {
      const result = formatDate("2024-03-05");
      expect(result).toBe("March 5, 2024");
    });

    it("handles date with zero-padded format", () => {
      const result = formatDate("2024-03-05");
      expect(result).toBe("March 5, 2024");
    });
  });

  describe("Month Names", () => {
    it("formats all months correctly", () => {
      const months = [
        { input: "2024-01-15", expected: "January 15, 2024" },
        { input: "2024-02-15", expected: "February 15, 2024" },
        { input: "2024-03-15", expected: "March 15, 2024" },
        { input: "2024-04-15", expected: "April 15, 2024" },
        { input: "2024-05-15", expected: "May 15, 2024" },
        { input: "2024-06-15", expected: "June 15, 2024" },
        { input: "2024-07-15", expected: "July 15, 2024" },
        { input: "2024-08-15", expected: "August 15, 2024" },
        { input: "2024-09-15", expected: "September 15, 2024" },
        { input: "2024-10-15", expected: "October 15, 2024" },
        { input: "2024-11-15", expected: "November 15, 2024" },
        { input: "2024-12-15", expected: "December 15, 2024" },
      ];

      months.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected);
      });
    });
  });

  describe("Day Numbers", () => {
    it("formats zero-padded days correctly", () => {
      expect(formatDate("2024-01-01")).toBe("January 1, 2024");
      expect(formatDate("2024-02-05")).toBe("February 5, 2024");
      expect(formatDate("2024-03-09")).toBe("March 9, 2024");
    });

    it("formats double-digit days correctly", () => {
      expect(formatDate("2024-01-10")).toBe("January 10, 2024");
      expect(formatDate("2024-02-15")).toBe("February 15, 2024");
      expect(formatDate("2024-03-31")).toBe("March 31, 2024");
    });

    it("formats days 1-31 correctly", () => {
      for (let day = 1; day <= 31; day++) {
        const dateString = `2024-01-${day.toString().padStart(2, "0")}`;
        const result = formatDate(dateString);
        expect(result).toContain(`January ${day}, 2024`);
      }
    });
  });

  describe("Year Handling", () => {
    it("handles four-digit years", () => {
      expect(formatDate("2024-01-01")).toBe("January 1, 2024");
      expect(formatDate("1999-12-31")).toBe("December 31, 1999");
      expect(formatDate("2030-06-15")).toBe("June 15, 2030");
    });

    it("handles years in different ranges", () => {
      expect(formatDate("1900-01-01")).toBe("January 1, 1900");
      expect(formatDate("2000-01-01")).toBe("January 1, 2000");
      expect(formatDate("2100-12-31")).toBe("December 31, 2100");
    });
  });

  describe("Consistency and Reliability", () => {
    it("returns consistent results for same input", () => {
      const input = "2024-01-15";
      const result1 = formatDate(input);
      const result2 = formatDate(input);
      const result3 = formatDate(input);

      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
      expect(result1).toBe("January 15, 2024");
    });

    it("handles multiple calls efficiently", () => {
      const dates = [
        "2024-01-01",
        "2024-02-15",
        "2024-03-31",
        "2024-04-15",
        "2024-05-20",
      ];

      const results = dates.map((date) => formatDate(date));
      const expected = [
        "January 1, 2024",
        "February 15, 2024",
        "March 31, 2024",
        "April 15, 2024",
        "May 20, 2024",
      ];

      expect(results).toEqual(expected);
    });
  });

  describe("Performance", () => {
    it("handles large number of date formatting efficiently", () => {
      const startTime = performance.now();
      const numberOfDates = 1000;

      for (let i = 0; i < numberOfDates; i++) {
        const year = 2020 + (i % 10);
        const month = (i % 12) + 1;
        const day = (i % 28) + 1;
        const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
        formatDate(dateString);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time (adjust threshold as needed)
      expect(duration).toBeLessThan(1000); // 1 second
    });

    it("maintains performance with repeated calls", () => {
      const dateString = "2024-01-15";
      const iterations = 100;

      const startTime = performance.now();
      for (let i = 0; i < iterations; i++) {
        formatDate(dateString);
      }
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should be very fast for repeated calls
      expect(duration).toBeLessThan(100); // 100ms
    });
  });

  describe("Function Interface", () => {
    it("returns a string", () => {
      const result = formatDate("2024-01-15");
      expect(typeof result).toBe("string");
    });

    it("returns non-empty string for valid input", () => {
      const result = formatDate("2024-01-15");
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it("returns expected format pattern", () => {
      const result = formatDate("2024-01-15");
      // Should match pattern: "Month Day, Year"
      expect(result).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/);
    });
  });

  describe("Date Validation", () => {
    it("handles valid date strings", () => {
      const validDates = [
        "2024-01-01",
        "2024-02-29", // Leap year
        "2024-12-31",
        "2000-01-01",
        "2030-06-15",
      ];

      validDates.forEach((date) => {
        expect(() => formatDate(date)).not.toThrow();
        const result = formatDate(date);
        expect(result).toBeTruthy();
        expect(typeof result).toBe("string");
      });
    });

    it("handles edge case dates", () => {
      const edgeCases = [
        "2024-01-01", // First day of year
        "2024-12-31", // Last day of year
        "2024-02-29", // Leap day
        "2023-02-28", // Last day of February in non-leap year
      ];

      edgeCases.forEach((date) => {
        expect(() => formatDate(date)).not.toThrow();
        const result = formatDate(date);
        expect(result).toBeTruthy();
      });
    });
  });

  describe("Locale and Timezone", () => {
    it("uses UTC timezone for consistent results", () => {
      const result = formatDate("2024-01-15");
      // The function adds T00:00:00Z to ensure UTC timezone
      expect(result).toBe("January 15, 2024");
    });

    it("uses en-US locale for consistent formatting", () => {
      const result = formatDate("2024-01-15");
      // Should use US date format: "Month Day, Year"
      expect(result).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/);
    });
  });

  describe("Error Handling", () => {
    it("handles invalid date strings gracefully", () => {
      // Note: The current implementation doesn't validate input
      // These tests show what happens with invalid input
      const invalidDates = [
        "invalid-date",
        "2024-13-01", // Invalid month
        "2024-01-32", // Invalid day
        "2024-00-01", // Invalid month
        "2024-01-00", // Invalid day
      ];

      invalidDates.forEach((date) => {
        // The function will still try to process invalid dates
        // This might result in "Invalid Date" or unexpected behavior
        expect(() => formatDate(date)).not.toThrow();
      });
    });

    it("handles empty string input", () => {
      // Empty string will result in "Invalid Date"
      expect(() => formatDate("")).not.toThrow();
    });

    it("handles null-like input", () => {
      // These will result in "Invalid Date"
      expect(() => formatDate(null as any)).not.toThrow();
      expect(() => formatDate(undefined as any)).not.toThrow();
    });
  });

  describe("Integration Scenarios", () => {
    it("works with typical article dates", () => {
      const articleDates = [
        "2024-01-15",
        "2024-02-20",
        "2024-03-10",
        "2024-04-05",
        "2024-05-25",
      ];

      const expected = [
        "January 15, 2024",
        "February 20, 2024",
        "March 10, 2024",
        "April 5, 2024",
        "May 25, 2024",
      ];

      articleDates.forEach((date, index) => {
        expect(formatDate(date)).toBe(expected[index]);
      });
    });

    it("handles date range formatting", () => {
      const dateRange = [
        "2024-01-01",
        "2024-01-15",
        "2024-01-31",
        "2024-02-01",
        "2024-02-29",
      ];

      const results = dateRange.map((date) => formatDate(date));
      const expected = [
        "January 1, 2024",
        "January 15, 2024",
        "January 31, 2024",
        "February 1, 2024",
        "February 29, 2024",
      ];

      expect(results).toEqual(expected);
    });
  });

  describe("Additional Edge Cases", () => {
    it("handles very old dates", () => {
      expect(formatDate("1900-01-01")).toBe("January 1, 1900");
      expect(formatDate("1800-12-31")).toBe("December 31, 1800");
    });

    it("handles very future dates", () => {
      expect(formatDate("2100-01-01")).toBe("January 1, 2100");
      expect(formatDate("2200-12-31")).toBe("December 31, 2200");
    });

    it("handles dates with different separators gracefully", () => {
      // The function expects YYYY-MM-DD format, but should handle gracefully
      expect(() => formatDate("2024/01/15")).not.toThrow();
      expect(() => formatDate("2024.01.15")).not.toThrow();
    });

    it("handles dates with extra whitespace", () => {
      expect(() => formatDate(" 2024-01-15 ")).not.toThrow();
      expect(() => formatDate("2024-01-15\n")).not.toThrow();
    });

    it("handles dates with time components", () => {
      // The function should handle dates with time components
      expect(() => formatDate("2024-01-15T10:30:00")).not.toThrow();
      expect(() => formatDate("2024-01-15 10:30:00")).not.toThrow();
    });
  });
});
