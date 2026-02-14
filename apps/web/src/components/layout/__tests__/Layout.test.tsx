/**
 * @file Layout.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Layout component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArticleLayout, Layout, SimpleLayout } from "../Layout";

import "@testing-library/jest-dom";

// ============================================================================
// MOCKS
// ============================================================================

vi.mock("next-intl", () => ({
  useTranslations: vi.fn((_namespace: string) => {
    const translations: Record<string, string> = {
      "labels.skipToMainContent": "Skip to main content",
      "labels.goBackToArticles": "Back to articles",
      "labels.articleDate": "Published on",
    };
    return (key: string) => translations[key] ?? key;
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    back: vi.fn(),
  })),
}));

vi.mock("@portfolio/utils", () => ({
  formatDateSafely: vi.fn((date: string) => date || ""),
}));

vi.mock("@web/utils/datetime", () => ({
  setCustomDateFormat: vi.fn((date: string) => date || ""),
}));

vi.mock("@web/components/header", () => ({
  Header: () => (
    <div role="banner" data-testid="layout-header">
      Header
    </div>
  ),
}));

vi.mock("@web/components/footer", () => ({
  Footer: () => (
    <footer role="contentinfo" data-testid="layout-footer">
      Footer
    </footer>
  ),
}));

vi.mock("@web/components/button", () => ({
  Button: ({
    children,
    "aria-label": ariaLabel,
    ...props
  }: React.ComponentProps<"button">) => (
    <button type="button" aria-label={ariaLabel} {...props}>
      {children}
    </button>
  ),
  SkipToMainContentButton: ({
    href = "#main",
    className,
    children,
    "aria-label": ariaLabel,
    ...props
  }: React.ComponentProps<"a">) => {
    const label = ariaLabel ?? "Skip to main content";

    return (
      <a href={href} className={className} aria-label={label} {...props}>
        {children ?? label}
      </a>
    );
  },
}));

vi.mock("@web/components/container", () => ({
  Container: ({ children, ...props }: React.ComponentProps<"div">) => (
    <div {...props}>{children}</div>
  ),
}));

vi.mock("@web/components/icon", () => ({
  Icon: ({
    "aria-hidden": _ariaHidden,
    ...props
  }: React.ComponentProps<"span">) => <span data-testid="icon" {...props} />,
}));

vi.mock("@web/components/prose", () => ({
  Prose: ({ children, ...props }: React.ComponentProps<"div">) => (
    <div data-testid="prose" {...props}>
      {children}
    </div>
  ),
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ")
  ),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const mockChildren = <div data-testid="test-children">Test Content</div>;

describe("Layout", () => {
  describe("Basic Rendering", () => {
    it("renders children", () => {
      render(
        <Layout>
          <p>Page content</p>
        </Layout>
      );
      expect(screen.getByText("Page content")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<Layout />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders skip link with href #main and i18n aria-label", () => {
      render(
        <Layout>
          <span>Content</span>
        </Layout>
      );
      const skipLink = screen.getByRole("link", {
        name: "Skip to main content",
      });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute("href", "#main");
      expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
    });

    it("renders main with id main", () => {
      render(
        <Layout>
          <span>Content</span>
        </Layout>
      );
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "main");
    });

    it("renders Header and Footer", () => {
      render(
        <Layout>
          <span>Content</span>
        </Layout>
      );
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("renders children content in main area", () => {
      render(<Layout>{mockChildren}</Layout>);
      const main = screen.getByRole("main");
      expect(main).toContainElement(screen.getByTestId("test-children"));
    });
  });

  describe("Conditional Rendering", () => {
    it("does not render when children are empty string", () => {
      const { container } = render(<Layout>{""}</Layout>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children are null", () => {
      const { container } = render(<Layout>{null}</Layout>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children are undefined", () => {
      const { container } = render(<Layout>{undefined}</Layout>);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders when children are number", () => {
      render(<Layout>{42}</Layout>);
      expect(screen.getByRole("main")).toHaveTextContent("42");
    });

    it("renders when children are boolean true", () => {
      render(<Layout>{true}</Layout>);
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });

  describe("Props and Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Layout className="custom-class">
          <span>Content</span>
        </Layout>
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("class");
      expect(wrapper.className).toContain("custom-class");
    });

    it("passes through additional props", () => {
      const { container } = render(
        <Layout data-test="custom-data" aria-label="Test layout">
          <span>Content</span>
        </Layout>
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute("data-test", "custom-data");
      expect(root).toHaveAttribute("aria-label", "Test layout");
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as div by default", () => {
      const { container } = render(
        <Layout>
          <span>Content</span>
        </Layout>
      );
      const wrapper = container.firstChild;
      expect(wrapper).toBeInstanceOf(HTMLElement);
      expect((wrapper as HTMLElement).tagName).toBe("DIV");
    });

    it("renders as section when as prop is section", () => {
      const { container } = render(
        <Layout as="section">
          <span>Content</span>
        </Layout>
      );
      const wrapper = container.firstChild;
      expect(wrapper).toBeInstanceOf(HTMLElement);
      expect((wrapper as HTMLElement).tagName).toBe("SECTION");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex nested children content", () => {
      const complexChildren = (
        <div>
          <h1>Page Title</h1>
          <p>Page content</p>
          <section>
            <h2>Section Title</h2>
            <p>Section content</p>
          </section>
        </div>
      );
      render(<Layout>{complexChildren}</Layout>);
      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Page content")).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("handles form elements in children", () => {
      const formChildren = (
        <form>
          <input type="text" placeholder="Enter text" />
          <button type="submit">Submit</button>
        </form>
      );
      render(<Layout>{formChildren}</Layout>);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(<Layout>{mockChildren}</Layout>);
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("provides proper ARIA landmarks", () => {
      render(<Layout>{mockChildren}</Layout>);
      expect(screen.getAllByRole("banner")).toHaveLength(1);
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
    });

    it("provides working skip link for accessibility", () => {
      render(<Layout>{mockChildren}</Layout>);
      const skipLink = screen.getByRole("link", {
        name: "Skip to main content",
      });
      expect(skipLink).toHaveAttribute("href", "#main");
      expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(<Layout>{mockChildren}</Layout>);
      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts div HTML attributes", () => {
      const { container } = render(
        <Layout
          id="test-layout-id"
          className="test-class"
          data-test="test-data"
          aria-label="Test label"
        >
          <span>Content</span>
        </Layout>
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute("id", "test-layout-id");
      expect(root).toHaveAttribute("data-test", "test-data");
      expect(root).toHaveAttribute("aria-label", "Test label");
    });
  });
});

describe("SimpleLayout", () => {
  describe("Basic Rendering", () => {
    it("renders title and intro", () => {
      render(
        <SimpleLayout title="Page title" intro="Page intro">
          <p>Body</p>
        </SimpleLayout>
      );
      expect(
        screen.getByRole("heading", { level: 1, name: "Page title" })
      ).toBeInTheDocument();
      expect(screen.getByText("Page intro")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<SimpleLayout title="T" intro="I" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders children in a content section", () => {
      render(
        <SimpleLayout title="T" intro="I">
          <span>Body</span>
        </SimpleLayout>
      );
      const content = screen.getByText("Body");
      expect(content.closest("section")).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("omits title when empty", () => {
      render(
        <SimpleLayout title="" intro="Intro">
          <span>Body</span>
        </SimpleLayout>
      );
      expect(
        screen.queryByRole("heading", { level: 1 })
      ).not.toBeInTheDocument();
      expect(screen.getByText("Intro")).toBeInTheDocument();
    });

    it("omits intro when empty", () => {
      render(
        <SimpleLayout title="Title" intro="">
          <span>Body</span>
        </SimpleLayout>
      );
      expect(
        screen.getByRole("heading", { name: "Title" })
      ).toBeInTheDocument();
      expect(screen.queryByText("", { selector: "p" })).not.toBeInTheDocument();
    });

    it("renders when only children provided (title and intro empty)", () => {
      render(
        <SimpleLayout title="" intro="">
          <span>Body only</span>
        </SimpleLayout>
      );
      expect(screen.getByText("Body only")).toBeInTheDocument();
      expect(
        screen.getByText("Body only").closest("section")
      ).toBeInTheDocument();
    });
  });

  describe("Props and Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <SimpleLayout title="T" intro="I" className="simple-custom">
          <span>Body</span>
        </SimpleLayout>
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("class");
      expect(wrapper.className).toContain("simple-custom");
    });

    it("passes through additional props", () => {
      const { container } = render(
        <SimpleLayout
          title="T"
          intro="I"
          data-test="simple-data"
          aria-label="Simple layout"
        >
          <span>Body</span>
        </SimpleLayout>
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute("data-test", "simple-data");
      expect(root).toHaveAttribute("aria-label", "Simple layout");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex nested children content", () => {
      const complexChildren = (
        <div>
          <h2>Section Title</h2>
          <p>Section content</p>
        </div>
      );
      render(
        <SimpleLayout title="Page" intro="Intro">
          {complexChildren}
        </SimpleLayout>
      );
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("handles form elements in children", () => {
      const formContent = (
        <form>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Enter name" />
          <button type="submit">Submit</button>
        </form>
      );
      render(
        <SimpleLayout title="Contact" intro="Get in touch.">
          {formContent}
        </SimpleLayout>
      );
      expect(screen.getByLabelText("Name:")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });
  });
});

describe("ArticleLayout", () => {
  const mockArticle = {
    title: "Article title",
    date: "2024-01-15",
    slug: "article-slug",
    description: "Article description",
  };

  describe("Basic Rendering", () => {
    it("returns null when no article", () => {
      const { container } = render(
        <ArticleLayout>
          <p>Content</p>
        </ArticleLayout>
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("returns null when no children", () => {
      const { container } = render(<ArticleLayout article={mockArticle} />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders article with heading, time, and prose when article and children provided", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <p>Article body</p>
        </ArticleLayout>
      );
      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "Article title" })
      ).toBeInTheDocument();
      const time = screen.getByText("2024-01-15").closest("time");
      expect(time).toHaveAttribute("dateTime", "2024-01-15");
      expect(screen.getByTestId("prose")).toHaveTextContent("Article body");
    });

    it("article has aria-labelledby and aria-describedby", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <p>Body</p>
        </ArticleLayout>
      );
      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("aria-labelledby");
      expect(article).toHaveAttribute("aria-describedby");
      const titleId = article.getAttribute("aria-labelledby");
      const dateId = article.getAttribute("aria-describedby");
      expect(document.getElementById(titleId ?? "")?.textContent).toBe(
        "Article title"
      );
      expect(document.getElementById(dateId ?? "")?.textContent).toContain(
        "2024-01-15"
      );
    });

    it("time has aria-label with i18n articleDate prefix", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <p>Body</p>
        </ArticleLayout>
      );
      const time = screen.getByText("2024-01-15").closest("time");
      expect(time).toHaveAttribute("aria-label", "Published on 2024-01-15");
    });
  });

  describe("Back button and ARIA", () => {
    it("renders back button with i18n aria-label", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <p>Body</p>
        </ArticleLayout>
      );
      const backButton = screen.getByRole("button", {
        name: "Back to articles",
      });
      expect(backButton).toBeInTheDocument();
    });

    it("renders back button even without previousPathname context", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <p>Body</p>
        </ArticleLayout>
      );
      expect(
        screen.getByRole("button", { name: /back to articles/i })
      ).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("returns null when article title and date are empty", () => {
      const { container } = render(
        <ArticleLayout
          article={{
            ...mockArticle,
            title: "",
            date: "",
          }}
        >
          <p>Body</p>
        </ArticleLayout>
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Props and Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <ArticleLayout article={mockArticle} className="article-custom">
          <p>Body</p>
        </ArticleLayout>
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("class");
      expect(wrapper.className).toContain("article-custom");
    });

    it("passes through additional props", () => {
      render(
        <ArticleLayout
          article={mockArticle}
          data-test="article-data"
          role="main"
        >
          <p>Body</p>
        </ArticleLayout>
      );
      const root = screen.getByRole("main");
      expect(root).toHaveAttribute("data-test", "article-data");
      expect(root).toHaveAttribute("role", "main");
    });
  });

  describe("Article structure", () => {
    it("renders header with title and time", () => {
      const { container } = render(
        <ArticleLayout article={mockArticle}>
          <p>Body</p>
        </ArticleLayout>
      );
      const header = container.querySelector("header");
      const title = container.querySelector("h1");
      const time = container.querySelector("time");
      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toBe("Article title");
      expect(time).toBeInTheDocument();
      expect(time).toHaveAttribute("dateTime", "2024-01-15");
    });

    it("renders title as h1", () => {
      const { container } = render(
        <ArticleLayout article={mockArticle}>
          <p>Body</p>
        </ArticleLayout>
      );
      const title = container.querySelector("h1");
      expect(title?.tagName).toBe("H1");
      expect(title).toHaveTextContent("Article title");
    });
  });

  describe("Edge Cases", () => {
    it("handles article with empty date", () => {
      render(
        <ArticleLayout article={{ ...mockArticle, date: "" }}>
          <p>Body</p>
        </ArticleLayout>
      );
      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Article title" })
      ).toBeInTheDocument();
    });

    it("handles article with empty title", () => {
      render(
        <ArticleLayout article={{ ...mockArticle, title: "" }}>
          <p>Body</p>
        </ArticleLayout>
      );
      expect(screen.getByRole("article")).toBeInTheDocument();
      const time = screen.getByText("2024-01-15").closest("time");
      expect(time).toBeInTheDocument();
    });
  });
});
