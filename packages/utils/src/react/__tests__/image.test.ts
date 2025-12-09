import { describe, expect, it } from "vitest";

import { isValidImageSrc } from "../image";

describe("isValidImageSrc", () => {
  describe("valid image sources", () => {
    describe("string URLs", () => {
      it("returns true for absolute HTTP URL", () => {
        expect(isValidImageSrc("http://example.com/image.jpg")).toBe(true);
      });

      it("returns true for absolute HTTPS URL", () => {
        expect(isValidImageSrc("https://example.com/image.jpg")).toBe(true);
      });

      it("returns false for relative path (requires absolute URL)", () => {
        expect(isValidImageSrc("/images/photo.jpg")).toBe(false);
      });

      it("returns false for relative path with subdirectory (requires absolute URL)", () => {
        expect(isValidImageSrc("./images/photo.jpg")).toBe(false);
      });

      it("returns false for relative path with parent directory (requires absolute URL)", () => {
        expect(isValidImageSrc("../images/photo.jpg")).toBe(false);
      });

      it("returns true for URL with query parameters", () => {
        expect(
          isValidImageSrc("https://example.com/image.jpg?v=1&size=large")
        ).toBe(true);
      });

      it("returns true for URL with hash", () => {
        expect(isValidImageSrc("https://example.com/image.jpg#section")).toBe(
          true
        );
      });

      it("returns true for URL with port", () => {
        expect(isValidImageSrc("http://localhost:3000/image.jpg")).toBe(true);
      });

      it("returns true for data URL", () => {
        expect(
          isValidImageSrc(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          )
        ).toBe(true);
      });

      it("returns true for data URL with SVG", () => {
        expect(
          isValidImageSrc(
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
          )
        ).toBe(true);
      });

      it("returns true for data URL without base64", () => {
        expect(isValidImageSrc("data:image/svg+xml,<svg></svg>")).toBe(true);
      });
    });

    describe("StaticImageData objects", () => {
      it("returns true for object with src property", () => {
        const staticImageData = {
          src: "/images/photo.jpg",
          height: 100,
          width: 100,
        };
        expect(isValidImageSrc(staticImageData)).toBe(true);
      });

      it("returns true for object with src property (absolute URL)", () => {
        const staticImageData = {
          src: "https://example.com/image.jpg",
          height: 100,
          width: 100,
        };
        expect(isValidImageSrc(staticImageData)).toBe(true);
      });

      it("returns true for object with default.src property (Next.js style)", () => {
        const staticImageData = {
          default: {
            src: "/images/photo.jpg",
            height: 100,
            width: 100,
          },
        };
        expect(isValidImageSrc(staticImageData)).toBe(true);
      });

      it("returns true for object with default.src property (absolute URL)", () => {
        const staticImageData = {
          default: {
            src: "https://example.com/image.jpg",
            height: 100,
            width: 100,
          },
        };
        expect(isValidImageSrc(staticImageData)).toBe(true);
      });

      it("returns true for object with src property (data URL)", () => {
        const staticImageData = {
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        };
        expect(isValidImageSrc(staticImageData)).toBe(true);
      });
    });
  });

  describe("invalid image sources", () => {
    describe("falsy values", () => {
      it("returns false for undefined", () => {
        expect(isValidImageSrc(undefined)).toBe(false);
      });

      it("returns false for null", () => {
        expect(isValidImageSrc(null as any)).toBe(false);
      });

      it("returns false for empty string", () => {
        expect(isValidImageSrc("")).toBe(false);
      });

      it("returns false for whitespace-only string", () => {
        expect(isValidImageSrc("   ")).toBe(false);
      });

      it("returns false for newline-only string", () => {
        expect(isValidImageSrc("\n")).toBe(false);
      });

      it("returns false for tab-only string", () => {
        expect(isValidImageSrc("\t")).toBe(false);
      });
    });

    describe("fragment URLs", () => {
      it("returns false for hash fragment", () => {
        expect(isValidImageSrc("#")).toBe(false);
      });

      it("returns false for hash fragment with text", () => {
        expect(isValidImageSrc("#section")).toBe(false);
      });

      it("returns false for hash fragment with ID", () => {
        expect(isValidImageSrc("#image-id")).toBe(false);
      });
    });

    describe("invalid string URLs", () => {
      it("returns false for invalid URL format", () => {
        expect(isValidImageSrc("not-a-url")).toBe(false);
      });

      it("returns false for malformed URL", () => {
        expect(isValidImageSrc("http://")).toBe(false);
      });

      it("returns true for URL with custom protocol (URL constructor accepts it)", () => {
        // Note: URL constructor accepts any protocol, so this is technically valid
        expect(isValidImageSrc("invalid://example.com/image.jpg")).toBe(true);
      });

      it("returns false for string with only spaces and hash", () => {
        expect(isValidImageSrc("  #  ")).toBe(false);
      });
    });

    describe("invalid StaticImageData objects", () => {
      it("returns false for object without src or default property", () => {
        const invalidObject = {
          height: 100,
          width: 100,
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns false for object with empty src string", () => {
        const invalidObject = {
          src: "",
        };
        expect(isValidImageSrc(invalidObject)).toBe(false);
      });

      it("returns false for object with whitespace-only src string", () => {
        const invalidObject = {
          src: "   ",
        };
        expect(isValidImageSrc(invalidObject)).toBe(false);
      });

      it("returns false for object with non-string src value", () => {
        const invalidObject = {
          src: 123,
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns false for object with null src value", () => {
        const invalidObject = {
          src: null,
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns false for object with undefined src value", () => {
        const invalidObject = {
          src: undefined,
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns true for object with hash fragment src (only validates length, not content)", () => {
        // Note: The function only checks if trimmed src has length > 0, not if it's a valid URL
        const invalidObject = {
          src: "#",
        };
        expect(isValidImageSrc(invalidObject)).toBe(true);
      });

      it("returns false for object with default property but no src", () => {
        const invalidObject = {
          default: {
            height: 100,
            width: 100,
          },
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns false for object with default property but empty src", () => {
        const invalidObject = {
          default: {
            src: "",
          },
        };
        expect(isValidImageSrc(invalidObject)).toBe(false);
      });

      it("returns false for object with default property but whitespace-only src", () => {
        const invalidObject = {
          default: {
            src: "   ",
          },
        };
        expect(isValidImageSrc(invalidObject)).toBe(false);
      });

      it("returns false for object with default property but non-string src", () => {
        const invalidObject = {
          default: {
            src: 123,
          },
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns false for object with default property but null src", () => {
        const invalidObject = {
          default: {
            src: null,
          },
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns false for object with default property but undefined src", () => {
        const invalidObject = {
          default: {
            src: undefined,
          },
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns true for object with default property but hash fragment src (only validates length, not content)", () => {
        // Note: The function only checks if trimmed src has length > 0, not if it's a valid URL
        const invalidObject = {
          default: {
            src: "#section",
          },
        };
        expect(isValidImageSrc(invalidObject)).toBe(true);
      });

      it("returns false for object with null default property", () => {
        const invalidObject = {
          default: null,
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });

      it("returns false for object with undefined default property", () => {
        const invalidObject = {
          default: undefined,
        };
        expect(isValidImageSrc(invalidObject as any)).toBe(false);
      });
    });

    describe("edge cases", () => {
      it("returns false for array", () => {
        expect(isValidImageSrc([] as any)).toBe(false);
      });

      it("returns false for number", () => {
        expect(isValidImageSrc(123 as any)).toBe(false);
      });

      it("returns false for boolean", () => {
        expect(isValidImageSrc(true as any)).toBe(false);
      });

      it("returns false for function", () => {
        const fn = () => {};
        expect(isValidImageSrc(fn as any)).toBe(false);
      });
    });
  });

  describe("trimming behavior", () => {
    it("returns true for string URL with leading whitespace", () => {
      expect(isValidImageSrc("  https://example.com/image.jpg")).toBe(true);
    });

    it("returns true for string URL with trailing whitespace", () => {
      expect(isValidImageSrc("https://example.com/image.jpg  ")).toBe(true);
    });

    it("returns true for string URL with leading and trailing whitespace", () => {
      expect(isValidImageSrc("  https://example.com/image.jpg  ")).toBe(true);
    });

    it("returns true for object src with leading whitespace", () => {
      const staticImageData = {
        src: "  /images/photo.jpg",
      };
      expect(isValidImageSrc(staticImageData)).toBe(true);
    });

    it("returns true for object src with trailing whitespace", () => {
      const staticImageData = {
        src: "/images/photo.jpg  ",
      };
      expect(isValidImageSrc(staticImageData)).toBe(true);
    });

    it("returns true for object default.src with leading whitespace", () => {
      const staticImageData = {
        default: {
          src: "  /images/photo.jpg",
        },
      };
      expect(isValidImageSrc(staticImageData)).toBe(true);
    });

    it("returns true for object default.src with trailing whitespace", () => {
      const staticImageData = {
        default: {
          src: "/images/photo.jpg  ",
        },
      };
      expect(isValidImageSrc(staticImageData)).toBe(true);
    });

    it("returns false for string with only whitespace", () => {
      expect(isValidImageSrc("   ")).toBe(false);
    });

    it("returns false for object src with only whitespace", () => {
      const staticImageData = {
        src: "   ",
      };
      expect(isValidImageSrc(staticImageData)).toBe(false);
    });
  });
});
