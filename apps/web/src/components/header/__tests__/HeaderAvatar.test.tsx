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

vi.mock("next/image", () => ({
  default: (props: any) => <div data-testid="mock-image" {...props} />,
}));

vi.mock("@guyromellemagayano/components", () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-div" {...props} />
  ));
  MockDiv.displayName = "MockDiv";
  return { Div: MockDiv };
});

vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

// Under test
import { Avatar, AvatarContainer } from "@web/components/header/internal";

describe("Header Avatar components", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it("renders AvatarContainer and merges className", () => {
    render(<AvatarContainer className="extra" />);
    const el = screen.getByTestId("mock-div");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("extra");
  });

  it("renders Avatar with default href and image size", () => {
    render(<Avatar href="/" />);
    const link = screen.getByTestId("mock-link");
    expect(link).toBeInTheDocument();
    const img = screen.getByTestId("mock-image");
    expect(img).toBeInTheDocument();
  });

  it("renders large Avatar variant", () => {
    render(<Avatar href="/" large />);
    const img = screen.getByTestId("mock-image");
    expect(img).toBeInTheDocument();
  });
});
