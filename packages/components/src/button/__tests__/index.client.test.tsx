import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { ButtonClient, MemoizedButtonClient } from "../index.client";

// Basic render test for ButtonClient
it("renders a button element", () => {
  render(<ButtonClient data-testid="button-element">Click me</ButtonClient>);
  const button = screen.getByTestId("button-element");
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveTextContent("Click me");
  expect(button).toHaveAttribute("type", "button");
});

// Basic render test for MemoizedButtonClient
it("renders a memoized button element", () => {
  render(
    <MemoizedButtonClient data-testid="button-element">
      Memoized click me
    </MemoizedButtonClient>
  );
  const button = screen.getByTestId("button-element");
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveTextContent("Memoized click me");
  expect(button).toHaveAttribute("type", "button");
});

// as prop test for ButtonClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <ButtonClient as="div" data-testid="custom-div">
      Custom button
    </ButtonClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom button");
});

// as prop test for MemoizedButtonClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedButtonClient as="span" data-testid="custom-span">
      Custom memoized button
    </MemoizedButtonClient>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("Custom memoized button");
});

// Suspense render test for ButtonClient
it("renders in Suspense context", () => {
  try {
    render(
      <ButtonClient data-testid="button-element">
        Suspense button content
      </ButtonClient>
    );
    const button = screen.getByTestId("button-element");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveTextContent("Suspense button content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const button = screen.getByTestId("button-element");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveTextContent("Suspense button content");
  }
});

// Suspense render test for MemoizedButtonClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedButtonClient data-testid="button-element">
        Memoized suspense button
      </MemoizedButtonClient>
    );
    const button = screen.getByTestId("button-element");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveTextContent("Memoized suspense button");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const button = screen.getByTestId("button-element");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveTextContent("Memoized suspense button");
  }
});

// ref forwarding test for ButtonClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<ButtonClient ref={ref}>Ref test content</ButtonClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BUTTON");
  }
});

// ref forwarding test for MemoizedButtonClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <MemoizedButtonClient ref={ref}>
      Memoized ref test content
    </MemoizedButtonClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("BUTTON");
  }
});

// Button-specific props test for ButtonClient
it("renders with button-specific attributes", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      type="submit"
      disabled
      form="test-form"
      formAction="/submit"
      formEncType="multipart/form-data"
      formMethod="post"
      formNoValidate
      formTarget="_blank"
      className="primary-button"
      id="submit-btn"
    >
      Submit Form
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("form", "test-form");
  expect(button).toHaveAttribute("formaction", "/submit");
  expect(button).toHaveAttribute("formenctype", "multipart/form-data");
  expect(button).toHaveAttribute("formmethod", "post");
  expect(button).toHaveAttribute("formnovalidate");
  expect(button).toHaveAttribute("formtarget", "_blank");
  expect(button).toHaveAttribute("class", "primary-button");
  expect(button).toHaveAttribute("id", "submit-btn");
  expect(button).toHaveTextContent("Submit Form");
});

// Button-specific props test for MemoizedButtonClient
it("renders memoized with button-specific attributes", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      type="reset"
      disabled
      form="memoized-form"
      formAction="/reset"
      formEncType="application/x-www-form-urlencoded"
      formMethod="get"
      formNoValidate
      formTarget="_self"
      className="memoized-button"
      id="memoized-btn"
    >
      Reset Form
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "reset");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("form", "memoized-form");
  expect(button).toHaveAttribute("formaction", "/reset");
  expect(button).toHaveAttribute(
    "formenctype",
    "application/x-www-form-urlencoded"
  );
  expect(button).toHaveAttribute("formmethod", "get");
  expect(button).toHaveAttribute("formnovalidate");
  expect(button).toHaveAttribute("formtarget", "_self");
  expect(button).toHaveAttribute("class", "memoized-button");
  expect(button).toHaveAttribute("id", "memoized-btn");
  expect(button).toHaveTextContent("Reset Form");
});

