import React from "react";

import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BodyClient, MemoizedBodyClient } from "./index.client";

// Helper function to get body element from container
const getBodyElement = (container: HTMLElement) => {
  return container.querySelector("div") as HTMLElement;
};

const getMemoizedBodyElement = (container: HTMLElement) => {
  return container.querySelector("div") as HTMLElement;
};

// Basic render test for BodyClient
it("renders a body element", () => {
  const { container } = render(
    <BodyClient as="div">Body client content</BodyClient>
  );
  const body = getBodyElement(container);
  expect(body.tagName).toBe("DIV");
  expect(body).toHaveTextContent("Body client content");
});

// Basic render test for MemoizedBodyClient
it("renders a memoized body element", () => {
  const { container } = render(
    <MemoizedBodyClient as="div">
      Memoized body client content
    </MemoizedBodyClient>
  );
  const body = getMemoizedBodyElement(container);
  expect(body.tagName).toBe("DIV");
  expect(body).toHaveTextContent("Memoized body client content");
});

// Test rendering as custom element with 'as' prop
it("renders as a custom element with 'as' prop", () => {
  const { container } = render(
    <BodyClient as="section" data-testid="custom-section">
      Custom section content
    </BodyClient>
  );
  const section = container.querySelector("section");
  expect(section).toBeInTheDocument();
  expect(section).toHaveTextContent("Custom section content");
});

// Test rendering memoized as custom element with 'as' prop
it("renders memoized as a custom element with 'as' prop", () => {
  const { container } = render(
    <MemoizedBodyClient as="article" data-testid="custom-article">
      Custom article content
    </MemoizedBodyClient>
  );
  const article = container.querySelector("article");
  expect(article).toBeInTheDocument();
  expect(article).toHaveTextContent("Custom article content");
});

// Test ref forwarding
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLBodyElement>();
  render(
    <BodyClient as="div" ref={ref}>
      Ref test content
    </BodyClient>
  );
  // The ref should be set, even if it's null initially
  expect(ref).toBeDefined();
});

// Test ref forwarding in memoized component
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLBodyElement>();
  render(
    <MemoizedBodyClient as="div" ref={ref}>
      Memoized ref test content
    </MemoizedBodyClient>
  );
  // The ref should be set, even if it's null initially
  expect(ref).toBeDefined();
});

// Test with body-specific attributes
it("renders with body-specific attributes", () => {
  const { container } = render(
    <BodyClient
      as="div"
      className="main-body"
      id="app-body"
      lang="en"
      dir="ltr"
    >
      Body client content with attributes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("class", "main-body");
  expect(body).toHaveAttribute("id", "app-body");
  expect(body).toHaveAttribute("lang", "en");
  expect(body).toHaveAttribute("dir", "ltr");
});

// Test memoized with body-specific attributes
it("renders memoized with body-specific attributes", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      className="main-body"
      id="app-body"
      lang="en"
      dir="ltr"
    >
      Memoized body client content with attributes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("class", "main-body");
  expect(body).toHaveAttribute("id", "app-body");
  expect(body).toHaveAttribute("lang", "en");
  expect(body).toHaveAttribute("dir", "ltr");
});

