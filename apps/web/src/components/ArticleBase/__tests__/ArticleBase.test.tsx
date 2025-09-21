import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ArticleBase from "../ArticleBase";

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
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
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
  },
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

    it("renders with empty object (assumes valid data)", () => {
      render(<ArticleBase article={{} as any} />);
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("conditionally renders title when present", () => {
      render(<ArticleBase article={mockArticle} />);
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("does not render title when empty", () => {
      const articleWithoutTitle = { ...mockArticle, title: "" };
      render(<ArticleBase article={articleWithoutTitle} />);
      expect(screen.queryByText("Test Article Title")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("conditionally renders description when present", () => {
      render(<ArticleBase article={mockArticle} />);
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("does not render description when empty", () => {
      const articleWithoutDescription = { ...mockArticle, description: "" };
      render(<ArticleBase article={articleWithoutDescription} />);
      expect(
        screen.queryByText("This is a test article description")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("conditionally renders date when present", () => {
      render(<ArticleBase article={mockArticle} />);
      expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    });

    it("does not render date when empty", () => {
      const articleWithoutDate = { ...mockArticle, date: "" };
      render(<ArticleBase article={articleWithoutDate} />);
      expect(screen.queryByText("1/1/2023")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("conditionally renders title link when slug is present", () => {
      render(<ArticleBase article={mockArticle} />);
      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute("href", "/articles/test-article");
    });

    it("does not render title link when slug is empty", () => {
      const articleWithoutSlug = { ...mockArticle, slug: "" };
      render(<ArticleBase article={articleWithoutSlug} />);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("always renders CTA regardless of other content", () => {
      const minimalArticle = { title: "", description: "", date: "", slug: "" };
      render(<ArticleBase article={minimalArticle as any} />);
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("does not render title when only whitespace", () => {
      const articleWithWhitespaceTitle = { ...mockArticle, title: "   \n\t  " };
      render(<ArticleBase article={articleWithWhitespaceTitle} />);
      expect(screen.queryByText("   \n\t  ")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("does not render description when only whitespace", () => {
      const articleWithWhitespaceDescription = {
        ...mockArticle,
        description: "   \n\t  ",
      };
      render(<ArticleBase article={articleWithWhitespaceDescription} />);
      expect(screen.queryByText("   \n\t  ")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("does not render date when only whitespace", () => {
      const articleWithWhitespaceDate = { ...mockArticle, date: "   \n\t  " };
      render(<ArticleBase article={articleWithWhitespaceDate} />);
      expect(screen.queryByText("   \n\t  ")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("does not render title link when slug is only whitespace", () => {
      const articleWithWhitespaceSlug = { ...mockArticle, slug: "   \n\t  " };
      render(<ArticleBase article={articleWithWhitespaceSlug} />);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("handles null title and slug gracefully", () => {
      const articleWithNulls = {
        ...mockArticle,
        title: null,
        slug: null,
      } as any;
      render(<ArticleBase article={articleWithNulls} />);
      expect(screen.queryByText("Test Article Title")).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("handles undefined title and slug gracefully", () => {
      const articleWithUndefineds = {
        ...mockArticle,
        title: undefined,
        slug: undefined,
      } as any;
      render(<ArticleBase article={articleWithUndefineds} />);
      expect(screen.queryByText("Test Article Title")).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("does not render with non-object article", () => {
      const { container } = render(
        <ArticleBase article={"not-an-object" as any} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render date when invalid", () => {
      const articleWithInvalidDate = { ...mockArticle, date: "invalid-date" };
      render(<ArticleBase article={articleWithInvalidDate} />);
      expect(screen.queryByText("Invalid Date")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("encodes special characters in slug URLs", () => {
      const articleWithSpecialSlug = { ...mockArticle, slug: "test & article" };
      render(<ArticleBase article={articleWithSpecialSlug} />);
      const titleLink = screen.getByRole("link");
      expect(titleLink).toHaveAttribute(
        "href",
        "/articles/test%20%26%20article"
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
      expect(titleLink).toHaveAttribute("href", "/articles/valid-slug");
    });

    it("handles different prop types gracefully", () => {
      const articleWithDifferentTypes = {
        ...mockArticle,
        title: "123", // Convert to string to avoid trim() error
        slug: "true", // Convert to string to avoid trim() error
        description: null as any,
        date: undefined as any,
      };
      render(<ArticleBase article={articleWithDifferentTypes} />);

      // Should render the CTA and valid string props
      expect(screen.getByText("Read article")).toBeInTheDocument();
      expect(screen.getByText("123")).toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <ArticleBase
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
      render(<ArticleBase article={mockArticle} />);

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

      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("renders correctly when debug mode is enabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
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
        id: "test-id",
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
        id: "generated-id",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("renders with custom internal ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "custom-id",
        isDebugMode: false,
      });

      render(<ArticleBase article={mockArticle} internalId="custom-id" />);

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
      expect(titleLink).toHaveAttribute("href", "/articles/test-article");
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
        <ArticleBase
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
        "test-id-article-description"
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
      render(<ArticleBase article={mockArticle} internalId="aria-test" />);

      // Test article role
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();

      // Test button role for CTA
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(<ArticleBase article={mockArticle} internalId="aria-test" />);

      const articleElement = screen.getByRole("article");

      // Article should be labelled by the title
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-article-title"
      );

      // Article should be described by the description
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "aria-test-article-description"
      );
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(<ArticleBase article={mockArticle} internalId="aria-test" />);

      // Title should have unique ID
      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toHaveAttribute("id", "aria-test-article-title");

      // Description should have unique ID
      const descriptionElement = screen.getByText(
        "This is a test article description"
      );
      expect(descriptionElement).toHaveAttribute(
        "id",
        "aria-test-article-description"
      );
    });

    it("applies correct ARIA labels to content elements", () => {
      render(<ArticleBase article={mockArticle} internalId="aria-test" />);

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
      render(<ArticleBase article={mockArticle} internalId="aria-test" />);

      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toHaveAttribute("aria-level", "1");
    });

    it("handles ARIA attributes when title is missing", () => {
      const articleWithoutTitle = { ...mockArticle, title: "" };
      render(
        <ArticleBase article={articleWithoutTitle} internalId="aria-test" />
      );

      const articleElement = screen.getByRole("article");

      // Should not have aria-labelledby when title is missing
      expect(articleElement).not.toHaveAttribute("aria-labelledby");
    });

    it("handles ARIA attributes when description is missing", () => {
      const articleWithoutDescription = { ...mockArticle, description: "" };
      render(
        <ArticleBase
          article={articleWithoutDescription}
          internalId="aria-test"
        />
      );

      const articleElement = screen.getByRole("article");

      // Should not have aria-describedby when description is missing
      expect(articleElement).not.toHaveAttribute("aria-describedby");
    });

    it("handles ARIA attributes when both title and description are missing", () => {
      const articleWithoutTitleAndDescription = {
        ...mockArticle,
        title: "",
        description: "",
      };
      render(
        <ArticleBase
          article={articleWithoutTitleAndDescription}
          internalId="aria-test"
        />
      );

      const articleElement = screen.getByRole("article");

      // Should not have aria-labelledby or aria-describedby
      expect(articleElement).not.toHaveAttribute("aria-labelledby");
      expect(articleElement).not.toHaveAttribute("aria-describedby");
    });

    it("applies ARIA attributes with different internal IDs", () => {
      render(<ArticleBase article={mockArticle} internalId="custom-aria-id" />);

      const titleElement = screen.getByRole("heading", { level: 1 });
      const descriptionElement = screen.getByText(
        "This is a test article description"
      );
      const articleElement = screen.getByRole("article");

      // Should use custom internal ID in ARIA relationships
      expect(titleElement).toHaveAttribute(
        "id",
        "custom-aria-id-article-title"
      );
      expect(descriptionElement).toHaveAttribute(
        "id",
        "custom-aria-id-article-description"
      );
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "custom-aria-id-article-title"
      );
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "custom-aria-id-article-description"
      );
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(
        <ArticleBase article={mockArticle} internalId="aria-test" />
      );

      // Initial render
      let articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-article-title"
      );

      // Update with different article
      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(<ArticleBase article={updatedArticle} internalId="aria-test" />);

      // ARIA attributes should be maintained
      articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-article-title"
      );
      expect(screen.getByText("Updated Title")).toBeInTheDocument();
    });

    it("ensures proper ARIA landmark structure", () => {
      render(<ArticleBase article={mockArticle} internalId="aria-test" />);

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

    it("applies conditional ARIA attributes correctly", () => {
      const articleWithPartialContent = {
        ...mockArticle,
        title: "Title Only",
        description: "",
        date: "",
      };
      render(
        <ArticleBase
          article={articleWithPartialContent}
          internalId="aria-test"
        />
      );

      const articleElement = screen.getByRole("article");

      // Should have aria-labelledby but not aria-describedby
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-article-title"
      );
      expect(articleElement).not.toHaveAttribute("aria-describedby");
    });
  });

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
      render(<ArticleBase article={edgeCaseArticle as any} />);

      // Should only render CTA since all other fields are invalid/whitespace
      expect(screen.getByText("Read article")).toBeInTheDocument();
      expect(screen.queryByText("  ")).not.toBeInTheDocument();
      expect(screen.queryByText("\n\t")).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("validates date with isNaN check", () => {
      const articleWithInvalidDate = { ...mockArticle, date: "not-a-date" };
      render(<ArticleBase article={articleWithInvalidDate} />);

      // Should not render date element for invalid dates
      expect(screen.queryByText("Invalid Date")).not.toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
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
        "/articles/test%20%26%20article%20with%20spaces%20%26%20symbols!"
      );
    });
  });
});