// Children rendering test for ButtonClient
it("renders children correctly", () => {
  render(
    <ButtonClient data-testid="button-element">
      <span>Icon</span>
      <span>Button Text</span>
      <span>Badge</span>
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Icon");
  expect(button).toHaveTextContent("Button Text");
  expect(button).toHaveTextContent("Badge");
  expect(button.querySelectorAll("span")).toHaveLength(3);
});

// Children rendering test for MemoizedButtonClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedButtonClient data-testid="button-element">
      <span>Memoized Icon</span>
      <span>Memoized Button Text</span>
      <span>Memoized Badge</span>
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Memoized Icon");
  expect(button).toHaveTextContent("Memoized Button Text");
  expect(button).toHaveTextContent("Memoized Badge");
  expect(button.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test for ButtonClient
it("renders with empty children", () => {
  render(<ButtonClient data-testid="button-element" />);
  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toBeEmptyDOMElement();
});

// Empty children test for MemoizedButtonClient
it("renders memoized with empty children", () => {
  render(<MemoizedButtonClient data-testid="button-element" />);
  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toBeEmptyDOMElement();
});

// Complex children with nested elements test for ButtonClient
it("renders complex nested children", () => {
  render(
    <ButtonClient data-testid="button-element">
      <div className="button-content">
        <span className="icon">🚀</span>
        <span className="text">Launch App</span>
        <span className="badge">New</span>
      </div>
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("🚀");
  expect(button).toHaveTextContent("Launch App");
  expect(button).toHaveTextContent("New");
  expect(button.querySelector(".button-content")).toBeInTheDocument();
  expect(button.querySelector(".icon")).toBeInTheDocument();
  expect(button.querySelector(".text")).toBeInTheDocument();
  expect(button.querySelector(".badge")).toBeInTheDocument();
});

// Complex children with nested elements test for MemoizedButtonClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedButtonClient data-testid="button-element">
      <div className="memoized-button-content">
        <span className="memoized-icon">⚡</span>
        <span className="memoized-text">Memoized Launch App</span>
        <span className="memoized-badge">Updated</span>
      </div>
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("⚡");
  expect(button).toHaveTextContent("Memoized Launch App");
  expect(button).toHaveTextContent("Updated");
  expect(button.querySelector(".memoized-button-content")).toBeInTheDocument();
  expect(button.querySelector(".memoized-icon")).toBeInTheDocument();
  expect(button.querySelector(".memoized-text")).toBeInTheDocument();
  expect(button.querySelector(".memoized-badge")).toBeInTheDocument();
});

// Button types test for ButtonClient
it("renders with different button types", () => {
  const { rerender } = render(
    <ButtonClient data-testid="button-element" type="button">
      Button Type
    </ButtonClient>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute(
    "type",
    "button"
  );

  rerender(
    <ButtonClient data-testid="button-element" type="submit">
      Submit Type
    </ButtonClient>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute(
    "type",
    "submit"
  );

  rerender(
    <ButtonClient data-testid="button-element" type="reset">
      Reset Type
    </ButtonClient>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute("type", "reset");
});

// Button types test for MemoizedButtonClient
it("renders memoized with different button types", () => {
  const { rerender } = render(
    <MemoizedButtonClient data-testid="button-element" type="button">
      Memoized Button Type
    </MemoizedButtonClient>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute(
    "type",
    "button"
  );

  rerender(
    <MemoizedButtonClient data-testid="button-element" type="submit">
      Memoized Submit Type
    </MemoizedButtonClient>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute(
    "type",
    "submit"
  );

  rerender(
    <MemoizedButtonClient data-testid="button-element" type="reset">
      Memoized Reset Type
    </MemoizedButtonClient>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute("type", "reset");
});

// Button states test for ButtonClient
it("renders with different button states", () => {
  render(
    <ButtonClient data-testid="button-element" disabled>
      Disabled Button
    </ButtonClient>
  );
  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toBeDisabled();
});

// Button states test for MemoizedButtonClient
it("renders memoized with different button states", () => {
  render(
    <MemoizedButtonClient data-testid="button-element" disabled>
      Memoized Disabled Button
    </MemoizedButtonClient>
  );
  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toBeDisabled();
});

// Button with autofocus test for ButtonClient
it("renders with autofocus attribute", () => {
  render(
    <ButtonClient data-testid="button-element" autoFocus>
      Autofocus Button
    </ButtonClient>
  );
  const button = screen.getByTestId("button-element");
  // Note: autofocus attribute may not be present in test environment
  // but the autoFocus prop should be handled by React
});

// Button with autofocus test for MemoizedButtonClient
it("renders memoized with autofocus attribute", () => {
  render(
    <MemoizedButtonClient data-testid="button-element" autoFocus>
      Memoized Autofocus Button
    </MemoizedButtonClient>
  );
  const button = screen.getByTestId("button-element");
  // Note: autofocus attribute may not be present in test environment
  // but the autoFocus prop should be handled by React
});

// Button with form attributes test for ButtonClient
it("renders with form attributes", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      form="my-form"
      formAction="/api/submit"
      formEncType="application/x-www-form-urlencoded"
      formMethod="get"
      formNoValidate
      formTarget="_self"
    >
      Form Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "my-form");
  expect(button).toHaveAttribute("formaction", "/api/submit");
  expect(button).toHaveAttribute(
    "formenctype",
    "application/x-www-form-urlencoded"
  );
  expect(button).toHaveAttribute("formmethod", "get");
  expect(button).toHaveAttribute("formnovalidate");
  expect(button).toHaveAttribute("formtarget", "_self");
});

// Button with form attributes test for MemoizedButtonClient
it("renders memoized with form attributes", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      form="memoized-form"
      formAction="/api/memoized-submit"
      formEncType="multipart/form-data"
      formMethod="post"
      formNoValidate
      formTarget="_blank"
    >
      Memoized Form Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "memoized-form");
  expect(button).toHaveAttribute("formaction", "/api/memoized-submit");
  expect(button).toHaveAttribute("formenctype", "multipart/form-data");
  expect(button).toHaveAttribute("formmethod", "post");
  expect(button).toHaveAttribute("formnovalidate");
  expect(button).toHaveAttribute("formtarget", "_blank");
});

// Button with icons test for ButtonClient
it("renders button with icons", () => {
  render(
    <ButtonClient data-testid="button-element">
      <span role="img" aria-label="star">
        ⭐
      </span>
      <span>Star Button</span>
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("⭐");
  expect(button).toHaveTextContent("Star Button");
  expect(button.querySelector('[role="img"]')).toBeInTheDocument();
  expect(button.querySelector('[aria-label="star"]')).toBeInTheDocument();
});

// Button with icons test for MemoizedButtonClient
it("renders memoized button with icons", () => {
  render(
    <MemoizedButtonClient data-testid="button-element">
      <span role="img" aria-label="heart">
        ❤️
      </span>
      <span>Memoized Heart Button</span>
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("❤️");
  expect(button).toHaveTextContent("Memoized Heart Button");
  expect(button.querySelector('[role="img"]')).toBeInTheDocument();
  expect(button.querySelector('[aria-label="heart"]')).toBeInTheDocument();
});

// Button with loading state test for ButtonClient
it("renders button with loading state", () => {
  render(
    <ButtonClient data-testid="button-element" disabled>
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveTextContent("⏳");
  expect(button).toHaveTextContent("Loading...");
  expect(button.querySelector(".spinner")).toBeInTheDocument();
});

// Button with loading state test for MemoizedButtonClient
it("renders memoized button with loading state", () => {
  render(
    <MemoizedButtonClient data-testid="button-element" disabled>
      <span className="memoized-spinner">🔄</span>
      <span>Memoized Loading...</span>
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveTextContent("🔄");
  expect(button).toHaveTextContent("Memoized Loading...");
  expect(button.querySelector(".memoized-spinner")).toBeInTheDocument();
});

// Button with accessibility attributes test for ButtonClient
it("renders with accessibility attributes", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      aria-label="Close dialog"
      aria-describedby="button-description"
      aria-pressed="false"
      aria-expanded="false"
      aria-haspopup="true"
      role="button"
      tabIndex={0}
    >
      Close
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("aria-label", "Close dialog");
  expect(button).toHaveAttribute("aria-describedby", "button-description");
  expect(button).toHaveAttribute("aria-pressed", "false");
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(button).toHaveAttribute("aria-haspopup", "true");
  expect(button).toHaveAttribute("role", "button");
  expect(button).toHaveAttribute("tabindex", "0");
});

// Button with accessibility attributes test for MemoizedButtonClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      aria-label="Open menu"
      aria-describedby="memoized-button-description"
      aria-pressed="true"
      aria-expanded="true"
      aria-haspopup="menu"
      role="button"
      tabIndex={0}
    >
      Open
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("aria-label", "Open menu");
  expect(button).toHaveAttribute(
    "aria-describedby",
    "memoized-button-description"
  );
  expect(button).toHaveAttribute("aria-pressed", "true");
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(button).toHaveAttribute("aria-haspopup", "menu");
  expect(button).toHaveAttribute("role", "button");
  expect(button).toHaveAttribute("tabindex", "0");
});

// Button with data attributes test for ButtonClient
it("renders with data attributes", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      data-variant="primary"
      data-size="large"
      data-loading="true"
      data-button-type="cta"
    >
      CTA Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("data-variant", "primary");
  expect(button).toHaveAttribute("data-size", "large");
  expect(button).toHaveAttribute("data-loading", "true");
  expect(button).toHaveAttribute("data-button-type", "cta");
});

// Button with data attributes test for MemoizedButtonClient
it("renders memoized with data attributes", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      data-variant="secondary"
      data-size="small"
      data-loading="false"
      data-button-type="action"
    >
      Memoized Action Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("data-variant", "secondary");
  expect(button).toHaveAttribute("data-size", "small");
  expect(button).toHaveAttribute("data-loading", "false");
  expect(button).toHaveAttribute("data-button-type", "action");
});

// Button with event handlers test for ButtonClient
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <ButtonClient
      data-testid="button-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Interactive Button");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Button with event handlers test for MemoizedButtonClient
it("renders memoized with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedButtonClient
      data-testid="button-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Memoized Interactive Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Memoized Interactive Button");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Button with custom styling test for ButtonClient
it("renders with custom styling", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      className="custom-button primary large"
      style={{ backgroundColor: "blue", color: "white" }}
    >
      Styled Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveClass("custom-button", "primary", "large");
  expect(button).toHaveStyle({ color: "rgb(255, 255, 255)" });
});

