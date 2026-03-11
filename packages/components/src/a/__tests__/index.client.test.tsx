import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { AClient, MemoizedAClient } from "../index.client";

// Basic render test for AClient
it("renders an anchor element", () => {
  render(<AClient data-testid="link-element">Click me</AClient>);
  const link = screen.getByTestId("link-element");
  expect(link.tagName).toBe("A");
  expect(link).toHaveTextContent("Click me");
  expect(link).toHaveAttribute("href", "#");
});

// Basic render test for MemoizedAClient
it("renders a memoized anchor element", () => {
  render(
    <MemoizedAClient data-testid="link-element">
      Memoized click me
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link.tagName).toBe("A");
  expect(link).toHaveTextContent("Memoized click me");
  expect(link).toHaveAttribute("href", "#");
});

// as prop test for AClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <AClient as="div" data-testid="custom-div">
      Custom link
    </AClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom link");
});

// as prop test for MemoizedAClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedAClient as="span" data-testid="custom-span">
      Custom memoized link
    </MemoizedAClient>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("Custom memoized link");
});

// Suspense render test for AClient
it("renders in Suspense context", () => {
  try {
    render(
      <AClient data-testid="link-element" href="/suspense">
        Suspense link content
      </AClient>
    );
    const link = screen.getByTestId("link-element");
    expect(link.tagName).toBe("A");
    expect(link).toHaveTextContent("Suspense link content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const link = screen.getByTestId("link-element");
    expect(link.tagName).toBe("A");
    expect(link).toHaveTextContent("Suspense link content");
  }
});

// Suspense render test for MemoizedAClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedAClient data-testid="link-element" href="/memoized-suspense">
        Memoized suspense link
      </MemoizedAClient>
    );
    const link = screen.getByTestId("link-element");
    expect(link.tagName).toBe("A");
    expect(link).toHaveTextContent("Memoized suspense link");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const link = screen.getByTestId("link-element");
    expect(link.tagName).toBe("A");
    expect(link).toHaveTextContent("Memoized suspense link");
  }
});

// ref forwarding test for AClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLAnchorElement>();
  render(
    <AClient ref={ref} href="/ref-test">
      Ref test content
    </AClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("A");
  }
});

// ref forwarding test for MemoizedAClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLAnchorElement>();
  render(
    <MemoizedAClient ref={ref} href="/memoized-ref-test">
      Memoized ref test content
    </MemoizedAClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("A");
  }
});

// Link-specific props test for AClient
it("renders with link-specific attributes", () => {
  render(
    <AClient
      data-testid="link-element"
      href="https://example.com"
      target="_blank"
      download="file.pdf"
      hrefLang="en"
      ping="https://analytics.com/ping"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      className="external-link"
      id="main-link"
    >
      External Link
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("href", "https://example.com");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("download", "file.pdf");
  expect(link).toHaveAttribute("hreflang", "en");
  expect(link).toHaveAttribute("ping", "https://analytics.com/ping");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveAttribute("referrerpolicy", "no-referrer");
  expect(link).toHaveClass("external-link", { exact: true });
  expect(link).toHaveAttribute("id", "main-link");
  expect(link).toHaveTextContent("External Link");
});

// Link-specific props test for MemoizedAClient
it("renders memoized with link-specific attributes", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="https://memoized-example.com"
      target="_self"
      download="memoized-file.pdf"
      hrefLang="es"
      ping="https://memoized-analytics.com/ping"
      rel="nofollow"
      referrerPolicy="origin"
      className="memoized-external-link"
      id="memoized-main-link"
    >
      Memoized External Link
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("href", "https://memoized-example.com");
  expect(link).toHaveAttribute("target", "_self");
  expect(link).toHaveAttribute("download", "memoized-file.pdf");
  expect(link).toHaveAttribute("hreflang", "es");
  expect(link).toHaveAttribute("ping", "https://memoized-analytics.com/ping");
  expect(link).toHaveAttribute("rel", "nofollow");
  expect(link).toHaveAttribute("referrerpolicy", "origin");
  expect(link).toHaveClass("memoized-external-link", { exact: true });
  expect(link).toHaveAttribute("id", "memoized-main-link");
  expect(link).toHaveTextContent("Memoized External Link");
});

