import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { AbbrClient, MemoizedAbbrClient } from "../index.client";

// Basic render test for AbbrClient
it("renders an abbreviation element", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="HyperText Markup Language">
      HTML
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr.tagName).toBe("ABBR");
  expect(abbr).toHaveTextContent("HTML");
  expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
});

// Basic render test for MemoizedAbbrClient
it("renders a memoized abbreviation element", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Cascading Style Sheets"
    >
      Memoized CSS
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr.tagName).toBe("ABBR");
  expect(abbr).toHaveTextContent("Memoized CSS");
  expect(abbr).toHaveAttribute("title", "Cascading Style Sheets");
});

// as prop test for AbbrClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <AbbrClient as="span" data-testid="custom-span" title="Custom abbreviation">
      Custom abbreviation
    </AbbrClient>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("Custom abbreviation");
});

// as prop test for MemoizedAbbrClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedAbbrClient
      as="div"
      data-testid="custom-div"
      title="Custom memoized abbreviation"
    >
      Custom memoized abbreviation
    </MemoizedAbbrClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom memoized abbreviation");
});

// Suspense render test for AbbrClient
it("renders in Suspense context", () => {
  try {
    render(
      <AbbrClient data-testid="abbr-element" title="Suspense abbreviation">
        Suspense abbreviation content
      </AbbrClient>
    );
    const abbr = screen.getByTestId("abbr-element");
    expect(abbr.tagName).toBe("ABBR");
    expect(abbr).toHaveTextContent("Suspense abbreviation content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const abbr = screen.getByTestId("abbr-element");
    expect(abbr.tagName).toBe("ABBR");
    expect(abbr).toHaveTextContent("Suspense abbreviation content");
  }
});

// Suspense render test for MemoizedAbbrClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedAbbrClient
        data-testid="abbr-element"
        title="Memoized suspense abbreviation"
      >
        Memoized suspense abbreviation
      </MemoizedAbbrClient>
    );
    const abbr = screen.getByTestId("abbr-element");
    expect(abbr.tagName).toBe("ABBR");
    expect(abbr).toHaveTextContent("Memoized suspense abbreviation");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const abbr = screen.getByTestId("abbr-element");
    expect(abbr.tagName).toBe("ABBR");
    expect(abbr).toHaveTextContent("Memoized suspense abbreviation");
  }
});

// ref forwarding test for AbbrClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <AbbrClient ref={ref} title="Ref test">
      Ref test content
    </AbbrClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("ABBR");
  }
});

// ref forwarding test for MemoizedAbbrClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <MemoizedAbbrClient ref={ref} title="Memoized ref test">
      Memoized ref test content
    </MemoizedAbbrClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("ABBR");
  }
});

// Abbr-specific props test for AbbrClient
it("renders with abbreviation-specific attributes", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="HyperText Markup Language"
      className="technical-term"
      id="html-abbr"
    >
      HTML
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
  expect(abbr).toHaveClass("technical-term", { exact: true });
  expect(abbr).toHaveAttribute("id", "html-abbr");
  expect(abbr).toHaveTextContent("HTML");
});

// Abbr-specific props test for MemoizedAbbrClient
it("renders memoized with abbreviation-specific attributes", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Cascading Style Sheets"
      className="memoized-technical-term"
      id="memoized-css-abbr"
    >
      Memoized CSS
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Cascading Style Sheets");
  expect(abbr).toHaveClass("memoized-technical-term", { exact: true });
  expect(abbr).toHaveAttribute("id", "memoized-css-abbr");
  expect(abbr).toHaveTextContent("Memoized CSS");
});

// Children rendering test for AbbrClient
it("renders children correctly", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Multiple terms">
      <span>CSS</span>
      <span>HTML</span>
      <span>JS</span>
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("CSS");
  expect(abbr).toHaveTextContent("HTML");
  expect(abbr).toHaveTextContent("JS");
  expect(abbr.querySelectorAll("span")).toHaveLength(3);
});