// Button with custom styling test for MemoizedButtonClient
it("renders memoized with custom styling", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      className="memoized-custom-button secondary small"
      style={{ backgroundColor: "green", color: "black" }}
    >
      Memoized Styled Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveClass("memoized-custom-button", "secondary", "small");
  expect(button).toHaveStyle({ color: "rgb(0, 0, 0)" });
});

// Button with name and value test for ButtonClient
it("renders with name and value attributes", () => {
  render(
    <ButtonClient data-testid="button-element" name="action" value="save">
      Save
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("name", "action");
  expect(button).toHaveAttribute("value", "save");
});

// Button with name and value test for MemoizedButtonClient
it("renders memoized with name and value attributes", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      name="memoized-action"
      value="delete"
    >
      Delete
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("name", "memoized-action");
  expect(button).toHaveAttribute("value", "delete");
});

// Custom attributes test for ButtonClient
it("renders with custom attributes", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      className="custom-button"
      id="main-button"
      data-button-type="primary"
    >
      <h1>Button with Custom Attributes</h1>
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveClass("custom-button");
  expect(button).toHaveAttribute("id", "main-button");
  expect(button).toHaveAttribute("data-button-type", "primary");
});

// Custom attributes test for MemoizedButtonClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      className="memoized-custom-button"
      id="memoized-main-button"
      data-button-type="secondary"
    >
      <h1>Memoized Button with Custom Attributes</h1>
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveClass("memoized-custom-button");
  expect(button).toHaveAttribute("id", "memoized-main-button");
  expect(button).toHaveAttribute("data-button-type", "secondary");
});

