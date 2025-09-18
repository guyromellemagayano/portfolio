import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ChevronRightIcon from "../ChevronRightIcon";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "test-id",
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
// CHEVRON RIGHT ICON TESTS
// ============================================================================

describe("ChevronRightIcon", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<ChevronRightIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<ChevronRightIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<ChevronRightIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(
        <ChevronRightIcon data-test="test-value" width="16" height="16" />
      );
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "16");
      expect(icon).toHaveAttribute("height", "16");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<ChevronRightIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<ChevronRightIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<ChevronRightIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
    });

    it("has correct component type in data attributes", () => {
      render(<ChevronRightIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute(
        "data-icon-chevron-right-id",
        "test-id-icon-chevron-right"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ChevronRightIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ChevronRightIcon _debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ChevronRightIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<ChevronRightIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<ChevronRightIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<ChevronRightIcon width="24" height="24" stroke="none" />);
      const icon = screen.getByTestId("test-id-icon-chevron-right-root");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
      expect(icon).toHaveAttribute("fill", "none");
      expect(icon).toHaveAttribute("stroke", "none");
    });
  });
});

// ============================================================================
// CHEVRON RIGHT ICON SPECIFIC TESTS
// ============================================================================

describe("ChevronRightIcon Specific Tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct chevron right path", () => {
      const { container } = render(<ChevronRightIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute("d", "M6.75 5.75 9.25 8l-2.5 2.25");
    });

    it("has correct stroke properties", () => {
      const { container } = render(<ChevronRightIcon />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("stroke-width", "1.5");
      expect(path).toHaveAttribute("stroke-linecap", "round");
      expect(path).toHaveAttribute("stroke-linejoin", "round");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<ChevronRightIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("has hardcoded fill none", () => {
      const { container } = render(<ChevronRightIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("accepts custom stroke color", () => {
      const { container } = render(<ChevronRightIcon stroke="red" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "red");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<ChevronRightIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<ChevronRightIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(
        <ChevronRightIcon role="img" aria-label="Chevron right" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Chevron right");
    });
  });
});
