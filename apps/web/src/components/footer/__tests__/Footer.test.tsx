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

  return {
    default: MockLink,
  };
});

// Mock next/navigation usePathname with a controllable value
let currentPathname: string | undefined;
vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
}));

// Mock component library primitives to simpler DOM nodes (ensure testids)
vi.mock("@guyromellemagayano/components", () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div
      ref={ref}
      data-testid={props["data-testid"] ?? "mock-div"}
      {...props}
    />
  ));
  MockDiv.displayName = "MockDiv";

  const MockFooter = React.forwardRef<HTMLElement, any>((props, ref) => (
    <footer
      ref={ref}
      data-testid={props["data-testid"] ?? "mock-footer"}
      {...props}
    />
  ));
  MockFooter.displayName = "MockFooter";

  const MockLi = React.forwardRef<HTMLLIElement, any>((props, ref) => (
    <li ref={ref} data-testid="mock-li" {...props} />
  ));
  MockLi.displayName = "MockLi";

  const MockNav = React.forwardRef<HTMLElement, any>((props, ref) => (
    <nav ref={ref} data-testid="mock-nav" {...props} />
  ));
  MockNav.displayName = "MockNav";

  const MockP = React.forwardRef<HTMLParagraphElement, any>((props, ref) => (
    <p ref={ref} data-testid="mock-p" {...props} />
  ));
  MockP.displayName = "MockP";

  const MockUl = React.forwardRef<HTMLUListElement, any>((props, ref) => (
    <ul ref={ref} data-testid="mock-ul" {...props} />
  ));
  MockUl.displayName = "MockUl";

  return {
    Div: MockDiv,
    Footer: MockFooter,
    Li: MockLi,
    Nav: MockNav,
    P: MockP,
    Ul: MockUl,
  };
});

// Mock Container wrappers
vi.mock("@web/components/container", () => {
  const ContainerOuter = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-container-outer" {...props} />
  ));
  ContainerOuter.displayName = "MockContainerOuter";

  const ContainerInner = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-container-inner" {...props} />
  ));
  ContainerInner.displayName = "MockContainerInner";

  return { ContainerOuter, ContainerInner };
});

// Mock helpers (cn + isActivePath)
vi.mock("@web/lib", async () => {
  const actual = await vi.importActual<any>("@web/lib");
  return {
    ...actual,
    cn: (...classes: Array<string | undefined | null | false>) =>
      classes.filter(Boolean).join(" "),
  };
});

// Under test
import { Footer } from "@web/components/footer";

describe("Footer Component", () => {
  const links = [
    { label: "About", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Projects", href: "/projects" },
    { label: "Speaking", href: "/speaking" },
    { label: "Uses", href: "/uses" },
  ] as const;

  beforeEach(() => {
    vi.clearAllMocks();
    currentPathname = "/";
  });

  afterEach(() => {
    cleanup();
  });

  it("renders structure and all nav links", () => {
    currentPathname = "/";
    render(<Footer />);

    const root = screen.getByTestId("mock-footer");
    expect(root).toBeInTheDocument();

    const nav = screen.getByTestId("mock-nav");
    expect(nav).toHaveAttribute("aria-label", "Footer");

    const ul = screen.getByTestId("mock-ul");
    const liItems = screen.getAllByTestId("mock-li");
    const anchorLinks = screen.getAllByTestId("mock-link");

    expect(ul).toBeInTheDocument();
    expect(liItems).toHaveLength(links.length);
    expect(anchorLinks).toHaveLength(links.length);

    // Assert label and href per link
    links.forEach(({ label, href }, index) => {
      expect(anchorLinks[index]).toHaveTextContent(label);
      expect(anchorLinks[index]).toHaveAttribute("href", href);
    });
  });

  it("marks the matching link active with aria-current on exact pathname", () => {
    currentPathname = "/articles";
    render(<Footer />);

    const anchors = screen.getAllByTestId("mock-link");
    const articles = anchors.find((a) => a.textContent === "Articles");
    expect(articles).toHaveAttribute("aria-current", "page");

    anchors
      .filter((a) => a.textContent !== "Articles")
      .forEach((a) => expect(a).not.toHaveAttribute("aria-current"));
  });

  it("marks a parent link active for nested routes (startsWith)", () => {
    currentPathname = "/articles/my-post";
    render(<Footer />);

    const anchors = screen.getAllByTestId("mock-link");
    const articles = anchors.find((a) => a.textContent === "Articles");
    expect(articles).toHaveAttribute("aria-current", "page");
  });

  it("does not mark any link active if pathname is undefined", () => {
    currentPathname = undefined;
    render(<Footer />);

    const anchors = screen.getAllByTestId("mock-link");
    anchors.forEach((a) => expect(a).not.toHaveAttribute("aria-current"));
  });

  it("forwards ref to the root footer element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Footer ref={ref} />);

    const root = screen.getByTestId("mock-footer");
    expect(ref.current).toBe(root);
  });

  it("merges custom className with default classes on root", () => {
    render(<Footer className="custom-class" />);

    const root = screen.getByTestId("mock-footer");
    expect(root).toHaveClass("mt-32", "flex-none", "custom-class");
  });

  it("shows the current year and brand text", () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();
    const paragraph = screen.getByTestId("mock-p");
    expect(paragraph.textContent).toContain(year);
    expect(paragraph.textContent).toContain("Guy Romelle Magayano");
    expect(paragraph.textContent).toContain("All rights reserved.");
  });
});
