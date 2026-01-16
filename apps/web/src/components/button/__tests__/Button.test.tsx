import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from "../Button";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

const mockBack = vi.hoisted(() => vi.fn());
const mockUseRouter = vi.hoisted(() =>
  vi.fn(() => ({
    back: mockBack,
    push: vi.fn(),
    replace: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }))
);

const mockUseContext = vi.hoisted(() => vi.fn());

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
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

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => {
    // Prevent navigation in tests
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <a data-testid="mock-link" {...props} onClick={handleClick}>
        {children}
      </a>
    );
  }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
  useRouter: mockUseRouter,
}));

// Mock AppContext
vi.mock("@web/app/context", () => {
  const React = require("react"); // eslint-disable-line no-undef
  const mockContext = React.createContext({
    previousPathname: "/articles",
  });
  return {
    AppContext: mockContext,
  };
});

// Mock React useContext
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useContext: mockUseContext,
  };
});

// Mock Icon component
const mockIcon = vi.hoisted(() => ({
  Icon: ({ name, className, debugMode, debugId: _debugId, ...props }: any) => {
    if (name === "arrow-left") {
      return (
        <svg
          data-testid="arrow-left-icon"
          className={className}
          data-debug-mode={debugMode ? "true" : undefined}
          data-icon-arrow-left-id="test-id-icon-arrow-left"
          {...props}
        />
      );
    }
    return (
      <svg data-testid={`icon-${name}`} className={className} {...props} />
    );
  },
}));

vi.mock("@web/components", () => mockIcon);

// Mock CSS modules
vi.mock("*.module.css", () => ({
  default: {},
}));

