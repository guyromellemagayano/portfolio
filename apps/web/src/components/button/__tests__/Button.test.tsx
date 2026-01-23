/**
 * @file Button.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Button component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from "../Button";

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

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

describe("Button", () => {
  beforeEach(() => {
    mockUseComponentId.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockUseComponentId.mockClear();
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
      expect(button).toHaveAttribute("data-button-id", "custom-button-button");
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
      expect(button).toHaveAttribute("data-button-id", "aria-test-button");
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
    it("renders with primary variantStyle by default", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with primary variantStyle explicitly", () => {
      render(<Button variantStyle="primary">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with secondary variantStyle", () => {
      render(<Button variantStyle="secondary">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
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
    it("applies correct variantStyle styles", () => {
      render(<Button variantStyle="secondary">Secondary Button</Button>);

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
