import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CloseIcon } from "../CloseIcon";

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
// CLOSE ICON TESTS
// ============================================================================

describe("CloseIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<CloseIcon />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<CloseIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<CloseIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<CloseIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<CloseIcon />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<CloseIcon />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<CloseIcon />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<CloseIcon />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("data-icon-close-id", "test-id-icon-close");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<CloseIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<CloseIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<CloseIcon />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<CloseIcon />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<CloseIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-close-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(
        <CloseIcon width="32" height="32" fill="currentColor" stroke="none" />
      );
      const icon = screen.getByTestId("test-id-icon-close-root");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("stroke", "none");
    });
  });
});

// ============================================================================
// CLOSE ICON SPECIFIC TESTS
// ============================================================================

describe("CloseIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct close path", () => {
      const { container } = render(<CloseIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        "d",
        "m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
      );
    });

    it("has correct stroke properties", () => {
      const { container } = render(<CloseIcon />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("fill", "none");
      expect(path).toHaveAttribute("stroke", "currentColor");
      expect(path).toHaveAttribute("stroke-width", "1.5");
      expect(path).toHaveAttribute("stroke-linecap", "round");
      expect(path).toHaveAttribute("stroke-linejoin", "round");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<CloseIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("accepts custom fill color", () => {
      const { container } = render(<CloseIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "black");
    });

    it("accepts custom stroke color", () => {
      const { container } = render(<CloseIcon stroke="red" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "red");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<CloseIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<CloseIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(<CloseIcon role="img" aria-label="Close" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Close");
    });
  });
});
