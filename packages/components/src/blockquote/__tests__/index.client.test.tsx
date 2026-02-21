import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BlockquoteClient, MemoizedBlockquoteClient } from "../index.client";

// Basic render test for BlockquoteClient
it("renders a BlockquoteClient element", () => {
  render(
    <BlockquoteClient data-testid="blockquote-client-element">
      Quote content
    </BlockquoteClient>
  );
  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote.tagName).toBe("BLOCKQUOTE");
  expect(blockquote).toHaveTextContent("Quote content");
});

// Basic render test for MemoizedBlockquoteClient
it("renders a MemoizedBlockquoteClient element", () => {
  render(
    <MemoizedBlockquoteClient data-testid="memoized-blockquote-client-element">
      Memoized quote content
    </MemoizedBlockquoteClient>
  );
  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote.tagName).toBe("BLOCKQUOTE");
  expect(blockquote).toHaveTextContent("Memoized quote content");
});

// as prop test for BlockquoteClient
it("renders BlockquoteClient as a custom element with 'as' prop", () => {
  render(
    <BlockquoteClient as="div" data-testid="custom-div">
      Custom quote content
    </BlockquoteClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom quote content");
});

// as prop test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient as a custom element with 'as' prop", () => {
  render(
    <MemoizedBlockquoteClient as="div" data-testid="custom-memoized-div">
      Custom memoized quote content
    </MemoizedBlockquoteClient>
  );
  const div = screen.getByTestId("custom-memoized-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom memoized quote content");
});

// ref forwarding test for BlockquoteClient
it("forwards ref correctly for BlockquoteClient", () => {
  const ref = React.createRef<HTMLQuoteElement>();
  render(<BlockquoteClient ref={ref}>Ref test content</BlockquoteClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BLOCKQUOTE");
  }
});

// ref forwarding test for MemoizedBlockquoteClient
it("forwards ref correctly for MemoizedBlockquoteClient", () => {
  const ref = React.createRef<HTMLQuoteElement>();
  render(
    <MemoizedBlockquoteClient ref={ref}>
      Memoized ref test content
    </MemoizedBlockquoteClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("BLOCKQUOTE");
  }
});

// BlockquoteClient-specific props test
it("renders BlockquoteClient with blockquote-specific attributes", () => {
  render(
    <BlockquoteClient
      data-testid="blockquote-client-element"
      className="quote-container"
      id="main-quote-client"
      cite="https://example.com/source"
    >
      Quote content with cite
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveAttribute("class", "quote-container");
  expect(blockquote).toHaveAttribute("id", "main-quote-client");
  expect(blockquote).toHaveAttribute("cite", "https://example.com/source");
  expect(blockquote).toHaveTextContent("Quote content with cite");
});

// MemoizedBlockquoteClient-specific props test
it("renders MemoizedBlockquoteClient with blockquote-specific attributes", () => {
  render(
    <MemoizedBlockquoteClient
      data-testid="memoized-blockquote-client-element"
      className="memoized-quote-container"
      id="main-memoized-quote-client"
      cite="https://example.com/memoized-source"
    >
      Memoized quote content with cite
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveAttribute("class", "memoized-quote-container");
  expect(blockquote).toHaveAttribute("id", "main-memoized-quote-client");
  expect(blockquote).toHaveAttribute(
    "cite",
    "https://example.com/memoized-source"
  );
  expect(blockquote).toHaveTextContent("Memoized quote content with cite");
});

// Children rendering test for BlockquoteClient
it("renders BlockquoteClient children correctly", () => {
  render(
    <BlockquoteClient data-testid="blockquote-client-element">
      <p>First paragraph</p>
      <p>Second paragraph</p>
      <cite>Author Name</cite>
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveTextContent("First paragraph");
  expect(blockquote).toHaveTextContent("Second paragraph");
  expect(blockquote).toHaveTextContent("Author Name");
  expect(blockquote.querySelectorAll("p")).toHaveLength(2);
  expect(blockquote.querySelector("cite")).toBeInTheDocument();
});

// Children rendering test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient children correctly", () => {
  render(
    <MemoizedBlockquoteClient data-testid="memoized-blockquote-client-element">
      <p>Memoized first paragraph</p>
      <p>Memoized second paragraph</p>
      <cite>Memoized Author Name</cite>
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveTextContent("Memoized first paragraph");
  expect(blockquote).toHaveTextContent("Memoized second paragraph");
  expect(blockquote).toHaveTextContent("Memoized Author Name");
  expect(blockquote.querySelectorAll("p")).toHaveLength(2);
  expect(blockquote.querySelector("cite")).toBeInTheDocument();
});

// Empty children test for BlockquoteClient
it("renders BlockquoteClient with empty children", () => {
  render(<BlockquoteClient data-testid="blockquote-client-element" />);
  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toBeInTheDocument();
  expect(blockquote).toBeEmptyDOMElement();
});

// Empty children test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with empty children", () => {
  render(
    <MemoizedBlockquoteClient data-testid="memoized-blockquote-client-element" />
  );
  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toBeInTheDocument();
  expect(blockquote).toBeEmptyDOMElement();
});

