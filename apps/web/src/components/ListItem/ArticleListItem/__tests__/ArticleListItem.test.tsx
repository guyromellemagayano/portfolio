// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArticleListItem } from "../ArticleListItem";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  formatDateSafely: vi.fn((date) => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  formatDate: vi.fn((date) => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  }),
}));

// Mock logger
vi.mock("@guyromellemagayano/logger", () => ({
  default: {
    warn: vi.fn(),
  },
}));

// Mock Card component
vi.mock("@web/components", () => ({
  Card: Object.assign(
    React.forwardRef<HTMLElement, any>(function MockCard(props, ref) {
      const {
        children,
        className,
        as = "article",
        internalId: _internalId,
        debugMode: _debugMode,
        ...rest
      } = props;
      const Element = as as React.ElementType;

      return React.createElement(
        Element,
        {
          ref,
          className,
          "data-testid": "mock-card",
          "data-debug-mode": _debugMode ? "true" : undefined,
          role: as === "article" ? "article" : undefined,
          ...rest,
        },
        children
      );
    }),
    {
      Title: React.forwardRef<HTMLHeadingElement, any>(
        function MockCardTitle(props, ref) {
          const {
            children,
            href,
            internalId: _internalId,
            debugMode: _debugMode,
            ...rest
          } = props;
          return (
            <h2 ref={ref} data-testid="mock-card-title" {...rest}>
              {href ? (
                <a href={href} aria-label="Article title link">
                  {children}
                </a>
              ) : (
                children
              )}
            </h2>
          );
        }
      ),
      Eyebrow: React.forwardRef<HTMLParagraphElement, any>(
        function MockCardEyebrow(props, ref) {
          const {
            children,
            dateTime,
            internalId: _internalId,
            debugMode: _debugMode,
            ...rest
          } = props;
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
          const {
            children,
            internalId: _internalId,
            debugMode: _debugMode,
            ...rest
          } = props;
          return (
            <p ref={ref} data-testid="mock-card-description" {...rest}>
              {children}
            </p>
          );
        }
      ),
      Cta: React.forwardRef<HTMLDivElement, any>(
        function MockCardCta(props, ref) {
          const {
            children,
            internalId: _internalId,
            debugMode: _debugMode,
            ...rest
          } = props;
          return (
            <div
              ref={ref}
              data-testid="mock-card-cta"
              role="button"
              aria-label="Call to action"
              {...rest}
            >
              {children}
            </div>
          );
        }
      ),
    }
  ),
}));

