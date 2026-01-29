/**
 * @file ListItem.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the ListItem component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ListItem } from "../ListItem";

import "@testing-library/jest-dom";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, any> = {
      "list.ariaLabels": {
        articleDate: "Published on",
        cta: "Read article",
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

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock utils
vi.mock("@guyromellemagayano/utils", () => ({
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

// Mock Card component
const mockCardComponent = vi.hoisted(() => {
  const Card = function (props: any = {}) {
    const { as: Component = "article", children, ...rest } = props || {};
    return (
      <Component data-testid={rest["data-testid"] || "card-root"} {...rest}>
        {children}
      </Component>
    );
  };

  Card.displayName = "CardMock";

  const CardTitle = function ({ as: As = "h3", children, href, ...rest }: any) {
    if (href) {
      return (
        <As {...rest}>
          <a href={href}>{children}</a>
        </As>
      );
    }
    return <As {...rest}>{children}</As>;
  };
  CardTitle.displayName = "CardTitleMock";
  Card.Title = CardTitle;

  const CardEyebrow = function ({
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
  CardEyebrow.displayName = "CardEyebrowMock";
  Card.Eyebrow = CardEyebrow;

  const CardDescription = function ({ as: As = "p", children, ...rest }: any) {
    return <As {...rest}>{children}</As>;
  };
  CardDescription.displayName = "CardDescriptionMock";
  Card.Description = CardDescription;

  const CardCta = function (props: any) {
    const { as: As = "div", children, href, title, ...rest } = props;
    if (href) {
      // Mock CardLinkCustom behavior: sets title attribute and aria-label when title exists and children aren't descriptive
      // Since our children are descriptive ("Read article"), aria-label is not set, but title attribute is set
      const hasDescriptiveText =
        typeof children === "string"
          ? children.trim().length > 0
          : React.Children.count(children) > 0;
      const ariaLabel = title && !hasDescriptiveText ? title : undefined;

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
  CardCta.displayName = "CardCtaMock";
  Card.Cta = CardCta;

  return Card;
});

vi.mock("../../card", () => ({
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

    const timeElement = screen.getByRole("time");
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
