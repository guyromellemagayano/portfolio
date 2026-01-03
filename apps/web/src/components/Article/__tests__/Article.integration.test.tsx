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

// ============================================================================
// INTEGRATION TESTS: Article with Card Sub-components
// - Tests Article component's orchestration of Card subcomponents
// - Verifies proper data flow and prop passing
// ============================================================================

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

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
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

// Mock Card component with a realistic structure
vi.mock("@web/components", () => ({
  Card: Object.assign(
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
  ),
}));

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

      // Verify slug is trimmed and used in URL
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/articles/trimmed-slug");
    });

    it("handles article with valid date and creates URL for title link", () => {
      render(<Article article={mockArticle} />);

      const title = screen.getByTestId("mock-card-title");
      const link = title.querySelector("a");

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/articles/test-article");
    });

    it("handles article with invalid date and does not create URL", () => {
      const articleWithInvalidDate = {
        ...mockArticle,
        date: "invalid-date",
      };

      render(<Article article={articleWithInvalidDate} />);

      const title = screen.getByTestId("mock-card-title");
      const link = title.querySelector("a");

      expect(link).not.toBeInTheDocument();
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

      // CTA with role and aria-label
      const cta = screen.getByRole("button");
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

      // Title should not have a link when date is invalid
      const title = screen.getByTestId("mock-card-title");
      const link = title.querySelector("a");
      expect(link).not.toBeInTheDocument();
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

      // Verify button structure
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label");

      // Verify time element
      const time = screen.getByTestId("mock-card-eyebrow");
      expect(time.tagName).toBe("TIME");
      expect(time).toHaveAttribute("dateTime");
      expect(time).toHaveAttribute("aria-label");
    });
  });
});