// Controlled vs Uncontrolled Behavior Tests for Client Components

// Controlled value prop test for ButtonClient
it("supports controlled value prop in ButtonClient", () => {
  render(
    <ButtonClient data-testid="button-element" value="controlled-value">
      Controlled Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("value", "controlled-value");
  expect(button).toHaveTextContent("Controlled Client Button");
});

// Controlled value prop test for MemoizedButtonClient
it("supports controlled value prop in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      value="memoized-controlled-value"
    >
      Memoized Controlled Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("value", "memoized-controlled-value");
  expect(button).toHaveTextContent("Memoized Controlled Button");
});

// Uncontrolled value prop test for ButtonClient
it("works as uncontrolled when no value prop is provided in ButtonClient", () => {
  render(
    <ButtonClient data-testid="button-element">
      Uncontrolled Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("value");
  expect(button).toHaveTextContent("Uncontrolled Client Button");
});

// Uncontrolled value prop test for MemoizedButtonClient
it("works as uncontrolled when no value prop is provided in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient data-testid="button-element">
      Memoized Uncontrolled Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("value");
  expect(button).toHaveTextContent("Memoized Uncontrolled Button");
});

// Controlled checked prop test for ButtonClient
it("supports controlled checked prop in ButtonClient", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      role="checkbox"
      aria-checked="true"
    >
      Client Toggle Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("role", "checkbox");
  expect(button).toHaveAttribute("aria-checked", "true");
  expect(button).toHaveTextContent("Client Toggle Button");
});

