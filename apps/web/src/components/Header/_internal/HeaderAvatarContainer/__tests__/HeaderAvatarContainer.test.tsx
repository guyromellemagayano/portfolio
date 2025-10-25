// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderAvatarContainer } from "../HeaderAvatarContainer";

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

// Mock the useComponentId hook (already declared above)

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock the utils
const mockCreateComponentProps = vi.hoisted(() =>
  vi.fn((id, suffix, debugMode, additionalProps = {}) => {
    const attributes: Record<string, string> = {};
    if (id && suffix) {
      attributes[`data-${suffix}-id`] = `${id}-${suffix}`;
      attributes["data-testid"] = `${id}-${suffix}-root`;
    }
    if (debugMode === true) {
      attributes["data-debug-mode"] = "true";
    }
    return { ...attributes, ...additionalProps };
  })
);

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: mockCreateComponentProps,
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
    if (typeof src === "string") return src.trim() !== "";
    return true;
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

// Mock the CSS module
vi.mock("../HeaderAvatarContainer.module.css", () => ({
  default: {
    avatarContainer: "_avatarContainer_edd057",
  },
}));

describe("HeaderAvatarContainer", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderAvatarContainer />);
      expect(
        screen.getByTestId("test-id-header-avatar-container-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderAvatarContainer />);
      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderAvatarContainer className="custom-class" />);
      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveClass("custom-class");
    });

    it("renders as a div element", () => {
      render(<HeaderAvatarContainer />);
      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container.tagName).toBe("DIV");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided debugId when available", () => {
      render(<HeaderAvatarContainer debugId="custom-id" />);

      const container = screen.getByTestId(
        "custom-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "custom-id-header-avatar-container"
      );
    });

    it("uses provided debugId with test-id", () => {
      render(<HeaderAvatarContainer debugId="test-id" />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "test-id-header-avatar-container"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderAvatarContainer debugMode={true} />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderAvatarContainer debugMode={false} />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Props Forwarding", () => {
    it("forwards HTML attributes correctly", () => {
      render(
        <HeaderAvatarContainer
          id="test-id"
          data-test="test-data"
          aria-label="Test container"
        />
      );

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveAttribute("data-test", "test-data");
      expect(container).toHaveAttribute("aria-label", "Test container");
    });

    it("forwards multiple aria attributes", () => {
      render(
        <HeaderAvatarContainer
          aria-label="Avatar container"
          aria-describedby="description"
          aria-hidden="false"
        />
      );

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute("aria-label", "Avatar container");
      expect(container).toHaveAttribute("aria-describedby", "description");
      expect(container).toHaveAttribute("aria-hidden", "false");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container.tagName).toBe("DIV");
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toBeInTheDocument();
    });

    it("renders as a self-closing div", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container.children.length).toBe(0);
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the container component", () => {
      const ref = vi.fn();
      render(<HeaderAvatarContainer ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<HeaderAvatarContainer ref={ref} />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(ref).toHaveBeenCalledWith(container);
    });

    it("handles function refs correctly", () => {
      const ref = vi.fn();
      render(<HeaderAvatarContainer ref={ref} />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(ref).toHaveBeenCalledWith(container);
    });

    it("handles object refs correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<HeaderAvatarContainer ref={ref} />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(ref.current).toBe(container);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toBeInTheDocument();
    });

    it("passes through aria attributes", () => {
      render(
        <HeaderAvatarContainer aria-label="Avatar container" role="img" />
      );

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute("aria-label", "Avatar container");
      expect(container).toHaveAttribute("role", "img");
    });

    it("supports all standard aria attributes", () => {
      render(
        <HeaderAvatarContainer
          aria-label="Container"
          aria-describedby="desc"
          aria-labelledby="label"
          aria-hidden="true"
          aria-expanded="false"
        />
      );

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute("aria-label", "Container");
      expect(container).toHaveAttribute("aria-describedby", "desc");
      expect(container).toHaveAttribute("aria-labelledby", "label");
      expect(container).toHaveAttribute("aria-hidden", "true");
      expect(container).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies Tailwind classes correctly", () => {
      render(<HeaderAvatarContainer />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveClass(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
      );
    });

    it("combines custom className with Tailwind classes", () => {
      render(<HeaderAvatarContainer className="custom-class" />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveClass(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
        "custom-class"
      );
    });

    it("handles multiple custom classes", () => {
      render(<HeaderAvatarContainer className="custom-class another-class" />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveClass(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
        "custom-class another-class"
      );
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderAvatarContainer />);

      const initialContainer = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );

      rerender(<HeaderAvatarContainer />);

      const updatedContainer = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(updatedContainer).toBe(initialContainer);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderAvatarContainer />);

      rerender(<HeaderAvatarContainer className="new-class" />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveClass("new-class");
    });

    it("handles multiple prop changes efficiently", () => {
      const { rerender } = render(<HeaderAvatarContainer />);

      rerender(
        <HeaderAvatarContainer
          className="new-class"
          debugId="new-id"
          debugMode={true}
        />
      );

      const container = screen.getByTestId(
        "new-id-header-avatar-container-root"
      );
      expect(container).toHaveClass("new-class");
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "new-id-header-avatar-container"
      );
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Memoization", () => {
    it("renders base component when isMemoized is false", () => {
      render(<HeaderAvatarContainer isMemoized={false} />);
      expect(
        screen.getByTestId("test-id-header-avatar-container-root")
      ).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<HeaderAvatarContainer isMemoized={true} />);
      expect(
        screen.getByTestId("test-id-header-avatar-container-root")
      ).toBeInTheDocument();
    });

    it("defaults to base component when isMemoized is undefined", () => {
      render(<HeaderAvatarContainer />);
      expect(
        screen.getByTestId("test-id-header-avatar-container-root")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderAvatarContainer
          className="custom-class"
          debugId="custom-id"
          debugMode={true}
          aria-label="Test container"
          data-testid="custom-testid"
          id="test-id"
        />
      );

      const container = screen.getByTestId(
        "custom-id-header-avatar-container-root"
      );
      expect(container).toHaveClass("custom-class");
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "custom-id-header-avatar-container"
      );
      expect(container).toHaveAttribute("data-debug-mode", "true");
      expect(container).toHaveAttribute("aria-label", "Test container");
      expect(container).toHaveAttribute("id", "test-id");
    });

    it("handles undefined props gracefully", () => {
      render(
        <HeaderAvatarContainer
          className={undefined}
          debugId={undefined}
          debugMode={undefined}
        />
      );

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveAttribute(
        "data-header-avatar-container-id",
        "test-id-header-avatar-container"
      );
      expect(container).not.toHaveAttribute("data-debug-mode");
      expect(container).toHaveClass(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
      );
    });

    it("handles empty string className", () => {
      render(<HeaderAvatarContainer className="" />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveClass(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
        ""
      );
    });

    it("handles null className", () => {
      render(<HeaderAvatarContainer className={null as any} />);

      const container = screen.getByTestId(
        "test-id-header-avatar-container-root"
      );
      expect(container).toHaveClass(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
      );
    });
  });
});
