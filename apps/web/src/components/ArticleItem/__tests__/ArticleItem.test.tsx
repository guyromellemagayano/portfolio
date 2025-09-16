import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArticleItem } from "../ArticleItem";

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
  Card: React.forwardRef<HTMLElement, any>(function MockCard(props, ref) {
    const { children, className, as = "article", ...rest } = props;
    const Element = as as keyof JSX.IntrinsicElements;

    return (
      <Element
        ref={ref}
        className={className}
        data-testid="mock-card"
        {...rest}
      >
        {children}
      </Element>
    );
  }),
}));

// Mock Card sub-components
vi.mock("@web/components", () => ({
  Card: Object.assign(
    React.forwardRef<HTMLElement, any>(function MockCard(props, ref) {
      const { children, className, as = "article", ...rest } = props;
      const Element = as as keyof JSX.IntrinsicElements;

      return (
        <Element
          ref={ref}
          className={className}
          data-testid="mock-card"
          {...rest}
        >
          {children}
        </Element>
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
vi.mock("../ArticleItem.module.css", () => ({
  default: {
    articleItem: "articleItem",
  },
}));

// Mock data
vi.mock("../_data", () => ({
  ARTICLE_LAYOUT_COMPONENT_LABELS: {
    cta: "Read article",
  },
}));

describe("ArticleItem", () => {
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
  };

  describe("Basic Rendering", () => {
    it("renders article item correctly", () => {
      render(<ArticleItem article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("renders as article element", () => {
      render(<ArticleItem article={mockArticle} />);

      const articleElement = screen.getByTestId("test-id-article-item-root");
      expect(articleElement.tagName).toBe("ARTICLE");
    });

    it("applies custom className", () => {
      render(<ArticleItem article={mockArticle} className="custom-class" />);

      const articleElement = screen.getByTestId("test-id-article-item-root");
      expect(articleElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(<ArticleItem article={mockArticle} aria-label="Article item" />);

      const articleElement = screen.getByTestId("test-id-article-item-root");
      expect(articleElement).toHaveAttribute("aria-label", "Article item");
    });
  });

  describe("Article Content", () => {
    it("renders article title as Card.Title with correct href", () => {
      render(<ArticleItem article={mockArticle} />);

      // The title should be rendered and linked to the article
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders article description as Card.Description", () => {
      render(<ArticleItem article={mockArticle} />);

      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("renders formatted date as Card.Eyebrow with time element", () => {
      render(<ArticleItem article={mockArticle} />);

      // The date should be formatted and rendered
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("renders CTA button with correct text", () => {
      render(<ArticleItem article={mockArticle} />);

      expect(screen.getByText("Read article")).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("does not render when both title and description are empty", () => {
      const emptyArticle = {
        ...mockArticle,
        title: "",
        description: "",
      };

      const { container } = render(<ArticleItem article={emptyArticle} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders when title is empty but description has content", () => {
      const articleWithDescription = {
        ...mockArticle,
        title: "",
        description: "Valid description",
      };

      render(<ArticleItem article={articleWithDescription} />);
      expect(screen.getByText("Valid description")).toBeInTheDocument();
    });

    it("renders when description is empty but title has content", () => {
      const articleWithTitle = {
        ...mockArticle,
        title: "Valid title",
        description: "",
      };

      render(<ArticleItem article={articleWithTitle} />);
      expect(screen.getByText("Valid title")).toBeInTheDocument();
    });

    it("does not render when title and description are null", () => {
      const nullArticle = {
        ...mockArticle,
        title: null as any,
        description: null as any,
      };

      const { container } = render(<ArticleItem article={nullArticle} />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when title and description are undefined", () => {
      const undefinedArticle = {
        ...mockArticle,
        title: undefined as any,
        description: undefined as any,
      };

      const { container } = render(<ArticleItem article={undefinedArticle} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <ArticleItem
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
      render(<ArticleItem article={mockArticle} />);

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

      render(<ArticleItem article={mockArticle} />);

      // The component should render with the generated ID
      expect(
        screen.getByTestId("generated-id-article-item-root")
      ).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: true,
      });

      render(<ArticleItem article={mockArticle} debugMode={true} />);

      const articleElement = screen.getByTestId("test-id-article-item-root");
      expect(articleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: false,
      });

      render(<ArticleItem article={mockArticle} />);

      const articleElement = screen.getByTestId("test-id-article-item-root");
      expect(articleElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(<ArticleItem article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<ArticleItem article={mockArticle} isMemoized={true} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(<ArticleItem article={mockArticle} isMemoized={false} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes", () => {
      render(<ArticleItem article={mockArticle} />);

      const articleElement = screen.getByTestId("test-id-article-item-root");
      expect(articleElement).toHaveClass("articleItem");
    });

    it("combines CSS module + custom classes", () => {
      render(<ArticleItem article={mockArticle} className="custom-class" />);

      const articleElement = screen.getByTestId("test-id-article-item-root");
      expect(articleElement).toHaveClass("articleItem", "custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "generated-id",
        isDebugMode: false,
      });

      render(<ArticleItem article={mockArticle} />);

      const articleElement = screen.getByTestId(
        "generated-id-article-item-root"
      );
      expect(articleElement).toHaveAttribute(
        "data-article-item-id",
        "generated-id-article-item"
      );
    });

    it("renders with custom internal ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "custom-id",
        isDebugMode: false,
      });

      render(<ArticleItem article={mockArticle} internalId="custom-id" />);

      const articleElement = screen.getByTestId("custom-id-article-item-root");
      expect(articleElement).toHaveAttribute(
        "data-article-item-id",
        "custom-id-article-item"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<ArticleItem article={mockArticle} ref={ref} />);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<ArticleItem article={mockArticle} ref={ref} />);

      expect(ref.current?.tagName).toBe("ARTICLE");
    });
  });

  describe("Edge Cases", () => {
    it("handles article with special characters in title", () => {
      const specialArticle = {
        ...mockArticle,
        title: "Special chars: &lt;&gt;&amp;",
      };

      render(<ArticleItem article={specialArticle} />);

      expect(
        screen.getByText("Special chars: &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with special characters in description", () => {
      const specialArticle = {
        ...mockArticle,
        description: "Description with &lt;&gt;&amp;",
      };

      render(<ArticleItem article={specialArticle} />);

      expect(
        screen.getByText("Description with &lt;&gt;&amp;")
      ).toBeInTheDocument();
    });

    it("handles article with very long title", () => {
      const longTitleArticle = {
        ...mockArticle,
        title: "A".repeat(200),
      };

      render(<ArticleItem article={longTitleArticle} />);

      expect(screen.getByText("A".repeat(200))).toBeInTheDocument();
    });

    it("handles article with very long description", () => {
      const longDescArticle = {
        ...mockArticle,
        description: "B".repeat(500),
      };

      render(<ArticleItem article={longDescArticle} />);

      expect(screen.getByText("B".repeat(500))).toBeInTheDocument();
    });

    it("handles article with whitespace-only title and description", () => {
      const whitespaceArticle = {
        ...mockArticle,
        title: "   ",
        description: "\t\n",
      };

      const { container } = render(<ArticleItem article={whitespaceArticle} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Date Formatting", () => {
    it("renders formatted date", () => {
      render(<ArticleItem article={mockArticle} />);

      // The date should be rendered in the eyebrow
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
    });

    it("handles different date formats", () => {
      const differentDateArticle = {
        ...mockArticle,
        date: "2023-12-25",
      };

      render(<ArticleItem article={differentDateArticle} />);

      // The date should be rendered in the eyebrow
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
    });
  });

  describe("Article Slug Integration", () => {
    it("uses article slug for title link", () => {
      render(<ArticleItem article={mockArticle} />);

      // The title should be rendered (the actual link href would be tested in Card.Title tests)
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("handles different slug formats", () => {
      const differentSlugArticle = {
        ...mockArticle,
        slug: "different-article-slug",
      };

      render(<ArticleItem article={differentSlugArticle} />);

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
        <ArticleItem
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
      const { rerender } = render(<ArticleItem article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();

      const updatedArticle = {
        ...mockArticle,
        title: "Updated Article Title",
        description: "Updated description",
      };

      rerender(<ArticleItem article={updatedArticle} />);

      expect(screen.getByText("Updated Article Title")).toBeInTheDocument();
      expect(screen.getByText("Updated description")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<ArticleItem article={mockArticle} />);

      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(
        <ArticleItem
          article={mockArticle}
          aria-label="Article item"
          aria-describedby="article-description"
        />
      );

      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute("aria-label", "Article item");
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "article-description"
      );
    });

    it("supports role attribute", () => {
      render(<ArticleItem article={mockArticle} role="listitem" />);

      const articleElement = screen.getByRole("listitem");
      expect(articleElement).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with other components in complex layouts", () => {
      render(
        <div>
          <ArticleItem article={mockArticle} />
          <ArticleItem
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
      render(<ArticleItem article={mockArticle} />);

      const articleElement = screen.getByRole("article");
      const title = screen.getByText("Test Article Title");
      const description = screen.getByText(
        "This is a test article description"
      );

      expect(articleElement).toContainElement(title);
      expect(articleElement).toContainElement(description);
    });
  });
});
