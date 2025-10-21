import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MailIcon } from "../_internal";

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
// MAIL ICON TESTS
// ============================================================================

describe("MailIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<MailIcon />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<MailIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<MailIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<MailIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<MailIcon />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<MailIcon />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<MailIcon />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<MailIcon />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("data-icon-mail-id", "test-id-icon-mail");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<MailIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<MailIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<MailIcon />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<MailIcon />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<MailIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-mail");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<MailIcon width="32" height="32" fill="currentColor" />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "none");
    });
  });
});

// ============================================================================
// MAIL ICON SPECIFIC TESTS
// ============================================================================

describe("MailIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders home page variant by default", () => {
      const { container } = render(<MailIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
      expect(svg).toHaveAttribute("fill", "none");

      const paths = container.querySelectorAll("path");
      expect(paths).toHaveLength(2);
    });

    it("renders home page variant when page prop is home", () => {
      const { container } = render(<MailIcon page="home" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
      expect(svg).toHaveAttribute("fill", "none");
      expect(svg).toHaveAttribute("stroke-width", "1.5");
      expect(svg).toHaveAttribute("stroke-linecap", "round");
      expect(svg).toHaveAttribute("stroke-linejoin", "round");

      const paths = container.querySelectorAll("path");
      expect(paths).toHaveLength(2);
    });

    it("renders about page variant when page prop is about", () => {
      const { container } = render(<MailIcon page="about" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");

      const path = container.querySelector("path");
      expect(path).toHaveAttribute(
        "d",
        "M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      );
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<MailIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has hardcoded fill none for home variant", () => {
      const { container } = render(<MailIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<MailIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<MailIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(<MailIcon role="img" aria-label="Mail" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Mail");
    });
  });
});
