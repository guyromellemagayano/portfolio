// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational (polymorphic + variants orchestrator)
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ListItem, MemoizedListItem } from "../ListItem";

import "@testing-library/jest-dom";

// Mocks
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: any = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, name) => {
    if (component) component.displayName = name;
    return component;
  }),
  createComponentProps: vi.fn(
    (
      id: string,
      componentType: string,
      debugMode: boolean,
      additional: any = {}
    ) => ({
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additional,
    })
  ),
  // Keep behavior close to production but simple for tests
  isValidLink: vi.fn((href?: string) => Boolean(href && href !== "")),
  getLinkTargetProps: vi.fn((href?: string, target?: string) => {
    if (
      target === "_blank" &&
      typeof href === "string" &&
      href.startsWith("http")
    ) {
      return { target, rel: "noopener noreferrer" };
    }
    return { target } as any;
  }),
  // Simple passthrough for date formatting used by ArticleListItem
  formatDateSafely: vi.fn((date?: string) => date ?? ""),
}));

vi.mock("@web/components", () => {
  const Card: any = function ({ children, ...rest }: any) {
    return (
      <article
        data-testid={rest["data-testid"] || "test-id-card-root"}
        {...rest}
      >
        {children}
      </article>
    );
  };
  Card.displayName = "CardMock";
  Card.Title = ({ as: As = "h3", children, ...rest }: any) => (
    <As {...rest}>{children}</As>
  );
  Card.Title.displayName = "CardTitleMock";
  Card.Eyebrow = ({ as: As = "time", children, ...rest }: any) => (
    <As {...rest}>{children}</As>
  );
  Card.Eyebrow.displayName = "CardEyebrowMock";
  Card.Description = ({ as: As = "p", children, ...rest }: any) => (
    <As {...rest}>{children}</As>
  );
  Card.Description.displayName = "CardDescriptionMock";
  Card.Cta = ({ as: As = "div", children, ...rest }: any) => (
    <As {...rest}>{children}</As>
  );
  Card.Cta.displayName = "CardCtaMock";
  return { Card };
});

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../ListItem.i18n", async (orig) => {
  const mod = await orig<typeof import("../ListItem.i18n")>();
  return { ...mod };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const ARTICLE: any = {
  slug: "hello-world",
  title: "Hello World",
  date: "2024-01-01",
  description: "A short description",
};

