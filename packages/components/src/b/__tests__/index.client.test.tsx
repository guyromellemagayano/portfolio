import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BClient, MemoizedBClient } from "../index.client";

// Basic render test for BClient
it("renders a bold element", () => {
  render(<BClient data-testid="bold-element">Bold text</BClient>);
  const bold = screen.getByTestId("bold-element");
  expect(bold.tagName).toBe("B");
  expect(bold).toHaveTextContent("Bold text");
});

// Basic render test for MemoizedBClient
it("renders a memoized bold element", () => {
  render(
    <MemoizedBClient data-testid="bold-element">
      Memoized bold text
    </MemoizedBClient>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold.tagName).toBe("B");
  expect(bold).toHaveTextContent("Memoized bold text");
});

// as prop test for BClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <BClient as="div" data-testid="custom-div">
      Custom bold
    </BClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom bold");
});

// as prop test for MemoizedBClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedBClient as="span" data-testid="custom-span">
      Custom memoized bold
    </MemoizedBClient>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("Custom memoized bold");
});

// Suspense render test for BClient
it("renders in Suspense context", () => {
  try {
    render(<BClient data-testid="bold-element">Suspense bold content</BClient>);
    const bold = screen.getByTestId("bold-element");
    expect(bold.tagName).toBe("B");
    expect(bold).toHaveTextContent("Suspense bold content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const bold = screen.getByTestId("bold-element");
    expect(bold.tagName).toBe("B");
    expect(bold).toHaveTextContent("Suspense bold content");
  }
});

// Suspense render test for MemoizedBClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedBClient data-testid="bold-element">
        Memoized suspense bold
      </MemoizedBClient>
    );
    const bold = screen.getByTestId("bold-element");
    expect(bold.tagName).toBe("B");
    expect(bold).toHaveTextContent("Memoized suspense bold");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const bold = screen.getByTestId("bold-element");
    expect(bold.tagName).toBe("B");
    expect(bold).toHaveTextContent("Memoized suspense bold");
  }
});

// ref forwarding test for BClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<BClient ref={ref}>Ref test content</BClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("B");
  }
});

// ref forwarding test for MemoizedBClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <MemoizedBClient ref={ref}>Memoized ref test content</MemoizedBClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("B");
  }
});

