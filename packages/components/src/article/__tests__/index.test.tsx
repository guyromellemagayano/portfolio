import React from "react";

import { render, screen } from "@testing-library/react";

import { Article } from "..";

// Basic render test
it("renders an article element", () => {
  render(<Article data-testid="article-element">Article content</Article>);
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Article content");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Article as="div" data-testid="custom-div">
      Custom article
    </Article>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom article");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Article isClient data-testid="article-element">
      Client-side article
    </Article>
  );

  // Should render the fallback (the article) immediately
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Client-side article");

  // The lazy component should load and render the same content
  await screen.findByTestId("article-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Article isClient isMemoized data-testid="article-element">
      Memoized article
    </Article>
  );

  // Should render the fallback (the article) immediately
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Memoized article");

  // The lazy component should load and render the same content
  await screen.findByTestId("article-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<Article ref={ref}>Ref test content</Article>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("ARTICLE");
  }
});

// Article-specific props test
it("renders with article-specific attributes", () => {
  render(
    <Article
      data-testid="article-element"
      className="article-content"
      id="main-article"
      data-article-type="blog-post"
    >
      Article content
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("class", "article-content");
  expect(article).toHaveAttribute("id", "main-article");
  expect(article).toHaveAttribute("data-article-type", "blog-post");
  expect(article).toHaveTextContent("Article content");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article Title</h1>
      <p>Article content goes here.</p>
      <footer>Article footer</footer>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article Title");
  expect(article).toHaveTextContent("Article content goes here.");
  expect(article).toHaveTextContent("Article footer");
  expect(article.querySelector("h1")).toBeInTheDocument();
  expect(article.querySelector("p")).toBeInTheDocument();
  expect(article.querySelector("footer")).toBeInTheDocument();
});

// Empty children test
it("renders with empty children", () => {
  render(<Article data-testid="article-element" />);
  const article = screen.getByTestId("article-element");
  expect(article).toBeInTheDocument();
  expect(article).toBeEmptyDOMElement();
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Article data-testid="article-element">
      <header>
        <h1>Main Article Title</h1>
        <p>Article subtitle</p>
      </header>
      <section>
        <h2>Section Title</h2>
        <p>Section content with multiple paragraphs.</p>
        <p>Another paragraph in the same section.</p>
      </section>
      <footer>
        <p>Article footer content</p>
      </footer>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Main Article Title");
  expect(article).toHaveTextContent("Article subtitle");
  expect(article).toHaveTextContent("Section Title");
  expect(article).toHaveTextContent(
    "Section content with multiple paragraphs."
  );
  expect(article).toHaveTextContent("Another paragraph in the same section.");
  expect(article).toHaveTextContent("Article footer content");
  expect(article.querySelector("header")).toBeInTheDocument();
  expect(article.querySelector("section")).toBeInTheDocument();
  expect(article.querySelector("footer")).toBeInTheDocument();
});

// Article with semantic structure test
it("renders article with proper semantic structure", () => {
  render(
    <Article>
      <header>
        <h1>Main Article Title</h1>
        <p>Article subtitle</p>
      </header>
      <section>
        <h2>Section Title</h2>
        <p>Section content with multiple paragraphs.</p>
        <p>Another paragraph in the same section.</p>
      </section>
      <footer>
        <p>Article footer content</p>
      </footer>
    </Article>
  );

  expect(screen.getByText("Main Article Title")).toBeInTheDocument();
  expect(screen.getByText("Article subtitle")).toBeInTheDocument();
  expect(screen.getByText("Section Title")).toBeInTheDocument();
  expect(
    screen.getByText("Section content with multiple paragraphs.")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Another paragraph in the same section.")
  ).toBeInTheDocument();
  expect(screen.getByText("Article footer content")).toBeInTheDocument();
});

// Complex nested content test
it("renders complex nested article content", () => {
  render(
    <Article>
      <h1>Complex Article</h1>
      <div>
        <p>Introduction paragraph.</p>
        <blockquote>
          <p>Important quote from the article.</p>
        </blockquote>
        <ul>
          <li>First bullet point</li>
          <li>Second bullet point</li>
          <li>Third bullet point</li>
        </ul>
      </div>
    </Article>
  );

  expect(screen.getByText("Complex Article")).toBeInTheDocument();
  expect(screen.getByText("Introduction paragraph.")).toBeInTheDocument();
  expect(
    screen.getByText("Important quote from the article.")
  ).toBeInTheDocument();
  expect(screen.getByText("First bullet point")).toBeInTheDocument();
  expect(screen.getByText("Second bullet point")).toBeInTheDocument();
  expect(screen.getByText("Third bullet point")).toBeInTheDocument();
});

// Article with lists test
it("renders article with lists", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Lists</h1>
      <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
      <ol>
        <li>Ordered item 1</li>
        <li>Ordered item 2</li>
      </ol>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Lists");
  expect(article.querySelector("ul")).toBeInTheDocument();
  expect(article.querySelector("ol")).toBeInTheDocument();
  expect(article.querySelectorAll("li")).toHaveLength(5);
});

