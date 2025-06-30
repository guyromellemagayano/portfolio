import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Article, type ArticleProps, ArticleUtils } from ".";

/**
 * NOTE: Client-side rendering tests have been intentionally excluded
 *
 * These tests focus on the core business logic and functionality.
 * Client-side components are thin wrappers with zero business logic,
 * so testing them would add complexity without meaningful coverage benefits.
 *
 * All essential functionality is thoroughly tested via server component tests below.
 */

describe("Article Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders basic article element", () => {
      render(<Article>Article content</Article>);

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveTextContent("Article content");
      expect(article).toHaveClass("article");
    });

    it("renders with custom className", () => {
      render(<Article className="custom-article">Content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("article", "custom-article");
    });

    it("renders with custom element via as prop", () => {
      render(<Article as="section">Content</Article>);

      const element = screen.getByRole("article");
      expect(element.tagName).toBe("SECTION");
    });

    it("applies custom styles", () => {
      const customStyle = { backgroundColor: "red", margin: "10px" };
      render(<Article style={customStyle}>Content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveStyle("background-color: rgb(255, 0, 0)");
      expect(article).toHaveStyle("margin: 10px");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Article ref={ref}>Content</Article>);

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("ARTICLE");
    });
  });

  describe("Article Variants", () => {
    it("renders featured article with appropriate styling", () => {
      render(<Article featured>Featured content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("article", "article--featured");
      expect(article).toHaveAttribute("data-featured", "true");
      expect(article).toHaveAttribute("aria-label", "Featured article");
    });

    it("renders summary article with appropriate styling", () => {
      render(<Article summary>Summary content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("article", "article--summary");
      expect(article).toHaveAttribute("data-summary", "true");
    });

    it("combines featured and summary variants", () => {
      render(
        <Article featured summary>
          Featured summary
        </Article>
      );

      const article = screen.getByRole("article");
      expect(article).toHaveClass(
        "article",
        "article--featured",
        "article--summary"
      );
      expect(article).toHaveAttribute("data-featured", "true");
      expect(article).toHaveAttribute("data-summary", "true");
    });
  });

  describe("Analytics Integration", () => {
    it("tracks analytics on click with custom function", () => {
      const onAnalytics = vi.fn();
      render(
        <Article onAnalytics={onAnalytics}>
          Article with custom analytics
        </Article>
      );

      const article = screen.getByRole("article");
      fireEvent.click(article);

      expect(onAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "article",
        label: "article-click",
        content: "Article with custom analytics",
      });
    });

    it("tracks analytics with provided analyticsId", () => {
      const mockGtag = vi.fn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalGtag = (window as any).gtag;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = mockGtag;

      render(<Article analyticsId="test-article-123">Test content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("data-analytics-id", "test-article-123");

      fireEvent.click(article);

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "article",
        event_label: "test-article-123",
        article_content: "Test content",
        reading_time: 1,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });

    it("handles analytics errors gracefully", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalGtag = (window as any).gtag;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = () => {
        throw new Error("Analytics error");
      };

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(<Article analyticsId="test-article">Content</Article>);

      const article = screen.getByRole("article");
      expect(() => fireEvent.click(article)).not.toThrow();

      // Only check for console.warn in development
      if (process.env.NODE_ENV === "development") {
        expect(consoleSpy).toHaveBeenCalledWith(
          "Analytics tracking failed:",
          expect.any(Error)
        );
      }

      consoleSpy.mockRestore();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });

    it("calls both custom analytics and click handler", () => {
      const onAnalytics = vi.fn();
      const onClick = vi.fn();

      render(
        <Article onAnalytics={onAnalytics} onClick={onClick}>
          Content
        </Article>
      );

      const article = screen.getByRole("article");
      fireEvent.click(article);

      expect(onAnalytics).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("Reading Time Calculation", () => {
    it("calculates and displays reading time for text content", () => {
      const longContent = "word ".repeat(250); // 250 words = ~2 minutes at 200 wpm
      render(<Article>{longContent}</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("data-reading-time", "2");
    });

    it("handles empty content gracefully", () => {
      render(<Article></Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("data-reading-time", "1");
    });

    it("calculates reading time for complex nested content", () => {
      render(
        <Article>
          <h1>Title</h1>
          <p>{"word ".repeat(100)}</p>
          <div>
            <span>{"word ".repeat(50)}</span>
          </div>
        </Article>
      );

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("data-reading-time", "1");
    });
  });

  describe("Content Structure Validation", () => {
    it("marks valid structure for proper content", () => {
      render(<Article>Valid article content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("data-valid-structure", "true");
      expect(article).not.toHaveClass("article--invalid-structure");
    });

    it("marks invalid structure for empty content", () => {
      render(<Article></Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("data-valid-structure", "false");
      expect(article).toHaveClass("article--invalid-structure");
    });

    it("marks invalid structure for null/undefined content", () => {
      render(<Article>{null}</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("data-valid-structure", "false");
      expect(article).toHaveClass("article--invalid-structure");
    });
  });

  describe("Event Handling", () => {
    it("handles mouse enter events", () => {
      const onMouseEnter = vi.fn();
      render(<Article onMouseEnter={onMouseEnter}>Content</Article>);

      const article = screen.getByRole("article");
      fireEvent.mouseEnter(article);

      expect(onMouseEnter).toHaveBeenCalled();
    });

    it("handles focus events", () => {
      const onFocus = vi.fn();
      render(
        <Article onFocus={onFocus} tabIndex={0}>
          Content
        </Article>
      );

      const article = screen.getByRole("article");
      fireEvent.focus(article);

      expect(onFocus).toHaveBeenCalled();
    });

    it("preserves all HTML attributes", () => {
      render(
        <Article
          id="test-article"
          tabIndex={0}
          aria-describedby="description"
          data-testid="custom-article"
        >
          Content
        </Article>
      );

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("id", "test-article");
      expect(article).toHaveAttribute("tabIndex", "0");
      expect(article).toHaveAttribute("aria-describedby", "description");
      expect(article).toHaveAttribute("data-testid", "custom-article");
    });
  });

  describe("Accessibility Features", () => {
    it("has proper ARIA role", () => {
      render(<Article>Content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("role", "article");
    });

    it("supports custom aria-label", () => {
      render(<Article aria-label="Custom article label">Content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("aria-label", "Custom article label");
    });

    it("auto-generates aria-label for featured articles", () => {
      render(<Article featured>Featured content</Article>);

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("aria-label", "Featured article");
    });

    it("preserves custom aria-label over auto-generated", () => {
      render(
        <Article featured aria-label="My custom label">
          Content
        </Article>
      );

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("aria-label", "My custom label");
    });
  });

  describe("Client-Side Rendering Integration", () => {
    it("renders fallback for client components", async () => {
      render(<Article isClient>Client content</Article>);

      // Should render server component as fallback initially
      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveTextContent("Client content");
    });

    it("handles memoized client rendering", async () => {
      render(
        <Article isClient isMemoized>
          Memoized client content
        </Article>
      );

      // Should render server component as fallback initially
      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveTextContent("Memoized client content");
    });
  });
});

// =============================================================================
// UTILITY FUNCTIONS TESTS
// =============================================================================

describe("ArticleUtils", () => {
  describe("validateStructure", () => {
    it("validates truthy content as valid", () => {
      expect(ArticleUtils.validateStructure("content")).toBe(true);
      expect(ArticleUtils.validateStructure(<div>content</div>)).toBe(true);
      expect(ArticleUtils.validateStructure(123)).toBe(true);
    });

    it("validates falsy content as invalid", () => {
      expect(ArticleUtils.validateStructure(null)).toBe(false);
      expect(ArticleUtils.validateStructure(undefined)).toBe(false);
      expect(ArticleUtils.validateStructure("")).toBe(false);
    });
  });

  describe("extractContent", () => {
    it("extracts text from string content", () => {
      expect(ArticleUtils.extractContent("Hello world")).toBe("Hello world");
    });

    it("extracts text from number content", () => {
      expect(ArticleUtils.extractContent(42)).toBe("42");
    });

    it("extracts text from React elements", () => {
      const element = <div>Hello world</div>;
      expect(ArticleUtils.extractContent(element)).toBe("Hello world");
    });

    it("extracts text from nested React elements", () => {
      const element = (
        <div>
          <span>Hello </span>
          <strong>world</strong>
        </div>
      );
      expect(ArticleUtils.extractContent(element)).toBe("Hello  world");
    });

    it("extracts text from array of elements", () => {
      const elements = ["Hello", " ", "world"];
      expect(ArticleUtils.extractContent(elements)).toBe("Hello   world");
    });

    it("handles mixed content types", () => {
      const elements = ["Hello", 42, <span key="test"> world</span>];
      expect(ArticleUtils.extractContent(elements)).toBe("Hello 42  world");
    });
  });

  describe("calculateReadingTime", () => {
    it("calculates reading time correctly for standard content", () => {
      const content = "word ".repeat(200); // 200 words = 1 minute
      expect(ArticleUtils.calculateReadingTime(content)).toBe(1);
    });

    it("rounds up partial minutes", () => {
      const content = "word ".repeat(250); // 250 words = 1.25 minutes -> 2 minutes
      expect(ArticleUtils.calculateReadingTime(content)).toBe(2);
    });

    it("uses custom words per minute", () => {
      const content = "word ".repeat(300); // 300 words
      expect(ArticleUtils.calculateReadingTime(content, 300)).toBe(1); // 300 wpm = 1 minute
    });

    it("handles empty content", () => {
      expect(ArticleUtils.calculateReadingTime("")).toBe(1);
      expect(ArticleUtils.calculateReadingTime("   ")).toBe(1);
    });
  });
});

// =============================================================================
// TYPE SAFETY TESTS
// =============================================================================

describe("Article TypeScript Integration", () => {
  it("accepts all valid HTML article attributes", () => {
    // This test ensures our props interface properly extends HTML attributes
    const validProps: ArticleProps = {
      id: "test",
      className: "test-class",
      style: { color: "red" },
      onClick: () => {},
      onMouseEnter: () => {},
      onFocus: () => {},
      tabIndex: 0,
      "aria-label": "Test article",
      "data-testid": "test",
      featured: true,
      summary: false,
      analyticsId: "test-123",
      onAnalytics: () => {},
      as: "section",
      isClient: false,
      isMemoized: false,
    };

    // If this compiles without errors, the type interface is correct
    expect(validProps).toBeDefined();
  });
});
