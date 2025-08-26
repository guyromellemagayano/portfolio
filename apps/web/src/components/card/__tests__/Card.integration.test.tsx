import React from "react";

// Mock IntersectionObserver before any imports
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock next/link to avoid IntersectionObserver issues
vi.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const { href, children, ...rest } = props;
    return React.createElement(
      "a",
      {
        ref,
        href,
        "data-testid": "mock-next-link",
        ...rest,
      },
      children
    );
  });
  MockLink.displayName = "MockNextLink";
  return { default: MockLink };
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card } from "../Card";

// Mock Link component from @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    Link: React.forwardRef<HTMLAnchorElement, any>(
      ({ children, href, ...props }, ref) => {
        return React.createElement(
          "a",
          { ref, href, ...props, "data-testid": "mock-link" },
          children
        );
      }
    ),
  };
});

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
      <Card internalId="debug-card" debugMode>
        <Card.Eyebrow internalId="debug-eyebrow" debugMode={true}>
          Debug Eyebrow
        </Card.Eyebrow>
        <Card.Title internalId="debug-title" debugMode={true}>
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
        <Card.Title internalId="custom-title">Title</Card.Title>
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
        <Card.Title>
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
          <Card.Title>Card 1</Card.Title>
          <Card.Description>Description 1</Card.Description>
        </Card>
        <Card internalId="card-2" debugMode={false}>
          <Card.Title>Card 2</Card.Title>
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
        <Card.Title>{undefined}</Card.Title>
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
        <Card.Title>Server Card</Card.Title>
        <Card.Description>This should render on the server</Card.Description>
      </Card>
    );

    expect(screen.getByText("Server Card")).toBeInTheDocument();
    expect(
      screen.getByText("This should render on the server")
    ).toBeInTheDocument();
  });

  it("renders client-side when isClient is true", () => {
    render(
      <Card internalId="client-card" debugMode={false} isClient={true}>
        <Card.Title>Client Card</Card.Title>
        <Card.Description>This should render on the client</Card.Description>
      </Card>
    );

    expect(screen.getByText("Client Card")).toBeInTheDocument();
    expect(
      screen.getByText("This should render on the client")
    ).toBeInTheDocument();
  });

  it("renders memoized client-side when both flags are true", () => {
    render(
      <Card
        componentId="memoized-card"
        isDebugMode={false}
        isClient={true}
        isMemoized={true}
      >
        <Card.Title>Memoized Client Card</Card.Title>
        <Card.Description>This should be memoized</Card.Description>
      </Card>
    );

    expect(screen.getByText("Memoized Client Card")).toBeInTheDocument();
    expect(screen.getByText("This should be memoized")).toBeInTheDocument();
  });
});
