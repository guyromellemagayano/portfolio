import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LinkedinIcon } from "../_internal";

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
// LINKEDIN ICON TESTS
// ============================================================================

describe("LinkedinIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<LinkedinIcon />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<LinkedinIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<LinkedinIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<LinkedinIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<LinkedinIcon />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<LinkedinIcon />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<LinkedinIcon />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<LinkedinIcon />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute(
        "data-icon-linkedin-id",
        "test-id-icon-linkedin"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<LinkedinIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<LinkedinIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<LinkedinIcon />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<LinkedinIcon />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<LinkedinIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<LinkedinIcon width="32" height="32" fill="currentColor" />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
    });
  });
});

// ============================================================================
// LINKEDIN ICON SPECIFIC TESTS
// ============================================================================

describe("LinkedinIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct LinkedIn path", () => {
      const { container } = render(<LinkedinIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        "d",
        "M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
      );
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<LinkedinIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("accepts custom fill color", () => {
      const { container } = render(<LinkedinIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "black");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<LinkedinIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<LinkedinIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(
        <LinkedinIcon role="img" aria-label="LinkedIn" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "LinkedIn");
    });
  });
});
