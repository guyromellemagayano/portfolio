import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GitHubIcon } from "../_internal";

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
// GITHUB ICON TESTS
// ============================================================================

describe("GitHubIcon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<GitHubIcon />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<GitHubIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<GitHubIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<GitHubIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<GitHubIcon />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<GitHubIcon />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<GitHubIcon />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<GitHubIcon />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute(
        "data-icon-github-id",
        "test-id-icon-github"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<GitHubIcon debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<GitHubIcon debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<GitHubIcon />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<GitHubIcon />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<GitHubIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-github");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<GitHubIcon width="32" height="32" fill="currentColor" />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
    });
  });
});

// ============================================================================
// GITHUB ICON SPECIFIC TESTS
// ============================================================================

describe("GitHubIcon Specific Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct GitHub path", () => {
      const { container } = render(<GitHubIcon />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        "d",
        "M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
      );
    });

    it("has correct fill rule properties", () => {
      const { container } = render(<GitHubIcon />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("fill-rule", "evenodd");
      expect(path).toHaveAttribute("clip-rule", "evenodd");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<GitHubIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("accepts custom fill color", () => {
      const { container } = render(<GitHubIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "black");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<GitHubIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<GitHubIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(
        <GitHubIcon role="img" aria-label="GitHub" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "GitHub");
    });
  });
});
