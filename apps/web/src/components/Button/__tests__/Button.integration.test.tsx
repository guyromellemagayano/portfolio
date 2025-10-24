import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "../Button";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

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

// Mock Next.js Link with more realistic behavior
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, ...props }) => {
    // Prevent navigation in tests
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <a href={href} data-testid="next-link" {...props} onClick={handleClick}>
        {children}
      </a>
    );
  }),
}));

describe("Button Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Button with Next.js Link Integration", () => {
    it("renders as Next.js Link when href is provided", () => {
      render(<Button href="/about">About</Button>);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/about");
      expect(link).toHaveTextContent("About");
    });

    it("passes through all Link props correctly", () => {
      render(
        <Button
          href="/external"
          target="_blank"
          rel="noopener noreferrer"
          className="custom-link-class"
        >
          External Link
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/external");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("class");
    });

    it("applies button styles to Link component", () => {
      render(<Button href="/test">Styled Link</Button>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("class");
    });

    it("applies variant styles to Link component", () => {
      render(
        <Button href="/test" variant="secondary">
          Secondary Link
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("class");
    });

    it("applies debug attributes to Link component", () => {
      render(
        <Button href="/test" debugId="debug-link" debugMode={true}>
          Debug Link
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-testid", "debug-link-button");
      expect(link).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Button with Event Handlers Integration", () => {
    it("handles click events on button element", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      button.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles click events on link element", () => {
      const handleClick = vi.fn();
      render(
        <Button href="/test" onClick={handleClick}>
          Click link
        </Button>
      );

      const link = screen.getByRole("link");
      link.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles mouse events on button", () => {
      const handleMouseOver = vi.fn();
      const handleMouseOut = vi.fn();

      render(
        <Button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          Hover me
        </Button>
      );

      const button = screen.getByRole("button");

      // Use fireEvent for proper event triggering
      fireEvent.mouseOver(button);
      expect(handleMouseOver).toHaveBeenCalledTimes(1);

      fireEvent.mouseOut(button);
      expect(handleMouseOut).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard events on button", () => {
      const handleKeyDown = vi.fn();

      render(<Button onKeyDown={handleKeyDown}>Press me</Button>);

      const button = screen.getByRole("button");

      // Use fireEvent for proper event triggering
      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Button with Form Integration", () => {
    it("works as submit button in form", () => {
      const handleSubmit = vi.fn();

      render(
        <form onSubmit={handleSubmit}>
          <input type="text" name="test" defaultValue="test value" />
          <Button type="submit">Submit</Button>
        </form>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");

      button.click();
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("works as reset button in form", () => {
      render(
        <form>
          <input type="text" name="test" defaultValue="test value" />
          <Button type="reset">Reset</Button>
        </form>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });

    it("works as regular button in form", () => {
      render(
        <form>
          <input type="text" name="test" defaultValue="test value" />
          <Button type="button">Action</Button>
        </form>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("Button with Accessibility Integration", () => {
    it("supports ARIA attributes for screen readers", () => {
      render(
        <Button
          aria-label="Close dialog"
          aria-describedby="close-help"
          aria-expanded="false"
        >
          ×
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Close dialog");
      expect(button).toHaveAttribute("aria-describedby", "close-help");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("supports disabled state with proper ARIA", () => {
      render(
        <Button disabled aria-disabled="true">
          Disabled Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("supports loading state with ARIA", () => {
      render(
        <Button aria-busy="true" aria-label="Loading, please wait">
          Loading...
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toHaveAttribute("aria-label", "Loading, please wait");
    });
  });

  describe("Button with Complex Content Integration", () => {
    it("renders with icon and text", () => {
      render(
        <Button>
          <span aria-hidden="true">→</span>
          Next
        </Button>
      );

      expect(screen.getByText("→")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });

    it("renders with multiple children elements", () => {
      render(
        <Button>
          <span className="icon">📧</span>
          <span className="text">Send Email</span>
          <span className="badge">New</span>
        </Button>
      );

      expect(screen.getByText("📧")).toBeInTheDocument();
      expect(screen.getByText("Send Email")).toBeInTheDocument();
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("renders with conditional content", () => {
      const showIcon = true;
      render(
        <Button>
          {showIcon && <span>🔒</span>}
          Secure Action
        </Button>
      );

      expect(screen.getByText("🔒")).toBeInTheDocument();
      expect(screen.getByText("Secure Action")).toBeInTheDocument();
    });
  });

  describe("Button with Styling Integration", () => {
    it("combines default styles with custom className", () => {
      render(<Button className="custom-button">Custom Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("class");
    });

    it("applies variant styles correctly", () => {
      render(<Button variant="secondary">Secondary Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("class");
    });

    it("handles style prop integration", () => {
      render(
        <Button style={{ backgroundColor: "red", color: "white" }}>
          Styled Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("style");
    });
  });

  describe("Button with Performance Integration", () => {
    it("memoizes correctly when isMemoized is true", () => {
      const { rerender } = render(
        <Button isMemoized={true}>Memoized Button</Button>
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Re-render with same props should not cause issues
      rerender(<Button isMemoized={true}>Memoized Button</Button>);
      expect(screen.getByText("Memoized Button")).toBeInTheDocument();
    });

    it("updates correctly when props change", () => {
      const { rerender } = render(<Button>Initial</Button>);

      expect(screen.getByText("Initial")).toBeInTheDocument();

      rerender(<Button>Updated</Button>);
      expect(screen.getByText("Updated")).toBeInTheDocument();
    });
  });
});