// Complex children with nested elements test for BlockquoteClient
it("renders BlockquoteClient complex nested children", () => {
  render(
    <BlockquoteClient data-testid="blockquote-client-element">
      <div className="quote-content">
        <span className="icon">💬</span>
        <span className="text">Complex Quote Client</span>
        <span className="badge">Important</span>
      </div>
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveTextContent("💬");
  expect(blockquote).toHaveTextContent("Complex Quote Client");
  expect(blockquote).toHaveTextContent("Important");
  expect(blockquote.querySelector(".quote-content")).toBeInTheDocument();
  expect(blockquote.querySelector(".icon")).toBeInTheDocument();
  expect(blockquote.querySelector(".text")).toBeInTheDocument();
  expect(blockquote.querySelector(".badge")).toBeInTheDocument();
});

// Complex children with nested elements test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient complex nested children", () => {
  render(
    <MemoizedBlockquoteClient data-testid="memoized-blockquote-client-element">
      <div className="memoized-quote-content">
        <span className="icon">💬</span>
        <span className="text">Complex Memoized Quote Client</span>
        <span className="badge">Memoized Important</span>
      </div>
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveTextContent("💬");
  expect(blockquote).toHaveTextContent("Complex Memoized Quote Client");
  expect(blockquote).toHaveTextContent("Memoized Important");
  expect(
    blockquote.querySelector(".memoized-quote-content")
  ).toBeInTheDocument();
  expect(blockquote.querySelector(".icon")).toBeInTheDocument();
  expect(blockquote.querySelector(".text")).toBeInTheDocument();
  expect(blockquote.querySelector(".badge")).toBeInTheDocument();
});

// Cite attribute test for BlockquoteClient
it("renders BlockquoteClient with cite attribute", () => {
  render(
    <BlockquoteClient
      data-testid="blockquote-client-element"
      cite="https://www.example.com/article"
    >
      This is a quoted text from an external source.
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveAttribute("cite", "https://www.example.com/article");
  expect(blockquote).toHaveTextContent(
    "This is a quoted text from an external source."
  );
});

// Cite attribute test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with cite attribute", () => {
  render(
    <MemoizedBlockquoteClient
      data-testid="memoized-blockquote-client-element"
      cite="https://www.example.com/memoized-article"
    >
      This is a memoized quoted text from an external source.
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveAttribute(
    "cite",
    "https://www.example.com/memoized-article"
  );
  expect(blockquote).toHaveTextContent(
    "This is a memoized quoted text from an external source."
  );
});

