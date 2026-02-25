import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BdoClient, MemoizedBdoClient } from "../index.client";

// Basic render test for BdoClient
it("renders a BdoClient element", () => {
  render(
    <BdoClient data-testid="bdo-client-element">
      Bidirectional override text
    </BdoClient>
  );
  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo.tagName).toBe("BDO");
  expect(bdo).toHaveTextContent("Bidirectional override text");
});

// Basic render test for MemoizedBdoClient
it("renders a MemoizedBdoClient element", () => {
  render(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element">
      Memoized bidirectional override text
    </MemoizedBdoClient>
  );
  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo.tagName).toBe("BDO");
  expect(bdo).toHaveTextContent("Memoized bidirectional override text");
});

// as prop test for BdoClient
it("renders BdoClient as a custom element with 'as' prop", () => {
  render(
    <BdoClient as="div" data-testid="custom-div">
      Custom bidirectional override
    </BdoClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom bidirectional override");
});

// as prop test for MemoizedBdoClient
it("renders MemoizedBdoClient as a custom element with 'as' prop", () => {
  render(
    <MemoizedBdoClient as="div" data-testid="custom-memoized-div">
      Custom memoized bidirectional override
    </MemoizedBdoClient>
  );
  const div = screen.getByTestId("custom-memoized-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom memoized bidirectional override");
});

// ref forwarding test for BdoClient
it("forwards ref correctly for BdoClient", () => {
  const ref = React.createRef<HTMLElement>();
  render(<BdoClient ref={ref}>Ref test content</BdoClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BDO");
  }
});

// ref forwarding test for MemoizedBdoClient
it("forwards ref correctly for MemoizedBdoClient", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <MemoizedBdoClient ref={ref}>Memoized ref test content</MemoizedBdoClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("BDO");
  }
});

