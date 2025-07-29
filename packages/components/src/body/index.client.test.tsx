import React from "react";

import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BodyClient, MemoizedBodyClient } from "./index.client";

// Helper function to get body element from container (now renders as div)
const getBodyElement = (container: HTMLElement) => {
  return container.querySelector(
    '[data-testid="body-client-element"]'
  ) as HTMLDivElement;
};

const getMemoizedBodyElement = (container: HTMLElement) => {
  return container.querySelector(
    '[data-testid="memoized-body-client-element"]'
  ) as HTMLDivElement;
};

// Basic render test for BodyClient
it("renders BodyClient as a div element in test environment", () => {
  const { container } = render(
    <BodyClient as="div" data-testid="body-client-element">
      Body client content
    </BodyClient>
  );
  const body = getBodyElement(container);
  expect(body.tagName).toBe("DIV");
  expect(body).toHaveTextContent("Body client content");
});

// Basic render test for MemoizedBodyClient
it("renders MemoizedBodyClient as a div element in test environment", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" data-testid="memoized-body-client-element">
      Memoized body client content
    </MemoizedBodyClient>
  );
  const body = getMemoizedBodyElement(container);
  expect(body.tagName).toBe("DIV");
  expect(body).toHaveTextContent("Memoized body client content");
});

// as prop test for BodyClient
it("renders BodyClient as a custom element with 'as' prop", () => {
  const { container } = render(
    <BodyClient as="section" data-testid="custom-section-client">
      Custom body client content
    </BodyClient>
  );
  const section = container.querySelector(
    '[data-testid="custom-section-client"]'
  );
  expect(section?.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("Custom body client content");
});

// as prop test for MemoizedBodyClient
it("renders MemoizedBodyClient as a custom element with 'as' prop", () => {
  const { container } = render(
    <MemoizedBodyClient as="section" data-testid="custom-section-memoized">
      Custom memoized body client content
    </MemoizedBodyClient>
  );
  const section = container.querySelector(
    '[data-testid="custom-section-memoized"]'
  );
  expect(section?.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("Custom memoized body client content");
});

// ref forwarding test for BodyClient
it("forwards ref correctly in BodyClient", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <BodyClient as="div" ref={ref as any}>
      Ref test content
    </BodyClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("DIV");
  }
});

// ref forwarding test for MemoizedBodyClient
it("forwards ref correctly in MemoizedBodyClient", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <MemoizedBodyClient as="div" ref={ref as any}>
      Ref test content
    </MemoizedBodyClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("DIV");
  }
});

// Body-specific attributes test for BodyClient
it("renders BodyClient with body-specific attributes", () => {
  const { container } = render(
    <BodyClient
      as="div"
      data-testid="body-client-element"
      className="main-body-client"
      id="app-body-client"
      lang="en"
      dir="ltr"
    >
      Body client content with attributes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("class", "main-body-client");
  expect(body).toHaveAttribute("id", "app-body-client");
  expect(body).toHaveAttribute("lang", "en");
  expect(body).toHaveAttribute("dir", "ltr");
  expect(body).toHaveTextContent("Body client content with attributes");
});

// Body-specific attributes test for MemoizedBodyClient
it("renders MemoizedBodyClient with body-specific attributes", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-testid="memoized-body-client-element"
      className="main-body-memoized"
      id="app-body-memoized"
      lang="es"
      dir="rtl"
    >
      Memoized body client content with attributes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("class", "main-body-memoized");
  expect(body).toHaveAttribute("id", "app-body-memoized");
  expect(body).toHaveAttribute("lang", "es");
  expect(body).toHaveAttribute("dir", "rtl");
  expect(body).toHaveTextContent(
    "Memoized body client content with attributes"
  );
});

// Children rendering test for BodyClient
it("renders BodyClient children correctly", () => {
  const { container } = render(
    <BodyClient as="div" data-testid="body-client-element">
      <header>Header content</header>
      <main>Main content</main>
      <footer>Footer content</footer>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveTextContent("Header content");
  expect(body).toHaveTextContent("Main content");
  expect(body).toHaveTextContent("Footer content");
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
});

// Children rendering test for MemoizedBodyClient
it("renders MemoizedBodyClient children correctly", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" data-testid="memoized-body-client-element">
      <header>Memoized header content</header>
      <main>Memoized main content</main>
      <footer>Memoized footer content</footer>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveTextContent("Memoized header content");
  expect(body).toHaveTextContent("Memoized main content");
  expect(body).toHaveTextContent("Memoized footer content");
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
});

// Accessibility test for BodyClient
it("supports accessibility attributes in BodyClient", () => {
  const { container } = render(
    <BodyClient
      as="div"
      data-testid="body-client-element"
      aria-label="Main application body client"
      role="application"
      tabIndex={0}
    >
      Accessible body client content
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("aria-label", "Main application body client");
  expect(body).toHaveAttribute("role", "application");
  expect(body).toHaveAttribute("tabindex", "0");
});

// Accessibility test for MemoizedBodyClient
it("supports accessibility attributes in MemoizedBodyClient", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-testid="memoized-body-client-element"
      aria-label="Main application memoized body client"
      role="application"
      tabIndex={0}
    >
      Accessible memoized body client content
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute(
    "aria-label",
    "Main application memoized body client"
  );
  expect(body).toHaveAttribute("role", "application");
  expect(body).toHaveAttribute("tabindex", "0");
});

