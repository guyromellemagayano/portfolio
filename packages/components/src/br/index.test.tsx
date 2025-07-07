import React from "react";

import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Br } from ".";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

describe("Br Component", () => {
  let mockConsoleWarn: ReturnType<typeof vi.spyOn>;
  let mockGtag: any;
  let originalGtag: any;

  beforeEach(() => {
    mockConsoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    originalGtag = window.gtag;
    mockGtag = vi.fn();
    window.gtag = mockGtag;
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.gtag = originalGtag;
  });

  describe("Basic Rendering", () => {
    it("renders as <br> by default", () => {
      const { container } = render(<Br />);
      const element = container.querySelector("br");
      expect(element).toBeInTheDocument();
      expect(element?.className).toContain("br");
    });

    it("renders as a custom element with 'as' prop", () => {
      const { container } = render(<Br as="hr" data-testid="custom-br" />);
      const element = container.querySelector("hr");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-polymorphic-element", "hr");
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLBRElement>();
      render(<Br ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLBRElement);
    });

    it("renders children if provided (polymorphic only)", () => {
      const { container } = render(<Br as="span">Break</Br>);
      const element = container.querySelector("span");
      expect(element).toHaveTextContent("Break");
    });

    it("does not render children for <br> element", () => {
      const { container } = render(<Br>Break</Br>);
      const element = container.querySelector("br");
      expect(element).toBeInTheDocument();
      expect(element?.children.length).toBe(0);
    });
  });

  describe("Styling and Classes", () => {
    it("merges className and style", () => {
      const { container } = render(
        <Br className="custom-br" style={{ color: "red" }} />
      );
      const element = container.querySelector("br");
      expect(element).toHaveClass("br");
      expect(element).toHaveClass("custom-br");
      expect([
        element?.style.color,
        getComputedStyle(element!).color,
      ]).toContain("red");
      expect([
        element?.style.color,
        getComputedStyle(element!).color,
      ]).toContain("rgb(255, 0, 0)");
    });

    it("applies custom className to polymorphic elements", () => {
      const { container } = render(<Br as="div" className="custom-div" />);
      const element = container.querySelector("div");
      expect(element).toHaveClass("br");
      expect(element).toHaveClass("custom-div");
    });

    it("handles empty className gracefully", () => {
      const { container } = render(<Br className="" />);
      const element = container.querySelector("br");
      expect(element).toHaveClass("br");
    });
  });

  describe("Analytics and Events", () => {
    it("calls onAnalytics callback on click", () => {
      const onAnalytics = vi.fn();
      const { container } = render(
        <Br analyticsId="test-br" onAnalytics={onAnalytics} />
      );
      const element = container.querySelector("br");
      fireEvent.click(element!);
      expect(onAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "click",
          category: "br",
          label: "test-br",
          content: "<br />",
        })
      );
    });

    it("calls gtag analytics on click when analyticsId is provided", () => {
      const { container } = render(<Br analyticsId="test-br" />);
      const element = container.querySelector("br");
      fireEvent.click(element!);
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "click",
        expect.objectContaining({
          event_category: "br",
          event_label: "test-br",
          br_content: "<br />",
        })
      );
    });

    it("calls onClick handler", () => {
      const onClick = vi.fn();
      const { container } = render(<Br onClick={onClick} />);
      const element = container.querySelector("br");
      fireEvent.click(element!);
      expect(onClick).toHaveBeenCalled();
    });

    it("calls onMouseEnter and onFocus handlers", () => {
      const onMouseEnter = vi.fn();
      const onFocus = vi.fn();
      const { container } = render(
        <Br onMouseEnter={onMouseEnter} onFocus={onFocus} />
      );
      const element = container.querySelector("br");

      fireEvent.mouseEnter(element!);
      expect(onMouseEnter).toHaveBeenCalled();

      fireEvent.focus(element!);
      expect(onFocus).toHaveBeenCalled();
    });

    it("does not call analytics when no analytics setup is provided", () => {
      const { container } = render(<Br />);
      const element = container.querySelector("br");
      fireEvent.click(element!);
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe("Data Attributes", () => {
    it("adds data attributes for analytics and polymorphic", () => {
      const { container } = render(<Br analyticsId="main-break" as="hr" />);
      const element = container.querySelector("hr");
      expect(element).toHaveAttribute("data-analytics-id", "main-break");
      expect(element).toHaveAttribute("data-polymorphic-element", "hr");
    });

    it("does not add data-polymorphic-element for <br> element", () => {
      const { container } = render(<Br analyticsId="main-break" />);
      const element = container.querySelector("br");
      expect(element).toHaveAttribute("data-analytics-id", "main-break");
      expect(element).not.toHaveAttribute("data-polymorphic-element");
    });

    it("handles missing analyticsId gracefully", () => {
      const { container } = render(<Br as="hr" />);
      const element = container.querySelector("hr");
      expect(element).not.toHaveAttribute("data-analytics-id");
      expect(element).toHaveAttribute("data-polymorphic-element", "hr");
    });
  });

  describe("Validation and Warnings", () => {
    it("warns in development when using <br> props on non-br element", () => {
      render(<Br as="div" {...({ clear: "left" } as any)} />);
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          "Warning: <br> specific props (clear) are being used on a <div> element"
        )
      );
    });

    it("does not warn when using <br> props on <br> element", () => {
      render(<Br clear="left" />);
      expect(mockConsoleWarn).not.toHaveBeenCalled();
    });

    it("does not warn in production", () => {
      process.env.NODE_ENV = "production";
      render(<Br as="div" {...({ clear: "left" } as any)} />);
      expect(mockConsoleWarn).not.toHaveBeenCalled();
    });

    it("validates multiple br-specific props", () => {
      render(
        <Br as="span" {...({ clear: "both", someOtherProp: "value" } as any)} />
      );
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining("clear")
      );
    });
  });

  describe("Accessibility", () => {
    it("is accessible by keyboard", () => {
      const { container } = render(<Br tabIndex={0} />);
      const element = container.querySelector("br");
      element?.focus();
      expect(document.activeElement).toBe(element);
    });

    it("supports ARIA attributes", () => {
      const { container } = render(
        <Br as="div" role="separator" aria-label="Section break" />
      );
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("role", "separator");
      expect(element).toHaveAttribute("aria-label", "Section break");
    });
  });

  describe("Edge Cases", () => {
    it("handles null and undefined props gracefully", () => {
      const { container } = render(
        <Br className={undefined} style={null as any} analyticsId={undefined} />
      );
      const element = container.querySelector("br");
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("br");
    });

    it("handles custom components as 'as' prop", () => {
      const CustomComponent = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => <div ref={ref} {...props} data-custom="true" />);
      CustomComponent.displayName = "CustomComponent";

      const { container } = render(
        <Br as={CustomComponent} data-testid="custom-br" />
      );
      const element = container.querySelector('[data-testid="custom-br"]');
      expect(element).toHaveAttribute("data-custom", "true");
      expect(element).toHaveAttribute("data-polymorphic-element", "unknown");
    });

    it("handles analytics errors gracefully", () => {
      // Mock gtag to throw an error
      window.gtag = vi.fn().mockImplementation(() => {
        throw new Error("Analytics error");
      });

      const { container } = render(<Br analyticsId="test-br" />);
      const element = container.querySelector("br");

      // Should not crash the component
      expect(() => fireEvent.click(element!)).not.toThrow();
    });
  });

  describe("Client/Server Rendering", () => {
    it("renders server component by default", () => {
      const { container } = render(<Br />);
      const element = container.querySelector("br");
      expect(element).toBeInTheDocument();
    });

    it("supports client-side rendering", () => {
      const { container } = render(<Br isClient />);
      const element = container.querySelector("br");
      expect(element).toBeInTheDocument();
    });

    it("supports memoized client-side rendering", () => {
      const { container } = render(<Br isClient isMemoized />);
      const element = container.querySelector("br");
      expect(element).toBeInTheDocument();
    });
  });
});
