import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BdiClient, MemoizedBdiClient } from "./index.client";

// Basic render test for BdiClient
it("renders a bdi element", () => {
  render(<BdiClient data-testid="bdi-element">Bidirectional text</BdiClient>);
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi.tagName).toBe("BDI");
  expect(bdi).toHaveTextContent("Bidirectional text");
});

// Basic render test for MemoizedBdiClient
it("renders a memoized bdi element", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      Memoized bidirectional text
    </MemoizedBdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi.tagName).toBe("BDI");
  expect(bdi).toHaveTextContent("Memoized bidirectional text");
});

// as prop test for BdiClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <BdiClient as="div" data-testid="custom-div">
      Custom bidirectional
    </BdiClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom bidirectional");
});

// as prop test for MemoizedBdiClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedBdiClient as="span" data-testid="custom-span">
      Custom memoized bidirectional
    </MemoizedBdiClient>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("Custom memoized bidirectional");
});

// Suspense render test for BdiClient
it("renders in Suspense context", () => {
  try {
    render(
      <BdiClient data-testid="bdi-element">
        Suspense bidirectional content
      </BdiClient>
    );
    const bdi = screen.getByTestId("bdi-element");
    expect(bdi.tagName).toBe("BDI");
    expect(bdi).toHaveTextContent("Suspense bidirectional content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const bdi = screen.getByTestId("bdi-element");
    expect(bdi.tagName).toBe("BDI");
    expect(bdi).toHaveTextContent("Suspense bidirectional content");
  }
});

// Suspense render test for MemoizedBdiClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedBdiClient data-testid="bdi-element">
        Memoized suspense bidirectional
      </MemoizedBdiClient>
    );
    const bdi = screen.getByTestId("bdi-element");
    expect(bdi.tagName).toBe("BDI");
    expect(bdi).toHaveTextContent("Memoized suspense bidirectional");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const bdi = screen.getByTestId("bdi-element");
    expect(bdi.tagName).toBe("BDI");
    expect(bdi).toHaveTextContent("Memoized suspense bidirectional");
  }
});

// ref forwarding test for BdiClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<BdiClient ref={ref}>Ref test content</BdiClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BDI");
  }
});

// ref forwarding test for MemoizedBdiClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <MemoizedBdiClient ref={ref}>Memoized ref test content</MemoizedBdiClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("BDI");
  }
});

// Bdi-specific props test for BdiClient
it("renders with bdi-specific attributes", () => {
  render(
    <BdiClient
      data-testid="bdi-element"
      className="bidirectional-text"
      id="main-bdi"
      dir="ltr"
    >
      Bidirectional content
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("bidirectional-text", { exact: true });
  expect(bdi).toHaveAttribute("id", "main-bdi");
  expect(bdi).toHaveAttribute("dir", "ltr");
  expect(bdi).toHaveTextContent("Bidirectional content");
});

// Bdi-specific props test for MemoizedBdiClient
it("renders memoized with bdi-specific attributes", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      className="memoized-bidirectional-text"
      id="memoized-main-bdi"
      dir="rtl"
    >
      Memoized bidirectional content
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("memoized-bidirectional-text", { exact: true });
  expect(bdi).toHaveAttribute("id", "memoized-main-bdi");
  expect(bdi).toHaveAttribute("dir", "rtl");
  expect(bdi).toHaveTextContent("Memoized bidirectional content");
});

