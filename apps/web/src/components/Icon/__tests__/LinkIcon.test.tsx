import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LinkIcon } from "../_internal";

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
// LINK ICON TESTS
// ============================================================================

describe("LinkIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<LinkIcon />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<LinkIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<LinkIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<LinkIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<LinkIcon />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<LinkIcon />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<LinkIcon />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<LinkIcon />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("data-icon-link-id", "test-id-icon-link");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<LinkIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<LinkIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<LinkIcon />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<LinkIcon />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<LinkIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-link");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<LinkIcon width="32" height="32" fill="currentColor" />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
    });
  });
});

// ============================================================================
// LINK ICON SPECIFIC TESTS
// ============================================================================

describe("LinkIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct link path", () => {
      const { container } = render(<LinkIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        "d",
        "M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
      );
    });

    it("has correct fill property", () => {
      const { container } = render(<LinkIcon />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("fill", "currentColor");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<LinkIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("accepts custom fill color", () => {
      const { container } = render(<LinkIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "black");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<LinkIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<LinkIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(<LinkIcon role="img" aria-label="Link" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Link");
    });
  });
});
