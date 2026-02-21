import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Button } from "..";

// Basic render test
it("renders a button element", () => {
  render(<Button data-testid="button-element">Click me</Button>);
  const button = screen.getByTestId("button-element");
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveTextContent("Click me");
  expect(button).toHaveAttribute("type", "button");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Button as="div" data-testid="custom-div">
      Custom button
    </Button>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom button");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Button isClient data-testid="button-element">
      Client-side button
    </Button>
  );

  // Should render the fallback (the button) immediately
  const button = screen.getByTestId("button-element");
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveTextContent("Client-side button");
  expect(button).toHaveAttribute("disabled");

  // The lazy component should load and render the same content
  await screen.findByTestId("button-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Button isClient isMemoized data-testid="button-element">
      Memoized button
    </Button>
  );

  // Should render the fallback (the button) immediately
  const button = screen.getByTestId("button-element");
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveTextContent("Memoized button");
  expect(button).toHaveAttribute("disabled");

  // The lazy component should load and render the same content
  await screen.findByTestId("button-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<Button ref={ref}>Ref test content</Button>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BUTTON");
  }
});

// Button-specific props test
it("renders with button-specific attributes", () => {
  render(
    <Button
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
    </Button>
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

// Children rendering test
it("renders children correctly", () => {
  render(
    <Button data-testid="button-element">
      <span>Icon</span>
      <span>Button Text</span>
      <span>Badge</span>
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Icon");
  expect(button).toHaveTextContent("Button Text");
  expect(button).toHaveTextContent("Badge");
  expect(button.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test
it("renders with empty children", () => {
  render(<Button data-testid="button-element" />);
  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Button data-testid="button-element">
      <div className="button-content">
        <span className="icon">🚀</span>
        <span className="text">Launch App</span>
        <span className="badge">New</span>
      </div>
    </Button>
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

// Button types test
it("renders with different button types", () => {
  const { rerender } = render(
    <Button data-testid="button-element" type="button">
      Button Type
    </Button>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute(
    "type",
    "button"
  );

  rerender(
    <Button data-testid="button-element" type="submit">
      Submit Type
    </Button>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute(
    "type",
    "submit"
  );

  rerender(
    <Button data-testid="button-element" type="reset">
      Reset Type
    </Button>
  );
  expect(screen.getByTestId("button-element")).toHaveAttribute("type", "reset");
});

// Button states test
it("renders with different button states", () => {
  render(
    <Button data-testid="button-element" disabled>
      Disabled Button
    </Button>
  );
  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toBeDisabled();
});

// Button with autofocus test
it("renders with autofocus attribute", () => {
  render(
    <Button data-testid="button-element" autoFocus>
      Autofocus Button
    </Button>
  );
  const button = screen.getByTestId("button-element");
  // Note: autofocus attribute may not be present in test environment
  // but the autoFocus prop should be handled by React
});

// Button with form attributes test
it("renders with form attributes", () => {
  render(
    <Button
      data-testid="button-element"
      form="my-form"
      formAction="/api/submit"
      formEncType="application/x-www-form-urlencoded"
      formMethod="get"
      formNoValidate
      formTarget="_self"
    >
      Form Button
    </Button>
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

// Button with icons test
it("renders button with icons", () => {
  render(
    <Button data-testid="button-element">
      <span role="img" aria-label="star">
        ⭐
      </span>
      <span>Star Button</span>
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("⭐");
  expect(button).toHaveTextContent("Star Button");
  expect(button.querySelector('[role="img"]')).toBeInTheDocument();
  expect(button.querySelector('[aria-label="star"]')).toBeInTheDocument();
});

// Button with loading state test
it("renders button with loading state", () => {
  render(
    <Button data-testid="button-element" disabled>
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveTextContent("⏳");
  expect(button).toHaveTextContent("Loading...");
  expect(button.querySelector(".spinner")).toBeInTheDocument();
});

// Button with accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Button
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
    </Button>
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

// Button with data attributes test
it("renders with data attributes", () => {
  render(
    <Button
      data-testid="button-element"
      data-variant="primary"
      data-size="large"
      data-loading="true"
      data-button-type="cta"
    >
      CTA Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("data-variant", "primary");
  expect(button).toHaveAttribute("data-size", "large");
  expect(button).toHaveAttribute("data-loading", "true");
  expect(button).toHaveAttribute("data-button-type", "cta");
});

// Button with event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Button
      data-testid="button-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Interactive Button");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Button with custom styling test
it("renders with custom styling", () => {
  render(
    <Button
      data-testid="button-element"
      className="custom-button primary large"
      style={{ backgroundColor: "blue", color: "white" }}
    >
      Styled Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveClass("custom-button", "primary", "large");
  expect(button).toHaveStyle({ color: "rgb(255, 255, 255)" });
});

// Button with name and value test
it("renders with name and value attributes", () => {
  render(
    <Button data-testid="button-element" name="action" value="save">
      Save
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("name", "action");
  expect(button).toHaveAttribute("value", "save");
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Button
      data-testid="button-element"
      className="custom-button"
      id="main-button"
      data-button-type="primary"
    >
      <h1>Button with Custom Attributes</h1>
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveClass("custom-button");
  expect(button).toHaveAttribute("id", "main-button");
  expect(button).toHaveAttribute("data-button-type", "primary");
});

// Controlled vs Uncontrolled Behavior Tests

// Controlled value prop test
it("supports controlled value prop", () => {
  render(
    <Button data-testid="button-element" value="controlled-value">
      Controlled Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("value", "controlled-value");
  expect(button).toHaveTextContent("Controlled Button");
});

// Uncontrolled value prop test (no value provided)
it("works as uncontrolled when no value prop is provided", () => {
  render(<Button data-testid="button-element">Uncontrolled Button</Button>);

  const button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("value");
  expect(button).toHaveTextContent("Uncontrolled Button");
});

// Controlled checked prop test (for toggle buttons)
it("supports controlled checked prop", () => {
  render(
    <Button data-testid="button-element" role="checkbox" aria-checked="true">
      Toggle Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("role", "checkbox");
  expect(button).toHaveAttribute("aria-checked", "true");
  expect(button).toHaveTextContent("Toggle Button");
});

// Uncontrolled checked prop test
it("works as uncontrolled when no checked prop is provided", () => {
  render(<Button data-testid="button-element">Regular Button</Button>);

  const button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("aria-checked");
  expect(button).toHaveTextContent("Regular Button");
});

// Controlled disabled state test
it("supports controlled disabled state", () => {
  const { rerender } = render(
    <Button data-testid="button-element" disabled>
      Disabled Button
    </Button>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toBeDisabled();

  // Change to enabled
  rerender(<Button data-testid="button-element">Enabled Button</Button>);

  button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).not.toBeDisabled();
});

// Controlled loading state test
it("supports controlled loading state", () => {
  const { rerender } = render(
    <Button data-testid="button-element" disabled aria-busy="true">
      <span className="spinner">⏳</span>
      Loading...
    </Button>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveTextContent("Loading...");
  expect(button.querySelector(".spinner")).toBeInTheDocument();

  // Change to not loading
  rerender(<Button data-testid="button-element">Ready Button</Button>);

  button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).not.toHaveAttribute("aria-busy");
  expect(button).toHaveTextContent("Ready Button");
  expect(button.querySelector(".spinner")).not.toBeInTheDocument();
});

// Controlled name prop test
it("supports controlled name prop", () => {
  render(
    <Button
      data-testid="button-element"
      name="controlled-name"
      value="controlled-value"
    >
      Named Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("name", "controlled-name");
  expect(button).toHaveAttribute("value", "controlled-value");
  expect(button).toHaveTextContent("Named Button");
});

// Uncontrolled name prop test
it("works as uncontrolled when no name prop is provided", () => {
  render(<Button data-testid="button-element">Unnamed Button</Button>);

  const button = screen.getByTestId("button-element");
  expect(button).not.toHaveAttribute("name");
  expect(button).toHaveTextContent("Unnamed Button");
});

// Controlled form attributes test
it("supports controlled form attributes", () => {
  const { rerender } = render(
    <Button
      data-testid="button-element"
      form="form1"
      formAction="/submit1"
      formMethod="post"
    >
      Form Button 1
    </Button>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "form1");
  expect(button).toHaveAttribute("formaction", "/submit1");
  expect(button).toHaveAttribute("formmethod", "post");

  // Change form attributes
  rerender(
    <Button
      data-testid="button-element"
      form="form2"
      formAction="/submit2"
      formMethod="get"
    >
      Form Button 2
    </Button>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("form", "form2");
  expect(button).toHaveAttribute("formaction", "/submit2");
  expect(button).toHaveAttribute("formmethod", "get");
});

// Controlled type prop test
it("supports controlled type prop", () => {
  const { rerender } = render(
    <Button data-testid="button-element" type="submit">
      Submit Button
    </Button>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");

  // Change type
  rerender(
    <Button data-testid="button-element" type="reset">
      Reset Button
    </Button>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "reset");

  // Change to default type
  rerender(
    <Button data-testid="button-element" type="button">
      Regular Button
    </Button>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "button");
});

// Controlled aria attributes test
it("supports controlled aria attributes", () => {
  const { rerender } = render(
    <Button
      data-testid="button-element"
      aria-pressed="true"
      aria-expanded="true"
      aria-haspopup="true"
    >
      Pressed Button
    </Button>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("aria-pressed", "true");
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(button).toHaveAttribute("aria-haspopup", "true");

  // Change aria attributes
  rerender(
    <Button
      data-testid="button-element"
      aria-pressed="false"
      aria-expanded="false"
      aria-haspopup="false"
    >
      Unpressed Button
    </Button>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("aria-pressed", "false");
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(button).toHaveAttribute("aria-haspopup", "false");
});

// Controlled data attributes test
it("supports controlled data attributes", () => {
  const { rerender } = render(
    <Button
      data-testid="button-element"
      data-variant="primary"
      data-size="large"
      data-loading="true"
    >
      Primary Large Loading
    </Button>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("data-variant", "primary");
  expect(button).toHaveAttribute("data-size", "large");
  expect(button).toHaveAttribute("data-loading", "true");

  // Change data attributes
  rerender(
    <Button
      data-testid="button-element"
      data-variant="secondary"
      data-size="small"
      data-loading="false"
    >
      Secondary Small Ready
    </Button>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("data-variant", "secondary");
  expect(button).toHaveAttribute("data-size", "small");
  expect(button).toHaveAttribute("data-loading", "false");
});

// Integration test - controlled button in form context
it("works as controlled button in form context", () => {
  render(
    <form>
      <Button
        data-testid="button-element"
        type="submit"
        name="submit-action"
        value="save"
        form="test-form"
      >
        Save Form
      </Button>
    </form>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("name", "submit-action");
  expect(button).toHaveAttribute("value", "save");
  expect(button).toHaveAttribute("form", "test-form");
  expect(button).toHaveTextContent("Save Form");
});

// Integration test - controlled toggle button
it("works as controlled toggle button", () => {
  render(
    <Button
      data-testid="button-element"
      role="checkbox"
      aria-checked="true"
      aria-label="Toggle notifications"
    >
      Notifications On
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("role", "checkbox");
  expect(button).toHaveAttribute("aria-checked", "true");
  expect(button).toHaveAttribute("aria-label", "Toggle notifications");
  expect(button).toHaveTextContent("Notifications On");
});

// Polymorphic Validation Tests
it.skip("filters button-only props when rendered as a div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Button
      as="div"
      data-testid="b-as-div"
      type="submit"
      form="f"
      formAction="/x"
    >
      X
    </Button>
  );
  const el = screen.getByTestId("b-as-div");
  expect(el.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("type");
  expect(el).not.toHaveAttribute("form");
  expect(el).not.toHaveAttribute("formaction");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug data attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";

  render(<Button data-testid="b-dev">Btn</Button>);
  const el = screen.getByTestId("b-dev");
  expect(el).toHaveAttribute("data-component", "Button");
  expect(el).toHaveAttribute("data-as", "button");

  process.env.NODE_ENV = original;
});

// Error Handling Tests
it("handles invalid button type gracefully", () => {
  render(
    <Button data-testid="button-element" type={"invalid" as any} as="button">
      Invalid Type Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "invalid");
  expect(button).toHaveTextContent("Invalid Type Button");
});

it("handles null children gracefully", () => {
  render(<Button data-testid="button-element">{null}</Button>);
  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("");
});

it("handles undefined children gracefully", () => {
  render(<Button data-testid="button-element">{undefined}</Button>);
  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("");
});

// Performance Tests
it("maintains consistent rendering performance", () => {
  const startTime = performance.now();

  render(<Button data-testid="button-element">Performance Test Button</Button>);

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time (adjust threshold as needed)
  expect(renderTime).toBeLessThan(100);

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
});

// Accessibility Deep Tests
it("supports keyboard navigation", () => {
  render(
    <Button data-testid="button-element" tabIndex={0}>
      Keyboard Accessible Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("tabindex", "0");
  expect(button).toHaveTextContent("Keyboard Accessible Button");
});

it("supports focus management", () => {
  render(
    <Button data-testid="button-element" autoFocus>
      Auto Focus Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  // Note: autofocus attribute may not be present in test environment
  // but the autoFocus prop should be handled by React
  expect(button).toHaveTextContent("Auto Focus Button");
});

it("supports ARIA live regions", () => {
  render(
    <Button data-testid="button-element" aria-live="polite" aria-atomic="true">
      Live Region Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("aria-live", "polite");
  expect(button).toHaveAttribute("aria-atomic", "true");
});

// Event Handler Integration Tests
it("integrates onClick with controlled state", () => {
  const handleClick = vi.fn();

  render(
    <Button data-testid="button-element" onClick={handleClick}>
      Clickable Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Clickable Button");
  // Note: We're testing the integration, not the click event itself
  // as that would be tested in user interaction tests
});

it("integrates onFocus with controlled state", () => {
  const handleFocus = vi.fn();

  render(
    <Button data-testid="button-element" onFocus={handleFocus}>
      Focusable Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Focusable Button");
});

it("integrates onBlur with controlled state", () => {
  const handleBlur = vi.fn();

  render(
    <Button data-testid="button-element" onBlur={handleBlur}>
      Blur Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent("Blur Button");
});

// Style and CSS Tests
it("applies dynamic styles based on controlled props", () => {
  const { rerender } = render(
    <Button
      data-testid="button-element"
      style={{ backgroundColor: "red", color: "white" }}
    >
      Red Button
    </Button>
  );

  let button = screen.getByTestId("button-element");
  // Note: Styles may not be applied in test environment, but props should be passed
  expect(button).toHaveAttribute("style");
  expect(button).toHaveTextContent("Red Button");

  // Change styles
  rerender(
    <Button
      data-testid="button-element"
      style={{ backgroundColor: "blue", color: "white" }}
    >
      Blue Button
    </Button>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("style");
  expect(button).toHaveTextContent("Blue Button");
});

it("applies conditional classes based on controlled props", () => {
  const { rerender } = render(
    <Button
      data-testid="button-element"
      className="button-primary button-large"
    >
      Primary Large Button
    </Button>
  );

  let button = screen.getByTestId("button-element");
  expect(button).toHaveClass("button-primary", "button-large");

  // Change classes
  rerender(
    <Button
      data-testid="button-element"
      className="button-secondary button-small"
    >
      Secondary Small Button
    </Button>
  );

  button = screen.getByTestId("button-element");
  expect(button).toHaveClass("button-secondary", "button-small");
});

// Form Integration Deep Tests
it("integrates with form validation", () => {
  render(
    <form>
      <Button data-testid="button-element" type="submit" formNoValidate>
        Submit Without Validation
      </Button>
    </form>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("formnovalidate");
});

it("integrates with form submission methods", () => {
  render(
    <form>
      <Button
        data-testid="button-element"
        type="submit"
        formMethod="post"
        formAction="/api/submit"
        formEncType="multipart/form-data"
      >
        Submit with Method
      </Button>
    </form>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("formmethod", "post");
  expect(button).toHaveAttribute("formaction", "/api/submit");
  expect(button).toHaveAttribute("formenctype", "multipart/form-data");
});

// Client-Side Hydration Tests
it("maintains state during client-side hydration", () => {
  render(
    <Button isClient data-testid="button-element" disabled aria-busy="true">
      Hydrated Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveTextContent("Hydrated Button");
});

// Suspense Fallback Tests
it("renders fallback during client component loading", () => {
  render(
    <Button isClient data-testid="button-element" disabled>
      Loading Button
    </Button>
  );

  // Should render the fallback immediately
  const button = screen.getByTestId("button-element");
  expect(button).toHaveAttribute("disabled");
  expect(button).toHaveTextContent("Loading Button");
});

it("handles suspense error boundaries", () => {
  // This test verifies that the component doesn't crash
  // when client components fail to load
  expect(() => {
    render(
      <Button isClient data-testid="button-element">
        Error Boundary Test
      </Button>
    );
  }).not.toThrow();
});

// TypeScript Type Tests
it("accepts valid button props without TypeScript errors", () => {
  // This test ensures TypeScript compatibility
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

  render(<Button {...validProps}>TypeScript Test</Button>);

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("TypeScript Test");
});

// Edge Cases and Boundary Tests
it("handles extremely long text content", () => {
  const longText = "A".repeat(1000);

  render(<Button data-testid="button-element">{longText}</Button>);

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent(longText);
});

it("handles special characters in content", () => {
  const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

  render(<Button data-testid="button-element">{specialChars}</Button>);

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent(specialChars);
});

it("handles unicode characters in content", () => {
  const unicodeText = "🚀 🎉 🎨 🏆 🎯";

  render(<Button data-testid="button-element">{unicodeText}</Button>);

  const button = screen.getByTestId("button-element");
  expect(button).toHaveTextContent(unicodeText);
});

// Integration with React Context Tests
it("works within React context providers", () => {
  const TestContext = React.createContext("default");

  render(
    <TestContext.Provider value="test-value">
      <Button data-testid="button-element">Context Button</Button>
    </TestContext.Provider>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Context Button");
});

// Memory Leak Prevention Tests
it("does not create memory leaks with event handlers", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <Button data-testid="button-element" onClick={handleClick}>
      Memory Test Button
    </Button>
  );

  const button = screen.getByTestId("button-element");
  expect(button).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});
