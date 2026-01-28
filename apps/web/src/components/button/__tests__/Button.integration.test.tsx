/**
 * @file Button.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Button component.
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "../Button";

// Mock dependencies
vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => <a {...props}>{children}</a>),
}));

describe("Button Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Button with Event Handlers Integration", () => {
    it("handles click events on button element", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      button.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles click events on link element when href is provided", () => {
      const handleClick = vi.fn();
      render(
        <Button href="/test" onClick={handleClick}>
          Link Button
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

    it("applies styles to link when href is provided", () => {
      render(
        <Button href="/test" className="custom-link">
          Link Button
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("class");
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
    it("updates correctly when props change", () => {
      const { rerender } = render(<Button>Initial</Button>);

      expect(screen.getByText("Initial")).toBeInTheDocument();

      rerender(<Button>Updated</Button>);
      expect(screen.getByText("Updated")).toBeInTheDocument();
    });

    it("updates correctly when variant changes", () => {
      const { rerender } = render(<Button variant="primary">Button</Button>);

      expect(screen.getByRole("button")).toBeInTheDocument();

      rerender(<Button variant="secondary">Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("switches between button and link when href changes", () => {
      const { rerender } = render(<Button>Button</Button>);

      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();

      rerender(<Button href="/test">Link</Button>);

      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("Button with Custom Props Integration", () => {
    it("integrates custom props with event handlers", () => {
      const handleClick = vi.fn();
      render(
        <Button<{ "data-analytics": string }>
          data-analytics="button-click"
          onClick={handleClick}
        >
          Click me
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-analytics", "button-click");

      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("integrates custom props with form submission", () => {
      const handleSubmit = vi.fn();
      render(
        <form onSubmit={handleSubmit}>
          <Button<{ "data-form-action": string }>
            type="submit"
            data-form-action="submit-form"
          >
            Submit
          </Button>
        </form>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-form-action", "submit-form");

      button.click();
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("integrates custom props with link navigation", () => {
      render(
        <Button<{ "data-tracking": string }>
          href="/test"
          data-tracking="link-click"
        >
          Navigate
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-tracking", "link-click");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("preserves custom props through rerenders", () => {
      const { rerender } = render(
        <Button<{ "data-persist": string }> data-persist="initial">
          Button
        </Button>
      );

      let button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-persist", "initial");

      rerender(
        <Button<{ "data-persist": string }> data-persist="updated">
          Button
        </Button>
      );

      button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-persist", "updated");
    });

    it("works with custom props and ARIA attributes", () => {
      render(
        <Button<{ "data-aria-custom": string }>
          aria-label="Accessible button"
          data-aria-custom="aria-integration"
        >
          Button
        </Button>
      );

      const button = screen.getByRole("button", { name: "Accessible button" });
      expect(button).toHaveAttribute("data-aria-custom", "aria-integration");
      expect(button).toHaveAttribute("aria-label", "Accessible button");
    });

    it("handles multiple custom props with complex interactions", () => {
      const handleClick = vi.fn();
      const handleMouseOver = vi.fn();

      render(
        <Button<{
          "data-analytics": string;
          "data-tracking": string;
          "data-context": string;
        }>
          data-analytics="click-event"
          data-tracking="user-action"
          data-context="main-page"
          onClick={handleClick}
          onMouseOver={handleMouseOver}
        >
          Complex Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-analytics", "click-event");
      expect(button).toHaveAttribute("data-tracking", "user-action");
      expect(button).toHaveAttribute("data-context", "main-page");

      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.mouseOver(button);
      expect(handleMouseOver).toHaveBeenCalledTimes(1);
    });

    it("works with custom props and variant styling", () => {
      render(
        <Button<{ "data-theme": string }>
          variant="secondary"
          data-theme="dark-mode"
        >
          Themed Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-theme", "dark-mode");
      expect(button).toHaveAttribute("class");
    });

    it("preserves custom props when switching between button and link", () => {
      const { rerender } = render(
        <Button<{ "data-persist": string }> data-persist="persistent">
          Button
        </Button>
      );

      let element = screen.getByRole("button");
      expect(element).toHaveAttribute("data-persist", "persistent");

      rerender(
        <Button<{ "data-persist": string }>
          href="/test"
          data-persist="persistent"
        >
          Link
        </Button>
      );

      element = screen.getByRole("link");
      expect(element).toHaveAttribute("data-persist", "persistent");
    });
  });
});
