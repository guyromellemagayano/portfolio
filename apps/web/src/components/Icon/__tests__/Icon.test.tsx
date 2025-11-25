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
      const { container } = render(<Icon name="x" />);
      const icon = container.querySelector('[data-icon-x-id="test-id-icon-x"]');
      expect(icon).toBeInTheDocument();
      expect(icon?.tagName).toBe("svg");
    });

    it("applies custom className with name prop", () => {
      const { container } = render(<Icon name="x" className="custom-class" />);
      const icon = container.querySelector("[data-icon-x-id]");
      expect(icon).toHaveAttribute("class");
    });

    it("renders with debug mode enabled using name prop", () => {
      const { container } = render(<Icon name="x" debugMode={true} />);
      const icon = container.querySelector("[data-icon-x-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID using name prop", () => {
      const { container } = render(<Icon name="x" debugId="custom-id" />);
      const icon = container.querySelector(
        '[data-icon-x-id="custom-id-icon-x"]'
      );
      expect(icon).toHaveAttribute("data-icon-x-id", "custom-id-icon-x");
    });

    it("passes through HTML attributes with name prop", () => {
      const { container } = render(
        <Icon name="x" data-test="test-value" width="32" height="32" />
      );
      const icon = container.querySelector("[data-icon-x-id]");
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
      const { container } = render(<Icon name="x" debugMode={true} />);
      const icon = container.querySelector("[data-icon-x-id]");
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
        <Icon name="x" debugId="test-id" debugMode={true} />
      );
      const icon = container.querySelector("[data-icon-x-id]");
      expect(icon).toHaveAttribute("data-icon-x-id", "test-id-icon-x");
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
          name="x"
          debugId="complex-id"
          debugMode={true}
          className="custom-class"
          data-test="complex-test"
        />
      );
      const icon = container.querySelector("[data-icon-x-id]");
      expect(icon).toHaveAttribute("data-icon-x-id", "complex-id-icon-x");
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
        const { container } = render(<Icon name="x" />);
        const icon = container.querySelector("[data-icon-x-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Instagram icon with name prop", () => {
        const { container } = render(<Icon name="instagram" />);
        const icon = container.querySelector("[data-icon-instagram-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders LinkedIn icon with name prop", () => {
        const { container } = render(<Icon name="linkedin" />);
        const icon = container.querySelector("[data-icon-linkedin-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders GitHub icon with name prop", () => {
        const { container } = render(<Icon name="github" />);
        const icon = container.querySelector("[data-icon-github-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ArrowDown icon with name prop", () => {
        const { container } = render(<Icon name="arrow-down" />);
        const icon = container.querySelector("[data-icon-arrow-down-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ArrowLeft icon with name prop", () => {
        const { container } = render(<Icon name="arrow-left" />);
        const icon = container.querySelector("[data-icon-arrow-left-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Briefcase icon with name prop", () => {
        const { container } = render(<Icon name="briefcase" />);
        const icon = container.querySelector("[data-icon-briefcase-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ChevronDown icon with name prop", () => {
        const { container } = render(<Icon name="chevron-down" />);
        const icon = container.querySelector("[data-icon-chevron-down-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders ChevronRight icon with name prop", () => {
        const { container } = render(<Icon name="chevron-right" />);
        const icon = container.querySelector("[data-icon-chevron-right-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Close icon with name prop", () => {
        const { container } = render(<Icon name="close" />);
        const icon = container.querySelector("[data-icon-close-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Link icon with name prop", () => {
        const { container } = render(<Icon name="link" />);
        const icon = container.querySelector("[data-icon-link-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Mail icon with name prop", () => {
        const { container } = render(<Icon name="mail" />);
        const icon = container.querySelector("[data-icon-mail-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Sun icon with name prop", () => {
        const { container } = render(<Icon name="sun" />);
        const icon = container.querySelector("[data-icon-sun-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });

      it("renders Moon icon with name prop", () => {
        const { container } = render(<Icon name="moon" />);
        const icon = container.querySelector("[data-icon-moon-id]");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
      });
    });

    describe("Name prop with custom props", () => {
      it("applies custom className with name prop", () => {
        const { container } = render(
          <Icon name="x" className="custom-class" />
        );
        const icon = container.querySelector("[data-icon-x-id]");
        expect(icon).toHaveAttribute("class");
      });

      it("applies debug mode with name prop", () => {
        const { container } = render(<Icon name="x" debugMode={true} />);
        const icon = container.querySelector("[data-icon-x-id]");
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("passes through HTML attributes with name prop", () => {
        const { container } = render(
          <Icon name="x" width="32" height="32" data-test="test-value" />
        );
        const icon = container.querySelector("[data-icon-x-id]");
        expect(icon).toHaveAttribute("width", "32");
        expect(icon).toHaveAttribute("height", "32");
        expect(icon).toHaveAttribute("data-test", "test-value");
      });
    });

    describe("Name prop with viewBox", () => {
      it("X icon has correct viewBox", () => {
        const { container } = render(<Icon name="x" />);
        const icon = container.querySelector("[data-icon-x-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("ArrowDown icon has correct viewBox", () => {
        const { container } = render(<Icon name="arrow-down" />);
        const icon = container.querySelector("[data-icon-arrow-down-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("ChevronDown icon has correct viewBox", () => {
        const { container } = render(<Icon name="chevron-down" />);
        const icon = container.querySelector("[data-icon-chevron-down-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      });

      it("Mail icon has correct viewBox", () => {
        const { container } = render(<Icon name="mail" />);
        const icon = container.querySelector("[data-icon-mail-id]");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });
    });

    describe("Name prop with event handlers", () => {
      it("handles click events", () => {
        const handleClick = vi.fn();
        const { container } = render(<Icon name="x" onClick={handleClick} />);
        const icon = container.querySelector("[data-icon-x-id]");
        if (icon) fireEvent.click(icon);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("handles multiple event handlers", () => {
        const handleClick = vi.fn();
        const handleMouseEnter = vi.fn();
        const { container } = render(
          <Icon
            name="close"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
          />
        );
        const icon = container.querySelector("[data-icon-close-id]");
        if (icon) {
          fireEvent.click(icon);
          fireEvent.mouseEnter(icon);
        }
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ============================================================================
  // CUSTOM SVG CHILDREN TESTS (NO NAME PROP)
  // ============================================================================

  describe("Custom SVG Children (No Name Prop)", () => {
    describe("Basic Rendering with Custom SVG", () => {
      it("renders custom SVG with path element", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe("svg");
        expect(icon?.querySelector("path")).toBeInTheDocument();
        expect(icon?.querySelector("path")).toHaveAttribute(
          "d",
          "M10 10h4v4h-4z"
        );
      });

      it("renders custom SVG with multiple elements", () => {
        const { container } = render(
          <Icon>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l4 4 8-8" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.querySelector("circle")).toBeInTheDocument();
        expect(icon?.querySelector("path")).toBeInTheDocument();
        expect(icon?.querySelector("circle")).toHaveAttribute("cx", "12");
        expect(icon?.querySelector("path")).toHaveAttribute(
          "d",
          "M8 12l4 4 8-8"
        );
      });

      it("renders custom SVG with complex structure", () => {
        const { container } = render(
          <Icon>
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="100%" stopColor="#0000ff" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#grad)" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        expect(icon?.querySelector("defs")).toBeInTheDocument();
        expect(icon?.querySelector("linearGradient")).toBeInTheDocument();
        expect(icon?.querySelector("rect")).toBeInTheDocument();
      });
    });

    describe("Attributes with Custom SVG", () => {
      it("applies custom viewBox to SVG", () => {
        const { container } = render(
          <Icon viewBox="0 0 100 100">
            <path d="M10 10h80v80h-80z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("viewBox", "0 0 100 100");
      });

      it("applies custom width and height", () => {
        const { container } = render(
          <Icon width="64" height="64">
            <path d="M10 10h44v44h-44z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("width", "64");
        expect(icon).toHaveAttribute("height", "64");
      });

      it("applies custom className", () => {
        const { container } = render(
          <Icon className="custom-svg-icon">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("class", "custom-svg-icon");
      });

      it("applies custom data attributes", () => {
        const { container } = render(
          <Icon data-custom="test-value" data-icon-type="custom">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("data-custom", "test-value");
        expect(icon).toHaveAttribute("data-icon-type", "custom");
      });
    });

    describe("ARIA Attributes with Custom SVG", () => {
      it("applies default aria-hidden attribute", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("applies default role attribute", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("role", "img");
      });

      it("applies aria-labelledby with undefined name", () => {
        const { container } = render(
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-labelledby", "icon-undefined");
      });

      it("allows custom aria-label", () => {
        const { container } = render(
          <Icon aria-label="Custom icon">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toHaveAttribute("aria-label", "Custom icon");
        // aria-hidden is still applied (overrides custom aria-hidden)
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });
    });

    describe("Debug Props with Custom SVG", () => {
      it("does not create data attributes when debugId provided without name", () => {
        // Note: createComponentProps is only called when name is provided
        const { container } = render(
          <Icon debugId="custom-debug-id">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        // No data attributes created because createComponentProps is not called
        expect(icon).not.toHaveAttribute("data-icon-undefined-id");
        expect(icon).not.toHaveAttribute("data-testid");
      });

      it("does not create data-debug-mode when debugMode provided without name", () => {
        // Note: createComponentProps is only called when name is provided
        const { container } = render(
          <Icon debugMode={true}>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        // No data-debug-mode because createComponentProps is not called
        expect(icon).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Event Handlers with Custom SVG", () => {
      it("handles click events on custom SVG", () => {
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

      it("handles multiple event handlers on custom SVG", () => {
        const handleClick = vi.fn();
        const handleMouseEnter = vi.fn();
        const handleMouseLeave = vi.fn();
        const { container } = render(
          <Icon
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        const icon = container.querySelector("svg");
        if (icon) {
          fireEvent.click(icon);
          fireEvent.mouseEnter(icon);
          fireEvent.mouseLeave(icon);
        }
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleMouseEnter).toHaveBeenCalledTimes(1);
        expect(handleMouseLeave).toHaveBeenCalledTimes(1);
      });
    });

    describe("Ref Forwarding with Custom SVG", () => {
      it("forwards ref to custom SVG", () => {
        const ref = React.createRef<SVGSVGElement>();
        const { container } = render(
          <Icon ref={ref}>
            <path d="M10 10h4v4h-4z" />
          </Icon>
        );
        expect(ref.current).toBeInstanceOf(SVGSVGElement);
        expect(ref.current).toBe(container.querySelector("svg"));
      });
    });
  });

  // ============================================================================
  // PAGE PROP TESTS
  // ============================================================================

  describe("Page Prop", () => {
    it("renders Mail icon with page prop 'about'", () => {
      const { container } = render(<Icon name="mail" page="about" />);
      const icon = container.querySelector("[data-icon-mail-id]");
      expect(icon).toBeInTheDocument();
      // The about version path d starts with M6 5a3...
      const path = icon?.querySelector("path");
      expect(path).toHaveAttribute("d", expect.stringMatching(/^M6 5a3/));
    });

    it("renders Mail icon with default page prop", () => {
      const { container } = render(<Icon name="mail" />);
      const icon = container.querySelector("[data-icon-mail-id]");
      const path = icon?.querySelector("path");
      // The default version path d starts with M2.75 7.75...
      expect(path).toHaveAttribute("d", expect.stringMatching(/^M2.75 7.75/));
    });
  });
});