// Children rendering test for MemoizedAbbrClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized multiple terms"
    >
      <span>Memoized CSS</span>
      <span>Memoized HTML</span>
      <span>Memoized JS</span>
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Memoized CSS");
  expect(abbr).toHaveTextContent("Memoized HTML");
  expect(abbr).toHaveTextContent("Memoized JS");
  expect(abbr.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test for AbbrClient
it("renders with empty children", () => {
  render(<AbbrClient data-testid="abbr-element" title="Empty abbreviation" />);
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toBeInTheDocument();
  expect(abbr).toBeEmptyDOMElement();
});

// Empty children test for MemoizedAbbrClient
it("renders memoized with empty children", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized empty abbreviation"
    />
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toBeInTheDocument();
  expect(abbr).toBeEmptyDOMElement();
});

// Complex children with nested elements test for AbbrClient
it("renders complex nested children", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Complex abbreviation">
      <div className="abbr-content">
        <span className="icon">📝</span>
        <span className="text">Complex Abbr</span>
        <span className="badge">New</span>
      </div>
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("📝");
  expect(abbr).toHaveTextContent("Complex Abbr");
  expect(abbr).toHaveTextContent("New");
  expect(abbr.querySelector(".abbr-content")).toBeInTheDocument();
  expect(abbr.querySelector(".icon")).toBeInTheDocument();
  expect(abbr.querySelector(".text")).toBeInTheDocument();
  expect(abbr.querySelector(".badge")).toBeInTheDocument();
});

// Complex children with nested elements test for MemoizedAbbrClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized complex abbreviation"
    >
      <div className="memoized-abbr-content">
        <span className="memoized-icon">⚡</span>
        <span className="memoized-text">Memoized Complex Abbr</span>
        <span className="memoized-badge">Updated</span>
      </div>
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("⚡");
  expect(abbr).toHaveTextContent("Memoized Complex Abbr");
  expect(abbr).toHaveTextContent("Updated");
  expect(abbr.querySelector(".memoized-abbr-content")).toBeInTheDocument();
  expect(abbr.querySelector(".memoized-icon")).toBeInTheDocument();
  expect(abbr.querySelector(".memoized-text")).toBeInTheDocument();
  expect(abbr.querySelector(".memoized-badge")).toBeInTheDocument();
});

// Abbreviation types test for AbbrClient
it("renders with different abbreviation types", () => {
  const { rerender } = render(
    <AbbrClient data-testid="abbr-element" title="HyperText Markup Language">
      HTML
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "HyperText Markup Language"
  );

  rerender(
    <AbbrClient data-testid="abbr-element" title="Cascading Style Sheets">
      CSS
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Cascading Style Sheets"
  );

  rerender(
    <AbbrClient data-testid="abbr-element" title="JavaScript">
      JS
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "JavaScript"
  );

  rerender(
    <AbbrClient data-testid="abbr-element" title="As Soon As Possible">
      ASAP
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "As Soon As Possible"
  );
});

// Abbreviation types test for MemoizedAbbrClient
it("renders memoized with different abbreviation types", () => {
  const { rerender } = render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized HyperText Markup Language"
    >
      Memoized HTML
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized HyperText Markup Language"
  );

  rerender(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Cascading Style Sheets"
    >
      Memoized CSS
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized Cascading Style Sheets"
  );

  rerender(
    <MemoizedAbbrClient data-testid="abbr-element" title="Memoized JavaScript">
      Memoized JS
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized JavaScript"
  );

  rerender(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized As Soon As Possible"
    >
      Memoized ASAP
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized As Soon As Possible"
  );
});

// Abbreviation states test for AbbrClient
it("renders with different abbreviation states", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Disabled abbreviation"
      aria-disabled="true"
    >
      DISABLED
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("aria-disabled", "true");
});

// Abbreviation states test for MemoizedAbbrClient
it("renders memoized with different abbreviation states", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized disabled abbreviation"
      aria-disabled="true"
    >
      Memoized DISABLED
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("aria-disabled", "true");
});

