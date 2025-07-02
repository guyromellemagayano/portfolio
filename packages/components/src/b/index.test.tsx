import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { B, type BProps } from ".";

// Mock window.gtag for analytics tests
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("B Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: BProps = {
    children: "Bold text",
  };

  it("renders with default props", () => {
    render(<B {...defaultProps} />);

    const element = screen.getByText("Bold text");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("B");
    expect(element).toHaveClass("b");
  });

  it("renders with custom text content", () => {
    render(<B>Important notice</B>);
    expect(screen.getByText("Important notice")).toBeInTheDocument();
  });

  it("preserves semantic meaning", () => {
    render(<B>Semantic bold</B>);
    const element = screen.getByText("Semantic bold");
    expect(element.tagName).toBe("B");
  });

  describe("Emphasized Variant", () => {
    it("applies emphasized class when emphasized prop is true", () => {
      render(<B emphasized>Extra bold text</B>);
      const element = screen.getByText("Extra bold text");
      expect(element).toHaveClass("b", "b--emphasized");
    });

    it("adds data attribute for emphasized state", () => {
      render(<B emphasized>Emphasized text</B>);
      const element = screen.getByText("Emphasized text");
      expect(element).toHaveAttribute("data-emphasized", "true");
    });

    it("does not add emphasized class when emphasized is false", () => {
      render(<B emphasized={false}>Normal bold</B>);
      const element = screen.getByText("Normal bold");
      expect(element).toHaveClass("b");
      expect(element).not.toHaveClass("b--emphasized");
    });
  });

  describe("Custom Styling", () => {
    it("merges custom className with base class", () => {
      render(<B className="custom-class">Custom styled</B>);
      const element = screen.getByText("Custom styled");
      expect(element).toHaveClass("b", "custom-class");
    });

    it("applies custom styles", () => {
      render(<B style={{ color: "red" }}>Red text</B>);
      const element = screen.getByText("Red text");
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("combines emphasized and custom classes", () => {
      render(
        <B emphasized className="highlight">
          Extra emphasized
        </B>
      );
      const element = screen.getByText("Extra emphasized");
      expect(element).toHaveClass("b", "b--emphasized", "highlight");
    });
  });

  describe("Analytics Integration", () => {
    it("calls custom analytics function on click", () => {
      const mockAnalytics = vi.fn();
      render(<B onAnalytics={mockAnalytics}>Trackable text</B>);

      fireEvent.click(screen.getByText("Trackable text"));

      expect(mockAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "text-emphasis",
        label: "b-click",
        content: "Trackable text",
      });
    });

    it("sends gtag events when analyticsId is provided", () => {
      render(<B analyticsId="emphasis-section">Analytics text</B>);

      fireEvent.click(screen.getByText("Analytics text"));

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "text-emphasis",
        event_label: "emphasis-section",
        text_content: "Analytics text",
      });
    });

    it("adds analytics data attribute", () => {
      render(<B analyticsId="test-emphasis">Tracked bold</B>);
      const element = screen.getByText("Tracked bold");
      expect(element).toHaveAttribute("data-analytics-id", "test-emphasis");
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

      render(<B analyticsId="error-test">Error text</B>);
      fireEvent.click(screen.getByText("Error text"));

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

      render(<B analyticsId="error-test">Error text</B>);
      fireEvent.click(screen.getByText("Error text"));

      expect(consoleSpy).not.toHaveBeenCalled();

      // Restore mocks
      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("Event Handling", () => {
    it("calls onClick handler", () => {
      const mockClick = vi.fn();
      render(<B onClick={mockClick}>Clickable text</B>);

      fireEvent.click(screen.getByText("Clickable text"));
      expect(mockClick).toHaveBeenCalled();
    });

    it("calls onMouseEnter handler", () => {
      const mockMouseEnter = vi.fn();
      render(<B onMouseEnter={mockMouseEnter}>Hoverable text</B>);

      fireEvent.mouseEnter(screen.getByText("Hoverable text"));
      expect(mockMouseEnter).toHaveBeenCalled();
    });

    it("calls onFocus handler", () => {
      const mockFocus = vi.fn();
      render(<B onFocus={mockFocus}>Focusable text</B>);

      fireEvent.focus(screen.getByText("Focusable text"));
      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as different HTML element when 'as' prop is provided", () => {
      render(<B as="strong">Strong text</B>);
      const element = screen.getByText("Strong text");
      expect(element.tagName).toBe("STRONG");
    });

    it("maintains functionality with different elements", () => {
      render(
        <B as="span" emphasized className="custom">
          Span bold
        </B>
      );
      const element = screen.getByText("Span bold");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveClass("b", "b--emphasized", "custom");
    });

    it("handles custom component", () => {
      const CustomB = React.forwardRef<
        HTMLElement,
        React.HTMLAttributes<HTMLElement>
      >((props, ref) => <span ref={ref} {...props} data-testid="custom-b" />);
      CustomB.displayName = "CustomB";

      render(<B as={CustomB}>Custom text</B>);

      expect(screen.getByTestId("custom-b")).toBeInTheDocument();
    });
  });

  describe("Client-side Rendering", () => {
    it("renders fallback when isClient is true", () => {
      render(<B isClient>Client text</B>);
      expect(screen.getByText("Client text")).toBeInTheDocument();
    });

    it("renders with memoized client component", () => {
      render(
        <B isClient isMemoized>
          Memoized text
        </B>
      );
      expect(screen.getByText("Memoized text")).toBeInTheDocument();
    });

    it("preserves props in client rendering", () => {
      render(
        <B isClient emphasized analyticsId="client-test" className="client-b">
          Client emphasized
        </B>
      );

      const element = screen.getByText("Client emphasized");
      expect(element).toHaveClass("b", "b--emphasized", "client-b");
      expect(element).toHaveAttribute("data-analytics-id", "client-test");
    });
  });

  describe("Analytics Edge Cases", () => {
    it("handles analytics with both analyticsId and onAnalytics", () => {
      const customAnalytics = vi.fn();
      render(
        <B analyticsId="test-id" onAnalytics={customAnalytics}>
          Both analytics
        </B>
      );

      fireEvent.click(screen.getByText("Both analytics"));

      // Custom analytics should be called when both are provided
      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "text-emphasis",
        label: "test-id",
        content: "Both analytics",
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

      const { container } = render(<B analyticsId="test">No gtag text</B>);

      // Should not throw error when gtag is not available
      fireEvent.click(screen.getByText("No gtag text"));
      expect(container).toBeInTheDocument();

      // Restore gtag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });

    it("handles empty children in analytics", () => {
      const customAnalytics = vi.fn();
      render(<B onAnalytics={customAnalytics} data-testid="empty-b" />);

      const element = screen.getByTestId("empty-b");
      fireEvent.click(element);

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "text-emphasis",
        label: "b-click",
        content: "",
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      render(<B data-testid="empty-b" />);
      const element = screen.getByTestId("empty-b");
      expect(element).toHaveClass("b");
    });

    it("handles numeric content", () => {
      render(<B>{42}</B>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles nested elements", () => {
      render(
        <B>
          Bold with <em>emphasis</em>
        </B>
      );
      expect(screen.getByText("Bold with")).toBeInTheDocument();
      expect(screen.getByText("emphasis")).toBeInTheDocument();
    });

    it("maintains all HTML attributes", () => {
      render(
        <B id="test-b" data-testid="bold-element" aria-label="Bold content">
          Attributed text
        </B>
      );
      const element = screen.getByTestId("bold-element");
      expect(element).toHaveAttribute("id", "test-b");
      expect(element).toHaveAttribute("aria-label", "Bold content");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<B ref={ref}>Ref text</B>);

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("B");
    });

    it("optimizes className building", () => {
      const { rerender } = render(<B>Basic</B>);

      let element = screen.getByText("Basic");
      expect(element.className).toBe("b");

      rerender(
        <B emphasized className="custom">
          Enhanced
        </B>
      );
      element = screen.getByText("Enhanced");
      expect(element.className).toBe("b b--emphasized custom");
    });

    it("only creates click handler when analytics are needed", () => {
      const onClick = vi.fn();

      // Without analytics, should use original onClick
      const { rerender } = render(<B onClick={onClick}>No analytics</B>);
      fireEvent.click(screen.getByText("No analytics"));
      expect(onClick).toHaveBeenCalledTimes(1);

      // With analytics, should wrap onClick
      vi.clearAllMocks();
      rerender(
        <B onClick={onClick} analyticsId="test">
          With analytics
        </B>
      );
      fireEvent.click(screen.getByText("With analytics"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalled();
    });

    it("handles complex children types", () => {
      render(
        <B data-testid="complex-b">
          <span>B</span>
          <span>o</span>
          <span>l</span>
          <span>d</span>
        </B>
      );

      const element = screen.getByTestId("complex-b");
      expect(element.children).toHaveLength(4);
    });

    it("handles numeric children in analytics", () => {
      const customAnalytics = vi.fn();
      render(<B onAnalytics={customAnalytics}>{2024}</B>);

      fireEvent.click(screen.getByText("2024"));

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "text-emphasis",
        label: "b-click",
        content: "2024",
      });
    });
  });

  // NOTE: Client-side memoization testing skipped - implementation detail
});
