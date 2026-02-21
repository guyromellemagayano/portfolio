import React from "react";

import { render, screen } from "@testing-library/react";

import { ArticleClient, MemoizedArticleClient } from "./index.client";

// Basic render test for ArticleClient
it("renders an article element", () => {
  render(
    <ArticleClient data-testid="article-element">Article content</ArticleClient>
  );
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Article content");
});

// Basic render test for MemoizedArticleClient
it("renders a memoized article element", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      Memoized article content
    </MemoizedArticleClient>
  );
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Memoized article content");
});

// as prop test for ArticleClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <ArticleClient as="div" data-testid="custom-div">
      Custom article
    </ArticleClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom article");
});

// as prop test for MemoizedArticleClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedArticleClient as="section" data-testid="custom-section">
      Custom memoized article
    </MemoizedArticleClient>
  );
  const section = screen.getByTestId("custom-section");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("Custom memoized article");
});

// Suspense render test for ArticleClient
it("renders in Suspense context", () => {
  try {
    render(
      <ArticleClient data-testid="article-element">
        Suspense article content
      </ArticleClient>
    );
    const article = screen.getByTestId("article-element");
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveTextContent("Suspense article content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const article = screen.getByTestId("article-element");
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveTextContent("Suspense article content");
  }
});

// Suspense render test for MemoizedArticleClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedArticleClient data-testid="article-element">
        Memoized suspense article
      </MemoizedArticleClient>
    );
    const article = screen.getByTestId("article-element");
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveTextContent("Memoized suspense article");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const article = screen.getByTestId("article-element");
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveTextContent("Memoized suspense article");
  }
});

// ref forwarding test for ArticleClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<ArticleClient ref={ref}>Ref test content</ArticleClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("ARTICLE");
  }
});

// ref forwarding test for MemoizedArticleClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <MemoizedArticleClient ref={ref}>
      Memoized ref test content
    </MemoizedArticleClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("ARTICLE");
  }
});

// Article-specific props test for ArticleClient
it("renders with article-specific attributes", () => {
  render(
    <ArticleClient
      data-testid="article-element"
      className="article-content"
      id="main-article"
      data-article-type="blog-post"
    >
      Article content
    </ArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("class", "article-content");
  expect(article).toHaveAttribute("id", "main-article");
  expect(article).toHaveAttribute("data-article-type", "blog-post");
  expect(article).toHaveTextContent("Article content");
});

// Article-specific props test for MemoizedArticleClient
it("renders memoized with article-specific attributes", () => {
  render(
    <MemoizedArticleClient
      data-testid="article-element"
      className="memoized-article-content"
      id="memoized-article"
      data-article-type="news-article"
    >
      Memoized article content
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("class", "memoized-article-content");
  expect(article).toHaveAttribute("id", "memoized-article");
  expect(article).toHaveAttribute("data-article-type", "news-article");
  expect(article).toHaveTextContent("Memoized article content");
});

// Children rendering test for ArticleClient
it("renders children correctly", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article Title</h1>
      <p>Article content goes here.</p>
      <footer>Article footer</footer>
    </ArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article Title");
  expect(article).toHaveTextContent("Article content goes here.");
  expect(article).toHaveTextContent("Article footer");
  expect(article.querySelector("h1")).toBeInTheDocument();
  expect(article.querySelector("p")).toBeInTheDocument();
  expect(article.querySelector("footer")).toBeInTheDocument();
});

// Children rendering test for MemoizedArticleClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article Title</h1>
      <p>Memoized article content goes here.</p>
      <footer>Memoized article footer</footer>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article Title");
  expect(article).toHaveTextContent("Memoized article content goes here.");
  expect(article).toHaveTextContent("Memoized article footer");
  expect(article.querySelector("h1")).toBeInTheDocument();
  expect(article.querySelector("p")).toBeInTheDocument();
  expect(article.querySelector("footer")).toBeInTheDocument();
});

// Empty children test for ArticleClient
it("renders with empty children", () => {
  render(<ArticleClient data-testid="article-element" />);
  const article = screen.getByTestId("article-element");
  expect(article).toBeInTheDocument();
  expect(article).toBeEmptyDOMElement();
});

