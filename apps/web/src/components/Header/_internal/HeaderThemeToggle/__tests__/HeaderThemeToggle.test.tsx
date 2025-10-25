// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderThemeToggle } from "../HeaderThemeToggle";

// Individual mocks for this test file

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

// Mock @web/lib
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  THEME_TOGGLE_LABELS: {
    toggleTheme: "Toggle theme",
  },
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
}));

// Mock the web utils
vi.mock("@web/utils", () => ({
  isActivePath: vi.fn(() => true), // Always return true for testing
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
}));

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    id: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (componentId, suffix, isDebugMode, additionalProps = {}) => {
      const attributes: Record<string, string> = {};
      if (componentId && suffix) {
        attributes[`data-${suffix}-id`] = `${componentId}-${suffix}`;
        attributes["data-testid"] = `${componentId}-${suffix}-root`;
      }
      if (isDebugMode === true) {
        attributes["data-debug-mode"] = "true";
      }
      return { ...attributes, ...additionalProps };
    }
  ),
  isRenderableContent: vi.fn((children) => {
    if (children == null) return false;
    if (typeof children === "string") return children.trim() !== "";
    if (Array.isArray(children))
      return children.some((child) => child != null && child !== "");
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  hasValidContent: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  isValidLink: vi.fn((href) => {
    if (!href) return false;
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    if (hrefString === "#" || hrefString === "") return false;
    return true;
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href) return { target: "_self" };
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
  isValidImageSrc: vi.fn((src) => {
    if (!src) return false;
    if (typeof src !== "string") return false;
    return src.trim() !== "";
  }),
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href, className, ...props }) => {
    const React = require("react");
    return React.createElement(
      "a",
      {
        "data-testid": "next-link",
        href,
        className,
        ...props,
      },
      children
    );
  }),
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    resolvedTheme: "light",
    setTheme: vi.fn(),
  })),
}));

// Mock the Icon component
vi.mock("@web/components/icon", () => ({
  Icon: {
    Sun: ({ className, ...props }: any) => (
      <svg data-testid="sun-icon" className={className} {...props} />
    ),
    Moon: ({ className, ...props }: any) => (
      <svg data-testid="moon-icon" className={className} {...props} />
    ),
  },
}));

// Mock the data
vi.mock("../../Header.data", () => ({
  THEME_TOGGLE_LABELS: {
    toggleTheme: "Toggle theme",
  },
}));

// Remove CSS modules mock since component uses Tailwind

describe("HeaderThemeToggle", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderThemeToggle />);
      expect(
        screen.getByTestId("test-id-header-theme-toggle-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderThemeToggle />);
      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderThemeToggle className="custom-class" />);
      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided debugId when available", () => {
      render(<HeaderThemeToggle debugId="custom-id" />);

      const button = screen.getByTestId("custom-id-header-theme-toggle-root");
      expect(button).toHaveAttribute(
        "data-header-theme-toggle-id",
        "custom-id-header-theme-toggle"
      );
    });

    it("uses provided debugId when available", () => {
      render(<HeaderThemeToggle debugId="test-id" />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveAttribute(
        "data-header-theme-toggle-id",
        "test-id-header-theme-toggle"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderThemeToggle debugMode={true} />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderThemeToggle debugMode={false} />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Theme Icons", () => {
    it("renders sun icon", () => {
      render(<HeaderThemeToggle />);

      expect(
        screen.getByTestId("test-id-header-theme-toggle-sun-icon-root")
      ).toBeInTheDocument();
    });

    it("renders moon icon", () => {
      render(<HeaderThemeToggle />);

      expect(
        screen.getByTestId("test-id-header-theme-toggle-moon-icon-root")
      ).toBeInTheDocument();
    });

    it("applies correct CSS classes to icons", () => {
      render(<HeaderThemeToggle />);

      const sunIcon = screen.getByTestId(
        "test-id-header-theme-toggle-sun-icon-root"
      );
      const moonIcon = screen.getByTestId(
        "test-id-header-theme-toggle-moon-icon-root"
      );

      // Check for Tailwind classes instead of CSS modules
      expect(sunIcon).toHaveClass(
        "h-6",
        "w-6",
        "fill-zinc-100",
        "stroke-zinc-500"
      );
      expect(moonIcon).toHaveClass(
        "h-6",
        "w-6",
        "fill-zinc-700",
        "stroke-zinc-500"
      );
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderThemeToggle />);

      expect(
        screen.getByTestId("test-id-header-theme-toggle-root")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-theme-toggle-sun-icon-root")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-theme-toggle-moon-icon-root")
      ).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button.tagName).toBe("BUTTON");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the button component", () => {
      const ref = vi.fn();
      render(<HeaderThemeToggle ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<HeaderThemeToggle ref={ref} />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(ref).toHaveBeenCalledWith(button);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveAttribute("aria-label");
    });

    it("passes through aria attributes", () => {
      render(<HeaderThemeToggle aria-describedby="description" />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("CSS Integration", () => {
    it("applies Tailwind classes correctly", () => {
      render(<HeaderThemeToggle />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveClass(
        "group",
        "rounded-full",
        "bg-white/90",
        "px-3",
        "py-2"
      );
    });

    it("combines custom className with Tailwind classes", () => {
      render(<HeaderThemeToggle className="custom-class" />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass("group", "rounded-full", "bg-white/90");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderThemeToggle />);

      const initialButton = screen.getByTestId(
        "test-id-header-theme-toggle-root"
      );

      rerender(<HeaderThemeToggle />);

      const updatedButton = screen.getByTestId(
        "test-id-header-theme-toggle-root"
      );
      expect(updatedButton).toBe(initialButton);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderThemeToggle />);

      rerender(<HeaderThemeToggle className="new-class" />);

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toHaveClass("new-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderThemeToggle
          className="custom-class"
          debugId="test-id"
          debugMode={true}
          aria-label="Custom theme toggle"
        />
      );

      const button = screen.getByTestId("test-id-header-theme-toggle-root");
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveAttribute(
        "data-header-theme-toggle-id",
        "test-id-header-theme-toggle"
      );
      expect(button).toHaveAttribute("data-debug-mode", "true");
      // Component overrides aria-label with computed theme value
      expect(button).toHaveAttribute("aria-label", "Switch to dark theme");
    });
  });
});