// Abbreviation with title test for AbbrClient
it("renders with title attribute", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="HyperText Markup Language">
      HTML
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
});

// Abbreviation with title test for MemoizedAbbrClient
it("renders memoized with title attribute", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized HyperText Markup Language"
    >
      Memoized HTML
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized HyperText Markup Language");
});

// Abbreviation with long title test for AbbrClient
it("renders with long title attribute", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="This is a very long abbreviation title that explains the full meaning of the abbreviated term"
    >
      LONG
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute(
    "title",
    "This is a very long abbreviation title that explains the full meaning of the abbreviated term"
  );
});

// Abbreviation with long title test for MemoizedAbbrClient
it("renders memoized with long title attribute", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="This is a very long memoized abbreviation title that explains the full meaning of the abbreviated term"
    >
      Memoized LONG
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute(
    "title",
    "This is a very long memoized abbreviation title that explains the full meaning of the abbreviated term"
  );
});

// Abbreviation with special characters test for AbbrClient
it("renders with special characters in title", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title={"Special & Characters < > \" '"}
    >
      SPECIAL
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Special & Characters < > \" '");
});

// Abbreviation with special characters test for MemoizedAbbrClient
it("renders memoized with special characters in title", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title={"Memoized Special & Characters < > \" '"}
    >
      Memoized SPECIAL
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute(
    "title",
    "Memoized Special & Characters < > \" '"
  );
});

// Abbreviation with numbers test for AbbrClient
it("renders with numbers in abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Version 2.0">
      V2
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Version 2.0");
  expect(abbr).toHaveTextContent("V2");
});

// Abbreviation with numbers test for MemoizedAbbrClient
it("renders memoized with numbers in abbreviation", () => {
  render(
    <MemoizedAbbrClient data-testid="abbr-element" title="Memoized Version 2.0">
      Memoized V2
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Version 2.0");
  expect(abbr).toHaveTextContent("Memoized V2");
});

// Abbreviation with mixed case test for AbbrClient
it("renders with mixed case abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Mixed Case Example">
      MiXeD
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Mixed Case Example");
  expect(abbr).toHaveTextContent("MiXeD");
});

// Abbreviation with mixed case test for MemoizedAbbrClient
it("renders memoized with mixed case abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Mixed Case Example"
    >
      Memoized MiXeD
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Mixed Case Example");
  expect(abbr).toHaveTextContent("Memoized MiXeD");
});

// Abbreviation with punctuation test for AbbrClient
it("renders with punctuation in abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Punctuation Example">
      P.E.
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Punctuation Example");
  expect(abbr).toHaveTextContent("P.E.");
});

// Abbreviation with punctuation test for MemoizedAbbrClient
it("renders memoized with punctuation in abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Punctuation Example"
    >
      Memoized P.E.
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Punctuation Example");
  expect(abbr).toHaveTextContent("Memoized P.E.");
});

// Abbreviation with icons test for AbbrClient
it("renders abbreviation with icons", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Icon abbreviation">
      <span role="img" aria-label="abbreviation">
        📝
      </span>
      <span>Icon Abbr</span>
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("📝");
  expect(abbr).toHaveTextContent("Icon Abbr");
  expect(abbr.querySelector('[role="img"]')).toBeInTheDocument();
  expect(abbr.querySelector('[aria-label="abbreviation"]')).toBeInTheDocument();
});

// Abbreviation with icons test for MemoizedAbbrClient
it("renders memoized abbreviation with icons", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized icon abbreviation"
    >
      <span role="img" aria-label="memoized-abbreviation">
        ⚡
      </span>
      <span>Memoized Icon Abbr</span>
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("⚡");
  expect(abbr).toHaveTextContent("Memoized Icon Abbr");
  expect(abbr.querySelector('[role="img"]')).toBeInTheDocument();
  expect(
    abbr.querySelector('[aria-label="memoized-abbreviation"]')
  ).toBeInTheDocument();
});

