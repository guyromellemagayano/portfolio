import React from "react";

import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Icon, MemoizedIcon } from "..";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  isRenderableContent: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
}));

describe("Icon", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders icon with children correctly (no name prop)", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.tagName).toBe("svg");
    });

    it("renders icon with name prop correctly", () => {
      const { container } = render(<Icon name="X" />);
      const icon = container.querySelector('[data-icon-X-id="test-id-icon-X"]');
      expect(icon).toBeInTheDocument();
      expect(icon?.tagName).toBe("svg");
    });

    it("applies custom className with name prop", () => {
      const { container } = render(<Icon name="X" className="custom-class" />);
      const icon = container.querySelector("[data-icon-X-id]");
      expect(icon).toHaveAttribute("class");
    });

    it("renders with debug mode enabled using name prop", () => {
      const { container } = render(<Icon name="X" debugMode={true} />);
      const icon = container.querySelector("[data-icon-X-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID using name prop", () => {
      const { container } = render(<Icon name="X" debugId="custom-id" />);
      const icon = container.querySelector(
        '[data-icon-X-id="custom-id-icon-X"]'
      );
      expect(icon).toHaveAttribute("data-icon-X-id", "custom-id-icon-X");
    });

    it("passes through HTML attributes with name prop", () => {
      const { container } = render(
        <Icon name="X" data-test="test-value" width="32" height="32" />
      );
      const icon = container.querySelector("[data-icon-X-id]");
      expect(icon).toHaveAttribute("data-test", "test-value");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
    });
  });

  // ============================================================================
  // CONTENT VALIDATION TESTS
  // ============================================================================

  describe("Content Validation", () => {
    it("renders empty SVG when no content", () => {
      const { container } = render(<Icon>{null}</Icon>);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders empty SVG when children is undefined", () => {
      const { container } = render(<Icon>{undefined}</Icon>);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders empty SVG when children is empty string", () => {
      const { container } = render(<Icon>{""}</Icon>);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders when children has meaningful content", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector("path")).toBeInTheDocument();
    });

    it("renders when children is a string", () => {
      const { container } = render(
        <Icon>{"<path d='M10 10h4v4h-4z' />"}</Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // MEMOIZATION TESTS
  // ============================================================================

  describe("Memoization", () => {
    it("renders MemoizedIcon correctly", () => {
      const { container } = render(
        <MemoizedIcon>
          <path d="M10 10h4v4h-4z" />
        </MemoizedIcon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // DEBUG MODE TESTS
  // ============================================================================

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled with name prop", () => {
      const { container } = render(<Icon name="X" debugMode={true} />);
      const icon = container.querySelector("[data-icon-X-id]");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when enabled without name prop", () => {
      // Note: createComponentProps is only called when name is provided
      const { container } = render(
        <Icon debugMode={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      // data-debug-mode is only created via createComponentProps when name is provided
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when disabled", () => {
      const { container } = render(
        <Icon debugMode={false}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  // ============================================================================
  // COMPONENT STRUCTURE TESTS
  // ============================================================================

  describe("Component Structure", () => {
    it("renders as SVG element", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon?.tagName).toBe("svg");
    });

    it("has aria-hidden attribute", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("renders children correctly", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
          <circle cx="12" cy="12" r="2" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      const path = icon?.querySelector("path");
      const circle = icon?.querySelector("circle");
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
      const { container } = render(
        <Icon ref={ref}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
      expect(ref.current).toBe(container.querySelector("svg"));
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<SVGSVGElement>();
      const { container } = render(
        <Icon ref={ref}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      expect(ref.current).toBe(container.querySelector("svg"));
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      const { container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("has correct data attributes for debugging with name prop", () => {
      const { container } = render(
        <Icon name="X" debugId="test-id" debugMode={true} />
      );
      const icon = container.querySelector("[data-icon-X-id]");
      expect(icon).toHaveAttribute("data-icon-X-id", "test-id-icon-X");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not have data attributes when no name prop", () => {
      // Note: createComponentProps is only called when name is provided
      const { container } = render(
        <Icon debugId="test-id" debugMode={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      // data attributes are only created via createComponentProps when name is provided
      expect(icon).not.toHaveAttribute("data-icon-undefined-id");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("handles complex SVG content", () => {
      const { container } = render(
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
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector("defs")).toBeInTheDocument();
      expect(icon?.querySelector("rect")).toBeInTheDocument();
    });

    it("handles event handlers", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Icon onClick={handleClick}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      if (icon) fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles all SVG attributes correctly", () => {
      const { container } = render(
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
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("stroke", "none");
      expect(icon).toHaveAttribute("style", "color: red;");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("handles complex prop combinations with name prop", () => {
      const { container } = render(
        <Icon
          name="X"
          debugId="complex-id"
          debugMode={true}
          className="custom-class"
          data-test="complex-test"
        />
      );
      const icon = container.querySelector("[data-icon-X-id]");
      expect(icon).toHaveAttribute("data-icon-X-id", "complex-id-icon-X");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("class");
      expect(icon).toHaveAttribute("data-test", "complex-test");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("handles complex prop combinations without name prop", () => {
      // Note: createComponentProps is only called when name is provided
      const { container } = render(
        <Icon
          debugId="complex-id"
          debugMode={true}
          className="custom-class"
          data-test="complex-test"
          viewBox="0 0 100 100"
        >
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("class");
      expect(icon).toHaveAttribute("data-test", "complex-test");
      expect(icon).toHaveAttribute("viewBox", "0 0 100 100");
      // data attributes are only created via createComponentProps when name is provided
      expect(icon).not.toHaveAttribute("data-icon-undefined-id");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  // ============================================================================
  // ERROR HANDLING TESTS
  // ============================================================================

  describe("Error Handling", () => {
    it("handles null children gracefully", () => {
      expect(() => {
        render(<Icon>{null}</Icon>);
      }).not.toThrow();
    });

    it("handles undefined props gracefully", () => {
      const { container } = render(
        <Icon debugId={undefined} debugMode={undefined}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ICON NAME PROP TESTS
  // ============================================================================

  describe("Icon Name Prop", () => {
    describe("Basic Rendering with name prop", () => {
      it("renders X icon with name prop", () => {
        const { container } = render(<Icon name="X" />);
        const icon = container.querySelector("[data-icon-X-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Instagram icon with name prop", () => {
        const { container } = render(<Icon name="Instagram" />);
        const icon = container.querySelector("[data-icon-Instagram-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders LinkedIn icon with name prop", () => {
        const { container } = render(<Icon name="LinkedIn" />);
        const icon = container.querySelector("[data-icon-LinkedIn-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders GitHub icon with name prop", () => {
        const { container } = render(<Icon name="GitHub" />);
        const icon = container.querySelector("[data-icon-GitHub-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ArrowDown icon with name prop", () => {
        const { container } = render(<Icon name="ArrowDown" />);
        const icon = container.querySelector("[data-icon-ArrowDown-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ArrowLeft icon with name prop", () => {
        const { container } = render(<Icon name="ArrowLeft" />);
        const icon = container.querySelector("[data-icon-ArrowLeft-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Briefcase icon with name prop", () => {
        const { container } = render(<Icon name="Briefcase" />);
        const icon = container.querySelector("[data-icon-Briefcase-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ChevronDown icon with name prop", () => {
        const { container } = render(<Icon name="ChevronDown" />);
        const icon = container.querySelector("[data-icon-ChevronDown-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ChevronRight icon with name prop", () => {
        const { container } = render(<Icon name="ChevronRight" />);
        const icon = container.querySelector("[data-icon-ChevronRight-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Close icon with name prop", () => {
        const { container } = render(<Icon name="Close" />);
        const icon = container.querySelector("[data-icon-Close-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Link icon with name prop", () => {
        const { container } = render(<Icon name="Link" />);
        const icon = container.querySelector("[data-icon-Link-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Mail icon with name prop", () => {
        const { container } = render(<Icon name="Mail" />);
        const icon = container.querySelector("[data-icon-Mail-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Sun icon with name prop", () => {
        const { container } = render(<Icon name="Sun" />);
        const icon = container.querySelector("[data-icon-Sun-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Moon icon with name prop", () => {
        const { container } = render(<Icon name="Moon" />);
        const icon = container.querySelector("[data-icon-Moon-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });
    });

    describe("Name prop with custom props", () => {
      it("applies custom className with name prop", () => {
        const { container } = render(
          <Icon name="X" className="custom-class" />
        );
        const icon = container.querySelector("[data-icon-X-id]");
        expect(icon).toHaveAttribute("class");
      });

      it("applies debug mode with name prop", () => {
        const { container } = render(<Icon name="X" debugMode={true} />);
        const icon = container.querySelector("[data-icon-X-id]");
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("passes through HTML attributes with name prop", () => {
        const { container } = render(
          <Icon name="X" width="32" height="32" data-test="test-value" />
        );
        const icon = container.querySelector("[data-icon-X-id]");
        expect(icon).toHaveAttribute("width", "32");
        expect(icon).toHaveAttribute("height", "32");
        expect(icon).toHaveAttribute("data-test", "test-value");
      });
    });

    describe("Name prop with viewBox", () => {
      it("X icon has correct viewBox", () => {
        const { container } = render(<Icon name="X" />);
        const icon = container.querySelector("[data-icon-X-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("ArrowDown icon has correct viewBox", () => {
        const { container } = render(<Icon name="ArrowDown" />);
        const icon = container.querySelector("[data-icon-ArrowDown-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("ChevronDown icon has correct viewBox", () => {
        const { container } = render(<Icon name="ChevronDown" />);
        const icon = container.querySelector("[data-icon-ChevronDown-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      });

      it("Mail icon has correct viewBox", () => {
        const { container } = render(<Icon name="Mail" />);
        const icon = container.querySelector("[data-icon-Mail-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });
    });

    describe("Name prop with event handlers", () => {
      it("handles click events", () => {
        const handleClick = vi.fn();
        const { container } = render(<Icon name="X" onClick={handleClick} />);
        const icon = container.querySelector("[data-icon-X-id]");
        if (icon) fireEvent.click(icon);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("handles multiple event handlers", () => {
        const handleClick = vi.fn();
        const handleMouseEnter = vi.fn();
        const { container } = render(
          <Icon
            name="Close"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
          />
        );
        const icon = container.querySelector("[data-icon-Close-id]");
        if (icon) {
          fireEvent.click(icon);
          fireEvent.mouseEnter(icon);
        }
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      });
    });
  });
});
