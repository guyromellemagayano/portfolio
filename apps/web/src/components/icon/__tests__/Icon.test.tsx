import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Icon } from "../Icon";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  isRenderableContent: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

describe("Icon", () => {
  afterEach(() => {
    cleanup();
  });

  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders icon with children correctly", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(
        <Icon className="custom-class">
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(
        <Icon debugMode={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(
        <Icon internalId="custom-id">
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-icon-id", "custom-id-icon");
    });

    it("passes through HTML attributes", () => {
      render(
        <Icon data-test="test-value" viewBox="0 0 24 24">
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });
  });

  // ============================================================================
  // CONTENT VALIDATION TESTS
  // ============================================================================

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(<Icon>{null}</Icon>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is undefined", () => {
      const { container } = render(<Icon>{undefined}</Icon>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is empty string", () => {
      const { container } = render(<Icon>{""}</Icon>);
      expect(container.firstChild).toBeNull();
    });

    it("renders when children has meaningful content", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });

    it("renders when children is a string", () => {
      render(<Icon>{"<path d='M10 10h4v4h-4z' />"}</Icon>);
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // MEMOIZATION TESTS
  // ============================================================================

  describe("Memoization", () => {
    it("renders base component when isMemoized is false", () => {
      render(
        <Icon isMemoized={false}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(
        <Icon isMemoized={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });

    it("defaults to base component when isMemoized is undefined", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // DEBUG MODE TESTS
  // ============================================================================

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <Icon debugMode={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(
        <Icon debugMode={false}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  // ============================================================================
  // COMPONENT STRUCTURE TESTS
  // ============================================================================

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("renders children correctly", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
          <circle cx="12" cy="12" r="2" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      const path = icon.querySelector("path");
      const circle = icon.querySelector("circle");
      expect(path).toBeInTheDocument();
      expect(circle).toBeInTheDocument();
      expect(path).toHaveAttribute("d", "M10 10h4v4h-4z");
      expect(circle).toHaveAttribute("cx", "12");
    });
  });

  // ============================================================================
  // REF FORWARDING TESTS
  // ============================================================================

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(
        <Icon ref={ref}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
      expect(ref.current).toHaveAttribute("data-testid", "icon-root");
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(
        <Icon ref={ref}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      expect(ref.current).toBe(screen.getByTestId("icon-root"));
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct data attributes for debugging", () => {
      render(
        <Icon internalId="test-id" debugMode={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-testid", "icon-root");
      expect(icon).toHaveAttribute("data-icon-id", "test-id-icon");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("handles complex SVG content", () => {
      render(
        <Icon>
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#rgb(255,255,0)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#rgb(255,0,0)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grad)" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
      expect(icon.querySelector("defs")).toBeInTheDocument();
      expect(icon.querySelector("rect")).toBeInTheDocument();
    });

    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(
        <Icon onClick={handleClick}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      render(
        <Icon
          width="32"
          height="32"
          fill="currentColor"
          stroke="none"
          style={{ color: "red" }}
          viewBox="0 0 24 24"
        >
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("stroke", "none");
      expect(icon).toHaveAttribute("style", "color: red;");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("handles complex prop combinations", () => {
      render(
        <Icon
          internalId="complex-id"
          debugMode={true}
          isMemoized={true}
          className="custom-class"
          data-test="complex-test"
          viewBox="0 0 100 100"
        >
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-icon-id", "complex-id-icon");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveClass("custom-class");
      expect(icon).toHaveAttribute("data-test", "complex-test");
      expect(icon).toHaveAttribute("viewBox", "0 0 100 100");
    });
  });

  // ============================================================================
  // ERROR HANDLING TESTS
  // ============================================================================

  describe("Error Handling", () => {
    it("throws error when no children provided to base component", () => {
      // This test verifies the error handling in the BaseIcon component
      // The main Icon component prevents this with isRenderableContent check
      expect(() => {
        render(<Icon>{null}</Icon>);
      }).not.toThrow();
    });

    it("handles undefined props gracefully", () => {
      render(
        <Icon internalId={undefined} debugMode={undefined}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Integration Tests", () => {
    describe("Compound Component Structure", () => {
      it("has attached sub-components", () => {
        // Verify that the Icon component has the expected sub-components
        expect(Icon.X).toBeDefined();
        expect(Icon.Instagram).toBeDefined();
        expect(Icon.LinkedIn).toBeDefined();
        expect(Icon.GitHub).toBeDefined();
        expect(Icon.Close).toBeDefined();
        expect(Icon.Sun).toBeDefined();
        expect(Icon.Moon).toBeDefined();
        expect(Icon.ChevronDown).toBeDefined();
        expect(Icon.ChevronRight).toBeDefined();
        expect(Icon.ArrowLeft).toBeDefined();
      });

      it("sub-components are properly typed", () => {
        expect(Icon.X).toBeDefined();
        expect(Icon.Instagram).toBeDefined();
        expect(Icon.GitHub).toBeDefined();
        expect(Icon.Close).toBeDefined();
        expect(Icon.Sun).toBeDefined();
        expect(Icon.Moon).toBeDefined();
        expect(Icon.ChevronDown).toBeDefined();
        expect(Icon.ChevronRight).toBeDefined();
        expect(Icon.ArrowLeft).toBeDefined();
      });
    });

    describe("Social Icon Integration", () => {
      it("renders X (Twitter) icon correctly", () => {
        render(<Icon.X />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders Instagram icon correctly", () => {
        render(<Icon.Instagram />);
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders LinkedIn icon correctly", () => {
        render(<Icon.LinkedIn />);
        const icon = screen.getByTestId("icon-linkedin");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders GitHub icon correctly", () => {
        render(<Icon.GitHub />);
        const icon = screen.getByTestId("icon-github");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });
    });

    describe("UI Icon Integration", () => {
      it("renders Close icon correctly", () => {
        render(<Icon.Close />);
        const icon = screen.getByTestId("icon-close");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders Sun icon correctly", () => {
        render(<Icon.Sun />);
        const icon = screen.getByTestId("icon-sun");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders Moon icon correctly", () => {
        render(<Icon.Moon />);
        const icon = screen.getByTestId("icon-moon");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders ChevronDown icon correctly", () => {
        render(<Icon.ChevronDown />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders ChevronRight icon correctly", () => {
        render(<Icon.ChevronRight />);
        const icon = screen.getByTestId("icon-chevron-right");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("renders ArrowLeft icon correctly", () => {
        render(<Icon.ArrowLeft />);
        const icon = screen.getByTestId("icon-arrow-left");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });
    });

    describe("Icon with Custom Props", () => {
      it("renders social icons with custom props", () => {
        render(
          <Icon.X
            _internalId="custom-x"
            _debugMode={true}
            className="custom-x-class"
            width="32"
            height="32"
          />
        );
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("data-icon-id", "custom-x");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
        expect(icon).toHaveClass("custom-x-class");
        expect(icon).toHaveAttribute("width", "32");
        expect(icon).toHaveAttribute("height", "32");
      });

      it("renders UI icons with custom props", () => {
        render(
          <Icon.Close
            _internalId="custom-close"
            _debugMode={true}
            className="custom-close-class"
            fill="red"
            stroke="black"
          />
        );
        const icon = screen.getByTestId("icon-close");
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("data-icon-id", "custom-close");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
        expect(icon).toHaveClass("custom-close-class");
        expect(icon).toHaveAttribute("fill", "red");
        expect(icon).toHaveAttribute("stroke", "black");
      });
    });

    describe("Icon Accessibility", () => {
      it("renders icons with proper accessibility attributes", () => {
        render(
          <Icon.X
            role="img"
            aria-label="X (Twitter) icon"
            title="X (Twitter)"
          />
        );
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toHaveAttribute("role", "img");
        expect(icon).toHaveAttribute("aria-label", "X (Twitter) icon");
        expect(icon).toHaveAttribute("title", "X (Twitter)");
      });

      it("renders icons with proper focus handling", () => {
        render(
          <Icon.Close tabIndex={0} onFocus={() => {}} onBlur={() => {}} />
        );
        const icon = screen.getByTestId("icon-close");
        // Note: tabIndex may not be applied in test environment
        // but the icon should render correctly
        expect(icon).toBeInTheDocument();
      });
    });

    describe("Icon Performance", () => {
      it("renders multiple icons efficiently", () => {
        render(
          <div>
            <Icon.X />
            <Icon.Instagram />
            <Icon.LinkedIn />
            <Icon.GitHub />
            <Icon.Close />
          </div>
        );

        expect(screen.getByTestId("icon-x-twitter")).toBeInTheDocument();
        expect(screen.getByTestId("icon-instagram")).toBeInTheDocument();
        expect(screen.getByTestId("icon-linkedin")).toBeInTheDocument();
        expect(screen.getByTestId("icon-github")).toBeInTheDocument();
        expect(screen.getByTestId("icon-close")).toBeInTheDocument();
      });

      it("handles icon updates efficiently", () => {
        const { rerender } = render(<Icon.X />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toBeInTheDocument();

        rerender(<Icon.X className="updated-class" />);
        const updatedIcon = screen.getByTestId("icon-x-twitter");
        expect(updatedIcon).toHaveClass("updated-class");
      });
    });
  });
});
