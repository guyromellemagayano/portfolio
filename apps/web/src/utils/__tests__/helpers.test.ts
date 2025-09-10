import { describe, expect, it } from "vitest";

import { arrayToUrlSlug, clamp, cn, isActivePath } from "@web/utils/helpers";

describe("arrayToUrlSlug", () => {
  it("converts array items to a slug with expected separators", () => {
    const input = ["Hello World", "Foo-Bar", "B@z"];
    const result = arrayToUrlSlug(input);
    expect(result).toBe("hello/world-foo/bar-b/z");
  });

  it("returns empty string for empty array", () => {
    expect(arrayToUrlSlug([])).toBe("");
  });
});

describe("cn", () => {
  it("merges Tailwind classes and keeps the last conflicting one", () => {
    const result = cn("p-2", "p-4", "text-red-500", "text-blue-500", [
      "mt-2",
      "mt-4",
    ]);
    expect(result).toBe("p-4 text-blue-500 mt-4");
  });

  it("filters out falsy values and arrays", () => {
    const result = cn("block", false, null, undefined, ["mt-2"]);
    expect(result).toBe("block mt-2");
  });
});

describe("isActivePath (lib)", () => {
  it("returns false when pathname is null/undefined", () => {
    expect(isActivePath(null, "/projects")).toBe(false);
    expect(isActivePath(undefined, "/projects")).toBe(false);
  });

  it("handles root href correctly", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/projects", "/")).toBe(false);
  });

  it("matches exact path or segment-boundary prefix", () => {
    expect(isActivePath("/projects", "/projects")).toBe(true);
    expect(isActivePath("/projects/123", "/projects")).toBe(true);
  });

  it("does not match partial prefixes", () => {
    expect(isActivePath("/projectx", "/projects")).toBe(false);
    expect(isActivePath("/projects-2021", "/projects")).toBe(false);
  });
});