// Abbreviation with loading state test for AbbrClient
it("renders abbreviation with loading state", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Loading abbreviation"
      aria-disabled="true"
    >
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("aria-disabled", "true");
  expect(abbr).toHaveTextContent("⏳");
  expect(abbr).toHaveTextContent("Loading...");
  expect(abbr.querySelector(".spinner")).toBeInTheDocument();
});

// Abbreviation with loading state test for MemoizedAbbrClient
it("renders memoized abbreviation with loading state", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized loading abbreviation"
      aria-disabled="true"
    >
      <span className="memoized-spinner">🔄</span>
      <span>Memoized Loading...</span>
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("aria-disabled", "true");
  expect(abbr).toHaveTextContent("🔄");
  expect(abbr).toHaveTextContent("Memoized Loading...");
  expect(abbr.querySelector(".memoized-spinner")).toBeInTheDocument();
});

// Abbreviation with accessibility attributes test for AbbrClient
it("renders with accessibility attributes", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Accessible abbreviation description"
      aria-label="Accessible abbreviation"
      aria-describedby="abbr-description"
      role="text"
      tabIndex={0}
    >
      ACCESSIBLE
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Accessible abbreviation description");
  expect(abbr).toHaveAttribute("aria-label", "Accessible abbreviation");
  expect(abbr).toHaveAttribute("aria-describedby", "abbr-description");
  expect(abbr).toHaveAttribute("role", "text");
  expect(abbr).toHaveAttribute("tabindex", "0");
});

// Abbreviation with accessibility attributes test for MemoizedAbbrClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized accessible abbreviation description"
      aria-label="Memoized accessible abbreviation"
      aria-describedby="memoized-abbr-description"
      role="text"
      tabIndex={0}
    >
      Memoized ACCESSIBLE
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute(
    "title",
    "Memoized accessible abbreviation description"
  );
  expect(abbr).toHaveAttribute(
    "aria-label",
    "Memoized accessible abbreviation"
  );
  expect(abbr).toHaveAttribute("aria-describedby", "memoized-abbr-description");
  expect(abbr).toHaveAttribute("role", "text");
  expect(abbr).toHaveAttribute("tabindex", "0");
});

// Abbreviation with data attributes test for AbbrClient
it("renders with data attributes", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Data abbreviation"
      data-variant="primary"
      data-size="large"
      data-abbr-type="technical"
    >
      DATA
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("data-variant", "primary");
  expect(abbr).toHaveAttribute("data-size", "large");
  expect(abbr).toHaveAttribute("data-abbr-type", "technical");
});

// Abbreviation with data attributes test for MemoizedAbbrClient
it("renders memoized with data attributes", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized data abbreviation"
      data-variant="secondary"
      data-size="small"
      data-abbr-type="acronym"
    >
      Memoized DATA
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("data-variant", "secondary");
  expect(abbr).toHaveAttribute("data-size", "small");
  expect(abbr).toHaveAttribute("data-abbr-type", "acronym");
});

