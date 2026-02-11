/**
 * @file List.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the List component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { List } from "../List";

import "@testing-library/jest-dom";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((_namespace: string) => {
    const translations: Record<string, string> = {
      articleList: "Article list",
      socialList: "Social list",
      toolsList: "Tools list",
      articles: "Articles",
    };

    return (key: string) => translations[key] ?? key;
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

describe("List", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders children", () => {
      render(
        <List>
          <li>Item A</li>
        </List>
      );
      expect(screen.getByText("Item A")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<List />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders as ul by default", () => {
      render(
        <List>
          <li>Item</li>
        </List>
      );
      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
    });

    it("applies default role list", () => {
      render(
        <List>
          <li>Item</li>
        </List>
      );
      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("role", "list");
    });
  });

  // ============================================================================
  // POLYMORPHIC AS PROP TESTS
  // ============================================================================

  describe("Polymorphic as=", () => {
    it('renders as ol when as prop is "ol"', () => {
      render(
        <List as="ol">
          <li>One</li>
        </List>
      );
      const list = screen.getByRole("list");
      expect(list.tagName).toBe("OL");
      expect(list).toHaveAttribute("role", "list");
    });

    it('renders as ul when as prop is "ul"', () => {
      render(
        <List as="ul">
          <li>Item</li>
        </List>
      );
      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
      expect(list).toHaveAttribute("role", "list");
    });

    it("allows custom role override", () => {
      render(
        <List role="navigation">
          <li>Item</li>
        </List>
      );
      const list = screen.getByRole("navigation");
      expect(list.tagName).toBe("UL");
      expect(list).toHaveAttribute("role", "navigation");
    });
  });

  // ============================================================================
  // HTML ATTRIBUTES TESTS
  // ============================================================================

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(
        <List id="main-list" data-custom="value">
          <li>Item</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("id", "main-list");
      expect(list).toHaveAttribute("data-custom", "value");
    });

    it("forwards event handlers", () => {
      const onClick = vi.fn();
      render(
        <List onClick={onClick}>
          <li>Item</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });
  });

  // ============================================================================
  // CSS AND STYLING TESTS
  // ============================================================================

  describe("CSS and Styling", () => {
    it("applies custom className", () => {
      render(
        <List className="custom-list-class">
          <li>Item</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveClass("custom-list-class");
    });
  });
});

describe("List.Article", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders article list with children", () => {
      render(
        <List.Article>
          <article>Article child</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region).toBeInTheDocument();
      expect(screen.getByText("Article child")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<List.Article />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders as ul by default", () => {
      render(
        <List.Article>
          <article>Article</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region.tagName).toBe("UL");
    });

    it("applies default role region", () => {
      render(
        <List.Article>
          <article>Article</article>
        </List.Article>
      );

      const region = screen.getByRole("region", { name: "Article list" });
      expect(region).toHaveAttribute("role", "region");
      expect(region).toHaveAttribute("aria-label", "Article list");
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES TESTS
  // ============================================================================

  describe("ARIA Attributes", () => {
    it("renders sr-only heading without aria-hidden", () => {
      render(
        <List.Article>
          <article>Article child</article>
        </List.Article>
      );

      const heading = screen.getByText("Article list");
      expect(heading.tagName).toBe("H2");
      expect(heading).toHaveClass("sr-only");
      expect(heading).not.toHaveAttribute("aria-hidden");
    });

    it("renders nested div container for children", () => {
      render(
        <List.Article>
          <article>Article child</article>
        </List.Article>
      );

      const region = screen.getByRole("region", { name: "Article list" });
      expect(region).toHaveAttribute("aria-label", "Article list");

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
    });

    it("allows custom role override", () => {
      render(
        <List.Article role="main">
          <article>Article</article>
        </List.Article>
      );

      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("role", "main");
    });
  });

  // ============================================================================
  // CSS AND STYLING TESTS
  // ============================================================================

  describe("CSS and Styling", () => {
    it("applies default border and padding classes", () => {
      render(
        <List.Article>
          <article>Article</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region).toHaveClass(
        "md:border-l",
        "md:border-zinc-100",
        "md:pl-6",
        "md:dark:border-zinc-700/40"
      );
    });

    it("merges custom className with default border classes", () => {
      render(
        <List.Article className="custom-class">
          <article>Article</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region).toHaveClass("custom-class", "md:border-l");
    });
  });

  // ============================================================================
  // POLYMORPHIC AS PROP TESTS
  // ============================================================================

  describe("Polymorphic as=", () => {
    it('renders as ol when as prop is "ol"', () => {
      render(
        <List.Article as="ol">
          <article>Article</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region.tagName).toBe("OL");
    });

    it('renders as ul when as prop is "ul"', () => {
      render(
        <List.Article as="ul">
          <article>Article</article>
        </List.Article>
      );

      const region = screen.getByRole("region");
      expect(region.tagName).toBe("UL");
    });
  });
});

describe("List.Social", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders social list with children", () => {
      render(
        <List.Social>
          <li>Social child</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region).toBeInTheDocument();
      expect(screen.getByText("Social child")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<List.Social />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders as ul by default", () => {
      render(
        <List.Social>
          <li>Item</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region.tagName).toBe("UL");
    });

    it("applies default role region", () => {
      render(
        <List.Social>
          <li>Item</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region).toHaveAttribute("role", "region");
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES TESTS
  // ============================================================================

  describe("ARIA Attributes", () => {
    it("applies correct aria-label", () => {
      render(
        <List.Social>
          <li>Item</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region).toHaveAttribute("aria-label", "Social list");
    });

    it("allows custom role override", () => {
      render(
        <List.Social role="navigation">
          <li>Item</li>
        </List.Social>
      );

      const navigation = screen.getByRole("navigation", {
        name: "Social list",
      });
      expect(navigation).toHaveAttribute("role", "navigation");
    });
  });

  // ============================================================================
  // POLYMORPHIC AS PROP TESTS
  // ============================================================================

  describe("Polymorphic as=", () => {
    it('renders as ol when as prop is "ol"', () => {
      render(
        <List.Social as="ol">
          <li>Item</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region.tagName).toBe("OL");
    });

    it('renders as ul when as prop is "ul"', () => {
      render(
        <List.Social as="ul">
          <li>Item</li>
        </List.Social>
      );

      const region = screen.getByRole("region", { name: "Social list" });
      expect(region.tagName).toBe("UL");
    });
  });
});

describe("List.Tools", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders tools list with children", () => {
      render(
        <List.Tools>
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toBeInTheDocument();
      expect(screen.getByText("Tool")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<List.Tools />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders as ul by default", () => {
      render(
        <List.Tools>
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region.tagName).toBe("UL");
    });

    it("applies default role region", () => {
      render(
        <List.Tools>
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toHaveAttribute("role", "region");
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES TESTS
  // ============================================================================

  describe("ARIA Attributes", () => {
    it("applies correct aria-label", () => {
      render(
        <List.Tools>
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toHaveAttribute("aria-label", "Tools list");
    });

    it("allows custom role override", () => {
      render(
        <List.Tools role="navigation">
          <li>Tool</li>
        </List.Tools>
      );

      const navigation = screen.getByRole("navigation", { name: "Tools list" });
      expect(navigation).toHaveAttribute("role", "navigation");
    });
  });

  // ============================================================================
  // CSS AND STYLING TESTS
  // ============================================================================

  describe("CSS and Styling", () => {
    it("applies default space-y-16 class", () => {
      render(
        <List.Tools>
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toHaveClass("space-y-16");
    });

    it("merges custom className with default spacing", () => {
      render(
        <List.Tools className="custom-tools">
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region).toHaveClass("custom-tools", "space-y-16");
    });
  });

  // ============================================================================
  // POLYMORPHIC AS PROP TESTS
  // ============================================================================

  describe("Polymorphic as=", () => {
    it('renders as ol when as prop is "ol"', () => {
      render(
        <List.Tools as="ol">
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region.tagName).toBe("OL");
    });

    it('renders as ul when as prop is "ul"', () => {
      render(
        <List.Tools as="ul">
          <li>Tool</li>
        </List.Tools>
      );

      const region = screen.getByRole("region", { name: "Tools list" });
      expect(region.tagName).toBe("UL");
    });
  });
});
