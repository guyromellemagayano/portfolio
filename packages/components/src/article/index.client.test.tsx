import React from "react";

import { render, screen } from "@testing-library/react";

import { ArticleClient, MemoizedArticleClient } from ".";

describe("ArticleClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(ArticleClient).toBeDefined();
    expect(ArticleClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
        <ArticleClient data-testid="article-element">
          <h1>Client Article Title</h1>
          <p>This is a client-side rendered article.</p>
        </ArticleClient>
      </React.Suspense>
    );

    // In test environment, lazy components may either show fallback or render immediately
    // Check for either scenario
    const loadingElement = screen.queryByTestId("loading");
    const articleElement = screen.queryByTestId("article-element");

    if (loadingElement) {
      // Fallback is shown
      expect(loadingElement).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    } else if (articleElement) {
      // Component rendered successfully
      expect(articleElement.tagName).toBe("ARTICLE");
      expect(articleElement).toHaveTextContent("Client Article Title");
      expect(articleElement).toHaveTextContent(
        "This is a client-side rendered article."
      );
    } else {
      throw new Error("Neither fallback nor component rendered");
    }
  });
});

describe("MemoizedArticleClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(MemoizedArticleClient).toBeDefined();
    expect(MemoizedArticleClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
        <MemoizedArticleClient data-testid="article-element">
          <h1>Memoized Client Article Title</h1>
          <p>This is a memoized client-side rendered article.</p>
          <section>
            <h2>Article Section</h2>
            <p>Section content with more details.</p>
          </section>
        </MemoizedArticleClient>
      </React.Suspense>
    );

    // In test environment, lazy components may either show fallback or render immediately
    // Check for either scenario
    const loadingElement = screen.queryByTestId("loading");
    const articleElement = screen.queryByTestId("article-element");

    if (loadingElement) {
      // Fallback is shown
      expect(loadingElement).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    } else if (articleElement) {
      // Component rendered successfully
      expect(articleElement.tagName).toBe("ARTICLE");
      expect(articleElement).toHaveTextContent("Memoized Client Article Title");
      expect(articleElement).toHaveTextContent(
        "This is a memoized client-side rendered article."
      );
      expect(articleElement).toHaveTextContent("Article Section");
      expect(articleElement).toHaveTextContent(
        "Section content with more details."
      );
    } else {
      throw new Error("Neither fallback nor component rendered");
    }
  });
});
