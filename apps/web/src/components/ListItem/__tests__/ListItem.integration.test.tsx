// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Compound (variants orchestration)
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ListItem } from "../ListItem";

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

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const ARTICLE: any = {
  slug: "integration-article",
  title: "Integration Article",
  date: "2024-02-02",
  description: "Integration description",
};

describe("ListItem (Integration)", () => {
  it("renders default -> li -> child content end-to-end", () => {
    render(
      <ul>
        <ListItem href="#">
          <span>Default item</span>
        </ListItem>
      </ul>
    );
    expect(screen.getByText("Default item")).toBeInTheDocument();
    expect(screen.getByTestId("test-id-list-item-root")).toBeInTheDocument();
  });

  it("renders article variant composing Card subcomponents", () => {
    const ArticleItem = React.createElement(
      ListItem as any,
      { variant: "article", article: ARTICLE },
      React.createElement("span", null, "child")
    );
    render(<div>{ArticleItem as any}</div>);
    expect(screen.getByText("Integration Article")).toBeInTheDocument();
    expect(screen.getByText("Integration description")).toBeInTheDocument();
    expect(screen.getByText("Read article")).toBeInTheDocument();
  });

  it("renders article variant with isFrontPage prop affecting className", () => {
    const ArticleItemFrontPage = React.createElement(
      ListItem as any,
      { variant: "article", article: ARTICLE, isFrontPage: true },
      React.createElement("span", null, "child")
    );
    render(<div>{ArticleItemFrontPage as any}</div>);
    const articleElement = screen.getByRole("listitem", {
      name: "Integration Article",
    });
    expect(articleElement).not.toHaveClass("md:col-span-3");
  });

  it("renders article variant with merged className", () => {
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
    render(<div>{ArticleItem as any}</div>);
    const articleElement = screen.getByRole("listitem", {
      name: "Integration Article",
    });
    expect(articleElement).toHaveClass("custom-article-class", "md:col-span-3");
  });

  it("renders article variant with ARIA attributes for accessibility", () => {
    const ArticleItem = React.createElement(
      ListItem as any,
      { variant: "article", article: ARTICLE },
      React.createElement("span", null, "child")
    );
    render(<div>{ArticleItem as any}</div>);
    const articleElement = screen.getByRole("listitem", {
      name: "Integration Article",
    });
    expect(articleElement).toHaveAttribute("aria-label", "Integration Article");
    expect(articleElement).toHaveAttribute(
      "aria-describedby",
      "Integration description"
    );
    expect(articleElement).toHaveAttribute("id", "integration-article");

    const timeElement = screen.getByLabelText("Published on 2024-02-02");
    expect(timeElement).toHaveAttribute(
      "aria-label",
      "Published on 2024-02-02"
    );

    const ctaButton = screen.getByRole("button");
    expect(ctaButton).toHaveAttribute(
      "aria-label",
      "Read article: Integration Article"
    );
  });

  it("renders social variant with listitem role and children", () => {
    render(
      <ul>
        {
          (
            <ListItem variant="social" href="#">
              <a href="#">Social link</a>
            </ListItem>
          ) as any
        }
      </ul>
    );
    const item = screen.getByTestId("test-id-social-list-item-root");
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute("role", "listitem");
    expect(screen.getByText("Social link")).toBeInTheDocument();
  });

  it("renders social variant with custom as prop", () => {
    render(
      <ul>
        <ListItem variant="social" as="li" href="#">
          <a href="#">GitHub</a>
        </ListItem>
      </ul>
    );
    const item = screen.getByTestId("test-id-social-list-item-root");
    expect(item.tagName).toBe("LI");
    expect(item).toHaveAttribute("role", "listitem");
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders tools variant with title and description", () => {
    render(
      <ul>
        <ListItem variant="tools" title="My Tool" href="https://example.com">
          Useful tool description
        </ListItem>
      </ul>
    );
    const root = screen.getByRole("listitem");
    expect(root).toBeInTheDocument();
    expect(screen.getByText("My Tool")).toBeInTheDocument();
    expect(screen.getByText("Useful tool description")).toBeInTheDocument();
  });

  it("renders tools variant without default role", () => {
    render(
      <ul>
        <ListItem variant="tools" title="Tool" href="/internal">
          Description
        </ListItem>
      </ul>
    );
    const root = screen.getByRole("listitem");
    expect(root).toBeInTheDocument();
    // ToolsListItem doesn't have a default role
    expect(root).not.toHaveAttribute("role");
  });

  it("returns null for tools variant without title (integration)", () => {
    render(
      <ul>
        <ListItem variant="tools" href="/internal">
          Body
        </ListItem>
      </ul>
    );
    // The list still exists, but the list item should not render
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