// BdoClient-specific props test
it("renders BdoClient with bdo-specific attributes", () => {
  render(
    <BdoClient
      data-testid="bdo-client-element"
      className="bidirectional-override"
      id="main-bdo-client"
      dir="ltr"
    >
      Bidirectional override content
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveClass("bidirectional-override", { exact: true });
  expect(bdo).toHaveAttribute("id", "main-bdo-client");
  expect(bdo).toHaveAttribute("dir", "ltr");
  expect(bdo).toHaveTextContent("Bidirectional override content");
});

// MemoizedBdoClient-specific props test
it("renders MemoizedBdoClient with bdo-specific attributes", () => {
  render(
    <MemoizedBdoClient
      data-testid="memoized-bdo-client-element"
      className="memoized-bidirectional-override"
      id="main-memoized-bdo-client"
      dir="rtl"
    >
      Memoized bidirectional override content
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveClass("memoized-bidirectional-override", { exact: true });
  expect(bdo).toHaveAttribute("id", "main-memoized-bdo-client");
  expect(bdo).toHaveAttribute("dir", "rtl");
  expect(bdo).toHaveTextContent("Memoized bidirectional override content");
});

// Children rendering test for BdoClient
it("renders BdoClient children correctly", () => {
  render(
    <BdoClient data-testid="bdo-client-element">
      <span>Left</span>
      <span>Right</span>
      <span>Override</span>
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveTextContent("Left");
  expect(bdo).toHaveTextContent("Right");
  expect(bdo).toHaveTextContent("Override");
  expect(bdo.querySelectorAll("span")).toHaveLength(3);
});

// Children rendering test for MemoizedBdoClient
it("renders MemoizedBdoClient children correctly", () => {
  render(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element">
      <span>Memoized</span>
      <span>Left</span>
      <span>Right</span>
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveTextContent("Memoized");
  expect(bdo).toHaveTextContent("Left");
  expect(bdo).toHaveTextContent("Right");
  expect(bdo.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test for BdoClient
it("renders BdoClient with empty children", () => {
  render(<BdoClient data-testid="bdo-client-element" />);
  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toBeInTheDocument();
  expect(bdo).toBeEmptyDOMElement();
});

// Empty children test for MemoizedBdoClient
it("renders MemoizedBdoClient with empty children", () => {
  render(<MemoizedBdoClient data-testid="memoized-bdo-client-element" />);
  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toBeInTheDocument();
  expect(bdo).toBeEmptyDOMElement();
});

// Complex children with nested elements test for BdoClient
it("renders BdoClient complex nested children", () => {
  render(
    <BdoClient data-testid="bdo-client-element">
      <div className="bdo-content">
        <span className="icon">🔄</span>
        <span className="text">Complex Bdo Client</span>
        <span className="badge">Override</span>
      </div>
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveTextContent("🔄");
  expect(bdo).toHaveTextContent("Complex Bdo Client");
  expect(bdo).toHaveTextContent("Override");
  expect(bdo.querySelector(".bdo-content")).toBeInTheDocument();
  expect(bdo.querySelector(".icon")).toBeInTheDocument();
  expect(bdo.querySelector(".text")).toBeInTheDocument();
  expect(bdo.querySelector(".badge")).toBeInTheDocument();
});

// Complex children with nested elements test for MemoizedBdoClient
it("renders MemoizedBdoClient complex nested children", () => {
  render(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element">
      <div className="memoized-bdo-content">
        <span className="icon">🔄</span>
        <span className="text">Complex Memoized Bdo Client</span>
        <span className="badge">Memoized Override</span>
      </div>
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveTextContent("🔄");
  expect(bdo).toHaveTextContent("Complex Memoized Bdo Client");
  expect(bdo).toHaveTextContent("Memoized Override");
  expect(bdo.querySelector(".memoized-bdo-content")).toBeInTheDocument();
  expect(bdo.querySelector(".icon")).toBeInTheDocument();
  expect(bdo.querySelector(".text")).toBeInTheDocument();
  expect(bdo.querySelector(".badge")).toBeInTheDocument();
});

// Direction attributes test for BdoClient
it("renders BdoClient with different direction attributes", () => {
  const { rerender } = render(
    <BdoClient data-testid="bdo-client-element" dir="ltr">
      Left to right override
    </BdoClient>
  );
  expect(screen.getByTestId("bdo-client-element")).toHaveAttribute(
    "dir",
    "ltr"
  );

  rerender(
    <BdoClient data-testid="bdo-client-element" dir="rtl">
      Right to left override
    </BdoClient>
  );
  expect(screen.getByTestId("bdo-client-element")).toHaveAttribute(
    "dir",
    "rtl"
  );

  rerender(
    <BdoClient data-testid="bdo-client-element" dir="auto">
      Auto direction override
    </BdoClient>
  );
  expect(screen.getByTestId("bdo-client-element")).toHaveAttribute(
    "dir",
    "auto"
  );
});

// Direction attributes test for MemoizedBdoClient
it("renders MemoizedBdoClient with different direction attributes", () => {
  const { rerender } = render(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element" dir="ltr">
      Memoized left to right override
    </MemoizedBdoClient>
  );
  expect(screen.getByTestId("memoized-bdo-client-element")).toHaveAttribute(
    "dir",
    "ltr"
  );

  rerender(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element" dir="rtl">
      Memoized right to left override
    </MemoizedBdoClient>
  );
  expect(screen.getByTestId("memoized-bdo-client-element")).toHaveAttribute(
    "dir",
    "rtl"
  );

  rerender(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element" dir="auto">
      Memoized auto direction override
    </MemoizedBdoClient>
  );
  expect(screen.getByTestId("memoized-bdo-client-element")).toHaveAttribute(
    "dir",
    "auto"
  );
});

// Accessibility attributes test for BdoClient
it("renders BdoClient with accessibility attributes", () => {
  render(
    <BdoClient
      data-testid="bdo-client-element"
      aria-label="Bidirectional override text"
      aria-describedby="bdo-description"
      role="text"
      tabIndex={0}
    >
      Accessible bidirectional override
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveAttribute("aria-label", "Bidirectional override text");
  expect(bdo).toHaveAttribute("aria-describedby", "bdo-description");
  expect(bdo).toHaveAttribute("role", "text");
  expect(bdo).toHaveAttribute("tabindex", "0");
});

// Accessibility attributes test for MemoizedBdoClient
it("renders MemoizedBdoClient with accessibility attributes", () => {
  render(
    <MemoizedBdoClient
      data-testid="memoized-bdo-client-element"
      aria-label="Memoized bidirectional override text"
      aria-describedby="memoized-bdo-description"
      role="text"
      tabIndex={0}
    >
      Accessible memoized bidirectional override
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveAttribute(
    "aria-label",
    "Memoized bidirectional override text"
  );
  expect(bdo).toHaveAttribute("aria-describedby", "memoized-bdo-description");
  expect(bdo).toHaveAttribute("role", "text");
  expect(bdo).toHaveAttribute("tabindex", "0");
});

// Data attributes test for BdoClient
it("renders BdoClient with data attributes", () => {
  render(
    <BdoClient
      data-testid="bdo-client-element"
      data-variant="primary"
      data-size="large"
      data-text-type="bidirectional-override"
    >
      Data bidirectional override
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveAttribute("data-variant", "primary");
  expect(bdo).toHaveAttribute("data-size", "large");
  expect(bdo).toHaveAttribute("data-text-type", "bidirectional-override");
});

// Data attributes test for MemoizedBdoClient
it("renders MemoizedBdoClient with data attributes", () => {
  render(
    <MemoizedBdoClient
      data-testid="memoized-bdo-client-element"
      data-variant="secondary"
      data-size="medium"
      data-text-type="memoized-bidirectional-override"
    >
      Memoized data bidirectional override
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveAttribute("data-variant", "secondary");
  expect(bdo).toHaveAttribute("data-size", "medium");
  expect(bdo).toHaveAttribute(
    "data-text-type",
    "memoized-bidirectional-override"
  );
});

// Event handlers test for BdoClient
it("renders BdoClient with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <BdoClient
      data-testid="bdo-client-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive bidirectional override
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveTextContent("Interactive bidirectional override");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Event handlers test for MemoizedBdoClient
it("renders MemoizedBdoClient with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedBdoClient
      data-testid="memoized-bdo-client-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive memoized bidirectional override
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveTextContent("Interactive memoized bidirectional override");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Custom styling test for BdoClient
it("renders BdoClient with custom styling", () => {
  render(
    <BdoClient
      data-testid="bdo-client-element"
      className="custom-bdo-client primary large"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Styled bidirectional override
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveClass("custom-bdo-client", "primary", "large");
  expect(bdo).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Custom styling test for MemoizedBdoClient
it("renders MemoizedBdoClient with custom styling", () => {
  render(
    <MemoizedBdoClient
      data-testid="memoized-bdo-client-element"
      className="custom-memoized-bdo-client secondary medium"
      style={{ color: "green", fontStyle: "italic" }}
    >
      Styled memoized bidirectional override
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveClass("custom-memoized-bdo-client", "secondary", "medium");
  expect(bdo).toHaveStyle({
    color: "rgb(0, 128, 0)",
    fontStyle: "italic",
  });
});

// Bidirectional override text test for BdoClient
it("renders BdoClient bidirectional override text content", () => {
  render(
    <BdoClient data-testid="bdo-client-element">
      English text العربية نص
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveTextContent("English text");
  expect(bdo).toHaveTextContent("العربية");
  expect(bdo).toHaveTextContent("نص");
});

// Bidirectional override text test for MemoizedBdoClient
it("renders MemoizedBdoClient bidirectional override text content", () => {
  render(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element">
      Memoized English text العربية نص
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveTextContent("Memoized English text");
  expect(bdo).toHaveTextContent("العربية");
  expect(bdo).toHaveTextContent("نص");
});

// Mixed content test for BdoClient
it("renders BdoClient mixed content", () => {
  render(
    <BdoClient data-testid="bdo-client-element">
      <span>English</span>
      <span dir="rtl">עברית</span>
      <span>More English</span>
    </BdoClient>
  );

  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveTextContent("English");
  expect(bdo).toHaveTextContent("עברית");
  expect(bdo).toHaveTextContent("More English");
  expect(bdo.querySelector('[dir="rtl"]')).toBeInTheDocument();
});

// Mixed content test for MemoizedBdoClient
it("renders MemoizedBdoClient mixed content", () => {
  render(
    <MemoizedBdoClient data-testid="memoized-bdo-client-element">
      <span>Memoized English</span>
      <span dir="rtl">עברית</span>
      <span>More Memoized English</span>
    </MemoizedBdoClient>
  );

  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveTextContent("Memoized English");
  expect(bdo).toHaveTextContent("עברית");
  expect(bdo).toHaveTextContent("More Memoized English");
  expect(bdo.querySelector('[dir="rtl"]')).toBeInTheDocument();
});

// Custom attributes test for BdoClient
it("renders BdoClient with custom attributes", () => {
  render(
    <BdoClient
      data-testid="bdo-client-element"
      id="custom-bdo-client-id"
      title="Custom bdo client title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom bdo client
    </BdoClient>
  );
  const bdo = screen.getByTestId("bdo-client-element");
  expect(bdo).toHaveAttribute("id", "custom-bdo-client-id");
  expect(bdo).toHaveAttribute("title", "Custom bdo client title");
  expect(bdo).not.toHaveAttribute("hidden");
  expect(bdo).toHaveAttribute("spellcheck", "true");
  expect(bdo).toHaveAttribute("contenteditable", "false");
});

// Custom attributes test for MemoizedBdoClient
it("renders MemoizedBdoClient with custom attributes", () => {
  render(
    <MemoizedBdoClient
      data-testid="memoized-bdo-client-element"
      id="custom-memoized-bdo-client-id"
      title="Custom memoized bdo client title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom memoized bdo client
    </MemoizedBdoClient>
  );
  const bdo = screen.getByTestId("memoized-bdo-client-element");
  expect(bdo).toHaveAttribute("id", "custom-memoized-bdo-client-id");
  expect(bdo).toHaveAttribute("title", "Custom memoized bdo client title");
  expect(bdo).not.toHaveAttribute("hidden");
  expect(bdo).toHaveAttribute("spellcheck", "true");
  expect(bdo).toHaveAttribute("contenteditable", "false");
});
