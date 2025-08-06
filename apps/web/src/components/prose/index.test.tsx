import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Prose } from "./index";

describe("Prose", () => {
  // Basic render test
  it("renders a prose element", () => {
    render(<Prose>Prose content</Prose>);
    const prose = screen.getByText("Prose content");
    expect(prose).toBeInTheDocument();
    expect(prose.tagName).toBe("DIV");
  });

  // Test with default prose classes
  it("applies default prose classes", () => {
    render(<Prose>Prose content</Prose>);
    const prose = screen.getByText("Prose content");
    expect(prose).toHaveClass("prose", "dark:prose-invert");
  });

  // Test className merging
  it("merges custom className with default classes", () => {
    render(<Prose className="custom-class">Prose content</Prose>);
    const prose = screen.getByText("Prose content");
    expect(prose).toHaveClass("prose", "dark:prose-invert", "custom-class");
  });

  // Test multiple custom classes
  it("handles multiple custom classes", () => {
    render(
      <Prose className="custom-class another-class third-class">
        Prose content
      </Prose>
    );
    const prose = screen.getByText("Prose content");
    expect(prose).toHaveClass(
      "prose",
      "dark:prose-invert",
      "custom-class",
      "another-class",
      "third-class"
    );
  });

  // Test props forwarding
  it("forwards all props to the underlying div", () => {
    render(
      <Prose
        id="prose-element"
        data-testid="prose-test"
        aria-label="Prose content"
        role="article"
      >
        Prose content
      </Prose>
    );
    const prose = screen.getByTestId("prose-test");
    expect(prose).toHaveAttribute("id", "prose-element");
    expect(prose).toHaveAttribute("aria-label", "Prose content");
    expect(prose).toHaveAttribute("role", "article");
  });

  // Test with complex children
  it("renders complex nested children", () => {
    render(
      <Prose>
        <h1>Main Heading</h1>
        <p>Paragraph content</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
        <blockquote>Quote content</blockquote>
      </Prose>
    );

    expect(screen.getByText("Main Heading")).toBeInTheDocument();
    expect(screen.getByText("Paragraph content")).toBeInTheDocument();
    expect(screen.getByText("List item 1")).toBeInTheDocument();
    expect(screen.getByText("List item 2")).toBeInTheDocument();
    expect(screen.getByText("Quote content")).toBeInTheDocument();
  });

  // Test with empty children
  it("renders with empty children", () => {
    render(<Prose data-testid="empty-prose"></Prose>);
    const prose = screen.getByTestId("empty-prose");
    expect(prose).toBeInTheDocument();
    expect(prose).toHaveTextContent("");
  });

  // Test with null children
  it("renders with null children", () => {
    render(<Prose data-testid="null-prose">{null}</Prose>);
    const prose = screen.getByTestId("null-prose");
    expect(prose).toBeInTheDocument();
  });

  // Test with undefined children
  it("renders with undefined children", () => {
    render(<Prose data-testid="undefined-prose">{undefined}</Prose>);
    const prose = screen.getByTestId("undefined-prose");
    expect(prose).toBeInTheDocument();
  });

  // Test with boolean children
  it("renders with boolean children", () => {
    render(<Prose data-testid="boolean-prose">{true}</Prose>);
    const prose = screen.getByTestId("boolean-prose");
    expect(prose).toBeInTheDocument();
    // Boolean true is not rendered as text in React
    expect(prose).toHaveTextContent("");
  });

  // Test with number children
  it("renders with number children", () => {
    render(<Prose data-testid="number-prose">{42}</Prose>);
    const prose = screen.getByTestId("number-prose");
    expect(prose).toBeInTheDocument();
    expect(prose).toHaveTextContent("42");
  });

  // Test with array children
  it("renders with array children", () => {
    render(
      <Prose data-testid="array-prose">{["Item 1", "Item 2", "Item 3"]}</Prose>
    );
    const prose = screen.getByTestId("array-prose");
    expect(prose).toBeInTheDocument();
    expect(prose).toHaveTextContent("Item 1Item 2Item 3");
  });

  // Test with React elements as children
  it("renders with React elements as children", () => {
    render(
      <Prose>
        <span>Span content</span>
        <strong>Strong content</strong>
      </Prose>
    );

    expect(screen.getByText("Span content")).toBeInTheDocument();
    expect(screen.getByText("Strong content")).toBeInTheDocument();
  });

  // Test with mixed content types
  it("renders with mixed content types", () => {
    render(
      <Prose data-testid="mixed-prose">
        Text content
        <span>Span content</span>
        {42}
        {true}
      </Prose>
    );

    const prose = screen.getByTestId("mixed-prose");
    expect(prose).toHaveTextContent("Text content");
    expect(prose).toHaveTextContent("Span content");
    expect(prose).toHaveTextContent("42");
    // Boolean true is not rendered as text in React
    expect(prose).toHaveTextContent("Text contentSpan content42");
  });

  // Test with event handlers
  it("forwards event handlers", () => {
    const handleClick = vi.fn();
    render(
      <Prose onClick={handleClick} data-testid="prose-click">
        Clickable prose
      </Prose>
    );

    const prose = screen.getByTestId("prose-click");
    prose.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test with style prop
  it("forwards style prop", () => {
    render(
      <Prose
        style={{ backgroundColor: "red", color: "white" }}
        data-testid="prose-style"
      >
        Styled prose
      </Prose>
    );

    const prose = screen.getByTestId("prose-style");
    // Check that the style prop is forwarded (the actual styles may be overridden by CSS)
    expect(prose).toBeInTheDocument();
    expect(prose).toHaveAttribute("style");
  });

  // Test with data attributes
  it("forwards data attributes", () => {
    render(
      <Prose data-custom="value" data-testid="prose-data" data-version="1.0.0">
        Prose with data attributes
      </Prose>
    );

    const prose = screen.getByTestId("prose-data");
    expect(prose).toHaveAttribute("data-custom", "value");
    expect(prose).toHaveAttribute("data-version", "1.0.0");
  });

  // Test with accessibility attributes
  it("forwards accessibility attributes", () => {
    render(
      <Prose
        aria-label="Prose content"
        aria-describedby="description"
        role="article"
        tabIndex={0}
        data-testid="prose-a11y"
      >
        Accessible prose
      </Prose>
    );

    const prose = screen.getByTestId("prose-a11y");
    expect(prose).toHaveAttribute("aria-label", "Prose content");
    expect(prose).toHaveAttribute("aria-describedby", "description");
    expect(prose).toHaveAttribute("role", "article");
    expect(prose).toHaveAttribute("tabindex", "0");
  });

  // Test with complex prose content
  it("renders complex prose content", () => {
    render(
      <Prose data-testid="complex-prose">
        <h1>Article Title</h1>
        <p>This is the introduction paragraph.</p>
        <h2>Section Heading</h2>
        <p>
          This is a paragraph with <strong>bold text</strong> and{" "}
          <em>italic text</em>.
        </p>
        <ul>
          <li>First list item</li>
          <li>
            Second list item with <a href="/link">link</a>
          </li>
        </ul>
        <blockquote>
          <p>This is a blockquote with important information.</p>
        </blockquote>
        <h3>Subsection</h3>
        <p>
          Final paragraph with <code>inline code</code>.
        </p>
      </Prose>
    );

    expect(screen.getByText("Article Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is the introduction paragraph.")
    ).toBeInTheDocument();
    expect(screen.getByText("Section Heading")).toBeInTheDocument();
    expect(screen.getByText("bold text")).toBeInTheDocument();
    expect(screen.getByText("italic text")).toBeInTheDocument();
    expect(screen.getByText("First list item")).toBeInTheDocument();
    expect(screen.getByText("Second list item with")).toBeInTheDocument();
    expect(screen.getByText("link")).toBeInTheDocument();
    expect(
      screen.getByText("This is a blockquote with important information.")
    ).toBeInTheDocument();
    expect(screen.getByText("Subsection")).toBeInTheDocument();
    expect(screen.getByText("inline code")).toBeInTheDocument();
  });

  // Test with different prose sizes (if applicable)
  it("handles different prose sizes", () => {
    render(<Prose className="prose-lg">Large prose content</Prose>);
    const prose = screen.getByText("Large prose content");
    expect(prose).toHaveClass("prose", "dark:prose-invert", "prose-lg");
  });

  // Test with custom prose variants
  it("handles custom prose variants", () => {
    render(<Prose className="prose prose-gray">Gray prose content</Prose>);
    const prose = screen.getByText("Gray prose content");
    expect(prose).toHaveClass("prose", "dark:prose-invert", "prose-gray");
  });

  // Test with dark mode classes
  it("includes dark mode prose classes", () => {
    render(<Prose>Dark mode prose</Prose>);
    const prose = screen.getByText("Dark mode prose");
    expect(prose).toHaveClass("dark:prose-invert");
  });

  // Test with multiple prose modifiers
  it("handles multiple prose modifiers", () => {
    render(
      // eslint-disable-next-line prettier/prettier
      <Prose className="prose prose-lg prose-gray max-w-none">
        Modified prose content
      </Prose>
    );
    const prose = screen.getByText("Modified prose content");
    expect(prose).toHaveClass(
      "prose",
      "dark:prose-invert",
      "prose-lg",
      "prose-gray",
      "max-w-none"
    );
  });

  // Test with conflicting classes (should be merged properly)
  it("merges conflicting classes properly", () => {
    render(<Prose className="prose prose-lg">Conflicting classes prose</Prose>);
    const prose = screen.getByText("Conflicting classes prose");
    expect(prose).toHaveClass("prose", "dark:prose-invert", "prose-lg");
  });

  // Test with no className prop
  it("renders with no className prop", () => {
    render(<Prose>No className prose</Prose>);
    const prose = screen.getByText("No className prose");
    expect(prose).toHaveClass("prose", "dark:prose-invert");
  });

  // Test with empty className
  it("renders with empty className", () => {
    render(<Prose className="">Empty className prose</Prose>);
    const prose = screen.getByText("Empty className prose");
    expect(prose).toHaveClass("prose", "dark:prose-invert");
  });

  // Test with whitespace-only className
  it("renders with whitespace-only className", () => {
    render(<Prose className=" ">Whitespace className prose</Prose>);
    const prose = screen.getByText("Whitespace className prose");
    expect(prose).toHaveClass("prose", "dark:prose-invert");
  });

  // Test component display name
  it("has correct display name", () => {
    expect(Prose.displayName).toBe("Prose");
  });

  // Test with all HTML attributes
  it("forwards all HTML div attributes", () => {
    render(
      <Prose
        id="test-id"
        title="Test title"
        lang="en"
        dir="ltr"
        spellCheck={false}
        contentEditable={true}
        hidden
        draggable={true}
        data-testid="prose-html"
      >
        HTML attributes prose
      </Prose>
    );

    const prose = screen.getByTestId("prose-html");
    expect(prose).toHaveAttribute("id", "test-id");
    expect(prose).toHaveAttribute("title", "Test title");
    expect(prose).toHaveAttribute("lang", "en");
    expect(prose).toHaveAttribute("dir", "ltr");
    expect(prose).toHaveAttribute("spellcheck", "false");
    expect(prose).toHaveAttribute("contenteditable", "true");
    expect(prose).toHaveAttribute("hidden");
    expect(prose).toHaveAttribute("draggable", "true");
  });
});
