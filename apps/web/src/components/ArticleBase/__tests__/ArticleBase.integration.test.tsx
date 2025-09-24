import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ArticleBase from "../ArticleBase";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@guyromellemagayano/logger", () => ({
  default: {
    warn: vi.fn(),
  },
}));

vi.mock("@web/utils", () => ({
  formatDate: vi.fn((date) => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  }),
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  validateArticle: vi.fn((article) => {
    return (
      article &&
      typeof article.title === "string" &&
      article.title.trim().length > 0 &&
      typeof article.slug === "string" &&
      article.slug.trim().length > 0 &&
      typeof article.date === "string" &&
      article.date.trim().length > 0 &&
      !isNaN(new Date(article.date.trim()).getTime()) &&
      typeof article.description === "string" &&
      article.description.trim().length > 0
    );
  }),
}));

// Mock Card component
vi.mock("@web/components", () => ({
  Card: Object.assign(
    React.forwardRef<HTMLElement, any>(function MockCard(props, ref) {
      const {
        children,
        className,
        as = "article",
        debugId,
        debugMode,
        ...rest
      } = props;
      const Element = as as React.ElementType;

      return React.createElement(
        Element,
        {
          ref,
          className,
          "data-testid": "mock-card",
          "data-debug-mode": debugMode ? "true" : undefined,
          ...rest,
        },
        children
      );
    }),
    {
      Title: React.forwardRef<HTMLHeadingElement, any>(
        function MockCardTitle(props, ref) {
          const { children, href, ...rest } = props;
          return (
            <h2 ref={ref} data-testid="mock-card-title" {...rest}>
              {href ? <a href={href}>{children}</a> : children}
            </h2>
          );
        }
      ),
      Eyebrow: React.forwardRef<HTMLParagraphElement, any>(
        function MockCardEyebrow(props, ref) {
          const { children, dateTime, ...rest } = props;
          return (
            <p ref={ref} data-testid="mock-card-eyebrow" {...rest}>
              {dateTime ? (
                <time dateTime={dateTime} {...rest}>
                  {children}
                </time>
              ) : (
                children
              )}
            </p>
          );
        }
      ),
      Description: React.forwardRef<HTMLParagraphElement, any>(
        function MockCardDescription(props, ref) {
          const { children, ...rest } = props;
          return (
            <p ref={ref} data-testid="mock-card-description" {...rest}>
              {children}
            </p>
          );
        }
      ),
      Cta: React.forwardRef<HTMLDivElement, any>(
        function MockCardCta(props, ref) {
          const { children, ...rest } = props;
          return (
            <div ref={ref} data-testid="mock-card-cta" {...rest}>
              {children}
            </div>
          );
        }
      ),
    }
  ),
}));

// Mock shared data
vi.mock("../_shared", () => ({
  ARTICLE_COMPONENT_LABELS: {
    cta: "Read article",
    goBackToArticles: "Go back to articles",
    articleContent: "Article content",
    articleLayout: "Article layout",
    articleHeader: "Article header",
    articleTitle: "Article title",
    articleDate: "Published on",
    articlePublished: "Publication date",
    articleList: "Article list",
    articles: "Articles",
    invalidArticleData: "Invalid article data",
  },
  ArticleBaseComponent: vi.fn(),
}));

// Mock CSS module
vi.mock("../ArticleBase.module.css", () => ({
  default: { articleBaseContainer: "articleBaseContainer" },
}));

describe("ArticleBase Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const mockArticle = {
    slug: "test-article",
    title: "Test Article Title",
    description: "This is a test article description",
    date: "2023-01-01",
    content: "Test content",
    image: "/test-image.jpg",
    tags: ["test", "article"],
  };

  describe("Integration", () => {
    it("works with other components in complex layouts", () => {
      render(
        <div>
          <ArticleBase article={mockArticle} />
          <ArticleBase
            article={{
              ...mockArticle,
              slug: "second-article",
              title: "Second Article",
            }}
          />
        </div>
      );

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(screen.getByText("Second Article")).toBeInTheDocument();
    });

    it("maintains proper DOM structure", () => {
      render(<ArticleBase article={mockArticle} />);

      const cardElement = screen.getByTestId("mock-card");
      const title = screen.getByText("Test Article Title");
      const description = screen.getByText(
        "This is a test article description"
      );

      expect(cardElement).toContainElement(title);
      expect(cardElement).toContainElement(description);
    });
  });

  describe("Component Behavior", () => {
    it("is a pure rendering component without compound components", () => {
      expect((ArticleBase as any).Layout).toBeUndefined();
      expect((ArticleBase as any).List).toBeUndefined();
      expect((ArticleBase as any).ListItem).toBeUndefined();
      expect((ArticleBase as any).NavButton).toBeUndefined();
    });

    it("focuses on rendering article content with simple conditional logic", () => {
      render(<ArticleBase article={mockArticle} />);
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("applies CSS module classes correctly", () => {
      render(<ArticleBase article={mockArticle} className="custom-class" />);
      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveClass("articleBaseContainer");
      expect(articleElement).toHaveClass("custom-class");
    });

    it("handles edge cases with robust validation", () => {
      const edgeCaseArticle = {
        title: "  ",
        description: "\n\t",
        slug: "   ",
        date: "invalid",
        content: "test",
        image: "/test.jpg",
        tags: ["test"],
      };
      const { container } = render(
        <ArticleBase article={edgeCaseArticle as any} />
      );

      // Should not render at all since validation fails
      expect(container.firstChild).toBeNull();
    });

    it("validates date with isNaN check", () => {
      const articleWithInvalidDate = { ...mockArticle, date: "not-a-date" };
      const { container } = render(
        <ArticleBase article={articleWithInvalidDate} />
      );

      // Should not render at all since validation fails
      expect(container.firstChild).toBeNull();
    });

    it("handles valid date formats correctly", () => {
      const validDateFormats = [
        "2023-01-01",
        "01/01/2023",
        "January 1, 2023",
        "2023-01-01T00:00:00Z",
      ];

      validDateFormats.forEach((dateFormat) => {
        const { unmount } = render(
          <ArticleBase article={{ ...mockArticle, date: dateFormat }} />
        );

        // Should render the date element for valid dates
        expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
        unmount();
      });
    });

    it("applies CSS module classes with cn utility", () => {
      render(<ArticleBase article={mockArticle} className="custom-class" />);
      const articleElement = screen.getByTestId("mock-card");

      // Should have both CSS module class and custom class
      expect(articleElement).toHaveClass("articleBaseContainer");
      expect(articleElement).toHaveClass("custom-class");
    });

    it("handles complex slug encoding scenarios", () => {
      const complexSlugArticle = {
        ...mockArticle,
        slug: "test & article with spaces & symbols!",
      };
      render(<ArticleBase article={complexSlugArticle} />);

      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute(
        "href",
        "%2Farticles%2Ftest%20%26%20article%20with%20spaces%20%26%20symbols!"
      );
    });
  });
});