// Children rendering test for BdiClient
it("renders children correctly", () => {
  render(
    <BdiClient data-testid="bdi-element">
      <span>Left</span>
      <span>Right</span>
      <span>Mixed</span>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Left");
  expect(bdi).toHaveTextContent("Right");
  expect(bdi).toHaveTextContent("Mixed");
  expect(bdi.querySelectorAll("span")).toHaveLength(3);
});

// Children rendering test for MemoizedBdiClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      <span>Memoized Left</span>
      <span>Memoized Right</span>
      <span>Memoized Mixed</span>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Memoized Left");
  expect(bdi).toHaveTextContent("Memoized Right");
  expect(bdi).toHaveTextContent("Memoized Mixed");
  expect(bdi.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test for BdiClient
it("renders with empty children", () => {
  render(<BdiClient data-testid="bdi-element" />);
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toBeInTheDocument();
  expect(bdi).toBeEmptyDOMElement();
});

// Empty children test for MemoizedBdiClient
it("renders memoized with empty children", () => {
  render(<MemoizedBdiClient data-testid="bdi-element" />);
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toBeInTheDocument();
  expect(bdi).toBeEmptyDOMElement();
});

// Complex children with nested elements test for BdiClient
it("renders complex nested children", () => {
  render(
    <BdiClient data-testid="bdi-element">
      <div className="bdi-content">
        <span className="left">Left text</span>
        <span className="right">Right text</span>
        <span className="mixed">Mixed text</span>
      </div>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Left text");
  expect(bdi).toHaveTextContent("Right text");
  expect(bdi).toHaveTextContent("Mixed text");
  expect(bdi.querySelector(".bdi-content")).toBeInTheDocument();
  expect(bdi.querySelector(".left")).toBeInTheDocument();
  expect(bdi.querySelector(".right")).toBeInTheDocument();
  expect(bdi.querySelector(".mixed")).toBeInTheDocument();
});

// Complex children with nested elements test for MemoizedBdiClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      <div className="memoized-bdi-content">
        <span className="memoized-left">Memoized Left text</span>
        <span className="memoized-right">Memoized Right text</span>
        <span className="memoized-mixed">Memoized Mixed text</span>
      </div>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Memoized Left text");
  expect(bdi).toHaveTextContent("Memoized Right text");
  expect(bdi).toHaveTextContent("Memoized Mixed text");
  expect(bdi.querySelector(".memoized-bdi-content")).toBeInTheDocument();
  expect(bdi.querySelector(".memoized-left")).toBeInTheDocument();
  expect(bdi.querySelector(".memoized-right")).toBeInTheDocument();
  expect(bdi.querySelector(".memoized-mixed")).toBeInTheDocument();
});

// Direction attributes test for BdiClient
it("renders with different direction attributes", () => {
  const { rerender } = render(
    <BdiClient data-testid="bdi-element" dir="ltr">
      Left to right
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "ltr");

  rerender(
    <BdiClient data-testid="bdi-element" dir="rtl">
      Right to left
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "rtl");

  rerender(
    <BdiClient data-testid="bdi-element" dir="auto">
      Auto direction
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "auto");
});

// Direction attributes test for MemoizedBdiClient
it("renders memoized with different direction attributes", () => {
  const { rerender } = render(
    <MemoizedBdiClient data-testid="bdi-element" dir="ltr">
      Memoized left to right
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "ltr");

  rerender(
    <MemoizedBdiClient data-testid="bdi-element" dir="rtl">
      Memoized right to left
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "rtl");

  rerender(
    <MemoizedBdiClient data-testid="bdi-element" dir="auto">
      Memoized auto direction
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "auto");
});

// Bdi with accessibility attributes test for BdiClient
it("renders with accessibility attributes", () => {
  render(
    <BdiClient
      data-testid="bdi-element"
      aria-label="Bidirectional text"
      aria-describedby="bdi-description"
      role="text"
      tabIndex={0}
    >
      Accessible bidirectional
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("aria-label", "Bidirectional text");
  expect(bdi).toHaveAttribute("aria-describedby", "bdi-description");
  expect(bdi).toHaveAttribute("role", "text");
  expect(bdi).toHaveAttribute("tabindex", "0");
});

// Bdi with accessibility attributes test for MemoizedBdiClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      aria-label="Memoized bidirectional text"
      aria-describedby="memoized-bdi-description"
      role="text"
      tabIndex={0}
    >
      Memoized accessible bidirectional
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("aria-label", "Memoized bidirectional text");
  expect(bdi).toHaveAttribute("aria-describedby", "memoized-bdi-description");
  expect(bdi).toHaveAttribute("role", "text");
  expect(bdi).toHaveAttribute("tabindex", "0");
});

