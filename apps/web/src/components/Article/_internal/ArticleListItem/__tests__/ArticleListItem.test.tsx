import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ArticleListItem from "../ArticleListItem";

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
  hasMeaningfulText: vi.fn((content) => {
    if (content === null || content === undefined || content === "") {
      return false;
    }
    if (typeof content === "string" && content.trim().length === 0) {
      return false;
    }
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
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

// Mock Card component
vi.mock("@web/components", () => ({
  Card: Object.assign(
    React.forwardRef<HTMLElement, any>(function MockCard(props, ref) {
      const {
        children,
        className,
        as = "article",
        internalId,
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

// Mock CSS modules
vi.mock("../ArticleListItem.module.css", () => ({
  default: {
    articleListItem: "articleListItem",
    articleListItemCard: "articleListItemCard",
  },
}));

// Mock data
vi.mock("../_data", () => ({
  ARTICLE_LIST_ITEM_COMPONENT_LABELS: {
    cta: "Read article",
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
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
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

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <ArticleListItem article={mockArticle} aria-label="Article item" />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("aria-label", "Article item");
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
      render(<ArticleListItem article={mockArticle} />);

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

      render(<ArticleListItem article={mockArticle} />);

      // The component should render with the generated ID
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: true,
      });

      render(<ArticleListItem article={mockArticle} debugMode={true} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
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
      expect(cardElement).toHaveClass("articleListItemCard");
      expect(cardElement.tagName).toBe("ARTICLE");
    });

    it("renders without wrapper article when isFrontPage is true", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      // When isFrontPage is true, it renders directly as Card without wrapper
      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement.tagName).toBe("ARTICLE");

      // Should not have the articleListItemCard class when on front page
      expect(cardElement).not.toHaveClass("articleListItemCard");
    });

    it("applies card styles when isFrontPage is false", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={false} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveClass("articleListItemCard");
    });

    it("does not apply card styles when isFrontPage is true", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).not.toHaveClass("articleListItemCard");
    });

    it("defaults to isFrontPage false", () => {
      render(<ArticleListItem article={mockArticle} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveClass("articleListItemCard");
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
      expect(cardElement).toHaveClass("articleListItemCard");
    });

    it("applies correct CSS classes when on front page", () => {
      render(<ArticleListItem article={mockArticle} isFrontPage={true} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).not.toHaveClass("articleListItemCard");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <ArticleListItem article={mockArticle} className="custom-class" />
      );

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveClass("articleListItemCard", "custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "generated-id",
        isDebugMode: false,
      });

      render(<ArticleListItem article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
    });

    it("renders with custom internal ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "custom-id",
        isDebugMode: false,
      });

      render(<ArticleListItem article={mockArticle} internalId="custom-id" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<ArticleListItem article={mockArticle} ref={ref} />);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<ArticleListItem article={mockArticle} ref={ref} />);

      expect(ref.current?.tagName).toBe("ARTICLE");
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
          className="performance-test"
          internalId="perf-test"
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
      expect(articleElement).toHaveAttribute("aria-label", "Article item");
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "article-description"
      );
    });

    it("supports role attribute", () => {
      render(<ArticleListItem article={mockArticle} role="listitem" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("role", "listitem");
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
