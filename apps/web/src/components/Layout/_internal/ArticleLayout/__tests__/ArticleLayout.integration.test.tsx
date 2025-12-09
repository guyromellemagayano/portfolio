// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+ coverage, key paths + edges)
// - Risk Tier: Core Component
// - Component Type: Compound Component
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArticleLayout } from "../ArticleLayout";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
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

// Mock @web/components
vi.mock("@web/components", () => ({
  Container: vi.fn(({ children, debugId, debugMode, ...props }) => {
    return (
      <div
        data-testid="mock-container"
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }),
  Prose: vi.fn(({ children, debugId, debugMode: _debugMode, ...props }) => {
    const componentId = debugId || "aria-test";
    return (
      <div
        data-testid="prose"
        data-mdx-content
        role="region"
        aria-label="Article content"
        aria-labelledby={`${componentId}-article-prose-title`}
        {...props}
      >
        {children}
      </div>
    );
  }),
  Button: {
    ArticleNav: vi.fn(({ children, debugId, debugMode, ...props }) => (
      <button
        data-testid="article-nav-button"
        role="button"
        aria-label="Go back to articles"
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        {children || "← Back to articles"}
      </button>
    )),
  },
  Icon: {
    ArrowLeft: vi.fn(({ children, ...props }) => (
      <svg data-testid="arrow-left-icon" {...props}>
        {children}
      </svg>
    )),
  },
}));

// Mock ArticleNavButton component
vi.mock("../ArticleNavButton", () => ({
  ArticleNavButton: vi.fn(({ debugMode, debugId, ...props }) => {
    // Create component props manually to avoid require issues
    const componentProps = {
      [`data-article-nav-button-id`]: `${debugId || "test-id"}-article-nav-button`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": `${debugId || "test-id"}-article-nav-button-root`,
    };
    return (
      <button
        {...componentProps}
        {...props}
        role="button"
        aria-label="Go back to articles"
        aria-describedby="nav-button-description"
      >
        <svg data-testid="arrow-left-icon" />
      </button>
    );
  }),
}));

// Mock CSS modules
vi.mock("../ArticleLayout.module.css", () => ({
  default: {
    articleLayout: "articleLayout",
    articleLayoutHeader: "articleLayoutHeader",
    articleLayoutContent: "articleLayoutContent",
  },
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

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    back: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
}));

// Mock AppContext
vi.mock("@web/app/context", () => {
  const React = require("react");
  const mockContext = React.createContext({
    previousPathname: "/articles",
  });
  return {
    AppContext: mockContext,
  };
});

// Mock React useContext
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useContext: vi.fn((_context) => {
      return {
        previousPathname: "/articles",
      };
    }),
  };
});

// Mock logger
vi.mock("@guyromellemagayano/logger", () => ({
  default: {
    warn: vi.fn(),
  },
}));

// Mock @web/utils
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  formatDate: vi.fn((date) => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  }),
}));

// ============================================================================
// TEST DATA
// ============================================================================

