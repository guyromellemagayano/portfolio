import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom";

// Mocks
vi.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <a ref={ref} data-testid="mock-link" {...props} />
  ));
  MockLink.displayName = "MockLink";
  return { default: MockLink };
});

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

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

vi.mock("@guyromellemagayano/components", () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-div" {...props} />
  ));
  MockDiv.displayName = "MockDiv";
  const MockHeading = React.forwardRef<HTMLHeadingElement, any>((p, r) => (
    <h2 ref={r} data-testid="mock-heading" {...p} />
  ));
  MockHeading.displayName = "MockHeading";
  const MockLi = React.forwardRef<HTMLLIElement, any>((p, r) => (
    <li ref={r} data-testid="mock-li" {...p} />
  ));
  MockLi.displayName = "MockLi";
  const MockNav = React.forwardRef<HTMLElement, any>((p, r) => (
    <nav ref={r} data-testid="mock-nav" {...p} />
  ));
  MockNav.displayName = "MockNav";
  const MockSpan = React.forwardRef<HTMLSpanElement, any>((p, r) => (
    <span ref={r} data-testid="mock-span" {...p} />
  ));
  MockSpan.displayName = "MockSpan";
  const MockUl = React.forwardRef<HTMLUListElement, any>((p, r) => (
    <ul ref={r} data-testid="mock-ul" {...p} />
  ));
  MockUl.displayName = "MockUl";
  return {
    Div: MockDiv,
    Heading: MockHeading,
    Li: MockLi,
    Nav: MockNav,
    Span: MockSpan,
    Ul: MockUl,
  };
});

vi.mock("@web/components/header/_internal/HeaderIcons", () => ({
  ChevronDownIcon: (p: any) => <svg data-testid="mock-chevron" {...p} />,
  CloseIcon: (p: any) => <svg data-testid="mock-close" {...p} />,
}));

vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

// Under test
import {
  DesktopHeaderNav,
  MobileHeaderNav,
} from "@web/components/header/_internal";

describe("Header Navigation components", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it("renders MobileHeaderNav with labels and links", () => {
    render(<MobileHeaderNav />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByTestId("mock-popover-panel")).toBeInTheDocument();
  });

  it("renders DesktopHeaderNav with links", () => {
    render(<DesktopHeaderNav />);
    expect(screen.getByTestId("mock-nav")).toBeInTheDocument();
    expect(screen.getByTestId("mock-ul")).toBeInTheDocument();
  });
});