describe("helpers", () => {
  describe("arrayToUrlSlug", () => {
    it("should convert a simple array to URL slug", () => {
      const input = ["Hello", "World"];
      const expected = "hello-world";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle empty array", () => {
      const input: string[] = [];
      const expected = "";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle single item array", () => {
      const input = ["Single"];
      const expected = "single";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with special characters", () => {
      const input = ["Hello World!", "Test@123"];
      const expected = "hello/world/-test/123";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with numbers", () => {
      const input = ["Page", "123", "Title"];
      const expected = "page-123-title";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with mixed case", () => {
      const input = ["Hello", "WORLD", "Test"];
      const expected = "hello-world-test";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with multiple spaces", () => {
      const input = ["Hello   World", "Test   Case"];
      const expected = "hello/world-test/case";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with hyphens and underscores", () => {
      const input = ["Hello-World", "Test_Case"];
      const expected = "hello/world-test_case";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle null input", () => {
      const input = null as any;
      const expected = "";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle undefined input", () => {
      const input = undefined as any;
      const expected = "";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with empty strings", () => {
      const input = ["Hello", "", "World"];
      const expected = "hello--world";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with only empty strings", () => {
      const input = ["", "", ""];
      const expected = "--";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with unicode characters", () => {
      const input = ["Café", "Résumé"];
      const expected = "caf/-r/sum/";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with emojis", () => {
      const input = ["Hello", "👋", "World"];
      const expected = "hello-/-world";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with multiple special characters", () => {
      const input = ["Hello@World#Test", "Sample$Data%Value"];
      const expected = "hello/world/test-sample/data/value";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with leading/trailing spaces", () => {
      const input = ["  Hello  ", "  World  "];
      const expected = "/hello/-/world/";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with only special characters", () => {
      const input = ["!@#$%", "^&*()"];
      const expected = "/-/";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with mixed content", () => {
      const input = ["Hello World", "123", "Test@Case", "Final"];
      const expected = "hello/world-123-test/case-final";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with very long strings", () => {
      const input = [
        "Very Long String That Should Be Handled",
        "Another Long String",
      ];
      const expected =
        "very/long/string/that/should/be/handled-another/long/string";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with only numbers", () => {
      const input = ["123", "456", "789"];
      const expected = "123-456-789";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });

    it("should handle array with only special characters and spaces", () => {
      const input = ["! @ #", "$ % ^"];
      const expected = "/-/";
      expect(arrayToUrlSlug(input)).toBe(expected);
    });
  });

  describe("cn", () => {
    it("should merge simple class names", () => {
      const result = cn("text-red-500", "bg-blue-500");
      expect(result).toBe("text-red-500 bg-blue-500");
    });

    it("should handle single class name", () => {
      const result = cn("text-red-500");
      expect(result).toBe("text-red-500");
    });

    it("should handle empty strings", () => {
      const result = cn("", "text-red-500", "");
      expect(result).toBe("text-red-500");
    });

    it("should handle null and undefined values", () => {
      const result = cn(null, "text-red-500", undefined);
      expect(result).toBe("text-red-500");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class active-class");
    });

    it("should handle conditional classes with false condition", () => {
      const isActive = false;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class");
    });

    it("should handle arrays of class names", () => {
      const result = cn(["text-red-500", "bg-blue-500"], "p-4");
      expect(result).toBe("text-red-500 bg-blue-500 p-4");
    });

    it("should handle nested arrays", () => {
      const result = cn([["text-red-500", "bg-blue-500"], "p-4"]);
      expect(result).toBe("text-red-500 bg-blue-500 p-4");
    });

    it("should handle objects with boolean values", () => {
      const result = cn({
        "text-red-500": true,
        "bg-blue-500": false,
        "p-4": true,
      });
      expect(result).toBe("text-red-500 p-4");
    });

    it("should handle mixed input types", () => {
      const result = cn(
        "base-class",
        ["text-red-500", "bg-blue-500"],
        { "p-4": true, "m-2": false },
        "final-class"
      );
      expect(result).toBe(
        "base-class text-red-500 bg-blue-500 p-4 final-class"
      );
    });

    it("should handle Tailwind CSS conflicts", () => {
      const result = cn("p-4", "p-8");
      expect(result).toBe("p-8");
    });

    it("should handle complex Tailwind conflicts", () => {
      const result = cn("text-red-500 bg-blue-500", "text-blue-500 bg-red-500");
      expect(result).toBe("text-blue-500 bg-red-500");
    });

    it("should handle responsive classes", () => {
      const result = cn("p-4 md:p-6 lg:p-8", "p-2 md:p-4");
      expect(result).toBe("lg:p-8 p-2 md:p-4");
    });

    it("should handle state classes", () => {
      const result = cn(
        "text-gray-500",
        "hover:text-blue-500 focus:text-red-500"
      );
      expect(result).toBe(
        "text-gray-500 hover:text-blue-500 focus:text-red-500"
      );
    });

    it("should handle dark mode classes", () => {
      const result = cn(
        "text-gray-900 dark:text-white",
        "text-black dark:text-gray-100"
      );
      expect(result).toBe("text-black dark:text-gray-100");
    });

    it("should handle arbitrary values", () => {
      const result = cn("w-[100px]", "w-[200px]");
      expect(result).toBe("w-[200px]");
    });

    it("should handle custom CSS classes", () => {
      const result = cn("custom-class", "another-custom-class");
      expect(result).toBe("custom-class another-custom-class");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle all falsy values", () => {
      const result = cn(null, undefined, false, "", 0);
      expect(result).toBe("");
    });

    it("should handle complex nested structures", () => {
      const result = cn(
        "base",
        [["nested", "array"], "more"],
        { conditional: true, other: false },
        "final"
      );
      expect(result).toBe("base nested array more conditional final");
    });

    it("should handle function calls that return class names", () => {
      const getClasses = () => "dynamic-class";
      const result = cn("static-class", getClasses());
      expect(result).toBe("static-class dynamic-class");
    });

    it("should handle template literals", () => {
      const size = "lg";
      const result = cn(`text-${size}`, "bg-blue-500");
      expect(result).toBe("text-lg bg-blue-500");
    });

    it("should handle performance with many classes", () => {
      const manyClasses = Array.from({ length: 100 }, (_, i) => `class-${i}`);
      const result = cn(...manyClasses);
      expect(result).toContain("class-0");
      expect(result).toContain("class-99");
      expect(result.split(" ")).toHaveLength(100);
    });

    it("should handle edge case with only spaces", () => {
      const result = cn("   ", "  ", " ");
      expect(result).toBe("");
    });

    it("should handle edge case with mixed spaces and classes", () => {
      const result = cn("   ", "class", "  ", "another");
      expect(result).toBe("class another");
    });

    it("should handle deeply nested arrays", () => {
      const result = cn([[[["deep", "nesting"]]], "shallow"]);
      expect(result).toBe("deep nesting shallow");
    });

    it("should handle objects with nested arrays", () => {
      const result = cn({
        "base-class": true,
        "conditional-class": false,
        "array-class": ["nested", "array"],
      });
      expect(result).toBe("base-class array-class");
    });

    it("should handle very long class names", () => {
      const longClass =
        "very-long-class-name-that-might-cause-issues-with-tailwind-merge";
      const result = cn(longClass, "another-class");
      expect(result).toBe(`${longClass} another-class`);
    });

    it("should handle classes with special characters", () => {
      const result = cn(
        "class-with-dashes",
        "class_with_underscores",
        "class.with.dots"
      );
      expect(result).toBe(
        "class-with-dashes class_with_underscores class.with.dots"
      );
    });
  });

  describe("clamp", () => {
    describe("Basic Clamping", () => {
      it("returns value when between min and max", () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(0, 0, 10)).toBe(0);
        expect(clamp(10, 0, 10)).toBe(10);
      });

      it("returns min when value is below minimum", () => {
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(0, 5, 10)).toBe(5);
        expect(clamp(-10, -5, 5)).toBe(-5);
      });

      it("returns max when value is above maximum", () => {
        expect(clamp(15, 0, 10)).toBe(10);
        expect(clamp(20, 0, 10)).toBe(10);
        expect(clamp(10, 0, 5)).toBe(5);
      });
    });

    describe("Edge Cases", () => {
      it("returns min when value is NaN", () => {
        expect(clamp(NaN, 0, 10)).toBe(0);
        expect(clamp(NaN, -5, 5)).toBe(-5);
        expect(clamp(NaN, 100, 200)).toBe(100);
      });

      it("handles when min equals max", () => {
        expect(clamp(5, 10, 10)).toBe(10);
        expect(clamp(10, 10, 10)).toBe(10);
        expect(clamp(15, 10, 10)).toBe(10);
        expect(clamp(NaN, 10, 10)).toBe(10);
      });

      it("handles negative ranges", () => {
        expect(clamp(-5, -10, -1)).toBe(-5);
        expect(clamp(-15, -10, -1)).toBe(-10);
        expect(clamp(5, -10, -1)).toBe(-1);
        expect(clamp(NaN, -10, -1)).toBe(-10);
      });

      it("handles zero values", () => {
        expect(clamp(0, 0, 10)).toBe(0);
        expect(clamp(5, 0, 0)).toBe(0);
        expect(clamp(0, 0, 0)).toBe(0);
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(15, 0, 10)).toBe(10);
      });
    });

    describe("Boundary Conditions", () => {
      it("handles exact boundary values", () => {
        expect(clamp(0, 0, 10)).toBe(0); // At min boundary
        expect(clamp(10, 0, 10)).toBe(10); // At max boundary
        expect(clamp(5, 5, 10)).toBe(5); // At min boundary
        expect(clamp(10, 5, 10)).toBe(10); // At max boundary
      });

      it("handles values just outside boundaries", () => {
        expect(clamp(-0.1, 0, 10)).toBe(0); // Just below min
        expect(clamp(10.1, 0, 10)).toBe(10); // Just above max
        expect(clamp(4.9, 5, 10)).toBe(5); // Just below min
        expect(clamp(10.1, 5, 10)).toBe(10); // Just above max
      });

      it("handles very large numbers", () => {
        expect(clamp(1000000, 0, 100)).toBe(100);
        expect(clamp(-1000000, -100, 0)).toBe(-100);
        expect(clamp(1000000, 0, 1000000)).toBe(1000000);
      });

      it("handles very small numbers", () => {
        expect(clamp(0.000001, 0, 1)).toBe(0.000001);
        expect(clamp(-0.000001, 0, 1)).toBe(0);
        expect(clamp(0.000001, 0.000001, 1)).toBe(0.000001);
      });
    });

    describe("Floating Point Precision", () => {
      it("handles floating point values correctly", () => {
        expect(clamp(3.14, 0, 10)).toBe(3.14);
        expect(clamp(3.14, 0, 3)).toBe(3);
        expect(clamp(3.14, 4, 10)).toBe(4);
        expect(clamp(3.14, 0, 3.14)).toBe(3.14);
      });

      it("handles floating point boundaries", () => {
        expect(clamp(3.14159, 0, 3.14159)).toBe(3.14159);
        expect(clamp(3.1416, 0, 3.14159)).toBe(3.14159);
        expect(clamp(3.14158, 0, 3.14159)).toBe(3.14158);
      });
    });

    describe("Type Safety", () => {
      it("handles integer inputs", () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(-5, -10, 10)).toBe(-5);
        expect(clamp(100, 0, 50)).toBe(50);
      });

      it("handles mixed integer and float inputs", () => {
        expect(clamp(5.5, 0, 10)).toBe(5.5);
        expect(clamp(5, 0.5, 10.5)).toBe(5);
        expect(clamp(5.5, 0.5, 10.5)).toBe(5.5);
      });
    });

    describe("Real-world Scenarios", () => {
      it("clamps percentage values", () => {
        expect(clamp(50, 0, 100)).toBe(50);
        expect(clamp(150, 0, 100)).toBe(100);
        expect(clamp(-10, 0, 100)).toBe(0);
      });

      it("clamps RGB color values", () => {
        expect(clamp(128, 0, 255)).toBe(128);
        expect(clamp(300, 0, 255)).toBe(255);
        expect(clamp(-50, 0, 255)).toBe(0);
      });

      it("clamps array indices", () => {
        expect(clamp(5, 0, 9)).toBe(5);
        expect(clamp(15, 0, 9)).toBe(9);
        expect(clamp(-1, 0, 9)).toBe(0);
      });

      it("clamps viewport dimensions", () => {
        expect(clamp(800, 320, 1920)).toBe(800);
        expect(clamp(2000, 320, 1920)).toBe(1920);
        expect(clamp(200, 320, 1920)).toBe(320);
      });
    });

    describe("Performance", () => {
      it("handles many clamp operations efficiently", () => {
        const startTime = performance.now();
        const iterations = 10000;

        for (let i = 0; i < iterations; i++) {
          clamp(i, 0, 100);
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        // Should complete within reasonable time
        expect(duration).toBeLessThan(100); // 100ms
      });

      it("maintains performance with repeated calls", () => {
        const startTime = performance.now();
        const iterations = 1000;

        for (let i = 0; i < iterations; i++) {
          clamp(50, 0, 100);
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        // Should be very fast for repeated calls
        expect(duration).toBeLessThan(10); // 10ms
      });
    });

    describe("Function Interface", () => {
      it("returns a number", () => {
        const result = clamp(5, 0, 10);
        expect(typeof result).toBe("number");
      });

      it("returns the correct type for all scenarios", () => {
        expect(typeof clamp(5, 0, 10)).toBe("number");
        expect(typeof clamp(NaN, 0, 10)).toBe("number");
        expect(typeof clamp(-5, 0, 10)).toBe("number");
        expect(typeof clamp(15, 0, 10)).toBe("number");
      });
    });
  });
});