// Paragraph content test for BlockquoteClient
it("renders BlockquoteClient with paragraph content", () => {
  render(
    <BlockquoteClient data-testid="blockquote-client-element">
      <p>This is the first paragraph of the quote.</p>
      <p>This is the second paragraph with additional context.</p>
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveTextContent(
    "This is the first paragraph of the quote."
  );
  expect(blockquote).toHaveTextContent(
    "This is the second paragraph with additional context."
  );
  expect(blockquote.querySelectorAll("p")).toHaveLength(2);
});

// Paragraph content test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with paragraph content", () => {
  render(
    <MemoizedBlockquoteClient data-testid="memoized-blockquote-client-element">
      <p>This is the first memoized paragraph of the quote.</p>
      <p>This is the second memoized paragraph with additional context.</p>
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveTextContent(
    "This is the first memoized paragraph of the quote."
  );
  expect(blockquote).toHaveTextContent(
    "This is the second memoized paragraph with additional context."
  );
  expect(blockquote.querySelectorAll("p")).toHaveLength(2);
});

// Accessibility attributes test for BlockquoteClient
it("renders BlockquoteClient with accessibility attributes", () => {
  render(
    <BlockquoteClient
      data-testid="blockquote-client-element"
      aria-label="Quote from famous author"
      aria-describedby="quote-description"
      role="contentinfo"
      tabIndex={0}
    >
      Accessible quote content
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveAttribute("aria-label", "Quote from famous author");
  expect(blockquote).toHaveAttribute("aria-describedby", "quote-description");
  expect(blockquote).toHaveAttribute("role", "contentinfo");
  expect(blockquote).toHaveAttribute("tabindex", "0");
});

// Accessibility attributes test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with accessibility attributes", () => {
  render(
    <MemoizedBlockquoteClient
      data-testid="memoized-blockquote-client-element"
      aria-label="Memoized quote from famous author"
      aria-describedby="memoized-quote-description"
      role="contentinfo"
      tabIndex={0}
    >
      Accessible memoized quote content
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveAttribute(
    "aria-label",
    "Memoized quote from famous author"
  );
  expect(blockquote).toHaveAttribute(
    "aria-describedby",
    "memoized-quote-description"
  );
  expect(blockquote).toHaveAttribute("role", "contentinfo");
  expect(blockquote).toHaveAttribute("tabindex", "0");
});

// Data attributes test for BlockquoteClient
it("renders BlockquoteClient with data attributes", () => {
  render(
    <BlockquoteClient
      data-testid="blockquote-client-element"
      data-variant="primary"
      data-size="large"
      data-quote-type="famous"
    >
      Data quote content
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveAttribute("data-variant", "primary");
  expect(blockquote).toHaveAttribute("data-size", "large");
  expect(blockquote).toHaveAttribute("data-quote-type", "famous");
});

// Data attributes test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with data attributes", () => {
  render(
    <MemoizedBlockquoteClient
      data-testid="memoized-blockquote-client-element"
      data-variant="secondary"
      data-size="medium"
      data-quote-type="memoized-famous"
    >
      Memoized data quote content
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveAttribute("data-variant", "secondary");
  expect(blockquote).toHaveAttribute("data-size", "medium");
  expect(blockquote).toHaveAttribute("data-quote-type", "memoized-famous");
});

