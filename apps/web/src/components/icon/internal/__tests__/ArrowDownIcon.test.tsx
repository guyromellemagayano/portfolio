import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArrowDownIcon } from "../ArrowDownIcon";

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
// ARROW DOWN ICON TESTS
// ============================================================================

describe("ArrowDownIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<ArrowDownIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<ArrowDownIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<ArrowDownIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<ArrowDownIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<ArrowDownIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<ArrowDownIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<ArrowDownIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
    });

    it("has correct component type in data attributes", () => {
      render(<ArrowDownIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute(
        "data-icon-arrow-down-id",
        "test-id-icon-arrow-down"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ArrowDownIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ArrowDownIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ArrowDownIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<ArrowDownIcon />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<ArrowDownIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<ArrowDownIcon width="32" height="32" stroke="none" />);
      const icon = screen.getByTestId("test-id-icon-arrow-down-root");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "none");
      expect(icon).toHaveAttribute("stroke", "none");
    });
  });
});

// ============================================================================
// ARROW DOWN ICON SPECIFIC TESTS
// ============================================================================

describe("ArrowDownIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct arrow down path", () => {
      const { container } = render(<ArrowDownIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        "d",
        "M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
      );
    });

    it("has correct stroke properties", () => {
      const { container } = render(<ArrowDownIcon />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("stroke-width", "1.5");
      expect(path).toHaveAttribute("stroke-linecap", "round");
      expect(path).toHaveAttribute("stroke-linejoin", "round");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<ArrowDownIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("has hardcoded fill none", () => {
      const { container } = render(<ArrowDownIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("accepts custom stroke color", () => {
      const { container } = render(<ArrowDownIcon stroke="red" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "red");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<ArrowDownIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<ArrowDownIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(
        <ArrowDownIcon role="img" aria-label="Arrow down" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Arrow down");
    });
  });
});
