import React from "react";

import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Body } from ".";

// Helper function to get body element from container (now renders as div)
const getBodyElement = (container: HTMLElement) => {
  return container.querySelector(
    '[data-testid="body-element"]'
  ) as HTMLDivElement;
};

// Basic render test - Body renders as div by default in tests
it("renders a body element as div in test environment", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      Body content
    </Body>
  );
  const body = getBodyElement(container);
  expect(body?.tagName).toBe("DIV");
  expect(body).toHaveTextContent("Body content");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  const { container } = render(
    <Body as="section" data-testid="custom-section">
      Custom body content
    </Body>
  );
  const section = container.querySelector('[data-testid="custom-section"]');
  expect(section?.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("Custom body content");
});

// isClient prop test
it("renders client component when isClient is true", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element" isClient>
      Client body content
    </Body>
  );
  const body = getBodyElement(container);
  expect(body.tagName).toBe("DIV");
  expect(body).toHaveTextContent("Client body content");
});

// isMemoized prop test
it("renders memoized client component when isClient and isMemoized are true", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element" isClient isMemoized>
      Memoized body content
    </Body>
  );
  const body = getBodyElement(container);
  expect(body.tagName).toBe("DIV");
  expect(body).toHaveTextContent("Memoized body content");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <Body as="div" ref={ref as any}>
      Ref test content
    </Body>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("DIV");
  }
});

// Body-specific props test (now as div)
it("renders body with body-specific attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      className="main-body"
      id="app-body"
      lang="en"
      dir="ltr"
    >
      Body content with attributes
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("class", "main-body");
  expect(body).toHaveAttribute("id", "app-body");
  expect(body).toHaveAttribute("lang", "en");
  expect(body).toHaveAttribute("dir", "ltr");
  expect(body).toHaveTextContent("Body content with attributes");
});

// Children rendering test
it("renders body children correctly", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <header>Header content</header>
      <main>Main content</main>
      <footer>Footer content</footer>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveTextContent("Header content");
  expect(body).toHaveTextContent("Main content");
  expect(body).toHaveTextContent("Footer content");
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
});

// Accessibility test
it("supports accessibility attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      aria-label="Main application body"
      role="application"
      tabIndex={0}
    >
      Accessible body content
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("aria-label", "Main application body");
  expect(body).toHaveAttribute("role", "application");
  expect(body).toHaveAttribute("tabindex", "0");
});

// Data attributes test
it("supports data attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      data-body-type="main"
      data-theme="dark"
      data-layout="responsive"
    >
      Body with data attributes
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("data-body-type", "main");
  expect(body).toHaveAttribute("data-theme", "dark");
  expect(body).toHaveAttribute("data-layout", "responsive");
});

// Event handlers test
it("supports event handlers", () => {
  const handleClick = vi.fn();
  const handleLoad = vi.fn();

  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      onClick={handleClick}
      onLoad={handleLoad}
    >
      Interactive body
    </Body>
  );

  const body = getBodyElement(container);
  body.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Custom styling test
it("supports custom styling", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      className="custom-body-class"
      style={{ backgroundColor: "black", color: "white" }}
    >
      Styled body content
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("custom-body-class");
  expect(body).toHaveStyle(
    "background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);"
  );
});

// Semantic meaning test (as div)
it("maintains semantic meaning as document body container", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <h1>Page Title</h1>
      <nav>Navigation</nav>
      <article>Article content</article>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("h1")).toBeInTheDocument();
  expect(body.querySelector("nav")).toBeInTheDocument();
  expect(body.querySelector("article")).toBeInTheDocument();
});

// Complex nested children test
it("renders complex nested children", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
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
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("main")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
  expect(body.querySelectorAll("li")).toHaveLength(2);
  expect(body.querySelector("h1")).toBeInTheDocument();
});

// Language and direction test
it("supports language and direction attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      lang="ar"
      dir="rtl"
      translate="no"
    >
      Arabic content
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("lang", "ar");
  expect(body).toHaveAttribute("dir", "rtl");
  expect(body).toHaveAttribute("translate", "no");
});

// Loading state test
it("handles loading states", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element" className="loading">
      <div>Loading content...</div>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("loading");
  expect(body).toHaveTextContent("Loading content...");
});

// Navigation test
it("supports navigation elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </Body>
  );

  const body = getBodyElement(container);
  const nav = body.querySelector("nav");
  expect(nav).toHaveAttribute("aria-label", "Main navigation");
  expect(body.querySelectorAll("a")).toHaveLength(2);
});

