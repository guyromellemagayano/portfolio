import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom";

// Mock next/link to render a real anchor for assertions
vi.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const { href, children, ...rest } = props;
    return (
      <a ref={ref} href={href} data-testid="mock-link" {...rest}>
        {children}
      </a>
    );
  });
  MockLink.displayName = "MockNextLink";
  return { default: MockLink };
});

// Mock next/navigation to control pathname
let mockPathname: string | undefined = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

// Under test
import { FooterNavLink } from "@web/components/footer/_internal";

// Ensure isActivePath is available
vi.mock("@web/lib", async () => {
  const actual = await vi.importActual<any>("@web/lib");
  return { ...actual };
});

describe("FooterNavLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = "/";
  });
  afterEach(() => cleanup());

  it("renders anchor with href and children", () => {
    render(<FooterNavLink href="/about">About</FooterNavLink>);
    const a = screen.getByTestId("mock-link");
    expect(a).toHaveAttribute("href", "/about");
    expect(a).toHaveTextContent("About");
  });

  it("applies aria-current when link is active (exact)", () => {
    mockPathname = "/projects";
    // Force a re-render by clearing mocks
    vi.clearAllMocks();
    const { unmount } = render(
      <FooterNavLink href="/projects">Projects</FooterNavLink>
    );
    unmount();
    render(<FooterNavLink href="/projects">Projects</FooterNavLink>);
    const a = screen.getByTestId("mock-link");
    console.log("Mock pathname:", mockPathname);
    console.log("Link aria-current:", a.getAttribute("aria-current"));
    console.log("Link href:", a.getAttribute("href"));
    expect(a).toHaveAttribute("aria-current", "page");
  });

  it("applies aria-current when pathname starts with href (nested)", () => {
    mockPathname = "/articles/slug";
    // Force a re-render by clearing mocks
    vi.clearAllMocks();
    const { unmount } = render(
      <FooterNavLink href="/articles">Articles</FooterNavLink>
    );
    unmount();
    render(<FooterNavLink href="/articles">Articles</FooterNavLink>);
    const a = screen.getByTestId("mock-link");
    expect(a).toHaveAttribute("aria-current", "page");
  });

  it("does not apply aria-current when pathname is undefined", () => {
    mockPathname = undefined;
    render(<FooterNavLink href="/about">About</FooterNavLink>);
    const a = screen.getByTestId("mock-link");
    expect(a).not.toHaveAttribute("aria-current");
  });

  it("sets rel when target is _blank and rel not provided", () => {
    render(
      <FooterNavLink href="/external" target="_blank">
        External
      </FooterNavLink>
    );
    const a = screen.getByTestId("mock-link");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("respects provided rel when target is _blank", () => {
    render(
      <FooterNavLink href="/external" target="_blank" rel="nofollow">
        External
      </FooterNavLink>
    );
    const a = screen.getByTestId("mock-link");
    expect(a).toHaveAttribute("rel", "nofollow");
  });
});
