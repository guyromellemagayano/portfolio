import { describe, expect, it } from "vitest";

import {
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  isValidNavigationLink,
} from "./index";

describe("Navigation Validation Utilities", () => {
  describe("hasValidNavigationLinks", () => {
    it("returns true for valid navigation links array", () => {
      const links = [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ];
      expect(hasValidNavigationLinks(links)).toBe(true);
    });

    it("returns false for empty array", () => {
      expect(hasValidNavigationLinks([])).toBe(false);
    });

    it("returns false for null", () => {
      expect(hasValidNavigationLinks(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(hasValidNavigationLinks(undefined)).toBe(false);
    });

    it("returns false for non-array", () => {
      expect(hasValidNavigationLinks("not-an-array" as any)).toBe(false);
    });

    it("returns false for object", () => {
      expect(hasValidNavigationLinks({} as any)).toBe(false);
    });
  });

  describe("isValidNavigationLink", () => {
    it("returns true for valid navigation link", () => {
      const link = { label: "About", href: "/about" };
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns false for link with empty label", () => {
      const link = { label: "", href: "/about" };
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with null label", () => {
      const link = { label: null, href: "/about" } as any;
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with undefined label", () => {
      const link = { href: "/about" } as any;
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with empty href", () => {
      const link = { label: "About", href: "" };
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with null href", () => {
      const link = { label: "About", href: null } as any;
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with undefined href", () => {
      const link = { label: "About" } as any;
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for null link", () => {
      expect(isValidNavigationLink(null as any)).toBe(false);
    });

    it("returns false for undefined link", () => {
      expect(isValidNavigationLink(undefined as any)).toBe(false);
    });

    it("returns false for non-string label", () => {
      const link = { label: 123, href: "/about" } as any;
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for non-string href", () => {
      const link = { label: "About", href: 123 } as any;
      expect(isValidNavigationLink(link)).toBe(false);
    });
  });

  describe("filterValidNavigationLinks", () => {
    it("returns all valid links from mixed array", () => {
      const links = [
        { label: "About", href: "/about" },
        { label: "", href: "/invalid" },
        { label: "Contact", href: "/contact" },
        { label: "Invalid", href: "" },
        { label: null, href: "/invalid2" } as any,
        { label: "Valid", href: "/valid" },
      ];

      const result = filterValidNavigationLinks(links);
      expect(result).toEqual([
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Valid", href: "/valid" },
      ]);
    });

    it("handles readonly arrays correctly", () => {
      const readonlyLinks = [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Home", href: "/" },
      ] as const;

      const result = filterValidNavigationLinks(readonlyLinks);
      expect(result).toEqual([
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Home", href: "/" },
      ]);
    });

    it("handles readonly arrays with readonly properties", () => {
      const readonlyLinks = [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Home", href: "/" },
      ] as const;

      const result = filterValidNavigationLinks(readonlyLinks);
      expect(result).toEqual([
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Home", href: "/" },
      ]);
    });

    it("handles readonly arrays with mixed valid and invalid links", () => {
      const readonlyLinks = [
        { label: "About", href: "/about" },
        { label: "", href: "/invalid" },
        { label: "Contact", href: "/contact" },
      ] as const;

      const result = filterValidNavigationLinks(readonlyLinks);
      expect(result).toEqual([
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ]);
    });

    it("returns empty array for empty input", () => {
      expect(filterValidNavigationLinks([])).toEqual([]);
    });

    it("returns empty array for null input", () => {
      expect(filterValidNavigationLinks(null as any)).toEqual([]);
    });

    it("returns empty array for undefined input", () => {
      expect(filterValidNavigationLinks(undefined as any)).toEqual([]);
    });

    it("returns empty array for non-array input", () => {
      expect(filterValidNavigationLinks("not-an-array" as any)).toEqual([]);
    });

    it("returns empty array when all links are invalid", () => {
      const links = [
        { label: "", href: "/invalid" },
        { label: "Invalid", href: "" },
        { label: null, href: "/invalid2" } as any,
      ];

      expect(filterValidNavigationLinks(links)).toEqual([]);
    });

    it("returns all links when all are valid", () => {
      const links = [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Home", href: "/" },
      ];

      const result = filterValidNavigationLinks(links);
      expect(result).toEqual(links);
    });

    it("handles links with additional properties", () => {
      const links = [
        { label: "About", href: "/about", kind: "internal" },
        { label: "Contact", href: "/contact", external: true },
      ];

      const result = filterValidNavigationLinks(links);
      expect(result).toEqual(links);
    });
  });
});
