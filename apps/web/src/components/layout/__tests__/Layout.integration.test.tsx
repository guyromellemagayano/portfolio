/**
 * @file Layout.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Layout component.
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
  Icon: (props: React.ComponentProps<"span">) => (
    <span data-testid="icon" {...props} />
  ),
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

describe("Layout Integration Tests", () => {
  describe("Layout (root) with skip link, Header, main, Footer", () => {
    it("renders full layout structure with skip link, main landmark, Header and Footer", () => {
      render(
        <Layout>
          <section aria-label="Page content">
            <h2>Welcome</h2>
            <p>Body</p>
          </section>
        </Layout>
      );

      const skipLink = screen.getByRole("link", {
        name: "Skip to main content",
      });
      expect(skipLink).toHaveAttribute("href", "#main");

      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "main");
      expect(main).toContainElement(
        screen.getByRole("heading", { name: "Welcome" })
      );
      expect(main).toHaveTextContent("Body");

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("skip link target main is in document", () => {
      render(
        <Layout>
          <span>Content</span>
        </Layout>
      );
      const main = document.getElementById("main");
      expect(main).toBeInTheDocument();
      expect(main?.getAttribute("role")).toBe("main");
    });

    it("maintains proper component hierarchy with header and footer", () => {
      render(<Layout>{mockChildren}</Layout>);
      const header = screen.getByRole("banner");
      const main = screen.getByRole("main");
      const footer = screen.getByRole("contentinfo");
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
      expect(main).toContainElement(screen.getByTestId("test-children"));
    });
  });

  describe("Layout content integration", () => {
    it("renders Layout with complex nested content", () => {
      const complexContent = (
        <div>
          <h1>Page Title</h1>
          <p>Page content</p>
          <section>
            <h2>Section Title</h2>
            <p>Section content</p>
          </section>
        </div>
      );
      render(<Layout>{complexContent}</Layout>);
      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Page content")).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("handles form elements in Layout content", () => {
      const formContent = (
        <form>
          <input type="text" placeholder="Enter text" />
          <button type="submit">Submit</button>
        </form>
      );
      render(<Layout>{formContent}</Layout>);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });

    it("handles interactive elements in Layout content", () => {
      const interactiveContent = (
        <div>
          <button type="button">Click Me</button>
          <input type="text" placeholder="Type here" />
          <a href="/link">Clickable Link</a>
        </div>
      );
      render(<Layout>{interactiveContent}</Layout>);
      expect(
        screen.getByRole("button", { name: "Click Me" })
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Clickable Link" })
      ).toBeInTheDocument();
    });
  });

  describe("Layout edge cases", () => {
    it("handles Layout with only whitespace children", () => {
      render(<Layout>{"   "}</Layout>);
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("handles Layout with mixed valid and invalid content", () => {
      render(
        <Layout>
          {null}
          <div>Valid content</div>
          {undefined}
        </Layout>
      );
      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });

    it("handles multiple Layout components", () => {
      render(
        <>
          <Layout>{mockChildren}</Layout>
          <Layout>{mockChildren}</Layout>
        </>
      );
      const mains = screen.getAllByRole("main");
      expect(mains.length).toBe(2);
      const skipLinks = screen.getAllByRole("link", {
        name: "Skip to main content",
      });
      expect(skipLinks.length).toBe(2);
    });
  });

  describe("SimpleLayout with title and content", () => {
    it("renders SimpleLayout with title, intro, and content", () => {
      render(
        <SimpleLayout title="Simple Page" intro="Introduction text.">
          <div>Main content</div>
        </SimpleLayout>
      );

      expect(
        screen.getByRole("heading", { level: 1, name: "Simple Page" })
      ).toBeInTheDocument();
      expect(screen.getByText("Introduction text.")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
    });

    it("renders complete page with title, intro, and content", () => {
      const mockContent = (
        <div>
          <h2>Page Content</h2>
          <p>This is the main content of the page.</p>
        </div>
      );
      render(
        <SimpleLayout title="Welcome Page" intro="This is a welcome page.">
          {mockContent}
        </SimpleLayout>
      );
      expect(
        screen.getByRole("heading", { level: 1, name: "Welcome Page" })
      ).toBeInTheDocument();
      expect(screen.getByText("This is a welcome page.")).toBeInTheDocument();
      expect(screen.getByText("Page Content")).toBeInTheDocument();
      expect(
        screen.getByText("This is the main content of the page.")
      ).toBeInTheDocument();
    });

    it("works with blog post content", () => {
      const blogContent = (
        <article>
          <div>
            <p>Introduction to my blog post...</p>
            <h2>First Section</h2>
            <p>First section content...</p>
          </div>
        </article>
      );
      render(
        <SimpleLayout title="My Blog Post" intro="By Author">
          {blogContent}
        </SimpleLayout>
      );
      expect(screen.getByText("My Blog Post")).toBeInTheDocument();
      expect(screen.getByText("By Author")).toBeInTheDocument();
      expect(
        screen.getByText("Introduction to my blog post...")
      ).toBeInTheDocument();
      expect(screen.getByText("First Section")).toBeInTheDocument();
      expect(screen.getByRole("article")).toBeInTheDocument();
    });
  });

  describe("ArticleLayout with article and back button", () => {
    const mockArticle = {
      title: "Integration Article",
      date: "2024-06-01",
      slug: "integration-article",
      description: "Description",
    };

    it("renders ArticleLayout with article landmark, heading, time, prose and back button", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <p>Article prose content</p>
        </ArticleLayout>
      );

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveAttribute("aria-labelledby");
      expect(article).toHaveAttribute("aria-describedby");

      expect(
        screen.getByRole("heading", { level: 1, name: "Integration Article" })
      ).toBeInTheDocument();

      const time = screen.getByText("2024-06-01").closest("time");
      expect(time).toHaveAttribute("dateTime", "2024-06-01");
      expect(time).toHaveAttribute("aria-label", "Published on 2024-06-01");

      expect(screen.getByTestId("prose")).toHaveTextContent(
        "Article prose content"
      );

      const backButton = screen.getByRole("button", {
        name: "Back to articles",
      });
      expect(backButton).toBeInTheDocument();
    });

    it("renders ArticleLayout with back button even without previousPathname context", () => {
      render(
        <ArticleLayout article={mockArticle}>
          <p>Body</p>
        </ArticleLayout>
      );

      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Back to articles" })
      ).toBeInTheDocument();
    });

    it("renders complete article layout with prose content", () => {
      const articleContent = (
        <div>
          <p>This is the article content...</p>
          <h2>Section Title</h2>
          <p>Section content...</p>
        </div>
      );
      render(
        <ArticleLayout article={mockArticle}>{articleContent}</ArticleLayout>
      );
      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "Integration Article" })
      ).toBeInTheDocument();
      const time = screen.getByText("2024-06-01").closest("time");
      expect(time).toBeInTheDocument();
      expect(screen.getByTestId("prose")).toHaveTextContent(
        "This is the article content..."
      );
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content...")).toBeInTheDocument();
    });
  });
});
