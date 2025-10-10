import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SunIcon } from "../internal";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ debugId, debugMode }) => ({
    componentId: debugId || "test-id",
    isDebugMode: debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

// ============================================================================
// SUN ICON TESTS
// ============================================================================

describe("SunIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<SunIcon />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<SunIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<SunIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<SunIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<SunIcon />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<SunIcon />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<SunIcon />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<SunIcon />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("data-icon-sun-id", "test-id-icon-sun");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<SunIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<SunIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<SunIcon />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<SunIcon />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<SunIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<SunIcon width="32" height="32" fill="currentColor" />);
      const icon = screen.getByTestId("test-id-icon-sun-root");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
    });
  });
});

// ============================================================================
// SUN ICON SPECIFIC TESTS
// ============================================================================

describe("SunIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct sun paths", () => {
      const { container } = render(<SunIcon />);
      const paths = container.querySelectorAll("path");
      expect(paths).toHaveLength(2);

      // First path (center circle)
      expect(paths[0]).toHaveAttribute(
        "d",
        "M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"
      );

      // Second path (sun rays)
      expect(paths[1]).toHaveAttribute(
        "d",
        "M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
      );
    });

    it("has correct stroke properties", () => {
      const { container } = render(<SunIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke-width", "1.5");
      expect(svg).toHaveAttribute("stroke-linecap", "round");
      expect(svg).toHaveAttribute("stroke-linejoin", "round");
    });

    it("has correct fill property on second path", () => {
      const { container } = render(<SunIcon />);
      const paths = container.querySelectorAll("path");
      expect(paths[1]).toHaveAttribute("fill", "none");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<SunIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("accepts custom fill color", () => {
      const { container } = render(<SunIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "black");
    });

    it("accepts custom stroke color", () => {
      const { container } = render(<SunIcon stroke="red" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "red");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<SunIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<SunIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(<SunIcon role="img" aria-label="Sun" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Sun");
    });
  });
});
