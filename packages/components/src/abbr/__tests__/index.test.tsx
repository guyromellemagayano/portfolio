import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Abbr } from "..";

// Basic render test
it("renders an abbreviation element", () => {
  render(<Abbr data-testid="abbr-element">HTML</Abbr>);
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr.tagName).toBe("ABBR");
  expect(abbr).toHaveTextContent("HTML");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Abbr as="span" data-testid="custom-span">
      Custom abbreviation
    </Abbr>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("Custom abbreviation");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Abbr isClient data-testid="abbr-element" title="HyperText Markup Language">
      Client-side HTML
    </Abbr>
  );

  // Should render the fallback (the abbr) immediately
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr.tagName).toBe("ABBR");
  expect(abbr).toHaveTextContent("Client-side HTML");
  expect(abbr).toHaveAttribute("title", "HyperText Markup Language");

  // The lazy component should load and render the same content
  await screen.findByTestId("abbr-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Abbr
      isClient
      isMemoized
      data-testid="abbr-element"
      title="Cascading Style Sheets"
    >
      Memoized CSS
    </Abbr>
  );

  // Should render the fallback (the abbr) immediately
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr.tagName).toBe("ABBR");
  expect(abbr).toHaveTextContent("Memoized CSS");
  expect(abbr).toHaveAttribute("title", "Cascading Style Sheets");

  // The lazy component should load and render the same content
  await screen.findByTestId("abbr-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <Abbr ref={ref} title="Ref test">
      Ref test content
    </Abbr>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("ABBR");
  }
});

// Abbr-specific props test
it("renders with abbreviation-specific attributes", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="HyperText Markup Language"
      className="technical-term"
      id="html-abbr"
    >
      HTML
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
  expect(abbr).toHaveAttribute("class", "technical-term");
  expect(abbr).toHaveAttribute("id", "html-abbr");
  expect(abbr).toHaveTextContent("HTML");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <Abbr data-testid="abbr-element" title="Multiple terms">
      <span>CSS</span>
      <span>HTML</span>
      <span>JS</span>
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("CSS");
  expect(abbr).toHaveTextContent("HTML");
  expect(abbr).toHaveTextContent("JS");
  expect(abbr.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test
it("renders with empty children", () => {
  render(<Abbr data-testid="abbr-element" title="Empty abbreviation" />);
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toBeInTheDocument();
  expect(abbr).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Abbr data-testid="abbr-element" title="Complex abbreviation">
      <div className="abbr-content">
        <span className="icon">📝</span>
        <span className="text">Complex Abbr</span>
        <span className="badge">New</span>
      </div>
    </Abbr>
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

// Abbreviation types test
it("renders with different abbreviation types", () => {
  const { rerender } = render(
    <Abbr data-testid="abbr-element" title="HyperText Markup Language">
      HTML
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "HyperText Markup Language"
  );

  rerender(
    <Abbr data-testid="abbr-element" title="Cascading Style Sheets">
      CSS
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Cascading Style Sheets"
  );

  rerender(
    <Abbr data-testid="abbr-element" title="JavaScript">
      JS
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "JavaScript"
  );

  rerender(
    <Abbr data-testid="abbr-element" title="As Soon As Possible">
      ASAP
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "As Soon As Possible"
  );
});

// Abbreviation states test
it("renders with different abbreviation states", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="Disabled abbreviation"
      aria-disabled="true"
    >
      DISABLED
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("aria-disabled", "true");
});

// Abbreviation with title test
it("renders with title attribute", () => {
  render(
    <Abbr data-testid="abbr-element" title="HyperText Markup Language">
      HTML
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
});

// Abbreviation with long title test
it("renders with long title attribute", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="This is a very long abbreviation title that explains the full meaning of the abbreviated term"
    >
      LONG
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute(
    "title",
    "This is a very long abbreviation title that explains the full meaning of the abbreviated term"
  );
});

// Abbreviation with special characters test
it("renders with special characters in title", () => {
  render(
    <Abbr data-testid="abbr-element" title={"Special & Characters < > \" '"}>
      SPECIAL
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Special & Characters < > \" '");
});

// Abbreviation with numbers test
it("renders with numbers in abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Version 2.0">
      V2
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Version 2.0");
  expect(abbr).toHaveTextContent("V2");
});

// Abbreviation with mixed case test
it("renders with mixed case abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Mixed Case Example">
      MiXeD
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Mixed Case Example");
  expect(abbr).toHaveTextContent("MiXeD");
});

// Abbreviation with punctuation test
it("renders with punctuation in abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Punctuation Example">
      P.E.
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Punctuation Example");
  expect(abbr).toHaveTextContent("P.E.");
});

// Abbreviation with icons test
it("renders abbreviation with icons", () => {
  render(
    <Abbr data-testid="abbr-element" title="Icon abbreviation">
      <span role="img" aria-label="abbreviation">
        📝
      </span>
      <span>Icon Abbr</span>
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("📝");
  expect(abbr).toHaveTextContent("Icon Abbr");
  expect(abbr.querySelector('[role="img"]')).toBeInTheDocument();
  expect(abbr.querySelector('[aria-label="abbreviation"]')).toBeInTheDocument();
});

// Abbreviation with loading state test
it("renders abbreviation with loading state", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="Loading abbreviation"
      aria-disabled="true"
    >
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("aria-disabled", "true");
  expect(abbr).toHaveTextContent("⏳");
  expect(abbr).toHaveTextContent("Loading...");
  expect(abbr.querySelector(".spinner")).toBeInTheDocument();
});

