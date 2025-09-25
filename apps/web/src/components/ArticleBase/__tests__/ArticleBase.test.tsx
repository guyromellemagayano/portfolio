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
        debugId: _debugId,
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
vi.mock("@web/components/_shared", () => ({
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

describe("ArticleBase", () => {
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

  describe("Basic Rendering", () => {
    it("renders article correctly", () => {
      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("renders as article element", () => {
      render(<ArticleBase article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement.tagName).toBe("ARTICLE");
    });

    it("applies custom className", () => {
      render(<ArticleBase article={mockArticle} className="custom-class" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(<ArticleBase article={mockArticle} aria-label="Article" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("aria-label", "Article");
    });
  });

  describe("Article Content", () => {
    it("renders article title as Card.Title with correct href", () => {
      render(<ArticleBase article={mockArticle} />);

      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders article description as Card.Description", () => {
      render(<ArticleBase article={mockArticle} />);

      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("renders formatted date as Card.Eyebrow with time element", () => {
      render(<ArticleBase article={mockArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toBeInTheDocument();
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("renders CTA button with correct text", () => {
      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByText("Read article")).toBeInTheDocument();
    });
  });

  describe("Content Rendering", () => {
    it("does not render with null article", () => {
      const { container } = render(<ArticleBase article={null as any} />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render with undefined article", () => {
      const { container } = render(<ArticleBase article={undefined as any} />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render with empty object (validation fails)", () => {
      const { container } = render(<ArticleBase article={{} as any} />);
      expect(container.firstChild).toBeNull();
    });

    it("conditionally renders title when present", () => {
      render(<ArticleBase article={mockArticle} />);
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("does not render when title is empty (validation fails)", () => {
      const articleWithoutTitle = { ...mockArticle, title: "" };
      const { container } = render(
        <ArticleBase article={articleWithoutTitle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("conditionally renders description when present", () => {
      render(<ArticleBase article={mockArticle} />);
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("does not render when description is empty (validation fails)", () => {
      const articleWithoutDescription = { ...mockArticle, description: "" };
      const { container } = render(
        <ArticleBase article={articleWithoutDescription} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("conditionally renders date when present", () => {
      render(<ArticleBase article={mockArticle} />);
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("does not render when date is empty (validation fails)", () => {
      const articleWithoutDate = { ...mockArticle, date: "" };
      const { container } = render(
        <ArticleBase article={articleWithoutDate} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("conditionally renders title link when slug is present", () => {
      render(<ArticleBase article={mockArticle} />);
      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute("href", "%2Farticles%2Ftest-article");
    });

    it("does not render when slug is empty (validation fails)", () => {
      const articleWithoutSlug = { ...mockArticle, slug: "" };
      const { container } = render(
        <ArticleBase article={articleWithoutSlug} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render with minimal article (validation fails)", () => {
      const minimalArticle = { title: "", description: "", date: "", slug: "" };
      const { container } = render(
        <ArticleBase article={minimalArticle as any} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when title is only whitespace (validation fails)", () => {
      const articleWithWhitespaceTitle = { ...mockArticle, title: "   \n\t  " };
      const { container } = render(
        <ArticleBase article={articleWithWhitespaceTitle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when description is only whitespace (validation fails)", () => {
      const articleWithWhitespaceDescription = {
        ...mockArticle,
        description: "   \n\t  ",
      };
      const { container } = render(
        <ArticleBase article={articleWithWhitespaceDescription} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when date is only whitespace (validation fails)", () => {
      const articleWithWhitespaceDate = { ...mockArticle, date: "   \n\t  " };
      const { container } = render(
        <ArticleBase article={articleWithWhitespaceDate} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when slug is only whitespace (validation fails)", () => {
      const articleWithWhitespaceSlug = { ...mockArticle, slug: "   \n\t  " };
      const { container } = render(
        <ArticleBase article={articleWithWhitespaceSlug} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render with null title and slug (validation fails)", () => {
      const articleWithNulls = {
        ...mockArticle,
        title: null,
        slug: null,
      } as any;
      const { container } = render(<ArticleBase article={articleWithNulls} />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render with undefined title and slug (validation fails)", () => {
      const articleWithUndefineds = {
        ...mockArticle,
        title: undefined,
        slug: undefined,
      } as any;
      const { container } = render(
        <ArticleBase article={articleWithUndefineds} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render with non-object article", () => {
      const { container } = render(
        <ArticleBase article={"not-an-object" as any} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when date is invalid (validation fails)", () => {
      const articleWithInvalidDate = { ...mockArticle, date: "invalid-date" };
      const { container } = render(
        <ArticleBase article={articleWithInvalidDate} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("encodes special characters in slug URLs", () => {
      const articleWithSpecialSlug = { ...mockArticle, slug: "test & article" };
      render(<ArticleBase article={articleWithSpecialSlug} />);
      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute(
        "href",
        "%2Farticles%2Ftest%20%26%20article"
      );
    });

    it("handles mixed whitespace and content correctly", () => {
      const articleWithMixedWhitespace = {
        ...mockArticle,
        title: "  Valid Title  ",
        description: "  Valid Description  ",
        slug: "  valid-slug  ",
        date: "  2023-01-01  ",
      };
      render(<ArticleBase article={articleWithMixedWhitespace} />);

      // Component trims whitespace, so expect the trimmed versions
      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Valid Description")).toBeInTheDocument();
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();

      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute("href", "%2Farticles%2Fvalid-slug");
    });

    it("does not render with different prop types (validation fails)", () => {
      const articleWithDifferentTypes = {
        ...mockArticle,
        title: "123", // Convert to string to avoid trim() error
        slug: "true", // Convert to string to avoid trim() error
        description: null as any,
        date: undefined as any,
      };
      const { container } = render(
        <ArticleBase article={articleWithDifferentTypes} />
      );

      // Should not render at all since validation fails
      expect(container.firstChild).toBeNull();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(<ArticleBase article={mockArticle} debugMode={true} />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugMode: true,
      });
    });

    it("calls useComponentId with debugId parameter", () => {
      render(<ArticleBase article={mockArticle} debugId="custom-id" />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: undefined,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<ArticleBase article={mockArticle} />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugMode: undefined,
      });
    });

    it("passes generated ID to base component", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("renders correctly when debug mode is enabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: true,
      });

      render(<ArticleBase article={mockArticle} debugMode={true} />);

      // Test that the component renders correctly with debug mode
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("renders correctly when debug mode is disabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} />);

      // Test that the component renders correctly without debug mode
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<ArticleBase article={mockArticle} isMemoized={true} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(<ArticleBase article={mockArticle} isMemoized={false} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders with correct Card structure", () => {
      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      render(<ArticleBase article={mockArticle} className="custom-class" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveClass("custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("renders with custom internal ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-id",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="custom-id" />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<ArticleBase article={mockArticle} ref={ref} />);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<ArticleBase article={mockArticle} ref={ref} />);

      expect(ref.current?.tagName).toBe("ARTICLE");
    });
  });

  describe("Edge Cases", () => {
    it("handles article with special characters in title", () => {
      const specialArticle = {
        ...mockArticle,
        title: "Special chars: &lt;&gt;&amp;",
      };

      render(<ArticleBase article={specialArticle} />);

      expect(
        screen.getByText("Special chars: &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with special characters in description", () => {
      const specialArticle = {
        ...mockArticle,
        description: "Description with &lt;&gt;&amp;",
      };

      render(<ArticleBase article={specialArticle} />);

      expect(
        screen.getByText("Description with &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with very long title", () => {
      const longTitleArticle = {
        ...mockArticle,
        title: "A".repeat(200),
      };

      render(<ArticleBase article={longTitleArticle} />);

      expect(screen.getByText("A".repeat(200))).toBeInTheDocument();
    });

    it("handles article with very long description", () => {
      const longDescArticle = {
        ...mockArticle,
        description: "B".repeat(500),
      };

      render(<ArticleBase article={longDescArticle} />);

      expect(screen.getByText("B".repeat(500))).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("renders formatted date", () => {
      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("handles different date formats", () => {
      const differentDateArticle = {
        ...mockArticle,
        date: "2023-12-25",
      };

      render(<ArticleBase article={differentDateArticle} />);

      expect(screen.getByText("12/25/2023")).toBeInTheDocument();
    });
  });

  describe("Article Slug Integration", () => {
    it("uses article slug for title link", () => {
      render(<ArticleBase article={mockArticle} />);

      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute("href", "%2Farticles%2Ftest-article");
    });

    it("handles different slug formats", () => {
      const differentSlugArticle = {
        ...mockArticle,
        slug: "different-article-slug",
      };

      render(<ArticleBase article={differentSlugArticle} />);

      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute(
        "href",
        "%2Farticles%2Fdifferent-article-slug"
      );
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple props", () => {
      const complexArticle = {
        ...mockArticle,
        title: "Complex Article",
        description: "Complex description with lots of content",
      };

      render(
        <ArticleBase
          article={complexArticle}
          className="performance-test"
          debugId="perf-test"
          debugMode={true}
          isMemoized={true}
        />
      );

      expect(screen.getByText("Complex Article")).toBeInTheDocument();
      expect(
        screen.getByText("Complex description with lots of content")
      ).toBeInTheDocument();
    });

    it("handles dynamic article updates efficiently", () => {
      const { rerender } = render(<ArticleBase article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();

      const updatedArticle = {
        ...mockArticle,
        title: "Updated Article Title",
        description: "Updated description",
      };

      rerender(<ArticleBase article={updatedArticle} />);

      expect(screen.getByText("Updated Article Title")).toBeInTheDocument();
      expect(screen.getByText("Updated description")).toBeInTheDocument();
    });

    it("handles isMemoized prop changes efficiently", () => {
      const { rerender } = render(
        <ArticleBase article={mockArticle} isMemoized={false} />
      );

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();

      rerender(<ArticleBase article={mockArticle} isMemoized={true} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<ArticleBase article={mockArticle} />);

      const articleElements = screen.getAllByRole("article");
      expect(articleElements).toHaveLength(1); // just the card
    });

    it("supports aria attributes", () => {
      render(<ArticleBase article={mockArticle} aria-label="Custom Article" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("aria-label", "Custom Article");
      // Component now has its own aria-describedby based on description
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "test-id-base-article-card-description"
      );
    });

    it("supports role attribute", () => {
      render(<ArticleBase article={mockArticle} role="listitem" />);

      const articleElement = screen.getByTestId("mock-card");
      // Component now has hardcoded role="article" for accessibility
      expect(articleElement).toHaveAttribute("role", "article");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="aria-test" />);

      // Test article role
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();

      // Test button role for CTA
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="aria-test" />);

      const articleElement = screen.getByRole("article");

      // Article should be labelled by the title
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-base-article-card-title"
      );

      // Article should be described by the description
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "aria-test-base-article-card-description"
      );
    });

    it("applies unique IDs for ARIA relationships", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="aria-test" />);

      // Title should have unique ID
      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toHaveAttribute(
        "id",
        "aria-test-base-article-card-title"
      );

      // Description should have unique ID
      const descriptionElement = screen.getByText(
        "This is a test article description"
      );
      expect(descriptionElement).toHaveAttribute(
        "id",
        "aria-test-base-article-card-description"
      );
    });

    it("applies correct ARIA labels to content elements", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="aria-test" />);

      // Date element should have descriptive label
      const dateElement = screen.getByText("1/1/2023").closest("time");
      expect(dateElement).toHaveAttribute(
        "aria-label",
        "Published on 1/1/2023"
      );

      // CTA button should have descriptive label
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveAttribute(
        "aria-label",
        "Read article: Test Article Title"
      );
    });

    it("applies correct heading level ARIA attribute", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="aria-test" />);

      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toHaveAttribute("aria-level", "1");
    });

    it("does not render when title is missing (validation fails)", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      const articleWithoutTitle = { ...mockArticle, title: "" };
      const { container } = render(
        <ArticleBase article={articleWithoutTitle} debugId="aria-test" />
      );

      // Should not render at all since validation fails
      expect(container.firstChild).toBeNull();
    });

    it("does not render when description is missing (validation fails)", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      const articleWithoutDescription = { ...mockArticle, description: "" };
      const { container } = render(
        <ArticleBase article={articleWithoutDescription} debugId="aria-test" />
      );

      // Should not render at all since validation fails
      expect(container.firstChild).toBeNull();
    });

    it("does not render when both title and description are missing (validation fails)", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      const articleWithoutTitleAndDescription = {
        ...mockArticle,
        title: "",
        description: "",
      };
      const { container } = render(
        <ArticleBase
          article={articleWithoutTitleAndDescription}
          debugId="aria-test"
        />
      );

      // Should not render at all since validation fails
      expect(container.firstChild).toBeNull();
    });

    it("applies ARIA attributes with different debug IDs", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-aria-id",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="custom-aria-id" />);

      const titleElement = screen.getByRole("heading", { level: 1 });
      const descriptionElement = screen.getByText(
        "This is a test article description"
      );
      const articleElement = screen.getByRole("article");

      // Should use custom debug ID in ARIA relationships
      expect(titleElement).toHaveAttribute(
        "id",
        "custom-aria-id-base-article-card-title"
      );
      expect(descriptionElement).toHaveAttribute(
        "id",
        "custom-aria-id-base-article-card-description"
      );
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "custom-aria-id-base-article-card-title"
      );
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "custom-aria-id-base-article-card-description"
      );
    });

    it("maintains ARIA attributes during component updates", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      const { rerender } = render(
        <ArticleBase article={mockArticle} debugId="aria-test" />
      );

      // Initial render
      let articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-base-article-card-title"
      );

      // Update with different article
      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(<ArticleBase article={updatedArticle} debugId="aria-test" />);

      // ARIA attributes should be maintained
      articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-base-article-card-title"
      );
      expect(screen.getByText("Updated Title")).toBeInTheDocument();
    });

    it("ensures proper ARIA landmark structure", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} debugId="aria-test" />);

      // Should have article landmark
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();

      // Should have heading landmark
      const headingElement = screen.getByRole("heading", { level: 1 });
      expect(headingElement).toBeInTheDocument();

      // Should have button landmark
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("does not render with partial content (validation fails)", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      const articleWithPartialContent = {
        ...mockArticle,
        title: "Title Only",
        description: "",
        date: "",
      };
      const { container } = render(
        <ArticleBase article={articleWithPartialContent} debugId="aria-test" />
      );

      // Should not render at all since validation fails
      expect(container.firstChild).toBeNull();
    });
  });
});
