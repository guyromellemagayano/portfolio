import React from "react";

import { render, screen } from "@testing-library/react";

import { Article } from ".";

// Basic render test
it("renders an article with children", () => {
  render(
    <Article data-testid="article-element">
      <h1>Article Title</h1>
      <p>Article content goes here.</p>
    </Article>
  );
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Article Title");
  expect(article).toHaveTextContent("Article content goes here.");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Article as="div" data-testid="custom-div">
      <h2>Custom Article</h2>
      <p>This is rendered as a div.</p>
    </Article>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom Article");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Article isClient data-testid="article-element">
      <h3>Client Article</h3>
      <p>This is a client-side rendered article.</p>
    </Article>
  );

  // Should render the fallback (the article) immediately
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Client Article");

  // The lazy component should load and render the same content
  await screen.findByTestId("article-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Article isClient isMemoized data-testid="article-element">
      <h3>Memoized Client Article</h3>
      <p>This is a memoized client-side rendered article.</p>
    </Article>
  );

  // Should render the fallback (the article) immediately
  const article = screen.getByTestId("article-element");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toHaveTextContent("Memoized Client Article");

  // The lazy component should load and render the same content
  await screen.findByTestId("article-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <Article ref={ref}>
      <h4>Article with Ref</h4>
      <p>This article has a forwarded ref.</p>
    </Article>
  );
  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe("ARTICLE");
});

// Article-specific content test
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

// Empty article test
it("renders empty article", () => {
  render(<Article data-testid="empty-article" />);
  const article = screen.getByTestId("empty-article");
  expect(article.tagName).toBe("ARTICLE");
  expect(article).toBeEmptyDOMElement();
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
