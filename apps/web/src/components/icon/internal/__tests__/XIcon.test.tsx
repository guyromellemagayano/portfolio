import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { XIcon } from "../XIcon";

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
// X ICON TESTS
// ============================================================================

describe("XIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<XIcon />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<XIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<XIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<XIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<XIcon />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<XIcon />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<XIcon />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<XIcon />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute(
        "data-icon-x-twitter-id",
        "test-id-icon-x-twitter"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<XIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<XIcon _debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<XIcon />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<XIcon />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<XIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<XIcon width="32" height="32" fill="currentColor" />);
      const icon = screen.getByTestId("test-id-icon-x-twitter-root");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
    });
  });
});

// ============================================================================
// X ICON SPECIFIC TESTS
// ============================================================================

describe("XIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct X icon path", () => {
      const { container } = render(<XIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        "d",
        "M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"
      );
    });

    it("has no fill attribute on path (uses default)", () => {
      const { container } = render(<XIcon />);
      const path = container.querySelector("path");
      expect(path).not.toHaveAttribute("fill");
    });
  });

  describe("Accessibility", () => {
    it("can accept custom ARIA attributes", () => {
      const { container } = render(<XIcon role="img" aria-label="Close" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Close");
    });
  });
});
