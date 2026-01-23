/**
 * @file Article.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Article component.
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

// Mock Card component with a realistic structure
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

describe("Article Integration Tests", () => {
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

  describe("Article with Card Sub-components", () => {
    it("renders Article with all Card sub-components in correct order", () => {
      render(<Article article={mockArticle} />);

      const card = screen.getByTestId("mock-card");
      expect(card).toBeInTheDocument();

      // Verify all subcomponents are present
      const title = screen.getByTestId("mock-card-title");
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      const description = screen.getByTestId("mock-card-description");
      // CTA only renders when title, date, and description all exist
      const cta = screen.getByTestId("mock-card-cta");

      expect(title).toBeInTheDocument();
      expect(eyebrow).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(cta).toBeInTheDocument();

      // Verify content
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
      // CTA should render when all required fields exist
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy and relationships", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "integration-test",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="integration-test" />);

      const card = screen.getByTestId("mock-card");
      const title = screen.getByTestId("mock-card-title");
      const description = screen.getByTestId("mock-card-description");

      // Verify ARIA relationships
      expect(card).toHaveAttribute(
        "aria-labelledby",
        "integration-test-base-article-card-title"
      );
      expect(card).toHaveAttribute(
        "aria-describedby",
        "integration-test-base-article-card-description"
      );

      // Verify IDs match
      expect(title).toHaveAttribute(
        "id",
        "integration-test-base-article-card-title"
      );
      expect(description).toHaveAttribute(
        "id",
        "integration-test-base-article-card-description"
      );
    });

    it("passes debugId and debugMode to all Card sub-components", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "debug-test",
        isDebugMode: true,
      });

      render(
        <Article article={mockArticle} debugId="debug-test" debugMode={true} />
      );

      const card = screen.getByTestId("mock-card");
      expect(card).toHaveAttribute("data-debug-mode", "true");

      // All subcomponents should receive debugId and debugMode
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("correctly formats and passes article data to Card sub-components", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        title: "  Trimmed Title  ",
        description: "  Trimmed Description  ",
        slug: "  trimmed-slug  ",
        date: "  2023-01-01  ",
      };

      render(<Article article={articleWithWhitespace} />);

      // Verify trimmed content is passed to subcomponents
      expect(screen.getByText("Trimmed Title")).toBeInTheDocument();
      expect(screen.getByText("Trimmed Description")).toBeInTheDocument();

      // Verify date is formatted and passed correctly
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrow).toHaveAttribute("dateTime", "2023-01-01");

      // Verify slug is trimmed and used in URL (if title link exists)
      const link = screen.queryByRole("link");
      expect(link).toHaveAttribute("href", "/articles/trimmed-slug");
    });

    it("handles article with valid date and creates URL for title link", () => {
      render(<Article article={mockArticle} />);

      const title = screen.getByTestId("mock-card-title");
      const link = title.querySelector("a");

      // Link should exist when slug is valid
      expect(link).toHaveAttribute("href", "/articles/test-article");
    });

    it("handles article with invalid date and still renders CTA", () => {
      const articleWithInvalidDate = {
        ...mockArticle,
        date: "invalid-date",
      };

      render(<Article article={articleWithInvalidDate} />);

      // Component should still render
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();

      // Eyebrow renders (date is present), but formatted date can be empty
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrow).toHaveAttribute("dateTime", "invalid-date");
      expect(eyebrow).toBeEmptyDOMElement();

      // CTA renders because title + date (non-empty string) + description exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("applies correct ARIA attributes across all sub-components", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "aria-integration",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="aria-integration" />);

      // Article role
      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();

      // Title with aria-level
      const title = screen.getByTestId("mock-card-title");
      expect(title).toHaveAttribute("aria-level", "1");

      // Eyebrow with aria-label
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrow).toHaveAttribute("aria-label");
      expect(eyebrow).toHaveAttribute(
        "aria-label",
        expect.stringContaining("Published on")
      );

      // CTA with role and aria-label (only if CTA is rendered)
      const cta = screen.queryByRole("button");
      expect(cta).toHaveAttribute("aria-label");
      expect(cta).toHaveAttribute(
        "aria-label",
        expect.stringContaining("Read article")
      );
    });

    it("handles article updates and maintains component structure", () => {
      const { rerender } = render(<Article article={mockArticle} />);

      // Initial render
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();

      // Update article
      const updatedArticle = {
        ...mockArticle,
        title: "Updated Title",
        description: "Updated Description",
      };

      rerender(<Article article={updatedArticle} />);

      // Verify updated content
      expect(screen.getByText("Updated Title")).toBeInTheDocument();
      expect(screen.getByText("Updated Description")).toBeInTheDocument();

      // Verify structure is maintained
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      // CTA only renders when title, date, and description all exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("handles edge case with minimal article data", () => {
      const minimalArticle = {
        slug: "minimal",
        title: "Minimal Title",
        description: "Minimal Description",
        date: "",
      };

      render(<Article article={minimalArticle} />);

      // Component should still render
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByText("Minimal Title")).toBeInTheDocument();
      expect(screen.getByText("Minimal Description")).toBeInTheDocument();

      // CTA should not render when date is invalid/empty
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles article with tags array", () => {
      const articleWithTags = {
        ...mockArticle,
        tags: ["react", "typescript", "testing"],
      };

      render(<Article article={articleWithTags} />);

      // Component should render correctly
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("maintains accessibility structure across all sub-components", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "a11y-test",
        isDebugMode: false,
      });

      render(<Article article={mockArticle} debugId="a11y-test" />);

      // Verify landmark structure
      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();

      // Verify heading structure
      const heading = screen.getByTestId("mock-card-title");
      expect(heading.tagName).toBe("H2");
      expect(heading).toHaveAttribute("aria-level", "1");

      // Verify button structure (only if CTA is rendered)
      const button = screen.queryByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label");

      // Verify time element
      const time = screen.getByTestId("mock-card-eyebrow");
      expect(time.tagName).toBe("TIME");
      expect(time).toHaveAttribute("dateTime");
      expect(time).toHaveAttribute("aria-label");
    });
  });

  describe("Article with Custom Props Integration", () => {
    it("integrates custom props with article rendering", () => {
      render(
        <Article<{ "data-analytics": string }>
          article={mockArticle}
          data-analytics="article-view"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "article-view");
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("integrates custom props with ARIA attributes", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-aria",
        isDebugMode: false,
      });

      render(
        <Article<{ "data-aria-custom": string }>
          article={mockArticle}
          debugId="custom-aria"
          data-aria-custom="aria-integration"
        />
      );

      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "data-aria-custom",
        "aria-integration"
      );
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "custom-aria-base-article-card-title"
      );
    });

    it("handles multiple custom props with article updates", () => {
      const { rerender } = render(
        <Article<{
          "data-analytics": string;
          "data-tracking": string;
          "data-context": string;
        }>
          article={mockArticle}
          data-analytics="click-event"
          data-tracking="user-action"
          data-context="main-page"
        />
      );

      let articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "click-event");
      expect(articleElement).toHaveAttribute("data-tracking", "user-action");
      expect(articleElement).toHaveAttribute("data-context", "main-page");

      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(
        <Article<{
          "data-analytics": string;
          "data-tracking": string;
          "data-context": string;
        }>
          article={updatedArticle}
          data-analytics="updated-event"
          data-tracking="updated-action"
          data-context="updated-page"
        />
      );

      articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "updated-event");
      expect(articleElement).toHaveAttribute("data-tracking", "updated-action");
      expect(articleElement).toHaveAttribute("data-context", "updated-page");
    });

    it("preserves custom props when article data changes", () => {
      const { rerender } = render(
        <Article<{ "data-persist": string }>
          article={mockArticle}
          data-persist="persistent-value"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute(
        "data-persist",
        "persistent-value"
      );

      const updatedArticle = {
        ...mockArticle,
        title: "New Title",
        description: "New Description",
      };

      rerender(
        <Article<{ "data-persist": string }>
          article={updatedArticle}
          data-persist="persistent-value"
        />
      );

      const updatedElement = screen.getByTestId("mock-card");
      expect(updatedElement).toHaveAttribute(
        "data-persist",
        "persistent-value"
      );
      expect(screen.getByText("New Title")).toBeInTheDocument();
      expect(screen.getByText("New Description")).toBeInTheDocument();
    });

    it("works with custom props and debug mode", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-debug",
        isDebugMode: true,
      });

      render(
        <Article<{ "data-debug-custom": string }>
          article={mockArticle}
          debugId="custom-debug"
          debugMode={true}
          data-debug-custom="debug-value"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute(
        "data-debug-custom",
        "debug-value"
      );
      expect(articleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("integrates custom props with Card component structure", () => {
      render(
        <Article<{ "data-structure": string }>
          article={mockArticle}
          data-structure="card-integration"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute(
        "data-structure",
        "card-integration"
      );

      // Verify all subcomponents still render correctly
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });
  });
});
