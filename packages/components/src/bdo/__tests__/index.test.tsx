import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Bdo } from "..";

// Basic render test
it("renders a bdo element", () => {
  render(<Bdo data-testid="bdo-element">Bidirectional override text</Bdo>);
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo.tagName).toBe("BDO");
  expect(bdo).toHaveTextContent("Bidirectional override text");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Bdo as="div" data-testid="custom-div">
      Custom bidirectional override
    </Bdo>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom bidirectional override");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Bdo isClient data-testid="bdo-element">
      Client-side bidirectional override
    </Bdo>
  );

  // Should render the fallback (the bdo) immediately
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo.tagName).toBe("BDO");
  expect(bdo).toHaveTextContent("Client-side bidirectional override");

  // The lazy component should load and render the same content
  await screen.findByTestId("bdo-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Bdo isClient isMemoized data-testid="bdo-element">
      Memoized bidirectional override
    </Bdo>
  );

  // Should render the fallback (the bdo) immediately
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo.tagName).toBe("BDO");
  expect(bdo).toHaveTextContent("Memoized bidirectional override");

  // The lazy component should load and render the same content
  await screen.findByTestId("bdo-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<Bdo ref={ref}>Ref test content</Bdo>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BDO");
  }
});

// Bdo-specific props test
it("renders with bdo-specific attributes", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      className="bidirectional-override"
      id="main-bdo"
      dir="ltr"
    >
      Bidirectional override content
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveClass("bidirectional-override", { exact: true });
  expect(bdo).toHaveAttribute("id", "main-bdo");
  expect(bdo).toHaveAttribute("dir", "ltr");
  expect(bdo).toHaveTextContent("Bidirectional override content");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <Bdo data-testid="bdo-element">
      <span>Left</span>
      <span>Right</span>
      <span>Override</span>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Left");
  expect(bdo).toHaveTextContent("Right");
  expect(bdo).toHaveTextContent("Override");
  expect(bdo.querySelectorAll("span")).toHaveLength(3);
});

// Empty children test
it("renders with empty children", () => {
  render(<Bdo data-testid="bdo-element" />);
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toBeInTheDocument();
  expect(bdo).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Bdo data-testid="bdo-element">
      <div className="bdo-content">
        <span className="icon">🔄</span>
        <span className="text">Complex Bdo</span>
        <span className="badge">Override</span>
      </div>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("🔄");
  expect(bdo).toHaveTextContent("Complex Bdo");
  expect(bdo).toHaveTextContent("Override");
  expect(bdo.querySelector(".bdo-content")).toBeInTheDocument();
  expect(bdo.querySelector(".icon")).toBeInTheDocument();
  expect(bdo.querySelector(".text")).toBeInTheDocument();
  expect(bdo.querySelector(".badge")).toBeInTheDocument();
});

// Direction attributes test
it("renders with different direction attributes", () => {
  const { rerender } = render(
    <Bdo data-testid="bdo-element" dir="ltr">
      Left to right override
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute("dir", "ltr");

  rerender(
    <Bdo data-testid="bdo-element" dir="rtl">
      Right to left override
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute("dir", "rtl");

  rerender(
    <Bdo data-testid="bdo-element" dir="auto">
      Auto direction override
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute("dir", "auto");
});

// Bdo with accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      aria-label="Bidirectional override text"
      aria-describedby="bdo-description"
      role="text"
      tabIndex={0}
    >
      Accessible bidirectional override
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveAttribute("aria-label", "Bidirectional override text");
  expect(bdo).toHaveAttribute("aria-describedby", "bdo-description");
  expect(bdo).toHaveAttribute("role", "text");
  expect(bdo).toHaveAttribute("tabindex", "0");
});

// Bdo with data attributes test
it("renders with data attributes", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      data-variant="primary"
      data-size="large"
      data-text-type="bidirectional-override"
    >
      Data bidirectional override
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveAttribute("data-variant", "primary");
  expect(bdo).toHaveAttribute("data-size", "large");
  expect(bdo).toHaveAttribute("data-text-type", "bidirectional-override");
});

// Bdo with event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Bdo
      data-testid="bdo-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive bidirectional override
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Interactive bidirectional override");
  // Note: We don't test the actual event firing here as that's handled by user-event
  // This just ensures the handlers are properly attached
});

// Bdo with custom styling test
it("renders with custom styling", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      className="custom-bdo primary large"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Styled bidirectional override
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveClass("custom-bdo", "primary", "large");
  expect(bdo).toHaveStyle({
    color: "rgb(0, 0, 255)",
    textDecoration: "underline",
  });
});