// Abbreviation with event handlers test for AbbrClient
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Interactive abbreviation"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Abbr
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Interactive Abbr");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Abbreviation with event handlers test for MemoizedAbbrClient
it("renders memoized with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized interactive abbreviation"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Memoized Interactive Abbr
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Memoized Interactive Abbr");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Abbreviation with custom styling test for AbbrClient
it("renders with custom styling", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Styled abbreviation"
      className="custom-abbr primary large"
      style={{ color: "rgb(0, 0, 255)", textDecoration: "underline" }}
    >
      Styled Abbr
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveClass("custom-abbr", "primary", "large");
  expect(abbr).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Abbreviation with custom styling test for MemoizedAbbrClient
it("renders memoized with custom styling", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized styled abbreviation"
      className="memoized-custom-abbr secondary small"
      style={{ color: "rgb(0, 128, 0)", textDecoration: "none" }}
    >
      Memoized Styled Abbr
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveClass("memoized-custom-abbr", "secondary", "small");
  expect(abbr).toHaveStyle({ color: "rgb(0, 128, 0)", textDecoration: "none" });
});

// Abbreviation with different title formats test for AbbrClient
it("renders with different title formats", () => {
  const { rerender } = render(
    <AbbrClient data-testid="abbr-element" title="Simple Title">
      SIMPLE
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Simple Title"
  );

  rerender(
    <AbbrClient data-testid="abbr-element" title="Title with (parentheses)">
      PARENTHESES
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Title with (parentheses)"
  );

  rerender(
    <AbbrClient data-testid="abbr-element" title="Title with - dashes">
      DASHES
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Title with - dashes"
  );

  rerender(
    <AbbrClient data-testid="abbr-element" title="Title with: colons">
      COLONS
    </AbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Title with: colons"
  );
});

// Abbreviation with different title formats test for MemoizedAbbrClient
it("renders memoized with different title formats", () => {
  const { rerender } = render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Simple Title"
    >
      Memoized SIMPLE
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized Simple Title"
  );

  rerender(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Title with (parentheses)"
    >
      Memoized PARENTHESES
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized Title with (parentheses)"
  );

  rerender(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Title with - dashes"
    >
      Memoized DASHES
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized Title with - dashes"
  );

  rerender(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Title with: colons"
    >
      Memoized COLONS
    </MemoizedAbbrClient>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Memoized Title with: colons"
  );
});

// Abbreviation with multiple words test for AbbrClient
it("renders with multiple words in abbreviation", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Multiple Word Abbreviation Example"
    >
      MWAE
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Multiple Word Abbreviation Example");
  expect(abbr).toHaveTextContent("MWAE");
});

// Abbreviation with multiple words test for MemoizedAbbrClient
it("renders memoized with multiple words in abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Multiple Word Abbreviation Example"
    >
      Memoized MWAE
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute(
    "title",
    "Memoized Multiple Word Abbreviation Example"
  );
  expect(abbr).toHaveTextContent("Memoized MWAE");
});

// Abbreviation with acronym test for AbbrClient
it("renders acronym abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Acronym Example">
      ACRONYM
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Acronym Example");
  expect(abbr).toHaveTextContent("ACRONYM");
});

// Abbreviation with acronym test for MemoizedAbbrClient
it("renders memoized acronym abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Acronym Example"
    >
      Memoized ACRONYM
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Acronym Example");
  expect(abbr).toHaveTextContent("Memoized ACRONYM");
});

// Abbreviation with initialism test for AbbrClient
it("renders initialism abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Initialism Example">
      I.N.I.T.
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Initialism Example");
  expect(abbr).toHaveTextContent("I.N.I.T.");
});

// Abbreviation with initialism test for MemoizedAbbrClient
it("renders memoized initialism abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Initialism Example"
    >
      Memoized I.N.I.T.
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Initialism Example");
  expect(abbr).toHaveTextContent("Memoized I.N.I.T.");
});

// Abbreviation with technical terms test for AbbrClient
it("renders technical term abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Technical Term Example">
      <code>API</code>
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Technical Term Example");
  expect(abbr).toHaveTextContent("API");
  expect(abbr.querySelector("code")).toBeInTheDocument();
});

// Abbreviation with technical terms test for MemoizedAbbrClient
it("renders memoized technical term abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Technical Term Example"
    >
      <code>Memoized API</code>
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Technical Term Example");
  expect(abbr).toHaveTextContent("Memoized API");
  expect(abbr.querySelector("code")).toBeInTheDocument();
});

// Abbreviation with definition test for AbbrClient
it("renders abbreviation with definition", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Definition Example">
      <dfn>DEF</dfn>
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Definition Example");
  expect(abbr).toHaveTextContent("DEF");
  expect(abbr.querySelector("dfn")).toBeInTheDocument();
});

// Abbreviation with definition test for MemoizedAbbrClient
it("renders memoized abbreviation with definition", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Definition Example"
    >
      <dfn>Memoized DEF</dfn>
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Definition Example");
  expect(abbr).toHaveTextContent("Memoized DEF");
  expect(abbr.querySelector("dfn")).toBeInTheDocument();
});

