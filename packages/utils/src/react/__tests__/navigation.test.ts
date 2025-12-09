import { describe, expect, it } from "vitest";

import {
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  isValidNavigationLink,
} from "../navigation";

describe("hasValidNavigationLinks", () => {
  describe("valid navigation links", () => {
    it("returns true for array with valid links", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ];
      expect(hasValidNavigationLinks(links)).toBe(true);
    });

    it("returns true for readonly array with valid links", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ] as const;
      expect(hasValidNavigationLinks(links)).toBe(true);
    });

    it("returns true for array with single valid link", () => {
      const links = [{ label: "Home", href: "/" }];
      expect(hasValidNavigationLinks(links)).toBe(true);
    });

    it("returns true for array with links having optional properties", () => {
      const links = [
        { label: "Home", href: "/", extra: "data" },
        { label: "About", href: "/about" },
      ];
      expect(hasValidNavigationLinks(links)).toBe(true);
    });

    it("returns true for array with readonly link objects", () => {
      const links = [
        { label: "Home", href: "/" } as const,
        { label: "About", href: "/about" } as const,
      ];
      expect(hasValidNavigationLinks(links)).toBe(true);
    });
  });

  describe("invalid navigation links", () => {
    it("returns false for null", () => {
      expect(hasValidNavigationLinks(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(hasValidNavigationLinks(undefined)).toBe(false);
    });

    it("returns false for empty array", () => {
      expect(hasValidNavigationLinks([])).toBe(false);
    });

    it("returns false for non-array value", () => {
      expect(hasValidNavigationLinks({} as any)).toBe(false);
    });

    it("returns false for string", () => {
      expect(hasValidNavigationLinks("not an array" as any)).toBe(false);
    });

    it("returns false for number", () => {
      expect(hasValidNavigationLinks(123 as any)).toBe(false);
    });

    it("returns false for boolean", () => {
      expect(hasValidNavigationLinks(true as any)).toBe(false);
    });
  });
});