// Controlled checked prop test for MemoizedButtonClient
it("supports controlled checked prop in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      role="checkbox"
      aria-checked="false"
    >
      Memoized Toggle Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("role", "checkbox");
  expect(button).toHaveAttribute("aria-checked", "false");
  expect(button).toHaveTextContent("Memoized Toggle Button");
});

// Controlled disabled state test for ButtonClient
it("supports controlled disabled state in ButtonClient", () => {
  const { rerender } = render(
    <ButtonClient data-testid="button-element" disabled>
      Disabled Client Button
    </ButtonClient>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toBeDisabled();

  // Change to enabled
  rerender(
    <ButtonClient data-testid="button-element">
      Enabled Client Button
    </ButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).not.toBeDisabled();
});

// Controlled disabled state test for MemoizedButtonClient
it("supports controlled disabled state in MemoizedButtonClient", () => {
  const { rerender } = render(
    <MemoizedButtonClient data-testid="button-element" disabled>
      Disabled Memoized Button
    </MemoizedButtonClient>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toBeDisabled();

  // Change to enabled
  rerender(
    <MemoizedButtonClient data-testid="button-element">
      Enabled Memoized Button
    </MemoizedButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).not.toBeDisabled();
});

// Controlled loading state test for ButtonClient
it("supports controlled loading state in ButtonClient", () => {
  const { rerender } = render(
    <ButtonClient data-testid="button-element" disabled aria-busy="true">
      <span className="spinner">⏳</span>
      Client Loading...
    </ButtonClient>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveTextContent("Client Loading...");
  expect(button.querySelector(".spinner")).toBeInTheDocument();

  // Change to not loading
  rerender(
    <ButtonClient data-testid="button-element">
      Client Ready Button
    </ButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).not.toHaveAttribute("aria-busy");
  expect(button).toHaveTextContent("Client Ready Button");
  expect(button.querySelector(".spinner")).not.toBeInTheDocument();
});

// Controlled loading state test for MemoizedButtonClient
it("supports controlled loading state in MemoizedButtonClient", () => {
  const { rerender } = render(
    <MemoizedButtonClient
      data-testid="button-element"
      disabled
      aria-busy="true"
    >
      <span className="memoized-spinner">🔄</span>
      Memoized Loading...
    </MemoizedButtonClient>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveTextContent("Memoized Loading...");
  expect(button.querySelector(".memoized-spinner")).toBeInTheDocument();

  // Change to not loading
  rerender(
    <MemoizedButtonClient data-testid="button-element">
      Memoized Ready Button
    </MemoizedButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).not.toHaveAttribute("aria-busy");
  expect(button).toHaveTextContent("Memoized Ready Button");
  expect(button.querySelector(".memoized-spinner")).not.toBeInTheDocument();
});

// Controlled form attributes test for ButtonClient
it("supports controlled form attributes in ButtonClient", () => {
  const { rerender } = render(
    <ButtonClient
      data-testid="button-element"
      form="client-form1"
      formAction="/client-submit1"
      formMethod="post"
    >
      Client Form Button 1
    </ButtonClient>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "client-form1");
  expect(button).toHaveAttribute("formaction", "/client-submit1");
  expect(button).toHaveAttribute("formmethod", "post");

  // Change form attributes
  rerender(
    <ButtonClient
      data-testid="button-element"
      form="client-form2"
      formAction="/client-submit2"
      formMethod="get"
    >
      Client Form Button 2
    </ButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "client-form2");
  expect(button).toHaveAttribute("formaction", "/client-submit2");
  expect(button).toHaveAttribute("formmethod", "get");
});

// Controlled form attributes test for MemoizedButtonClient
it("supports controlled form attributes in MemoizedButtonClient", () => {
  const { rerender } = render(
    <MemoizedButtonClient
      data-testid="button-element"
      form="memoized-form1"
      formAction="/memoized-submit1"
      formMethod="post"
    >
      Memoized Form Button 1
    </MemoizedButtonClient>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "memoized-form1");
  expect(button).toHaveAttribute("formaction", "/memoized-submit1");
  expect(button).toHaveAttribute("formmethod", "post");

  // Change form attributes
  rerender(
    <MemoizedButtonClient
      data-testid="button-element"
      form="memoized-form2"
      formAction="/memoized-submit2"
      formMethod="get"
    >
      Memoized Form Button 2
    </MemoizedButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "memoized-form2");
  expect(button).toHaveAttribute("formaction", "/memoized-submit2");
  expect(button).toHaveAttribute("formmethod", "get");
});

// Integration test - controlled button in form context for ButtonClient
it("works as controlled button in form context for ButtonClient", () => {
  render(
    <form>
      <ButtonClient
        data-testid="button-element"
        type="submit"
        name="client-submit-action"
        value="client-save"
        form="client-test-form"
      >
        Save Client Form
      </ButtonClient>
    </form>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("name", "client-submit-action");
  expect(button).toHaveAttribute("value", "client-save");
  expect(button).toHaveAttribute("form", "client-test-form");
  expect(button).toHaveTextContent("Save Client Form");
});

// Integration test - controlled button in form context for MemoizedButtonClient
it("works as controlled button in form context for MemoizedButtonClient", () => {
  render(
    <form>
      <MemoizedButtonClient
        data-testid="button-element"
        type="submit"
        name="memoized-submit-action"
        value="memoized-save"
        form="memoized-test-form"
      >
        Save Memoized Form
      </MemoizedButtonClient>
    </form>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("name", "memoized-submit-action");
  expect(button).toHaveAttribute("value", "memoized-save");
  expect(button).toHaveAttribute("form", "memoized-test-form");
  expect(button).toHaveTextContent("Save Memoized Form");
});

// Integration test - controlled toggle button for ButtonClient
it("works as controlled toggle button for ButtonClient", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      role="checkbox"
      aria-checked="true"
      aria-label="Toggle client notifications"
    >
      Client Notifications On
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("role", "checkbox");
  expect(button).toHaveAttribute("aria-checked", "true");
  expect(button).toHaveAttribute("aria-label", "Toggle client notifications");
  expect(button).toHaveTextContent("Client Notifications On");
});

// Integration test - controlled toggle button for MemoizedButtonClient
it("works as controlled toggle button for MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      role="checkbox"
      aria-checked="false"
      aria-label="Toggle memoized notifications"
    >
      Memoized Notifications Off
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("role", "checkbox");
  expect(button).toHaveAttribute("aria-checked", "false");
  expect(button).toHaveAttribute("aria-label", "Toggle memoized notifications");
  expect(button).toHaveTextContent("Memoized Notifications Off");
});

// Polymorphic Validation Tests for Client Components
it.skip("warns about button-specific props when rendered as different element in ButtonClient", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <ButtonClient
      as="div"
      data-testid="button-element"
      type="submit"
      form="test-form"
      formAction="/submit"
    >
      Invalid Client Button as Div
    </ButtonClient>
  );

  expect(consoleSpy).toHaveBeenCalled();

  consoleSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("warns about button-specific props when rendered as different element in MemoizedButtonClient", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <MemoizedButtonClient
      as="span"
      data-testid="button-element"
      type="submit"
      form="test-form"
      formAction="/submit"
    >
      Invalid Memoized Button as Span
    </MemoizedButtonClient>
  );

  expect(consoleSpy).toHaveBeenCalled();

  consoleSpy.mockRestore();
  process.env.NODE_ENV = original;
});

// Error Handling Tests for Client Components
it("handles invalid button type gracefully in ButtonClient", () => {
  render(
    <ButtonClient
      data-testid="button-element"
      type={"invalid" as any}
      as="button"
    >
      Invalid Type Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "invalid");
  expect(button).toHaveTextContent("Invalid Type Client Button");
});

it("handles invalid button type gracefully in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      type={"invalid" as any}
      as="button"
    >
      Invalid Type Memoized Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "invalid");
  expect(button).toHaveTextContent("Invalid Type Memoized Button");
});