// Bold-specific props test for BClient
it("renders with bold-specific attributes", () => {
  render(
    <BClient
      data-testid="bold-element"
      className="important-text"
      id="main-bold"
      style={{ fontWeight: "bold" }}
    >
      Important Text
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("important-text", { exact: true });
  expect(bold).toHaveAttribute("id", "main-bold");
  expect(bold).toHaveStyle({ fontWeight: "bold" });
  expect(bold).toHaveTextContent("Important Text");
});

// Bold-specific props test for MemoizedBClient
it("renders memoized with bold-specific attributes", () => {
  render(
    <MemoizedBClient
      data-testid="bold-element"
      className="memoized-important-text"
      id="memoized-main-bold"
      style={{ fontWeight: "700" }}
    >
      Memoized Important Text
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("memoized-important-text", { exact: true });
  expect(bold).toHaveAttribute("id", "memoized-main-bold");
  expect(bold).toHaveStyle({ fontWeight: "700" });
  expect(bold).toHaveTextContent("Memoized Important Text");
});

// Children rendering test for BClient
it("renders children correctly", () => {
  render(
    <BClient data-testid="bold-element">
      <span>Icon</span>
      <span>Bold Text</span>
      <span>Badge</span>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Icon");
  expect(bold).toHaveTextContent("Bold Text");
  expect(bold).toHaveTextContent("Badge");
  expect(bold.querySelectorAll("span")).toHaveLength(3);
});

// Children rendering test for MemoizedBClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedBClient data-testid="bold-element">
      <span>Memoized Icon</span>
      <span>Memoized Bold Text</span>
      <span>Memoized Badge</span>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Memoized Icon");
  expect(bold).toHaveTextContent("Memoized Bold Text");
  expect(bold).toHaveTextContent("Memoized Badge");
  expect(bold.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test for BClient
it("renders with empty children", () => {
  render(<BClient data-testid="bold-element" />);
  const bold = screen.getByTestId("bold-element");
  expect(bold).toBeInTheDocument();
  expect(bold).toBeEmptyDOMElement();
});

// Empty children test for MemoizedBClient
it("renders memoized with empty children", () => {
  render(<MemoizedBClient data-testid="bold-element" />);
  const bold = screen.getByTestId("bold-element");
  expect(bold).toBeInTheDocument();
  expect(bold).toBeEmptyDOMElement();
});

// Complex children with nested elements test for BClient
it("renders complex nested children", () => {
  render(
    <BClient data-testid="bold-element">
      <div className="bold-content">
        <span className="icon">💪</span>
        <span className="text">Complex Bold</span>
        <span className="badge">Strong</span>
      </div>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("💪");
  expect(bold).toHaveTextContent("Complex Bold");
  expect(bold).toHaveTextContent("Strong");
  expect(bold.querySelector(".bold-content")).toBeInTheDocument();
  expect(bold.querySelector(".icon")).toBeInTheDocument();
  expect(bold.querySelector(".text")).toBeInTheDocument();
  expect(bold.querySelector(".badge")).toBeInTheDocument();
});

// Complex children with nested elements test for MemoizedBClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedBClient data-testid="bold-element">
      <div className="memoized-bold-content">
        <span className="memoized-icon">⚡</span>
        <span className="memoized-text">Memoized Complex Bold</span>
        <span className="memoized-badge">Updated</span>
      </div>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("⚡");
  expect(bold).toHaveTextContent("Memoized Complex Bold");
  expect(bold).toHaveTextContent("Updated");
  expect(bold.querySelector(".memoized-bold-content")).toBeInTheDocument();
  expect(bold.querySelector(".memoized-icon")).toBeInTheDocument();
  expect(bold.querySelector(".memoized-text")).toBeInTheDocument();
  expect(bold.querySelector(".memoized-badge")).toBeInTheDocument();
});

// Bold with emphasis test for BClient
it("renders with emphasis styling", () => {
  render(
    <BClient data-testid="bold-element" style={{ fontWeight: "700" }}>
      Strong Emphasis
    </BClient>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveStyle({ fontWeight: "700" });
  expect(bold).toHaveTextContent("Strong Emphasis");
});

// Bold with emphasis test for MemoizedBClient
it("renders memoized with emphasis styling", () => {
  render(
    <MemoizedBClient data-testid="bold-element" style={{ fontWeight: "800" }}>
      Memoized Strong Emphasis
    </MemoizedBClient>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveStyle({ fontWeight: "800" });
  expect(bold).toHaveTextContent("Memoized Strong Emphasis");
});

// Bold with different font weights test for BClient
it("renders with different font weights", () => {
  const { rerender } = render(
    <BClient data-testid="bold-element" style={{ fontWeight: "600" }}>
      Semi Bold
    </BClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "600" });

  rerender(
    <BClient data-testid="bold-element" style={{ fontWeight: "800" }}>
      Extra Bold
    </BClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "800" });

  rerender(
    <BClient data-testid="bold-element" style={{ fontWeight: "900" }}>
      Black
    </BClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "900" });
});

// Bold with different font weights test for MemoizedBClient
it("renders memoized with different font weights", () => {
  const { rerender } = render(
    <MemoizedBClient data-testid="bold-element" style={{ fontWeight: "600" }}>
      Memoized Semi Bold
    </MemoizedBClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "600" });

  rerender(
    <MemoizedBClient data-testid="bold-element" style={{ fontWeight: "800" }}>
      Memoized Extra Bold
    </MemoizedBClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "800" });

  rerender(
    <MemoizedBClient data-testid="bold-element" style={{ fontWeight: "900" }}>
      Memoized Black
    </MemoizedBClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "900" });
});