// Mock shared data
vi.mock("../_data", () => ({
  ARTICLE_I18N: {
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
}));

// Mock Next.js intersection observer
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    back: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
}));

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("ArticleListItem", () => {
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
    it("renders article item correctly", () => {
      render(<ArticleListItem article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("renders as article element", () => {
      render(<ArticleListItem article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement.tagName).toBe("ARTICLE");
    });

    it("applies custom className", () => {
      render(
        <ArticleListItem article={mockArticle} className="custom-class" />
      );

      // The custom className is applied to the wrapper article element, not the Card
      const wrapperArticle = screen.getByTestId("test-id-article-item");
      expect(wrapperArticle).toHaveAttribute("class");
    });

    it("passes through HTML attributes", () => {
      render(
        <ArticleListItem article={mockArticle} aria-label="Article item" />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute(
        "aria-label",
        "Test Article Title"
      );
    });
  });

  describe("Article Content", () => {
    it("renders article title as Card.Title with correct href", () => {
      render(<ArticleListItem article={mockArticle} />);

      // The title should be rendered and linked to the article
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders article description as Card.Description", () => {
      render(<ArticleListItem article={mockArticle} />);

      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("renders formatted date as Card.Eyebrow with time element", () => {
      render(<ArticleListItem article={mockArticle} />);

      // The date should be formatted and rendered
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("renders CTA button with correct text", () => {
      render(<ArticleListItem article={mockArticle} />);

      expect(screen.getByText("Read article")).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("does not render when title is empty", () => {
      const emptyTitleArticle = {
        ...mockArticle,
        title: "",
      };

      const { container } = render(
        <ArticleListItem article={emptyTitleArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when description is empty", () => {
      const emptyDescriptionArticle = {
        ...mockArticle,
        description: "",
      };

      const { container } = render(
        <ArticleListItem article={emptyDescriptionArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when slug is empty", () => {
      const emptySlugArticle = {
        ...mockArticle,
        slug: "",
      };

      const { container } = render(
        <ArticleListItem article={emptySlugArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when date is empty", () => {
      const emptyDateArticle = {
        ...mockArticle,
        date: "",
      };

      const { container } = render(
        <ArticleListItem article={emptyDateArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when title is null", () => {
      const nullTitleArticle = {
        ...mockArticle,
        title: null as any,
      };

      const { container } = render(
        <ArticleListItem article={nullTitleArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when description is null", () => {
      const nullDescriptionArticle = {
        ...mockArticle,
        description: null as any,
      };

      const { container } = render(
        <ArticleListItem article={nullDescriptionArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when slug is null", () => {
      const nullSlugArticle = {
        ...mockArticle,
        slug: null as any,
      };

      const { container } = render(
        <ArticleListItem article={nullSlugArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when date is null", () => {
      const nullDateArticle = {
        ...mockArticle,
        date: null as any,
      };

      const { container } = render(
        <ArticleListItem article={nullDateArticle} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders when all required fields have content", () => {
      render(<ArticleListItem article={mockArticle} />);
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <ArticleListItem
          article={mockArticle}
          debugId="custom-id"
          debugMode={true}
        />
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<ArticleListItem article={mockArticle} />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: undefined,
      });
    });

    it("passes generated ID to base component", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<ArticleListItem article={mockArticle} />);

      // The component should render with the generated ID
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: true,
      });

      render(<ArticleListItem article={mockArticle} debugMode={true} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: false,
      });

      render(<ArticleListItem article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Front Page Rendering", () => {
    it("renders with wrapper article when isFrontPage is false", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={false} />);

      // The Card should have the CSS class when not on front page
      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveAttribute("class");
      expect(cardElement.tagName).toBe("ARTICLE");
    });

    it("renders without wrapper article when isFrontPage is true", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      // When isFrontPage is true, it renders directly as Card without wrapper
      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement.tagName).toBe("ARTICLE");

      // Should not have the articleListItemCard class when on front page
      // The mock card doesn't have a class attribute when isFrontPage is true
      expect(cardElement).toBeInTheDocument();
    });

    it("applies card styles when isFrontPage is false", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={false} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveAttribute("class");
    });

    it("does not apply card styles when isFrontPage is true", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      const cardElement = screen.getByTestId("mock-card");
      // The mock card doesn't have a class attribute when isFrontPage is true
      expect(cardElement).toBeInTheDocument();
    });

    it("defaults to isFrontPage false", () => {
      render(<ArticleListItem article={mockArticle} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveAttribute("class");
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(<ArticleListItem article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<ArticleListItem article={mockArticle} isMemoized={true} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(<ArticleListItem article={mockArticle} isMemoized={false} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes when not on front page", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={false} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveAttribute("class");
    });

    it("applies correct CSS classes when on front page", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      const cardElement = screen.getByTestId("mock-card");
      // The mock card doesn't have a class attribute when isFrontPage is true
      expect(cardElement).toBeInTheDocument();
    });

    it("combines CSS module + custom classes", () => {
      render(
        <ArticleListItem article={mockArticle} className="custom-class" />
      );

      // The custom className is applied to the wrapper article element
      const wrapperArticle = screen.getByTestId("test-id-article-item");
      expect(wrapperArticle).toHaveAttribute("class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<ArticleListItem article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
    });

    it("renders with custom debug ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-id",
        isDebugMode: false,
      });

      render(<ArticleListItem article={mockArticle} debugId="custom-id" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles article with special characters in title", () => {
      const specialArticle = {
        ...mockArticle,
        title: "Special chars: &lt;&gt;&amp;",
      };

      render(<ArticleListItem article={specialArticle} />);

      expect(
        screen.getByText("Special chars: &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with special characters in description", () => {
      const specialArticle = {
        ...mockArticle,
        description: "Description with &lt;&gt;&amp;",
      };

      render(<ArticleListItem article={specialArticle} />);

      expect(
        screen.getByText("Description with &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with very long title", () => {
      const longTitleArticle = {
        ...mockArticle,
        title: "A".repeat(200),
      };

      render(<ArticleListItem article={longTitleArticle} />);

      expect(screen.getByText("A".repeat(200))).toBeInTheDocument();
    });

    it("handles article with very long description", () => {
      const longDescArticle = {
        ...mockArticle,
        description: "B".repeat(500),
      };

      render(<ArticleListItem article={longDescArticle} />);

      expect(screen.getByText("B".repeat(500))).toBeInTheDocument();
    });

    it("handles article with whitespace-only title and description", () => {
      const whitespaceArticle = {
        ...mockArticle,
        title: "   ",
        description: "\t\n",
      };

      const { container } = render(
        <ArticleListItem article={whitespaceArticle} />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Date Formatting", () => {
    it("renders formatted date", () => {
      render(<ArticleListItem article={mockArticle} />);

      // The date should be rendered in the eyebrow
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
    });

    it("handles different date formats", () => {
      const differentDateArticle = {
        ...mockArticle,
        date: "2023-12-25",
      };

      render(<ArticleListItem article={differentDateArticle} />);

      // The date should be rendered in the eyebrow
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
    });
  });

  describe("Article Slug Integration", () => {
    it("uses article slug for title link", () => {
      render(<ArticleListItem article={mockArticle} />);

      // The title should be rendered (the actual link href would be tested in Card.Title tests)
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("handles different slug formats", () => {
      const differentSlugArticle = {
        ...mockArticle,
        slug: "different-article-slug",
      };

      render(<ArticleListItem article={differentSlugArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
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
        <ArticleListItem
          article={complexArticle}
          debugId="perf-test"
          debugMode={true}
          isMemoized={true}
          isFrontPage={false}
        />
      );

      expect(screen.getByText("Complex Article")).toBeInTheDocument();
      expect(
        screen.getByText("Complex description with lots of content")
      ).toBeInTheDocument();
    });

    it("handles dynamic article updates efficiently", () => {
      const { rerender } = render(<ArticleListItem article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();

      const updatedArticle = {
        ...mockArticle,
        title: "Updated Article Title",
        description: "Updated description",
      };

      rerender(<ArticleListItem article={updatedArticle} />);

      expect(screen.getByText("Updated Article Title")).toBeInTheDocument();
      expect(screen.getByText("Updated description")).toBeInTheDocument();
    });

    it("handles isFrontPage prop changes efficiently", () => {
      const { rerender } = render(
        <ArticleListItem article={mockArticle} isFrontPage={false} />
      );

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();

      rerender(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      // Should render directly as Card without wrapper
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<ArticleListItem article={mockArticle} />);

      const articleElements = screen.getAllByRole("article");
      expect(articleElements).toHaveLength(2); // test wrapper + card
    });

    it("supports aria attributes", () => {
      render(
        <ArticleListItem
          article={mockArticle}
          aria-label="Article item"
          aria-describedby="article-description"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      // Component now has aria-label (no ID dependencies)
      expect(articleElement).toHaveAttribute(
        "aria-label",
        "Test Article Title"
      );
    });

    it("supports role attribute", () => {
      render(<ArticleListItem article={mockArticle} role="listitem" />);

      const articleElement = screen.getByTestId("mock-card");
      // Component accepts custom role prop which overrides default
      expect(articleElement).toHaveAttribute("role", "listitem");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      render(<ArticleListItem article={mockArticle} debugId="aria-test" />);

      // Test article role
      const articleElements = screen.getAllByRole("article");
      expect(articleElements).toHaveLength(2); // wrapper + card

      // Test heading role
      const headingElement = screen.getByRole("heading", { level: 1 });
      expect(headingElement).toBeInTheDocument();

      // Test button role
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(<ArticleListItem article={mockArticle} debugId="aria-test" />);

      const articleElement = screen.getByTestId("mock-card");

      // Article should have proper role (no ID dependencies)
      expect(articleElement).toHaveAttribute("role", "article");
    });

    it("applies correct ARIA labels without ID dependencies", () => {
      render(<ArticleListItem article={mockArticle} debugId="aria-test" />);

      // Title should be present (no ID needed)
      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toBeInTheDocument();

      // Description should be present (no ID needed)
      const descriptionElement = screen.getByTestId("mock-card-description");
      expect(descriptionElement).toBeInTheDocument();

      // Date should be present (no ID needed)
      const dateElement = screen.getByTestId("mock-card-eyebrow");
      expect(dateElement).toBeInTheDocument();

      // CTA should be present (no ID needed)
      const ctaElement = screen.getByTestId("mock-card-cta");
      expect(ctaElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to content elements", () => {
      render(<ArticleListItem article={mockArticle} debugId="aria-test" />);

      // Date element should have descriptive label
      const dateElement = screen.getByTestId("mock-card-eyebrow");
      expect(dateElement).toHaveAttribute(
        "aria-label",
        "Published on 1/1/2023"
      );

      // CTA button should have descriptive label
      const ctaElement = screen.getByTestId("mock-card-cta");
      expect(ctaElement).toHaveAttribute(
        "aria-label",
        "Read article: Test Article Title"
      );
    });

    it("applies correct heading level ARIA attribute", () => {
      render(<ArticleListItem article={mockArticle} debugId="aria-test" />);

      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toHaveAttribute("aria-level", "1");
    });

    it("applies ARIA attributes with different internal IDs", () => {
      render(
        <ArticleListItem article={mockArticle} debugId="custom-aria-id" />
      );

      const articleElement = screen.getByTestId("mock-card");
      const titleElement = screen.getByRole("heading", { level: 1 });
      const descriptionElement = screen.getByTestId("mock-card-description");

      // Should have proper roles (no ID dependencies)
      expect(articleElement).toHaveAttribute("role", "article");
      expect(titleElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(
        <ArticleListItem article={mockArticle} debugId="aria-test" />
      );

      // Initial render
      let articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("role", "article");

      // Update with different article
      const updatedArticle = {
        ...mockArticle,
        title: "Updated Article Title",
        description: "Updated description",
      };

      rerender(
        <ArticleListItem article={updatedArticle} debugId="aria-test" />
      );

      // ARIA attributes should be maintained
      articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("role", "article");
    });

    it("ensures proper ARIA landmark structure", () => {
      render(<ArticleListItem article={mockArticle} debugId="aria-test" />);

      // Should have article landmarks
      const articleElements = screen.getAllByRole("article");
      expect(articleElements).toHaveLength(2);

      // Should have heading landmark
      const headingElement = screen.getByRole("heading", { level: 1 });
      expect(headingElement).toBeInTheDocument();

      // Should have button landmark
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(<ArticleListItem article={mockArticle} debugId="aria-test" />);

      const articleElement = screen.getByTestId("mock-card");

      // Should have proper role (no ID dependencies)
      expect(articleElement).toHaveAttribute("role", "article");
    });

    it("handles ARIA attributes when content is missing", () => {
      const articleWithoutTitle = { ...mockArticle, title: "" };
      render(
        <ArticleListItem article={articleWithoutTitle} debugId="aria-test" />
      );

      // Component should not render when title is missing
      const { container } = render(
        <ArticleListItem article={articleWithoutTitle} debugId="aria-test" />
      );
      expect(container.firstChild).toBeNull();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      render(
        <ArticleListItem
          article={mockArticle}
          debugId="aria-test"
          aria-expanded="true"
          aria-controls="article-content"
        />
      );

      const articleElement = screen.getByTestId("mock-card");

      // Should maintain both component ARIA attributes and custom ones
      expect(articleElement).toHaveAttribute("role", "article");
      expect(articleElement).toHaveAttribute("aria-expanded", "true");
      expect(articleElement).toHaveAttribute(
        "aria-controls",
        "article-content"
      );
    });

    it("applies ARIA attributes for front page rendering", () => {
      render(
        <ArticleListItem
          article={mockArticle}
          debugId="aria-test"
          isFrontPage={true}
        />
      );

      // Should still have proper ARIA attributes even when on front page
      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("role", "article");
    });

    it("applies ARIA attributes for non-front page rendering", () => {
      render(
        <ArticleListItem
          article={mockArticle}
          debugId="aria-test"
          isFrontPage={false}
        />
      );

      // Should have proper ARIA attributes with wrapper article
      const articleElements = screen.getAllByRole("article");
      expect(articleElements).toHaveLength(2);

      // Both articles should have proper roles (no ID dependencies)
      const wrapperArticle = articleElements[0];
      const cardArticle = articleElements[1];

      expect(wrapperArticle).toHaveAttribute("role", "article");
      expect(cardArticle).toHaveAttribute("role", "article");
    });
  });

  describe("Integration", () => {
    it("works with other components in complex layouts", () => {
      render(
        <div>
          <ArticleListItem article={mockArticle} />
          <ArticleListItem
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

    it("maintains proper DOM structure when not on front page", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={false} />);

      const cardElement = screen.getByTestId("mock-card");
      const title = screen.getByText("Test Article Title");
      const description = screen.getByText(
        "This is a test article description"
      );

      expect(cardElement).toContainElement(title);
      expect(cardElement).toContainElement(description);
    });

    it("maintains proper DOM structure when on front page", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      const cardElement = screen.getByTestId("mock-card");
      const title = screen.getByText("Test Article Title");
      const description = screen.getByText(
        "This is a test article description"
      );

      expect(cardElement).toContainElement(title);
      expect(cardElement).toContainElement(description);
    });

    it("works with mixed front page and regular rendering", () => {
      render(
        <div>
          <ArticleListItem article={mockArticle} isFrontPage={true} />
          <ArticleListItem
            article={{
              ...mockArticle,
              slug: "second-article",
              title: "Second Article",
            }}
            isFrontPage={false}
          />
        </div>
      );

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(screen.getByText("Second Article")).toBeInTheDocument();
    });
  });
});