describe("isValidNavigationLink", () => {
  describe("valid navigation links", () => {
    it("returns true for link with valid label and href", () => {
      const link = { label: "Home", href: "/" };
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns true for link with long label and href", () => {
      const link = {
        label: "This is a very long navigation label",
        href: "/very/long/path/to/page",
      };
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns true for link with external href", () => {
      const link = { label: "External", href: "https://example.com" };
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns true for link with relative href", () => {
      const link = { label: "About", href: "/about" };
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns true for readonly link object", () => {
      const link = { label: "Home", href: "/" } as const;
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns true for link with additional properties", () => {
      const link = {
        label: "Home",
        href: "/",
        icon: "home",
        target: "_blank",
      };
      expect(isValidNavigationLink(link)).toBe(true);
    });
  });

  describe("invalid navigation links", () => {
    it("returns false for null", () => {
      expect(isValidNavigationLink(null as any)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isValidNavigationLink(undefined as any)).toBe(false);
    });

    it("returns false for empty object", () => {
      expect(isValidNavigationLink({} as any)).toBe(false);
    });

    it("returns false for link with missing label", () => {
      const link = { href: "/" };
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with missing href", () => {
      const link = { label: "Home" };
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with empty string label", () => {
      const link = { label: "", href: "/" };
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns false for link with empty string href", () => {
      const link = { label: "Home", href: "" };
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns true for link with whitespace-only label (function doesn't trim)", () => {
      // Note: The function only checks length > 0, not trimmed length
      const link = { label: "   ", href: "/" };
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns true for link with whitespace-only href (function doesn't trim)", () => {
      // Note: The function only checks length > 0, not trimmed length
      const link = { label: "Home", href: "   " };
      expect(isValidNavigationLink(link)).toBe(true);
    });

    it("returns false for link with non-string label", () => {
      const link = { label: 123, href: "/" };
      expect(isValidNavigationLink(link as any)).toBe(false);
    });

    it("returns false for link with non-string href", () => {
      const link = { label: "Home", href: 123 };
      expect(isValidNavigationLink(link as any)).toBe(false);
    });

    it("returns false for link with null label", () => {
      const link = { label: null, href: "/" };
      expect(isValidNavigationLink(link as any)).toBe(false);
    });

    it("returns false for link with null href", () => {
      const link = { label: "Home", href: null };
      expect(isValidNavigationLink(link as any)).toBe(false);
    });

    it("returns false for link with undefined label", () => {
      const link = { label: undefined, href: "/" };
      expect(isValidNavigationLink(link as any)).toBe(false);
    });

    it("returns false for link with undefined href", () => {
      const link = { label: "Home", href: undefined };
      expect(isValidNavigationLink(link as any)).toBe(false);
    });

    it("returns false for link with both empty strings", () => {
      const link = { label: "", href: "" };
      expect(isValidNavigationLink(link)).toBe(false);
    });

    it("returns true for link with both whitespace-only strings (function doesn't trim)", () => {
      // Note: The function only checks length > 0, not trimmed length
      const link = { label: "   ", href: "   " };
      expect(isValidNavigationLink(link)).toBe(true);
    });
  });
});

describe("filterValidNavigationLinks", () => {
  describe("valid navigation links", () => {
    it("returns all links when all are valid", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(3);
      expect(result).toEqual(links);
    });

    it("returns single link when array has one valid link", () => {
      const links = [{ label: "Home", href: "/" }];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(1);
      expect(result).toEqual(links);
    });

    it("handles readonly arrays correctly", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ] as const;
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(2);
      expect(result[0]!).toEqual(links[0]);
      expect(result[1]!).toEqual(links[1]);
    });

    it("preserves additional properties on valid links", () => {
      const links = [
        { label: "Home", href: "/", icon: "home" },
        { label: "About", href: "/about", target: "_blank" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(2);
      expect(result[0]!).toHaveProperty("icon", "home");
      expect(result[1]!).toHaveProperty("target", "_blank");
    });

    it("returns links with type narrowing (label and href are strings)", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ];
      const result = filterValidNavigationLinks(links);
      result.forEach((link) => {
        expect(typeof link.label).toBe("string");
        expect(typeof link.href).toBe("string");
        expect(link.label.length).toBeGreaterThan(0);
        expect(link.href.length).toBeGreaterThan(0);
      });
    });
  });

  describe("filtering invalid links", () => {
    it("filters out links with missing label", () => {
      const links = [
        { label: "Home", href: "/" },
        { href: "/about" },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("filters out links with missing href", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About" },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("filters out links with empty string label", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "", href: "/about" },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("filters out links with empty string href", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "" },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("keeps links with whitespace-only label (function doesn't trim)", () => {
      // Note: The function only checks length > 0, not trimmed length
      const links = [
        { label: "Home", href: "/" },
        { label: "   ", href: "/about" },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(3);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("   ");
      expect(result[2]!.label).toBe("Contact");
    });

    it("keeps links with whitespace-only href (function doesn't trim)", () => {
      // Note: The function only checks length > 0, not trimmed length
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "   " },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(3);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("About");
      expect(result[2]!.label).toBe("Contact");
    });

    it("filters out links with non-string label", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: 123, href: "/about" },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links as any);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("filters out links with non-string href", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "About", href: 123 },
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links as any);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("filters out null links", () => {
      const links = [
        { label: "Home", href: "/" },
        null,
        { label: "Contact", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links as any);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("filters out multiple invalid links", () => {
      const links = [
        { label: "Home", href: "/" },
        { label: "", href: "/about" },
        { label: "About", href: "" },
        { label: "Contact", href: "/contact" },
        { href: "/missing-label" },
        { label: "Missing href" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(2);
      expect(result[0]!.label).toBe("Home");
      expect(result[1]!.label).toBe("Contact");
    });

    it("returns empty array when all links are invalid", () => {
      const links = [
        { label: "", href: "/" },
        { label: "About", href: "" },
        { href: "/missing-label" },
        { label: "Missing href" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe("edge cases", () => {
    it("returns empty array for null input", () => {
      const result = filterValidNavigationLinks(null);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("returns empty array for undefined input", () => {
      const result = filterValidNavigationLinks(undefined);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("returns empty array for empty array input", () => {
      const result = filterValidNavigationLinks([]);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("handles mixed valid and invalid links correctly", () => {
      const links = [
        { label: "Valid 1", href: "/valid1" },
        { label: "", href: "/invalid1" },
        { label: "Valid 2", href: "/valid2" },
        { label: "Invalid 2", href: "" },
        { label: "Valid 3", href: "/valid3" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(3);
      expect(result[0]!.label).toBe("Valid 1");
      expect(result[1]!.label).toBe("Valid 2");
      expect(result[2]!.label).toBe("Valid 3");
    });

    it("preserves order of valid links", () => {
      const links = [
        { label: "First", href: "/first" },
        { label: "", href: "/invalid" },
        { label: "Second", href: "/second" },
        { label: "Third", href: "/third" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result[0]!.label).toBe("First");
      expect(result[1]!.label).toBe("Second");
      expect(result[2]!.label).toBe("Third");
    });

    it("handles links with special characters in label and href", () => {
      const links = [
        { label: "Home & About", href: "/home-about" },
        { label: "Contact Us!", href: "/contact?ref=home" },
        { label: "FAQ's", href: "/faqs#section" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(3);
      expect(result[0]!.label).toBe("Home & About");
      expect(result[1]!.label).toBe("Contact Us!");
      expect(result[2]!.label).toBe("FAQ's");
    });

    it("handles links with unicode characters", () => {
      const links = [
        { label: "首页", href: "/home" },
        { label: "À propos", href: "/about" },
        { label: "Kontakt", href: "/contact" },
      ];
      const result = filterValidNavigationLinks(links);
      expect(result).toHaveLength(3);
      expect(result[0]!.label).toBe("首页");
      expect(result[1]!.label).toBe("À propos");
      expect(result[2]!.label).toBe("Kontakt");
    });
  });
});
