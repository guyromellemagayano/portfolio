/**
 * @file apps/web/src/components/icon/__tests__/Icon.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Icon component.
 */

import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Icon } from "..";

import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Icon", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders icon with children correctly (no name prop)", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.tagName).toBe("svg");
    });

    it("renders icon with name prop correctly", () => {
      const { container } = render(<Icon name="x" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.tagName).toBe("svg");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("applies custom className with name prop", () => {
      const { container } = render(<Icon name="x" className="custom-class" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("custom-class");
    });

    it("passes through HTML attributes with name prop", () => {
      const { container } = render(
        <Icon name="x" data-test="test-value" width="32" height="32" />
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
    });
  });

  // ============================================================================
  // CONTENT VALIDATION TESTS
  // ============================================================================

  describe("Content Validation", () => {
    it("renders empty SVG when no content", () => {
      const { container } = render(<Icon>{null}</Icon>);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders empty SVG when children is undefined", () => {
      const { container } = render(<Icon>{undefined}</Icon>);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders empty SVG when children is empty string", () => {
      const { container } = render(<Icon>{""}</Icon>);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders when children has meaningful content", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector("path")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // MEMOIZATION TESTS
  // ============================================================================

  describe("Memoization", () => {
    it("renders memoized Icon correctly", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // COMPONENT STRUCTURE TESTS
  // ============================================================================

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon?.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has role img attribute", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("role", "img");
    });

    it("has aria-labelledby attribute with default name", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-labelledby", "icon-default");
    });

    it("renders children correctly", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
          <circle cx="12" cy="12" r="2" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      const path = icon?.querySelector("path");
      const circle = icon?.querySelector("circle");
      expect(path).toBeInTheDocument();
      expect(circle).toBeInTheDocument();
      expect(path).toHaveAttribute("d", "M10 10h4v4h-4z");
      expect(circle).toHaveAttribute("cx", "12");
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
    });

    it("has aria-labelledby with name prop", () => {
      const { container } = render(<Icon name="x" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-labelledby", "icon-x");
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("handles complex SVG content", () => {
      const { container } = render(
        <Icon>
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#rgb(255,255,0)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#rgb(255,0,0)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grad)" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector("defs")).toBeInTheDocument();
      expect(icon?.querySelector("rect")).toBeInTheDocument();
    });

    it("handles event handlers", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Icon onClick={handleClick}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      if (icon) fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      const { container } = render(
        <Icon
          width="32"
          height="32"
          fill="currentColor"
          stroke="none"
          style={{ color: "red" }}
          viewBox="0 0 24 24"
        >
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("stroke", "none");
      expect(icon).toHaveAttribute("style", "color: red;");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });
  });

  // ============================================================================
  // ICON NAME PROP TESTS
  // ============================================================================

  describe("Icon Name Prop", () => {
    describe("Basic Rendering with name prop", () => {
      it("renders X icon with name prop", () => {
        const { container } = render(<Icon name="x" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders Instagram icon with name prop", () => {
        const { container } = render(<Icon name="instagram" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders LinkedIn icon with name prop", () => {
        const { container } = render(<Icon name="linkedin" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders GitHub icon with name prop", () => {
        const { container } = render(<Icon name="github" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders ArrowDown icon with name prop", () => {
        const { container } = render(<Icon name="arrow-down" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("renders ArrowLeft icon with name prop", () => {
        const { container } = render(<Icon name="arrow-left" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("renders Briefcase icon with name prop", () => {
        const { container } = render(<Icon name="briefcase" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders ChevronDown icon with name prop", () => {
        const { container } = render(<Icon name="chevron-down" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      });

      it("renders ChevronRight icon with name prop", () => {
        const { container } = render(<Icon name="chevron-right" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("renders Close icon with name prop", () => {
        const { container } = render(<Icon name="close" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders Link icon with name prop", () => {
        const { container } = render(<Icon name="link" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders Mail icon with name prop", () => {
        const { container } = render(<Icon name="mail" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders Sun icon with name prop", () => {
        const { container } = render(<Icon name="sun" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("renders Moon icon with name prop", () => {
        const { container } = render(<Icon name="moon" />);
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });
    });

    describe("Name prop with custom props", () => {
      it("applies custom className with name prop", () => {
        const { container } = render(
          <Icon name="x" className="custom-class" />
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveClass("custom-class");
      });

      it("passes through HTML attributes with name prop", () => {
        const { container } = render(
          <Icon name="x" width="32" height="32" data-test="test-value" />
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("width", "32");
        expect(icon).toHaveAttribute("height", "32");
        expect(icon).toHaveAttribute("data-test", "test-value");
      });
    });

    describe("Name prop with viewBox", () => {
      it("X icon has correct viewBox", () => {
        const { container } = render(<Icon name="x" />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("ArrowDown icon has correct viewBox", () => {
        const { container } = render(<Icon name="arrow-down" />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("ChevronDown icon has correct viewBox", () => {
        const { container } = render(<Icon name="chevron-down" />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      });

      it("Mail icon has correct viewBox", () => {
        const { container } = render(<Icon name="mail" />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });
    });

    describe("Name prop with event handlers", () => {
      it("handles click events", () => {
        const handleClick = vi.fn();
        const { container } = render(<Icon name="x" onClick={handleClick} />);
        const icon = container.querySelector("svg");
        if (icon) fireEvent.click(icon);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("handles multiple event handlers", () => {
        const handleClick = vi.fn();
        const handleMouseEnter = vi.fn();
        const { container } = render(
          <Icon
            name="close"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
          />
        );
        const icon = container.querySelector("svg");
        if (icon) {
          fireEvent.click(icon);
          fireEvent.mouseEnter(icon);
        }
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ============================================================================
  // CUSTOM SVG CHILDREN TESTS (NO NAME PROP)
  // ============================================================================

  describe("Custom SVG Children (No Name Prop)", () => {
    describe("Basic Rendering with Custom SVG", () => {
      it("renders custom SVG with path element", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon?.querySelector("path")).toBeInTheDocument();
        expect(icon?.querySelector("path")).toHaveAttribute(
          "d",
          "M10 10h4v4h-4z"
        );
      });

      it("renders custom SVG with multiple elements", () => {
        const { container } = render(
          <Icon>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l4 4 8-8" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.querySelector("circle")).toBeInTheDocument();
        expect(icon?.querySelector("path")).toBeInTheDocument();
        expect(icon?.querySelector("circle")).toHaveAttribute("cx", "12");
        expect(icon?.querySelector("path")).toHaveAttribute(
          "d",
          "M8 12l4 4 8-8"
        );
      });
    });

    describe("Attributes with Custom SVG", () => {
      it("applies custom viewBox to SVG", () => {
        const { container } = render(
          <Icon viewBox="0 0 100 100">
            <path d="M10 10h80v80h-80z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 100 100");
      });

      it("applies custom width and height", () => {
        const { container } = render(
          <Icon width="64" height="64">
            <path d="M10 10h44v44h-44z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("width", "64");
        expect(icon).toHaveAttribute("height", "64");
      });

      it("applies custom className", () => {
        const { container } = render(
          <Icon className="custom-svg-icon">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveClass("custom-svg-icon");
      });
    });

    describe("ARIA Attributes with Custom SVG", () => {
      it("applies default aria-hidden attribute", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("applies default role attribute", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("role", "img");
      });

      it("applies aria-labelledby with default name", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-labelledby", "icon-default");
      });

      it("allows custom aria-label", () => {
        const { container } = render(
          <Icon aria-label="Custom icon">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-label", "Custom icon");
        // aria-hidden is still applied
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });
    });

    describe("Event Handlers with Custom SVG", () => {
      it("handles click events on custom SVG", () => {
        const handleClick = vi.fn();
        const { container } = render(
          <Icon onClick={handleClick}>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        if (icon) fireEvent.click(icon);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("handles multiple event handlers on custom SVG", () => {
        const handleClick = vi.fn();
        const handleMouseEnter = vi.fn();
        const handleMouseLeave = vi.fn();
        const { container } = render(
          <Icon
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        if (icon) {
          fireEvent.click(icon);
          fireEvent.mouseEnter(icon);
          fireEvent.mouseLeave(icon);
        }
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleMouseEnter).toHaveBeenCalledTimes(1);
        expect(handleMouseLeave).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ============================================================================
  // PAGE PROP TESTS
  // ============================================================================

  describe("Page Prop", () => {
    it("renders Mail icon with page prop 'about'", () => {
      const { container } = render(<Icon name="mail" page="about" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      // The about version path d starts with M6 5a3...
      const path = icon?.querySelector("path");
      expect(path).toHaveAttribute("d", expect.stringMatching(/^M6 5a3/));
    });

    it("renders Mail icon with default page prop", () => {
      const { container } = render(<Icon name="mail" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      const path = icon?.querySelector("path");
      // The default version path d starts with M2.75 7.75...
      expect(path).toHaveAttribute("d", expect.stringMatching(/^M2.75 7.75/));
    });

    it("ignores page prop for non-mail icons", () => {
      const { container } = render(<Icon name="x" page="about" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      // Page prop should not affect non-mail icons
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES TESTS
  // ============================================================================

  describe("ARIA Attributes", () => {
    it("applies correct ARIA attributes to all icons", () => {
      const { container } = render(<Icon name="x" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("aria-labelledby", "icon-x");
    });

    it("applies correct aria-labelledby for different icon names", () => {
      const iconNames = [
        "x",
        "instagram",
        "linkedin",
        "github",
        "arrow-down",
        "mail",
      ] as const;

      iconNames.forEach((iconName) => {
        const { container, unmount } = render(<Icon name={iconName} />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-labelledby", `icon-${iconName}`);
        unmount();
      });
    });
  });
});