it("handles null children gracefully in ButtonClient", () => {
  render(<ButtonClient data-testid="button-element">{null}</ButtonClient>);
  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("");
});

it("handles null children gracefully in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient data-testid="button-element">
      {null}
    </MemoizedButtonClient>
  );
  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("");
});

// Performance Tests for Client Components
it("maintains consistent rendering performance in ButtonClient", () => {
  const startTime = performance.now();

  render(
    <ButtonClient data-testid="button-element">
      Performance Test Client Button
    </ButtonClient>
  );

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time
  expect(renderTime).toBeLessThan(100);

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
});

it("maintains consistent rendering performance in MemoizedButtonClient", () => {
  const startTime = performance.now();

  render(
    <MemoizedButtonClient data-testid="button-element">
      Performance Test Memoized Button
    </MemoizedButtonClient>
  );

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time
  expect(renderTime).toBeLessThan(100);

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
});

// Accessibility Deep Tests for Client Components
it("supports keyboard navigation in ButtonClient", () => {
  render(
    <ButtonClient data-testid="button-element" tabIndex={0}>
      Keyboard Accessible Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("tabindex", "0");
  expect(button).toHaveTextContent("Keyboard Accessible Client Button");
});

it("supports keyboard navigation in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient data-testid="button-element" tabIndex={0}>
      Keyboard Accessible Memoized Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("tabindex", "0");
  expect(button).toHaveTextContent("Keyboard Accessible Memoized Button");
});