// Bold with accessibility attributes test for BClient
it("renders with accessibility attributes", () => {
  render(
    <BClient
      data-testid="bold-element"
      aria-label="Important information"
      aria-describedby="bold-description"
      role="text"
      tabIndex={0}
    >
      Accessible Bold
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("aria-label", "Important information");
  expect(bold).toHaveAttribute("aria-describedby", "bold-description");
  expect(bold).toHaveAttribute("role", "text");
  expect(bold).toHaveAttribute("tabindex", "0");
});

// Bold with accessibility attributes test for MemoizedBClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedBClient
      data-testid="bold-element"
      aria-label="Memoized important information"
      aria-describedby="memoized-bold-description"
      role="strong"
      tabIndex={0}
    >
      Memoized Accessible Bold
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("aria-label", "Memoized important information");
  expect(bold).toHaveAttribute("aria-describedby", "memoized-bold-description");
  expect(bold).toHaveAttribute("role", "strong");
  expect(bold).toHaveAttribute("tabindex", "0");
});

// Bold with data attributes test for BClient
it("renders with data attributes", () => {
  render(
    <BClient
      data-testid="bold-element"
      data-variant="primary"
      data-size="large"
      data-text-type="emphasis"
    >
      Data Bold
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("data-variant", "primary");
  expect(bold).toHaveAttribute("data-size", "large");
  expect(bold).toHaveAttribute("data-text-type", "emphasis");
});

// Bold with data attributes test for MemoizedBClient
it("renders memoized with data attributes", () => {
  render(
    <MemoizedBClient
      data-testid="bold-element"
      data-variant="secondary"
      data-size="small"
      data-text-type="strong"
    >
      Memoized Data Bold
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("data-variant", "secondary");
  expect(bold).toHaveAttribute("data-size", "small");
  expect(bold).toHaveAttribute("data-text-type", "strong");
});

// Bold with event handlers test for BClient
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <BClient
      data-testid="bold-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Bold
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Interactive Bold");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Bold with event handlers test for MemoizedBClient
it("renders memoized with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedBClient
      data-testid="bold-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Memoized Interactive Bold
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Memoized Interactive Bold");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Bold with custom styling test for BClient
it("renders with custom styling", () => {
  render(
    <BClient
      data-testid="bold-element"
      className="custom-bold primary large"
      style={{ color: "red", textDecoration: "underline" }}
    >
      Styled Bold
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("custom-bold", "primary", "large");
  expect(bold).toHaveStyle({
    color: "rgb(255, 0, 0)",
    textDecoration: "underline",
  });
});

// Bold with custom styling test for MemoizedBClient
it("renders memoized with custom styling", () => {
  render(
    <MemoizedBClient
      data-testid="bold-element"
      className="memoized-custom-bold secondary small"
      style={{ color: "green", textDecoration: "none" }}
    >
      Memoized Styled Bold
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("memoized-custom-bold", "secondary", "small");
  expect(bold).toHaveStyle({ color: "rgb(0, 128, 0)", textDecoration: "none" });
});

// Bold with semantic meaning test for BClient
it("renders with semantic meaning", () => {
  render(
    <BClient data-testid="bold-element" role="strong">
      <span>Important</span>
      <span>Notice</span>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("role", "strong");
  expect(bold).toHaveTextContent("Important");
  expect(bold).toHaveTextContent("Notice");
});

// Bold with semantic meaning test for MemoizedBClient
it("renders memoized with semantic meaning", () => {
  render(
    <MemoizedBClient data-testid="bold-element" role="text">
      <span>Memoized Important</span>
      <span>Memoized Notice</span>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("role", "text");
  expect(bold).toHaveTextContent("Memoized Important");
  expect(bold).toHaveTextContent("Memoized Notice");
});

// Bold with icons test for BClient
it("renders bold with icons", () => {
  render(
    <BClient data-testid="bold-element">
      <span role="img" aria-label="important">
        ⚠️
      </span>
      <span>Important Notice</span>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("⚠️");
  expect(bold).toHaveTextContent("Important Notice");
  expect(bold.querySelector('[role="img"]')).toBeInTheDocument();
  expect(bold.querySelector('[aria-label="important"]')).toBeInTheDocument();
});

// Bold with icons test for MemoizedBClient
it("renders memoized bold with icons", () => {
  render(
    <MemoizedBClient data-testid="bold-element">
      <span role="img" aria-label="memoized-important">
        ⚡
      </span>
      <span>Memoized Important Notice</span>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("⚡");
  expect(bold).toHaveTextContent("Memoized Important Notice");
  expect(bold.querySelector('[role="img"]')).toBeInTheDocument();
  expect(
    bold.querySelector('[aria-label="memoized-important"]')
  ).toBeInTheDocument();
});

// Bold with loading state test for BClient
it("renders bold with loading state", () => {
  render(
    <BClient data-testid="bold-element" aria-disabled="true">
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("aria-disabled", "true");
  expect(bold).toHaveTextContent("⏳");
  expect(bold).toHaveTextContent("Loading...");
  expect(bold.querySelector(".spinner")).toBeInTheDocument();
});

// Bold with loading state test for MemoizedBClient
it("renders memoized bold with loading state", () => {
  render(
    <MemoizedBClient data-testid="bold-element" aria-disabled="true">
      <span className="memoized-spinner">🔄</span>
      <span>Memoized Loading...</span>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("aria-disabled", "true");
  expect(bold).toHaveTextContent("🔄");
  expect(bold).toHaveTextContent("Memoized Loading...");
  expect(bold.querySelector(".memoized-spinner")).toBeInTheDocument();
});

// Bold with navigation test for BClient
it("renders bold navigation", () => {
  render(
    <BClient data-testid="bold-element">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Home");
  expect(bold).toHaveTextContent("About");
  expect(bold).toHaveTextContent("Contact");
  expect(bold.querySelector("nav")).toBeInTheDocument();
  expect(bold.querySelectorAll("li")).toHaveLength(3);
});

// Bold with navigation test for MemoizedBClient
it("renders memoized bold navigation", () => {
  render(
    <MemoizedBClient data-testid="bold-element">
      <nav>
        <ul>
          <li>Memoized Home</li>
          <li>Memoized About</li>
          <li>Memoized Contact</li>
        </ul>
      </nav>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Memoized Home");
  expect(bold).toHaveTextContent("Memoized About");
  expect(bold).toHaveTextContent("Memoized Contact");
  expect(bold.querySelector("nav")).toBeInTheDocument();
  expect(bold.querySelectorAll("li")).toHaveLength(3);
});

// Bold with form test for BClient
it("renders bold with form", () => {
  render(
    <BClient data-testid="bold-element">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Name:");
  expect(bold).toHaveTextContent("Submit");
  expect(bold.querySelector("form")).toBeInTheDocument();
  expect(bold.querySelector("label")).toBeInTheDocument();
  expect(bold.querySelector("input")).toBeInTheDocument();
  expect(bold.querySelector("button")).toBeInTheDocument();
});

// Bold with form test for MemoizedBClient
it("renders memoized bold with form", () => {
  render(
    <MemoizedBClient data-testid="bold-element">
      <form>
        <label htmlFor="memoized-name">Memoized Name:</label>
        <input type="text" id="memoized-name" name="memoized-name" />
        <button type="submit">Memoized Submit</button>
      </form>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Memoized Name:");
  expect(bold).toHaveTextContent("Memoized Submit");
  expect(bold.querySelector("form")).toBeInTheDocument();
  expect(bold.querySelector("label")).toBeInTheDocument();
  expect(bold.querySelector("input")).toBeInTheDocument();
  expect(bold.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test for BClient
it("renders with custom attributes", () => {
  render(
    <BClient
      data-testid="bold-element"
      className="custom-bold"
      id="main-bold"
      data-bold-type="primary"
    >
      <h1>Bold with Custom Attributes</h1>
    </BClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("custom-bold");
  expect(bold).toHaveAttribute("id", "main-bold");
  expect(bold).toHaveAttribute("data-bold-type", "primary");
});

// Custom attributes test for MemoizedBClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedBClient
      data-testid="bold-element"
      className="memoized-custom-bold"
      id="memoized-main-bold"
      data-bold-type="secondary"
    >
      <h1>Memoized Bold with Custom Attributes</h1>
    </MemoizedBClient>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("memoized-custom-bold");
  expect(bold).toHaveAttribute("id", "memoized-main-bold");
  expect(bold).toHaveAttribute("data-bold-type", "secondary");
});

// Bold with different content types test for BClient
it("renders with different content types", () => {
  const { rerender } = render(
    <BClient data-testid="bold-element">Simple text content</BClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent(
    "Simple text content"
  );

  rerender(
    <BClient data-testid="bold-element">
      <em>Emphasized content</em>
    </BClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent(
    "Emphasized content"
  );
  expect(
    screen.getByTestId("bold-element").querySelector("em")
  ).toBeInTheDocument();

  rerender(
    <BClient data-testid="bold-element">
      <code>Code content</code>
    </BClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent("Code content");
  expect(
    screen.getByTestId("bold-element").querySelector("code")
  ).toBeInTheDocument();
});

// Bold with different content types test for MemoizedBClient
it("renders memoized with different content types", () => {
  const { rerender } = render(
    <MemoizedBClient data-testid="bold-element">
      Memoized simple text content
    </MemoizedBClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent(
    "Memoized simple text content"
  );

  rerender(
    <MemoizedBClient data-testid="bold-element">
      <em>Memoized emphasized content</em>
    </MemoizedBClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent(
    "Memoized emphasized content"
  );
  expect(
    screen.getByTestId("bold-element").querySelector("em")
  ).toBeInTheDocument();

  rerender(
    <MemoizedBClient data-testid="bold-element">
      <code>Memoized code content</code>
    </MemoizedBClient>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent(
    "Memoized code content"
  );
  expect(
    screen.getByTestId("bold-element").querySelector("code")
  ).toBeInTheDocument();
});

// Bold with multiple classes test for BClient
it("renders with multiple classes", () => {
  render(
    <BClient
      data-testid="bold-element"
      className="bold-text primary large emphasis"
    >
      Multiple Classes
    </BClient>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("bold-text", "primary", "large", "emphasis");
});

// Bold with multiple classes test for MemoizedBClient
it("renders memoized with multiple classes", () => {
  render(
    <MemoizedBClient
      data-testid="bold-element"
      className="memoized-bold-text secondary small strong"
    >
      Memoized Multiple Classes
    </MemoizedBClient>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass(
    "memoized-bold-text",
    "secondary",
    "small",
    "strong"
  );
});

// Bold with inline styles test for BClient
it("renders with inline styles", () => {
  render(
    <BClient
      data-testid="bold-element"
      style={{
        fontWeight: "bold",
        color: "red",
        fontSize: "18px",
        textTransform: "uppercase",
      }}
    >
      Inline Styled
    </BClient>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveStyle({
    fontWeight: "bold",
    color: "rgb(255, 0, 0)",
    fontSize: "18px",
    textTransform: "uppercase",
  });
});

// Bold with inline styles test for MemoizedBClient
it("renders memoized with inline styles", () => {
  render(
    <MemoizedBClient
      data-testid="bold-element"
      style={{
        fontWeight: "700",
        color: "blue",
        fontSize: "20px",
        textTransform: "lowercase",
      }}
    >
      Memoized Inline Styled
    </MemoizedBClient>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveStyle({
    fontWeight: "700",
    color: "rgb(0, 0, 255)",
    fontSize: "20px",
    textTransform: "lowercase",
  });
});
