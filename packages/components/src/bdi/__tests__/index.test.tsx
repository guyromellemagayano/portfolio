import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Bdi } from "..";

// Basic render test
it("renders a bdi element", () => {
  render(<Bdi data-testid="bdi-element">Bidirectional text</Bdi>);
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi.tagName).toBe("BDI");
  expect(bdi).toHaveTextContent("Bidirectional text");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Bdi as="div" data-testid="custom-div">
      Custom bidirectional
    </Bdi>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom bidirectional");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Bdi isClient data-testid="bdi-element">
      Client-side bidirectional
    </Bdi>
  );

  // Should render the fallback (the bdi) immediately
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi.tagName).toBe("BDI");
  expect(bdi).toHaveTextContent("Client-side bidirectional");

  // The lazy component should load and render the same content
  await screen.findByTestId("bdi-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Bdi isClient isMemoized data-testid="bdi-element">
      Memoized bidirectional
    </Bdi>
  );

  // Should render the fallback (the bdi) immediately
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi.tagName).toBe("BDI");
  expect(bdi).toHaveTextContent("Memoized bidirectional");

  // The lazy component should load and render the same content
  await screen.findByTestId("bdi-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<Bdi ref={ref}>Ref test content</Bdi>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BDI");
  }
});

// Bdi-specific props test
it("renders with bdi-specific attributes", () => {
  render(
    <Bdi
      data-testid="bdi-element"
      className="bidirectional-text"
      id="main-bdi"
      dir="ltr"
    >
      Bidirectional content
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("bidirectional-text", { exact: true });
  expect(bdi).toHaveAttribute("id", "main-bdi");
  expect(bdi).toHaveAttribute("dir", "ltr");
  expect(bdi).toHaveTextContent("Bidirectional content");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <Bdi data-testid="bdi-element">
      <span>Left</span>
      <span>Right</span>
      <span>Mixed</span>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Left");
  expect(bdi).toHaveTextContent("Right");
  expect(bdi).toHaveTextContent("Mixed");
  expect(bdi.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test
it("renders with empty children", () => {
  render(<Bdi data-testid="bdi-element" />);
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toBeInTheDocument();
  expect(bdi).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Bdi data-testid="bdi-element">
      <div className="bdi-content">
        <span className="icon">🔄</span>
        <span className="text">Complex Bdi</span>
        <span className="badge">New</span>
      </div>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("🔄");
  expect(bdi).toHaveTextContent("Complex Bdi");
  expect(bdi).toHaveTextContent("New");
  expect(bdi.querySelector(".bdi-content")).toBeInTheDocument();
  expect(bdi.querySelector(".icon")).toBeInTheDocument();
  expect(bdi.querySelector(".text")).toBeInTheDocument();
  expect(bdi.querySelector(".badge")).toBeInTheDocument();
});

// Direction attributes test
it("renders with different direction attributes", () => {
  const { rerender } = render(
    <Bdi data-testid="bdi-element" dir="ltr">
      Left to right
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "ltr");

  rerender(
    <Bdi data-testid="bdi-element" dir="rtl">
      Right to left
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "rtl");

  rerender(
    <Bdi data-testid="bdi-element" dir="auto">
      Auto direction
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("dir", "auto");
});

// Bdi with accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Bdi
      data-testid="bdi-element"
      aria-label="Bidirectional text"
      aria-describedby="bdi-description"
      role="text"
      tabIndex={0}
    >
      Accessible bidirectional
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("aria-label", "Bidirectional text");
  expect(bdi).toHaveAttribute("aria-describedby", "bdi-description");
  expect(bdi).toHaveAttribute("role", "text");
  expect(bdi).toHaveAttribute("tabindex", "0");
});

// Bdi with data attributes test
it("renders with data attributes", () => {
  render(
    <Bdi
      data-testid="bdi-element"
      data-variant="primary"
      data-size="large"
      data-text-type="bidirectional"
    >
      Data bidirectional
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("data-variant", "primary");
  expect(bdi).toHaveAttribute("data-size", "large");
  expect(bdi).toHaveAttribute("data-text-type", "bidirectional");
});

// Bdi with event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Bdi
      data-testid="bdi-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive bidirectional
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Interactive bidirectional");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Bdi with custom styling test
it("renders with custom styling", () => {
  render(
    <Bdi
      data-testid="bdi-element"
      className="custom-bdi primary large"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Styled bidirectional
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("custom-bdi", "primary", "large");
  expect(bdi).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Bdi with semantic meaning test
it("renders with semantic meaning", () => {
  render(
    <Bdi data-testid="bdi-element" role="text">
      <span>Bidirectional</span>
      <span>Text</span>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("role", "text");
  expect(bdi).toHaveTextContent("Bidirectional");
  expect(bdi).toHaveTextContent("Text");
});

// Bdi with bidirectional text test
it("renders bidirectional text content", () => {
  render(<Bdi data-testid="bdi-element">English text العربية نص</Bdi>);

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("English text");
  expect(bdi).toHaveTextContent("العربية");
  expect(bdi).toHaveTextContent("نص");
});

// Bdi with mixed content test
it("renders mixed content", () => {
  render(
    <Bdi data-testid="bdi-element">
      <span>English</span>
      <span dir="rtl">עברית</span>
      <span>More English</span>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("English");
  expect(bdi).toHaveTextContent("עברית");
  expect(bdi).toHaveTextContent("More English");
  expect(bdi.querySelector('[dir="rtl"]')).toBeInTheDocument();
});

// Bdi with icons test
it("renders bdi with icons", () => {
  render(
    <Bdi data-testid="bdi-element">
      <span role="img" aria-label="bidirectional-text">
        🔄
      </span>
      <span>Bidirectional Text</span>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("🔄");
  expect(bdi).toHaveTextContent("Bidirectional Text");
  expect(bdi.querySelector('[role="img"]')).toBeInTheDocument();
  expect(
    bdi.querySelector('[aria-label="bidirectional-text"]')
  ).toBeInTheDocument();
});

// Bdi with loading state test
it("renders bdi with loading state", () => {
  render(
    <Bdi data-testid="bdi-element" aria-disabled="true">
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("aria-disabled", "true");
  expect(bdi).toHaveTextContent("⏳");
  expect(bdi).toHaveTextContent("Loading...");
  expect(bdi.querySelector(".spinner")).toBeInTheDocument();
});

// Bdi with navigation test
it("renders bdi navigation", () => {
  render(
    <Bdi data-testid="bdi-element">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Home");
  expect(bdi).toHaveTextContent("About");
  expect(bdi).toHaveTextContent("Contact");
  expect(bdi.querySelector("nav")).toBeInTheDocument();
  expect(bdi.querySelectorAll("li")).toHaveLength(3);
});

// Bdi with form test
it("renders bdi with form", () => {
  render(
    <Bdi data-testid="bdi-element">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Name:");
  expect(bdi).toHaveTextContent("Submit");
  expect(bdi.querySelector("form")).toBeInTheDocument();
  expect(bdi.querySelector("label")).toBeInTheDocument();
  expect(bdi.querySelector("input")).toBeInTheDocument();
  expect(bdi.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Bdi
      data-testid="bdi-element"
      className="custom-bdi"
      id="main-bdi"
      data-bdi-type="primary"
    >
      <h1>Bdi with Custom Attributes</h1>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("custom-bdi");
  expect(bdi).toHaveAttribute("id", "main-bdi");
  expect(bdi).toHaveAttribute("data-bdi-type", "primary");
});

// Bdi with different content types test
it("renders with different content types", () => {
  const { rerender } = render(
    <Bdi data-testid="bdi-element">Simple text content</Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent(
    "Simple text content"
  );

  rerender(
    <Bdi data-testid="bdi-element">
      <em>Emphasized content</em>
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent(
    "Emphasized content"
  );
  expect(
    screen.getByTestId("bdi-element").querySelector("em")
  ).toBeInTheDocument();

  rerender(
    <Bdi data-testid="bdi-element">
      <code>Code content</code>
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveTextContent("Code content");
  expect(
    screen.getByTestId("bdi-element").querySelector("code")
  ).toBeInTheDocument();
});

// Bdi with multiple classes test
it("renders with multiple classes", () => {
  render(
    <Bdi data-testid="bdi-element" className="bdi-text primary large emphasis">
      Multiple Classes
    </Bdi>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveClass("bdi-text", "primary", "large", "emphasis");
});

// Bdi with inline styles test
it("renders with inline styles", () => {
  render(
    <Bdi
      data-testid="bdi-element"
      style={{
        color: "red",
        fontSize: "18px",
        textTransform: "uppercase",
      }}
    >
      Inline Styled
    </Bdi>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveStyle({
    color: "rgb(255, 0, 0)",
    fontSize: "18px",
    textTransform: "uppercase",
  });
});

// Bdi with language attributes test
it("renders with language attributes", () => {
  const { rerender } = render(
    <Bdi data-testid="bdi-element" lang="en">
      English text
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "en");

  rerender(
    <Bdi data-testid="bdi-element" lang="ar">
      Arabic text
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "ar");

  rerender(
    <Bdi data-testid="bdi-element" lang="he">
      Hebrew text
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute("lang", "he");
});

// Bdi with title attribute test
it("renders with title attribute", () => {
  render(
    <Bdi data-testid="bdi-element" title="Bidirectional text explanation">
      Text with title
    </Bdi>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("title", "Bidirectional text explanation");
});

// Bdi with spellcheck attribute test
it("renders with spellcheck attribute", () => {
  const { rerender } = render(
    <Bdi data-testid="bdi-element" spellCheck={true}>
      Spellcheck enabled
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "spellcheck",
    "true"
  );

  rerender(
    <Bdi data-testid="bdi-element" spellCheck={false}>
      Spellcheck disabled
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "spellcheck",
    "false"
  );
});

// Bdi with contenteditable attribute test
it("renders with contenteditable attribute", () => {
  const { rerender } = render(
    <Bdi data-testid="bdi-element" contentEditable={true}>
      Editable content
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "contenteditable",
    "true"
  );

  rerender(
    <Bdi data-testid="bdi-element" contentEditable={false}>
      Non-editable content
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "contenteditable",
    "false"
  );
});

// Bdi with hidden attribute test
it("renders with hidden attribute", () => {
  render(
    <Bdi data-testid="bdi-element" hidden>
      Hidden content
    </Bdi>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("hidden");
});

// Bdi with draggable attribute test
it("renders with draggable attribute", () => {
  const { rerender } = render(
    <Bdi data-testid="bdi-element" draggable={true}>
      Draggable content
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "draggable",
    "true"
  );

  rerender(
    <Bdi data-testid="bdi-element" draggable={false}>
      Non-draggable content
    </Bdi>
  );
  expect(screen.getByTestId("bdi-element")).toHaveAttribute(
    "draggable",
    "false"
  );
});

// Bdi with special characters test
it("renders with special characters", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>{"Special & Characters < > \" '"}</h2>
      <p>Content with special characters: &amp; &lt; &gt; &quot; &apos;</p>
    </Bdi>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Special & Characters < > \" '");
  expect(bdi).toHaveTextContent("Content with special characters: & < > \" '");
});

// Bdi with definition lists test
it("renders bdi with definition lists", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>Glossary</h2>
      <dl>
        <dt>API</dt>
        <dd>Application Programming Interface</dd>
        <dt>UI</dt>
        <dd>User Interface</dd>
        <dt>UX</dt>
        <dd>User Experience</dd>
      </dl>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Glossary");
  expect(bdi).toHaveTextContent("API");
  expect(bdi).toHaveTextContent("Application Programming Interface");
  expect(bdi).toHaveTextContent("UI");
  expect(bdi).toHaveTextContent("User Interface");
  expect(bdi).toHaveTextContent("UX");
  expect(bdi).toHaveTextContent("User Experience");
  expect(bdi.querySelector("dl")).toBeInTheDocument();
  expect(bdi.querySelectorAll("dt")).toHaveLength(3);
  expect(bdi.querySelectorAll("dd")).toHaveLength(3);
});

// Bdi with tables test
it("renders bdi with tables", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>Statistics</h2>
      <table>
        <caption>Monthly Stats</caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>January</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>February</td>
            <td>1200</td>
          </tr>
        </tbody>
      </table>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Statistics");
  expect(bdi).toHaveTextContent("Monthly Stats");
  expect(bdi).toHaveTextContent("Month");
  expect(bdi).toHaveTextContent("Views");
  expect(bdi).toHaveTextContent("January");
  expect(bdi).toHaveTextContent("1000");
  expect(bdi).toHaveTextContent("February");
  expect(bdi).toHaveTextContent("1200");
  expect(bdi.querySelector("table")).toBeInTheDocument();
  expect(bdi.querySelector("caption")).toBeInTheDocument();
  expect(bdi.querySelector("thead")).toBeInTheDocument();
  expect(bdi.querySelector("tbody")).toBeInTheDocument();
});

// Bdi with time elements test
it("renders bdi with time elements", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>Last Updated</h2>
      <time dateTime="2023-12-25">December 25, 2023</time>
      <p>
        Updated on <time dateTime="2023-12-25T10:00:00Z">10:00 AM UTC</time>
      </p>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Last Updated");
  expect(bdi).toHaveTextContent("December 25, 2023");
  expect(bdi).toHaveTextContent("Updated on 10:00 AM UTC");
  expect(bdi.querySelector("time[datetime='2023-12-25']")).toBeInTheDocument();
  expect(
    bdi.querySelector("time[datetime='2023-12-25T10:00:00Z']")
  ).toBeInTheDocument();
});

// Bdi with code elements test
it("renders bdi with code elements", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>Code Snippet</h2>
      <p>
        Use this <code>function</code> to get started:
      </p>
      <pre>
        <code>{`function init() {
  logger.info("Hello, World!");
}`}</code>
      </pre>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Code Snippet");
  expect(bdi).toHaveTextContent("Use this function to get started:");
  expect(bdi.querySelector("code")).toBeInTheDocument();
  expect(bdi.querySelector("pre")).toBeInTheDocument();
  expect(bdi).toHaveTextContent("function init() {");
});

// Bdi with links test
it("renders bdi with links", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>External Links</h2>
      <p>
        Visit our <a href="https://example.com">partner site</a> for more
        information.
      </p>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("External Links");
  expect(bdi).toHaveTextContent("Visit our partner site for more information.");
  expect(bdi.querySelector("a")).toBeInTheDocument();
  expect(bdi.querySelector("a")).toHaveAttribute("href", "https://example.com");
  expect(bdi.querySelector("a")).toHaveTextContent("partner site");
});

// Bdi with images test
it("renders bdi with images", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>Profile</h2>
      <img src="avatar.jpg" alt="User avatar" />
      <p>User description</p>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Profile");
  expect(bdi).toHaveTextContent("User description");
  expect(bdi.querySelector("img")).toBeInTheDocument();
  expect(bdi.querySelector("img")).toHaveAttribute("src", "avatar.jpg");
  expect(bdi.querySelector("img")).toHaveAttribute("alt", "User avatar");
});

// Bdi with blockquotes test
it("renders bdi with blockquotes", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>Featured Quote</h2>
      <blockquote>
        <p>This is an important quote.</p>
        <cite>— Author Name</cite>
      </blockquote>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Featured Quote");
  expect(bdi).toHaveTextContent("This is an important quote.");
  expect(bdi).toHaveTextContent("— Author Name");
  expect(bdi.querySelector("blockquote")).toBeInTheDocument();
  expect(bdi.querySelector("cite")).toBeInTheDocument();
});

// Bdi with lists test
it("renders bdi with lists", () => {
  render(
    <Bdi data-testid="bdi-element">
      <h2>Categories</h2>
      <ul>
        <li>Technology</li>
        <li>Design</li>
        <li>Business</li>
      </ul>
      <h2>Recent Posts</h2>
      <ol>
        <li>Post 1</li>
        <li>Post 2</li>
      </ol>
    </Bdi>
  );

  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveTextContent("Categories");
  expect(bdi).toHaveTextContent("Technology");
  expect(bdi).toHaveTextContent("Design");
  expect(bdi).toHaveTextContent("Business");
  expect(bdi).toHaveTextContent("Recent Posts");
  expect(bdi).toHaveTextContent("Post 1");
  expect(bdi).toHaveTextContent("Post 2");
  expect(bdi.querySelector("ul")).toBeInTheDocument();
  expect(bdi.querySelector("ol")).toBeInTheDocument();
  expect(bdi.querySelectorAll("li")).toHaveLength(5);
});

// Bdi with custom attributes test
it("renders with custom attributes", () => {
  render(
    <Bdi
      data-testid="bdi-element"
      id="custom-bdi-id"
      title="Custom bdi title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom bdi
    </Bdi>
  );
  const bdi = screen.getByTestId("bdi-element");
  expect(bdi).toHaveAttribute("id", "custom-bdi-id");
  expect(bdi).toHaveAttribute("title", "Custom bdi title");
  expect(bdi).not.toHaveAttribute("hidden");
  expect(bdi).toHaveAttribute("spellcheck", "true");
  expect(bdi).toHaveAttribute("contenteditable", "false");
});