// Form elements test
it("supports form elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />
        <button type="submit">Submit</button>
      </form>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("form")).toBeInTheDocument();
  expect(body.querySelector("input")).toBeInTheDocument();
  expect(body.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test
it("supports custom attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      data-custom="value"
      data-app-version="1.0.0"
      data-feature-flags="dark-mode,analytics"
    >
      Body with custom attributes
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("data-custom", "value");
  expect(body).toHaveAttribute("data-app-version", "1.0.0");
  expect(body).toHaveAttribute("data-feature-flags", "dark-mode,analytics");
});

// Different content types test
it("handles different content types", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <div>Text content</div>
      <img src="image.jpg" alt="Description" />
      <video src="video.mp4" controls />
      <audio src="audio.mp3" controls />
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("div")).toBeInTheDocument();
  expect(body.querySelector("img")).toBeInTheDocument();
  expect(body.querySelector("video")).toBeInTheDocument();
  expect(body.querySelector("audio")).toBeInTheDocument();
});

// Multiple classes test
it("supports multiple CSS classes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      className="body-main body-dark body-responsive"
    >
      Body with multiple classes
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveClass("body-main");
  expect(body).toHaveClass("body-dark");
  expect(body).toHaveClass("body-responsive");
});

// Inline styles test
it("supports inline styles", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      style={{
        margin: "0",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
      }}
    >
      Body with inline styles
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveStyle({
    margin: "0",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  });
});

// Title and spellcheck test
it("supports title and spellcheck attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      title="Main application body"
      spellCheck={false}
    >
      Body with title and spellcheck
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("title", "Main application body");
  expect(body).toHaveAttribute("spellcheck", "false");
});

// Contenteditable and hidden test
it("supports contenteditable and hidden attributes", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element" contentEditable={true} hidden>
      Editable and hidden body
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("contenteditable", "true");
  expect(body).toHaveAttribute("hidden");
});

// Draggable test
it("supports draggable attribute", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element" draggable={true}>
      Draggable body
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("draggable", "true");
});

// Special characters test
it("handles special characters in content", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      Content with special chars: &copy; &trade; &reg; &deg; &plusmn;
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveTextContent("Content with special chars: © ™ ® ° ±");
});

// Definition lists test
it("supports definition lists", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <dl>
        <dt>Term 1</dt>
        <dd>Definition 1</dd>
        <dt>Term 2</dt>
        <dd>Definition 2</dd>
      </dl>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("dl")).toBeInTheDocument();
  expect(body.querySelectorAll("dt")).toHaveLength(2);
  expect(body.querySelectorAll("dd")).toHaveLength(2);
});

// Tables test
it("supports table elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <table>
        <caption>Sample Table</caption>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </tr>
        </tbody>
      </table>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("table")).toBeInTheDocument();
  expect(body.querySelector("caption")).toBeInTheDocument();
  expect(body.querySelector("thead")).toBeInTheDocument();
  expect(body.querySelector("tbody")).toBeInTheDocument();
});

// Time elements test
it("supports time elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <time dateTime="2023-12-25">Christmas Day</time>
      <time dateTime="2023-12-31T23:59:59">New Year&apos;s Eve</time>
    </Body>
  );

  const body = getBodyElement(container);
  const timeElements = body.querySelectorAll("time");
  expect(timeElements).toHaveLength(2);
  expect(timeElements[0]).toHaveAttribute("datetime", "2023-12-25");
  expect(timeElements[1]).toHaveAttribute("datetime", "2023-12-31T23:59:59");
});

// Code elements test
it("supports code elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <code>const example = &quot;Hello World&quot;;</code>
      <pre>
        <code>{`function example() {\n  return "Hello World";\n}`}</code>
      </pre>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("code")).toBeInTheDocument();
  expect(body.querySelector("pre")).toBeInTheDocument();
  expect(body).toHaveTextContent('const example = "Hello World";');
});

// Links test
it("supports link elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <a href="https://example.com">External Link</a>
      <a href="/internal">Internal Link</a>
      <a href="mailto:test@example.com">Email Link</a>
    </Body>
  );

  const body = getBodyElement(container);
  const links = body.querySelectorAll("a");
  expect(links).toHaveLength(3);
  expect(links[0]).toHaveAttribute("href", "https://example.com");
  expect(links[1]).toHaveAttribute("href", "/internal");
  expect(links[2]).toHaveAttribute("href", "mailto:test@example.com");
});