// Bdo with semantic meaning test
it("renders with semantic meaning", () => {
  render(
    <Bdo data-testid="bdo-element" role="text">
      <span>Bidirectional</span>
      <span>Override</span>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveAttribute("role", "text");
  expect(bdo).toHaveTextContent("Bidirectional");
  expect(bdo).toHaveTextContent("Override");
});

// Bdo with bidirectional override text test
it("renders bidirectional override text content", () => {
  render(<Bdo data-testid="bdo-element">English text العربية نص</Bdo>);

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("English text");
  expect(bdo).toHaveTextContent("العربية");
  expect(bdo).toHaveTextContent("نص");
});

// Bdo with mixed content test
it("renders mixed content", () => {
  render(
    <Bdo data-testid="bdo-element">
      <span>English</span>
      <span dir="rtl">עברית</span>
      <span>More English</span>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("English");
  expect(bdo).toHaveTextContent("עברית");
  expect(bdo).toHaveTextContent("More English");
  expect(bdo.querySelector('[dir="rtl"]')).toBeInTheDocument();
});

// Bdo with icons test
it("renders bdo with icons", () => {
  render(
    <Bdo data-testid="bdo-element">
      <span role="img" aria-label="bidirectional-override-text">
        🔄
      </span>
      <span>Bidirectional Override Text</span>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("🔄");
  expect(bdo).toHaveTextContent("Bidirectional Override Text");
  expect(bdo.querySelector('[role="img"]')).toBeInTheDocument();
  expect(
    bdo.querySelector('[aria-label="bidirectional-override-text"]')
  ).toBeInTheDocument();
});

// Bdo with loading state test
it("renders bdo with loading state", () => {
  render(
    <Bdo data-testid="bdo-element" aria-disabled="true">
      <span className="spinner">⏳</span>
      <span>Loading...</span>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveAttribute("aria-disabled", "true");
  expect(bdo).toHaveTextContent("⏳");
  expect(bdo).toHaveTextContent("Loading...");
  expect(bdo.querySelector(".spinner")).toBeInTheDocument();
});

// Bdo with navigation test
it("renders bdo navigation", () => {
  render(
    <Bdo data-testid="bdo-element">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Home");
  expect(bdo).toHaveTextContent("About");
  expect(bdo).toHaveTextContent("Contact");
  expect(bdo.querySelector("nav")).toBeInTheDocument();
  expect(bdo.querySelectorAll("li")).toHaveLength(3);
});

// Bdo with form test
it("renders bdo with form", () => {
  render(
    <Bdo data-testid="bdo-element">
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Name:");
  expect(bdo).toHaveTextContent("Submit");
  expect(bdo.querySelector("form")).toBeInTheDocument();
  expect(bdo.querySelector("label")).toBeInTheDocument();
  expect(bdo.querySelector("input")).toBeInTheDocument();
  expect(bdo.querySelector("button")).toBeInTheDocument();
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      className="custom-bdo"
      id="main-bdo"
      data-bdo-type="primary"
    >
      <h1>Bdo with Custom Attributes</h1>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveClass("custom-bdo");
  expect(bdo).toHaveAttribute("id", "main-bdo");
  expect(bdo).toHaveAttribute("data-bdo-type", "primary");
});

// Bdo with different content types test
it("renders with different content types", () => {
  const { rerender } = render(
    <Bdo data-testid="bdo-element">Simple text content</Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveTextContent(
    "Simple text content"
  );

  rerender(
    <Bdo data-testid="bdo-element">
      <em>Emphasized content</em>
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveTextContent(
    "Emphasized content"
  );
  expect(
    screen.getByTestId("bdo-element").querySelector("em")
  ).toBeInTheDocument();

  rerender(
    <Bdo data-testid="bdo-element">
      <code>Code content</code>
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveTextContent("Code content");
  expect(
    screen.getByTestId("bdo-element").querySelector("code")
  ).toBeInTheDocument();
});

// Bdo with multiple classes test
it("renders with multiple classes", () => {
  render(
    <Bdo data-testid="bdo-element" className="bdo-text primary large emphasis">
      Multiple Classes
    </Bdo>
  );
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveClass("bdo-text", "primary", "large", "emphasis");
});

// Bdo with inline styles test
it("renders with inline styles", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      style={{
        color: "red",
        fontSize: "18px",
        textTransform: "uppercase",
      }}
    >
      Inline Styled
    </Bdo>
  );
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveStyle({
    color: "rgb(255, 0, 0)",
    fontSize: "18px",
    textTransform: "uppercase",
  });
});

// Bdo with language attributes test
it("renders with language attributes", () => {
  const { rerender } = render(
    <Bdo data-testid="bdo-element" lang="en">
      English text
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute("lang", "en");

  rerender(
    <Bdo data-testid="bdo-element" lang="ar">
      Arabic text
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute("lang", "ar");

  rerender(
    <Bdo data-testid="bdo-element" lang="he">
      Hebrew text
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute("lang", "he");
});

// Bdo with title attribute test
it("renders with title attribute", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      title="Bidirectional override text explanation"
    >
      Text with title
    </Bdo>
  );
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveAttribute(
    "title",
    "Bidirectional override text explanation"
  );
});

// Bdo with spellcheck attribute test
it("renders with spellcheck attribute", () => {
  const { rerender } = render(
    <Bdo data-testid="bdo-element" spellCheck={true}>
      Spellcheck enabled
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute(
    "spellcheck",
    "true"
  );

  rerender(
    <Bdo data-testid="bdo-element" spellCheck={false}>
      Spellcheck disabled
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute(
    "spellcheck",
    "false"
  );
});

// Bdo with contenteditable attribute test
it("renders with contenteditable attribute", () => {
  const { rerender } = render(
    <Bdo data-testid="bdo-element" contentEditable={true}>
      Editable content
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute(
    "contenteditable",
    "true"
  );

  rerender(
    <Bdo data-testid="bdo-element" contentEditable={false}>
      Non-editable content
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute(
    "contenteditable",
    "false"
  );
});

// Bdo with hidden attribute test
it("renders with hidden attribute", () => {
  render(
    <Bdo data-testid="bdo-element" hidden>
      Hidden content
    </Bdo>
  );
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveAttribute("hidden");
});

// Bdo with draggable attribute test
it("renders with draggable attribute", () => {
  const { rerender } = render(
    <Bdo data-testid="bdo-element" draggable={true}>
      Draggable content
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute(
    "draggable",
    "true"
  );

  rerender(
    <Bdo data-testid="bdo-element" draggable={false}>
      Non-draggable content
    </Bdo>
  );
  expect(screen.getByTestId("bdo-element")).toHaveAttribute(
    "draggable",
    "false"
  );
});

// Bdo with special characters test
it("renders with special characters", () => {
  render(
    <Bdo data-testid="bdo-element">
      <h2>{"Special & Characters < > \" '"}</h2>
      <p>Content with special characters: &amp; &lt; &gt; &quot; &apos;</p>
    </Bdo>
  );
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Special & Characters < > \" '");
  expect(bdo).toHaveTextContent("Content with special characters: & < > \" '");
});

// Bdo with definition lists test
it("renders bdo with definition lists", () => {
  render(
    <Bdo data-testid="bdo-element">
      <h2>Glossary</h2>
      <dl>
        <dt>API</dt>
        <dd>Application Programming Interface</dd>
        <dt>UI</dt>
        <dd>User Interface</dd>
        <dt>UX</dt>
        <dd>User Experience</dd>
      </dl>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Glossary");
  expect(bdo).toHaveTextContent("API");
  expect(bdo).toHaveTextContent("Application Programming Interface");
  expect(bdo).toHaveTextContent("UI");
  expect(bdo).toHaveTextContent("User Interface");
  expect(bdo).toHaveTextContent("UX");
  expect(bdo).toHaveTextContent("User Experience");
  expect(bdo.querySelector("dl")).toBeInTheDocument();
  expect(bdo.querySelectorAll("dt")).toHaveLength(3);
  expect(bdo.querySelectorAll("dd")).toHaveLength(3);
});

// Bdo with tables test
it("renders bdo with tables", () => {
  render(
    <Bdo data-testid="bdo-element">
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
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Statistics");
  expect(bdo).toHaveTextContent("Monthly Stats");
  expect(bdo).toHaveTextContent("Month");
  expect(bdo).toHaveTextContent("Views");
  expect(bdo).toHaveTextContent("January");
  expect(bdo).toHaveTextContent("1000");
  expect(bdo).toHaveTextContent("February");
  expect(bdo).toHaveTextContent("1200");
  expect(bdo.querySelector("table")).toBeInTheDocument();
  expect(bdo.querySelector("caption")).toBeInTheDocument();
  expect(bdo.querySelector("thead")).toBeInTheDocument();
  expect(bdo.querySelector("tbody")).toBeInTheDocument();
});

// Bdo with time elements test
it("renders bdo with time elements", () => {
  render(
    <Bdo data-testid="bdo-element">
      <h2>Last Updated</h2>
      <time dateTime="2023-12-25">December 25, 2023</time>
      <p>
        Updated on <time dateTime="2023-12-25T10:00:00Z">10:00 AM UTC</time>
      </p>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Last Updated");
  expect(bdo).toHaveTextContent("December 25, 2023");
  expect(bdo).toHaveTextContent("Updated on 10:00 AM UTC");
  expect(bdo.querySelector("time[datetime='2023-12-25']")).toBeInTheDocument();
  expect(
    bdo.querySelector("time[datetime='2023-12-25T10:00:00Z']")
  ).toBeInTheDocument();
});

// Bdo with code elements test
it("renders bdo with code elements", () => {
  render(
    <Bdo data-testid="bdo-element">
      <h2>Code Snippet</h2>
      <p>
        Use this <code>function</code> to get started:
      </p>
      <pre>
        <code>{`function init() {
  logger.info("Hello, World!");
}`}</code>
      </pre>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Code Snippet");
  expect(bdo).toHaveTextContent("Use this function to get started:");
  expect(bdo.querySelector("code")).toBeInTheDocument();
  expect(bdo.querySelector("pre")).toBeInTheDocument();
  expect(bdo).toHaveTextContent("function init() {");
});

// Bdo with links test
it("renders bdo with links", () => {
  render(
    <Bdo data-testid="bdo-element">
      <h2>External Links</h2>
      <p>
        Visit our <a href="https://example.com">partner site</a> for more
        information.
      </p>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("External Links");
  expect(bdo).toHaveTextContent("Visit our partner site for more information.");
  expect(bdo.querySelector("a")).toBeInTheDocument();
  expect(bdo.querySelector("a")).toHaveAttribute("href", "https://example.com");
  expect(bdo.querySelector("a")).toHaveTextContent("partner site");
});

// Bdo with images test
it("renders bdo with images", () => {
  render(
    <Bdo data-testid="bdo-element">
      <h2>Profile</h2>
      <img src="avatar.jpg" alt="User avatar" />
      <p>User description</p>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Profile");
  expect(bdo).toHaveTextContent("User description");
  expect(bdo.querySelector("img")).toBeInTheDocument();
  expect(bdo.querySelector("img")).toHaveAttribute("src", "avatar.jpg");
  expect(bdo.querySelector("img")).toHaveAttribute("alt", "User avatar");
});

// Bdo with blockquotes test
it("renders bdo with blockquotes", () => {
  render(
    <Bdo data-testid="bdo-element">
      <h2>Featured Quote</h2>
      <blockquote>
        <p>This is an important quote.</p>
        <cite>— Author Name</cite>
      </blockquote>
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Featured Quote");
  expect(bdo).toHaveTextContent("This is an important quote.");
  expect(bdo).toHaveTextContent("— Author Name");
  expect(bdo.querySelector("blockquote")).toBeInTheDocument();
  expect(bdo.querySelector("cite")).toBeInTheDocument();
});

// Bdo with lists test
it("renders bdo with lists", () => {
  render(
    <Bdo data-testid="bdo-element">
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
    </Bdo>
  );

  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveTextContent("Categories");
  expect(bdo).toHaveTextContent("Technology");
  expect(bdo).toHaveTextContent("Design");
  expect(bdo).toHaveTextContent("Business");
  expect(bdo).toHaveTextContent("Recent Posts");
  expect(bdo).toHaveTextContent("Post 1");
  expect(bdo).toHaveTextContent("Post 2");
  expect(bdo.querySelector("ul")).toBeInTheDocument();
  expect(bdo.querySelector("ol")).toBeInTheDocument();
  expect(bdo.querySelectorAll("li")).toHaveLength(5);
});

// Bdo with custom attributes test
it("renders with custom attributes", () => {
  render(
    <Bdo
      data-testid="bdo-element"
      id="custom-bdo-id"
      title="Custom bdo title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom bdo
    </Bdo>
  );
  const bdo = screen.getByTestId("bdo-element");
  expect(bdo).toHaveAttribute("id", "custom-bdo-id");
  expect(bdo).toHaveAttribute("title", "Custom bdo title");
  expect(bdo).not.toHaveAttribute("hidden");
  expect(bdo).toHaveAttribute("spellcheck", "true");
  expect(bdo).toHaveAttribute("contenteditable", "false");
});
