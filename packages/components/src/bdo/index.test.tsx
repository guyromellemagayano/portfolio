import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Bdo, type BdoProps } from ".";

// Mock window.gtag for analytics tests
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("Bdo Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: BdoProps = {
    dir: "ltr",
    children: "Bidirectional override text",
  };

  it("renders with default props", () => {
    render(<Bdo {...defaultProps} />);

    const element = screen.getByText("Bidirectional override text");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("BDO");
    expect(element).toHaveClass("bdo", "bdo--ltr");
    expect(element).toHaveAttribute("dir", "ltr");
  });

  it("renders with custom text content", () => {
    render(<Bdo dir="rtl">مرحبا Hello</Bdo>);
    const element = screen.getByText("مرحبا Hello");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("dir", "rtl");
  });

  it("preserves semantic meaning", () => {
    render(<Bdo dir="ltr">Semantic text</Bdo>);
    const element = screen.getByText("Semantic text");
    expect(element.tagName).toBe("BDO");
  });

  describe("Text Direction Override", () => {
    it("sets dir attribute and class for left-to-right", () => {
      render(<Bdo dir="ltr">Left to right text</Bdo>);
      const element = screen.getByText("Left to right text");
      expect(element).toHaveAttribute("dir", "ltr");
      expect(element).toHaveClass("bdo", "bdo--ltr");
    });

    it("sets dir attribute and class for right-to-left", () => {
      render(<Bdo dir="rtl">نص من اليمين إلى اليسار</Bdo>);
      const element = screen.getByText("نص من اليمين إلى اليسار");
      expect(element).toHaveAttribute("dir", "rtl");
      expect(element).toHaveClass("bdo", "bdo--rtl");
    });

    it("always requires dir attribute for semantic meaning", () => {
      render(<Bdo dir="ltr">Required direction</Bdo>);
      const element = screen.getByText("Required direction");
      expect(element).toHaveAttribute("dir", "ltr");
    });
  });

  describe("Emphasized Variant", () => {
    it("applies emphasized class when emphasized prop is true", () => {
      render(
        <Bdo dir="ltr" emphasized>
          Emphasized text
        </Bdo>
      );
      const element = screen.getByText("Emphasized text");
      expect(element).toHaveClass("bdo", "bdo--emphasized", "bdo--ltr");
    });

    it("adds data attribute for emphasized state", () => {
      render(
        <Bdo dir="rtl" emphasized>
          Emphasized content
        </Bdo>
      );
      const element = screen.getByText("Emphasized content");
      expect(element).toHaveAttribute("data-emphasized", "true");
    });

    it("does not add emphasized class when emphasized is false", () => {
      render(
        <Bdo dir="ltr" emphasized={false}>
          Normal text
        </Bdo>
      );
      const element = screen.getByText("Normal text");
      expect(element).toHaveClass("bdo", "bdo--ltr");
      expect(element).not.toHaveClass("bdo--emphasized");
    });
  });

  describe("Direction-Specific Classes", () => {
    it("applies correct class for LTR direction", () => {
      render(<Bdo dir="ltr">LTR text</Bdo>);
      const element = screen.getByText("LTR text");
      expect(element).toHaveClass("bdo--ltr");
      expect(element).not.toHaveClass("bdo--rtl");
    });

    it("applies correct class for RTL direction", () => {
      render(<Bdo dir="rtl">RTL text</Bdo>);
      const element = screen.getByText("RTL text");
      expect(element).toHaveClass("bdo--rtl");
      expect(element).not.toHaveClass("bdo--ltr");
    });

    it("combines direction and emphasized classes", () => {
      render(
        <Bdo dir="rtl" emphasized>
          Combined classes
        </Bdo>
      );
      const element = screen.getByText("Combined classes");
      expect(element).toHaveClass("bdo", "bdo--emphasized", "bdo--rtl");
    });
  });

  describe("Custom Styling", () => {
    it("merges custom className with base classes", () => {
      render(
        <Bdo dir="ltr" className="custom-class">
          Custom styled
        </Bdo>
      );
      const element = screen.getByText("Custom styled");
      expect(element).toHaveClass("bdo", "bdo--ltr", "custom-class");
    });

    it("applies custom styles", () => {
      render(
        <Bdo dir="rtl" style={{ color: "red" }}>
          Red text
        </Bdo>
      );
      const element = screen.getByText("Red text");
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("combines all classes correctly", () => {
      render(
        <Bdo dir="ltr" emphasized className="highlight">
          All classes
        </Bdo>
      );
      const element = screen.getByText("All classes");
      expect(element).toHaveClass(
        "bdo",
        "bdo--emphasized",
        "bdo--ltr",
        "highlight"
      );
    });
  });

  describe("Analytics Integration", () => {
    it("calls custom analytics function on click", () => {
      const mockAnalytics = vi.fn();
      render(
        <Bdo dir="ltr" onAnalytics={mockAnalytics}>
          Trackable text
        </Bdo>
      );

      fireEvent.click(screen.getByText("Trackable text"));

      expect(mockAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdo",
        label: "bdo-click",
        content: "Trackable text",
        dir: "ltr",
      });
    });

    it("sends gtag events when analyticsId is provided", () => {
      render(
        <Bdo dir="rtl" analyticsId="bdo-section">
          Analytics text
        </Bdo>
      );

      fireEvent.click(screen.getByText("Analytics text"));

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "bdo",
        event_label: "bdo-section",
        bdo_content: "Analytics text",
        bdo_dir: "rtl",
      });
    });

    it("adds analytics data attribute", () => {
      render(
        <Bdo dir="ltr" analyticsId="test-bdo">
          Tracked text
        </Bdo>
      );
      const element = screen.getByText("Tracked text");
      expect(element).toHaveAttribute("data-analytics-id", "test-bdo");
    });

    it("includes direction in analytics data", () => {
      const mockAnalytics = vi.fn();
      render(
        <Bdo dir="rtl" onAnalytics={mockAnalytics}>
          RTL content
        </Bdo>
      );

      fireEvent.click(screen.getByText("RTL content"));

      expect(mockAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdo",
        label: "bdo-click",
        content: "RTL content",
        dir: "rtl",
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

      render(
        <Bdo dir="ltr" analyticsId="error-test">
          Error text
        </Bdo>
      );
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

      render(
        <Bdo dir="rtl" analyticsId="error-test">
          Error text
        </Bdo>
      );
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
      render(
        <Bdo dir="ltr" onClick={mockClick}>
          Clickable text
        </Bdo>
      );

      fireEvent.click(screen.getByText("Clickable text"));
      expect(mockClick).toHaveBeenCalled();
    });

    it("calls onMouseEnter handler", () => {
      const mockMouseEnter = vi.fn();
      render(
        <Bdo dir="rtl" onMouseEnter={mockMouseEnter}>
          Hoverable text
        </Bdo>
      );

      fireEvent.mouseEnter(screen.getByText("Hoverable text"));
      expect(mockMouseEnter).toHaveBeenCalled();
    });

    it("calls onFocus handler", () => {
      const mockFocus = vi.fn();
      render(
        <Bdo dir="ltr" onFocus={mockFocus}>
          Focusable text
        </Bdo>
      );

      fireEvent.focus(screen.getByText("Focusable text"));
      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as different HTML element when 'as' prop is provided", () => {
      render(
        <Bdo as="span" dir="ltr">
          Span text
        </Bdo>
      );
      const element = screen.getByText("Span text");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveAttribute("dir", "ltr");
    });

    it("maintains functionality with different elements", () => {
      render(
        <Bdo as="div" dir="rtl" emphasized className="custom">
          Div bdo
        </Bdo>
      );
      const element = screen.getByText("Div bdo");
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass(
        "bdo",
        "bdo--emphasized",
        "bdo--rtl",
        "custom"
      );
      expect(element).toHaveAttribute("dir", "rtl");
    });

    it("handles custom component", () => {
      const CustomBdo = React.forwardRef<
        HTMLElement,
        React.HTMLAttributes<HTMLElement>
      >((props, ref) => <i ref={ref} {...props} data-testid="custom-bdo" />);
      CustomBdo.displayName = "CustomBdo";

      render(
        <Bdo as={CustomBdo} dir="ltr">
          Custom text
        </Bdo>
      );

      expect(screen.getByTestId("custom-bdo")).toBeInTheDocument();
    });
  });

  describe("Client-side Rendering", () => {
    it("renders fallback when isClient is true", () => {
      render(
        <Bdo dir="ltr" isClient>
          Client text
        </Bdo>
      );
      expect(screen.getByText("Client text")).toBeInTheDocument();
    });

    it("renders with memoized client component", () => {
      render(
        <Bdo dir="rtl" isClient isMemoized>
          Memoized text
        </Bdo>
      );
      expect(screen.getByText("Memoized text")).toBeInTheDocument();
    });

    it("preserves props in client rendering", () => {
      render(
        <Bdo
          dir="ltr"
          isClient
          emphasized
          analyticsId="client-test"
          className="client-bdo"
        >
          Client emphasized
        </Bdo>
      );

      const element = screen.getByText("Client emphasized");
      expect(element).toHaveClass(
        "bdo",
        "bdo--emphasized",
        "bdo--ltr",
        "client-bdo"
      );
      expect(element).toHaveAttribute("data-analytics-id", "client-test");
      expect(element).toHaveAttribute("dir", "ltr");
    });
  });

  describe("Analytics Edge Cases", () => {
    it("handles analytics with both analyticsId and onAnalytics", () => {
      const customAnalytics = vi.fn();
      render(
        <Bdo dir="rtl" analyticsId="test-id" onAnalytics={customAnalytics}>
          Both analytics
        </Bdo>
      );

      fireEvent.click(screen.getByText("Both analytics"));

      // Custom analytics should be called when both are provided
      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdo",
        label: "test-id",
        content: "Both analytics",
        dir: "rtl",
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
        <Bdo dir="ltr" analyticsId="test">
          No gtag text
        </Bdo>
      );

      // Should not throw error when gtag is not available
      fireEvent.click(screen.getByText("No gtag text"));
      expect(container).toBeInTheDocument();

      // Restore gtag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });

    it("always includes direction in analytics since it's required", () => {
      const customAnalytics = vi.fn();
      render(
        <Bdo dir="ltr" onAnalytics={customAnalytics}>
          Always has direction
        </Bdo>
      );

      fireEvent.click(screen.getByText("Always has direction"));

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdo",
        label: "bdo-click",
        content: "Always has direction",
        dir: "ltr",
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      render(<Bdo dir="ltr" data-testid="empty-bdo" />);
      const element = screen.getByTestId("empty-bdo");
      expect(element).toHaveClass("bdo", "bdo--ltr");
      expect(element).toHaveAttribute("dir", "ltr");
    });

    it("handles numeric content", () => {
      render(<Bdo dir="rtl">{42}</Bdo>);
      const element = screen.getByText("42");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("dir", "rtl");
    });

    it("handles mixed language content with override", () => {
      render(<Bdo dir="ltr">Hello مرحبا</Bdo>);
      expect(screen.getByText("Hello مرحبا")).toBeInTheDocument();
    });

    it("handles nested elements", () => {
      render(
        <Bdo dir="rtl" data-testid="nested-bdo">
          Mixed <em>emphasis</em> text
        </Bdo>
      );
      const element = screen.getByTestId("nested-bdo");
      expect(element).toBeInTheDocument();
      expect(screen.getByText("emphasis")).toBeInTheDocument();
      expect(element).toHaveTextContent("Mixed emphasis text");
      expect(element).toHaveAttribute("dir", "rtl");
    });

    it("maintains all HTML attributes", () => {
      render(
        <Bdo
          dir="ltr"
          id="test-bdo"
          data-testid="bdo-element"
          aria-label="Bidirectional override content"
        >
          Attributed text
        </Bdo>
      );
      const element = screen.getByTestId("bdo-element");
      expect(element).toHaveAttribute("id", "test-bdo");
      expect(element).toHaveAttribute(
        "aria-label",
        "Bidirectional override content"
      );
      expect(element).toHaveAttribute("dir", "ltr");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Bdo ref={ref} dir="rtl">
          Ref text
        </Bdo>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("BDO");
      expect(ref.current?.getAttribute("dir")).toBe("rtl");
    });

    it("optimizes className building", () => {
      const { rerender } = render(<Bdo dir="ltr">Basic</Bdo>);

      let element = screen.getByText("Basic");
      expect(element.className).toBe("bdo bdo--ltr");

      rerender(
        <Bdo dir="rtl" emphasized className="custom">
          Enhanced
        </Bdo>
      );
      element = screen.getByText("Enhanced");
      expect(element.className).toBe("bdo bdo--emphasized bdo--rtl custom");
    });

    it("only creates click handler when analytics are needed", () => {
      const onClick = vi.fn();

      // Without analytics, should use original onClick
      const { rerender } = render(
        <Bdo dir="ltr" onClick={onClick}>
          No analytics
        </Bdo>
      );
      fireEvent.click(screen.getByText("No analytics"));
      expect(onClick).toHaveBeenCalledTimes(1);

      // With analytics, should wrap onClick
      vi.clearAllMocks();
      rerender(
        <Bdo dir="rtl" onClick={onClick} analyticsId="test">
          With analytics
        </Bdo>
      );
      fireEvent.click(screen.getByText("With analytics"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalled();
    });

    it("handles complex children types", () => {
      render(
        <Bdo dir="ltr" data-testid="complex-bdo">
          <span>B</span>
          <span>d</span>
          <span>o</span>
        </Bdo>
      );

      const element = screen.getByTestId("complex-bdo");
      expect(element.children).toHaveLength(3);
    });

    it("handles numeric children in analytics", () => {
      const customAnalytics = vi.fn();
      render(
        <Bdo dir="rtl" onAnalytics={customAnalytics}>
          {2024}
        </Bdo>
      );

      fireEvent.click(screen.getByText("2024"));

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "bdo",
        label: "bdo-click",
        content: "2024",
        dir: "rtl",
      });
    });

    it("ensures dir attribute is always present for accessibility", () => {
      render(<Bdo dir="ltr">Always has direction</Bdo>);
      const element = screen.getByText("Always has direction");
      expect(element).toHaveAttribute("dir", "ltr");
    });

    it("handles direction switching correctly", () => {
      const { rerender } = render(<Bdo dir="ltr">Direction test</Bdo>);

      let element = screen.getByText("Direction test");
      expect(element).toHaveAttribute("dir", "ltr");
      expect(element).toHaveClass("bdo--ltr");
      expect(element).not.toHaveClass("bdo--rtl");

      rerender(<Bdo dir="rtl">Direction test</Bdo>);

      element = screen.getByText("Direction test");
      expect(element).toHaveAttribute("dir", "rtl");
      expect(element).toHaveClass("bdo--rtl");
      expect(element).not.toHaveClass("bdo--ltr");
    });
  });

  // NOTE: Client-side memoization testing skipped - implementation detail
});