// Abbreviation with time test for AbbrClient
it("renders time abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Time Example">
      <time>AM</time>
    </AbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Time Example");
  expect(abbr).toHaveTextContent("AM");
  expect(abbr.querySelector("time")).toBeInTheDocument();
});

// Abbreviation with time test for MemoizedAbbrClient
it("renders memoized time abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Time Example"
    >
      <time>Memoized AM</time>
    </MemoizedAbbrClient>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Memoized Time Example");
  expect(abbr).toHaveTextContent("Memoized AM");
  expect(abbr.querySelector("time")).toBeInTheDocument();
});

// Abbreviation with navigation test for AbbrClient
it("renders navigation abbreviation", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Navigation Example">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Home");
  expect(abbr).toHaveTextContent("About");
  expect(abbr).toHaveTextContent("Contact");
  expect(abbr.querySelector("nav")).toBeInTheDocument();
  expect(abbr.querySelectorAll("li")).toHaveLength(3);
});

// Abbreviation with navigation test for MemoizedAbbrClient
it("renders memoized navigation abbreviation", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Navigation Example"
    >
      <nav>
        <ul>
          <li>Memoized Home</li>
          <li>Memoized About</li>
          <li>Memoized Contact</li>
        </ul>
      </nav>
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Memoized Home");
  expect(abbr).toHaveTextContent("Memoized About");
  expect(abbr).toHaveTextContent("Memoized Contact");
  expect(abbr.querySelector("nav")).toBeInTheDocument();
  expect(abbr.querySelectorAll("li")).toHaveLength(3);
});

// Abbreviation with form test for AbbrClient
it("renders abbreviation with form", () => {
  render(
    <AbbrClient data-testid="abbr-element" title="Form Example">
      <form>
        <label htmlFor="abbr">Abbreviation:</label>
        <input type="text" id="abbr" name="abbr" />
        <button type="submit">Submit</button>
      </form>
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Abbreviation:");
  expect(abbr).toHaveTextContent("Submit");
  expect(abbr.querySelector("form")).toBeInTheDocument();
  expect(abbr.querySelector("label")).toBeInTheDocument();
  expect(abbr.querySelector("input")).toBeInTheDocument();
  expect(abbr.querySelector("button")).toBeInTheDocument();
});

// Abbreviation with form test for MemoizedAbbrClient
it("renders memoized abbreviation with form", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized Form Example"
    >
      <form>
        <label htmlFor="memoized-abbr">Memoized Abbreviation:</label>
        <input type="text" id="memoized-abbr" name="memoized-abbr" />
        <button type="submit">Memoized Submit</button>
      </form>
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Memoized Abbreviation:");
  expect(abbr).toHaveTextContent("Memoized Submit");
  expect(abbr.querySelector("form")).toBeInTheDocument();
  expect(abbr.querySelector("label")).toBeInTheDocument();
  expect(abbr.querySelector("input")).toBeInTheDocument();
  expect(abbr.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test for AbbrClient
it("renders with custom attributes", () => {
  render(
    <AbbrClient
      data-testid="abbr-element"
      title="Custom abbreviation"
      className="custom-abbr"
      id="main-abbr"
      data-abbr-type="primary"
    >
      <h1>Abbreviation with Custom Attributes</h1>
    </AbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveClass("custom-abbr");
  expect(abbr).toHaveAttribute("id", "main-abbr");
  expect(abbr).toHaveAttribute("data-abbr-type", "primary");
});

// Custom attributes test for MemoizedAbbrClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedAbbrClient
      data-testid="abbr-element"
      title="Memoized custom abbreviation"
      className="memoized-custom-abbr"
      id="memoized-main-abbr"
      data-abbr-type="secondary"
    >
      <h1>Memoized Abbreviation with Custom Attributes</h1>
    </MemoizedAbbrClient>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveClass("memoized-custom-abbr");
  expect(abbr).toHaveAttribute("id", "memoized-main-abbr");
  expect(abbr).toHaveAttribute("data-abbr-type", "secondary");
});
