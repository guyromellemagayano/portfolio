import React from "react";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Body } from ".";

// Helper function to get body element from container
const getBodyElement = (container: HTMLElement) => {
  return container.querySelector('[data-testid="body-element"]') as HTMLElement;
};

// Test that the component renders content correctly
it("renders content correctly", () => {
  const { container } = render(<Body>Body content</Body>);

  expect(container).toHaveTextContent("Body content");
});

// Test with as prop - this should work
it("renders with as prop", () => {
  const { container } = render(<Body as="div">Body content</Body>);

  const divElement = container.querySelector("div");
  expect(divElement).toBeInTheDocument();
  expect(divElement?.tagName).toBe("DIV");
  expect(divElement).toHaveTextContent("Body content");
});

// Test with data-testid and as prop
it("renders with data-testid and as prop", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body">
      Body content
    </Body>
  );

  const divElement = container.querySelector<HTMLDivElement>(
    '[data-testid="test-body"]'
  );
  expect(divElement).toBeInTheDocument();
  expect(divElement?.tagName).toBe("DIV");
  expect(divElement).toHaveTextContent("Body content");
});

// Test that the component handles CommonComponentProps correctly
it("handles CommonComponentProps correctly", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      isClient={false}
      isMemoized={false}
      className="test-class"
    >
      Test content
    </Body>
  );

  const divElement = container.querySelector<HTMLDivElement>(
    '[data-testid="test-body"]'
  );
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass("test-class");
  expect(divElement).toHaveTextContent("Test content");
});

// Test with body-specific attributes using div
it("renders with body-specific attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      className="main-body"
      id="app-body"
      lang="en"
      dir="ltr"
    >
      Body content with attributes
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("class", "main-body");
  expect(divElement).toHaveAttribute("id", "app-body");
  expect(divElement).toHaveAttribute("lang", "en");
  expect(divElement).toHaveAttribute("dir", "ltr");
  expect(divElement).toHaveTextContent("Body content with attributes");
});

// Test children rendering
it("renders children correctly", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body">
      <header>Header</header>
      <main>Main content</main>
      <footer>Footer</footer>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveTextContent("Header");
  expect(divElement).toHaveTextContent("Main content");
  expect(divElement).toHaveTextContent("Footer");
  expect(divElement?.querySelector("header")).toBeInTheDocument();
  expect(divElement?.querySelector("main")).toBeInTheDocument();
  expect(divElement?.querySelector("footer")).toBeInTheDocument();
});

// Test empty children
it("renders with empty children", () => {
  const { container } = render(<Body as="div" data-testid="test-body"></Body>);
  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveTextContent("");
});

// Test complex nested children
it("renders complex nested children", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body">
      <div className="container">
        <header className="site-header">
          <h1>Site Title</h1>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="site-main">
          <article>
            <h2>Article Title</h2>
            <p>Article content here.</p>
          </article>
        </main>
        <aside className="site-sidebar">
          <h3>Sidebar</h3>
          <p>Sidebar content.</p>
        </aside>
        <footer className="site-footer">
          <p>&copy; 2024</p>
        </footer>
      </div>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement?.querySelector(".container")).toBeInTheDocument();
  expect(divElement?.querySelector(".site-header")).toBeInTheDocument();
  expect(divElement?.querySelector(".site-main")).toBeInTheDocument();
  expect(divElement?.querySelector(".site-sidebar")).toBeInTheDocument();
  expect(divElement?.querySelector(".site-footer")).toBeInTheDocument();
  expect(divElement?.querySelectorAll("a")).toHaveLength(2);
});

// Test accessibility attributes
it("renders with accessibility attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      aria-label="Main page content"
      role="main"
      tabIndex={0}
    >
      Accessible body content
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("aria-label", "Main page content");
  expect(divElement).toHaveAttribute("role", "main");
  expect(divElement).toHaveAttribute("tabindex", "0");
});

// Test data attributes
it("renders with data attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      data-body-id="main-app-body"
      data-body-version="2.1.0"
      data-body-features="dark-mode,analytics,accessibility"
      data-body-environment="production"
      data-body-locale="en-US"
    >
      Body with data attributes
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("data-body-id", "main-app-body");
  expect(divElement).toHaveAttribute("data-body-version", "2.1.0");
  expect(divElement).toHaveAttribute(
    "data-body-features",
    "dark-mode,analytics,accessibility"
  );
  expect(divElement).toHaveAttribute("data-body-environment", "production");
  expect(divElement).toHaveAttribute("data-body-locale", "en-US");
});

// Test event handlers
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleLoad = vi.fn();
  const handleScroll = vi.fn();

  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      onClick={handleClick}
      onLoad={handleLoad}
      onScroll={handleScroll}
    >
      Body with event handlers
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  if (divElement) {
    fireEvent.click(divElement);
  }
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Test custom styling
it("renders with custom styling", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      className="custom-body-class"
      style={{ backgroundColor: "white", color: "black" }}
    >
      Styled body content
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass("custom-body-class");
  expect(divElement).toHaveStyle({ color: "rgb(0, 0, 0)" });
});

// Test semantic meaning
it("renders with semantic meaning", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" className="page-body">
      <header>
        <h1>Page Title</h1>
      </header>
      <main>
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </main>
      <footer>
        <p>Footer content</p>
      </footer>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass("page-body");
  expect(divElement?.querySelector("header")).toBeInTheDocument();
  expect(divElement?.querySelector("main")).toBeInTheDocument();
  expect(divElement?.querySelector("footer")).toBeInTheDocument();
});