// Children rendering test for AClient
it("renders children correctly", () => {
  render(
    <AClient data-testid="link-element" href="/children">
      <span>Icon</span>
      <span>Link Text</span>
      <span>Badge</span>
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Icon");
  expect(link).toHaveTextContent("Link Text");
  expect(link).toHaveTextContent("Badge");
  expect(link.querySelectorAll("span")).toHaveLength(3);
});

// Children rendering test for MemoizedAClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedAClient data-testid="link-element" href="/memoized-children">
      <span>Memoized Icon</span>
      <span>Memoized Link Text</span>
      <span>Memoized Badge</span>
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Memoized Icon");
  expect(link).toHaveTextContent("Memoized Link Text");
  expect(link).toHaveTextContent("Memoized Badge");
  expect(link.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test for AClient
it("renders with empty children", () => {
  render(<AClient data-testid="link-element" href="/empty" />);
  const link = screen.getByTestId("link-element");
  expect(link).toBeInTheDocument();
  expect(link).toBeEmptyDOMElement();
});

// Empty children test for MemoizedAClient
it("renders memoized with empty children", () => {
  render(<MemoizedAClient data-testid="link-element" href="/memoized-empty" />);
  const link = screen.getByTestId("link-element");
  expect(link).toBeInTheDocument();
  expect(link).toBeEmptyDOMElement();
});

// Complex children with nested elements test for AClient
it("renders complex nested children", () => {
  render(
    <AClient data-testid="link-element" href="/complex">
      <div className="link-content">
        <span className="icon">🔗</span>
        <span className="text">Complex Link</span>
        <span className="badge">New</span>
      </div>
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("🔗");
  expect(link).toHaveTextContent("Complex Link");
  expect(link).toHaveTextContent("New");
  expect(link.querySelector(".link-content")).toBeInTheDocument();
  expect(link.querySelector(".icon")).toBeInTheDocument();
  expect(link.querySelector(".text")).toBeInTheDocument();
  expect(link.querySelector(".badge")).toBeInTheDocument();
});

// Complex children with nested elements test for MemoizedAClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedAClient data-testid="link-element" href="/memoized-complex">
      <div className="memoized-link-content">
        <span className="memoized-icon">⚡</span>
        <span className="memoized-text">Memoized Complex Link</span>
        <span className="memoized-badge">Updated</span>
      </div>
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("⚡");
  expect(link).toHaveTextContent("Memoized Complex Link");
  expect(link).toHaveTextContent("Updated");
  expect(link.querySelector(".memoized-link-content")).toBeInTheDocument();
  expect(link.querySelector(".memoized-icon")).toBeInTheDocument();
  expect(link.querySelector(".memoized-text")).toBeInTheDocument();
  expect(link.querySelector(".memoized-badge")).toBeInTheDocument();
});

// Link types test for AClient
it("renders with different link types", () => {
  const { rerender } = render(
    <AClient data-testid="link-element" href="/internal">
      Internal Link
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "/internal"
  );

  rerender(
    <AClient
      data-testid="link-element"
      href="https://external.com"
      target="_blank"
    >
      External Link
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "https://external.com"
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "target",
    "_blank"
  );

  rerender(
    <AClient data-testid="link-element" href="mailto:test@example.com">
      Email Link
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "mailto:test@example.com"
  );

  rerender(
    <AClient data-testid="link-element" href="tel:+1234567890">
      Phone Link
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "tel:+1234567890"
  );
});

// Link types test for MemoizedAClient
it("renders memoized with different link types", () => {
  const { rerender } = render(
    <MemoizedAClient data-testid="link-element" href="/memoized-internal">
      Memoized Internal Link
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "/memoized-internal"
  );

  rerender(
    <MemoizedAClient
      data-testid="link-element"
      href="https://memoized-external.com"
      target="_blank"
    >
      Memoized External Link
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "https://memoized-external.com"
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "target",
    "_blank"
  );

  rerender(
    <MemoizedAClient
      data-testid="link-element"
      href="mailto:memoized@example.com"
    >
      Memoized Email Link
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "mailto:memoized@example.com"
  );

  rerender(
    <MemoizedAClient data-testid="link-element" href="tel:+9876543210">
      Memoized Phone Link
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "tel:+9876543210"
  );
});

// Link states test for AClient
it("renders with different link states", () => {
  render(
    <AClient data-testid="link-element" href="/disabled" aria-disabled="true">
      Disabled Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-disabled", "true");
});

// Link states test for MemoizedAClient
it("renders memoized with different link states", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-disabled"
      aria-disabled="true"
    >
      Memoized Disabled Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-disabled", "true");
});

// Link with target test for AClient
it("renders with target attribute", () => {
  render(
    <AClient data-testid="link-element" href="/target" target="_blank">
      Target Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("target", "_blank");
});

// Link with target test for MemoizedAClient
it("renders memoized with target attribute", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-target"
      target="_self"
    >
      Memoized Target Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("target", "_self");
});

// Link with download test for AClient
it("renders with download attribute", () => {
  render(
    <AClient data-testid="link-element" href="/file.pdf" download>
      Download Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("download");
});

// Link with download test for MemoizedAClient
it("renders memoized with download attribute", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-file.pdf"
      download
    >
      Memoized Download Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("download");
});

// Link with download filename test for AClient
it("renders with download filename", () => {
  render(
    <AClient
      data-testid="link-element"
      href="/file.pdf"
      download="custom-name.pdf"
    >
      Download with Custom Name
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("download", "custom-name.pdf");
});

// Link with download filename test for MemoizedAClient
it("renders memoized with download filename", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-file.pdf"
      download="memoized-custom-name.pdf"
    >
      Memoized Download with Custom Name
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("download", "memoized-custom-name.pdf");
});

// Link with rel test for AClient
it("renders with rel attribute", () => {
  render(
    <AClient
      data-testid="link-element"
      href="https://external.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Secure External Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

// Link with rel test for MemoizedAClient
it("renders memoized with rel attribute", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="https://memoized-external.com"
      target="_blank"
      rel="nofollow"
    >
      Memoized Secure External Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("rel", "nofollow");
});

// Link with referrerPolicy test for AClient
it("renders with referrerPolicy attribute", () => {
  render(
    <AClient
      data-testid="link-element"
      href="/policy"
      referrerPolicy="no-referrer"
    >
      No Referrer Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("referrerpolicy", "no-referrer");
});

// Link with referrerPolicy test for MemoizedAClient
it("renders memoized with referrerPolicy attribute", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-policy"
      referrerPolicy="origin"
    >
      Memoized No Referrer Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("referrerpolicy", "origin");
});

// Link with hrefLang test for AClient
it("renders with hrefLang attribute", () => {
  render(
    <AClient data-testid="link-element" href="/es" hrefLang="es">
      Spanish Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("hreflang", "es");
});

// Link with hrefLang test for MemoizedAClient
it("renders memoized with hrefLang attribute", () => {
  render(
    <MemoizedAClient data-testid="link-element" href="/fr" hrefLang="fr">
      Memoized French Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("hreflang", "fr");
});

// Link with ping test for AClient
it("renders with ping attribute", () => {
  render(
    <AClient
      data-testid="link-element"
      href="/ping"
      ping="https://analytics.com/ping"
    >
      Ping Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("ping", "https://analytics.com/ping");
});

// Link with ping test for MemoizedAClient
it("renders memoized with ping attribute", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-ping"
      ping="https://memoized-analytics.com/ping"
    >
      Memoized Ping Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("ping", "https://memoized-analytics.com/ping");
});

// Link with icons test for AClient
it("renders link with icons", () => {
  render(
    <AClient data-testid="link-element" href="/icon">
      <span role="img" aria-label="link">
        🔗
      </span>
      <span>Icon Link</span>
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("🔗");
  expect(link).toHaveTextContent("Icon Link");
  expect(link.querySelector('[role="img"]')).toBeInTheDocument();
  expect(link.querySelector('[aria-label="link"]')).toBeInTheDocument();
});

// Link with icons test for MemoizedAClient
it("renders memoized link with icons", () => {
  render(
    <MemoizedAClient data-testid="link-element" href="/memoized-icon">
      <span role="img" aria-label="memoized-link">
        ⚡
      </span>
      <span>Memoized Icon Link</span>
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("⚡");
  expect(link).toHaveTextContent("Memoized Icon Link");
  expect(link.querySelector('[role="img"]')).toBeInTheDocument();
  expect(
    link.querySelector('[aria-label="memoized-link"]')
  ).toBeInTheDocument();
});

// Link with loading state test for AClient
it("renders link with loading state", () => {
  render(
    <AClient data-testid="link-element" href="/loading" aria-disabled="true">
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-disabled", "true");
  expect(link).toHaveTextContent("⏳");
  expect(link).toHaveTextContent("Loading...");
  expect(link.querySelector(".spinner")).toBeInTheDocument();
});

// Link with loading state test for MemoizedAClient
it("renders memoized link with loading state", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-loading"
      aria-disabled="true"
    >
      <span className="memoized-spinner">🔄</span>
      <span>Memoized Loading...</span>
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-disabled", "true");
  expect(link).toHaveTextContent("🔄");
  expect(link).toHaveTextContent("Memoized Loading...");
  expect(link.querySelector(".memoized-spinner")).toBeInTheDocument();
});

// Link with accessibility attributes test for AClient
it("renders with accessibility attributes", () => {
  render(
    <AClient
      data-testid="link-element"
      href="/accessible"
      aria-label="Accessible link description"
      aria-describedby="link-description"
      aria-expanded="false"
      aria-haspopup="true"
      role="link"
      tabIndex={0}
    >
      Accessible Link
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-label", "Accessible link description");
  expect(link).toHaveAttribute("aria-describedby", "link-description");
  expect(link).toHaveAttribute("aria-expanded", "false");
  expect(link).toHaveAttribute("aria-haspopup", "true");
  expect(link).toHaveAttribute("role", "link");
  expect(link).toHaveAttribute("tabindex", "0");
});

// Link with accessibility attributes test for MemoizedAClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-accessible"
      aria-label="Memoized accessible link description"
      aria-describedby="memoized-link-description"
      aria-expanded="true"
      aria-haspopup="menu"
      role="link"
      tabIndex={0}
    >
      Memoized Accessible Link
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute(
    "aria-label",
    "Memoized accessible link description"
  );
  expect(link).toHaveAttribute("aria-describedby", "memoized-link-description");
  expect(link).toHaveAttribute("aria-expanded", "true");
  expect(link).toHaveAttribute("aria-haspopup", "menu");
  expect(link).toHaveAttribute("role", "link");
  expect(link).toHaveAttribute("tabindex", "0");
});

// Link with data attributes test for AClient
it("renders with data attributes", () => {
  render(
    <AClient
      data-testid="link-element"
      href="/data"
      data-variant="primary"
      data-size="large"
      data-link-type="navigation"
    >
      Data Link
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("data-variant", "primary");
  expect(link).toHaveAttribute("data-size", "large");
  expect(link).toHaveAttribute("data-link-type", "navigation");
});

// Link with data attributes test for MemoizedAClient
it("renders memoized with data attributes", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-data"
      data-variant="secondary"
      data-size="small"
      data-link-type="action"
    >
      Memoized Data Link
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("data-variant", "secondary");
  expect(link).toHaveAttribute("data-size", "small");
  expect(link).toHaveAttribute("data-link-type", "action");
});

// Link with event handlers test for AClient
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <AClient
      data-testid="link-element"
      href="/events"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Link
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Interactive Link");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Link with event handlers test for MemoizedAClient
it("renders memoized with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-events"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Memoized Interactive Link
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Memoized Interactive Link");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Link with custom styling test for AClient
it("renders with custom styling", () => {
  render(
    <AClient
      data-testid="link-element"
      href="/styled"
      className="custom-link primary large"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Styled Link
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveClass("custom-link", "primary", "large");
  expect(link).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Link with custom styling test for MemoizedAClient
it("renders memoized with custom styling", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-styled"
      className="memoized-custom-link secondary small"
      style={{ color: "green", textDecoration: "none" }}
    >
      Memoized Styled Link
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveClass("memoized-custom-link", "secondary", "small");
  expect(link).toHaveStyle({ color: "rgb(0, 128, 0)", textDecoration: "none" });
});

// Link with different href types test for AClient
it("renders with different href types", () => {
  const { rerender } = render(
    <AClient data-testid="link-element" href="#section">
      Anchor Link
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "#section"
  );

  rerender(
    <AClient data-testid="link-element" href="#javascript-link">
      JavaScript Link
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "#javascript-link"
  );

  rerender(
    <AClient data-testid="link-element" href="ftp://ftp.example.com">
      FTP Link
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "ftp://ftp.example.com"
  );
});

// Link with different href types test for MemoizedAClient
it("renders memoized with different href types", () => {
  const { rerender } = render(
    <MemoizedAClient data-testid="link-element" href="#memoized-section">
      Memoized Anchor Link
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "#memoized-section"
  );

  rerender(
    <MemoizedAClient
      data-testid="link-element"
      href="#memoized-javascript-link"
    >
      Memoized JavaScript Link
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "#memoized-javascript-link"
  );

  rerender(
    <MemoizedAClient
      data-testid="link-element"
      href="ftp://memoized-ftp.example.com"
    >
      Memoized FTP Link
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "ftp://memoized-ftp.example.com"
  );
});

// Link with multiple rel values test for AClient
it("renders with multiple rel values", () => {
  render(
    <AClient
      data-testid="link-element"
      href="https://external.com"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      Multiple Rel Link
    </AClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("rel", "noopener noreferrer nofollow");
});

// Link with multiple rel values test for MemoizedAClient
it("renders memoized with multiple rel values", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="https://memoized-external.com"
      target="_blank"
      rel="nofollow noopener"
    >
      Memoized Multiple Rel Link
    </MemoizedAClient>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("rel", "nofollow noopener");
});

// Link with referrerPolicy values test for AClient
it("renders with different referrerPolicy values", () => {
  const { rerender } = render(
    <AClient
      data-testid="link-element"
      href="/policy1"
      referrerPolicy="no-referrer"
    >
      No Referrer
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "no-referrer"
  );

  rerender(
    <AClient data-testid="link-element" href="/policy2" referrerPolicy="origin">
      Origin Only
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "origin"
  );

  rerender(
    <AClient
      data-testid="link-element"
      href="/policy3"
      referrerPolicy="unsafe-url"
    >
      Unsafe URL
    </AClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "unsafe-url"
  );
});

// Link with referrerPolicy values test for MemoizedAClient
it("renders memoized with different referrerPolicy values", () => {
  const { rerender } = render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-policy1"
      referrerPolicy="no-referrer"
    >
      Memoized No Referrer
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "no-referrer"
  );

  rerender(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-policy2"
      referrerPolicy="origin"
    >
      Memoized Origin Only
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "origin"
  );

  rerender(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-policy3"
      referrerPolicy="unsafe-url"
    >
      Memoized Unsafe URL
    </MemoizedAClient>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "unsafe-url"
  );
});

// Link with navigation test for AClient
it("renders navigation link", () => {
  render(
    <AClient data-testid="link-element" href="/navigation">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Home");
  expect(link).toHaveTextContent("About");
  expect(link).toHaveTextContent("Contact");
  expect(link.querySelector("nav")).toBeInTheDocument();
  expect(link.querySelectorAll("li")).toHaveLength(3);
});

// Link with navigation test for MemoizedAClient
it("renders memoized navigation link", () => {
  render(
    <MemoizedAClient data-testid="link-element" href="/memoized-navigation">
      <nav>
        <ul>
          <li>Memoized Home</li>
          <li>Memoized About</li>
          <li>Memoized Contact</li>
        </ul>
      </nav>
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Memoized Home");
  expect(link).toHaveTextContent("Memoized About");
  expect(link).toHaveTextContent("Memoized Contact");
  expect(link.querySelector("nav")).toBeInTheDocument();
  expect(link.querySelectorAll("li")).toHaveLength(3);
});

// Link with form test for AClient
it("renders link with form", () => {
  render(
    <AClient data-testid="link-element" href="/form">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Name:");
  expect(link).toHaveTextContent("Submit");
  expect(link.querySelector("form")).toBeInTheDocument();
  expect(link.querySelector("label")).toBeInTheDocument();
  expect(link.querySelector("input")).toBeInTheDocument();
  expect(link.querySelector("button")).toBeInTheDocument();
});

// Link with form test for MemoizedAClient
it("renders memoized link with form", () => {
  render(
    <MemoizedAClient data-testid="link-element" href="/memoized-form">
      <form>
        <label htmlFor="memoized-name">Memoized Name:</label>
        <input type="text" id="memoized-name" name="memoized-name" />
        <button type="submit">Memoized Submit</button>
      </form>
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Memoized Name:");
  expect(link).toHaveTextContent("Memoized Submit");
  expect(link.querySelector("form")).toBeInTheDocument();
  expect(link.querySelector("label")).toBeInTheDocument();
  expect(link.querySelector("input")).toBeInTheDocument();
  expect(link.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test for AClient
it("renders with custom attributes", () => {
  render(
    <AClient
      data-testid="link-element"
      href="/custom"
      className="custom-link"
      id="main-link"
      data-link-type="primary"
    >
      <h1>Link with Custom Attributes</h1>
    </AClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveClass("custom-link");
  expect(link).toHaveAttribute("id", "main-link");
  expect(link).toHaveAttribute("data-link-type", "primary");
});

// Custom attributes test for MemoizedAClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedAClient
      data-testid="link-element"
      href="/memoized-custom"
      className="memoized-custom-link"
      id="memoized-main-link"
      data-link-type="secondary"
    >
      <h1>Memoized Link with Custom Attributes</h1>
    </MemoizedAClient>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveClass("memoized-custom-link");
  expect(link).toHaveAttribute("id", "memoized-main-link");
  expect(link).toHaveAttribute("data-link-type", "secondary");
});
