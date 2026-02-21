/**
 * @file apps/web/src/components/icon/__tests__/Icon.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Icon component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Icon } from "..";

import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Icon Integration Tests", () => {
  // ============================================================================
  // NAME PROP INTEGRATION
  // ============================================================================

  describe("Name Prop Integration", () => {
    it("renders X icon with name prop and correct attributes", () => {
      const { container } = render(<Icon name="x" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon).toHaveAttribute("aria-labelledby", "icon-x");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Instagram icon with name prop", () => {
      const { container } = render(<Icon name="instagram" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders LinkedIn icon with name prop", () => {
      const { container } = render(<Icon name="linkedin" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders GitHub icon with name prop and dimensions", () => {
      const { container } = render(
        <Icon name="github" width="32" height="32" />
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ArrowDown icon with name prop", () => {
      const { container } = render(<Icon name="arrow-down" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ArrowLeft icon with name prop", () => {
      const { container } = render(<Icon name="arrow-left" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Briefcase icon with name prop", () => {
      const { container } = render(<Icon name="briefcase" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ChevronDown icon with name prop", () => {
      const { container } = render(<Icon name="chevron-down" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ChevronRight icon with name prop", () => {
      const { container } = render(<Icon name="chevron-right" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Close icon with name prop", () => {
      const { container } = render(<Icon name="close" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Link icon with name prop", () => {
      const { container } = render(<Icon name="link" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Mail icon with name prop", () => {
      const { container } = render(<Icon name="mail" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Sun icon with name prop", () => {
      const { container } = render(<Icon name="sun" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Moon icon with name prop", () => {
      const { container } = render(<Icon name="moon" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon?.tagName).toBe("svg");
    });
  });

  // ============================================================================
  // PROP CONSISTENCY INTEGRATION
  // ============================================================================

  describe("Prop Consistency Integration", () => {
    it("handles prop drilling correctly across all icons", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="instagram" />
          <Icon name="linkedin" />
          <Icon name="github" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(4);

      svgs.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("role", "img");
        expect(icon?.tagName).toBe("svg");
      });
    });

    it("handles HTML attributes consistently", () => {
      const { container } = render(
        <div>
          <Icon name="x" width="24" height="24" className="icon-class" />
          <Icon
            name="instagram"
            width="24"
            height="24"
            className="icon-class"
          />
          <Icon name="linkedin" width="24" height="24" className="icon-class" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");

      svgs.forEach((icon) => {
        expect(icon).toHaveAttribute("width", "24");
        expect(icon).toHaveAttribute("height", "24");
        expect(icon).toHaveClass("icon-class");
      });
    });
  });

  // ============================================================================
  // STATE CONSISTENCY INTEGRATION
  // ============================================================================

  describe("State Consistency Integration", () => {
    it("maintains consistent accessibility attributes", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="instagram" />
          <Icon name="arrow-down" />
          <Icon name="close" />
          <Icon name="link" />
          <Icon name="mail" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");

      svgs.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("role", "img");
        expect(icon?.tagName).toBe("svg");
      });
    });
  });

  // ============================================================================
  // CROSS-ICON BEHAVIOR INTEGRATION
  // ============================================================================

  describe("Cross-Icon Behavior Integration", () => {
    it("renders all social icons with consistent behavior", () => {
      const socialIcons = ["x", "instagram", "linkedin", "github"] as const;

      socialIcons.forEach((iconName) => {
        const { container, unmount } = render(<Icon name={iconName} />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("role", "img");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
        expect(icon?.tagName).toBe("svg");
        unmount();
      });
    });

    it("renders all navigation icons with consistent behavior", () => {
      const navigationIcons = [
        "arrow-down",
        "arrow-left",
        "chevron-down",
        "chevron-right",
      ] as const;

      navigationIcons.forEach((iconName) => {
        const { container, unmount } = render(<Icon name={iconName} />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("role", "img");
        expect(icon?.tagName).toBe("svg");
        unmount();
      });
    });

    it("renders all UI icons with consistent behavior", () => {
      const uiIcons = [
        "close",
        "link",
        "mail",
        "briefcase",
        "sun",
        "moon",
      ] as const;

      uiIcons.forEach((iconName) => {
        const { container, unmount } = render(<Icon name={iconName} />);
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("role", "img");
        expect(icon?.tagName).toBe("svg");
        unmount();
      });
    });

    it("handles mixed icon types in the same container", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="arrow-down" />
          <Icon name="close" />
          <Icon name="link" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(4);

      svgs.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("role", "img");
        expect(icon?.tagName).toBe("svg");
      });
    });
  });

  // ============================================================================
  // CUSTOM SVG CHILDREN INTEGRATION
  // ============================================================================

  describe("Custom SVG Children Integration", () => {
    it("renders custom SVG alongside named icons", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
          <Icon name="instagram" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(3);

      // All should have consistent ARIA attributes
      svgs.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("role", "img");
      });

      // Custom SVG should have path
      const customIcon = svgs[1];
      expect(customIcon?.querySelector("path")).toBeInTheDocument();
    });

    it("handles custom SVG with all standard attributes", () => {
      const { container } = render(
        <Icon
          viewBox="0 0 100 100"
          width="100"
          height="100"
          className="custom-icon"
          data-test="custom-svg"
        >
          <circle cx="50" cy="50" r="40" />
          <path d="M30 50 L50 70 L70 30" />
        </Icon>
      );

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 100 100");
      expect(icon).toHaveAttribute("width", "100");
      expect(icon).toHaveAttribute("height", "100");
      expect(icon).toHaveClass("custom-icon");
      expect(icon).toHaveAttribute("data-test", "custom-svg");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("aria-labelledby", "icon-default");
      expect(icon?.querySelector("circle")).toBeInTheDocument();
      expect(icon?.querySelector("path")).toBeInTheDocument();
    });

    it("maintains consistent behavior between custom and named icons", () => {
      const { container } = render(
        <div>
          <Icon name="x" className="icon-class" width="24" height="24" />
          <Icon className="icon-class" width="24" height="24">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(2);

      svgs.forEach((svg) => {
        expect(svg).toHaveClass("icon-class");
        expect(svg).toHaveAttribute("width", "24");
        expect(svg).toHaveAttribute("height", "24");
        expect(svg).toHaveAttribute("role", "img");
        expect(svg).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("handles complex custom SVG structures", () => {
      const { container } = render(
        <Icon viewBox="0 0 200 200">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
              <stop offset="100%" stopColor="#0000ff" stopOpacity="1" />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#grad1)" />
          <circle cx="100" cy="100" r="50" fill="white" filter="url(#blur)" />
          <path d="M50 100 L100 50 L150 100 L100 150 Z" fill="black" />
        </Icon>
      );

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector("defs")).toBeInTheDocument();
      expect(icon?.querySelector("linearGradient")).toBeInTheDocument();
      expect(icon?.querySelector("filter")).toBeInTheDocument();
      expect(icon?.querySelector("rect")).toBeInTheDocument();
      expect(icon?.querySelector("circle")).toBeInTheDocument();
      expect(icon?.querySelector("path")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // PAGE PROP INTEGRATION
  // ============================================================================

  describe("Page Prop Integration", () => {
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
  });
});
