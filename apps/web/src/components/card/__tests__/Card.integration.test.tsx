import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card } from "../Card";

// Import test setup
import "./setup";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (
      children === null ||
      children === undefined ||
      children === "" ||
      children === true ||
      children === false ||
      children === 0
    ) {
      return false;
    }
    return true;
  }),
  isValidLink: vi.fn((href) => {
    if (!href) return false;
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    if (hrefString === "#" || hrefString === "") return false;
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer" };
    }
    return {};
  }),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date().getFullYear().toString();
    }
    return date.toISOString();
  }),
  createCompoundComponent: vi.fn((displayName, component) => {
    component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock internal components
vi.mock("../_internal", () => ({
  CardLink: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLink(props, ref) {
      const { children, internalId, debugMode, ...rest } = props;
      return (
        <a
          ref={ref}
          data-testid="card-link-root"
          data-card-link-id={`${internalId}-card-link`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
  CardTitle: React.forwardRef<HTMLHeadingElement, any>(
    function MockCardTitle(props, ref) {
      const { children, internalId, debugMode, href, ...rest } = props;
      const content = (
        <h3
          ref={ref}
          data-testid="card-title-root"
          data-card-title-id={`${internalId}-card-title`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </h3>
      );

      if (href && href !== "#") {
        return (
          <a href={href} data-testid="mock-link">
            {content}
          </a>
        );
      }

      return content;
    }
  ),
  CardDescription: React.forwardRef<HTMLParagraphElement, any>(
    function MockCardDescription(props, ref) {
      const { children, internalId, debugMode, ...rest } = props;
      return (
        <p
          ref={ref}
          data-testid="card-description-root"
          data-card-description-id={`${internalId}-card-description`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </p>
      );
    }
  ),
  CardCta: React.forwardRef<HTMLDivElement, any>(
    function MockCardCta(props, ref) {
      const { children, internalId, debugMode, href, target, ...rest } = props;
      const content = (
        <div
          ref={ref}
          data-testid="card-cta-root"
          data-card-cta-id={`${internalId}-card-cta`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );

      if (href && href !== "#") {
        return (
          <a href={href} target={target} data-testid="mock-link">
            {content}
          </a>
        );
      }

      return content;
    }
  ),
  CardEyebrow: React.forwardRef<HTMLParagraphElement, any>(
    function MockCardEyebrow(props, ref) {
      const { children, internalId, debugMode, ...rest } = props;
      return (
        <p
          ref={ref}
          data-testid="card-eyebrow-root"
          data-card-eyebrow-id={`${internalId}-card-eyebrow`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </p>
      );
    }
  ),
}));

// Mock CSS modules
vi.mock("../Card.module.css", () => ({
  default: {
    card: "card",
  },
}));

describe("Card Integration", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders complete card with all sub-components", () => {
    render(
      <Card internalId="test-card" debugMode={false}>
        <Card.Eyebrow decorate>Featured</Card.Eyebrow>
        <Card.Title href="/article">Article Title</Card.Title>
        <Card.Description>Article description goes here</Card.Description>
        <Card.Cta href="/article">Read more</Card.Cta>
      </Card>
    );

    // Check main card
    expect(screen.getByTestId("card-root")).toBeInTheDocument();

    // Check all sub-components
    expect(screen.getByTestId("card-eyebrow-root")).toBeInTheDocument();
    expect(screen.getByTestId("card-title-root")).toBeInTheDocument();
    expect(screen.getByTestId("card-description-root")).toBeInTheDocument();
    expect(screen.getByTestId("card-cta-root")).toBeInTheDocument();

    // Check content
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Article Title")).toBeInTheDocument();
    expect(
      screen.getByText("Article description goes here")
    ).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("renders card with links working correctly", () => {
    render(
      <Card internalId="test-card" debugMode={false}>
        <Card.Title href="/test-article">Test Article</Card.Title>
        <Card.Cta href="/test-article" target="_blank">
          Read Article
        </Card.Cta>
      </Card>
    );

    const titleLink = screen.getByRole("link", { name: "Test Article" });
    const ctaLink = screen.getByRole("link", { name: "Read Article" });

    expect(titleLink).toHaveAttribute("href", "/test-article");
    expect(ctaLink).toHaveAttribute("href", "/test-article");
    expect(ctaLink).toHaveAttribute("target", "_blank");
  });

  it("renders card with debug mode enabled", () => {
    render(
      <Card internalId="debug-card" debugMode={true}>
        <Card.Eyebrow internalId="debug-eyebrow" debugMode={true}>
          Debug Eyebrow
        </Card.Eyebrow>
        <Card.Title internalId="debug-title" debugMode={true} href="#">
          Debug Title
        </Card.Title>
        <Card.Description internalId="debug-description" debugMode={true}>
          Debug Description
        </Card.Description>
        <Card.Cta internalId="debug-cta" debugMode={true}>
          Debug CTA
        </Card.Cta>
      </Card>
    );

    // Check debug attributes on all components
    expect(screen.getByTestId("card-root")).toHaveAttribute(
      "data-debug-mode",
      "true"
    );
    expect(screen.getByTestId("card-eyebrow-root")).toHaveAttribute(
      "data-debug-mode",
      "true"
    );
    expect(screen.getByTestId("card-title-root")).toHaveAttribute(
      "data-debug-mode",
      "true"
    );
    expect(screen.getByTestId("card-description-root")).toHaveAttribute(
      "data-debug-mode",
      "true"
    );
    expect(screen.getByTestId("card-cta-root")).toHaveAttribute(
      "data-debug-mode",
      "true"
    );
  });

  it("renders card with custom internal IDs", () => {
    render(
      <Card internalId="custom-card" debugMode={false}>
        <Card.Eyebrow internalId="custom-eyebrow">Eyebrow</Card.Eyebrow>
        <Card.Title internalId="custom-title" href="#">
          Title
        </Card.Title>
        <Card.Description internalId="custom-description">
          Description
        </Card.Description>
        <Card.Cta internalId="custom-cta">CTA</Card.Cta>
      </Card>
    );

    // Check internal ID attributes on all components
    expect(screen.getByTestId("card-root")).toHaveAttribute("data-card-id");
    expect(screen.getByTestId("card-eyebrow-root")).toHaveAttribute(
      "data-card-eyebrow-id"
    );
    expect(screen.getByTestId("card-title-root")).toHaveAttribute(
      "data-card-title-id"
    );
    expect(screen.getByTestId("card-description-root")).toHaveAttribute(
      "data-card-description-id"
    );
    expect(screen.getByTestId("card-cta-root")).toHaveAttribute(
      "data-card-cta-id"
    );
  });

  it("renders card with complex nested content", () => {
    render(
      <Card internalId="test-card" debugMode={false}>
        <Card.Title href="#">
          <span>Complex</span> <strong>Title</strong>
        </Card.Title>
        <Card.Description>
          <em>Italic</em> and <strong>bold</strong> text
        </Card.Description>
        <Card.Cta>
          <span>Click</span> <strong>here</strong>
        </Card.Cta>
      </Card>
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Italic")).toBeInTheDocument();
    expect(screen.getByText("bold")).toBeInTheDocument();
    expect(screen.getByText("Click")).toBeInTheDocument();
    expect(screen.getByText("here")).toBeInTheDocument();
  });

  it("renders multiple cards correctly", () => {
    render(
      <div>
        <Card internalId="card-1" debugMode={false}>
          <Card.Title href="#">Card 1</Card.Title>
          <Card.Description>Description 1</Card.Description>
        </Card>
        <Card internalId="card-2" debugMode={false}>
          <Card.Title href="#">Card 2</Card.Title>
          <Card.Description>Description 2</Card.Description>
        </Card>
      </div>
    );

    const cards = screen.getAllByTestId("card-root");
    expect(cards).toHaveLength(2);

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("handles empty children gracefully", () => {
    render(
      <Card internalId="test-card" debugMode={false}>
        <Card.Eyebrow>{null}</Card.Eyebrow>
        <Card.Title href="#">{undefined}</Card.Title>
        <Card.Description>{false}</Card.Description>
        <Card.Cta>{0}</Card.Cta>
      </Card>
    );

    // Card should still render even with empty children
    expect(screen.getByTestId("card-root")).toBeInTheDocument();
  });

  it("renders server-side by default", () => {
    render(
      <Card internalId="server-card" debugMode={false}>
        <Card.Title href="#">Server Card</Card.Title>
        <Card.Description>This should render on the server</Card.Description>
      </Card>
    );

    expect(screen.getByText("Server Card")).toBeInTheDocument();
    expect(
      screen.getByText("This should render on the server")
    ).toBeInTheDocument();
  });

  it("renders with memoization when isMemoized is true", () => {
    render(
      <Card internalId="memoized-card" debugMode={false} isMemoized={true}>
        <Card.Title href="#">Memoized Card</Card.Title>
        <Card.Description>This should be memoized</Card.Description>
      </Card>
    );

    expect(screen.getByText("Memoized Card")).toBeInTheDocument();
    expect(screen.getByText("This should be memoized")).toBeInTheDocument();
  });

  it("renders with memoization and debug mode", () => {
    render(
      <Card internalId="memoized-debug-card" debugMode={true} isMemoized={true}>
        <Card.Title href="#">Memoized Debug Card</Card.Title>
        <Card.Description>This should be memoized with debug</Card.Description>
      </Card>
    );

    expect(screen.getByText("Memoized Debug Card")).toBeInTheDocument();
    expect(
      screen.getByText("This should be memoized with debug")
    ).toBeInTheDocument();
  });
});
