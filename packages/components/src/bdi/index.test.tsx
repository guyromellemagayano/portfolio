import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Bdi, type BdiProps } from ".";

// Mock window.gtag for analytics tests
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("Bdi Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: BdiProps = {
    children: "Bidirectional text",
  };

  it("renders with default props", () => {
    render(<Bdi {...defaultProps} />);

    const element = screen.getByText("Bidirectional text");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("BDI");
    expect(element).toHaveClass("bdi");
  });

  it("renders with custom text content", () => {
    render(<Bdi>مرحبا Hello</Bdi>);
    expect(screen.getByText("مرحبا Hello")).toBeInTheDocument();
  });

  it("preserves semantic meaning", () => {
    render(<Bdi>Semantic text</Bdi>);
    const element = screen.getByText("Semantic text");
    expect(element.tagName).toBe("BDI");
  });

  describe("Text Direction", () => {
    it("sets dir attribute for left-to-right", () => {
      render(<Bdi dir="ltr">Left to right text</Bdi>);
      const element = screen.getByText("Left to right text");
      expect(element).toHaveAttribute("dir", "ltr");
    });

    it("sets dir attribute for right-to-left", () => {
      render(<Bdi dir="rtl">نص من اليمين إلى اليسار</Bdi>);
      const element = screen.getByText("نص من اليمين إلى اليسار");
      expect(element).toHaveAttribute("dir", "rtl");
    });

    it("sets dir attribute for auto-detection", () => {
      render(<Bdi dir="auto">Auto direction text</Bdi>);
      const element = screen.getByText("Auto direction text");
      expect(element).toHaveAttribute("dir", "auto");
    });

    it("does not set dir attribute when not specified", () => {
      render(<Bdi>No direction specified</Bdi>);
      const element = screen.getByText("No direction specified");
      expect(element).not.toHaveAttribute("dir");
    });
  });

  describe("Emphasized Variant", () => {
    it("applies emphasized class when emphasized prop is true", () => {
      render(<Bdi emphasized>Emphasized text</Bdi>);
      const element = screen.getByText("Emphasized text");
      expect(element).toHaveClass("bdi", "bdi--emphasized");
    });

    it("adds data attribute for emphasized state", () => {
      render(<Bdi emphasized>Emphasized content</Bdi>);
      const element = screen.getByText("Emphasized content");
      expect(element).toHaveAttribute("data-emphasized", "true");
    });

    it("does not add emphasized class when emphasized is false", () => {
      render(<Bdi emphasized={false}>Normal text</Bdi>);
      const element = screen.getByText("Normal text");
      expect(element).toHaveClass("bdi");
      expect(element).not.toHaveClass("bdi--emphasized");
    });
  });

  describe("Custom Styling", () => {
    it("merges custom className with base class", () => {
      render(<Bdi className="custom-class">Custom styled</Bdi>);
      const element = screen.getByText("Custom styled");
      expect(element).toHaveClass("bdi", "custom-class");
    });

    it("applies custom styles", () => {
      render(<Bdi style={{ color: "red" }}>Red text</Bdi>);
      const element = screen.getByText("Red text");
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("combines emphasized and custom classes", () => {
      render(
        <Bdi emphasized className="highlight" dir="rtl">
          Extra emphasized
        </Bdi>
      );
      const element = screen.getByText("Extra emphasized");
      expect(element).toHaveClass("bdi", "bdi--emphasized", "highlight");
    });
  });

  describe("Analytics Integration", () => {
    it("calls custom analytics function on click", () => {
      const mockAnalytics = vi.fn();
      render(
        <Bdi onAnalytics={mockAnalytics} dir="auto">
          Trackable text
        </Bdi>
      );

      fireEvent.click(screen.getByText("Trackable text"));

      expect(mockAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdi",
        label: "bdi-click",
        content: "Trackable text",
        dir: "auto",
      });
    });

    it("sends gtag events when analyticsId is provided", () => {
      render(
        <Bdi analyticsId="bdi-section" dir="rtl">
          Analytics text
        </Bdi>
      );

      fireEvent.click(screen.getByText("Analytics text"));

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "bdi",
        event_label: "bdi-section",
        bdi_content: "Analytics text",
        bdi_dir: "rtl",
      });
    });

    it("adds analytics data attribute", () => {
      render(<Bdi analyticsId="test-bdi">Tracked text</Bdi>);
      const element = screen.getByText("Tracked text");
      expect(element).toHaveAttribute("data-analytics-id", "test-bdi");
    });

    it("includes direction in analytics data", () => {
      const mockAnalytics = vi.fn();
      render(
        <Bdi onAnalytics={mockAnalytics} dir="ltr">
          LTR content
        </Bdi>
      );

      fireEvent.click(screen.getByText("LTR content"));

      expect(mockAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdi",
        label: "bdi-click",
        content: "LTR content",
        dir: "ltr",
      });
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

      render(<Bdi analyticsId="error-test">Error text</Bdi>);
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

      render(<Bdi analyticsId="error-test">Error text</Bdi>);
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
      render(<Bdi onClick={mockClick}>Clickable text</Bdi>);

      fireEvent.click(screen.getByText("Clickable text"));
      expect(mockClick).toHaveBeenCalled();
    });

    it("calls onMouseEnter handler", () => {
      const mockMouseEnter = vi.fn();
      render(<Bdi onMouseEnter={mockMouseEnter}>Hoverable text</Bdi>);

      fireEvent.mouseEnter(screen.getByText("Hoverable text"));
      expect(mockMouseEnter).toHaveBeenCalled();
    });

    it("calls onFocus handler", () => {
      const mockFocus = vi.fn();
      render(<Bdi onFocus={mockFocus}>Focusable text</Bdi>);

      fireEvent.focus(screen.getByText("Focusable text"));
      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as different HTML element when 'as' prop is provided", () => {
      render(<Bdi as="span">Span text</Bdi>);
      const element = screen.getByText("Span text");
      expect(element.tagName).toBe("SPAN");
    });

    it("maintains functionality with different elements", () => {
      render(
        <Bdi as="div" emphasized className="custom" dir="auto">
          Div bdi
        </Bdi>
      );
      const element = screen.getByText("Div bdi");
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("bdi", "bdi--emphasized", "custom");
      expect(element).toHaveAttribute("dir", "auto");
    });

    it("handles custom component", () => {
      const CustomBdi = React.forwardRef<
        HTMLElement,
        React.HTMLAttributes<HTMLElement>
      >((props, ref) => <i ref={ref} {...props} data-testid="custom-bdi" />);
      CustomBdi.displayName = "CustomBdi";

      render(<Bdi as={CustomBdi}>Custom text</Bdi>);

      expect(screen.getByTestId("custom-bdi")).toBeInTheDocument();
    });
  });

  describe("Client-side Rendering", () => {
    it("renders fallback when isClient is true", () => {
      render(<Bdi isClient>Client text</Bdi>);
      expect(screen.getByText("Client text")).toBeInTheDocument();
    });

    it("renders with memoized client component", () => {
      render(
        <Bdi isClient isMemoized>
          Memoized text
        </Bdi>
      );
      expect(screen.getByText("Memoized text")).toBeInTheDocument();
    });

    it("preserves props in client rendering", () => {
      render(
        <Bdi
          isClient
          emphasized
          analyticsId="client-test"
          className="client-bdi"
          dir="rtl"
        >
          Client emphasized
        </Bdi>
      );

      const element = screen.getByText("Client emphasized");
      expect(element).toHaveClass("bdi", "bdi--emphasized", "client-bdi");
      expect(element).toHaveAttribute("data-analytics-id", "client-test");
      expect(element).toHaveAttribute("dir", "rtl");
    });
  });

  describe("Analytics Edge Cases", () => {
    it("handles analytics with both analyticsId and onAnalytics", () => {
      const customAnalytics = vi.fn();
      render(
        <Bdi analyticsId="test-id" onAnalytics={customAnalytics} dir="auto">
          Both analytics
        </Bdi>
      );

      fireEvent.click(screen.getByText("Both analytics"));

      // Custom analytics should be called when both are provided
      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdi",
        label: "test-id",
        content: "Both analytics",
        dir: "auto",
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

      const { container } = render(<Bdi analyticsId="test">No gtag text</Bdi>);

      // Should not throw error when gtag is not available
      fireEvent.click(screen.getByText("No gtag text"));
      expect(container).toBeInTheDocument();

      // Restore gtag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });

    it("handles analytics without direction", () => {
      const customAnalytics = vi.fn();
      render(<Bdi onAnalytics={customAnalytics}>No direction</Bdi>);

      fireEvent.click(screen.getByText("No direction"));

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdi",
        label: "bdi-click",
        content: "No direction",
        dir: undefined,
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      render(<Bdi data-testid="empty-bdi" />);
      const element = screen.getByTestId("empty-bdi");
      expect(element).toHaveClass("bdi");
    });

    it("handles numeric content", () => {
      render(<Bdi>{42}</Bdi>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles mixed language content", () => {
      render(<Bdi dir="auto">Hello مرحبا</Bdi>);
      expect(screen.getByText("Hello مرحبا")).toBeInTheDocument();
    });

    it("handles nested elements", () => {
      render(
        <Bdi data-testid="nested-bdi">
          Mixed <em>emphasis</em> text
        </Bdi>
      );
      const element = screen.getByTestId("nested-bdi");
      expect(element).toBeInTheDocument();
      expect(screen.getByText("emphasis")).toBeInTheDocument();
      expect(element).toHaveTextContent("Mixed emphasis text");
    });

    it("maintains all HTML attributes", () => {
      render(
        <Bdi
          id="test-bdi"
          data-testid="bdi-element"
          aria-label="Bidirectional content"
          dir="rtl"
        >
          Attributed text
        </Bdi>
      );
      const element = screen.getByTestId("bdi-element");
      expect(element).toHaveAttribute("id", "test-bdi");
      expect(element).toHaveAttribute("aria-label", "Bidirectional content");
      expect(element).toHaveAttribute("dir", "rtl");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Bdi ref={ref}>Ref text</Bdi>);

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("BDI");
    });

    it("optimizes className building", () => {
      const { rerender } = render(<Bdi>Basic</Bdi>);

      let element = screen.getByText("Basic");
      expect(element.className).toBe("bdi");

      rerender(
        <Bdi emphasized className="custom">
          Enhanced
        </Bdi>
      );
      element = screen.getByText("Enhanced");
      expect(element.className).toBe("bdi bdi--emphasized custom");
    });

    it("only creates click handler when analytics are needed", () => {
      const onClick = vi.fn();

      // Without analytics, should use original onClick
      const { rerender } = render(<Bdi onClick={onClick}>No analytics</Bdi>);
      fireEvent.click(screen.getByText("No analytics"));
      expect(onClick).toHaveBeenCalledTimes(1);

      // With analytics, should wrap onClick
      vi.clearAllMocks();
      rerender(
        <Bdi onClick={onClick} analyticsId="test">
          With analytics
        </Bdi>
      );
      fireEvent.click(screen.getByText("With analytics"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalled();
    });

    it("handles complex children types", () => {
      render(
        <Bdi data-testid="complex-bdi">
          <span>B</span>
          <span>i</span>
          <span>d</span>
          <span>i</span>
        </Bdi>
      );

      const element = screen.getByTestId("complex-bdi");
      expect(element.children).toHaveLength(4);
    });

    it("handles numeric children in analytics", () => {
      const customAnalytics = vi.fn();
      render(<Bdi onAnalytics={customAnalytics}>{2024}</Bdi>);

      fireEvent.click(screen.getByText("2024"));

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdi",
        label: "bdi-click",
        content: "2024",
        dir: undefined,
      });
    });
  });

  // NOTE: Client-side memoization testing skipped - implementation detail
});