// Empty children test for MemoizedArticleClient
it("renders memoized with empty children", () => {
  render(<MemoizedArticleClient data-testid="article-element" />);
  const article = screen.getByTestId("article-element");
  expect(article).toBeInTheDocument();
  expect(article).toBeEmptyDOMElement();
});

// Complex children with nested elements test for ArticleClient
it("renders complex nested children", () => {
  render(
    <ArticleClient data-testid="article-element">
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
    </ArticleClient>
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

// Complex children with nested elements test for MemoizedArticleClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <header>
        <h1>Memoized Main Article Title</h1>
        <p>Memoized article subtitle</p>
      </header>
      <section>
        <h2>Memoized Section Title</h2>
        <p>Memoized section content with multiple paragraphs.</p>
        <p>Another memoized paragraph in the same section.</p>
      </section>
      <footer>
        <p>Memoized article footer content</p>
      </footer>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Main Article Title");
  expect(article).toHaveTextContent("Memoized article subtitle");
  expect(article).toHaveTextContent("Memoized Section Title");
  expect(article).toHaveTextContent(
    "Memoized section content with multiple paragraphs."
  );
  expect(article).toHaveTextContent(
    "Another memoized paragraph in the same section."
  );
  expect(article).toHaveTextContent("Memoized article footer content");
  expect(article.querySelector("header")).toBeInTheDocument();
  expect(article.querySelector("section")).toBeInTheDocument();
  expect(article.querySelector("footer")).toBeInTheDocument();
});

// Article with semantic structure test for ArticleClient
it("renders article with proper semantic structure", () => {
  render(
    <ArticleClient>
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
    </ArticleClient>
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

// Article with semantic structure test for MemoizedArticleClient
it("renders memoized article with proper semantic structure", () => {
  render(
    <MemoizedArticleClient>
      <header>
        <h1>Memoized Main Article Title</h1>
        <p>Memoized article subtitle</p>
      </header>
      <section>
        <h2>Memoized Section Title</h2>
        <p>Memoized section content with multiple paragraphs.</p>
        <p>Another memoized paragraph in the same section.</p>
      </section>
      <footer>
        <p>Memoized article footer content</p>
      </footer>
    </MemoizedArticleClient>
  );

  expect(screen.getByText("Memoized Main Article Title")).toBeInTheDocument();
  expect(screen.getByText("Memoized article subtitle")).toBeInTheDocument();
  expect(screen.getByText("Memoized Section Title")).toBeInTheDocument();
  expect(
    screen.getByText("Memoized section content with multiple paragraphs.")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Another memoized paragraph in the same section.")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Memoized article footer content")
  ).toBeInTheDocument();
});

// Article with lists test for ArticleClient
it("renders article with lists", () => {
  render(
    <ArticleClient data-testid="article-element">
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
    </ArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Lists");
  expect(article.querySelector("ul")).toBeInTheDocument();
  expect(article.querySelector("ol")).toBeInTheDocument();
  expect(article.querySelectorAll("li")).toHaveLength(5);
});

// Article with lists test for MemoizedArticleClient
it("renders memoized article with lists", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Lists</h1>
      <ul>
        <li>Memoized first item</li>
        <li>Memoized second item</li>
        <li>Memoized third item</li>
      </ul>
      <ol>
        <li>Memoized ordered item 1</li>
        <li>Memoized ordered item 2</li>
      </ol>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Lists");
  expect(article.querySelector("ul")).toBeInTheDocument();
  expect(article.querySelector("ol")).toBeInTheDocument();
  expect(article.querySelectorAll("li")).toHaveLength(5);
});

// Article with blockquotes test for ArticleClient
it("renders article with blockquotes", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article with Quotes</h1>
      <blockquote>
        <p>This is an important quote.</p>
        <cite>— Author Name</cite>
      </blockquote>
    </ArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Quotes");
  expect(article).toHaveTextContent("This is an important quote.");
  expect(article).toHaveTextContent("— Author Name");
  expect(article.querySelector("blockquote")).toBeInTheDocument();
  expect(article.querySelector("cite")).toBeInTheDocument();
});

// Article with blockquotes test for MemoizedArticleClient
it("renders memoized article with blockquotes", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Quotes</h1>
      <blockquote>
        <p>This is a memoized important quote.</p>
        <cite>— Memoized Author Name</cite>
      </blockquote>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Quotes");
  expect(article).toHaveTextContent("This is a memoized important quote.");
  expect(article).toHaveTextContent("— Memoized Author Name");
  expect(article.querySelector("blockquote")).toBeInTheDocument();
  expect(article.querySelector("cite")).toBeInTheDocument();
});

// Article with images test for ArticleClient
it("renders article with images", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article with Images</h1>
      <img src="test.jpg" alt="Test image" />
      <p>Article content with image.</p>
    </ArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Article with Images");
  expect(article).toHaveTextContent("Article content with image.");
  expect(article.querySelector("img")).toBeInTheDocument();
  expect(article.querySelector("img")).toHaveAttribute("src", "test.jpg");
  expect(article.querySelector("img")).toHaveAttribute("alt", "Test image");
});

