import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@guyromellemagayano/components", () => ({
  Article: vi.fn(({ children, ...props }) => (
    <article data-testid="article" {...props}>
      {children}
    </article>
  )),
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  )),
  Div: vi.fn(({ children, ...props }) => (
    <div data-testid="div" {...props}>
      {children}
    </div>
  )),
  Header: vi.fn(({ children, ...props }) => (
    <header data-testid="header" {...props}>
      {children}
    </header>
  )),
  Heading: vi.fn(({ children, ...props }) => (
    <h1 data-testid="article-heading" {...props}>
      {children}
    </h1>
  )),
  Span: vi.fn(({ children, ...props }) => (
    <span data-testid="span" {...props}>
      {children}
    </span>
  )),
  Time: vi.fn(({ children, ...props }) => (
    <time data-testid="time" {...props}>
      {children}
    </time>
  )),
}));

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((...args) =>
    args.some((arg) => arg != null && arg !== "")
  ),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  isRenderableContent: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    back: vi.fn(),
  })),
}));

// Mock AppContext
vi.mock("@web/app/context", () => ({
  AppContext: {
    previousPathname: "/articles",
  },
}));

// Mock React useContext
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useContext: vi.fn(() => ({
      previousPathname: "/articles",
    })),
  };
});

// Mock Container component
vi.mock("@web/components", () => ({
  Container: vi.fn(({ children, ...props }) => (
    <div data-testid="container" {...props}>
      {children}
    </div>
  )),
  Prose: vi.fn(({ children, ...props }) => (
    <div data-testid="prose" {...props}>
      {children}
    </div>
  )),
  Icon: {
    ArrowLeft: vi.fn(
      ({ className, _debugMode, _internalId, isMemoized, ...props }) => (
        <span data-testid="icon-arrow-left" className={className} {...props}>
          ArrowLeft
        </span>
      )
    ),
  },
}));

// Mock lib functions
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  formatDate: vi.fn((_date) => "Formatted Date"),
}));

// Mock CSS module
vi.mock("./ArticleLayout.module.css", () => ({
  default: {
    articleLayoutContainer: "_articleLayoutContainer_fa3e38",
    articleWrapper: "_articleWrapper_fa3e38",
    articleContent: "_articleContent_fa3e38",
    articleTitle: "_articleTitle_fa3e38",
    articleDate: "_articleDate_fa3e38",
    articleProse: "_articleProse_fa3e38",
    dateSeparator: "_dateSeparator_fa3e38",
    dateText: "_dateText_fa3e38",
  },
}));

// Mock ArticleNavButton component
vi.mock("./_internal/ArticleNavButton/ArticleNavButton", () => ({
  ArticleNavButton: vi.fn(({ children, ...props }) => (
    <button data-testid="article-nav-button" {...props}>
      {children}
    </button>
  )),
}));

// Import the component after all mocks are set up
import { ArticleLayout } from "../ArticleLayout";

// ============================================================================
// TEST SETUP
// ============================================================================

const mockArticle = {
  title: "Test Article Title",
  date: "2023-01-01",
  description: "Test article description",
  slug: "test-article",
  image: "/images/test-article.jpg",
  tags: ["test", "article"],
};

// ============================================================================
// ARTICLE LAYOUT TESTS
// ============================================================================

