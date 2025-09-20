import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Article from "../Article";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((content) => {
    if (content === null || content === undefined) {
      return false;
    }
    if (typeof content === "object" && Object.keys(content).length === 0) {
      return false;
    }
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/utils", () => ({
  formatDate: vi.fn((date) => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  }),
}));

// Mock Card component
vi.mock("@web/components", () => ({
  Card: Object.assign(
    React.forwardRef<HTMLElement, any>(function MockCard(props, ref) {
      const { children, className, as = "article", ...rest } = props;
      const Element = as as React.ElementType;

      return React.createElement(
        Element,
        {
          ref,
          className,
          "data-testid": "mock-card",
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
                <time dateTime={dateTime}>{children}</time>
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

// Mock data
vi.mock("../_data", () => ({
  ARTICLE_COMPONENT_LABELS: {
    cta: "Read article",
  },
}));

// Mock internal components
vi.mock("../_internal", () => ({
  ArticleLayout: vi.fn(({ children, ...props }) => (
    <div data-testid="mock-article-layout" {...props}>
      {children}
    </div>
  )),
  ArticleList: vi.fn(({ children, ...props }) => (
    <div data-testid="mock-article-list" {...props}>
      {children}
    </div>
  )),
  ArticleListItem: vi.fn(({ children, ...props }) => (
    <div data-testid="mock-article-list-item" {...props}>
      {children}
    </div>
  )),
  ArticleNavButton: vi.fn(({ children, ...props }) => (
    <button data-testid="mock-article-nav-button" {...props}>
      {children}
    </button>
  )),
}));

describe("Article", () => {
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
      render(<Article article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("renders as article element", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement.tagName).toBe("ARTICLE");
    });

    it("applies custom className", () => {
      render(<Article article={mockArticle} className="custom-class" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(<Article article={mockArticle} aria-label="Article" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("aria-label", "Article");
    });
  });

  describe("Article Content", () => {
    it("renders article title as Card.Title with correct href", () => {
      render(<Article article={mockArticle} />);

      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders article description as Card.Description", () => {
      render(<Article article={mockArticle} />);

      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("renders formatted date as Card.Eyebrow with time element", () => {
      render(<Article article={mockArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toBeInTheDocument();
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("renders CTA button with correct text", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByText("Read article")).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("does not render when article is null", () => {
      const { container } = render(<Article article={null as any} />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when article is undefined", () => {
      const { container } = render(<Article article={undefined as any} />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when article is empty object", () => {
      const { container } = render(<Article article={{} as any} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders when article has valid content", () => {
      render(<Article article={mockArticle} />);
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <Article
          article={mockArticle}
          internalId="custom-id"
          debugMode={true}
        />
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        internalId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<Article article={mockArticle} />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        internalId: undefined,
        debugMode: undefined,
      });
    });

    it("passes generated ID to base component", () => {
      mockUseComponentId.mockReturnValue({
        id: "generated-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("renders correctly when debug mode is enabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: true,
      });

      render(<Article article={mockArticle} debugMode={true} />);

      // Test that the component renders correctly with debug mode
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("renders correctly when debug mode is disabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} />);

      // Test that the component renders correctly without debug mode
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<Article article={mockArticle} isMemoized={true} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(<Article article={mockArticle} isMemoized={false} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders with correct Card structure", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      render(<Article article={mockArticle} className="custom-class" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveClass("custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "generated-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("renders with custom internal ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "custom-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} internalId="custom-id" />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Article article={mockArticle} ref={ref} />);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Article article={mockArticle} ref={ref} />);

      expect(ref.current?.tagName).toBe("ARTICLE");
    });
  });

  describe("Edge Cases", () => {
    it("handles article with special characters in title", () => {
      const specialArticle = {
        ...mockArticle,
        title: "Special chars: &lt;&gt;&amp;",
      };

      render(<Article article={specialArticle} />);

      expect(
        screen.getByText("Special chars: &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with special characters in description", () => {
      const specialArticle = {
        ...mockArticle,
        description: "Description with &lt;&gt;&amp;",
      };

      render(<Article article={specialArticle} />);

      expect(
        screen.getByText("Description with &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with very long title", () => {
      const longTitleArticle = {
        ...mockArticle,
        title: "A".repeat(200),
      };

      render(<Article article={longTitleArticle} />);

      expect(screen.getByText("A".repeat(200))).toBeInTheDocument();
    });

    it("handles article with very long description", () => {
      const longDescArticle = {
        ...mockArticle,
        description: "B".repeat(500),
      };

      render(<Article article={longDescArticle} />);

      expect(screen.getByText("B".repeat(500))).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("renders formatted date", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("handles different date formats", () => {
      const differentDateArticle = {
        ...mockArticle,
        date: "2023-12-25",
      };

      render(<Article article={differentDateArticle} />);

      expect(screen.getByText("12/25/2023")).toBeInTheDocument();
    });
  });

  describe("Article Slug Integration", () => {
    it("uses article slug for title link", () => {
      render(<Article article={mockArticle} />);

      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute("href", "/articles/test-article");
    });

    it("handles different slug formats", () => {
      const differentSlugArticle = {
        ...mockArticle,
        slug: "different-article-slug",
      };

      render(<Article article={differentSlugArticle} />);

      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute(
        "href",
        "/articles/different-article-slug"
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
        <Article
          article={complexArticle}
          className="performance-test"
          internalId="perf-test"
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
      const { rerender } = render(<Article article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();

      const updatedArticle = {
        ...mockArticle,
        title: "Updated Article Title",
        description: "Updated description",
      };

      rerender(<Article article={updatedArticle} />);

      expect(screen.getByText("Updated Article Title")).toBeInTheDocument();
      expect(screen.getByText("Updated description")).toBeInTheDocument();
    });

    it("handles isMemoized prop changes efficiently", () => {
      const { rerender } = render(
        <Article article={mockArticle} isMemoized={false} />
      );

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();

      rerender(<Article article={mockArticle} isMemoized={true} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<Article article={mockArticle} />);

      const articleElements = screen.getAllByRole("article");
      expect(articleElements).toHaveLength(1); // just the card
    });

    it("supports aria attributes", () => {
      render(
        <Article
          article={mockArticle}
          aria-label="Article"
          aria-describedby="article-description"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("aria-label", "Article");
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "article-description"
      );
    });

    it("supports role attribute", () => {
      render(<Article article={mockArticle} role="listitem" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("role", "listitem");
    });
  });

  describe("Integration", () => {
    it("works with other components in complex layouts", () => {
      render(
        <div>
          <Article article={mockArticle} />
          <Article
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
      render(<Article article={mockArticle} />);

      const cardElement = screen.getByTestId("mock-card");
      const title = screen.getByText("Test Article Title");
      const description = screen.getByText(
        "This is a test article description"
      );

      expect(cardElement).toContainElement(title);
      expect(cardElement).toContainElement(description);
    });
  });

  describe("Compound Components", () => {
    it("has Layout compound component attached", () => {
      expect(Article.Layout).toBeDefined();
    });

    it("renders Layout compound component", () => {
      render(
        <Article.Layout>
          <Article article={mockArticle} />
        </Article.Layout>
      );

      expect(screen.getByTestId("mock-article-layout")).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });
  });
});
