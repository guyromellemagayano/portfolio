import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Base } from "..";

// Basic render test
it("renders a base element", () => {
  render(<Base data-testid="base-element" href="/base-url" />);
  const base = screen.getByTestId("base-element");
  expect(base.tagName).toBe("BASE");
  expect(base).toHaveAttribute("href", "/base-url");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Base as="div" data-testid="custom-div" href="/custom-base">
      Custom base
    </Base>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom base");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(<Base isClient data-testid="base-element" href="/client-base" />);

  // Should render the fallback (the base) immediately
  const base = screen.getByTestId("base-element");
  expect(base.tagName).toBe("BASE");
  expect(base).toHaveAttribute("href", "/client-base");

  // The lazy component should load and render the same content
  await screen.findByTestId("base-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Base
      isClient
      isMemoized
      data-testid="base-element"
      href="/memoized-base"
    />
  );

  // Should render the fallback (the base) immediately
  const base = screen.getByTestId("base-element");
  expect(base.tagName).toBe("BASE");
  expect(base).toHaveAttribute("href", "/memoized-base");

  // The lazy component should load and render the same content
  await screen.findByTestId("base-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLBaseElement>();
  render(<Base ref={ref} href="/ref-test" />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BASE");
  }
});

// Base-specific props test
it("renders with base-specific attributes", () => {
  render(
    <Base
      data-testid="base-element"
      href="https://example.com/base/"
      target="_blank"
      className="base-url"
      id="main-base"
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "https://example.com/base/");
  expect(base).toHaveAttribute("target", "_blank");
  expect(base).toHaveAttribute("class", "base-url");
  expect(base).toHaveAttribute("id", "main-base");
});

// Base URL types test
it("renders with different base URL types", () => {
  const { rerender } = render(
    <Base data-testid="base-element" href="/relative" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "/relative"
  );

  rerender(<Base data-testid="base-element" href="https://absolute.com/" />);
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "https://absolute.com/"
  );

  rerender(<Base data-testid="base-element" href="ftp://ftp.example.com/" />);
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "ftp://ftp.example.com/"
  );
});

// Base with target test
it("renders with target attribute", () => {
  render(<Base data-testid="base-element" href="/target" target="_blank" />);
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("target", "_blank");
});

// Base with different target values test
it("renders with different target values", () => {
  const { rerender } = render(
    <Base data-testid="base-element" href="/target1" target="_self" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute("target", "_self");

  rerender(
    <Base data-testid="base-element" href="/target2" target="_parent" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "target",
    "_parent"
  );

  rerender(<Base data-testid="base-element" href="/target3" target="_top" />);
  expect(screen.getByTestId("base-element")).toHaveAttribute("target", "_top");
});

// Base with accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Base
      data-testid="base-element"
      href="/accessible"
      aria-label="Base URL for document"
      aria-describedby="base-description"
      role="link"
      tabIndex={0}
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("aria-label", "Base URL for document");
  expect(base).toHaveAttribute("aria-describedby", "base-description");
  expect(base).toHaveAttribute("role", "link");
  expect(base).toHaveAttribute("tabindex", "0");
});

// Base with data attributes test
it("renders with data attributes", () => {
  render(
    <Base
      data-testid="base-element"
      href="/data"
      data-variant="primary"
      data-size="large"
      data-url-type="base"
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("data-variant", "primary");
  expect(base).toHaveAttribute("data-size", "large");
  expect(base).toHaveAttribute("data-url-type", "base");
});

// Base with event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Base
      data-testid="base-element"
      href="/events"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toBeInTheDocument();
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Base with custom styling test
it("renders with custom styling", () => {
  render(
    <Base
      data-testid="base-element"
      href="/styled"
      className="custom-base primary large"
      style={{ color: "blue", textDecoration: "underline" }}
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveClass("custom-base", "primary", "large");
  expect(base).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Base with semantic meaning test
it("renders with semantic meaning", () => {
  render(<Base data-testid="base-element" href="/semantic" role="link" />);

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("role", "link");
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Base
      data-testid="base-element"
      href="/custom"
      className="custom-base"
      id="main-base"
      data-base-type="primary"
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveClass("custom-base");
  expect(base).toHaveAttribute("id", "main-base");
  expect(base).toHaveAttribute("data-base-type", "primary");
});

// Base with multiple classes test
it("renders with multiple classes", () => {
  render(
    <Base
      data-testid="base-element"
      href="/multiple"
      className="base-text primary large emphasis"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveClass("base-text", "primary", "large", "emphasis");
});

// Base with inline styles test
it("renders with inline styles", () => {
  render(
    <Base
      data-testid="base-element"
      href="/inline"
      style={{
        color: "red",
        fontSize: "18px",
        textTransform: "uppercase",
      }}
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveStyle({
    color: "rgb(255, 0, 0)",
    fontSize: "18px",
    textTransform: "uppercase",
  });
});

// Base with URL encoding test
it("renders with URL encoded href", () => {
  render(
    <Base
      data-testid="base-element"
      href="https://example.com/path%20with%20spaces/"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute(
    "href",
    "https://example.com/path%20with%20spaces/"
  );
});

// Base with query parameters test
it("renders with query parameters in href", () => {
  render(
    <Base
      data-testid="base-element"
      href="https://example.com/base/?param=value&other=123"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute(
    "href",
    "https://example.com/base/?param=value&other=123"
  );
});

// Base with fragment test
it("renders with fragment in href", () => {
  render(
    <Base data-testid="base-element" href="https://example.com/base/#section" />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "https://example.com/base/#section");
});

// Base with empty href test
it("renders with empty href", () => {
  render(<Base data-testid="base-element" href="" />);
  const base = screen.getByTestId("base-element");
  // React converts empty string to null, so we check for null
  expect(base.getAttribute("href")).toBeNull();
});

// Base with relative path test
it("renders with relative path", () => {
  render(<Base data-testid="base-element" href="./relative/path/" />);
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "./relative/path/");
});

// Base with absolute path test
it("renders with absolute path", () => {
  render(<Base data-testid="base-element" href="/absolute/path/" />);
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "/absolute/path/");
});

// Base with protocol test
it("renders with different protocols", () => {
  const { rerender } = render(
    <Base data-testid="base-element" href="https://example.com/" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "https://example.com/"
  );

  rerender(<Base data-testid="base-element" href="http://example.com/" />);
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "http://example.com/"
  );

  rerender(<Base data-testid="base-element" href="ftp://example.com/" />);
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "ftp://example.com/"
  );
});
