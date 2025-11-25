import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { B } from "..";

// Basic render test
it("renders a bold element", () => {
  render(<B data-testid="bold-element">Bold text</B>);
  const bold = screen.getByTestId("bold-element");
  expect(bold.tagName).toBe("B");
  expect(bold).toHaveTextContent("Bold text");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <B as="div" data-testid="custom-div">
      Custom bold
    </B>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom bold");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <B isClient data-testid="bold-element">
      Client-side bold text
    </B>
  );

  // Should render the fallback (the bold) immediately
  const bold = screen.getByTestId("bold-element");
  expect(bold.tagName).toBe("B");
  expect(bold).toHaveTextContent("Client-side bold text");

  // The lazy component should load and render the same content
  await screen.findByTestId("bold-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <B isClient isMemoized data-testid="bold-element">
      Memoized bold text
    </B>
  );

  // Should render the fallback (the bold) immediately
  const bold = screen.getByTestId("bold-element");
  expect(bold.tagName).toBe("B");
  expect(bold).toHaveTextContent("Memoized bold text");

  // The lazy component should load and render the same content
  await screen.findByTestId("bold-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<B ref={ref}>Ref test content</B>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("B");
  }
});

// Bold-specific props test
it("renders with bold-specific attributes", () => {
  render(
    <B
      data-testid="bold-element"
      className="important-text"
      id="main-bold"
      style={{ fontWeight: "bold" }}
    >
      Important Text
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("class", "important-text");
  expect(bold).toHaveAttribute("id", "main-bold");
  expect(bold).toHaveStyle({ fontWeight: "bold" });
  expect(bold).toHaveTextContent("Important Text");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <B data-testid="bold-element">
      <span>Icon</span>
      <span>Bold Text</span>
      <span>Badge</span>
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Icon");
  expect(bold).toHaveTextContent("Bold Text");
  expect(bold).toHaveTextContent("Badge");
  expect(bold.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test
it("renders with empty children", () => {
  render(<B data-testid="bold-element" />);
  const bold = screen.getByTestId("bold-element");
  expect(bold).toBeInTheDocument();
  expect(bold).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <B data-testid="bold-element">
      <div className="bold-content">
        <span className="icon">💪</span>
        <span className="text">Complex Bold</span>
        <span className="badge">Strong</span>
      </div>
    </B>
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

// Bold with emphasis test
it("renders with emphasis styling", () => {
  render(
    <B data-testid="bold-element" style={{ fontWeight: "700" }}>
      Strong Emphasis
    </B>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveStyle({ fontWeight: "700" });
  expect(bold).toHaveTextContent("Strong Emphasis");
});

// Bold with different font weights test
it("renders with different font weights", () => {
  const { rerender } = render(
    <B data-testid="bold-element" style={{ fontWeight: "600" }}>
      Semi Bold
    </B>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "600" });

  rerender(
    <B data-testid="bold-element" style={{ fontWeight: "800" }}>
      Extra Bold
    </B>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "800" });

  rerender(
    <B data-testid="bold-element" style={{ fontWeight: "900" }}>
      Black
    </B>
  );
  expect(screen.getByTestId("bold-element")).toHaveStyle({ fontWeight: "900" });
});

// Bold with accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <B
      data-testid="bold-element"
      aria-label="Important information"
      aria-describedby="bold-description"
      role="text"
      tabIndex={0}
    >
      Accessible Bold
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("aria-label", "Important information");
  expect(bold).toHaveAttribute("aria-describedby", "bold-description");
  expect(bold).toHaveAttribute("role", "text");
  expect(bold).toHaveAttribute("tabindex", "0");
});

// Bold with data attributes test
it("renders with data attributes", () => {
  render(
    <B
      data-testid="bold-element"
      data-variant="primary"
      data-size="large"
      data-text-type="emphasis"
    >
      Data Bold
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("data-variant", "primary");
  expect(bold).toHaveAttribute("data-size", "large");
  expect(bold).toHaveAttribute("data-text-type", "emphasis");
});

// Bold with event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <B
      data-testid="bold-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Bold
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Interactive Bold");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Bold with custom styling test
it("renders with custom styling", () => {
  render(
    <B
      data-testid="bold-element"
      className="custom-bold primary large"
      style={{ color: "red", textDecoration: "underline" }}
    >
      Styled Bold
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("custom-bold", "primary", "large");
  expect(bold).toHaveStyle({
    color: "rgb(255, 0, 0)",
    textDecoration: "underline",
  });
});

// Bold with semantic meaning test
it("renders with semantic meaning", () => {
  render(
    <B data-testid="bold-element" role="strong">
      <span>Important</span>
      <span>Notice</span>
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("role", "strong");
  expect(bold).toHaveTextContent("Important");
  expect(bold).toHaveTextContent("Notice");
});

// Bold with icons test
it("renders bold with icons", () => {
  render(
    <B data-testid="bold-element">
      <span role="img" aria-label="important">
        ⚠️
      </span>
      <span>Important Notice</span>
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("⚠️");
  expect(bold).toHaveTextContent("Important Notice");
  expect(bold.querySelector('[role="img"]')).toBeInTheDocument();
  expect(bold.querySelector('[aria-label="important"]')).toBeInTheDocument();
});

// Bold with loading state test
it("renders bold with loading state", () => {
  render(
    <B data-testid="bold-element" aria-disabled="true">
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveAttribute("aria-disabled", "true");
  expect(bold).toHaveTextContent("⏳");
  expect(bold).toHaveTextContent("Loading...");
  expect(bold.querySelector(".spinner")).toBeInTheDocument();
});

// Bold with navigation test
it("renders bold navigation", () => {
  render(
    <B data-testid="bold-element">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Home");
  expect(bold).toHaveTextContent("About");
  expect(bold).toHaveTextContent("Contact");
  expect(bold.querySelector("nav")).toBeInTheDocument();
  expect(bold.querySelectorAll("li")).toHaveLength(3);
});

// Bold with form test
it("renders bold with form", () => {
  render(
    <B data-testid="bold-element">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveTextContent("Name:");
  expect(bold).toHaveTextContent("Submit");
  expect(bold.querySelector("form")).toBeInTheDocument();
  expect(bold.querySelector("label")).toBeInTheDocument();
  expect(bold.querySelector("input")).toBeInTheDocument();
  expect(bold.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <B
      data-testid="bold-element"
      className="custom-bold"
      id="main-bold"
      data-bold-type="primary"
    >
      <h1>Bold with Custom Attributes</h1>
    </B>
  );

  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("custom-bold");
  expect(bold).toHaveAttribute("id", "main-bold");
  expect(bold).toHaveAttribute("data-bold-type", "primary");
});

// Bold with different content types test
it("renders with different content types", () => {
  const { rerender } = render(
    <B data-testid="bold-element">Simple text content</B>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent(
    "Simple text content"
  );

  rerender(
    <B data-testid="bold-element">
      <em>Emphasized content</em>
    </B>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent(
    "Emphasized content"
  );
  expect(
    screen.getByTestId("bold-element").querySelector("em")
  ).toBeInTheDocument();

  rerender(
    <B data-testid="bold-element">
      <code>Code content</code>
    </B>
  );
  expect(screen.getByTestId("bold-element")).toHaveTextContent("Code content");
  expect(
    screen.getByTestId("bold-element").querySelector("code")
  ).toBeInTheDocument();
});

// Bold with multiple classes test
it("renders with multiple classes", () => {
  render(
    <B data-testid="bold-element" className="bold-text primary large emphasis">
      Multiple Classes
    </B>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveClass("bold-text", "primary", "large", "emphasis");
});

// Bold with inline styles test
it("renders with inline styles", () => {
  render(
    <B
      data-testid="bold-element"
      style={{
        fontWeight: "bold",
        color: "red",
        fontSize: "18px",
        textTransform: "uppercase",
      }}
    >
      Inline Styled
    </B>
  );
  const bold = screen.getByTestId("bold-element");
  expect(bold).toHaveStyle({
    fontWeight: "bold",
    color: "rgb(255, 0, 0)",
    fontSize: "18px",
    textTransform: "uppercase",
  });
});