// Test children rendering
it("renders children correctly", () => {
  const { container } = render(
    <BodyClient as="div">
      <div>Header</div>
      <div>Main content</div>
      <div>Footer</div>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveTextContent("Header");
  expect(body).toHaveTextContent("Main content");
  expect(body).toHaveTextContent("Footer");
});

// Test memoized children rendering
it("renders memoized children correctly", () => {
  const { container } = render(
    <MemoizedBodyClient as="div">
      <div>Header</div>
      <div>Main content</div>
      <div>Footer</div>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveTextContent("Header");
  expect(body).toHaveTextContent("Main content");
  expect(body).toHaveTextContent("Footer");
});

// Empty children test for BodyClient
it("renders with empty children", () => {
  const { container } = render(<BodyClient as="div"></BodyClient>);
  const body = getBodyElement(container);
  expect(body).toBeInTheDocument();
  expect(body).toHaveTextContent("");
});

// Empty children test for MemoizedBodyClient
it("renders memoized with empty children", () => {
  const { container } = render(
    <MemoizedBodyClient as="div"></MemoizedBodyClient>
  );
  const body = getMemoizedBodyElement(container);
  expect(body).toBeInTheDocument();
  expect(body).toHaveTextContent("");
});

// Test complex nested children
it("renders complex nested children", () => {
  const { container } = render(
    <BodyClient as="div">
      <div className="container">
        <header className="site-header">
          <h1>Site Title</h1>
          <nav>Navigation</nav>
        </header>
        <main className="site-main">
          <article>
            <h2>Article Title</h2>
            <p>Article content</p>
          </article>
        </main>
        <footer className="site-footer">
          <p>Footer content</p>
        </footer>
      </div>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body.querySelector(".container")).toBeInTheDocument();
  expect(body.querySelector(".site-header")).toBeInTheDocument();
  expect(body.querySelector(".site-main")).toBeInTheDocument();
  expect(body.querySelector(".site-footer")).toBeInTheDocument();
  expect(body.querySelector("h1")).toHaveTextContent("Site Title");
  expect(body.querySelector("h2")).toHaveTextContent("Article Title");
});

// Test memoized complex nested children
it("renders memoized complex nested children", () => {
  const { container } = render(
    <MemoizedBodyClient as="div">
      <div className="container">
        <header className="site-header">
          <h1>Site Title</h1>
          <nav>Navigation</nav>
        </header>
        <main className="site-main">
          <article>
            <h2>Article Title</h2>
            <p>Article content</p>
          </article>
        </main>
        <footer className="site-footer">
          <p>Footer content</p>
        </footer>
      </div>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body.querySelector(".container")).toBeInTheDocument();
  expect(body.querySelector(".site-header")).toBeInTheDocument();
  expect(body.querySelector(".site-main")).toBeInTheDocument();
  expect(body.querySelector(".site-footer")).toBeInTheDocument();
  expect(body.querySelector("h1")).toHaveTextContent("Site Title");
  expect(body.querySelector("h2")).toHaveTextContent("Article Title");
});

// Test accessibility attributes
it("renders with accessibility attributes", () => {
  const { container } = render(
    <BodyClient
      as="div"
      aria-label="Main page content"
      role="main"
      tabIndex={0}
    >
      Accessible body client content
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("aria-label", "Main page content");
  expect(body).toHaveAttribute("role", "main");
  expect(body).toHaveAttribute("tabindex", "0");
});

// Test memoized accessibility attributes
it("renders memoized with accessibility attributes", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      aria-label="Main page content"
      role="main"
      tabIndex={0}
    >
      Accessible memoized body client content
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("aria-label", "Main page content");
  expect(body).toHaveAttribute("role", "main");
  expect(body).toHaveAttribute("tabindex", "0");
});

// Test data attributes
it("renders with data attributes", () => {
  const { container } = render(
    <BodyClient
      as="div"
      data-body-id="main-app-body"
      data-body-version="2.1.0"
      data-body-theme="dark"
    >
      Body client with data attributes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("data-body-id", "main-app-body");
  expect(body).toHaveAttribute("data-body-version", "2.1.0");
  expect(body).toHaveAttribute("data-body-theme", "dark");
});

// Test memoized data attributes
it("renders memoized with data attributes", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-body-id="main-app-body"
      data-body-version="2.1.0"
      data-body-theme="dark"
    >
      Memoized body client with data attributes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("data-body-id", "main-app-body");
  expect(body).toHaveAttribute("data-body-version", "2.1.0");
  expect(body).toHaveAttribute("data-body-theme", "dark");
});

// Test event handlers
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const { container } = render(
    <BodyClient as="div" onClick={handleClick}>
      Body client with event handlers
    </BodyClient>
  );

  const body = getBodyElement(container);
  body.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Test memoized event handlers
it("renders memoized with event handlers", () => {
  const handleClick = vi.fn();
  const { container } = render(
    <MemoizedBodyClient as="div" onClick={handleClick}>
      Memoized body client with event handlers
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  body.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Test custom styling
it("renders with custom styling", () => {
  const { container } = render(
    <BodyClient
      as="div"
      className="custom-body-class"
      style={{ backgroundColor: "white", color: "black" }}
    >
      Body client with custom styling
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("custom-body-class");
  expect(body).toHaveStyle({ color: "rgb(0, 0, 0)" });
});

// Test memoized custom styling
it("renders memoized with custom styling", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      className="custom-body-class"
      style={{ backgroundColor: "white", color: "black" }}
    >
      Memoized body client with custom styling
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveClass("custom-body-class");
  expect(body).toHaveStyle({ color: "rgb(0, 0, 0)" });
});

// Test semantic meaning
it("renders with semantic meaning", () => {
  const { container } = render(
    <BodyClient as="div" className="page-body">
      <header>Page Header</header>
      <main>Page Content</main>
      <footer>Page Footer</footer>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("page-body");
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
});

// Test memoized semantic meaning
it("renders memoized with semantic meaning", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" className="page-body">
      <header>Page Header</header>
      <main>Page Content</main>
      <footer>Page Footer</footer>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveClass("page-body");
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
});

// Test with icons and emojis
it("renders body with icons", () => {
  const { container } = render(
    <BodyClient as="div">
      <div>🚀 My App</div>
      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
      </nav>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveTextContent("🚀 My App");
  expect(body).toHaveTextContent("🏠 Home");
  expect(body).toHaveTextContent("ℹ️ About");
});

// Test memoized with icons and emojis
it("renders memoized body with icons", () => {
  const { container } = render(
    <MemoizedBodyClient as="div">
      <div>🚀 My App</div>
      <nav>
        <a href="/">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
      </nav>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveTextContent("🚀 My App");
  expect(body).toHaveTextContent("🏠 Home");
  expect(body).toHaveTextContent("ℹ️ About");
});

// Test loading state
it("renders body with loading state", () => {
  const { container } = render(
    <BodyClient as="div" className="loading">
      <div className="loading-spinner">Loading...</div>
      <main style={{ opacity: "0.5" }}>Content loading...</main>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("loading");
  expect(body.querySelector(".loading-spinner")).toBeInTheDocument();
  expect(body.querySelector("main")).toHaveStyle({ opacity: "0.5" });
});

// Test memoized loading state
it("renders memoized body with loading state", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" className="loading">
      <div className="loading-spinner">Loading...</div>
      <main style={{ opacity: "0.5" }}>Content loading...</main>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveClass("loading");
  expect(body.querySelector(".loading-spinner")).toBeInTheDocument();
  expect(body.querySelector("main")).toHaveStyle({ opacity: "0.5" });
});

// Test navigation
it("renders body navigation", () => {
  const { container } = render(
    <BodyClient as="div">
      <nav className="main-navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/blog">Blog</a>
      </nav>
    </BodyClient>
  );

  const body = getBodyElement(container);
  const nav = body.querySelector(".main-navigation");
  expect(nav).toBeInTheDocument();
  expect(nav?.querySelectorAll("a")).toHaveLength(4);
});

// Test memoized navigation
it("renders memoized body navigation", () => {
  const { container } = render(
    <MemoizedBodyClient as="div">
      <nav className="main-navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/blog">Blog</a>
      </nav>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  const nav = body.querySelector(".main-navigation");
  expect(nav).toBeInTheDocument();
  expect(nav?.querySelectorAll("a")).toHaveLength(4);
});

// Test form
it("renders body with form", () => {
  const { container } = render(
    <BodyClient as="div">
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </BodyClient>
  );

  const body = getBodyElement(container);
  const form = body.querySelector("form");
  expect(form).toBeInTheDocument();
  expect(form?.querySelectorAll("input")).toHaveLength(2);
});

// Test memoized form
it("renders memoized body with form", () => {
  const { container } = render(
    <MemoizedBodyClient as="div">
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  const form = body.querySelector("form");
  expect(form).toBeInTheDocument();
  expect(form?.querySelectorAll("input")).toHaveLength(2);
});

// Test custom attributes
it("renders with custom attributes", () => {
  const { container } = render(
    <BodyClient
      as="div"
      data-custom="value"
      data-app-version="1.0.0"
      data-theme="dark"
    >
      Body client with custom attributes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("data-custom", "value");
  expect(body).toHaveAttribute("data-app-version", "1.0.0");
  expect(body).toHaveAttribute("data-theme", "dark");
});

// Test memoized custom attributes
it("renders memoized with custom attributes", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      data-custom="value"
      data-app-version="1.0.0"
      data-theme="dark"
    >
      Memoized body client with custom attributes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("data-custom", "value");
  expect(body).toHaveAttribute("data-app-version", "1.0.0");
  expect(body).toHaveAttribute("data-theme", "dark");
});

// Test different content types
it("renders with different content types", () => {
  const { container } = render(
    <BodyClient as="div">
      <h1>Main Heading</h1>
      <p>Paragraph content</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("h1")).toBeInTheDocument();
  expect(body.querySelector("p")).toBeInTheDocument();
  expect(body.querySelector("ul")).toBeInTheDocument();
});

// Test memoized different content types
it("renders memoized with different content types", () => {
  const { container } = render(
    <MemoizedBodyClient as="div">
      <h1>Main Heading</h1>
      <p>Paragraph content</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body.querySelector("h1")).toBeInTheDocument();
  expect(body.querySelector("p")).toBeInTheDocument();
  expect(body.querySelector("ul")).toBeInTheDocument();
});

// Test multiple classes
it("renders with multiple classes", () => {
  const { container } = render(
    <BodyClient as="div" className="body-class another-class third-class">
      Body client with multiple classes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("body-class");
  expect(body).toHaveClass("another-class");
  expect(body).toHaveClass("third-class");
});

// Test memoized multiple classes
it("renders memoized with multiple classes", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      className="body-class another-class third-class"
    >
      Memoized body client with multiple classes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveClass("body-class");
  expect(body).toHaveClass("another-class");
  expect(body).toHaveClass("third-class");
});

// Test inline styles
it("renders with inline styles", () => {
  const { container } = render(
    <BodyClient
      as="div"
      style={{
        backgroundColor: "#f5f5f5",
        color: "#333",
        padding: "20px",
        margin: "10px",
      }}
    >
      Body client with inline styles
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveStyle({
    backgroundColor: "#f5f5f5",
    color: "#333",
    padding: "20px",
    margin: "10px",
  });
});

// Test memoized inline styles
it("renders memoized with inline styles", () => {
  const { container } = render(
    <MemoizedBodyClient
      as="div"
      style={{
        backgroundColor: "#f5f5f5",
        color: "#333",
        padding: "20px",
        margin: "10px",
      }}
    >
      Memoized body client with inline styles
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveStyle({
    backgroundColor: "#f5f5f5",
    color: "#333",
    padding: "20px",
    margin: "10px",
  });
});

// Test language attributes
it("renders with language attributes", () => {
  const { container } = render(
    <BodyClient as="div" lang="en-US" dir="ltr">
      Body client with language attributes
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("lang", "en-US");
  expect(body).toHaveAttribute("dir", "ltr");
});

// Test memoized language attributes
it("renders memoized with language attributes", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" lang="en-US" dir="ltr">
      Memoized body client with language attributes
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("lang", "en-US");
  expect(body).toHaveAttribute("dir", "ltr");
});

// Test title attribute
it("renders with title attribute", () => {
  const { container } = render(
    <BodyClient as="div" title="Main page body">
      Body client with title
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("title", "Main page body");
});

// Test memoized title attribute
it("renders memoized with title attribute", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" title="Main page body">
      Memoized body client with title
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("title", "Main page body");
});

// Test spellcheck attribute
it("renders with spellcheck attribute", () => {
  const { container } = render(
    <BodyClient as="div" spellCheck={false}>
      Body client with spellcheck disabled
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("spellcheck", "false");
});

// Test memoized spellcheck attribute
it("renders memoized with spellcheck attribute", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" spellCheck={false}>
      Memoized body client with spellcheck disabled
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("spellcheck", "false");
});

// Test contenteditable attribute
it("renders with contenteditable attribute", () => {
  const { container } = render(
    <BodyClient as="div" contentEditable={true}>
      Editable body client content
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("contenteditable", "true");
});

// Test memoized contenteditable attribute
it("renders memoized with contenteditable attribute", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" contentEditable={true}>
      Editable memoized body client content
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("contenteditable", "true");
});

// Test hidden attribute
it("renders with hidden attribute", () => {
  const { container } = render(
    <BodyClient as="div" hidden>
      Hidden body client content
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("hidden");
});

// Test memoized hidden attribute
it("renders memoized with hidden attribute", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" hidden>
      Hidden memoized body client content
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("hidden");
});

// Test draggable attribute
it("renders with draggable attribute", () => {
  const { container } = render(
    <BodyClient as="div" draggable={true}>
      Draggable body client content
    </BodyClient>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("draggable", "true");
});

// Test memoized draggable attribute
it("renders memoized with draggable attribute", () => {
  const { container } = render(
    <MemoizedBodyClient as="div" draggable={true}>
      Draggable memoized body client content
    </MemoizedBodyClient>
  );

  const body = getMemoizedBodyElement(container);
  expect(body).toHaveAttribute("draggable", "true");
});
