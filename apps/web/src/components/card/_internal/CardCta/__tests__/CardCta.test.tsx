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

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { CardCta } from "../CardCta";

// Mock Icon component
vi.mock("@web/components", () => ({
  Icon: {
    ChevronRight: () => <div data-testid="icon-chevron-right">→</div>,
  },
}));

// Mock CSS modules
vi.mock("../CardCta.module.css", () => ({
  default: {
    cardCtaContainer: "cardCtaContainer",
    cardCtaLink: "cardCtaLink",
    cardCtaIcon: "cardCtaIcon",
  },
}));

describe("CardCta", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(<CardCta>Call to action</CardCta>);

    expect(screen.getByText("Call to action")).toBeInTheDocument();
  });

  it("renders with link when href is provided", () => {
    render(<CardCta href="/test-link">Call to action</CardCta>);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-link");
  });

  it("renders without link when href is invalid", () => {
    render(<CardCta href="#">Call to action</CardCta>);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Call to action")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<CardCta className="custom-class">Call to action</CardCta>);

    const ctaElement = screen.getByTestId("card-cta-root");
    expect(ctaElement).toHaveClass("custom-class");
  });

  it("renders with debug mode enabled", () => {
    render(<CardCta debugMode={true}>Call to action</CardCta>);

    const ctaElement = screen.getByTestId("card-cta-root");
    expect(ctaElement).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders with custom internal ID", () => {
    render(<CardCta internalId="custom-id">Call to action</CardCta>);

    const ctaElement = screen.getByTestId("card-cta-root");
    expect(ctaElement).toHaveAttribute("data-card-cta-id");
  });

  it("passes through link attributes", () => {
    render(
      <CardCta href="/test" target="_blank" title="Test title">
        Call to action
      </CardCta>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("title", "Test title");
  });

  it("adds rel attribute for external links", () => {
    render(
      <CardCta href="https://example.com" target="_blank">
        Call to action
      </CardCta>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not add rel attribute for internal links", () => {
    render(
      <CardCta href="/internal-link" target="_self">
        Call to action
      </CardCta>
    );

    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("rel");
  });

  it("renders chevron icon when link is provided", () => {
    render(<CardCta href="/test-link">Call to action</CardCta>);

    const icon = screen.getByTestId("icon-chevron-right");
    expect(icon).toBeInTheDocument();
  });

  it("does not render chevron icon when no link", () => {
    render(<CardCta>Call to action</CardCta>);

    expect(screen.queryByTestId("icon-chevron-right")).not.toBeInTheDocument();
  });

  it("renders empty element when no children", () => {
    const { container } = render(<CardCta />);
    const element = container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("DIV");
    expect(element.textContent).toBe("");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardCta ref={ref}>Call to action</CardCta>);

    expect(ref.current).toBeInTheDocument();
  });

  it("renders as div element", () => {
    render(<CardCta>Call to action</CardCta>);

    const ctaElement = screen.getByTestId("card-cta-root");
    expect(ctaElement.tagName).toBe("DIV");
  });
});
