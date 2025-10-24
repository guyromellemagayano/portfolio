import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArrowLeftIcon } from "../ArrowLeftIcon";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
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
      "data-testid": `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
}));

// ============================================================================
// ARROW LEFT ICON TESTS
// ============================================================================

describe("ArrowLeftIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<ArrowLeftIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<ArrowLeftIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<ArrowLeftIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<ArrowLeftIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<ArrowLeftIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<ArrowLeftIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<ArrowLeftIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
    });

    it("has correct component type in data attributes", () => {
      render(<ArrowLeftIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute(
        "data-icon-arrow-left-id",
        "test-id-icon-arrow-left"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ArrowLeftIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ArrowLeftIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ArrowLeftIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<ArrowLeftIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<ArrowLeftIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<ArrowLeftIcon width="32" height="32" stroke="none" />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "none");
      expect(icon).toHaveAttribute("stroke", "none");
    });
  });
});

// ============================================================================
// ARROW LEFT ICON SPECIFIC TESTS
// ============================================================================

describe("ArrowLeftIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct arrow left path", () => {
      const { container } = render(<ArrowLeftIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        "d",
        "M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
      );
    });

    it("has correct stroke properties", () => {
      const { container } = render(<ArrowLeftIcon />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("stroke-width", "1.5");
      expect(path).toHaveAttribute("stroke-linecap", "round");
      expect(path).toHaveAttribute("stroke-linejoin", "round");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<ArrowLeftIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("has hardcoded fill none", () => {
      const { container } = render(<ArrowLeftIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("accepts custom stroke color", () => {
      const { container } = render(<ArrowLeftIcon stroke="red" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "red");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<ArrowLeftIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<ArrowLeftIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(
        <ArrowLeftIcon role="img" aria-label="Arrow left" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Arrow left");
    });
  });
});
