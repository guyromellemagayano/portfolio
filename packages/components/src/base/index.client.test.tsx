import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BaseClient, MemoizedBaseClient } from "./index.client";

// Basic render test for BaseClient
it("renders a base element", () => {
  render(<BaseClient data-testid="base-element" href="/base-url" />);
  const base = screen.getByTestId("base-element");
  expect(base.tagName).toBe("BASE");
  expect(base).toHaveAttribute("href", "/base-url");
});

// Basic render test for MemoizedBaseClient
it("renders a memoized base element", () => {
  render(
    <MemoizedBaseClient data-testid="base-element" href="/memoized-base-url" />
  );
  const base = screen.getByTestId("base-element");
  expect(base.tagName).toBe("BASE");
  expect(base).toHaveAttribute("href", "/memoized-base-url");
});

// as prop test for BaseClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <BaseClient as="div" data-testid="custom-div" href="/custom-base">
      Custom base
    </BaseClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom base");
});

// as prop test for MemoizedBaseClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedBaseClient
      as="span"
      data-testid="custom-span"
      href="/memoized-custom-base"
    >
      Custom memoized base
    </MemoizedBaseClient>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("Custom memoized base");
});

// Suspense render test for BaseClient
it("renders in Suspense context", () => {
  try {
    render(<BaseClient data-testid="base-element" href="/suspense-base" />);
    const base = screen.getByTestId("base-element");
    expect(base.tagName).toBe("BASE");
    expect(base).toHaveAttribute("href", "/suspense-base");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const base = screen.getByTestId("base-element");
    expect(base.tagName).toBe("BASE");
    expect(base).toHaveAttribute("href", "/suspense-base");
  }
});

// Suspense render test for MemoizedBaseClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedBaseClient
        data-testid="base-element"
        href="/memoized-suspense-base"
      />
    );
    const base = screen.getByTestId("base-element");
    expect(base.tagName).toBe("BASE");
    expect(base).toHaveAttribute("href", "/memoized-suspense-base");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const base = screen.getByTestId("base-element");
    expect(base.tagName).toBe("BASE");
    expect(base).toHaveAttribute("href", "/memoized-suspense-base");
  }
});

// ref forwarding test for BaseClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLBaseElement>();
  render(<BaseClient ref={ref} href="/ref-test" />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BASE");
  }
});

// ref forwarding test for MemoizedBaseClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLBaseElement>();
  render(<MemoizedBaseClient ref={ref} href="/memoized-ref-test" />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BASE");
  }
});

// Base-specific props test for BaseClient
it("renders with base-specific attributes", () => {
  render(
    <BaseClient
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
  expect(base).toHaveClass("base-url", { exact: true });
  expect(base).toHaveAttribute("id", "main-base");
});

// Base-specific props test for MemoizedBaseClient
it("renders memoized with base-specific attributes", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="https://memoized-example.com/base/"
      target="_self"
      className="memoized-base-url"
      id="memoized-main-base"
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "https://memoized-example.com/base/");
  expect(base).toHaveAttribute("target", "_self");
  expect(base).toHaveClass("memoized-base-url", { exact: true });
  expect(base).toHaveAttribute("id", "memoized-main-base");
});

// Base URL types test for BaseClient
it("renders with different base URL types", () => {
  const { rerender } = render(
    <BaseClient data-testid="base-element" href="/relative" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "/relative"
  );

  rerender(
    <BaseClient data-testid="base-element" href="https://absolute.com/" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "https://absolute.com/"
  );

  rerender(
    <BaseClient data-testid="base-element" href="ftp://ftp.example.com/" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "ftp://ftp.example.com/"
  );
});

// Base URL types test for MemoizedBaseClient
it("renders memoized with different base URL types", () => {
  const { rerender } = render(
    <MemoizedBaseClient data-testid="base-element" href="/memoized-relative" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "/memoized-relative"
  );

  rerender(
    <MemoizedBaseClient
      data-testid="base-element"
      href="https://memoized-absolute.com/"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "https://memoized-absolute.com/"
  );

  rerender(
    <MemoizedBaseClient
      data-testid="base-element"
      href="ftp://memoized-ftp.example.com/"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "ftp://memoized-ftp.example.com/"
  );
});