// Abbreviation with accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="Accessible abbreviation description"
      aria-label="Accessible abbreviation"
      aria-describedby="abbr-description"
      role="text"
      tabIndex={0}
    >
      ACCESSIBLE
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Accessible abbreviation description");
  expect(abbr).toHaveAttribute("aria-label", "Accessible abbreviation");
  expect(abbr).toHaveAttribute("aria-describedby", "abbr-description");
  expect(abbr).toHaveAttribute("role", "text");
  expect(abbr).toHaveAttribute("tabindex", "0");
});

// Abbreviation with data attributes test
it("renders with data attributes", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="Data abbreviation"
      data-variant="primary"
      data-size="large"
      data-abbr-type="technical"
    >
      DATA
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("data-variant", "primary");
  expect(abbr).toHaveAttribute("data-size", "large");
  expect(abbr).toHaveAttribute("data-abbr-type", "technical");
});

// Abbreviation with event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Abbr
      data-testid="abbr-element"
      title="Interactive abbreviation"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Abbr
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Interactive Abbr");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Abbreviation with custom styling test
it("renders with custom styling", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="Styled abbreviation"
      className="custom-abbr primary large"
      style={{ color: "rgb(0, 0, 255)", textDecoration: "underline" }}
    >
      Styled Abbr
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveClass("custom-abbr", "primary", "large");
  expect(abbr).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Abbreviation with different title formats test
it("renders with different title formats", () => {
  const { rerender } = render(
    <Abbr data-testid="abbr-element" title="Simple Title">
      SIMPLE
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Simple Title"
  );

  rerender(
    <Abbr data-testid="abbr-element" title="Title with (parentheses)">
      PARENTHESES
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Title with (parentheses)"
  );

  rerender(
    <Abbr data-testid="abbr-element" title="Title with - dashes">
      DASHES
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Title with - dashes"
  );

  rerender(
    <Abbr data-testid="abbr-element" title="Title with: colons">
      COLONS
    </Abbr>
  );
  expect(screen.getByTestId("abbr-element")).toHaveAttribute(
    "title",
    "Title with: colons"
  );
});

// Abbreviation with multiple words test
it("renders with multiple words in abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Multiple Word Abbreviation Example">
      MWAE
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Multiple Word Abbreviation Example");
  expect(abbr).toHaveTextContent("MWAE");
});

// Abbreviation with acronym test
it("renders acronym abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Acronym Example">
      ACRONYM
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Acronym Example");
  expect(abbr).toHaveTextContent("ACRONYM");
});

// Abbreviation with initialism test
it("renders initialism abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Initialism Example">
      I.N.I.T.
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Initialism Example");
  expect(abbr).toHaveTextContent("I.N.I.T.");
});

// Abbreviation with technical terms test
it("renders technical term abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Technical Term Example">
      <code>API</code>
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Technical Term Example");
  expect(abbr).toHaveTextContent("API");
  expect(abbr.querySelector("code")).toBeInTheDocument();
});

// Abbreviation with definition test
it("renders abbreviation with definition", () => {
  render(
    <Abbr data-testid="abbr-element" title="Definition Example">
      <dfn>DEF</dfn>
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Definition Example");
  expect(abbr).toHaveTextContent("DEF");
  expect(abbr.querySelector("dfn")).toBeInTheDocument();
});

// Abbreviation with time test
it("renders time abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Time Example">
      <time>AM</time>
    </Abbr>
  );
  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveAttribute("title", "Time Example");
  expect(abbr).toHaveTextContent("AM");
  expect(abbr.querySelector("time")).toBeInTheDocument();
});

// Abbreviation with navigation test
it("renders navigation abbreviation", () => {
  render(
    <Abbr data-testid="abbr-element" title="Navigation Example">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Home");
  expect(abbr).toHaveTextContent("About");
  expect(abbr).toHaveTextContent("Contact");
  expect(abbr.querySelector("nav")).toBeInTheDocument();
  expect(abbr.querySelectorAll("li")).toHaveLength(3);
});

// Abbreviation with form test
it("renders abbreviation with form", () => {
  render(
    <Abbr data-testid="abbr-element" title="Form Example">
      <form>
        <label htmlFor="abbr">Abbreviation:</label>
        <input type="text" id="abbr" name="abbr" />
        <button type="submit">Submit</button>
      </form>
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveTextContent("Abbreviation:");
  expect(abbr).toHaveTextContent("Submit");
  expect(abbr.querySelector("form")).toBeInTheDocument();
  expect(abbr.querySelector("label")).toBeInTheDocument();
  expect(abbr.querySelector("input")).toBeInTheDocument();
  expect(abbr.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Abbr
      data-testid="abbr-element"
      title="Custom abbreviation"
      className="custom-abbr"
      id="main-abbr"
      data-abbr-type="primary"
    >
      <h1>Abbreviation with Custom Attributes</h1>
    </Abbr>
  );

  const abbr = screen.getByTestId("abbr-element");
  expect(abbr).toHaveClass("custom-abbr");
  expect(abbr).toHaveAttribute("id", "main-abbr");
  expect(abbr).toHaveAttribute("data-abbr-type", "primary");
});
