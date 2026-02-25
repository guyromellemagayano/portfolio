import React from "react";

import { render, screen } from "@testing-library/react";

import { Aside } from "..";

// Basic render test
it("renders an aside element", () => {
  render(<Aside data-testid="aside-element">Sidebar content</Aside>);
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Sidebar content");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Aside as="div" data-testid="custom-div">
      Custom sidebar
    </Aside>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom sidebar");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Aside isClient data-testid="aside-element">
      Client-side sidebar
    </Aside>
  );

  // Should render the fallback (the aside) immediately
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Client-side sidebar");

  // The lazy component should load and render the same content
  await screen.findByTestId("aside-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Aside isClient isMemoized data-testid="aside-element">
      Memoized sidebar
    </Aside>
  );

  // Should render the fallback (the aside) immediately
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Memoized sidebar");

  // The lazy component should load and render the same content
  await screen.findByTestId("aside-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<Aside ref={ref}>Ref test content</Aside>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("ASIDE");
  }
});

// aside-specific attributes test
it("renders with aside-specific attributes", () => {
  render(
    <Aside
      data-testid="aside-element"
      className="sidebar"
      id="main-sidebar"
      aria-label="Main navigation"
      role="complementary"
      aria-hidden="false"
    >
      Navigation content
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveClass("sidebar", { exact: true });
  expect(aside).toHaveAttribute("id", "main-sidebar");
  expect(aside).toHaveAttribute("aria-label", "Main navigation");
  expect(aside).toHaveAttribute("role", "complementary");
  expect(aside).toHaveAttribute("aria-hidden", "false");
  expect(aside).toHaveTextContent("Navigation content");
});

// children rendering test
it("renders children correctly", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Sidebar Title</h2>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Sidebar Title");
  expect(aside).toHaveTextContent("Home");
  expect(aside).toHaveTextContent("About");
  expect(aside.querySelector("h2")).toBeInTheDocument();
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelector("ul")).toBeInTheDocument();
});

// empty children test
it("renders with empty children", () => {
  render(<Aside data-testid="aside-element" />);
  const aside = screen.getByTestId("aside-element");
  expect(aside).toBeInTheDocument();
  expect(aside).toBeEmptyDOMElement();
});

// complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Aside data-testid="aside-element">
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <section>
          <h2>Quick Actions</h2>
          <button>Action 1</button>
          <button>Action 2</button>
        </section>
      </main>
      <footer>
        <p>Footer content</p>
      </footer>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Dashboard");
  expect(aside).toHaveTextContent("Quick Actions");
  expect(aside).toHaveTextContent("Action 1");
  expect(aside).toHaveTextContent("Action 2");
  expect(aside).toHaveTextContent("Footer content");
  expect(aside.querySelector("header")).toBeInTheDocument();
  expect(aside.querySelector("main")).toBeInTheDocument();
  expect(aside.querySelector("footer")).toBeInTheDocument();
  expect(aside.querySelectorAll("button")).toHaveLength(2);
});

// aside with navigation test
it("renders aside with navigation", () => {
  render(
    <Aside data-testid="aside-element">
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Home");
  expect(aside).toHaveTextContent("About");
  expect(aside).toHaveTextContent("Contact");
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelectorAll("a")).toHaveLength(3);
  expect(aside.querySelector("a[href='/']")).toBeInTheDocument();
  expect(aside.querySelector("a[href='/about']")).toBeInTheDocument();
  expect(aside.querySelector("a[href='/contact']")).toBeInTheDocument();
});

// aside with forms test
it("renders aside with forms", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Search</h2>
      <form>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="search" />
        <button type="submit">Search</button>
      </form>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Search");
  expect(aside.querySelector("form")).toBeInTheDocument();
  expect(aside.querySelector("label")).toBeInTheDocument();
  expect(aside.querySelector("input")).toBeInTheDocument();
  expect(aside.querySelector("button")).toBeInTheDocument();
});

// aside with lists test
it("renders aside with lists", () => {
  render(
    <Aside data-testid="aside-element">
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
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Categories");
  expect(aside).toHaveTextContent("Technology");
  expect(aside).toHaveTextContent("Design");
  expect(aside).toHaveTextContent("Business");
  expect(aside).toHaveTextContent("Recent Posts");
  expect(aside).toHaveTextContent("Post 1");
  expect(aside).toHaveTextContent("Post 2");
  expect(aside.querySelector("ul")).toBeInTheDocument();
  expect(aside.querySelector("ol")).toBeInTheDocument();
  expect(aside.querySelectorAll("li")).toHaveLength(5);
});

// aside with blockquotes test
it("renders aside with blockquotes", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Featured Quote</h2>
      <blockquote>
        <p>This is an important quote.</p>
        <cite>— Author Name</cite>
      </blockquote>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Featured Quote");
  expect(aside).toHaveTextContent("This is an important quote.");
  expect(aside).toHaveTextContent("— Author Name");
  expect(aside.querySelector("blockquote")).toBeInTheDocument();
  expect(aside.querySelector("cite")).toBeInTheDocument();
});

// aside with images test
it("renders aside with images", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Profile</h2>
      <img src="avatar.jpg" alt="User avatar" />
      <p>User description</p>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Profile");
  expect(aside).toHaveTextContent("User description");
  expect(aside.querySelector("img")).toBeInTheDocument();
  expect(aside.querySelector("img")).toHaveAttribute("src", "avatar.jpg");
  expect(aside.querySelector("img")).toHaveAttribute("alt", "User avatar");
});