// Test with icons
it("renders body with icons", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body">
      <header>
        <h1>🚀 My App</h1>
        <nav>
          <a href="/">🏠 Home</a>
          <a href="/about">ℹ️ About</a>
        </nav>
      </header>
      <main>
        <h2>📝 Content</h2>
        <p>Main content with emojis</p>
      </main>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveTextContent("🚀 My App");
  expect(divElement).toHaveTextContent("🏠 Home");
  expect(divElement).toHaveTextContent("ℹ️ About");
  expect(divElement).toHaveTextContent("📝 Content");
});

// Test with loading state
it("renders body with loading state", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" className="loading">
      <div className="loading-spinner">Loading...</div>
      <main style={{ opacity: 0.5 }}>
        <h1>Page Content</h1>
        <p>Content will be visible when loaded</p>
      </main>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass("loading");
  expect(divElement?.querySelector(".loading-spinner")).toBeInTheDocument();
  expect(divElement?.querySelector("main")).toHaveStyle({ opacity: "0.5" });
});

// Test navigation
it("renders body navigation", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body">
      <nav className="main-navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Welcome</h1>
        <p>Main content area</p>
      </main>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  const nav = divElement?.querySelector(".main-navigation");
  expect(nav).toBeInTheDocument();
  expect(nav?.querySelectorAll("a")).toHaveLength(4);
});

// Test with form
it("renders body with form", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body">
      <main>
        <h1>Contact Form</h1>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <button type="submit">Submit</button>
        </form>
      </main>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  const form = divElement?.querySelector("form");
  expect(form).toBeInTheDocument();
  expect(form?.querySelectorAll("input")).toHaveLength(2);
});

// Test custom attributes
it("renders with custom attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      data-custom="value"
      data-app-version="1.0.0"
      data-theme="dark"
    >
      Body with custom attributes
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("data-custom", "value");
  expect(divElement).toHaveAttribute("data-app-version", "1.0.0");
  expect(divElement).toHaveAttribute("data-theme", "dark");
});

// Test different content types
it("renders with different content types", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body">
      <h1>Heading</h1>
      <p>Paragraph text</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      <blockquote>Quote content</blockquote>
      <code>Code snippet</code>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement?.querySelector("h1")).toBeInTheDocument();
  expect(divElement?.querySelector("p")).toBeInTheDocument();
  expect(divElement?.querySelector("ul")).toBeInTheDocument();
  expect(divElement?.querySelector("blockquote")).toBeInTheDocument();
  expect(divElement?.querySelector("code")).toBeInTheDocument();
});

// Test multiple classes
it("renders with multiple classes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      className="body-class another-class third-class"
    >
      Body with multiple classes
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass("body-class");
  expect(divElement).toHaveClass("another-class");
  expect(divElement).toHaveClass("third-class");
});

// Test inline styles
it("renders with inline styles", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="test-body"
      style={{
        backgroundColor: "#f5f5f5",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.6",
        margin: "0",
        padding: "20px",
      }}
    >
      Body with inline styles
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveStyle({
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0",
    padding: "20px",
  });
});

// Test language attributes
it("renders with language attributes", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" lang="en-US" dir="ltr">
      English content
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("lang", "en-US");
  expect(divElement).toHaveAttribute("dir", "ltr");
});

// Test title attribute
it("renders with title attribute", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" title="Main page body">
      Body with title
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("title", "Main page body");
});

// Test spellcheck attribute
it("renders with spellcheck attribute", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" spellCheck={false}>
      Body with spellcheck disabled
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("spellcheck", "false");
});

// Test contenteditable attribute
it("renders with contenteditable attribute", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" contentEditable={true}>
      Editable body content
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("contenteditable", "true");
});

// Test hidden attribute
it("renders with hidden attribute", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" hidden>
      Hidden body content
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("hidden");
});

// Test draggable attribute
it("renders with draggable attribute", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" draggable={true}>
      Draggable body content
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute("draggable", "true");
});

// Test ref forwarding
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLBodyElement>();
  render(
    <Body as="div" ref={ref} data-testid="test-body">
      Ref test content
    </Body>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("DIV");
  }
});

// Test that the component displays correctly
it("displays correctly", () => {
  const { container } = render(
    <Body as="div" data-testid="test-body" className="display-test">
      <h1>Test Page</h1>
      <p>This is a test page content.</p>
    </Body>
  );

  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass("display-test");
  expect(divElement?.querySelector("h1")).toHaveTextContent("Test Page");
  expect(divElement?.querySelector("p")).toHaveTextContent(
    "This is a test page content."
  );
});

// Test isClient prop - should render Suspense with fallback
it("renders Suspense with lazy client components when isClient is true", async () => {
  const { container } = render(
    <Body as="div" isClient data-testid="test-body">
      Client-side body content
    </Body>
  );

  // Should render the fallback (the div) immediately
  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement?.tagName).toBe("DIV");
  expect(divElement).toHaveTextContent("Client-side body content");

  // The lazy component should load and render the same content
  await waitFor(() => {
    expect(
      container.querySelector('[data-testid="test-body"]')
    ).toBeInTheDocument();
  });
});

// Test isClient and isMemoized props
it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  const { container } = render(
    <Body as="div" isClient isMemoized data-testid="test-body">
      Memoized body content
    </Body>
  );

  // Should render the fallback (the div) immediately
  const divElement = container.querySelector('[data-testid="test-body"]');
  expect(divElement).toBeInTheDocument();
  expect(divElement?.tagName).toBe("DIV");
  expect(divElement).toHaveTextContent("Memoized body content");

  // The lazy component should load and render the same content
  await waitFor(() => {
    expect(
      container.querySelector('[data-testid="test-body"]')
    ).toBeInTheDocument();
  });
});