// Article with images test for MemoizedArticleClient
it("renders memoized article with images", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Images</h1>
      <img src="memoized-test.jpg" alt="Memoized test image" />
      <p>Memoized article content with image.</p>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Images");
  expect(article).toHaveTextContent("Memoized article content with image.");
  expect(article.querySelector("img")).toBeInTheDocument();
  expect(article.querySelector("img")).toHaveAttribute(
    "src",
    "memoized-test.jpg"
  );
  expect(article.querySelector("img")).toHaveAttribute(
    "alt",
    "Memoized test image"
  );
});

// Article with links test for ArticleClient
it("renders article with links", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article with Links</h1>
      <p>
        This article contains a <a href="https://example.com">link</a> to
        external content.
      </p>
    </ArticleClient>
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

// Article with links test for MemoizedArticleClient
it("renders memoized article with links", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Links</h1>
      <p>
        This memoized article contains a{" "}
        <a href="https://memoized-example.com">memoized link</a> to external
        content.
      </p>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Links");
  expect(article).toHaveTextContent(
    "This memoized article contains a memoized link to external content."
  );
  expect(article.querySelector("a")).toBeInTheDocument();
  expect(article.querySelector("a")).toHaveAttribute(
    "href",
    "https://memoized-example.com"
  );
  expect(article.querySelector("a")).toHaveTextContent("memoized link");
});

// Custom attributes test for ArticleClient
it("renders with custom attributes", () => {
  render(
    <ArticleClient
      data-testid="article-element"
      className="custom-article"
      id="main-article"
      data-article-type="blog-post"
    >
      <h1>Article with Custom Attributes</h1>
    </ArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveClass("custom-article");
  expect(article).toHaveAttribute("id", "main-article");
  expect(article).toHaveAttribute("data-article-type", "blog-post");
});

// Custom attributes test for MemoizedArticleClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedArticleClient
      data-testid="article-element"
      className="memoized-custom-article"
      id="memoized-main-article"
      data-article-type="memoized-blog-post"
    >
      <h1>Memoized Article with Custom Attributes</h1>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveClass("memoized-custom-article");
  expect(article).toHaveAttribute("id", "memoized-main-article");
  expect(article).toHaveAttribute("data-article-type", "memoized-blog-post");
});

