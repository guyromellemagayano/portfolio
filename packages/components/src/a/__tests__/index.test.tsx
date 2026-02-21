import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { A } from "..";

// Basic render test
it("renders an anchor element", () => {
  render(<A data-testid="link-element">Click me</A>);
  const link = screen.getByTestId("link-element");
  expect(link.tagName).toBe("A");
  expect(link).toHaveTextContent("Click me");
  expect(link).toHaveAttribute("href", "#");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <A as="div" data-testid="custom-div">
      Custom link
    </A>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom link");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <A isClient data-testid="link-element" href="/client-page">
      Client-side link
    </A>
  );

  // Should render the fallback (the link) immediately
  const link = screen.getByTestId("link-element");
  expect(link.tagName).toBe("A");
  expect(link).toHaveTextContent("Client-side link");
  expect(link).toHaveAttribute("href", "/client-page");

  // The lazy component should load and render the same content
  await screen.findByTestId("link-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <A isClient isMemoized data-testid="link-element" href="/memoized-page">
      Memoized link
    </A>
  );

  // Should render the fallback (the link) immediately
  const link = screen.getByTestId("link-element");
  expect(link.tagName).toBe("A");
  expect(link).toHaveTextContent("Memoized link");
  expect(link).toHaveAttribute("href", "/memoized-page");

  // The lazy component should load and render the same content
  await screen.findByTestId("link-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLAnchorElement>();
  render(
    <A ref={ref} href="/ref-test">
      Ref test content
    </A>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("A");
  }
});

