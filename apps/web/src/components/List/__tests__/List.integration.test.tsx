/**
 * @file List.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the List component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { List } from "../List";

import "@testing-library/jest-dom";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, any> = {
      "list.ariaLabels": {
        articleList: "Article list",
        socialList: "Social list",
        toolsList: "Tools list",
        articles: "Articles",
      },
    };

    return (key: string) => {
      const keys = key.split(".");
      let value: any = translations[namespace];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }

      return value || key;
    };
  }),
}));

// Mock utils
vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("List Integration Tests", () => {
  // ============================================================================
  // DEFAULT LIST INTEGRATION
  // ============================================================================

  describe("Default List", () => {
    it("renders default list items end-to-end", () => {
      render(
        <List>
          <li>A</li>
          <li>B</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("UL");
      expect(list).toHaveAttribute("role", "list");
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
    });

    it("renders default list with proper DOM structure", () => {
      render(
        <List>
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      );

      const list = screen.getByRole("list");
      const items = list.querySelectorAll("li");
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("Item 1");
      expect(items[1]).toHaveTextContent("Item 2");
    });
  });

  // ============================================================================
  // ARTICLE LIST INTEGRATION
  // ============================================================================

  describe("Article List Integration", () => {
    it("renders article list with heading and children container", () => {
      render(
        <List.Article>
          <article>First</article>
          <article>Second</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region).toBeInTheDocument();
      expect(region.tagName).toBe("UL");
      expect(region).toHaveAttribute("role", "region");
      expect(region).toHaveClass(
        "md:border-l",
        "md:border-zinc-100",
        "md:pl-6",
        "md:dark:border-zinc-700/40"
      );

      // Check sr-only heading
      const heading = screen.getByText("Article list");
      expect(heading.tagName).toBe("H2");
      expect(heading).toHaveClass("sr-only");
      expect(heading).not.toHaveAttribute("aria-hidden");

      // Check nested container div (no role="list" since ul already has list semantics)
      const container = region.querySelector("div.flex");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(
        "flex",
        "w-full",
        "max-w-3xl",
        "flex-col",
        "space-y-16"
      );
      expect(container).not.toHaveAttribute("role");

      // Check children are rendered
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
    });

    it("renders article list with default role and merged className", () => {
      render(
        <List.Article className="custom-article-class">
          <article>Article One</article>
          <article>Article Two</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region).toHaveAttribute("role", "region");
      expect(region).toHaveClass("custom-article-class", "md:border-l");
      expect(screen.getByText("Article One")).toBeInTheDocument();
      expect(screen.getByText("Article Two")).toBeInTheDocument();
    });

    it("renders article list with proper DOM structure", () => {
      render(
        <List.Article>
          <article>Article 1</article>
          <article>Article 2</article>
        </List.Article>
      );

      const region = screen.getByRole("region", { name: "Article list" });
      const container = region.querySelector("div.flex");
      const articles = container?.querySelectorAll("article") || [];

      expect(region).toContainElement(container);
      expect(articles).toHaveLength(2);
      expect(articles[0]).toHaveTextContent("Article 1");
      expect(articles[1]).toHaveTextContent("Article 2");
    });
  });

  // ============================================================================
  // SOCIAL LIST INTEGRATION
  // ============================================================================

  describe("Social List Integration", () => {
    it("renders social list with list semantics", () => {
      render(
        <List.Social>
          <li>Twitter</li>
          <li>LinkedIn</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region).toBeInTheDocument();
      expect(region.tagName).toBe("UL");
      expect(region).toHaveAttribute("role", "region");
      expect(region).toHaveAttribute("aria-label", "Social list");
      expect(screen.getByText("Twitter")).toBeInTheDocument();
      expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    });

    it("renders social list with custom as prop", () => {
      render(
        <List.Social as="ol">
          <li>GitHub</li>
          <li>LinkedIn</li>
          <li>Twitter</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region.tagName).toBe("OL");
      expect(screen.getByText("GitHub")).toBeInTheDocument();
      expect(screen.getByText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByText("Twitter")).toBeInTheDocument();
    });

    it("renders social list with proper DOM structure", () => {
      render(
        <List.Social>
          <li>Twitter</li>
          <li>LinkedIn</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      const items = region.querySelectorAll("li");
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("Twitter");
      expect(items[1]).toHaveTextContent("LinkedIn");
    });
  });

  // ============================================================================
  // TOOLS LIST INTEGRATION
  // ============================================================================

  describe("Tools List Integration", () => {
    it("renders tools list with default spacing and items", () => {
      render(
        <List.Tools>
          <li>React</li>
          <li>TypeScript</li>
          <li>Node.js</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toBeInTheDocument();
      expect(region.tagName).toBe("UL");
      expect(region).toHaveAttribute("role", "region");
      expect(region).toHaveAttribute("aria-label", "Tools list");
      expect(region).toHaveClass("space-y-16");
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Node.js")).toBeInTheDocument();
    });

    it("renders tools list with merged className and spacing", () => {
      render(
        <List.Tools className="grid-gap">
          <li>React</li>
          <li>TypeScript</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toBeInTheDocument();
      expect(region).toHaveClass("grid-gap", "space-y-16");
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("renders tools list with proper DOM structure", () => {
      render(
        <List.Tools>
          <li>React</li>
          <li>TypeScript</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      const items = region.querySelectorAll("li");
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("React");
      expect(items[1]).toHaveTextContent("TypeScript");
    });
  });

  // ============================================================================
  // COMPOUND COMPONENT INTEGRATION
  // ============================================================================

  describe("Compound Component Integration", () => {
    it("exposes Article as compound component", () => {
      expect(List.Article).toBeDefined();
      expect(typeof List.Article).toBe("function");
    });

    it("exposes Social as compound component", () => {
      expect(List.Social).toBeDefined();
      expect(typeof List.Social).toBe("function");
    });

    it("exposes Tools as compound component", () => {
      expect(List.Tools).toBeDefined();
      expect(typeof List.Tools).toBe("function");
    });

    it("renders List.Article independently", () => {
      render(
        <List.Article>
          <article>Article</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region).toBeInTheDocument();
    });

    it("renders List.Social independently", () => {
      render(
        <List.Social>
          <li>Item</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region).toBeInTheDocument();
    });

    it("renders List.Tools independently", () => {
      render(
        <List.Tools>
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toBeInTheDocument();
    });
  });
});