// Article with blockquotes test
it("renders article with blockquotes", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Quotes</h1>
      <blockquote>
        <p>This is an important quote.</p>
        <cite>— Author Name</cite>
      </blockquote>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Quotes");
  expect(article).toHaveTextContent("This is an important quote.");
  expect(article).toHaveTextContent("— Author Name");
  expect(article.querySelector("blockquote")).toBeInTheDocument();
  expect(article.querySelector("cite")).toBeInTheDocument();
});

// Article with images test
it("renders article with images", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Images</h1>
      <img src="test.jpg" alt="Test image" />
      <p>Article content with image.</p>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Images");
  expect(article).toHaveTextContent("Article content with image.");
  expect(article.querySelector("img")).toBeInTheDocument();
  expect(article.querySelector("img")).toHaveAttribute("src", "test.jpg");
  expect(article.querySelector("img")).toHaveAttribute("alt", "Test image");
});

// Article with links test
it("renders article with links", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Links</h1>
      <p>
        This article contains a <a href="https://example.com">link</a> to
        external content.
      </p>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Links");
  expect(article).toHaveTextContent(
    "This article contains a link to external content."
  );
  expect(article.querySelector("a")).toBeInTheDocument();
  expect(article.querySelector("a")).toHaveAttribute(
    "href",
    "https://example.com"
  );
  expect(article.querySelector("a")).toHaveTextContent("link");
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Article
      data-testid="article-element"
      className="custom-article"
      id="main-article"
      data-article-type="blog-post"
    >
      <h1>Article with Custom Attributes</h1>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveClass("custom-article");
  expect(article).toHaveAttribute("id", "main-article");
  expect(article).toHaveAttribute("data-article-type", "blog-post");
});

// Article-specific attributes test
it("renders with article-specific attributes", () => {
  render(
    <Article
      data-testid="article-element"
      className="article-content"
      id="main-article"
      data-article-type="blog-post"
      data-variant="featured"
      data-spacing="large"
      data-border="true"
      data-shadow="medium"
      data-reading-time="5"
    >
      <h1>Article with Specific Attributes</h1>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("class", "article-content");
  expect(article).toHaveAttribute("id", "main-article");
  expect(article).toHaveAttribute("data-article-type", "blog-post");
  expect(article).toHaveAttribute("data-variant", "featured");
  expect(article).toHaveAttribute("data-spacing", "large");
  expect(article).toHaveAttribute("data-border", "true");
  expect(article).toHaveAttribute("data-shadow", "medium");
  expect(article).toHaveAttribute("data-reading-time", "5");
});

// Accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Article
      data-testid="article-element"
      aria-labelledby="article-title"
      aria-describedby="article-description"
      role="article"
      tabIndex={0}
    >
      <h1 id="article-title">Accessible Article</h1>
      <p id="article-description">
        This article has proper accessibility attributes.
      </p>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("aria-labelledby", "article-title");
  expect(article).toHaveAttribute("aria-describedby", "article-description");
  expect(article).toHaveAttribute("role", "article");
  expect(article).toHaveAttribute("tabindex", "0");
});