// Images test
it("supports image elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <img src="image1.jpg" alt="Description 1" />
      <img src="image2.jpg" alt="Description 2" />
      <picture>
        <source srcSet="image.webp" type="image/webp" />
        <img src="image.jpg" alt="Picture element" />
      </picture>
    </Body>
  );

  const body = getBodyElement(container);
  const images = body.querySelectorAll("img");
  expect(images).toHaveLength(3);
  expect(body.querySelector("picture")).toBeInTheDocument();
});

// Blockquotes test
it("supports blockquote elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <blockquote cite="https://example.com/source">
        <p>This is a quote</p>
        <cite>Author Name</cite>
      </blockquote>
    </Body>
  );

  const body = getBodyElement(container);
  const blockquote = body.querySelector("blockquote");
  expect(blockquote).toBeInTheDocument();
  expect(blockquote).toHaveAttribute("cite", "https://example.com/source");
  expect(blockquote?.querySelector("cite")).toBeInTheDocument();
});

// Lists test
it("supports list elements", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element">
      <ul>
        <li>Unordered item 1</li>
        <li>Unordered item 2</li>
      </ul>
      <ol>
        <li>Ordered item 1</li>
        <li>Ordered item 2</li>
      </ol>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.querySelector("ul")).toBeInTheDocument();
  expect(body.querySelector("ol")).toBeInTheDocument();
  expect(body.querySelectorAll("li")).toHaveLength(4);
});

// Enhanced custom attributes test
it("supports enhanced custom attributes", () => {
  const { container } = render(
    <Body
      as="div"
      data-testid="body-element"
      data-body-id="main-app-body"
      data-body-version="2.1.0"
      data-body-features="dark-mode,analytics,accessibility"
      data-body-environment="production"
      data-body-locale="en-US"
    >
      Body with enhanced attributes
    </Body>
  );

  const body = getBodyElement(container);
  expect(body).toHaveAttribute("data-body-id", "main-app-body");
  expect(body).toHaveAttribute("data-body-version", "2.1.0");
  expect(body).toHaveAttribute(
    "data-body-features",
    "dark-mode,analytics,accessibility"
  );
  expect(body).toHaveAttribute("data-body-environment", "production");
  expect(body).toHaveAttribute("data-body-locale", "en-US");
});

// Empty children test - real-world scenario
it("renders with empty children", () => {
  const { container } = render(
    <Body as="div" data-testid="body-element"></Body>
  );
  const body = getBodyElement(container);
  expect(body).toBeInTheDocument();
  expect(body).toHaveTextContent("");
});

// Runtime warning test - development guidance
it("shows development warnings when no explicit 'as' prop is provided", () => {
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";

  render(<Body>Content without explicit as prop</Body>);

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining("[Body Component] No explicit 'as' prop provided")
  );

  consoleSpy.mockRestore();
  process.env.NODE_ENV = originalEnv;
});

// Runtime warning test for body element usage
it("shows development warnings when rendering as body element", () => {
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";

  render(<Body as="body">Content as body element</Body>);

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining("[Body Component] Rendering as <body> element")
  );

  consoleSpy.mockRestore();
  process.env.NODE_ENV = originalEnv;
});

// Integration test - real-world semantic page structure
it("works as semantic page wrapper with other components", () => {
  const { container } = render(
    <Body as="main" data-testid="body-element" className="page-content">
      <header>
        <h1>Page Title</h1>
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
      <section>
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
        <article>
          <h3>Article Title</h3>
          <p>Article content here.</p>
        </article>
      </section>
      <aside>
        <h3>Sidebar</h3>
        <p>Sidebar content.</p>
      </aside>
      <footer>
        <p>&copy; 2024 Company Name</p>
      </footer>
    </Body>
  );

  const body = getBodyElement(container);
  expect(body.tagName).toBe("MAIN");
  expect(body).toHaveClass("page-content");
  expect(body.querySelector("header")).toBeInTheDocument();
  expect(body.querySelector("nav")).toBeInTheDocument();
  expect(body.querySelector("section")).toBeInTheDocument();
  expect(body.querySelector("article")).toBeInTheDocument();
  expect(body.querySelector("aside")).toBeInTheDocument();
  expect(body.querySelector("footer")).toBeInTheDocument();
  expect(body.querySelectorAll("a")).toHaveLength(2);
  expect(body).toHaveTextContent("Page Title");
  expect(body).toHaveTextContent("Main Content");
  expect(body).toHaveTextContent("Article Title");
  expect(body).toHaveTextContent("Sidebar");
  expect(body).toHaveTextContent("© 2024 Company Name");
});
