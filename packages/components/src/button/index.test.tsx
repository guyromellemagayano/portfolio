import React from "react";

import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from ".";

// Extend Window interface for gtag
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

describe("Button Component", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockGtag: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalGtag: any;

  beforeEach(() => {
    originalGtag = window.gtag;
    mockGtag = vi.fn();
    window.gtag = mockGtag;
  });

  afterEach(() => {
    window.gtag = originalGtag;
    vi.restoreAllMocks();
  });

  it("renders as <button> by default", () => {
    const { getByRole } = render(<Button>Click</Button>);
    const button = getByRole("button");
    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button).toHaveClass("button");
  });

  it("renders as a custom element with 'as' prop", () => {
    const { container } = render(
      <Button as="a" href="/test">
        Link
      </Button>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.tagName.toLowerCase()).toBe("a");
    expect(element).toHaveAttribute("href", "/test");
    expect(element).toHaveClass("button");
  });

  it("applies variant, size, fullWidth, loading, and disabled classes", () => {
    const { getByRole } = render(
      <Button variant="secondary" size="lg" fullWidth loading disabled>
        Test
      </Button>
    );
    const button = getByRole("button");
    expect(button).toHaveClass(
      "button",
      "button--secondary",
      "button--lg",
      "button--full-width",
      "button--loading",
      "button--disabled"
    );
    expect(button).toBeDisabled();
    expect(
      button.querySelector(".button__loading-spinner")
    ).toBeInTheDocument();
  });

  it("calls analytics on click", () => {
    const { getByRole } = render(
      <Button analyticsEvent="test_event" analyticsProperties={{ foo: "bar" }}>
        Click
      </Button>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "test_event",
      expect.objectContaining({
        component: "Button",
        foo: "bar",
      })
    );
  });

  it("calls onClick handler", () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click</Button>);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders children inside .button__content", () => {
    const { getByText } = render(<Button>Child</Button>);
    const content = getByText("Child");
    expect(content).toHaveClass("button__content");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("is accessible by keyboard", () => {
    const { getByRole } = render(<Button>Accessible</Button>);
    const button = getByRole("button");
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it("applies custom className and style", () => {
    const { getByRole } = render(
      <Button className="custom-btn" style={{ background: "red" }}>
        Styled
      </Button>
    );
    const button = getByRole("button");
    expect(button).toHaveClass("custom-btn");
    expect([
      button.style.background,
      getComputedStyle(button).background,
    ]).toContain("red");
  });
});
