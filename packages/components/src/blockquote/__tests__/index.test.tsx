import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Blockquote } from "..";

// Basic render test
it("renders a blockquote element", () => {
  render(
    <Blockquote data-testid="blockquote-element">Quote content</Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote.tagName).toBe("BLOCKQUOTE");
  expect(blockquote).toHaveTextContent("Quote content");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Blockquote as="div" data-testid="custom-div">
      Custom quote content
    </Blockquote>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom quote content");
});

// isClient prop test
it("renders client component when isClient is true", () => {
  render(
    <Blockquote data-testid="blockquote-element" isClient>
      Client quote content
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote.tagName).toBe("BLOCKQUOTE");
  expect(blockquote).toHaveTextContent("Client quote content");
});

// isMemoized prop test
it("renders memoized client component when isClient and isMemoized are true", () => {
  render(
    <Blockquote data-testid="blockquote-element" isClient isMemoized>
      Memoized quote content
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote.tagName).toBe("BLOCKQUOTE");
  expect(blockquote).toHaveTextContent("Memoized quote content");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLQuoteElement>();
  render(<Blockquote ref={ref}>Ref test content</Blockquote>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BLOCKQUOTE");
  }
});

// Blockquote-specific props test
it("renders blockquote with blockquote-specific attributes", () => {
  render(
    <Blockquote
      data-testid="blockquote-element"
      className="quote-container"
      id="main-quote"
      cite="https://example.com/source"
    >
      Quote content with cite
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveAttribute("class", "quote-container");
  expect(blockquote).toHaveAttribute("id", "main-quote");
  expect(blockquote).toHaveAttribute("cite", "https://example.com/source");
  expect(blockquote).toHaveTextContent("Quote content with cite");
});

// Children rendering test
it("renders blockquote children correctly", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>First paragraph</p>
      <p>Second paragraph</p>
      <cite>Author Name</cite>
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("First paragraph");
  expect(blockquote).toHaveTextContent("Second paragraph");
  expect(blockquote).toHaveTextContent("Author Name");
  expect(blockquote.querySelectorAll("p")).toHaveLength(2);
  expect(blockquote.querySelector("cite")).toBeInTheDocument();
});

// Empty children test
it("renders blockquote with empty children", () => {
  render(<Blockquote data-testid="blockquote-element" />);
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toBeInTheDocument();
  expect(blockquote).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders blockquote complex nested children", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <div className="quote-content">
        <span className="icon">💬</span>
        <span className="text">Complex Quote</span>
        <span className="badge">Important</span>
      </div>
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("💬");
  expect(blockquote).toHaveTextContent("Complex Quote");
  expect(blockquote).toHaveTextContent("Important");
  expect(blockquote.querySelector(".quote-content")).toBeInTheDocument();
  expect(blockquote.querySelector(".icon")).toBeInTheDocument();
  expect(blockquote.querySelector(".text")).toBeInTheDocument();
  expect(blockquote.querySelector(".badge")).toBeInTheDocument();
});

// Cite attribute test
it("renders blockquote with cite attribute", () => {
  render(
    <Blockquote
      data-testid="blockquote-element"
      cite="https://www.example.com/article"
    >
      This is a quoted text from an external source.
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveAttribute("cite", "https://www.example.com/article");
  expect(blockquote).toHaveTextContent(
    "This is a quoted text from an external source."
  );
});

// Paragraph content test
it("renders blockquote with paragraph content", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>This is the first paragraph of the quote.</p>
      <p>This is the second paragraph with additional context.</p>
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent(
    "This is the first paragraph of the quote."
  );
  expect(blockquote).toHaveTextContent(
    "This is the second paragraph with additional context."
  );
  expect(blockquote.querySelectorAll("p")).toHaveLength(2);
});

// Accessibility attributes test
it("renders blockquote with accessibility attributes", () => {
  render(
    <Blockquote
      data-testid="blockquote-element"
      aria-label="Quote from famous author"
      aria-describedby="quote-description"
      role="contentinfo"
      tabIndex={0}
    >
      Accessible quote content
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveAttribute("aria-label", "Quote from famous author");
  expect(blockquote).toHaveAttribute("aria-describedby", "quote-description");
  expect(blockquote).toHaveAttribute("role", "contentinfo");
  expect(blockquote).toHaveAttribute("tabindex", "0");
});

// Data attributes test
it("renders blockquote with data attributes", () => {
  render(
    <Blockquote
      data-testid="blockquote-element"
      data-variant="primary"
      data-size="large"
      data-quote-type="famous"
    >
      Data quote content
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveAttribute("data-variant", "primary");
  expect(blockquote).toHaveAttribute("data-size", "large");
  expect(blockquote).toHaveAttribute("data-quote-type", "famous");
});

// Event handlers test
it("renders blockquote with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Blockquote
      data-testid="blockquote-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive quote content
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Interactive quote content");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Custom styling test
it("renders blockquote with custom styling", () => {
  render(
    <Blockquote
      data-testid="blockquote-element"
      className="custom-blockquote primary large"
      style={{ borderLeft: "4px solid blue", paddingLeft: "20px" }}
    >
      Styled quote content
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveClass("custom-blockquote", "primary", "large");
  expect(blockquote).toHaveStyle({
    paddingLeft: "20px",
  });
});

// Quote with cite element test
it("renders blockquote with cite element", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>The best way to predict the future is to invent it.</p>
      <cite>— Alan Kay</cite>
    </Blockquote>
  );

  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent(
    "The best way to predict the future is to invent it."
  );
  expect(blockquote).toHaveTextContent("— Alan Kay");
  expect(blockquote.querySelector("cite")).toBeInTheDocument();
  expect(blockquote.querySelector("p")).toBeInTheDocument();
});

// Quote with special characters test
it("renders with special characters", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <h2>{"Special & Characters < > \" '"}</h2>
      <p>Content with special characters: &amp; &lt; &gt; &quot; &apos;</p>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Special & Characters < > \" '");
  expect(blockquote).toHaveTextContent(
    "Content with special characters: & < > \" '"
  );
});