// Article with time and date test
it("renders article with time and date elements", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Time</h1>
      <time dateTime="2023-12-25">December 25, 2023</time>
      <p>
        Published on <time dateTime="2023-12-25T10:00:00Z">10:00 AM UTC</time>
      </p>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Time");
  expect(article).toHaveTextContent("December 25, 2023");
  expect(article).toHaveTextContent("Published on 10:00 AM UTC");
  expect(
    article.querySelector("time[datetime='2023-12-25']")
  ).toBeInTheDocument();
  expect(
    article.querySelector("time[datetime='2023-12-25T10:00:00Z']")
  ).toBeInTheDocument();
});

// Article with code elements test
it("renders article with code elements", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Code</h1>
      <p>
        Here&apos;s some <code>inline code</code> and a code block:
      </p>
      <pre>
        <code>{`function hello() {
  logger.info("Hello, World!");
}`}</code>
      </pre>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Code");
  expect(article).toHaveTextContent(
    "Here's some inline code and a code block:"
  );
  expect(article.querySelector("code")).toBeInTheDocument();
  expect(article.querySelector("pre")).toBeInTheDocument();
  expect(article).toHaveTextContent("function hello() {");
});

// Article with definition lists test
it("renders article with definition lists", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Definitions</h1>
      <dl>
        <dt>HTML</dt>
        <dd>HyperText Markup Language</dd>
        <dt>CSS</dt>
        <dd>Cascading Style Sheets</dd>
        <dt>JS</dt>
        <dd>JavaScript</dd>
      </dl>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Definitions");
  expect(article).toHaveTextContent("HTML");
  expect(article).toHaveTextContent("HyperText Markup Language");
  expect(article).toHaveTextContent("CSS");
  expect(article).toHaveTextContent("Cascading Style Sheets");
  expect(article).toHaveTextContent("JS");
  expect(article).toHaveTextContent("JavaScript");
  expect(article.querySelector("dl")).toBeInTheDocument();
  expect(article.querySelectorAll("dt")).toHaveLength(3);
  expect(article.querySelectorAll("dd")).toHaveLength(3);
});

// Article with tables test
it("renders article with tables", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Table</h1>
      <table>
        <caption>Sample Data</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>25</td>
            <td>New York</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>30</td>
            <td>Los Angeles</td>
          </tr>
        </tbody>
      </table>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Table");
  expect(article).toHaveTextContent("Sample Data");
  expect(article).toHaveTextContent("Name");
  expect(article).toHaveTextContent("Age");
  expect(article).toHaveTextContent("City");
  expect(article).toHaveTextContent("John");
  expect(article).toHaveTextContent("25");
  expect(article).toHaveTextContent("New York");
  expect(article).toHaveTextContent("Jane");
  expect(article).toHaveTextContent("30");
  expect(article).toHaveTextContent("Los Angeles");
  expect(article.querySelector("table")).toBeInTheDocument();
  expect(article.querySelector("caption")).toBeInTheDocument();
  expect(article.querySelector("thead")).toBeInTheDocument();
  expect(article.querySelector("tbody")).toBeInTheDocument();
});

// Article with forms test
it("renders article with forms", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Form</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Submit</button>
      </form>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Form");
  expect(article).toHaveTextContent("Name:");
  expect(article).toHaveTextContent("Email:");
  expect(article).toHaveTextContent("Submit");
  expect(article.querySelector("form")).toBeInTheDocument();
  expect(article.querySelectorAll("label")).toHaveLength(2);
  expect(article.querySelectorAll("input")).toHaveLength(2);
  expect(article.querySelector("button")).toBeInTheDocument();
});

// Article with navigation test
it("renders article with navigation", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article with Navigation</h1>
      <nav>
        <ul>
          <li>
            <a href="#section1">Section 1</a>
          </li>
          <li>
            <a href="#section2">Section 2</a>
          </li>
          <li>
            <a href="#section3">Section 3</a>
          </li>
        </ul>
      </nav>
    </Article>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Navigation");
  expect(article).toHaveTextContent("Section 1");
  expect(article).toHaveTextContent("Section 2");
  expect(article).toHaveTextContent("Section 3");
  expect(article.querySelector("nav")).toBeInTheDocument();
  expect(article.querySelectorAll("a")).toHaveLength(3);
  expect(article.querySelector("a[href='#section1']")).toBeInTheDocument();
  expect(article.querySelector("a[href='#section2']")).toBeInTheDocument();
  expect(article.querySelector("a[href='#section3']")).toBeInTheDocument();
});
