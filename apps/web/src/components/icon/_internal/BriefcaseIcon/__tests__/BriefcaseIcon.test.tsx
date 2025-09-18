import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import BriefcaseIcon from "../BriefcaseIcon";

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
// BRIEFCASE ICON TESTS
// ============================================================================

describe("BriefcaseIcon", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders icon correctly", () => {
      render(<BriefcaseIcon />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<BriefcaseIcon className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<BriefcaseIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<BriefcaseIcon data-test="test-value" width="24" height="24" />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(<BriefcaseIcon />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(<BriefcaseIcon />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct viewBox", () => {
      render(<BriefcaseIcon />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has correct component type in data attributes", () => {
      render(<BriefcaseIcon />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute(
        "data-icon-briefcase-id",
        "test-id-icon-briefcase"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<BriefcaseIcon _debugMode={true} />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<BriefcaseIcon _debugMode={false} />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<BriefcaseIcon />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<BriefcaseIcon />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<BriefcaseIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(<BriefcaseIcon width="32" height="32" stroke="none" />);
      const icon = screen.getByTestId("test-id-icon-briefcase-root");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "none");
      expect(icon).toHaveAttribute("stroke", "none");
      expect(icon).toHaveAttribute("stroke-width", "1.5");
      expect(icon).toHaveAttribute("stroke-linecap", "round");
      expect(icon).toHaveAttribute("stroke-linejoin", "round");
    });
  });
});

// ============================================================================
// BRIEFCASE ICON SPECIFIC TESTS
// ============================================================================

describe("BriefcaseIcon Specific Tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("SVG Content", () => {
    it("renders correct briefcase paths", () => {
      const { container } = render(<BriefcaseIcon />);
      const paths = container.querySelectorAll("path");
      expect(paths).toHaveLength(2);

      // First path (briefcase body)
      expect(paths[0]).toHaveAttribute(
        "d",
        "M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
      );

      // Second path (handle and details)
      expect(paths[1]).toHaveAttribute(
        "d",
        "M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
      );
    });

    it("has correct stroke properties", () => {
      const { container } = render(<BriefcaseIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke-width", "1.5");
      expect(svg).toHaveAttribute("stroke-linecap", "round");
      expect(svg).toHaveAttribute("stroke-linejoin", "round");
    });

    it("has correct CSS classes", () => {
      const { container } = render(<BriefcaseIcon />);
      const paths = container.querySelectorAll("path");

      // First path should have fill and stroke classes
      expect(paths[0]).toHaveClass(
        "fill-zinc-100",
        "stroke-zinc-400",
        "dark:fill-zinc-100/10",
        "dark:stroke-zinc-500"
      );

      // Second path should have stroke classes
      expect(paths[1]).toHaveClass("stroke-zinc-400", "dark:stroke-zinc-500");
    });
  });

  describe("Visual Properties", () => {
    it("renders with default styling", () => {
      const { container } = render(<BriefcaseIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("has hardcoded fill none", () => {
      const { container } = render(<BriefcaseIcon fill="black" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("accepts custom stroke color", () => {
      const { container } = render(<BriefcaseIcon stroke="red" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "red");
    });

    it("accepts custom width and height", () => {
      const { container } = render(<BriefcaseIcon width="24" height="24" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(<BriefcaseIcon />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("can accept custom ARIA attributes", () => {
      const { container } = render(
        <BriefcaseIcon role="img" aria-label="Briefcase" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Briefcase");
    });
  });
});