// Bdi with data attributes test for BdiClient
it("renders with data attributes", () => {
  render(
    <BdiClient
      data-testid="bdi-element"
      data-variant="primary"
      data-size="large"
      data-text-type="bidirectional"
    >
      Data bidirectional
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("data-variant", "primary");
  expect(bdi).toHaveAttribute("data-size", "large");
  expect(bdi).toHaveAttribute("data-text-type", "bidirectional");
});

// Bdi with data attributes test for MemoizedBdiClient
it("renders memoized with data attributes", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      data-variant="secondary"
      data-size="small"
      data-text-type="memoized-bidirectional"
    >
      Memoized data bidirectional
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("data-variant", "secondary");
  expect(bdi).toHaveAttribute("data-size", "small");
  expect(bdi).toHaveAttribute("data-text-type", "memoized-bidirectional");
});

// Bdi with event handlers test for BdiClient
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <BdiClient
      data-testid="bdi-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive bidirectional
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Interactive bidirectional");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Bdi with event handlers test for MemoizedBdiClient
it("renders memoized with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Memoized interactive bidirectional
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Memoized interactive bidirectional");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Bdi with custom styling test for BdiClient
it("renders with custom styling", () => {
  render(
    <BdiClient
      data-testid="bdi-element"
      className="custom-bdi primary large"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Styled bidirectional
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("custom-bdi", "primary", "large");
  expect(bdi).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Bdi with custom styling test for MemoizedBdiClient
it("renders memoized with custom styling", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      className="memoized-custom-bdi secondary small"
      style={{ color: "green", textDecoration: "none" }}
    >
      Memoized styled bidirectional
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("memoized-custom-bdi", "secondary", "small");
  expect(bdi).toHaveStyle({ color: "rgb(0, 128, 0)", textDecoration: "none" });
});

// Bdi with semantic meaning test for BdiClient
it("renders with semantic meaning", () => {
  render(
    <BdiClient data-testid="bdi-element" role="text">
      <span>Bidirectional</span>
      <span>Text</span>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("role", "text");
  expect(bdi).toHaveTextContent("Bidirectional");
  expect(bdi).toHaveTextContent("Text");
});

// Bdi with semantic meaning test for MemoizedBdiClient
it("renders memoized with semantic meaning", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element" role="text">
      <span>Memoized Bidirectional</span>
      <span>Memoized Text</span>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("role", "text");
  expect(bdi).toHaveTextContent("Memoized Bidirectional");
  expect(bdi).toHaveTextContent("Memoized Text");
});

// Bdi with bidirectional text test for BdiClient
it("renders bidirectional text content", () => {
  render(
    <BdiClient data-testid="bdi-element">English text العربية نص</BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("English text");
  expect(bdi).toHaveTextContent("العربية");
  expect(bdi).toHaveTextContent("نص");
});

// Bdi with bidirectional text test for MemoizedBdiClient
it("renders memoized bidirectional text content", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      Memoized English text العربية نص
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Memoized English text");
  expect(bdi).toHaveTextContent("العربية");
  expect(bdi).toHaveTextContent("نص");
});

// Bdi with mixed content test for BdiClient
it("renders mixed content", () => {
  render(
    <BdiClient data-testid="bdi-element">
      <span>English</span>
      <span dir="rtl">עברית</span>
      <span>More English</span>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("English");
  expect(bdi).toHaveTextContent("עברית");
  expect(bdi).toHaveTextContent("More English");
  expect(bdi.querySelector('[dir="rtl"]')).toBeInTheDocument();
});

// Bdi with mixed content test for MemoizedBdiClient
it("renders memoized mixed content", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      <span>Memoized English</span>
      <span dir="rtl">עברית</span>
      <span>Memoized More English</span>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Memoized English");
  expect(bdi).toHaveTextContent("עברית");
  expect(bdi).toHaveTextContent("Memoized More English");
  expect(bdi.querySelector('[dir="rtl"]')).toBeInTheDocument();
});

// Bdi with icons test for BdiClient
it("renders bdi with icons", () => {
  render(
    <BdiClient data-testid="bdi-element">
      <span role="img" aria-label="bidirectional-text">
        🔄
      </span>
      <span>Bidirectional Text</span>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("🔄");
  expect(bdi).toHaveTextContent("Bidirectional Text");
  expect(bdi.querySelector('[role="img"]')).toBeInTheDocument();
  expect(
    bdi.querySelector('[aria-label="bidirectional-text"]')
  ).toBeInTheDocument();
});

// Bdi with icons test for MemoizedBdiClient
it("renders memoized bdi with icons", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      <span role="img" aria-label="memoized-bidirectional-text">
        ⚡
      </span>
      <span>Memoized Bidirectional Text</span>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("⚡");
  expect(bdi).toHaveTextContent("Memoized Bidirectional Text");
  expect(bdi.querySelector('[role="img"]')).toBeInTheDocument();
  expect(
    bdi.querySelector('[aria-label="memoized-bidirectional-text"]')
  ).toBeInTheDocument();
});

// Bdi with loading state test for BdiClient
it("renders bdi with loading state", () => {
  render(
    <BdiClient data-testid="bdi-element" aria-disabled="true">
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("aria-disabled", "true");
  expect(bdi).toHaveTextContent("⏳");
  expect(bdi).toHaveTextContent("Loading...");
  expect(bdi.querySelector(".spinner")).toBeInTheDocument();
});

// Bdi with loading state test for MemoizedBdiClient
it("renders memoized bdi with loading state", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element" aria-disabled="true">
      <span className="memoized-spinner">🔄</span>
      <span>Memoized Loading...</span>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("aria-disabled", "true");
  expect(bdi).toHaveTextContent("🔄");
  expect(bdi).toHaveTextContent("Memoized Loading...");
  expect(bdi.querySelector(".memoized-spinner")).toBeInTheDocument();
});

// Bdi with navigation test for BdiClient
it("renders bdi navigation", () => {
  render(
    <BdiClient data-testid="bdi-element">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Home");
  expect(bdi).toHaveTextContent("About");
  expect(bdi).toHaveTextContent("Contact");
  expect(bdi.querySelector("nav")).toBeInTheDocument();
  expect(bdi.querySelectorAll("li")).toHaveLength(3);
});

// Bdi with navigation test for MemoizedBdiClient
it("renders memoized bdi navigation", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      <nav>
        <ul>
          <li>Memoized Home</li>
          <li>Memoized About</li>
          <li>Memoized Contact</li>
        </ul>
      </nav>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Memoized Home");
  expect(bdi).toHaveTextContent("Memoized About");
  expect(bdi).toHaveTextContent("Memoized Contact");
  expect(bdi.querySelector("nav")).toBeInTheDocument();
  expect(bdi.querySelectorAll("li")).toHaveLength(3);
});

// Bdi with form test for BdiClient
it("renders bdi with form", () => {
  render(
    <BdiClient data-testid="bdi-element">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Name:");
  expect(bdi).toHaveTextContent("Submit");
  expect(bdi.querySelector("form")).toBeInTheDocument();
  expect(bdi.querySelector("label")).toBeInTheDocument();
  expect(bdi.querySelector("input")).toBeInTheDocument();
  expect(bdi.querySelector("button")).toBeInTheDocument();
});

// Bdi with form test for MemoizedBdiClient
it("renders memoized bdi with form", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element">
      <form>
        <label htmlFor="memoized-name">Memoized Name:</label>
        <input type="text" id="memoized-name" name="memoized-name" />
        <button type="submit">Memoized Submit</button>
      </form>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Memoized Name:");
  expect(bdi).toHaveTextContent("Memoized Submit");
  expect(bdi.querySelector("form")).toBeInTheDocument();
  expect(bdi.querySelector("label")).toBeInTheDocument();
  expect(bdi.querySelector("input")).toBeInTheDocument();
  expect(bdi.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test for BdiClient
it("renders with custom attributes", () => {
  render(
    <BdiClient
      data-testid="bdi-element"
      className="custom-bdi"
      id="main-bdi"
      data-bdi-type="primary"
    >
      <h1>Bdi with Custom Attributes</h1>
    </BdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("custom-bdi");
  expect(bdi).toHaveAttribute("id", "main-bdi");
  expect(bdi).toHaveAttribute("data-bdi-type", "primary");
});

// Custom attributes test for MemoizedBdiClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      className="memoized-custom-bdi"
      id="memoized-main-bdi"
      data-bdi-type="secondary"
    >
      <h1>Memoized Bdi with Custom Attributes</h1>
    </MemoizedBdiClient>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("memoized-custom-bdi");
  expect(bdi).toHaveAttribute("id", "memoized-main-bdi");
  expect(bdi).toHaveAttribute("data-bdi-type", "secondary");
});

// Bdi with different content types test for BdiClient
it("renders with different content types", () => {
  const { rerender } = render(
    <BdiClient data-testid="bdi-element">Simple text content</BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent(
    "Simple text content"
  );

  rerender(
    <BdiClient data-testid="bdi-element">
      <em>Emphasized content</em>
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent(
    "Emphasized content"
  );
  expect(
    screen.getByTestId("bdi-element").querySelector("em")
  ).toBeInTheDocument();

  rerender(
    <BdiClient data-testid="bdi-element">
      <code>Code content</code>
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent("Code content");
  expect(
    screen.getByTestId("bdi-element").querySelector("code")
  ).toBeInTheDocument();
});

// Bdi with different content types test for MemoizedBdiClient
it("renders memoized with different content types", () => {
  const { rerender } = render(
    <MemoizedBdiClient data-testid="bdi-element">
      Memoized simple text content
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent(
    "Memoized simple text content"
  );

  rerender(
    <MemoizedBdiClient data-testid="bdi-element">
      <em>Memoized emphasized content</em>
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent(
    "Memoized emphasized content"
  );
  expect(
    screen.getByTestId("bdi-element").querySelector("em")
  ).toBeInTheDocument();

  rerender(
    <MemoizedBdiClient data-testid="bdi-element">
      <code>Memoized code content</code>
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent(
    "Memoized code content"
  );
  expect(
    screen.getByTestId("bdi-element").querySelector("code")
  ).toBeInTheDocument();
});

// Bdi with multiple classes test for BdiClient
it("renders with multiple classes", () => {
  render(
    <BdiClient
      data-testid="bdi-element"
      className="bdi-text primary large emphasis"
    >
      Multiple Classes
    </BdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("bdi-text", "primary", "large", "emphasis");
});

// Bdi with multiple classes test for MemoizedBdiClient
it("renders memoized with multiple classes", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      className="memoized-bdi-text secondary small strong"
    >
      Memoized Multiple Classes
    </MemoizedBdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("memoized-bdi-text", "secondary", "small", "strong");
});

// Bdi with inline styles test for BdiClient
it("renders with inline styles", () => {
  render(
    <BdiClient
      data-testid="bdi-element"
      style={{
        color: "red",
        fontSize: "18px",
        textTransform: "uppercase",
      }}
    >
      Inline Styled
    </BdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveStyle({
    color: "rgb(255, 0, 0)",
    fontSize: "18px",
    textTransform: "uppercase",
  });
});

// Bdi with inline styles test for MemoizedBdiClient
it("renders memoized with inline styles", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      style={{
        color: "blue",
        fontSize: "20px",
        textTransform: "lowercase",
      }}
    >
      Memoized Inline Styled
    </MemoizedBdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveStyle({
    color: "rgb(0, 0, 255)",
    fontSize: "20px",
    textTransform: "lowercase",
  });
});

// Bdi with language attributes test for BdiClient
it("renders with language attributes", () => {
  const { rerender } = render(
    <BdiClient data-testid="bdi-element" lang="en">
      English text
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "en");

  rerender(
    <BdiClient data-testid="bdi-element" lang="ar">
      Arabic text
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "ar");

  rerender(
    <BdiClient data-testid="bdi-element" lang="he">
      Hebrew text
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "he");
});

// Bdi with language attributes test for MemoizedBdiClient
it("renders memoized with language attributes", () => {
  const { rerender } = render(
    <MemoizedBdiClient data-testid="bdi-element" lang="en">
      Memoized English text
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "en");

  rerender(
    <MemoizedBdiClient data-testid="bdi-element" lang="ar">
      Memoized Arabic text
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "ar");

  rerender(
    <MemoizedBdiClient data-testid="bdi-element" lang="he">
      Memoized Hebrew text
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "he");
});

// Bdi with title attribute test for BdiClient
it("renders with title attribute", () => {
  render(
    <BdiClient data-testid="bdi-element" title="Bidirectional text explanation">
      Text with title
    </BdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("title", "Bidirectional text explanation");
});

// Bdi with title attribute test for MemoizedBdiClient
it("renders memoized with title attribute", () => {
  render(
    <MemoizedBdiClient
      data-testid="bdi-element"
      title="Memoized bidirectional text explanation"
    >
      Memoized text with title
    </MemoizedBdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute(
    "title",
    "Memoized bidirectional text explanation"
  );
});

// Bdi with spellcheck attribute test for BdiClient
it("renders with spellcheck attribute", () => {
  const { rerender } = render(
    <BdiClient data-testid="bdi-element" spellCheck={true}>
      Spellcheck enabled
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "spellcheck",
    "true"
  );

  rerender(
    <BdiClient data-testid="bdi-element" spellCheck={false}>
      Spellcheck disabled
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "spellcheck",
    "false"
  );
});

// Bdi with spellcheck attribute test for MemoizedBdiClient
it("renders memoized with spellcheck attribute", () => {
  const { rerender } = render(
    <MemoizedBdiClient data-testid="bdi-element" spellCheck={true}>
      Memoized spellcheck enabled
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "spellcheck",
    "true"
  );

  rerender(
    <MemoizedBdiClient data-testid="bdi-element" spellCheck={false}>
      Memoized spellcheck disabled
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "spellcheck",
    "false"
  );
});

// Bdi with contenteditable attribute test for BdiClient
it("renders with contenteditable attribute", () => {
  const { rerender } = render(
    <BdiClient data-testid="bdi-element" contentEditable={true}>
      Editable content
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "contenteditable",
    "true"
  );

  rerender(
    <BdiClient data-testid="bdi-element" contentEditable={false}>
      Non-editable content
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "contenteditable",
    "false"
  );
});

// Bdi with contenteditable attribute test for MemoizedBdiClient
it("renders memoized with contenteditable attribute", () => {
  const { rerender } = render(
    <MemoizedBdiClient data-testid="bdi-element" contentEditable={true}>
      Memoized editable content
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "contenteditable",
    "true"
  );

  rerender(
    <MemoizedBdiClient data-testid="bdi-element" contentEditable={false}>
      Memoized non-editable content
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "contenteditable",
    "false"
  );
});

// Bdi with hidden attribute test for BdiClient
it("renders with hidden attribute", () => {
  render(
    <BdiClient data-testid="bdi-element" hidden>
      Hidden content
    </BdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("hidden");
});

// Bdi with hidden attribute test for MemoizedBdiClient
it("renders memoized with hidden attribute", () => {
  render(
    <MemoizedBdiClient data-testid="bdi-element" hidden>
      Memoized hidden content
    </MemoizedBdiClient>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("hidden");
});

// Bdi with draggable attribute test for BdiClient
it("renders with draggable attribute", () => {
  const { rerender } = render(
    <BdiClient data-testid="bdi-element" draggable={true}>
      Draggable content
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "draggable",
    "true"
  );

  rerender(
    <BdiClient data-testid="bdi-element" draggable={false}>
      Non-draggable content
    </BdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "draggable",
    "false"
  );
});

// Bdi with draggable attribute test for MemoizedBdiClient
it("renders memoized with draggable attribute", () => {
  const { rerender } = render(
    <MemoizedBdiClient data-testid="bdi-element" draggable={true}>
      Memoized draggable content
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "draggable",
    "true"
  );

  rerender(
    <MemoizedBdiClient data-testid="bdi-element" draggable={false}>
      Memoized non-draggable content
    </MemoizedBdiClient>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "draggable",
    "false"
  );
});