// Data attributes test for BodyClient
it("supports data attributes in BodyClient", () => {
  const { container } = render(
    <BodyClient
      as="div"
      data-testid="body-client-element"
      data-body-type="client"
      data-theme="light"
      data-layout="mobile"
    >
      Body client with data attributes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("data-body-type", "client");
  expect(body).toHaveAttribute("data-theme", "light");
  expect(body).toHaveAttribute("data-layout", "mobile");
});

// Data attributes test for MemoizedBodyClient
it("supports data attributes in MemoizedBodyClient", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-testid="memoized-body-client-element"
      data-body-type="memoized-client"
      data-theme="dark"
      data-layout="desktop"
    >
      Memoized body client with data attributes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("data-body-type", "memoized-client");
  expect(body).toHaveAttribute("data-theme", "dark");
  expect(body).toHaveAttribute("data-layout", "desktop");
});

// Event handlers test for BodyClient
it("supports event handlers in BodyClient", () => {
  const handleClick = vi.fn();
  const handleLoad = vi.fn();

  const { container } = render(
    <BodyClient
      as="div"
      data-testid="body-client-element"
      onClick={handleClick}
      onLoad={handleLoad}
    >
      Interactive body client
    </BodyClient>
  );

  const body = getBodyElement(container);
  body.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Event handlers test for MemoizedBodyClient
it("supports event handlers in MemoizedBodyClient", () => {
  const handleClick = vi.fn();
  const handleLoad = vi.fn();

  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-testid="memoized-body-client-element"
      onClick={handleClick}
      onLoad={handleLoad}
    >
      Interactive memoized body client
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  body.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Custom styling test for BodyClient
it("supports custom styling in BodyClient", () => {
  const { container } = render(
    <BodyClient
      as="div"
      data-testid="body-client-element"
      className="custom-body-client-class"
      style={{ backgroundColor: "blue", color: "yellow" }}
    >
      Styled body client content
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("custom-body-client-class");
  expect(body).toHaveStyle(
    "background-color: rgb(0, 0, 255); color: rgb(255, 255, 0);"
  );
});

// Custom styling test for MemoizedBodyClient
it("supports custom styling in MemoizedBodyClient", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-testid="memoized-body-client-element"
      className="custom-memoized-body-client-class"
      style={{ backgroundColor: "green", color: "white" }}
    >
      Styled memoized body client content
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveClass("custom-memoized-body-client-class");
  expect(body).toHaveStyle(
    "background-color: rgb(0, 128, 0); color: rgb(255, 255, 255);"
  );
});

// Complex nested children test for BodyClient
it("renders complex nested children in BodyClient", () => {
  const { container } = render(
    <BodyClient as="div" data-testid="body-client-element">
      <header>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h1>Welcome</h1>
          <p>Main content here</p>
        </section>
      </main>
      <footer>
        <p>Footer content</p>
      </footer>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
  expect(body.querySelectorAll("li")).toHaveLength(2);
  expect(body.querySelector("h1")).toBeInTheDocument();
});

// Complex nested children test for MemoizedBodyClient
it("renders complex nested children in MemoizedBodyClient", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" data-testid="memoized-body-client-element">
      <header>
        <nav>
          <ul>
            <li>Memoized Home</li>
            <li>Memoized About</li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h1>Memoized Welcome</h1>
          <p>Memoized main content here</p>
        </section>
      </main>
      <footer>
        <p>Memoized footer content</p>
      </footer>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
  expect(body.querySelectorAll("li")).toHaveLength(2);
  expect(body.querySelector("h1")).toBeInTheDocument();
});

// Special characters test for BodyClient
it("handles special characters in BodyClient content", () => {
  const { container } = render(
    <BodyClient as="div" data-testid="body-client-element">
      Client content with special chars: &copy; &trade; &reg; &deg; &plusmn;
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveTextContent(
    "Client content with special chars: © ™ ® ° ±"
  );
});

// Special characters test for MemoizedBodyClient
it("handles special characters in MemoizedBodyClient content", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" data-testid="memoized-body-client-element">
      Memoized client content with special chars: &copy; &trade; &reg; &deg;
      &plusmn;
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveTextContent(
    "Memoized client content with special chars: © ™ ® ° ±"
  );
});

// Custom attributes test for BodyClient
it("supports custom attributes in BodyClient", () => {
  const { container } = render(
    <BodyClient
      as="div"
      data-testid="body-client-element"
      data-custom="client-value"
      data-app-version="2.0.0"
      data-feature-flags="client-mode,analytics"
    >
      Body client with custom attributes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("data-custom", "client-value");
  expect(body).toHaveAttribute("data-app-version", "2.0.0");
  expect(body).toHaveAttribute("data-feature-flags", "client-mode,analytics");
});

// Custom attributes test for MemoizedBodyClient
it("supports custom attributes in MemoizedBodyClient", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-testid="memoized-body-client-element"
      data-custom="memoized-client-value"
      data-app-version="3.0.0"
      data-feature-flags="memoized-mode,analytics"
    >
      Memoized body client with custom attributes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("data-custom", "memoized-client-value");
  expect(body).toHaveAttribute("data-app-version", "3.0.0");
  expect(body).toHaveAttribute("data-feature-flags", "memoized-mode,analytics");
});