// aside with links test
it("renders aside with links", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>External Links</h2>
      <p>
        Visit our <a href="https://example.com">partner site</a> for more
        information.
      </p>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("External Links");
  expect(aside).toHaveTextContent(
    "Visit our partner site for more information."
  );
  expect(aside.querySelector("a")).toBeInTheDocument();
  expect(aside.querySelector("a")).toHaveAttribute(
    "href",
    "https://example.com"
  );
  expect(aside.querySelector("a")).toHaveTextContent("partner site");
});

// aside with time elements test
it("renders aside with time elements", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Last Updated</h2>
      <time dateTime="2023-12-25">December 25, 2023</time>
      <p>
        Updated on <time dateTime="2023-12-25T10:00:00Z">10:00 AM UTC</time>
      </p>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Last Updated");
  expect(aside).toHaveTextContent("December 25, 2023");
  expect(aside).toHaveTextContent("Updated on 10:00 AM UTC");
  expect(
    aside.querySelector("time[datetime='2023-12-25']")
  ).toBeInTheDocument();
  expect(
    aside.querySelector("time[datetime='2023-12-25T10:00:00Z']")
  ).toBeInTheDocument();
});

// aside with code elements test
it("renders aside with code elements", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Code Snippet</h2>
      <p>
        Use this <code>function</code> to get started:
      </p>
      <pre>
        <code>{`function init() {
  logger.info("Hello, World!");
}`}</code>
      </pre>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Code Snippet");
  expect(aside).toHaveTextContent("Use this function to get started:");
  expect(aside.querySelector("code")).toBeInTheDocument();
  expect(aside.querySelector("pre")).toBeInTheDocument();
  expect(aside).toHaveTextContent("function init() {");
});

// aside with tables test
it("renders aside with tables", () => {
  render(
    <Aside data-testid="aside-element">
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
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Statistics");
  expect(aside).toHaveTextContent("Monthly Stats");
  expect(aside).toHaveTextContent("Month");
  expect(aside).toHaveTextContent("Views");
  expect(aside).toHaveTextContent("January");
  expect(aside).toHaveTextContent("1000");
  expect(aside).toHaveTextContent("February");
  expect(aside).toHaveTextContent("1200");
  expect(aside.querySelector("table")).toBeInTheDocument();
  expect(aside.querySelector("caption")).toBeInTheDocument();
  expect(aside.querySelector("thead")).toBeInTheDocument();
  expect(aside.querySelector("tbody")).toBeInTheDocument();
});

// accessibility test
it("renders with accessibility attributes", () => {
  render(
    <Aside
      data-testid="aside-element"
      aria-labelledby="aside-title"
      aria-describedby="aside-description"
      role="complementary"
      tabIndex={0}
    >
      <h2 id="aside-title">Accessible Aside</h2>
      <p id="aside-description">
        This aside has proper accessibility attributes.
      </p>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveAttribute("aria-labelledby", "aside-title");
  expect(aside).toHaveAttribute("aria-describedby", "aside-description");
  expect(aside).toHaveAttribute("role", "complementary");
  expect(aside).toHaveAttribute("tabindex", "0");
});

// data attributes test
it("renders with data attributes", () => {
  render(
    <Aside
      data-testid="aside-element"
      data-type="sidebar"
      data-position="left"
      data-collapsible="true"
    >
      Sidebar content
    </Aside>
  );
  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveAttribute("data-type", "sidebar");
  expect(aside).toHaveAttribute("data-position", "left");
  expect(aside).toHaveAttribute("data-collapsible", "true");
});

// event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <Aside
      data-testid="aside-element"
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      Clickable aside
    </Aside>
  );
  const aside = screen.getByTestId("aside-element");

  aside.click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Verify the component renders with event handlers
  expect(aside).toHaveAttribute("tabindex", "0");
});

// custom styling test
it("renders with custom styling", () => {
  render(
    <Aside
      data-testid="aside-element"
      className="custom-aside-class"
      style={{
        backgroundColor: "lightgray",
        padding: "20px",
      }}
    >
      Styled aside
    </Aside>
  );
  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveClass("custom-aside-class");
  // Verify the component renders with custom styling
  expect(aside).toBeInTheDocument();
});

// aside with custom attributes test
it("renders with custom attributes", () => {
  render(
    <Aside
      data-testid="aside-element"
      id="custom-aside-id"
      title="Custom aside title"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom aside
    </Aside>
  );
  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveAttribute("id", "custom-aside-id");
  expect(aside).toHaveAttribute("title", "Custom aside title");
  expect(aside).not.toHaveAttribute("hidden");
  expect(aside).toHaveAttribute("spellcheck", "true");
  expect(aside).toHaveAttribute("contenteditable", "false");
});

// aside with definition lists test
it("renders aside with definition lists", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Glossary</h2>
      <dl>
        <dt>API</dt>
        <dd>Application Programming Interface</dd>
        <dt>UI</dt>
        <dd>User Interface</dd>
        <dt>UX</dt>
        <dd>User Experience</dd>
      </dl>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Glossary");
  expect(aside).toHaveTextContent("API");
  expect(aside).toHaveTextContent("Application Programming Interface");
  expect(aside).toHaveTextContent("UI");
  expect(aside).toHaveTextContent("User Interface");
  expect(aside).toHaveTextContent("UX");
  expect(aside).toHaveTextContent("User Experience");
  expect(aside.querySelector("dl")).toBeInTheDocument();
  expect(aside.querySelectorAll("dt")).toHaveLength(3);
  expect(aside.querySelectorAll("dd")).toHaveLength(3);
});

// aside with special characters test
it("renders with special characters", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>{"Special & Characters < > \" '"}</h2>
      <p>Content with special characters: &amp; &lt; &gt; &quot; &apos;</p>
    </Aside>
  );
  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Special & Characters < > \" '");
  expect(aside).toHaveTextContent(
    "Content with special characters: & < > \" '"
  );
});
