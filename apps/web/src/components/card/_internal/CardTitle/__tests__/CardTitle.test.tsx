import React from "react";

// Mock IntersectionObserver
/* eslint-disable no-undef */
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(function MockLink(
    { children, href, ...props },
    ref
  ) {
    return React.createElement("a", { ref, href, ...props }, children);
  }),
}));

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardTitle } from "..";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (children === null || children === undefined) {
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
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || "_self",
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  })),
  setDisplayName: vi.fn((component, displayName) => {
    component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock Link component from @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    Link: ({ children, href, ...props }: any) => {
      return React.createElement("a", { href, ...props }, children);
    },
  };
});

// Mock CSS modules
vi.mock("../CardTitle.module.css", () => ({
  default: {
    cardTitleHeading: "cardTitleHeading",
    cardTitleClickableArea: "cardTitleClickableArea",
    cardTitleContent: "cardTitleContent",
  },
}));

describe("CardTitle", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(<CardTitle>Card title</CardTitle>);

    expect(screen.getByText("Card title")).toBeInTheDocument();
  });

  it("renders with link when href is provided", () => {
    render(<CardTitle href="/test-link">Card title</CardTitle>);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-link");
  });

  it("renders without link when href is not provided", () => {
    render(<CardTitle>Card title</CardTitle>);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Card title")).toBeInTheDocument();
  });

  it("renders without link when href is default", () => {
    render(<CardTitle href="#">Card title</CardTitle>);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Card title")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<CardTitle className="custom-class">Card title</CardTitle>);

    const titleElement = screen.getByTestId("card-title-root");
    expect(titleElement).toHaveClass("custom-class");
  });

  it("renders with debug mode enabled", () => {
    render(<CardTitle debugMode={true}>Card title</CardTitle>);

    const titleElement = screen.getByTestId("card-title-root");
    expect(titleElement).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders with custom internal ID", () => {
    render(<CardTitle internalId="custom-id">Card title</CardTitle>);

    const titleElement = screen.getByTestId("card-title-root");
    expect(titleElement).toHaveAttribute("data-card-title-id", "custom-id");
  });

  it("passes through link attributes", () => {
    render(
      <CardTitle href="/test" target="_blank" title="Test title">
        Card title
      </CardTitle>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("title", "Test title");
  });

  it("does not render when no children", () => {
    const { container } = render(<CardTitle />);
    expect(container.firstChild).toBeNull();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<CardTitle ref={ref}>Card title</CardTitle>);

    expect(ref.current).toBeInTheDocument();
  });

  it("renders as h2 by default", () => {
    render(<CardTitle>Card title</CardTitle>);

    const titleElement = screen.getByTestId("card-title-root");
    expect(titleElement.tagName).toBe("H2");
  });
});