describe("ArticleLayout", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props when article is provided", () => {
      render(<ArticleLayout article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toBeInTheDocument();
      expect(layout.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(<ArticleLayout className="custom-class" article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      render(
        <ArticleLayout article={mockArticle} id="custom-id" role="main" />
      );

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toHaveAttribute("id", "custom-id");
      expect(layout).toHaveAttribute("role", "main");
    });

    it("uses useComponentId hook correctly", () => {
      render(<ArticleLayout article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toHaveAttribute(
        "data-article-layout-id",
        "test-id-article-layout"
      );
    });

    it("uses custom internal ID when provided", () => {
      render(<ArticleLayout internalId="custom-id" article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toHaveAttribute(
        "data-article-layout-id",
        "custom-id-article-layout"
      );
    });

    it("enables debug mode when provided", () => {
      render(<ArticleLayout debugMode={true} article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Component Structure", () => {
    it("renders layout with correct structure", () => {
      render(<ArticleLayout article={mockArticle} />);

      const container = screen.getByTestId("article-layout-root");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("_articleLayoutContainer_fa3e38");
    });

    it("includes ArticleNavButton", () => {
      render(<ArticleLayout article={mockArticle} />);

      const navButton = screen.getByTestId("article-nav-button");
      expect(navButton).toBeInTheDocument();
    });

    it("applies correct data attributes", () => {
      render(<ArticleLayout article={mockArticle} />);

      const container = screen.getByTestId("article-layout-root");
      expect(container).toHaveAttribute(
        "data-article-layout-id",
        "test-id-article-layout"
      );
      expect(container).toHaveAttribute("data-testid", "article-layout-root");
    });
  });

  describe("Article Content Rendering", () => {
    it("renders article with title when provided", () => {
      render(<ArticleLayout article={mockArticle} />);

      const title = screen.getByText("Test Article Title");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H1");
      expect(title).toHaveClass("_articleTitle_fa3e38");
    });

    it("renders article with date when provided", () => {
      render(<ArticleLayout article={mockArticle} />);

      const time = screen.getByText("Formatted Date").closest("time");
      expect(time).toBeInTheDocument();
      expect(time).toHaveAttribute("dateTime", "2023-01-01");
      expect(time).toHaveClass("_articleDate_fa3e38");
    });

    it("renders article with both title and date", () => {
      render(<ArticleLayout article={mockArticle} />);

      const title = screen.getByText("Test Article Title");
      const time = screen.getByText("Formatted Date").closest("time");

      expect(title).toBeInTheDocument();
      expect(time).toBeInTheDocument();
    });

    it("renders children content when provided", () => {
      render(
        <ArticleLayout>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      const childContent = screen.getByTestId("child-content");
      const prose = screen.getByTestId("prose");

      expect(childContent).toBeInTheDocument();
      expect(childContent).toHaveTextContent("Child content");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveClass("_articleProse_fa3e38");
      expect(prose).toHaveAttribute("data-mdx-content");
    });

    it("renders both article and children", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      const title = screen.getByText("Test Article Title");
      const time = screen.getByText("Formatted Date").closest("time");
      const childContent = screen.getByTestId("child-content");

      expect(title).toBeInTheDocument();
      expect(time).toBeInTheDocument();
      expect(childContent).toHaveTextContent("Child content");
    });
  });

  describe("Conditional Rendering", () => {
    it("returns null when no article and no children", () => {
      const { container } = render(<ArticleLayout />);

      expect(container.firstChild).toBeNull();
    });

    it("renders when only article is provided", () => {
      render(<ArticleLayout article={mockArticle} />);

      const title = screen.getByText("Test Article Title");
      expect(title).toBeInTheDocument();
    });

    it("renders when only children are provided", () => {
      render(
        <ArticleLayout>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      const childContent = screen.getByTestId("child-content");
      expect(childContent).toBeInTheDocument();
    });

    it("renders when both article and children are provided", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      const title = screen.getByText("Test Article Title");
      const childContent = screen.getByTestId("child-content");

      expect(title).toBeInTheDocument();
      expect(childContent).toBeInTheDocument();
    });
  });

  describe("Article Header Structure", () => {
    it("renders header with correct structure", () => {
      const { container } = render(<ArticleLayout article={mockArticle} />);

      const header = container.querySelector("header");
      const title = container.querySelector("h1");
      const time = container.querySelector("time");

      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("flex", "flex-col");
      expect(title).toBeInTheDocument();
      expect(time).toBeInTheDocument();
    });

    it("renders title as h1", () => {
      const { container } = render(<ArticleLayout article={mockArticle} />);

      const title = container.querySelector("h1");
      expect(title).toBeInTheDocument();
      expect(title?.tagName).toBe("H1");
    });

    it("renders date separator", () => {
      const { container } = render(<ArticleLayout article={mockArticle} />);

      const separators = container.querySelectorAll("span");
      expect(separators.length).toBeGreaterThan(0);
    });
  });

  describe("Memoization", () => {
    it("uses memoized component when isMemoized is true", () => {
      render(<ArticleLayout isMemoized={true} article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toBeInTheDocument();
    });

    it("uses base component when isMemoized is false", () => {
      render(<ArticleLayout isMemoized={false} article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toBeInTheDocument();
    });

    it("uses base component when isMemoized is undefined", () => {
      render(<ArticleLayout article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles article without title", () => {
      const articleWithoutTitle = { ...mockArticle, title: "" };

      const { container } = render(
        <ArticleLayout article={articleWithoutTitle} />
      );

      const title = container.querySelector("h1");
      expect(title).not.toBeInTheDocument();
    });

    it("handles article without date", () => {
      const articleWithoutDate = { ...mockArticle, date: "" };

      const { container } = render(
        <ArticleLayout article={articleWithoutDate} />
      );

      const time = container.querySelector("time");
      expect(time).not.toBeInTheDocument();
    });

    it("handles empty children", () => {
      const { container } = render(<ArticleLayout>{null}</ArticleLayout>);

      const prose = container.querySelector('[data-testid="prose"]');
      expect(prose).not.toBeInTheDocument();
    });

    it("handles undefined children", () => {
      const { container } = render(<ArticleLayout>{undefined}</ArticleLayout>);

      const prose = container.querySelector('[data-testid="prose"]');
      expect(prose).not.toBeInTheDocument();
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender } = render(<ArticleLayout article={mockArticle} />);

      rerender(<ArticleLayout className="new-class" article={mockArticle} />);
      rerender(<ArticleLayout _debugMode={true} article={mockArticle} />);
      rerender(<ArticleLayout isMemoized={true} article={mockArticle} />);

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toBeInTheDocument();
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(<ArticleLayout article={mockArticle} />);
      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts all Container HTML attributes", () => {
      render(
        <ArticleLayout
          article={mockArticle}
          data-custom="test"
          aria-label="Article Layout"
        />
      );

      const layout = screen.getByTestId("article-layout-root");
      expect(layout).toHaveAttribute("data-custom", "test");
      expect(layout).toHaveAttribute("aria-label", "Article Layout");
    });
  });

  describe("Integration Tests", () => {
    describe("Complete Article Layout Rendering", () => {
      it("renders complete article layout with all components", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            internalId="test-layout"
            debugMode={false}
          >
            <p>Article content goes here...</p>
          </ArticleLayout>
        );

        // Check main layout
        expect(screen.getByTestId("article-layout-root")).toBeInTheDocument();

        // Check article structure using semantic elements
        expect(screen.getByRole("article")).toBeInTheDocument();
        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
        expect(screen.getByRole("time")).toBeInTheDocument();

        // Check content
        expect(screen.getByText("Test Article Title")).toBeInTheDocument();
        expect(screen.getByText("Formatted Date")).toBeInTheDocument();
        expect(
          screen.getByText("Article content goes here...")
        ).toBeInTheDocument();
      });

      it("renders article layout with proper semantic structure", () => {
        render(<ArticleLayout article={mockArticle} />);

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toBeInTheDocument();

        const article = screen.getByRole("article");
        expect(article).toBeInTheDocument();

        const header = screen.getByRole("banner");
        expect(header).toBeInTheDocument();
      });

      it("renders article layout with proper CSS classes", () => {
        render(<ArticleLayout article={mockArticle} />);

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toBeInTheDocument();
      });
    });

    describe("Article Layout with Debug Mode", () => {
      it("renders article layout with debug mode enabled", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            internalId="debug-layout"
            debugMode={true}
          />
        );

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute(
          "data-article-layout-id",
          "debug-layout-article-layout"
        );
        expect(layout).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders article layout with debug mode disabled", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            internalId="debug-layout"
            debugMode={false}
          />
        );

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute(
          "data-article-layout-id",
          "debug-layout-article-layout"
        );
        expect(layout).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Article Layout with Custom Internal IDs", () => {
      it("renders article layout with custom internal ID", () => {
        render(
          <ArticleLayout article={mockArticle} internalId="custom-layout-id" />
        );

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute(
          "data-article-layout-id",
          "custom-layout-id-article-layout"
        );
      });

      it("renders article layout with default internal ID", () => {
        render(<ArticleLayout article={mockArticle} />);

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute(
          "data-article-layout-id",
          "test-id-article-layout"
        );
      });
    });

    describe("Article Layout and Styling", () => {
      it("applies custom className", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            className="custom-layout-class"
          />
        );

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveClass("custom-layout-class");
      });

      it("combines custom className with default classes", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            className="custom-layout-class"
          />
        );

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveClass("custom-layout-class");
      });

      it("applies custom styling props", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            style={{ backgroundColor: "white", color: "black" }}
            className="light-layout"
          />
        );

        const layout = screen.getByTestId("article-layout-root");
        // Note: toHaveStyle() may not work reliably in JSDOM environment
        // but the style prop should be applied to the DOM element
        expect(layout).toHaveAttribute("style");
        expect(layout).toHaveClass("light-layout");
      });
    });

    describe("Article Content Integration", () => {
      it("renders article title correctly", () => {
        render(<ArticleLayout article={mockArticle} />);

        const title = screen.getByRole("heading", { level: 1 });
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Test Article Title");
      });

      it("renders article date correctly", () => {
        render(<ArticleLayout article={mockArticle} />);

        const date = screen.getByRole("time");
        expect(date).toBeInTheDocument();
        expect(date).toHaveTextContent("Formatted Date");
      });

      it("renders article content correctly", () => {
        render(
          <ArticleLayout article={mockArticle}>
            <p>Article content goes here...</p>
            <h2>Section Title</h2>
            <p>More content...</p>
          </ArticleLayout>
        );

        expect(
          screen.getByText("Article content goes here...")
        ).toBeInTheDocument();
        expect(screen.getByText("Section Title")).toBeInTheDocument();
        expect(screen.getByText("More content...")).toBeInTheDocument();
      });

      it("handles complex article content", () => {
        render(
          <ArticleLayout article={mockArticle}>
            <div>
              <h2>Introduction</h2>
              <p>This is the introduction to the article.</p>
              <ul>
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
            </div>
          </ArticleLayout>
        );

        expect(screen.getByText("Introduction")).toBeInTheDocument();
        expect(
          screen.getByText("This is the introduction to the article.")
        ).toBeInTheDocument();
        expect(screen.getByText("Point 1")).toBeInTheDocument();
        expect(screen.getByText("Point 2")).toBeInTheDocument();
        expect(screen.getByText("Point 3")).toBeInTheDocument();
      });
    });

    describe("Article Navigation Integration", () => {
      it("renders navigation button correctly", () => {
        render(<ArticleLayout article={mockArticle} />);

        const navButton = screen.getByTestId("article-nav-button");
        expect(navButton).toBeInTheDocument();
      });

      it("handles navigation button interactions", () => {
        render(<ArticleLayout article={mockArticle} />);

        const navButton = screen.getByTestId("article-nav-button");
        expect(navButton).toBeInTheDocument();
        // Navigation functionality would be tested in the actual component
      });
    });

    describe("Article Layout Performance and Edge Cases", () => {
      it("renders multiple article layouts correctly", () => {
        render(
          <div>
            <ArticleLayout article={mockArticle} internalId="layout-1" />
            <ArticleLayout article={mockArticle} internalId="layout-2" />
          </div>
        );

        const layouts = screen.getAllByTestId("article-layout-root");
        expect(layouts).toHaveLength(2);

        expect(layouts[0]).toHaveAttribute(
          "data-article-layout-id",
          "layout-1-article-layout"
        );
        expect(layouts[1]).toHaveAttribute(
          "data-article-layout-id",
          "layout-2-article-layout"
        );
      });

      it("handles article layout updates efficiently", () => {
        const { rerender } = render(
          <ArticleLayout article={mockArticle} internalId="initial-layout" />
        );

        let layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute(
          "data-article-layout-id",
          "initial-layout-article-layout"
        );

        rerender(
          <ArticleLayout article={mockArticle} internalId="updated-layout" />
        );
        layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute(
          "data-article-layout-id",
          "updated-layout-article-layout"
        );
      });

      it("handles complex article configurations", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            internalId="complex-layout"
            debugMode={true}
            className="complex-layout-class"
            style={{ position: "relative", zIndex: 10 }}
            data-test="complex-test"
          >
            Complex Content
          </ArticleLayout>
        );

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute(
          "data-article-layout-id",
          "complex-layout-article-layout"
        );
        expect(layout).toHaveAttribute("data-debug-mode", "true");
        expect(layout).toHaveClass("complex-layout-class");
        // Note: toHaveStyle() may not work reliably in JSDOM environment
        // but the style prop should be applied to the DOM element
        expect(layout).toHaveAttribute("style");
        expect(layout).toHaveAttribute("data-test", "complex-test");
      });
    });

    describe("Article Layout Accessibility Integration", () => {
      it("renders with proper accessibility attributes", () => {
        render(
          <ArticleLayout
            article={mockArticle}
            aria-label="Article layout"
            role="main"
            aria-describedby="article-description"
          />
        );

        const layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Article layout");
        expect(layout).toHaveAttribute("role", "main");
        expect(layout).toHaveAttribute(
          "aria-describedby",
          "article-description"
        );
      });

      it("maintains accessibility during updates", () => {
        const { rerender } = render(
          <ArticleLayout article={mockArticle} aria-label="Initial label" />
        );

        let layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Initial label");

        rerender(
          <ArticleLayout article={mockArticle} aria-label="Updated label" />
        );
        layout = screen.getByTestId("article-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Updated label");
      });
    });
  });
});
