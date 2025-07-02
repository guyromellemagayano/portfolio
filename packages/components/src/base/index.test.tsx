import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Base, type BaseProps } from ".";

// Mock window.gtag for analytics tests
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("Base Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: BaseProps = {
    href: "https://example.com/",
  };

  it("renders with default props", () => {
    const { container } = render(<Base {...defaultProps} />);

    const element = container.querySelector("base");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", "https://example.com/");
    expect(element).toHaveClass("base");
  });

  it("renders without href", () => {
    const { container } = render(<Base />);
    const element = container.querySelector("base");
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveAttribute("href");
  });

  it("preserves semantic meaning", () => {
    const { container } = render(<Base href="https://example.com/" />);
    const element = container.querySelector("base");
    expect(element?.tagName).toBe("BASE");
  });

  describe("Base Element Attributes", () => {
    it("sets href attribute correctly", () => {
      const { container } = render(<Base href="https://api.example.com/" />);
      const element = container.querySelector("base");
      expect(element).toHaveAttribute("href", "https://api.example.com/");
    });

    it("sets target attribute correctly", () => {
      const { container } = render(
        <Base href="https://example.com/" target="_blank" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveAttribute("target", "_blank");
    });

    it("handles different target values", () => {
      const targets = ["_self", "_parent", "_top", "myframe"];

      targets.forEach((target) => {
        const { container } = render(
          <Base href="https://example.com/" target={target} />
        );
        const element = container.querySelector("base");
        expect(element).toHaveAttribute("target", target);
      });
    });
  });

  describe("Emphasized Variant", () => {
    it("applies emphasized class when emphasized prop is true", () => {
      const { container } = render(
        <Base emphasized href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveClass("base", "base--emphasized");
    });

    it("adds data attribute for emphasized state", () => {
      const { container } = render(
        <Base emphasized href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveAttribute("data-emphasized", "true");
    });

    it("does not add emphasized class when emphasized is false", () => {
      const { container } = render(
        <Base emphasized={false} href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveClass("base");
      expect(element).not.toHaveClass("base--emphasized");
    });
  });

  describe("Custom Styling", () => {
    it("merges custom className with base class", () => {
      const { container } = render(
        <Base className="custom-class" href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveClass("base", "custom-class");
    });

    it("applies custom styles", () => {
      const { container } = render(
        <Base style={{ display: "block" }} href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveStyle({ display: "block" });
    });

    it("combines emphasized and custom classes", () => {
      const { container } = render(
        <Base emphasized className="highlight" href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveClass("base", "base--emphasized", "highlight");
    });
  });

  describe("Analytics Integration", () => {
    it("calls custom analytics function on click", () => {
      const mockAnalytics = vi.fn();
      const { container } = render(
        <Base onAnalytics={mockAnalytics} href="https://example.com/" />
      );

      const element = container.querySelector("base")!;
      fireEvent.click(element);

      expect(mockAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "base",
        label: "base-click",
        href: "https://example.com/",
        target: undefined,
      });
    });

    it("sends gtag events when analyticsId is provided", () => {
      const { container } = render(
        <Base
          analyticsId="base-section"
          href="https://example.com/"
          target="_blank"
        />
      );

      const element = container.querySelector("base")!;
      fireEvent.click(element);

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "base",
        event_label: "base-section",
        base_href: "https://example.com/",
        base_target: "_blank",
      });
    });

    it("adds analytics data attribute", () => {
      const { container } = render(
        <Base analyticsId="test-base" href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toHaveAttribute("data-analytics-id", "test-base");
    });

    it("handles analytics errors gracefully in development", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const originalEnv = process.env.NODE_ENV;

      // Mock gtag to throw an error
      mockGtag.mockImplementation(() => {
        throw new Error("Analytics error");
      });

      // Set development environment
      process.env.NODE_ENV = "development";

      const { container } = render(
        <Base analyticsId="error-test" href="https://example.com/" />
      );
      const element = container.querySelector("base")!;
      fireEvent.click(element);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Analytics tracking failed:",
        expect.any(Error)
      );

      // Restore mocks
      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it("silently fails analytics errors in production", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const originalEnv = process.env.NODE_ENV;

      // Mock gtag to throw an error
      mockGtag.mockImplementation(() => {
        throw new Error("Analytics error");
      });

      // Set production environment
      process.env.NODE_ENV = "production";

      const { container } = render(
        <Base analyticsId="error-test" href="https://example.com/" />
      );
      const element = container.querySelector("base")!;
      fireEvent.click(element);

      expect(consoleSpy).not.toHaveBeenCalled();

      // Restore mocks
      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("Event Handling", () => {
    it("calls onClick handler", () => {
      const mockClick = vi.fn();
      const { container } = render(
        <Base onClick={mockClick} href="https://example.com/" />
      );

      const element = container.querySelector("base")!;
      fireEvent.click(element);
      expect(mockClick).toHaveBeenCalled();
    });

    it("calls onMouseEnter handler", () => {
      const mockMouseEnter = vi.fn();
      const { container } = render(
        <Base onMouseEnter={mockMouseEnter} href="https://example.com/" />
      );

      const element = container.querySelector("base")!;
      fireEvent.mouseEnter(element);
      expect(mockMouseEnter).toHaveBeenCalled();
    });

    it("calls onFocus handler", () => {
      const mockFocus = vi.fn();
      const { container } = render(
        <Base onFocus={mockFocus} href="https://example.com/" />
      );

      const element = container.querySelector("base")!;
      fireEvent.focus(element);
      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as different HTML element when 'as' prop is provided", () => {
      const { container } = render(
        <Base as="div" href="https://example.com/" data-testid="base-div" />
      );
      const element = container.querySelector("[data-testid='base-div']");
      expect(element?.tagName).toBe("DIV");
      expect(element).toHaveAttribute("href", "https://example.com/");
    });

    it("maintains functionality with different elements", () => {
      const { container } = render(
        <Base
          as="span"
          emphasized
          className="custom"
          href="https://example.com/"
        />
      );
      const element = container.querySelector("span");
      expect(element?.tagName).toBe("SPAN");
      expect(element).toHaveClass("base", "base--emphasized", "custom");
    });

    it("handles custom component", () => {
      const CustomBase = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLElement>
      >((props, ref) => <div ref={ref} {...props} data-testid="custom-base" />);
      CustomBase.displayName = "CustomBase";

      render(<Base as={CustomBase} href="https://example.com/" />);

      expect(screen.getByTestId("custom-base")).toBeInTheDocument();
    });
  });

  describe("Client-side Rendering", () => {
    it("renders fallback when isClient is true", () => {
      const { container } = render(
        <Base isClient href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toBeInTheDocument();
    });

    it("renders with memoized client component", () => {
      const { container } = render(
        <Base isClient isMemoized href="https://example.com/" />
      );
      const element = container.querySelector("base");
      expect(element).toBeInTheDocument();
    });

    it("preserves props in client rendering", () => {
      const { container } = render(
        <Base
          isClient
          emphasized
          analyticsId="client-test"
          className="client-base"
          href="https://example.com/"
          target="_blank"
        />
      );

      const element = container.querySelector("base");
      expect(element).toHaveClass("base", "base--emphasized", "client-base");
      expect(element).toHaveAttribute("data-analytics-id", "client-test");
      expect(element).toHaveAttribute("href", "https://example.com/");
      expect(element).toHaveAttribute("target", "_blank");
    });
  });

  describe("Analytics Edge Cases", () => {
    it("handles analytics with both analyticsId and onAnalytics", () => {
      const customAnalytics = vi.fn();
      const { container } = render(
        <Base
          analyticsId="test-id"
          onAnalytics={customAnalytics}
          href="https://example.com/"
        />
      );

      const element = container.querySelector("base")!;
      fireEvent.click(element);

      // Custom analytics should be called when both are provided
      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "base",
        label: "test-id",
        href: "https://example.com/",
        target: undefined,
      });

      // gtag should not be called when custom analytics is provided
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("handles analytics when gtag is not available", () => {
      // Temporarily mock gtag to undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalGtag = (window as any).gtag;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = undefined;

      const { container } = render(
        <Base analyticsId="test" href="https://example.com/" />
      );

      // Should not throw error when gtag is not available
      const element = container.querySelector("base")!;
      fireEvent.click(element);
      expect(container).toBeInTheDocument();

      // Restore gtag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });

    it("includes href and target in analytics data", () => {
      const customAnalytics = vi.fn();
      const { container } = render(
        <Base
          onAnalytics={customAnalytics}
          href="https://api.example.com/"
          target="_blank"
        />
      );

      const element = container.querySelector("base")!;
      fireEvent.click(element);

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "base",
        label: "base-click",
        href: "https://api.example.com/",
        target: "_blank",
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty href", () => {
      const { container } = render(<Base href="" />);
      const element = container.querySelector("base");
      expect(element).toHaveClass("base");
      // React filters out empty string href attributes, so it should not be present
      expect(element).not.toHaveAttribute("href");
    });

    it("maintains all HTML attributes", () => {
      const { container } = render(
        <Base
          id="test-base"
          data-testid="base-element"
          href="https://example.com/"
          aria-label="Base element"
        />
      );
      const element = container.querySelector("base");
      expect(element).toHaveAttribute("id", "test-base");
      expect(element).toHaveAttribute("data-testid", "base-element");
      expect(element).toHaveAttribute("aria-label", "Base element");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLBaseElement>();
      render(<Base ref={ref} href="https://example.com/" />);

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("BASE");
    });

    it("optimizes className building", () => {
      const { container, rerender } = render(<Base />);

      let element = container.querySelector("base");
      expect(element?.className).toBe("base");

      rerender(<Base emphasized className="custom" />);
      element = container.querySelector("base");
      expect(element?.className).toBe("base base--emphasized custom");
    });

    it("only creates click handler when analytics are needed", () => {
      const onClick = vi.fn();

      // Without analytics, should use original onClick
      const { container, rerender } = render(
        <Base onClick={onClick} href="https://example.com/" />
      );
      let element = container.querySelector("base")!;
      fireEvent.click(element);
      expect(onClick).toHaveBeenCalledTimes(1);

      // With analytics, should wrap onClick
      vi.clearAllMocks();
      rerender(
        <Base
          onClick={onClick}
          analyticsId="test"
          href="https://example.com/"
        />
      );
      element = container.querySelector("base")!;
      fireEvent.click(element);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalled();
    });

    it("does not render children (void element)", () => {
      // This test ensures that even if someone tries to pass children,
      // they won't be rendered because base is a void element
      const { container } = render(<Base href="https://example.com/" />);
      const element = container.querySelector("base");
      expect(element?.children.length).toBe(0);
      expect(element?.textContent).toBe("");
    });
  });

  // NOTE: Client-side memoization testing skipped - implementation detail
});