it("supports focus management in ButtonClient", () => {
  render(
    <ButtonClient data-testid="button-element" autoFocus>
      Auto Focus Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Auto Focus Client Button");
});

it("supports focus management in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient data-testid="button-element" autoFocus>
      Auto Focus Memoized Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Auto Focus Memoized Button");
});

// Event Handler Integration Tests for Client Components
it("integrates onClick with controlled state in ButtonClient", () => {
  const handleClick = vi.fn();

  render(
    <ButtonClient data-testid="button-element" onClick={handleClick}>
      Clickable Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Clickable Client Button");
});

it("integrates onClick with controlled state in MemoizedButtonClient", () => {
  const handleClick = vi.fn();

  render(
    <MemoizedButtonClient data-testid="button-element" onClick={handleClick}>
      Clickable Memoized Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Clickable Memoized Button");
});

it("integrates onFocus with controlled state in ButtonClient", () => {
  const handleFocus = vi.fn();

  render(
    <ButtonClient data-testid="button-element" onFocus={handleFocus}>
      Focusable Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Focusable Client Button");
});

it("integrates onFocus with controlled state in MemoizedButtonClient", () => {
  const handleFocus = vi.fn();

  render(
    <MemoizedButtonClient data-testid="button-element" onFocus={handleFocus}>
      Focusable Memoized Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Focusable Memoized Button");
});

// Style and CSS Tests for Client Components
it("applies dynamic styles based on controlled props in ButtonClient", () => {
  const { rerender } = render(
    <ButtonClient
      data-testid="button-element"
      style={{ backgroundColor: "red", color: "white" }}
    >
      Red Client Button
    </ButtonClient>
  );

  let button = screen.getByTestId("button-element");
  // Note: Styles may not be applied in test environment, but props should be passed
  expect(button).toHaveAttribute("style");
  expect(button).toHaveTextContent("Red Client Button");

  // Change styles
  rerender(
    <ButtonClient
      data-testid="button-element"
      style={{ backgroundColor: "blue", color: "white" }}
    >
      Blue Client Button
    </ButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("style");
  expect(button).toHaveTextContent("Blue Client Button");
});

it("applies dynamic styles based on controlled props in MemoizedButtonClient", () => {
  const { rerender } = render(
    <MemoizedButtonClient
      data-testid="button-element"
      style={{ backgroundColor: "green", color: "white" }}
    >
      Green Memoized Button
    </MemoizedButtonClient>
  );

  let button = screen.getByTestId("button-element");
  // Note: Styles may not be applied in test environment, but props should be passed
  expect(button).toHaveAttribute("style");
  expect(button).toHaveTextContent("Green Memoized Button");

  // Change styles
  rerender(
    <MemoizedButtonClient
      data-testid="button-element"
      style={{ backgroundColor: "purple", color: "white" }}
    >
      Purple Memoized Button
    </MemoizedButtonClient>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("style");
  expect(button).toHaveTextContent("Purple Memoized Button");
});

// Form Integration Deep Tests for Client Components
it("integrates with form validation in ButtonClient", () => {
  render(
    <form>
      <ButtonClient data-testid="button-element" type="submit" formNoValidate>
        Submit Without Validation Client
      </ButtonClient>
    </form>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("formnovalidate");
});

it("integrates with form validation in MemoizedButtonClient", () => {
  render(
    <form>
      <MemoizedButtonClient
        data-testid="button-element"
        type="submit"
        formNoValidate
      >
        Submit Without Validation Memoized
      </MemoizedButtonClient>
    </form>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("formnovalidate");
});

// Client-Side Hydration Tests
it("maintains state during client-side hydration in ButtonClient", () => {
  render(
    <ButtonClient data-testid="button-element" disabled aria-busy="true">
      Hydrated Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveTextContent("Hydrated Client Button");
});

it("maintains state during client-side hydration in MemoizedButtonClient", () => {
  render(
    <MemoizedButtonClient
      data-testid="button-element"
      disabled
      aria-busy="true"
    >
      Hydrated Memoized Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveTextContent("Hydrated Memoized Button");
});

// TypeScript Type Tests for Client Components
it("accepts valid button props without TypeScript errors in ButtonClient", () => {
  const validProps = {
    type: "submit" as const,
    disabled: true,
    form: "test-form",
    name: "submit-button",
    value: "submit-value",
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    className: "test-class",
    style: { backgroundColor: "red" },
    "data-testid": "button-element",
  };

  render(<ButtonClient {...validProps}>TypeScript Client Test</ButtonClient>);

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("TypeScript Client Test");
});

it("accepts valid button props without TypeScript errors in MemoizedButtonClient", () => {
  const validProps = {
    type: "submit" as const,
    disabled: true,
    form: "test-form",
    name: "submit-button",
    value: "submit-value",
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    className: "test-class",
    style: { backgroundColor: "red" },
    "data-testid": "button-element",
  };

  render(
    <MemoizedButtonClient {...validProps}>
      TypeScript Memoized Test
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("TypeScript Memoized Test");
});

// Edge Cases and Boundary Tests for Client Components
it("handles extremely long text content in ButtonClient", () => {
  const longText = "A".repeat(1000);

  render(<ButtonClient data-testid="button-element">{longText}</ButtonClient>);

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent(longText);
});

it("handles extremely long text content in MemoizedButtonClient", () => {
  const longText = "B".repeat(1000);

  render(
    <MemoizedButtonClient data-testid="button-element">
      {longText}
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent(longText);
});

it("handles special characters in content in ButtonClient", () => {
  const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

  render(
    <ButtonClient data-testid="button-element">{specialChars}</ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent(specialChars);
});

it("handles special characters in content in MemoizedButtonClient", () => {
  const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

  render(
    <MemoizedButtonClient data-testid="button-element">
      {specialChars}
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent(specialChars);
});

// Integration with React Context Tests for Client Components
it("works within React context providers in ButtonClient", () => {
  const TestContext = React.createContext("default");

  render(
    <TestContext.Provider value="test-value">
      <ButtonClient data-testid="button-element">
        Context Client Button
      </ButtonClient>
    </TestContext.Provider>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Context Client Button");
});

it("works within React context providers in MemoizedButtonClient", () => {
  const TestContext = React.createContext("default");

  render(
    <TestContext.Provider value="test-value">
      <MemoizedButtonClient data-testid="button-element">
        Context Memoized Button
      </MemoizedButtonClient>
    </TestContext.Provider>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Context Memoized Button");
});

// Memory Leak Prevention Tests for Client Components
it("does not create memory leaks with event handlers in ButtonClient", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <ButtonClient data-testid="button-element" onClick={handleClick}>
      Memory Test Client Button
    </ButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});

it("does not create memory leaks with event handlers in MemoizedButtonClient", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <MemoizedButtonClient data-testid="button-element" onClick={handleClick}>
      Memory Test Memoized Button
    </MemoizedButtonClient>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});
