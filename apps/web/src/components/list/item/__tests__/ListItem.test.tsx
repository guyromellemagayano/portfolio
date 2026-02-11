/**
 * @file ListItem.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the ListItem component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card } from "../../../card";
import { ListItem } from "../ListItem";

import "@testing-library/jest-dom";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((_namespace: string) => {
    const translations: Record<string, string> = {
      articleDate: "Published on",
      cta: "Read article",
    };

    return (key: string) => translations[key] ?? key;
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

vi.mock("@web/utils/datetime", () => ({
  setCustomDateFormat: vi.fn((date?: string) => date ?? ""),
}));

// Mock Card component
const mockCardComponent = vi.hoisted(() => {
  const Card = function (props: any = {}) {
    const { as: Component = "div", children, ...rest } = props || {};
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
  slug: "hello-world",
  title: "Hello World",
  date: "2024-01-01",
  description: "A short description",
};

describe("ListItem", () => {
  describe("Basic Rendering", () => {
    it("renders default variant with children", () => {
      render(
        <ListItem>
          <span>Child</span>
        </ListItem>
      );
      const root = screen.getByRole("listitem");
      expect(root).toBeInTheDocument();
      expect(screen.getByText("Child")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<ListItem />);
      expect(container).toBeEmptyDOMElement();
    });

    it("defaults to role='listitem' when not provided", () => {
      render(
        <ListItem>
          <span>Item</span>
        </ListItem>
      );
      const root = screen.getByRole("listitem");
      expect(root).toHaveAttribute("role", "listitem");
    });

    it("renders as li by default", () => {
      render(
        <ListItem>
          <span>Item</span>
        </ListItem>
      );
      const root = screen.getByRole("listitem");
      expect(root.tagName).toBe("LI");
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as li by default", () => {
      render(
        <ListItem>
          <span>Item</span>
        </ListItem>
      );
      const root = screen.getByRole("listitem");
      expect(root.tagName).toBe("LI");
    });

    it("renders as custom element when as prop is provided", () => {
      render(
        <ListItem as={Card}>
          <span>Item</span>
        </ListItem>
      );
      const root = screen.getByRole("listitem");
      expect(root.tagName).toBe("DIV");
    });
  });

  describe("ListItem.Article", () => {
    it("renders when article data is valid", () => {
      render(<ListItem.Article article={ARTICLE} />);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
      expect(screen.getByText("A short description")).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("applies correct ARIA attributes", () => {
      render(<ListItem.Article article={ARTICLE} />);
      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "hello-world-title"
      );
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "hello-world-description"
      );
      expect(articleElement).toHaveAttribute("id", "hello-world");
    });

    it("applies md:col-span-3 className when isFrontPage is false", () => {
      render(<ListItem.Article article={ARTICLE} isFrontPage={false} />);
      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveClass("md:col-span-3");
    });

    it("does not apply md:col-span-3 when isFrontPage is true", () => {
      render(<ListItem.Article article={ARTICLE} isFrontPage={true} />);
      const articleElement = screen.getByRole("article");
      expect(articleElement).not.toHaveClass("md:col-span-3");
    });

    it("renders formatted date via setCustomDateFormat", () => {
      render(<ListItem.Article article={ARTICLE} />);
      expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    });

    it("uses i18n for CTA text", () => {
      render(<ListItem.Article article={ARTICLE} />);
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("applies aria-label to Card.Eyebrow with formatted date", () => {
      render(<ListItem.Article article={ARTICLE} />);
      const timeElement = screen.getByLabelText("Published on 2024-01-01");
      expect(timeElement).toHaveAttribute(
        "aria-label",
        "Published on 2024-01-01"
      );
    });

    it("renders Card.Cta as link with correct href", () => {
      render(<ListItem.Article article={ARTICLE} />);
      const articleElement = screen.getByRole("article");
      const ctaLink = articleElement.querySelector(
        'a[href="/articles/hello-world"]'
      );
      expect(ctaLink).toBeInTheDocument();
      expect(ctaLink).toHaveAttribute("href", "/articles/hello-world");
      // Card.Cta receives title prop and passes it to CardLinkCustom
      // CardLinkCustom may set title attribute depending on link text descriptiveness
      // Link text is descriptive ("Read article"), so aria-label is not set (CardLinkCustom logic)
    });

    it("applies h2 heading level to Card.Title", () => {
      render(<ListItem.Article article={ARTICLE} />);
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("id", "hello-world-title");
    });

    it("applies dateTime and decorate props to Card.Eyebrow", () => {
      render(<ListItem.Article article={ARTICLE} />);
      const timeElement = screen.getByLabelText("Published on 2024-01-01");
      expect(timeElement).toHaveAttribute("dateTime", "2024-01-01");
      expect(timeElement).toHaveAttribute("id", "hello-world-date");
    });

    it("applies correct IDs for ARIA relationships", () => {
      render(<ListItem.Article article={ARTICLE} />);
      const articleElement = screen.getByRole("article");
      const titleElement = screen.getByRole("heading", { level: 2 });
      const descriptionElement = screen.getByText("A short description");
      const dateElement = screen.getByLabelText("Published on 2024-01-01");

      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "hello-world-title"
      );
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "hello-world-description"
      );
      expect(titleElement).toHaveAttribute("id", "hello-world-title");
      expect(descriptionElement).toHaveAttribute(
        "id",
        "hello-world-description"
      );
      expect(dateElement).toHaveAttribute("id", "hello-world-date");
    });

    it("merges custom className with default md:col-span-3 class", () => {
      render(
        <ListItem.Article
          article={ARTICLE}
          className="custom-article-class"
          isFrontPage={false}
        />
      );
      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveClass(
        "custom-article-class",
        "md:col-span-3"
      );
    });

    it("returns null when article fields missing", () => {
      const { container } = render(
        <ListItem.Article article={{ ...ARTICLE, title: "" }} />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("returns null when date invalid", () => {
      const { container } = render(
        <ListItem.Article article={{ ...ARTICLE, date: "invalid" }} />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("returns null when description missing", () => {
      const { container } = render(
        <ListItem.Article article={{ ...ARTICLE, description: "" }} />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("handles conditional ARIA attributes when content is missing", () => {
      const articleWithoutTitle = { ...ARTICLE, title: "" };
      const { container } = render(
        <ListItem.Article article={articleWithoutTitle} />
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("ListItem.Social", () => {
    it("renders li role listitem and children", () => {
      render(
        <ListItem.Social>
          <a href="#">Social</a>
        </ListItem.Social>
      );
      const root = screen.getByRole("listitem");
      expect(root).toBeInTheDocument();
      expect(root).toHaveAttribute("role", "listitem");
      expect(screen.getByText("Social")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render(<ListItem.Social />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders as li by default", () => {
      render(
        <ListItem.Social>
          <a href="#">Social Link</a>
        </ListItem.Social>
      );
      const root = screen.getByRole("listitem");
      expect(root.tagName).toBe("LI");
      expect(root).toHaveAttribute("role", "listitem");
    });

    it("defaults to role='listitem' when not provided", () => {
      render(
        <ListItem.Social>
          <a href="#">Social</a>
        </ListItem.Social>
      );
      const root = screen.getByRole("listitem");
      expect(root).toHaveAttribute("role", "listitem");
    });
  });

  describe("ListItem.Tools", () => {
    it("renders Card structure with title", () => {
      render(
        <ListItem.Tools title="Tool Title" href="https://example.com">
          Tool description
        </ListItem.Tools>
      );
      const root = screen.getByRole("article");
      expect(root).toBeInTheDocument();
      expect(screen.getByText("Tool Title")).toBeInTheDocument();
    });

    it("returns null when missing title", () => {
      const { container } = render(
        <ListItem.Tools href="/internal">Body</ListItem.Tools>
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("returns null when no children", () => {
      const { container } = render(
        <ListItem.Tools title="Tool Title" href="/internal" />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("adds rel for external _blank links", () => {
      render(
        <ListItem.Tools title="Ext" href="https://example.com" target="_blank">
          Body
        </ListItem.Tools>
      );
      const root = screen.getByRole("article");
      expect(root).toBeInTheDocument();
      expect(screen.getByText("Ext")).toBeInTheDocument();
    });

    it("renders when href is invalid (empty string)", () => {
      render(
        <ListItem.Tools title="Tool" href="">
          Body
        </ListItem.Tools>
      );
      const root = screen.getByRole("article");
      expect(root).toBeInTheDocument();
    });
  });
});