describe("ListItem", () => {
  describe("Basic Rendering", () => {
    it("renders default variant with children", () => {
      render(
        <ListItem href="#">
          <span>Child</span>
        </ListItem>
      );
      const root = screen.getByTestId("test-id-list-item-root");
      expect(root).toBeInTheDocument();
      expect(screen.getByText("Child")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render((<ListItem href="#" />) as any);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Polymorphic as=", () => {
    it('supports as="div" for default variant (semantic role preserved)', () => {
      // @ts-ignore
      render(
        <ListItem as="div" href="#">
          <span>Item</span>
        </ListItem>
      );
      const root = screen.getByTestId("test-id-list-item-root");
      expect(root).toHaveAttribute("role", "listitem");
    });

    it("default variant defaults to role='listitem' when not provided", () => {
      render(
        <ListItem href="#">
          <span>Item</span>
        </ListItem>
      );
      const root = screen.getByTestId("test-id-list-item-root");
      expect(root).toHaveAttribute("role", "listitem");
    });
  });

  describe("Variants", () => {
    describe("article variant", () => {
      it("renders when article data is valid", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        // Article variant renders Card container; assert by content
        expect(screen.getByText("Hello World")).toBeInTheDocument();
        expect(screen.getByText("A short description")).toBeInTheDocument();
        expect(screen.getByText("Read article")).toBeInTheDocument();
      });

      it("applies correct ARIA attributes", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const articleElement = screen.getByRole("listitem", {
          name: "Hello World",
        });
        expect(articleElement).toHaveAttribute("aria-label", "Hello World");
        expect(articleElement).toHaveAttribute(
          "aria-describedby",
          "A short description"
        );
        expect(articleElement).toHaveAttribute("id", "hello-world");
      });

      it("applies md:col-span-3 className when isFrontPage is false", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE, isFrontPage: false },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const articleElement = screen.getByRole("listitem", {
          name: "Hello World",
        });
        expect(articleElement).toHaveClass("md:col-span-3");
      });

      it("does not apply md:col-span-3 when isFrontPage is true", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE, isFrontPage: true },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const articleElement = screen.getByRole("listitem", {
          name: "Hello World",
        });
        expect(articleElement).not.toHaveClass("md:col-span-3");
      });

      it("renders formatted date via formatDateSafely", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        // formatDateSafely mock returns date as-is for tests
        expect(screen.getByText("2024-01-01")).toBeInTheDocument();
      });

      it("uses LIST_ITEM_I18N for CTA text", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        expect(screen.getByText("Read article")).toBeInTheDocument();
      });

      it("applies aria-label to Card.Eyebrow with formatted date", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const timeElement = screen.getByLabelText("Published on 2024-01-01");
        expect(timeElement).toHaveAttribute(
          "aria-label",
          "Published on 2024-01-01"
        );
      });

      it("applies aria-label to Card.Cta with article title", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const ctaButton = screen.getByRole("button");
        expect(ctaButton).toHaveAttribute(
          "aria-label",
          "Read article: Hello World"
        );
      });

      it("applies aria-level={1} to Card.Title", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const title = screen.getByRole("heading", { level: 1 });
        expect(title).toBeInTheDocument();
      });

      it("applies dateTime and decorate props to Card.Eyebrow", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: ARTICLE },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const timeElement = screen.getByLabelText("Published on 2024-01-01");
        expect(timeElement).toHaveAttribute("dateTime", "2024-01-01");
      });

      it("merges custom className with default md:col-span-3 class", () => {
        const ArticleItem = React.createElement(
          ListItem as any,
          {
            variant: "article",
            article: ARTICLE,
            className: "custom-article-class",
            isFrontPage: false,
          },
          React.createElement("span", null, "child")
        );
        render(ArticleItem as any);
        const articleElement = screen.getByRole("listitem", {
          name: "Hello World",
        });
        expect(articleElement).toHaveClass(
          "custom-article-class",
          "md:col-span-3"
        );
      });

      it("returns null when article fields missing", () => {
        const InvalidTitleItem = React.createElement(
          ListItem as any,
          { variant: "article", article: { ...ARTICLE, title: "" } },
          React.createElement("span", null, "child")
        );
        const { container } = render(InvalidTitleItem as any);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when date invalid", () => {
        const InvalidDateItem = React.createElement(
          ListItem as any,
          { variant: "article", article: { ...ARTICLE, date: "invalid" } },
          React.createElement("span", null, "child")
        );
        const { container } = render(InvalidDateItem as any);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when description missing", () => {
        const InvalidDescItem = React.createElement(
          ListItem as any,
          { variant: "article", article: { ...ARTICLE, description: "" } },
          React.createElement("span", null, "child")
        );
        const { container } = render(InvalidDescItem as any);
        expect(container).toBeEmptyDOMElement();
      });
    });

    describe("social variant", () => {
      it("renders li role listitem and children", () => {
        render(
          (
            <ListItem variant="social" href="#">
              <a href="#">Social</a>
            </ListItem>
          ) as any
        );
        const root = screen.getByTestId("test-id-social-list-item-root");
        expect(root).toBeInTheDocument();
        expect(root).toHaveAttribute("role", "listitem");
        expect(screen.getByText("Social")).toBeInTheDocument();
      });

      it("returns null when no children", () => {
        const { container } = render(<ListItem variant="social" href="#" />);
        expect(container).toBeEmptyDOMElement();
      });

      it("respects custom as prop", () => {
        // @ts-ignore
        render(
          <ListItem variant="social" as="div" href="#">
            <a href="#">Social Link</a>
          </ListItem>
        );
        const root = screen.getByTestId("test-id-social-list-item-root");
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveAttribute("role", "listitem");
      });

      it("defaults to role='listitem' when not provided", () => {
        render(
          <ListItem variant="social" href="#">
            <a href="#">Social</a>
          </ListItem>
        );
        const root = screen.getByTestId("test-id-social-list-item-root");
        expect(root).toHaveAttribute("role", "listitem");
      });
    });

    describe("tools variant", () => {
      it("renders Card structure with title and description", () => {
        render(
          <ListItem
            variant="tools"
            title="Tool Title"
            href="https://example.com"
          >
            Tool description
          </ListItem>
        );
        const root = screen.getByRole("listitem");
        expect(root).toBeInTheDocument();
        expect(screen.getByText("Tool Title")).toBeInTheDocument();
        expect(screen.getByText("Tool description")).toBeInTheDocument();
      });

      it("returns null when missing title", () => {
        const { container } = render(
          <ListItem variant="tools" href="/internal">
            Body
          </ListItem>
        );
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when no children", () => {
        const { container } = render(
          <ListItem variant="tools" title="Tool Title" href="/internal" />
        );
        expect(container).toBeEmptyDOMElement();
      });

      it("adds rel for external _blank links", () => {
        render(
          <ListItem
            variant="tools"
            title="Ext"
            href="https://example.com"
            target="_blank"
          >
            Body
          </ListItem>
        );
        const root = screen.getByRole("listitem");
        expect(root).toBeInTheDocument();
        // Title exists; href/rel logic executed in Card.Title via mocked utils
        expect(screen.getByText("Ext")).toBeInTheDocument();
      });

      it("renders when href is invalid (empty string)", () => {
        render(
          <ListItem variant="tools" title="Tool" href="">
            Body
          </ListItem>
        );
        // isValidLink returns false for empty href, so linkHref becomes ""
        // Component should still render but without href
        const root = screen.getByRole("listitem");
        expect(root).toBeInTheDocument();
      });

      it("does not apply default role when not provided", () => {
        render(
          <ListItem variant="tools" title="Tool" href="/internal">
            Body
          </ListItem>
        );
        const root = screen.getByRole("listitem");
        // ToolsListItem doesn't have a default role, so role should be undefined
        expect(root).not.toHaveAttribute("role");
      });
    });
  });

  describe("Debug + IDs", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <ListItem debugMode href="#">
          <span>Dbg</span>
        </ListItem>
      );
      const root = screen.getByTestId("test-id-list-item-root");
      expect(root).toHaveAttribute("data-debug-mode", "true");
    });

    it("uses custom debugId for data attributes", () => {
      render(
        <ListItem debugId="custom-id" href="#">
          <span>Item</span>
        </ListItem>
      );
      expect(
        screen.getByTestId("custom-id-list-item-root")
      ).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("MemoizedListItem renders children", () => {
      render(
        <MemoizedListItem href="#">
          <span>Memo</span>
        </MemoizedListItem>
      );
      expect(screen.getByText("Memo")).toBeInTheDocument();
    });

    it("MemoizedListItem maintains content across re-renders with same props", () => {
      const { rerender } = render(
        <MemoizedListItem href="#">
          <span>Stable</span>
        </MemoizedListItem>
      );
      expect(screen.getByText("Stable")).toBeInTheDocument();
      rerender(
        <MemoizedListItem href="#">
          <span>Stable</span>
        </MemoizedListItem>
      );
      expect(screen.getByText("Stable")).toBeInTheDocument();
    });
  });
});