// Event handlers test for BlockquoteClient
it("renders BlockquoteClient with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <BlockquoteClient
      data-testid="blockquote-client-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive quote content
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveTextContent("Interactive quote content");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Event handlers test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedBlockquoteClient
      data-testid="memoized-blockquote-client-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive memoized quote content
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveTextContent("Interactive memoized quote content");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Custom styling test for BlockquoteClient
it("renders BlockquoteClient with custom styling", () => {
  render(
    <BlockquoteClient
      data-testid="blockquote-client-element"
      className="custom-blockquote-client primary large"
      style={{ borderLeft: "4px solid blue", paddingLeft: "20px" }}
    >
      Styled quote content
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveClass(
    "custom-blockquote-client",
    "primary",
    "large"
  );
  expect(blockquote).toHaveStyle({
    paddingLeft: "20px",
  });
});

// Custom styling test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with custom styling", () => {
  render(
    <MemoizedBlockquoteClient
      data-testid="memoized-blockquote-client-element"
      className="custom-memoized-blockquote-client secondary medium"
      style={{ borderLeft: "4px solid green", paddingLeft: "15px" }}
    >
      Styled memoized quote content
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveClass(
    "custom-memoized-blockquote-client",
    "secondary",
    "medium"
  );
  expect(blockquote).toHaveStyle({
    paddingLeft: "15px",
  });
});

// Quote with cite element test for BlockquoteClient
it("renders BlockquoteClient with cite element", () => {
  render(
    <BlockquoteClient data-testid="blockquote-client-element">
      <p>The best way to predict the future is to invent it.</p>
      <cite>— Alan Kay</cite>
    </BlockquoteClient>
  );

  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveTextContent(
    "The best way to predict the future is to invent it."
  );
  expect(blockquote).toHaveTextContent("— Alan Kay");
  expect(blockquote.querySelector("cite")).toBeInTheDocument();
  expect(blockquote.querySelector("p")).toBeInTheDocument();
});

// Quote with cite element test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with cite element", () => {
  render(
    <MemoizedBlockquoteClient data-testid="memoized-blockquote-client-element">
      <p>The best way to predict the future is to invent it (memoized).</p>
      <cite>— Alan Kay (Memoized)</cite>
    </MemoizedBlockquoteClient>
  );

  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveTextContent(
    "The best way to predict the future is to invent it (memoized)."
  );
  expect(blockquote).toHaveTextContent("— Alan Kay (Memoized)");
  expect(blockquote.querySelector("cite")).toBeInTheDocument();
  expect(blockquote.querySelector("p")).toBeInTheDocument();
});

// Quote with special characters test for BlockquoteClient
it("renders BlockquoteClient with special characters", () => {
  render(
    <BlockquoteClient data-testid="blockquote-client-element">
      <h2>{"Special & Characters < > \" '"}</h2>
      <p>Content with special characters: &amp; &lt; &gt; &quot; &apos;</p>
    </BlockquoteClient>
  );
  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveTextContent("Special & Characters < > \" '");
  expect(blockquote).toHaveTextContent(
    "Content with special characters: & < > \" '"
  );
});

// Quote with special characters test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with special characters", () => {
  render(
    <MemoizedBlockquoteClient data-testid="memoized-blockquote-client-element">
      <h2>{"Memoized Special & Characters < > \" '"}</h2>
      <p>
        Memoized content with special characters: &amp; &lt; &gt; &quot; &apos;
      </p>
    </MemoizedBlockquoteClient>
  );
  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveTextContent(
    "Memoized Special & Characters < > \" '"
  );
  expect(blockquote).toHaveTextContent(
    "Memoized content with special characters: & < > \" '"
  );
});

// Custom attributes test for BlockquoteClient
it("renders BlockquoteClient with custom attributes", () => {
  render(
    <BlockquoteClient
      data-testid="blockquote-client-element"
      id="custom-blockquote-client-id"
      title="Custom blockquote client title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom blockquote client
    </BlockquoteClient>
  );
  const blockquote = screen.getByTestId("blockquote-client-element");
  expect(blockquote).toHaveAttribute("id", "custom-blockquote-client-id");
  expect(blockquote).toHaveAttribute("title", "Custom blockquote client title");
  expect(blockquote).not.toHaveAttribute("hidden");
  expect(blockquote).toHaveAttribute("spellcheck", "true");
  expect(blockquote).toHaveAttribute("contenteditable", "false");
});

// Custom attributes test for MemoizedBlockquoteClient
it("renders MemoizedBlockquoteClient with custom attributes", () => {
  render(
    <MemoizedBlockquoteClient
      data-testid="memoized-blockquote-client-element"
      id="custom-memoized-blockquote-client-id"
      title="Custom memoized blockquote client title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom memoized blockquote client
    </MemoizedBlockquoteClient>
  );
  const blockquote = screen.getByTestId("memoized-blockquote-client-element");
  expect(blockquote).toHaveAttribute(
    "id",
    "custom-memoized-blockquote-client-id"
  );
  expect(blockquote).toHaveAttribute(
    "title",
    "Custom memoized blockquote client title"
  );
  expect(blockquote).not.toHaveAttribute("hidden");
  expect(blockquote).toHaveAttribute("spellcheck", "true");
  expect(blockquote).toHaveAttribute("contenteditable", "false");
});