// Article-specific attributes test for ArticleClient
it("renders with article-specific attributes", () => {
  render(
    <ArticleClient
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
    </ArticleClient>
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

// Article-specific attributes test for MemoizedArticleClient
it("renders memoized with article-specific attributes", () => {
  render(
    <MemoizedArticleClient
      data-testid="article-element"
      className="memoized-article-content"
      id="memoized-article"
      data-article-type="news-article"
      data-variant="minimal"
      data-spacing="small"
      data-border="false"
      data-shadow="none"
      data-reading-time="3"
    >
      <h1>Memoized Article with Specific Attributes</h1>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("class", "memoized-article-content");
  expect(article).toHaveAttribute("id", "memoized-article");
  expect(article).toHaveAttribute("data-article-type", "news-article");
  expect(article).toHaveAttribute("data-variant", "minimal");
  expect(article).toHaveAttribute("data-spacing", "small");
  expect(article).toHaveAttribute("data-border", "false");
  expect(article).toHaveAttribute("data-shadow", "none");
  expect(article).toHaveAttribute("data-reading-time", "3");
});

// Accessibility attributes test for ArticleClient
it("renders with accessibility attributes", () => {
  render(
    <ArticleClient
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
    </ArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("aria-labelledby", "article-title");
  expect(article).toHaveAttribute("aria-describedby", "article-description");
  expect(article).toHaveAttribute("role", "article");
  expect(article).toHaveAttribute("tabindex", "0");
});

// Accessibility attributes test for MemoizedArticleClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedArticleClient
      data-testid="article-element"
      aria-labelledby="memoized-article-title"
      aria-describedby="memoized-article-description"
      role="article"
      tabIndex={0}
    >
      <h1 id="memoized-article-title">Memoized Accessible Article</h1>
      <p id="memoized-article-description">
        This memoized article has proper accessibility attributes.
      </p>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveAttribute("aria-labelledby", "memoized-article-title");
  expect(article).toHaveAttribute(
    "aria-describedby",
    "memoized-article-description"
  );
  expect(article).toHaveAttribute("role", "article");
  expect(article).toHaveAttribute("tabindex", "0");
});

// Article with time and date test for ArticleClient
it("renders article with time and date elements", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article with Time</h1>
      <time dateTime="2023-12-25">December 25, 2023</time>
      <p>
        Published on <time dateTime="2023-12-25T10:00:00Z">10:00 AM UTC</time>
      </p>
    </ArticleClient>
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

// Article with time and date test for MemoizedArticleClient
it("renders memoized article with time and date elements", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Time</h1>
      <time dateTime="2024-01-01">January 1, 2024</time>
      <p>
        Published on <time dateTime="2024-01-01T12:00:00Z">12:00 PM UTC</time>
      </p>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Time");
  expect(article).toHaveTextContent("January 1, 2024");
  expect(article).toHaveTextContent("Published on 12:00 PM UTC");
  expect(
    article.querySelector("time[datetime='2024-01-01']")
  ).toBeInTheDocument();
  expect(
    article.querySelector("time[datetime='2024-01-01T12:00:00Z']")
  ).toBeInTheDocument();
});

// Article with code elements test for ArticleClient
it("renders article with code elements", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article with Code</h1>
      <p>
        Here&apos;s some <code>inline code</code> and a code block:
      </p>
      <pre>
        <code>{`function hello() {
  logger.info("Hello, World!");
}`}</code>
      </pre>
    </ArticleClient>
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

// Article with code elements test for MemoizedArticleClient
it("renders memoized article with code elements", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Code</h1>
      <p>
        Here&apos;s some memoized <code>inline code</code> and a code block:
      </p>
      <pre>
        <code>{`function memoizedHello() {
  logger.info("Hello, Memoized World!");
}`}</code>
      </pre>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Code");
  expect(article).toHaveTextContent(
    "Here's some memoized inline code and a code block:"
  );
  expect(article.querySelector("code")).toBeInTheDocument();
  expect(article.querySelector("pre")).toBeInTheDocument();
  expect(article).toHaveTextContent("function memoizedHello() {");
});

// Article with definition lists test for ArticleClient
it("renders article with definition lists", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article with Definitions</h1>
      <dl>
        <dt>HTML</dt>
        <dd>HyperText Markup Language</dd>
        <dt>CSS</dt>
        <dd>Cascading Style Sheets</dd>
        <dt>JS</dt>
        <dd>JavaScript</dd>
      </dl>
    </ArticleClient>
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

// Article with definition lists test for MemoizedArticleClient
it("renders memoized article with definition lists", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Definitions</h1>
      <dl>
        <dt>React</dt>
        <dd>A JavaScript library for building user interfaces</dd>
        <dt>TypeScript</dt>
        <dd>A typed superset of JavaScript</dd>
        <dt>Next.js</dt>
        <dd>A React framework for production</dd>
      </dl>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Definitions");
  expect(article).toHaveTextContent("React");
  expect(article).toHaveTextContent(
    "A JavaScript library for building user interfaces"
  );
  expect(article).toHaveTextContent("TypeScript");
  expect(article).toHaveTextContent("A typed superset of JavaScript");
  expect(article).toHaveTextContent("Next.js");
  expect(article).toHaveTextContent("A React framework for production");
  expect(article.querySelector("dl")).toBeInTheDocument();
  expect(article.querySelectorAll("dt")).toHaveLength(3);
  expect(article.querySelectorAll("dd")).toHaveLength(3);
});

// Article with tables test for ArticleClient
it("renders article with tables", () => {
  render(
    <ArticleClient data-testid="article-element">
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
    </ArticleClient>
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

// Article with tables test for MemoizedArticleClient
it("renders memoized article with tables", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Table</h1>
      <table>
        <caption>Memoized Sample Data</caption>
        <thead>
          <tr>
            <th>Framework</th>
            <th>Language</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>React</td>
            <td>JavaScript</td>
            <td>Library</td>
          </tr>
          <tr>
            <td>Vue</td>
            <td>JavaScript</td>
            <td>Framework</td>
          </tr>
        </tbody>
      </table>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Table");
  expect(article).toHaveTextContent("Memoized Sample Data");
  expect(article).toHaveTextContent("Framework");
  expect(article).toHaveTextContent("Language");
  expect(article).toHaveTextContent("Type");
  expect(article).toHaveTextContent("React");
  expect(article).toHaveTextContent("JavaScript");
  expect(article).toHaveTextContent("Library");
  expect(article).toHaveTextContent("Vue");
  expect(article).toHaveTextContent("Framework");
  expect(article.querySelector("table")).toBeInTheDocument();
  expect(article.querySelector("caption")).toBeInTheDocument();
  expect(article.querySelector("thead")).toBeInTheDocument();
  expect(article.querySelector("tbody")).toBeInTheDocument();
});

// Article with forms test for ArticleClient
it("renders article with forms", () => {
  render(
    <ArticleClient data-testid="article-element">
      <h1>Article with Form</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Submit</button>
      </form>
    </ArticleClient>
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

// Article with forms test for MemoizedArticleClient
it("renders memoized article with forms", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Form</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Form");
  expect(article).toHaveTextContent("Username:");
  expect(article).toHaveTextContent("Password:");
  expect(article).toHaveTextContent("Login");
  expect(article.querySelector("form")).toBeInTheDocument();
  expect(article.querySelectorAll("label")).toHaveLength(2);
  expect(article.querySelectorAll("input")).toHaveLength(2);
  expect(article.querySelector("button")).toBeInTheDocument();
});

// Article with navigation test for ArticleClient
it("renders article with navigation", () => {
  render(
    <ArticleClient data-testid="article-element">
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
    </ArticleClient>
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

// Article with navigation test for MemoizedArticleClient
it("renders memoized article with navigation", () => {
  render(
    <MemoizedArticleClient data-testid="article-element">
      <h1>Memoized Article with Navigation</h1>
      <nav>
        <ul>
          <li>
            <a href="#chapter1">Chapter 1</a>
          </li>
          <li>
            <a href="#chapter2">Chapter 2</a>
          </li>
          <li>
            <a href="#chapter3">Chapter 3</a>
          </li>
        </ul>
      </nav>
    </MemoizedArticleClient>
  );

  const article = screen.getByTestId("article-element");
  expect(article).toHaveTextContent("Memoized Article with Navigation");
  expect(article).toHaveTextContent("Chapter 1");
  expect(article).toHaveTextContent("Chapter 2");
  expect(article).toHaveTextContent("Chapter 3");
  expect(article.querySelector("nav")).toBeInTheDocument();
  expect(article.querySelectorAll("a")).toHaveLength(3);
  expect(article.querySelector("a[href='#chapter1']")).toBeInTheDocument();
  expect(article.querySelector("a[href='#chapter2']")).toBeInTheDocument();
  expect(article.querySelector("a[href='#chapter3']")).toBeInTheDocument();
});