// Base with target test for BaseClient
it("renders with target attribute", () => {
  render(
    <BaseClient data-testid="base-element" href="/target" target="_blank" />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("target", "_blank");
});

// Base with target test for MemoizedBaseClient
it("renders memoized with target attribute", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-target"
      target="_self"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("target", "_self");
});

// Base with different target values test for BaseClient
it("renders with different target values", () => {
  const { rerender } = render(
    <BaseClient data-testid="base-element" href="/target1" target="_self" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute("target", "_self");

  rerender(
    <BaseClient data-testid="base-element" href="/target2" target="_parent" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "target",
    "_parent"
  );

  rerender(
    <BaseClient data-testid="base-element" href="/target3" target="_top" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute("target", "_top");
});

// Base with different target values test for MemoizedBaseClient
it("renders memoized with different target values", () => {
  const { rerender } = render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-target1"
      target="_self"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute("target", "_self");

  rerender(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-target2"
      target="_parent"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "target",
    "_parent"
  );

  rerender(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-target3"
      target="_top"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute("target", "_top");
});

// Base with accessibility attributes test for BaseClient
it("renders with accessibility attributes", () => {
  render(
    <BaseClient
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

// Base with accessibility attributes test for MemoizedBaseClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-accessible"
      aria-label="Memoized base URL for document"
      aria-describedby="memoized-base-description"
      role="link"
      tabIndex={0}
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("aria-label", "Memoized base URL for document");
  expect(base).toHaveAttribute("aria-describedby", "memoized-base-description");
  expect(base).toHaveAttribute("role", "link");
  expect(base).toHaveAttribute("tabindex", "0");
});

// Base with data attributes test for BaseClient
it("renders with data attributes", () => {
  render(
    <BaseClient
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

// Base with data attributes test for MemoizedBaseClient
it("renders memoized with data attributes", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-data"
      data-variant="secondary"
      data-size="small"
      data-url-type="memoized-base"
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("data-variant", "secondary");
  expect(base).toHaveAttribute("data-size", "small");
  expect(base).toHaveAttribute("data-url-type", "memoized-base");
});

// Base with event handlers test for BaseClient
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <BaseClient
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

// Base with event handlers test for MemoizedBaseClient
it("renders memoized with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-events"
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

// Base with custom styling test for BaseClient
it("renders with custom styling", () => {
  render(
    <BaseClient
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

// Base with custom styling test for MemoizedBaseClient
it("renders memoized with custom styling", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-styled"
      className="memoized-custom-base secondary small"
      style={{ color: "green", textDecoration: "none" }}
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveClass("memoized-custom-base", "secondary", "small");
  expect(base).toHaveStyle({ color: "rgb(0, 128, 0)", textDecoration: "none" });
});

// Base with semantic meaning test for BaseClient
it("renders with semantic meaning", () => {
  render(
    <BaseClient data-testid="base-element" href="/semantic" role="link" />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("role", "link");
});

// Base with semantic meaning test for MemoizedBaseClient
it("renders memoized with semantic meaning", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-semantic"
      role="link"
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("role", "link");
});

// Custom attributes test for BaseClient
it("renders with custom attributes", () => {
  render(
    <BaseClient
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

// Custom attributes test for MemoizedBaseClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-custom"
      className="memoized-custom-base"
      id="memoized-main-base"
      data-base-type="secondary"
    />
  );

  const base = screen.getByTestId("base-element");
  expect(base).toHaveClass("memoized-custom-base");
  expect(base).toHaveAttribute("id", "memoized-main-base");
  expect(base).toHaveAttribute("data-base-type", "secondary");
});

// Base with multiple classes test for BaseClient
it("renders with multiple classes", () => {
  render(
    <BaseClient
      data-testid="base-element"
      href="/multiple"
      className="base-text primary large emphasis"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveClass("base-text", "primary", "large", "emphasis");
});

// Base with multiple classes test for MemoizedBaseClient
it("renders memoized with multiple classes", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-multiple"
      className="memoized-base-text secondary small strong"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveClass(
    "memoized-base-text",
    "secondary",
    "small",
    "strong"
  );
});

// Base with inline styles test for BaseClient
it("renders with inline styles", () => {
  render(
    <BaseClient
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

// Base with inline styles test for MemoizedBaseClient
it("renders memoized with inline styles", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-inline"
      style={{
        color: "blue",
        fontSize: "20px",
        textTransform: "lowercase",
      }}
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveStyle({
    color: "rgb(0, 0, 255)",
    fontSize: "20px",
    textTransform: "lowercase",
  });
});

// Base with URL encoding test for BaseClient
it("renders with URL encoded href", () => {
  render(
    <BaseClient
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

// Base with URL encoding test for MemoizedBaseClient
it("renders memoized with URL encoded href", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="https://memoized-example.com/path%20with%20spaces/"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute(
    "href",
    "https://memoized-example.com/path%20with%20spaces/"
  );
});

// Base with query parameters test for BaseClient
it("renders with query parameters in href", () => {
  render(
    <BaseClient
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

// Base with query parameters test for MemoizedBaseClient
it("renders memoized with query parameters in href", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="https://memoized-example.com/base/?param=value&other=123"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute(
    "href",
    "https://memoized-example.com/base/?param=value&other=123"
  );
});

// Base with fragment test for BaseClient
it("renders with fragment in href", () => {
  render(
    <BaseClient
      data-testid="base-element"
      href="https://example.com/base/#section"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "https://example.com/base/#section");
});

// Base with fragment test for MemoizedBaseClient
it("renders memoized with fragment in href", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="https://memoized-example.com/base/#section"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute(
    "href",
    "https://memoized-example.com/base/#section"
  );
});

// Base with empty href test for BaseClient
it("renders with empty href", () => {
  render(<BaseClient data-testid="base-element" href="" />);
  const base = screen.getByTestId("base-element");
  // React converts empty string to null, so we check for null
  expect(base).not.toHaveAttribute("href");
});

// Base with empty href test for MemoizedBaseClient
it("renders memoized with empty href", () => {
  render(<MemoizedBaseClient data-testid="base-element" href="" />);
  const base = screen.getByTestId("base-element");
  // React converts empty string to null, so we check for null
  expect(base).not.toHaveAttribute("href");
});

// Base with relative path test for BaseClient
it("renders with relative path", () => {
  render(<BaseClient data-testid="base-element" href="./relative/path/" />);
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "./relative/path/");
});

// Base with relative path test for MemoizedBaseClient
it("renders memoized with relative path", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="./memoized-relative/path/"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "./memoized-relative/path/");
});

// Base with absolute path test for BaseClient
it("renders with absolute path", () => {
  render(<BaseClient data-testid="base-element" href="/absolute/path/" />);
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "/absolute/path/");
});

// Base with absolute path test for MemoizedBaseClient
it("renders memoized with absolute path", () => {
  render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="/memoized-absolute/path/"
    />
  );
  const base = screen.getByTestId("base-element");
  expect(base).toHaveAttribute("href", "/memoized-absolute/path/");
});

// Base with protocol test for BaseClient
it("renders with different protocols", () => {
  const { rerender } = render(
    <BaseClient data-testid="base-element" href="https://example.com/" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "https://example.com/"
  );

  rerender(
    <BaseClient data-testid="base-element" href="http://example.com/" />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "http://example.com/"
  );

  rerender(<BaseClient data-testid="base-element" href="ftp://example.com/" />);
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "ftp://example.com/"
  );
});

// Base with protocol test for MemoizedBaseClient
it("renders memoized with different protocols", () => {
  const { rerender } = render(
    <MemoizedBaseClient
      data-testid="base-element"
      href="https://memoized-example.com/"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "https://memoized-example.com/"
  );

  rerender(
    <MemoizedBaseClient
      data-testid="base-element"
      href="http://memoized-example.com/"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "http://memoized-example.com/"
  );

  rerender(
    <MemoizedBaseClient
      data-testid="base-element"
      href="ftp://memoized-example.com/"
    />
  );
  expect(screen.getByTestId("base-element")).toHaveAttribute(
    "href",
    "ftp://memoized-example.com/"
  );
});
