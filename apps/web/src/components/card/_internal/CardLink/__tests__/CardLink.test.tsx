import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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

// Mock @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", () => ({
  Span: React.forwardRef<HTMLSpanElement, any>(function MockSpan(props, ref) {
    const { children, ...rest } = props;
    return (
      <span ref={ref} {...rest}>
        {children}
      </span>
    );
  }),
}));

// Mock CSS modules with explicit class names
vi.mock("../CardLink.module.css", () => {
  const mockStyles = {
    cardLink: "_cardLink_cfdd0d",
    cardLinkContainer: "_cardLinkContainer_cfdd0d",
    cardLinkHeading: "_cardLinkHeading_cfdd0d",
    cardLinkBackground: "_cardLinkBackground_cfdd0d",
    cardLinkClickableArea: "_cardLinkClickableArea_cfdd0d",
    cardLinkContent: "_cardLinkContent_cfdd0d",
  };
  return { default: mockStyles };
});

// Mock Next.js Link component
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

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

import { CardLink } from "../CardLink";

describe("CardLink", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(
      <CardLink internalId="test-link" debugMode={false}>
        Link content
      </CardLink>
    );

    expect(screen.getByText("Link content")).toBeInTheDocument();
  });

  it("renders with link when href is provided", () => {
    render(
      <CardLink internalId="test-link" debugMode={false} href="/test-link">
        Link content
      </CardLink>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-link");
  });

  it("renders without link when href is invalid", () => {
    render(
      <CardLink internalId="test-link" debugMode={false} href="">
        Link content
      </CardLink>
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Link content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <CardLink
        internalId="test-link"
        debugMode={false}
        className="custom-class"
      >
        Link content
      </CardLink>
    );

    const linkElement = screen.getByTestId("card-link-root");
    expect(linkElement).toHaveClass("custom-class");
  });

  it("renders with debug mode enabled", () => {
    render(
      <CardLink internalId="test-link" debugMode>
        Link text
      </CardLink>
    );

    const linkElement = screen.getByTestId("card-link-root");
    expect(linkElement).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders with custom internal ID", () => {
    render(
      <CardLink internalId="custom-id" debugMode={false}>
        Link text
      </CardLink>
    );

    const linkElement = screen.getByTestId("card-link-root");
    expect(linkElement).toHaveAttribute("data-card-link-id", "custom-id");
  });

  it("passes through link attributes", () => {
    render(
      <CardLink
        internalId="test-link"
        debugMode={false}
        href="/test"
        title="Test title"
      >
        Link text
      </CardLink>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveAttribute("title", "Test title");
  });

  it("does not render when no children", () => {
    const { container } = render(
      <CardLink internalId="test-link" debugMode={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(
      <CardLink internalId="test-link" debugMode={false} ref={ref}>
        Link content
      </CardLink>
    );

    expect(ref.current).toBeInTheDocument();
  });
});
