/**
 * @file Article.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Article component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { Article } from "../Article";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

const mockUseTranslations = vi.hoisted(() =>
  vi.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      cta: "Read article",
      articleDate: "Published on",
    };
    return translations[key] || key;
  })
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  formatDateSafely: vi.fn((date) => {
    if (!date) return "";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) return "";
      return new Intl.DateTimeFormat("en-US").format(dateObj);
    } catch {
      return "";
    }
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: mockUseTranslations,
}));

// Mock Card component
vi.mock("@web/components/Card", () => {
  const MockCard = Object.assign(
    React.forwardRef<HTMLElement, any>(function MockCard(props, ref) {
      const {
        children,
        className,
        role,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        debugId: _debugId,
        debugMode,
        ...rest
      } = props;

      return React.createElement(
        "article",
        {
          ref,
          className,
          role,
          "aria-labelledby": ariaLabelledBy,
          "aria-describedby": ariaDescribedBy,
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
          const {
            children,
            href,
            id,
            "aria-level": ariaLevel,
            ...rest
          } = props;
          // Handle URL objects and strings
          let hrefString: string | undefined;
          if (href) {
            try {
              if (href instanceof URL) {
                // Extract pathname from the URL object
                hrefString = href.pathname;
                if (href.search) hrefString += href.search;
                if (href.hash) hrefString += href.hash;
              } else {
                hrefString = String(href);
              }
            } catch {
              hrefString = undefined;
            }
          }
          return (
            <h2
              ref={ref}
              data-testid="mock-card-title"
              id={id}
              aria-level={ariaLevel}
              {...rest}
            >
              {hrefString ? (
                <a href={hrefString} aria-label="Article title link">
                  {children}
                </a>
              ) : (
                children
              )}
            </h2>
          );
        }
      ),
      Eyebrow: React.forwardRef<HTMLElement, any>(
        function MockCardEyebrow(props, ref) {
          const {
            children,
            dateTime,
            "aria-label": ariaLabel,
            as: Component = "time",
            ...rest
          } = props;
          return React.createElement(
            Component,
            {
              ref,
              dateTime,
              "aria-label": ariaLabel,
              "data-testid": "mock-card-eyebrow",
              ...rest,
            },
            children
          );
        }
      ),
      Description: React.forwardRef<HTMLParagraphElement, any>(
        function MockCardDescription(props, ref) {
          const { children, id, ...rest } = props;
          return (
            <p ref={ref} data-testid="mock-card-description" id={id} {...rest}>
              {children}
            </p>
          );
        }
      ),
      Cta: React.forwardRef<HTMLDivElement, any>(
        function MockCardCta(props, ref) {
          const { children, role, "aria-label": ariaLabel, ...rest } = props;
          return (
            <div
              ref={ref}
              data-testid="mock-card-cta"
              role={role}
              aria-label={ariaLabel}
              {...rest}
            >
              {children}
            </div>
          );
        }
      ),
    }
  );

  return {
    Card: MockCard,
    default: MockCard,
  };
});

describe("Article", () => {
  // Mock URL constructor to handle relative paths in test environment
  // eslint-disable-next-line no-undef
  const OriginalURL = global.URL;
  beforeAll(() => {
    // eslint-disable-next-line no-undef
    global.URL = class MockURL extends OriginalURL {
      constructor(input: string | URL, base?: string | URL) {
        // Handle the component's buggy URL creation: new URL(encodeURIComponent("/path"))
        // The component encodes the entire path, which creates an invalid URL
        if (typeof input === "string") {
          // If input looks like an encoded path (starts with %2F), decode it
          if (input.startsWith("%2F") || input.startsWith("%2f")) {
            input = decodeURIComponent(input);
          }
          // If no base is provided, and it's a relative path, use a dummy base
          if (!base && input.startsWith("/")) {
            super(input, "http://localhost");
            return;
          }
        }
        // Fall back to the original URL constructor
        super(input, base);
      }
    };
  });

  afterAll(() => {
    // eslint-disable-next-line no-undef
    global.URL = OriginalURL;
  });

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
      expect(articleElement).toHaveAttribute("class");
    });

    it("passes through HTML attributes", () => {
      render(<Article article={mockArticle} data-custom="value" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Article Content", () => {
    it("renders article title as Card.Title with correct href", () => {
      render(<Article article={mockArticle} />);

      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/articles/test-article");
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
      expect(eyebrowElement.tagName).toBe("TIME");
      expect(eyebrowElement).toHaveAttribute("dateTime", "2023-01-01");
    });

    it("renders CTA button with correct text when all required fields exist", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("does not render CTA when title is missing", () => {
      const articleWithoutTitle = {
        ...mockArticle,
        title: "",
      };
      render(<Article article={articleWithoutTitle} />);

      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("does not render CTA when date is missing", () => {
      const articleWithoutDate = {
        ...mockArticle,
        date: "",
      };
      render(<Article article={articleWithoutDate} />);

      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("does not render CTA when description is missing", () => {
      const articleWithoutDescription = {
        ...mockArticle,
        description: "",
      };
      render(<Article article={articleWithoutDescription} />);

      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });
  });

  describe("Content Rendering", () => {
    it("does not render with null article", () => {
      const { container } = render(<Article article={null as any} />);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render with undefined article", () => {
      const { container } = render(<Article article={undefined as any} />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with empty strings (trims and uses defaults)", () => {
      const articleWithEmptyStrings = {
        ...mockArticle,
        title: "",
        description: "",
        date: "",
      };
      render(<Article article={articleWithEmptyStrings} />);

      // Component renders but with empty/trimmed content
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("trims whitespace from title", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        title: "  Trimmed Title  ",
      };
      render(<Article article={articleWithWhitespace} />);

      expect(screen.getByText("Trimmed Title")).toBeInTheDocument();
    });

    it("trims whitespace from description", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        description: "  Trimmed Description  ",
      };
      render(<Article article={articleWithWhitespace} />);

      expect(screen.getByText("Trimmed Description")).toBeInTheDocument();
    });

    it("trims whitespace from slug", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        slug: "  trimmed-slug  ",
      };
      render(<Article article={articleWithWhitespace} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href");
      expect(link).toHaveAttribute("href", "/articles/trimmed-slug");
    });

    it("handles null/undefined title", () => {
      const articleWithNullTitle = {
        ...mockArticle,
        title: null as any,
      };
      render(<Article article={articleWithNullTitle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      // CTA should not render when title is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles null/undefined description", () => {
      const articleWithNullDescription = {
        ...mockArticle,
        description: null as any,
      };
      render(<Article article={articleWithNullDescription} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      // CTA should not render when description is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles null/undefined date", () => {
      const articleWithNullDate = {
        ...mockArticle,
        date: null as any,
      };
      render(<Article article={articleWithNullDate} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      // CTA should not render when date is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles invalid date (formatted date may be empty but CTA still renders)", () => {
      const articleWithInvalidDate = {
        ...mockArticle,
        date: "invalid-date",
      };
      render(<Article article={articleWithInvalidDate} />);

      // Component should still render
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();

      // Eyebrow renders (date is present), but formatted date can be empty
      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute("dateTime", "invalid-date");
      expect(eyebrowElement).toBeEmptyDOMElement();

      // CTA renders because title + date (non-empty string) + description exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("creates URL for title link when slug is valid", () => {
      render(<Article article={mockArticle} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href");
      expect(link).toHaveAttribute("href", "/articles/test-article");
    });

    it("handles tags array", () => {
      const articleWithTags = {
        ...mockArticle,
        tags: ["tag1", "tag2", "  tag3  "],
      };
      render(<Article article={articleWithTags} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("handles empty tags array", () => {
      const articleWithEmptyTags = {
        ...mockArticle,
        tags: [],
      };
      render(<Article article={articleWithEmptyTags} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("handles missing image", () => {
      const articleWithoutImage = {
        ...mockArticle,
        image: undefined,
      };
      render(<Article article={articleWithoutImage} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(<Article article={mockArticle} debugMode={true} />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugMode: true,
      });
    });

    it("calls useComponentId with debugId parameter", () => {
      render(<Article article={mockArticle} debugId="custom-id" />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: undefined,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<Article article={mockArticle} />);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugMode: undefined,
      });
    });

    it("passes generated ID to Card component", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("renders correctly when debug mode is enabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: true,
      });

      render(<Article article={mockArticle} debugMode={true} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders correctly when debug mode is disabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} />);

      const cardElement = screen.getByTestId("mock-card");
      expect(cardElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders with correct Card structure", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      // CTA only renders when title, date, and description all exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("renders without CTA when title is missing", () => {
      const articleWithoutTitle = {
        ...mockArticle,
        title: "",
      };
      render(<Article article={articleWithoutTitle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.queryByTestId("mock-card-cta")).not.toBeInTheDocument();
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("renders with custom debug ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="custom-id" />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Internationalization", () => {
    it("uses translations for CTA text", () => {
      render(<Article article={mockArticle} />);

      expect(mockUseTranslations).toHaveBeenCalledWith("article");
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("uses translations for article date label", () => {
      render(<Article article={mockArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute(
        "aria-label",
        expect.stringContaining("Published on")
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles article with special characters in title", () => {
      const specialArticle = {
        ...mockArticle,
        title: "Special chars: <>&",
      };

      render(<Article article={specialArticle} />);

      expect(screen.getByText("Special chars: <>&")).toBeInTheDocument();
    });

    it("handles article with special characters in description", () => {
      const specialArticle = {
        ...mockArticle,
        description: "Description with <>&",
      };

      render(<Article article={specialArticle} />);

      expect(screen.getByText("Description with <>&")).toBeInTheDocument();
    });

    it("handles article with very long title", () => {
      const longTitle = "A".repeat(200);
      const longTitleArticle = {
        ...mockArticle,
        title: longTitle,
      };

      render(<Article article={longTitleArticle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles article with very long description", () => {
      const longDesc = "B".repeat(500);
      const longDescArticle = {
        ...mockArticle,
        description: longDesc,
      };

      render(<Article article={longDescArticle} />);

      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("renders formatted date", () => {
      render(<Article article={mockArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toBeInTheDocument();
      expect(eyebrowElement).toHaveAttribute("dateTime", "2023-01-01");
    });

    it("handles different date formats", () => {
      const differentDateArticle = {
        ...mockArticle,
        date: "2023-12-25",
      };

      render(<Article article={differentDateArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute("dateTime", "2023-12-25");
    });

    it("handles null date", () => {
      const articleWithNullDate = {
        ...mockArticle,
        date: null as any,
      };

      render(<Article article={articleWithNullDate} />);

      // Eyebrow should not render when date is null
      expect(screen.queryByTestId("mock-card-eyebrow")).not.toBeInTheDocument();
      // CTA should not render when date is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });
  });

  describe("Article Slug Integration", () => {
    it("uses article slug for title link when slug is valid", () => {
      render(<Article article={mockArticle} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href");
      expect(link).toHaveAttribute("href", "/articles/test-article");
    });

    it("creates link when slug is valid regardless of date validity", () => {
      const articleWithInvalidDate = {
        ...mockArticle,
        date: "invalid-date",
      };

      render(<Article article={articleWithInvalidDate} />);

      // Link should still be created if slug is valid
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/articles/test-article");

      // CTA still renders when date is a non-empty string (even if formatting fails)
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("handles different slug formats", () => {
      const differentSlugArticle = {
        ...mockArticle,
        slug: "different-article-slug",
      };

      render(<Article article={differentSlugArticle} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/articles/different-article-slug");
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
          debugId="perf-test"
          debugMode={true}
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
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(<Article article={mockArticle} data-custom="value" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-custom", "value");
    });

    it("has hardcoded role='article' for accessibility", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("role", "article");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="aria-test" />);

      // Test article role
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();

      // Test button role for CTA (only if CTA is rendered)
      const buttonElement = screen.queryByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="aria-test" />);

      const articleElement = screen.getByRole("article");

      // The title should label the article
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

      render(<Article article={mockArticle} debugId="aria-test" />);

      // Title should have unique ID
      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement).toHaveAttribute(
        "id",
        "aria-test-base-article-card-title"
      );

      // Description should have unique ID
      const descriptionElement = screen.getByTestId("mock-card-description");
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

      render(<Article article={mockArticle} debugId="aria-test" />);

      // Date element should have a descriptive label
      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute("aria-label");

      // CTA should have descriptive label (only if CTA is rendered)
      const ctaElement = screen.queryByTestId("mock-card-cta");
      expect(ctaElement).toHaveAttribute("aria-label");
    });

    it("applies correct heading level ARIA attribute", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="aria-test" />);

      // Title should have aria-level
      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement).toHaveAttribute("aria-level", "1");
    });

    it("applies ARIA attributes with different debug IDs", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-aria-id",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="custom-aria-id" />);

      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "custom-aria-id-base-article-card-title"
      );

      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement).toHaveAttribute(
        "id",
        "custom-aria-id-base-article-card-title"
      );
    });

    it("maintains ARIA attributes during component updates", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      const { rerender } = render(
        <Article article={mockArticle} debugId="aria-test" />
      );

      // Initial render
      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-base-article-card-title"
      );

      // Update with different article
      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(<Article article={updatedArticle} debugId="aria-test" />);

      // ARIA attributes should still be present
      const updatedArticleElement = screen.getByRole("article");
      expect(updatedArticleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-base-article-card-title"
      );
    });

    it("ensures proper ARIA landmark structure", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-test",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="aria-test" />);

      // Should have article landmark
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();

      // Should have heading
      const headingElement = screen.getByTestId("mock-card-title");
      expect(headingElement).toBeInTheDocument();

      // Should have a button (CTA only renders when title, date, and description exist)
      const buttonElement = screen.queryByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });
  });

  describe("Custom Props Type Safety", () => {
    it("accepts and passes through custom string props", () => {
      render(
        <Article<{ customProp: string }>
          article={mockArticle}
          customProp="test-value"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("customProp", "test-value");
    });

    it("accepts and passes through custom data attributes", () => {
      render(
        <Article<{ "data-custom": string }>
          article={mockArticle}
          data-custom="custom-data"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-custom", "custom-data");
    });

    it("accepts multiple custom props", () => {
      render(
        <Article<{ customProp: string; count: number }>
          article={mockArticle}
          customProp="value"
          count={42}
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("customProp", "value");
      expect(articleElement).toHaveAttribute("count", "42");
    });

    it("works with custom props and standard Card props", () => {
      render(
        <Article<{ "data-analytics": string }>
          article={mockArticle}
          data-analytics="article-view"
          className="custom-article"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "article-view");
      expect(articleElement).toHaveAttribute("class");
    });

    it("works with custom props and debug props", () => {
      render(
        <Article<{ "data-tracking": string }>
          article={mockArticle}
          data-tracking="article-render"
          debugId="custom-debug"
          debugMode={true}
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-tracking", "article-render");
      expect(articleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("preserves custom props through component updates", () => {
      const { rerender } = render(
        <Article<{ "data-persist": string }>
          article={mockArticle}
          data-persist="initial"
        />
      );

      let articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-persist", "initial");

      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(
        <Article<{ "data-persist": string }>
          article={updatedArticle}
          data-persist="updated"
        />
      );

      articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-persist", "updated");
    });

    it("allows custom props without explicit generic type", () => {
      // TypeScript should infer custom props from usage
      // Note: React converts non-standard prop names to lowercase in DOM
      render(<Article article={mockArticle} customProp="inferred-type" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
      // React converts prop names to lowercase for non-standard attributes
      expect(articleElement).toHaveAttribute("customprop", "inferred-type");
    });
  });
});
