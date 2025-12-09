import { describe, expect, it } from "vitest";

import { getDefaultLinkProps, getLinkTargetProps, isValidLink } from "../link";

describe("isValidLink", () => {
  describe("valid links", () => {
    it("returns true for valid string href", () => {
      expect(isValidLink("https://example.com")).toBe(true);
    });

    it("returns true for relative path", () => {
      expect(isValidLink("/about")).toBe(true);
    });

    it("returns true for object with toString method", () => {
      const hrefObject = {
        toString() {
          return "https://example.com";
        },
      };
      expect(isValidLink(hrefObject)).toBe(true);
    });

    it("returns true for URL object", () => {
      const url = new URL("https://example.com");
      expect(isValidLink(url)).toBe(true);
    });
  });

  describe("invalid links", () => {
    it("returns false for undefined", () => {
      expect(isValidLink(undefined)).toBe(false);
    });

    it("returns false for empty string", () => {
      expect(isValidLink("")).toBe(false);
    });

    it("returns false for placeholder hash", () => {
      expect(isValidLink("#")).toBe(false);
    });

    it("returns false for object with toString returning empty string", () => {
      const hrefObject = {
        toString() {
          return "";
        },
      };
      expect(isValidLink(hrefObject)).toBe(false);
    });

    it("returns false for object with toString returning hash", () => {
      const hrefObject = {
        toString() {
          return "#";
        },
      };
      expect(isValidLink(hrefObject)).toBe(false);
    });
  });
});

describe("getLinkTargetProps", () => {
  describe("external links", () => {
    it("returns _blank target and rel for http external link", () => {
      const result = getLinkTargetProps("http://example.com");
      expect(result.target).toBe("_blank");
      expect(result.rel).toBe("noopener noreferrer");
    });

    it("returns _blank target and rel for https external link", () => {
      const result = getLinkTargetProps("https://example.com");
      expect(result.target).toBe("_blank");
      expect(result.rel).toBe("noopener noreferrer");
    });

    it("respects explicit _blank target for external link", () => {
      const result = getLinkTargetProps("https://example.com", "_blank");
      expect(result.target).toBe("_blank");
      expect(result.rel).toBe("noopener noreferrer");
    });

    it("respects explicit _self target for external link", () => {
      const result = getLinkTargetProps("https://example.com", "_self");
      expect(result.target).toBe("_self");
      expect(result.rel).toBeUndefined();
    });

    it("handles external link with object href", () => {
      const hrefObject = {
        toString() {
          return "https://example.com";
        },
      };
      const result = getLinkTargetProps(hrefObject);
      expect(result.target).toBe("_blank");
      expect(result.rel).toBe("noopener noreferrer");
    });
  });

  describe("internal links", () => {
    it("returns _self target for relative path", () => {
      const result = getLinkTargetProps("/about");
      expect(result.target).toBe("_self");
      expect(result.rel).toBeUndefined();
    });

    it("returns _self target for relative path with explicit _self", () => {
      const result = getLinkTargetProps("/about", "_self");
      expect(result.target).toBe("_self");
      expect(result.rel).toBeUndefined();
    });

    it("returns _blank target for relative path with explicit _blank", () => {
      const result = getLinkTargetProps("/about", "_blank");
      expect(result.target).toBe("_blank");
      expect(result.rel).toBe("noopener noreferrer");
    });

    it("returns _self target for anchor link", () => {
      const result = getLinkTargetProps("#section");
      expect(result.target).toBe("_self");
      expect(result.rel).toBeUndefined();
    });
  });

  describe("invalid links", () => {
    it("returns _self target for undefined href", () => {
      const result = getLinkTargetProps(undefined);
      expect(result.target).toBe("_self");
      expect(result.rel).toBeUndefined();
    });

    it("returns _self target for empty string href", () => {
      const result = getLinkTargetProps("");
      expect(result.target).toBe("_self");
      expect(result.rel).toBeUndefined();
    });

    it("returns _self target for placeholder hash", () => {
      const result = getLinkTargetProps("#");
      expect(result.target).toBe("_self");
      expect(result.rel).toBeUndefined();
    });
  });
});

describe("getDefaultLinkProps", () => {
  describe("with all props provided", () => {
    it("returns provided values", () => {
      const result = getDefaultLinkProps({
        href: "https://example.com",
        target: "_blank",
        title: "Example Link",
      });
      expect(result.href).toBe("https://example.com");
      expect(result.target).toBe("_blank");
      expect(result.title).toBe("Example Link");
    });

    it("handles object href with toString", () => {
      const hrefObject = {
        toString() {
          return "https://example.com";
        },
      };
      const result = getDefaultLinkProps({
        href: hrefObject,
        target: "_blank",
        title: "Example",
      });
      expect(result.href).toBe("https://example.com");
      expect(result.target).toBe("_blank");
      expect(result.title).toBe("Example");
    });
  });

  describe("with missing props", () => {
    it("defaults href to # when undefined", () => {
      const result = getDefaultLinkProps({
        target: "_blank",
        title: "Example",
      });
      expect(result.href).toBe("#");
      expect(result.target).toBe("_blank");
      expect(result.title).toBe("Example");
    });

    it("defaults href to # when empty string", () => {
      const result = getDefaultLinkProps({
        href: "",
        target: "_blank",
        title: "Example",
      });
      expect(result.href).toBe("#");
      expect(result.target).toBe("_blank");
      expect(result.title).toBe("Example");
    });

    it("defaults target to _self when undefined", () => {
      const result = getDefaultLinkProps({
        href: "https://example.com",
        title: "Example",
      });
      expect(result.href).toBe("https://example.com");
      expect(result.target).toBe("_self");
      expect(result.title).toBe("Example");
    });

    it("defaults title to empty string when undefined", () => {
      const result = getDefaultLinkProps({
        href: "https://example.com",
        target: "_blank",
      });
      expect(result.href).toBe("https://example.com");
      expect(result.target).toBe("_blank");
      expect(result.title).toBe("");
    });

    it("defaults all props when none provided", () => {
      const result = getDefaultLinkProps({});
      expect(result.href).toBe("#");
      expect(result.target).toBe("_self");
      expect(result.title).toBe("");
    });
  });

  describe("edge cases", () => {
    it("handles object href with toString returning empty string", () => {
      const hrefObject = {
        toString() {
          return "";
        },
      };
      const result = getDefaultLinkProps({ href: hrefObject });
      expect(result.href).toBe("#");
    });

    it("preserves empty string title", () => {
      const result = getDefaultLinkProps({
        href: "https://example.com",
        title: "",
      });
      expect(result.title).toBe("");
    });

    it("defaults to _self when target is empty string", () => {
      const result = getDefaultLinkProps({
        href: "https://example.com",
        target: "",
      });
      expect(result.target).toBe("_self");
    });
  });
});
