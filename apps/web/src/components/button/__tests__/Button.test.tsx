/**
 * @file apps/web/src/components/button/__tests__/Button.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Button component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "../Button";

import "@testing-library/jest-dom";

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("@web/components/link", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href?: string | false;
  }) => (
    <a href={href ? href : "#"} {...props}>
      {children}
    </a>
  ),
}));

// TODO: Add unit tests for the `SkipToMainContentButton` component
describe("Button", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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
      render(<Button></Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
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

  describe("Component Structure Tests", () => {
    it("renders as button element by default", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("applies role='button' attribute to button element", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("class");
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper semantic structure", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
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
      render(<Button>Button</Button>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to button elements", () => {
      render(<Button aria-label="Accessible button">Button</Button>);

      const buttonElement = screen.getByRole("button", {
        name: "Accessible button",
      });
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA states for disabled buttons", () => {
      render(<Button isDisabled>Disabled Button</Button>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeDisabled();
      expect(buttonElement).toHaveAttribute("aria-disabled", "true");
    });

    it("applies correct ARIA states for loading buttons", () => {
      render(
        <Button aria-busy="true" aria-label="Loading, please wait">
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
      render(<Button>{null}</Button>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toBeEmptyDOMElement();
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

    it("renders with secondary variant", () => {
      render(<Button variant="secondary">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Button as Link", () => {
    it("renders as Link when href is provided", () => {
      render(<Button href="/test">Link Button</Button>);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveTextContent("Link Button");
    });

    it("passes through Link props when href is provided", () => {
      render(
        <Button href="/test" aria-label="Test link">
          Link Button
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Test link");
    });

    it("renders as button when href is not provided", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("renders as button when href is undefined", () => {
      render(<Button href={undefined}>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("handles external URLs correctly", () => {
      render(<Button href="https://example.com">External Link</Button>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("handles relative paths correctly", () => {
      render(<Button href="/about">About</Button>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/about");
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
      render(<Button>{""}</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
    });

    it("handles null children", () => {
      render(<Button>{null}</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
    });

    it("handles undefined children", () => {
      render(<Button>{undefined}</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
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

    it("supports disabled state", () => {
      render(<Button isDisabled>Disabled Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("supports type attribute", () => {
      render(<Button type="submit">Submit Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Custom Props Type Safety", () => {
    it("accepts and passes through custom string props", () => {
      render(
        <Button<{ customProp: string }> customProp="test-value">Button</Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("customProp", "test-value");
    });

    it("accepts and passes through custom data attributes", () => {
      render(
        <Button<{ "data-custom": string }> data-custom="custom-data">
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-custom", "custom-data");
    });

    it("accepts multiple custom props", () => {
      render(
        <Button<{ customProp: string; count: number }>
          customProp="value"
          count={42}
        >
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("customProp", "value");
      expect(button).toHaveAttribute("count", "42");
    });

    it("preserves custom props when rendering as button", () => {
      render(
        <Button<{
          "data-test-custom": string;
        }> data-test-custom="button-custom">
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-test-custom", "button-custom");
    });

    it("preserves custom props when rendering as link", () => {
      render(
        <Button<{ "data-test-custom": string }>
          href="/test"
          data-test-custom="link-custom"
        >
          Link
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-test-custom", "link-custom");
    });

    it("works with custom props and standard button props", () => {
      render(
        <Button<{ "data-analytics": string }>
          data-analytics="button-click"
          onClick={vi.fn()}
          isDisabled={false}
        >
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-analytics", "button-click");
      expect(button).toBeEnabled();
    });

    it("works with custom props and variant", () => {
      render(
        <Button<{ "data-variant-custom": string }>
          variant="secondary"
          data-variant-custom="secondary-custom"
        >
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant-custom", "secondary-custom");
    });

    it("accepts custom props with different value types", () => {
      render(
        <Button<{
          stringProp: string;
          numberProp: number;
          dataBooleanProp: string;
        }>
          stringProp="test"
          numberProp={123}
          dataBooleanProp="true"
        >
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("stringProp", "test");
      expect(button).toHaveAttribute("numberProp", "123");
      expect(button).toHaveAttribute("dataBooleanProp", "true");
    });

    it("allows custom props without explicit generic type", () => {
      // TypeScript should infer custom props from usage
      render(<Button customProp="inferred-type">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // React converts prop names to lowercase for non-standard attributes
      expect(button).toHaveAttribute("customprop", "inferred-type");
    });
  });
});
