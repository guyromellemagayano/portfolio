/**
 * @file apps/web/src/components/list/item/__tests__/ListItem.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the ListItem component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ListItem } from "../ListItem";

import "@testing-library/jest-dom";

// Mock i18n
vi.mock("@web/lib/i18n", () => ({
  useTranslations: vi.fn((_namespace: string) => {
    const translations: Record<string, string> = {
      articleDate: "Published on",
      cta: "Read article",
    };

    return (key: string) => translations[key] ?? key;
  }),
}));

// Mock utils
vi.mock("@portfolio/utils", () => ({
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

vi.mock("@web/utils/datetime", () => ({
  setCustomDateFormat: vi.fn((date?: string) => date ?? ""),
}));

// Mock Card component
const mockCardComponent = vi.hoisted(() => {
  function containsMockChildrenContent(children: React.ReactNode): boolean {
    if (children == null || children === false) {
      return false;
    }

    if (Array.isArray(children)) {
      return children.some(containsMockChildrenContent);
    }

    if (typeof children === "string" || typeof children === "number") {
      return String(children).trim().length > 0;
    }

    return true;
  }

  const card = function cardMock(props: any = {}) {
    const { as: Component = "div", children, ...rest } = props || {};
    return (
      <Component data-testid={rest["data-testid"] || "card-root"} {...rest}>
        {children}
      </Component>
    );
  } as any;

  card.displayName = "CardMock";

  const cardTitle = function cardTitleMock({
    as: As = "h3",
    children,
    href,
    ...rest
  }: any) {
    if (href) {
      return (
        <As {...rest}>
          <a href={href}>{children}</a>
        </As>
      );
    }
    return <As {...rest}>{children}</As>;
  };
  cardTitle.displayName = "CardTitleMock";
  card.Title = cardTitle;

  const cardEyebrow = function cardEyebrowMock({
    as: As = "time",
    children,
    dateTime,
    ...rest
  }: any) {
    return (
      <As dateTime={dateTime} {...rest}>
        {children}
      </As>
    );
  };
  cardEyebrow.displayName = "CardEyebrowMock";
  card.Eyebrow = cardEyebrow;

  const cardDescription = function cardDescriptionMock({
    as: As = "p",
    children,
    ...rest
  }: any) {
    return <As {...rest}>{children}</As>;
  };
  cardDescription.displayName = "CardDescriptionMock";
  card.Description = cardDescription;

  const cardCta = function cardCtaMock(props: any) {
    const { as: As = "div", children, href, title, ...rest } = props;
    if (href) {
      // Mock CardLinkCustom behavior: sets title attribute and aria-label when title exists and children aren't descriptive
      // Since our children are descriptive ("Read article"), aria-label is not set, but title attribute is set
      const containsVisibleLinkText = containsMockChildrenContent(children);
      const ariaLabel = title && !containsVisibleLinkText ? title : undefined;

      const linkProps: Record<string, any> = { href };
      // CardLinkCustom sets title={title ?? undefined}, so we set it if title is truthy
      if (title) {
        linkProps.title = String(title);
      }
      if (ariaLabel) {
        linkProps["aria-label"] = String(ariaLabel);
      }

      return (
        <As {...rest}>
          <a {...linkProps}>{children}</a>
        </As>
      );
    }
    return <As {...rest}>{children}</As>;
  };
  cardCta.displayName = "CardCtaMock";
  card.Cta = cardCta;

  return card;
});

vi.mock("../../../card", () => ({
  Card: mockCardComponent,
}));

vi.mock("@web/utils/helpers", () => ({
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
        <ListItem>
          <span>Default item</span>
        </ListItem>
      </ul>
    );
    expect(screen.getByText("Default item")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("renders article variant composing Card subcomponents", () => {
    render(
      <div>
        <ListItem.Article article={ARTICLE} />
      </div>
    );
    expect(screen.getByText("Integration Article")).toBeInTheDocument();
    expect(screen.getByText("Integration description")).toBeInTheDocument();
    expect(screen.getByText("Read article")).toBeInTheDocument();
  });

  it("renders article variant with isFrontPage prop affecting className", () => {
    render(
      <div>
        <ListItem.Article article={ARTICLE} isFrontPage={true} />
      </div>
    );
    const articleElement = screen.getByRole("article");
    expect(articleElement).not.toHaveClass("md:col-span-3");
  });

  it("renders article variant with merged className", () => {
    render(
      <div>
        <ListItem.Article
          article={ARTICLE}
          className="custom-article-class"
          isFrontPage={false}
        />
      </div>
    );
    const articleElement = screen.getByRole("article");
    expect(articleElement).toHaveClass("custom-article-class", "md:col-span-3");
  });

  it("renders article variant with ARIA attributes for accessibility", () => {
    render(
      <div>
        <ListItem.Article article={ARTICLE} />
      </div>
    );
    const articleElement = screen.getByRole("article");
    expect(articleElement).toHaveAttribute(
      "aria-labelledby",
      "integration-article-title"
    );
    expect(articleElement).toHaveAttribute(
      "aria-describedby",
      "integration-article-description"
    );
    expect(articleElement).toHaveAttribute("id", "integration-article");

    const titleElement = screen.getByRole("heading", { level: 2 });
    expect(titleElement).toHaveAttribute("id", "integration-article-title");

    const timeElement = screen.getByLabelText("Published on 2024-02-02");
    expect(timeElement).toHaveAttribute("id", "integration-article-date");
    expect(timeElement).toHaveAttribute(
      "aria-label",
      "Published on 2024-02-02"
    );

    const descriptionElement = screen.getByText("Integration description");
    expect(descriptionElement).toHaveAttribute(
      "id",
      "integration-article-description"
    );

    const ctaLink = articleElement.querySelector(
      'a[href="/articles/integration-article"]'
    );
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute("href", "/articles/integration-article");
    // Card.Cta receives title prop and passes it to CardLinkCustom
    // CardLinkCustom may set title attribute depending on link text descriptiveness
    // Link text is descriptive ("Read article"), so aria-label is not set (CardLinkCustom logic)
  });

  it("renders social variant with listitem role and children", () => {
    render(
      <ul>
        <ListItem.Social>
          <a href="#">Social link</a>
        </ListItem.Social>
      </ul>
    );
    const item = screen.getByRole("listitem");
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute("role", "listitem");
    expect(screen.getByText("Social link")).toBeInTheDocument();
  });

  it("renders social variant with custom as prop", () => {
    render(
      <ul>
        <ListItem.Social as="li">
          <a href="#">GitHub</a>
        </ListItem.Social>
      </ul>
    );
    const item = screen.getByRole("listitem");
    expect(item.tagName).toBe("LI");
    expect(item).toHaveAttribute("role", "listitem");
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders tools variant with title", () => {
    render(
      <ul>
        <ListItem.Tools title="My Tool" href="https://example.com">
          Useful tool description
        </ListItem.Tools>
      </ul>
    );
    const root = screen.getByRole("article");
    expect(root).toBeInTheDocument();
    expect(screen.getByText("My Tool")).toBeInTheDocument();
  });

  it("returns null for tools variant without title (integration)", () => {
    render(
      <ul>
        <ListItem.Tools href="/internal">Body</ListItem.Tools>
      </ul>
    );
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
