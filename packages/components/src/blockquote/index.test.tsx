import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Blockquote, type BlockquoteProps } from ".";

describe("Blockquote Component", () => {
  let mockConsoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock console.warn for polymorphic validation tests
    mockConsoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    // Set development environment for polymorphic validation
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const defaultProps: BlockquoteProps = {
    children: "This is a quote",
  };

  it("renders with default props", () => {
    render(<Blockquote {...defaultProps} />);

    const element = screen.getByText("This is a quote");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("BLOCKQUOTE");
    expect(element).toHaveClass("blockquote");
  });

  it("renders with custom text content", () => {
    render(<Blockquote>To be or not to be, that is the question.</Blockquote>);
    expect(
      screen.getByText("To be or not to be, that is the question.")
    ).toBeInTheDocument();
  });

  it("preserves semantic meaning", () => {
    render(<Blockquote>Semantic quote</Blockquote>);
    const element = screen.getByText("Semantic quote");
    expect(element.tagName).toBe("BLOCKQUOTE");
  });

  describe("Cite Attribute", () => {
    it("applies cite attribute correctly", () => {
      render(
        <Blockquote cite="https://example.com/source">
          Quote with citation
        </Blockquote>
      );
      const element = screen.getByText("Quote with citation");
      expect(element).toHaveAttribute("cite", "https://example.com/source");
    });

    it("does not add cite attribute when not provided", () => {
      render(<Blockquote>Quote without citation</Blockquote>);
      const element = screen.getByText("Quote without citation");
      expect(element).not.toHaveAttribute("cite");
    });
  });

  describe("Custom Styling", () => {
    it("merges custom className with base class", () => {
      render(<Blockquote className="custom-quote">Custom styled</Blockquote>);
      const element = screen.getByText("Custom styled");
      expect(element).toHaveClass("blockquote", "custom-quote");
    });

    it("applies custom styles", () => {
      render(
        <Blockquote style={{ fontStyle: "italic" }}>Italic quote</Blockquote>
      );
      const element = screen.getByText("Italic quote");
      expect(element).toHaveStyle({ fontStyle: "italic" });
    });
  });

  describe("Analytics Integration", () => {
    it("adds analytics data attribute", () => {
      render(<Blockquote analyticsId="test-quote">Tracked quote</Blockquote>);
      const element = screen.getByText("Tracked quote");
      expect(element).toHaveAttribute("data-analytics-id", "test-quote");
    });

    it("does not add analytics attribute when not provided", () => {
      render(<Blockquote>Untracked quote</Blockquote>);
      const element = screen.getByText("Untracked quote");
      expect(element).not.toHaveAttribute("data-analytics-id");
    });
  });

  describe("Event Handling", () => {
    it("calls onClick handler", () => {
      const mockClick = vi.fn();
      render(<Blockquote onClick={mockClick}>Clickable quote</Blockquote>);

      fireEvent.click(screen.getByText("Clickable quote"));
      expect(mockClick).toHaveBeenCalled();
    });

    it("calls onMouseEnter handler", () => {
      const mockMouseEnter = vi.fn();
      render(
        <Blockquote onMouseEnter={mockMouseEnter}>Hoverable quote</Blockquote>
      );

      fireEvent.mouseEnter(screen.getByText("Hoverable quote"));
      expect(mockMouseEnter).toHaveBeenCalled();
    });

    it("calls onFocus handler", () => {
      const mockFocus = vi.fn();
      render(<Blockquote onFocus={mockFocus}>Focusable quote</Blockquote>);

      fireEvent.focus(screen.getByText("Focusable quote"));
      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as different HTML element when 'as' prop is provided", () => {
      render(<Blockquote as="div">Div quote</Blockquote>);
      const element = screen.getByText("Div quote");
      expect(element.tagName).toBe("DIV");
    });

    it("maintains functionality with different elements", () => {
      render(
        <Blockquote as="section" className="custom">
          Section quote
        </Blockquote>
      );
      const element = screen.getByText("Section quote");
      expect(element.tagName).toBe("SECTION");
      expect(element).toHaveClass("blockquote", "custom");
    });

    it("adds polymorphic data attribute when rendering as different element", () => {
      render(<Blockquote as="div">Polymorphic quote</Blockquote>);
      const element = screen.getByText("Polymorphic quote");
      expect(element).toHaveAttribute("data-polymorphic-element", "div");
    });

    it("does not add polymorphic data attribute when rendering as blockquote", () => {
      render(<Blockquote>Normal quote</Blockquote>);
      const element = screen.getByText("Normal quote");
      expect(element).not.toHaveAttribute("data-polymorphic-element");
    });

    it("handles custom component", () => {
      const CustomQuote = React.forwardRef<
        HTMLElement,
        React.HTMLAttributes<HTMLElement>
      >((props, ref) => (
        <section ref={ref} {...props} data-testid="custom-quote" />
      ));
      CustomQuote.displayName = "CustomQuote";

      render(<Blockquote as={CustomQuote}>Custom quote</Blockquote>);

      expect(screen.getByTestId("custom-quote")).toBeInTheDocument();
    });
  });

  describe("Polymorphic Validation", () => {
    it("warns when using cite attribute with non-blockquote element", () => {
      render(
        <Blockquote as="div" cite="https://example.com">
          Invalid cite usage
        </Blockquote>
      );

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          "Blockquote: The following props are only valid for <blockquote> elements: cite"
        )
      );
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining("You're rendering as <div>")
      );
    });

    it("does not warn when using cite attribute with blockquote element", () => {
      render(
        <Blockquote cite="https://example.com">Valid cite usage</Blockquote>
      );

      expect(mockConsoleWarn).not.toHaveBeenCalled();
    });

    it("does not warn when no cite attribute is provided", () => {
      render(<Blockquote as="div">No cite attribute</Blockquote>);

      expect(mockConsoleWarn).not.toHaveBeenCalled();
    });

    it("does not warn in production environment", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      render(
        <Blockquote as="div" cite="https://example.com">
          Production quote
        </Blockquote>
      );

      expect(mockConsoleWarn).not.toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("Data Attributes", () => {
    it("adds validation data attribute when rendering as different element", () => {
      render(<Blockquote as="div">Validation test</Blockquote>);
      const element = screen.getByText("Validation test");
      expect(element).toHaveAttribute("data-element-validation", "warning");
    });

    it("does not add validation data attribute when rendering as blockquote", () => {
      render(<Blockquote>Validation test</Blockquote>);
      const element = screen.getByText("Validation test");
      expect(element).not.toHaveAttribute("data-element-validation");
    });

    it("maintains all data attributes", () => {
      render(
        <Blockquote
          as="div"
          cite="https://example.com"
          analyticsId="test"
          data-testid="quote-element"
        >
          All attributes
        </Blockquote>
      );

      const element = screen.getByTestId("quote-element");
      expect(element).toHaveAttribute("data-polymorphic-element", "div");
      expect(element).toHaveAttribute("data-element-validation", "warning");
      expect(element).toHaveAttribute("data-analytics-id", "test");
    });
  });

  describe("Client-side Rendering", () => {
    it("renders fallback when isClient is true", () => {
      render(<Blockquote isClient>Client quote</Blockquote>);
      expect(screen.getByText("Client quote")).toBeInTheDocument();
    });

    it("renders with memoized client component", () => {
      render(
        <Blockquote isClient isMemoized>
          Memoized quote
        </Blockquote>
      );
      expect(screen.getByText("Memoized quote")).toBeInTheDocument();
    });

    it("preserves props in client rendering", () => {
      render(
        <Blockquote
          isClient
          cite="https://example.com"
          analyticsId="client-test"
          className="client-quote"
        >
          Client cite quote
        </Blockquote>
      );

      const element = screen.getByText("Client cite quote");
      expect(element).toHaveClass("blockquote", "client-quote");
      expect(element).toHaveAttribute("cite", "https://example.com");
      expect(element).toHaveAttribute("data-analytics-id", "client-test");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      render(<Blockquote data-testid="empty-quote" />);
      const element = screen.getByTestId("empty-quote");
      expect(element).toHaveClass("blockquote");
    });

    it("handles numeric content", () => {
      render(<Blockquote>{42}</Blockquote>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles nested elements", () => {
      render(
        <Blockquote>
          Quote with <cite>citation</cite>
        </Blockquote>
      );
      expect(screen.getByText("Quote with")).toBeInTheDocument();
      expect(screen.getByText("citation")).toBeInTheDocument();
    });

    it("maintains all HTML attributes", () => {
      render(
        <Blockquote
          id="test-quote"
          data-testid="quote-element"
          aria-label="Important quote"
        >
          Attributed quote
        </Blockquote>
      );
      const element = screen.getByTestId("quote-element");
      expect(element).toHaveAttribute("id", "test-quote");
      expect(element).toHaveAttribute("aria-label", "Important quote");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLQuoteElement>();
      render(<Blockquote ref={ref}>Ref quote</Blockquote>);

      expect(ref.current).toBeInstanceOf(HTMLQuoteElement);
      expect(ref.current?.tagName).toBe("BLOCKQUOTE");
    });

    it("handles complex children types", () => {
      render(
        <Blockquote data-testid="complex-quote">
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </Blockquote>
      );

      const element = screen.getByTestId("complex-quote");
      expect(element.children).toHaveLength(2);
    });

    it("optimizes className building", () => {
      const { rerender } = render(<Blockquote>Basic</Blockquote>);

      let element = screen.getByText("Basic");
      expect(element.className).toBe("blockquote");

      rerender(<Blockquote className="custom">Enhanced</Blockquote>);
      element = screen.getByText("Enhanced");
      expect(element.className).toBe("blockquote custom");
    });

    it("handles null cite attribute", () => {
      render(<Blockquote cite={undefined}>Quote without cite</Blockquote>);
      const element = screen.getByText("Quote without cite");
      expect(element).not.toHaveAttribute("cite");
    });
  });
});
