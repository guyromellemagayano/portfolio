import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ChevronDownIcon from "../ChevronDownIcon";

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
// CHEVRON DOWN ICON TESTS
// ============================================================================

describe("ChevronDownIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<ChevronDownIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<ChevronDownIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<ChevronDownIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<ChevronDownIcon data-test="test-value" width="8" height="6" />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "8");
      expect(icon).toHaveAttribute("height", "6");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<ChevronDownIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<ChevronDownIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<ChevronDownIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
    });

    it("has correct component type in data attributes", () => {
      render(<ChevronDownIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute(
        "data-icon-chevron-down-id",
        "test-id-icon-chevron-down"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ChevronDownIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ChevronDownIcon _debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ChevronDownIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<ChevronDownIcon />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<ChevronDownIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<ChevronDownIcon width="16" height="12" stroke="none" />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("width", "16");
      expect(icon).toHaveAttribute("height", "12");
      expect(icon).toHaveAttribute("stroke", "none");
    });
  });
});

// ============================================================================
// CHEVRON DOWN ICON SPECIFIC TESTS
// ============================================================================

describe("ChevronDownIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct chevron down path", () => {
      const { container } = render(<ChevronDownIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute("d", "M1.75 1.75 4 4.25l2.25-2.5");
    });

    it("has correct stroke properties", () => {
      const { container } = render(<ChevronDownIcon />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("fill", "none");
      expect(path).toHaveAttribute("stroke-width", "1.5");
      expect(path).toHaveAttribute("stroke-linecap", "round");
      expect(path).toHaveAttribute("stroke-linejoin", "round");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<ChevronDownIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 8 6");
    });

    it("has hardcoded fill none on path", () => {
      const { container } = render(<ChevronDownIcon fill="black" />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("fill", "none");
    });

    it("accepts custom stroke color", () => {
      const { container } = render(<ChevronDownIcon stroke="red" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "red");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<ChevronDownIcon width="16" height="12" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "16");
      expect(svg).toHaveAttribute("height", "12");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<ChevronDownIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(
        <ChevronDownIcon role="img" aria-label="Chevron down" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Chevron down");
    });
  });
});
