import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "@web/components/header";

import "@testing-library/jest-dom";

// Mock Next.js Link
vi.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <a ref={ref} data-testid="mock-link" {...props} />
  ));
  MockLink.displayName = "MockLink";
  return { default: MockLink };
});

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

// Mock next-themes
const setThemeMock = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: setThemeMock }),
}));

// Mock Headless UI Popover primitives
vi.mock("@headlessui/react", () => {
  const P = React.forwardRef<HTMLElement, any>(({ as: C = "div", ...p }, r) => (
    <C ref={r} data-testid="mock-popover" {...p} />
  ));
  P.displayName = "MockPopover";
  const PB = React.forwardRef<HTMLButtonElement, any>((p, r) => (
    <button ref={r} data-testid="mock-popover-button" {...p} />
  ));
  PB.displayName = "MockPopoverButton";
  const PBD = React.forwardRef<HTMLDivElement, any>((p, r) => (
    <div ref={r} data-testid="mock-popover-backdrop" {...p} />
  ));
  PBD.displayName = "MockPopoverBackdrop";
  const PP = React.forwardRef<HTMLDivElement, any>((p, r) => (
    <div ref={r} data-testid="mock-popover-panel" {...p} />
  ));
  PP.displayName = "MockPopoverPanel";
  return {
    Popover: P,
    PopoverButton: PB,
    PopoverBackdrop: PBD,
    PopoverPanel: PP,
  };
});

// Mock the design system components used by Header
vi.mock("@guyromellemagayano/components", () => {
  const MockHeader = React.forwardRef<HTMLElement, any>((props, ref) => (
    <header ref={ref} data-testid="mock-header" {...props} />
  ));
  MockHeader.displayName = "MockHeader";

  const MockDiv = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-div" {...props} />
  ));
  MockDiv.displayName = "MockDiv";

  const MockHeading = React.forwardRef<HTMLHeadingElement, any>(
    (props, ref) => <h2 ref={ref} data-testid="mock-heading" {...props} />
  );
  MockHeading.displayName = "MockHeading";

  const MockLi = React.forwardRef<HTMLLIElement, any>((props, ref) => (
    <li ref={ref} data-testid="mock-li" {...props} />
  ));
  MockLi.displayName = "MockLi";

  const MockNav = React.forwardRef<HTMLElement, any>((props, ref) => (
    <nav ref={ref} data-testid="mock-nav" {...props} />
  ));
  MockNav.displayName = "MockNav";

  const MockSvg = React.forwardRef<SVGSVGElement, any>((props, ref) => (
    <svg ref={ref} data-testid="mock-svg" {...props} />
  ));
  MockSvg.displayName = "MockSvg";

  const MockUl = React.forwardRef<HTMLUListElement, any>((props, ref) => (
    <ul ref={ref} data-testid="mock-ul" {...props} />
  ));
  MockUl.displayName = "MockUl";

  const MockButton = React.forwardRef<HTMLButtonElement, any>((props, ref) => (
    <button ref={ref} data-testid="mock-button" {...props} />
  ));
  MockButton.displayName = "MockButton";

  return {
    Header: MockHeader,
    Div: MockDiv,
    Heading: MockHeading,
    Li: MockLi,
    Nav: MockNav,
    Svg: MockSvg,
    Ul: MockUl,
    Button: MockButton,
  };
});

// Mock cn utility
vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

// Mock next/image to a simple div (avoid width/height requirements)
vi.mock("next/image", () => ({
  default: (props: any) => <div data-testid="mock-image" {...props} />,
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders wrapper header and basic UI", () => {
    render(<Header />);
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("renders navigation links from data", () => {
    render(<Header />);
    ["About", "Articles", "Projects", "Speaking", "Uses"].forEach((label) => {
      expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    });
  });

  it("forwards ref to the wrapper header element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Header ref={ref} />);
    expect(ref.current).toBe(screen.getByTestId("mock-header"));
  });

  it("merges custom className onto wrapper header", () => {
    render(<Header className="custom-header" />);
    expect(screen.getByTestId("mock-header")).toHaveClass("custom-header");
  });

  it("toggles theme on button click using next-themes", () => {
    render(<Header />);
    const toggle = screen.getByTestId("mock-button");
    fireEvent.click(toggle);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
