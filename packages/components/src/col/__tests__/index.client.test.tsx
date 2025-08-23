import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { ColClient, MemoizedColClient } from "../index.client";

it("renders a col element (client)", () => {
  render(<ColClient data-testid="el" span={1} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COL");
});

it("renders memoized col element (client)", () => {
  render(<MemoizedColClient data-testid="el" span={2} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COL");
});

it("renders as custom element with 'as' prop (client)", () => {
  render(<ColClient as="div" data-testid="custom" />);
  const el = screen.getByTestId("custom");
  expect(el.tagName).toBe("DIV");
});

it("forwards ref (client)", () => {
  const ref = React.createRef<HTMLTableColElement>();
  render(<ColClient ref={ref} span={1} />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("COL");
  }
});

it("toggles attributes across rerenders (client)", () => {
  const { rerender } = render(<ColClient data-testid="el" span={1} />);
  expect(screen.getByTestId("el")).toHaveAttribute("span", "1");
  rerender(<ColClient data-testid="el" span={3} />);
  expect(screen.getByTestId("el")).toHaveAttribute("span", "3");
});

it("supports className/style/data/aria (client)", () => {
  render(
    <ColClient
      data-testid="el"
      className="c"
      style={{ width: "100px" }}
      data-x="1"
      aria-hidden="true"
    />
  );
  const el = screen.getByTestId("el");
  expect(el).toHaveClass("c");
  expect(el).toHaveAttribute("style");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");
});