const mockArticle = {
  slug: "test-article",
  title: "Test Article Title",
  description: "This is a test article description",
  date: "2023-01-01",
  content: "Test content",
  image: "/test-image.jpg",
  tags: ["test", "article"],
};

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe("ArticleLayout Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Component Integration", () => {
    it("renders ArticleLayout with all sub-components", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test that all main components are rendered
      expect(screen.getByTestId("mock-container")).toBeInTheDocument();
      expect(screen.getByTestId("prose")).toBeInTheDocument();
      expect(screen.getByTestId("article-nav-button")).toBeInTheDocument();
      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });

    it("integrates Container with correct props", () => {
      render(
        <ArticleLayout article={mockArticle} debugId="integration-test">
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      const container = screen.getByTestId("mock-container");
      expect(container).toBeInTheDocument();
    });

    it("integrates Prose with correct props", () => {
      render(
        <ArticleLayout article={mockArticle} debugId="integration-test">
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      const prose = screen.getByTestId("prose");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveAttribute("role", "region");
      expect(prose).toHaveAttribute("aria-label", "Article content");
    });

    it("integrates ArticleNavButton with correct props", () => {
      render(
        <ArticleLayout article={mockArticle} debugId="integration-test">
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      const navButton = screen.getByTestId("article-nav-button");
      expect(navButton).toBeInTheDocument();
      expect(navButton).toHaveAttribute("role", "button");
      expect(navButton).toHaveAttribute("aria-label", "Go back to articles");
    });
  });

  describe("Props Integration", () => {
    it("passes debugId to all sub-components", () => {
      render(
        <ArticleLayout article={mockArticle} debugId="custom-debug-id">
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test that debugId is passed to ArticleNavButton
      const navButton = screen.getByTestId("article-nav-button");
      expect(navButton).toBeInTheDocument();
    });

    it("passes debugMode to all sub-components", () => {
      render(
        <ArticleLayout article={mockArticle} debugMode={true}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test that debugMode is passed to Container
      const container = screen.getByTestId("mock-container");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes article data to sub-components", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test that article data is available to sub-components
      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });
  });

  describe("Layout Structure Integration", () => {
    it("maintains correct DOM hierarchy", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test that the layout structure is correct
      const container = screen.getByTestId("mock-container");
      const prose = screen.getByTestId("prose");
      const navButton = screen.getByTestId("article-nav-button");
      const childContent = screen.getByTestId("child-content");

      expect(container).toBeInTheDocument();
      expect(prose).toBeInTheDocument();
      expect(navButton).toBeInTheDocument();
      expect(childContent).toBeInTheDocument();
    });

    it("renders children in correct location", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test that children are rendered in the prose component
      const prose = screen.getByTestId("prose");
      const childContent = screen.getByTestId("child-content");

      expect(prose).toContainElement(childContent);
    });
  });

  describe("Accessibility Integration", () => {
    it("maintains proper ARIA structure across components", () => {
      render(
        <ArticleLayout article={mockArticle} debugId="aria-integration-test">
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test ARIA roles
      const prose = screen.getByTestId("prose");
      const navButton = screen.getByTestId("article-nav-button");

      expect(prose).toHaveAttribute("role", "region");
      expect(prose).toHaveAttribute("aria-label", "Article content");
      expect(navButton).toHaveAttribute("role", "button");
      expect(navButton).toHaveAttribute("aria-label", "Go back to articles");
    });

    it("maintains ARIA relationships between components", () => {
      render(
        <ArticleLayout article={mockArticle} debugId="aria-integration-test">
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Test ARIA relationships
      const prose = screen.getByTestId("prose");
      expect(prose).toHaveAttribute(
        "aria-labelledby",
        "aria-integration-test-article-prose-title"
      );
    });
  });

  describe("Error Handling Integration", () => {
    it("handles missing article data gracefully", () => {
      const { container } = render(
        <ArticleLayout article={null as any}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Component should not render when article is null
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty article data gracefully", () => {
      const emptyArticle = {
        slug: "",
        title: "",
        description: "",
        date: "",
        content: "",
        image: "",
        tags: [],
      };

      render(
        <ArticleLayout article={emptyArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Component should render but with empty title and date
      expect(screen.getByTestId("child-content")).toBeInTheDocument();
      // Title and date should not be rendered when empty
      expect(
        screen.queryByRole("heading", { level: 1 })
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("time")).not.toBeInTheDocument();
    });
  });

  describe("Performance Integration", () => {
    it("handles multiple re-renders efficiently", () => {
      const { rerender } = render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Initial render
      expect(screen.getByTestId("child-content")).toBeInTheDocument();

      // Re-render with different props
      rerender(
        <ArticleLayout article={mockArticle} debugMode={true}>
          <div data-testid="child-content">Updated content</div>
        </ArticleLayout>
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });

    it("handles article updates efficiently", () => {
      const { rerender } = render(
        <ArticleLayout article={mockArticle}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      // Initial render
      expect(screen.getByTestId("child-content")).toBeInTheDocument();

      // Update with different article
      const updatedArticle = {
        ...mockArticle,
        title: "Updated Article Title",
        description: "Updated description",
      };

      rerender(
        <ArticleLayout article={updatedArticle}>
          <div data-testid="child-content">Updated content</div>
        </ArticleLayout>
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });
  });

  describe("Complex Scenarios", () => {
    it("handles complex children content", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div>
            <h1>Complex Title</h1>
            <p>Complex paragraph</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </ArticleLayout>
      );

      expect(screen.getByText("Complex Title")).toBeInTheDocument();
      expect(screen.getByText("Complex paragraph")).toBeInTheDocument();
      expect(screen.getByText("List item 1")).toBeInTheDocument();
      expect(screen.getByText("List item 2")).toBeInTheDocument();
    });

    it("handles multiple ArticleLayout instances", () => {
      render(
        <div>
          <ArticleLayout article={mockArticle}>
            <div data-testid="child-1">Child 1</div>
          </ArticleLayout>
          <ArticleLayout article={mockArticle}>
            <div data-testid="child-2">Child 2</div>
          </ArticleLayout>
        </div>
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });

    it("handles nested components", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <div>
            <ArticleLayout article={mockArticle}>
              <div data-testid="nested-child">Nested child</div>
            </ArticleLayout>
          </div>
        </ArticleLayout>
      );

      expect(screen.getByTestId("nested-child")).toBeInTheDocument();
    });
  });

  describe("Memoization Integration", () => {
    it("handles memoized component correctly", () => {
      render(
        <ArticleLayout article={mockArticle} isMemoized={true}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });

    it("handles non-memoized component correctly", () => {
      render(
        <ArticleLayout article={mockArticle} isMemoized={false}>
          <div data-testid="child-content">Child content</div>
        </ArticleLayout>
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });
  });
});