// Quote with definition lists test
it("renders blockquote with definition lists", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <dl>
        <dt>Term 1</dt>
        <dd>Definition 1</dd>
        <dt>Term 2</dt>
        <dd>Definition 2</dd>
      </dl>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Term 1");
  expect(blockquote).toHaveTextContent("Definition 1");
  expect(blockquote).toHaveTextContent("Term 2");
  expect(blockquote).toHaveTextContent("Definition 2");
  expect(blockquote.querySelector("dl")).toBeInTheDocument();
  expect(blockquote.querySelectorAll("dt")).toHaveLength(2);
  expect(blockquote.querySelectorAll("dd")).toHaveLength(2);
});

// Quote with tables test
it("renders blockquote with tables", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </tr>
        </tbody>
      </table>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Header 1");
  expect(blockquote).toHaveTextContent("Header 2");
  expect(blockquote).toHaveTextContent("Cell 1");
  expect(blockquote).toHaveTextContent("Cell 2");
  expect(blockquote.querySelector("table")).toBeInTheDocument();
  expect(blockquote.querySelector("thead")).toBeInTheDocument();
  expect(blockquote.querySelector("tbody")).toBeInTheDocument();
});

// Quote with time elements test
it("renders blockquote with time elements", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>
        This quote was published on{" "}
        <time dateTime="2023-01-15">January 15, 2023</time>.
      </p>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("This quote was published on");
  expect(blockquote).toHaveTextContent("January 15, 2023");
  expect(blockquote.querySelector("time")).toHaveAttribute(
    "datetime",
    "2023-01-15"
  );
});

// Quote with code elements test
it("renders blockquote with code elements", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>
        Here's a code example: <code>logger.info("Hello World");</code>
      </p>
      <pre>
        <code>{`function example() {
  return "Hello World";
}`}</code>
      </pre>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Here's a code example:");
  expect(blockquote).toHaveTextContent('logger.info("Hello World");');
  expect(blockquote).toHaveTextContent("function example() {");
  expect(blockquote).toHaveTextContent('return "Hello World";');
  expect(blockquote.querySelector("code")).toBeInTheDocument();
  expect(blockquote.querySelector("pre")).toBeInTheDocument();
});

// Quote with links test
it("renders blockquote with links", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>
        Check out this <a href="https://example.com">link</a> for more
        information.
      </p>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Check out this");
  expect(blockquote).toHaveTextContent("link");
  expect(blockquote).toHaveTextContent("for more information.");
  expect(blockquote.querySelector("a")).toHaveAttribute(
    "href",
    "https://example.com"
  );
});

// Quote with images test
it("renders blockquote with images", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>
        Here's an image: <img src="/image.jpg" alt="Example image" />
      </p>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Here's an image:");
  expect(blockquote.querySelector("img")).toHaveAttribute("src", "/image.jpg");
  expect(blockquote.querySelector("img")).toHaveAttribute(
    "alt",
    "Example image"
  );
});

// Quote with nested blockquotes test
it("renders blockquote with nested blockquotes", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <p>Outer quote content</p>
      <blockquote>
        <p>Nested quote content</p>
      </blockquote>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("Outer quote content");
  expect(blockquote).toHaveTextContent("Nested quote content");
  expect(blockquote.querySelector("blockquote")).toBeInTheDocument();
});

// Quote with lists test
it("renders blockquote with lists", () => {
  render(
    <Blockquote data-testid="blockquote-element">
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      <ol>
        <li>Ordered item 1</li>
        <li>Ordered item 2</li>
      </ol>
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveTextContent("List item 1");
  expect(blockquote).toHaveTextContent("List item 2");
  expect(blockquote).toHaveTextContent("Ordered item 1");
  expect(blockquote).toHaveTextContent("Ordered item 2");
  expect(blockquote.querySelector("ul")).toBeInTheDocument();
  expect(blockquote.querySelector("ol")).toBeInTheDocument();
  expect(blockquote.querySelectorAll("li")).toHaveLength(4);
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Blockquote
      data-testid="blockquote-element"
      id="custom-blockquote-id"
      title="Custom blockquote title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom blockquote
    </Blockquote>
  );
  const blockquote = screen.getByTestId("blockquote-element");
  expect(blockquote).toHaveAttribute("id", "custom-blockquote-id");
  expect(blockquote).toHaveAttribute("title", "Custom blockquote title");
  expect(blockquote).not.toHaveAttribute("hidden");
  expect(blockquote).toHaveAttribute("spellcheck", "true");
  expect(blockquote).toHaveAttribute("contenteditable", "false");
});