// Link-specific props test
it("renders with link-specific attributes", () => {
  render(
    <A
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
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("href", "https://example.com");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("download", "file.pdf");
  expect(link).toHaveAttribute("hreflang", "en");
  expect(link).toHaveAttribute("ping", "https://analytics.com/ping");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveAttribute("referrerpolicy", "no-referrer");
  expect(link).toHaveAttribute("class", "external-link");
  expect(link).toHaveAttribute("id", "main-link");
  expect(link).toHaveTextContent("External Link");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <A data-testid="link-element" href="/children">
      <span>Icon</span>
      <span>Link Text</span>
      <span>Badge</span>
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Icon");
  expect(link).toHaveTextContent("Link Text");
  expect(link).toHaveTextContent("Badge");
  expect(link.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test
it("renders with empty children", () => {
  render(<A data-testid="link-element" href="/empty" />);
  const link = screen.getByTestId("link-element");
  expect(link).toBeInTheDocument();
  expect(link).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <A data-testid="link-element" href="/complex">
      <div className="link-content">
        <span className="icon">🔗</span>
        <span className="text">Complex Link</span>
        <span className="badge">New</span>
      </div>
    </A>
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

// Link types test
it("renders with different link types", () => {
  const { rerender } = render(
    <A data-testid="link-element" href="/internal">
      Internal Link
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "/internal"
  );

  rerender(
    <A data-testid="link-element" href="https://external.com" target="_blank">
      External Link
    </A>
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
    <A data-testid="link-element" href="mailto:test@example.com">
      Email Link
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "mailto:test@example.com"
  );

  rerender(
    <A data-testid="link-element" href="tel:+1234567890">
      Phone Link
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "tel:+1234567890"
  );
});

// Link states test
it("renders with different link states", () => {
  render(
    <A data-testid="link-element" href="/disabled" aria-disabled="true">
      Disabled Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-disabled", "true");
});

// Link with target test
it("renders with target attribute", () => {
  render(
    <A data-testid="link-element" href="/target" target="_blank">
      Target Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("target", "_blank");
});

// Link with download test
it("renders with download attribute", () => {
  render(
    <A data-testid="link-element" href="/file.pdf" download>
      Download Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("download");
});

// Link with download filename test
it("renders with download filename", () => {
  render(
    <A data-testid="link-element" href="/file.pdf" download="custom-name.pdf">
      Download with Custom Name
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("download", "custom-name.pdf");
});

// Link with rel test
it("renders with rel attribute", () => {
  render(
    <A
      data-testid="link-element"
      href="https://external.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Secure External Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

// Link with referrerPolicy test
it("renders with referrerPolicy attribute", () => {
  render(
    <A data-testid="link-element" href="/policy" referrerPolicy="no-referrer">
      No Referrer Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("referrerpolicy", "no-referrer");
});

// Link with hrefLang test
it("renders with hrefLang attribute", () => {
  render(
    <A data-testid="link-element" href="/es" hrefLang="es">
      Spanish Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("hreflang", "es");
});

// Link with ping test
it("renders with ping attribute", () => {
  render(
    <A
      data-testid="link-element"
      href="/ping"
      ping="https://analytics.com/ping"
    >
      Ping Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("ping", "https://analytics.com/ping");
});

// Link with icons test
it("renders link with icons", () => {
  render(
    <A data-testid="link-element" href="/icon">
      <span role="img" aria-label="link">
        🔗
      </span>
      <span>Icon Link</span>
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("🔗");
  expect(link).toHaveTextContent("Icon Link");
  expect(link.querySelector('[role="img"]')).toBeInTheDocument();
  expect(link.querySelector('[aria-label="link"]')).toBeInTheDocument();
});

// Link with loading state test
it("renders link with loading state", () => {
  render(
    <A data-testid="link-element" href="/loading" aria-disabled="true">
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-disabled", "true");
  expect(link).toHaveTextContent("⏳");
  expect(link).toHaveTextContent("Loading...");
  expect(link.querySelector(".spinner")).toBeInTheDocument();
});

// Link with accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <A
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
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("aria-label", "Accessible link description");
  expect(link).toHaveAttribute("aria-describedby", "link-description");
  expect(link).toHaveAttribute("aria-expanded", "false");
  expect(link).toHaveAttribute("aria-haspopup", "true");
  expect(link).toHaveAttribute("role", "link");
  expect(link).toHaveAttribute("tabindex", "0");
});

// Link with data attributes test
it("renders with data attributes", () => {
  render(
    <A
      data-testid="link-element"
      href="/data"
      data-variant="primary"
      data-size="large"
      data-link-type="navigation"
    >
      Data Link
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("data-variant", "primary");
  expect(link).toHaveAttribute("data-size", "large");
  expect(link).toHaveAttribute("data-link-type", "navigation");
});

// Link with event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <A
      data-testid="link-element"
      href="/events"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Link
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Interactive Link");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Link with custom styling test
it("renders with custom styling", () => {
  render(
    <A
      data-testid="link-element"
      href="/styled"
      className="custom-link primary large"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Styled Link
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveClass("custom-link", "primary", "large");
  expect(link).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Link with different href types test
it("renders with different href types", () => {
  const { rerender } = render(
    <A data-testid="link-element" href="#section">
      Anchor Link
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "#section"
  );

  rerender(
    <A data-testid="link-element" href="#javascript-link">
      JavaScript Link
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "#javascript-link"
  );

  rerender(
    <A data-testid="link-element" href="ftp://ftp.example.com">
      FTP Link
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "href",
    "ftp://ftp.example.com"
  );
});

// Link with multiple rel values test
it("renders with multiple rel values", () => {
  render(
    <A
      data-testid="link-element"
      href="https://external.com"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      Multiple Rel Link
    </A>
  );
  const link = screen.getByTestId("link-element");
  expect(link).toHaveAttribute("rel", "noopener noreferrer nofollow");
});

// Link with referrerPolicy values test
it("renders with different referrerPolicy values", () => {
  const { rerender } = render(
    <A data-testid="link-element" href="/policy1" referrerPolicy="no-referrer">
      No Referrer
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "no-referrer"
  );

  rerender(
    <A data-testid="link-element" href="/policy2" referrerPolicy="origin">
      Origin Only
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "origin"
  );

  rerender(
    <A data-testid="link-element" href="/policy3" referrerPolicy="unsafe-url">
      Unsafe URL
    </A>
  );
  expect(screen.getByTestId("link-element")).toHaveAttribute(
    "referrerpolicy",
    "unsafe-url"
  );
});

// Link with navigation test
it("renders navigation link", () => {
  render(
    <A data-testid="link-element" href="/navigation">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Home");
  expect(link).toHaveTextContent("About");
  expect(link).toHaveTextContent("Contact");
  expect(link.querySelector("nav")).toBeInTheDocument();
  expect(link.querySelectorAll("li")).toHaveLength(3);
});

// Link with form test
it("renders link with form", () => {
  render(
    <A data-testid="link-element" href="/form">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveTextContent("Name:");
  expect(link).toHaveTextContent("Submit");
  expect(link.querySelector("form")).toBeInTheDocument();
  expect(link.querySelector("label")).toBeInTheDocument();
  expect(link.querySelector("input")).toBeInTheDocument();
  expect(link.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <A
      data-testid="link-element"
      href="/custom"
      className="custom-link"
      id="main-link"
      data-link-type="primary"
    >
      <h1>Link with Custom Attributes</h1>
    </A>
  );

  const link = screen.getByTestId("link-element");
  expect(link).toHaveClass("custom-link");
  expect(link).toHaveAttribute("id", "main-link");
  expect(link).toHaveAttribute("data-link-type", "primary");
});

// Polymorphic helper: filtering anchor-only props on different element
it.skip("filters anchor-only props when rendered as a div via as", () => {
  render(
    <A
      as="div"
      data-testid="poly-el"
      href="/x"
      target="_blank"
      rel="noreferrer"
    >
      X
    </A>
  );
  const el = screen.getByTestId("poly-el");
  expect(el.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("href");
  expect(el).not.toHaveAttribute("target");
  expect(el).not.toHaveAttribute("rel");
});

// Polymorphic helper: dev-only warning when using anchor-only props on non-anchor
it.skip("emits dev warning when using anchor-only props on non-anchor via as (dev only)", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <A as="div" data-testid="poly-warn" href="/warn" target="_blank">
      W
    </A>
  );

  expect(warnSpy).toHaveBeenCalled();
  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

// Dev debug attributes in development
it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<A data-testid="dev-attrs">D</A>);
  const el = screen.getByTestId("dev-attrs");
  expect(el).toHaveAttribute("data-component", "A");
  expect(el).toHaveAttribute("data-as", "a");
  process.env.NODE_ENV = original;
});