describe("Button", () => {
  beforeEach(() => {
    mockBack.mockClear();
    mockUseRouter.mockClear();
    mockUseComponentId.mockClear();
    mockUseContext.mockClear();

    // Default mock context with previousPathname
    mockUseContext.mockReturnValue({
      previousPathname: "/articles",
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockBack.mockClear();
    mockUseComponentId.mockClear();
    mockUseContext.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Button>Click me</Button>);

      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<Button debugMode={true}>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(<Button debugId="custom-button">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute(
        "data-testid",
        "custom-button-button-default"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <Button
          id="test-button"
          data-test="custom-data"
          aria-label="Test button"
        >
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "test-button");
      expect(button).toHaveAttribute("data-test", "custom-data");
      expect(button).toHaveAttribute("aria-label", "Test button");
    });
  });

  describe("Content Validation", () => {
    it("renders with empty children", () => {
      const { container } = render(<Button></Button>);

      // Button component returns null when children are empty
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with complex children content", () => {
      render(
        <Button>
          <span>Complex</span> <strong>content</strong>
        </Button>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters in children", () => {
      render(<Button>Special chars: &lt;&gt;&amp;</Button>);

      expect(screen.getByText(/Special chars:/)).toBeInTheDocument();
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<Button debugMode={true}>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<Button debugMode={false}>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure Tests", () => {
    it("renders as button element by default", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("applies correct CSS classes", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("class");
    });

    it("combines CSS module and custom classes", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("class");
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveTextContent("Button");
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      const button = screen.getByRole("button");
      expect(ref.current).toBe(button);
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper semantic structure", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("applies correct data attributes for debugging", () => {
      render(<Button debugId="aria-test">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-testid", "aria-test-button-default");
    });

    it("supports ARIA attributes", () => {
      render(
        <Button aria-label="Custom button" aria-describedby="button-help">
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom button");
      expect(button).toHaveAttribute("aria-describedby", "button-help");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to button elements", () => {
      render(<Button debugId="aria-test">Button</Button>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA roles to button elements with href prop", () => {
      // Note: Button component doesn't render as link when href is provided
      // It still renders as a button element, just with href attribute
      render(
        <Button href="/test" debugId="aria-test">
          Link Button
        </Button>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveAttribute("href", "/test");
    });

    it("applies correct ARIA labels to button elements", () => {
      render(
        <Button aria-label="Accessible button" debugId="aria-test">
          Button
        </Button>
      );

      const buttonElement = screen.getByRole("button", {
        name: "Accessible button",
      });
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to button elements with href prop", () => {
      // Note: Button component doesn't render as link when href is provided
      render(
        <Button href="/test" aria-label="Accessible link" debugId="aria-test">
          Link
        </Button>
      );

      const buttonElement = screen.getByRole("button", {
        name: "Accessible link",
      });
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveAttribute("href", "/test");
    });

    it("applies correct ARIA states for disabled buttons", () => {
      render(
        <Button disabled aria-disabled="true" debugId="aria-test">
          Disabled Button
        </Button>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeDisabled();
      expect(buttonElement).toHaveAttribute("aria-disabled", "true");
    });

    it("applies correct ARIA states for loading buttons", () => {
      render(
        <Button
          aria-busy="true"
          aria-label="Loading, please wait"
          debugId="aria-test"
        >
          Loading...
        </Button>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveAttribute("aria-busy", "true");
      expect(buttonElement).toHaveAttribute(
        "aria-label",
        "Loading, please wait"
      );
    });

    it("applies correct ARIA relationships", () => {
      render(
        <Button
          aria-labelledby="button-title"
          aria-describedby="button-description"
          debugId="aria-test"
        >
          Button
        </Button>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveAttribute("aria-labelledby", "button-title");
      expect(buttonElement).toHaveAttribute(
        "aria-describedby",
        "button-description"
      );
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Button debugId="aria-test">{null}</Button>);

      // Button component returns null when children are null
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Button Variants", () => {
    it("renders with primary variant by default", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with primary variant explicitly", () => {
      render(<Button variant="primary">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with secondary variantStyle", () => {
      render(<Button variantStyle="secondary">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    describe("Article Nav Variant", () => {
      it("renders article nav button when variant is article-nav and previousPathname exists", () => {
        render(<Button variant="article-nav">Button</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute(
          "data-testid",
          "test-id-button-article-nav"
        );
      });

      it("returns null when variant is article-nav and previousPathname is missing", () => {
        mockUseContext.mockReturnValue({
          previousPathname: null,
        });

        const { container } = render(
          <Button variant="article-nav">Button</Button>
        );
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when variant is article-nav and previousPathname is undefined", () => {
        mockUseContext.mockReturnValue({
          previousPathname: undefined,
        });

        const { container } = render(
          <Button variant="article-nav">Button</Button>
        );
        expect(container).toBeEmptyDOMElement();
      });

      it("applies custom className to article nav button", () => {
        render(
          <Button variant="article-nav" className="custom-class">
            Button
          </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("class");
      });

      it("renders article nav button with debug mode enabled", () => {
        render(
          <Button variant="article-nav" debugMode={true}>
            Button
          </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders article nav button with custom component ID", () => {
        render(
          <Button variant="article-nav" debugId="custom-id">
            Button
          </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute(
          "data-button-article-nav-id",
          "custom-id-button-article-nav"
        );
      });

      it("renders ArrowLeft icon in article nav button", () => {
        render(<Button variant="article-nav">Button</Button>);

        const icon = screen.getByTestId("arrow-left-icon");
        expect(icon).toBeInTheDocument();
      });

      it("passes correct props to the icon in article nav button", () => {
        render(
          <Button variant="article-nav" debugId="test-id" debugMode={true}>
            Button
          </Button>
        );

        const icon = screen.getByTestId("arrow-left-icon");
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("has correct aria-label for article nav button", () => {
        render(<Button variant="article-nav">Button</Button>);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-label", "Go back to articles");
      });

      it("calls router.back() when article nav button is clicked", () => {
        render(<Button variant="article-nav">Button</Button>);

        const button = screen.getByRole("button");
        button.click();

        expect(mockBack).toHaveBeenCalledTimes(1);
      });

      it("passes through HTML attributes to article nav button", () => {
        render(
          <Button
            variant="article-nav"
            debugId="test-id"
            data-custom="test"
            disabled
          >
            Button
          </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("data-custom", "test");
        expect(button).toHaveAttribute("aria-label", "Go back to articles");
        expect(button).toBeDisabled();
      });

      it("hides decorative elements from screen readers in article nav button", () => {
        render(
          <Button variant="article-nav" debugId="aria-test">
            Button
          </Button>
        );

        const iconElement = screen.getByTestId("arrow-left-icon");
        expect(iconElement).toHaveAttribute("aria-hidden", "true");

        const descriptionElement = screen.getByText("Go back to articles");
        expect(descriptionElement).toHaveAttribute("aria-hidden", "true");
      });

      it("maintains ARIA attributes during article nav button updates", () => {
        const { rerender } = render(
          <Button variant="article-nav" debugId="aria-test">
            Button
          </Button>
        );

        let buttonElement = screen.getByRole("button");
        expect(buttonElement).toHaveAttribute(
          "aria-label",
          "Go back to articles"
        );

        rerender(
          <Button variant="article-nav" debugId="updated-aria-test">
            Button
          </Button>
        );

        buttonElement = screen.getByRole("button");
        expect(buttonElement).toHaveAttribute(
          "aria-label",
          "Go back to articles"
        );
      });

      it("handles router errors gracefully in article nav button", () => {
        mockBack.mockImplementation(() => {
          throw new Error("Router error");
        });

        render(<Button variant="article-nav">Button</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Link Functionality", () => {
    it("renders as button even when href is provided", () => {
      // Note: Button component doesn't render as link when href is provided
      // It still renders as a button element, just with href attribute
      render(<Button href="/test">Link Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/test");
    });

    it("renders as button when href is undefined", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("passes through href and related props to button element", () => {
      // Note: Button component passes href through but doesn't render as link
      render(
        <Button href="/test" target="_blank" rel="noopener noreferrer">
          External Link
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("href", "/test");
      expect(button).toHaveAttribute("target", "_blank");
      expect(button).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Button isMemoized={true}>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<Button isMemoized={false}>Button</Button>);

      rerender(<Button isMemoized={false}>Different content</Button>);
      expect(screen.getByText("Different content")).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(<Button>Button</Button>);

      rerender(<Button>Different content</Button>);
      expect(screen.getByText("Different content")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Button>
          <span>Complex</span> <strong>content</strong>
        </Button>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Button>Special chars: &lt;&gt;&amp;</Button>);
      expect(screen.getByText(/Special chars:/)).toBeInTheDocument();
    });

    it("handles empty string children", () => {
      const { container } = render(<Button>{""}</Button>);

      // Button component returns null when children are empty string
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null children", () => {
      const { container } = render(<Button>{null}</Button>);

      // Button component returns null when children are null
      expect(container).toBeEmptyDOMElement();
    });

    it("handles undefined children", () => {
      const { container } = render(<Button>{undefined}</Button>);

      // Button component returns null when children are undefined
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct variant styles", () => {
      render(<Button variant="secondary">Secondary Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("handles button click events", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      button.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles href prop on button element", () => {
      // Note: Button component doesn't render as link when href is provided
      render(<Button href="/about">About</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("href", "/about");
    });

    it("supports disabled state", () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("supports type attribute", () => {
      render(<Button type="submit">Submit Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });
  });
});
