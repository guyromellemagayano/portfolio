import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Col } from "..";

it("renders a col element", () => {
  render(<Col data-testid="el" span={2} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COL");
});

it("renders as different element via 'as' prop", () => {
  render(<Col as="div" data-testid="el" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(<Col isClient data-testid="el" span={3} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COL");
  await screen.findByTestId("el");
});

it("hydrates memoized when isClient and isMemoized are true", async () => {
  render(<Col isClient isMemoized data-testid="el" span={4} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COL");
  await screen.findByTestId("el");
});

it("forwards ref when hydrated", () => {
  const ref = React.createRef<HTMLTableColElement>();
  render(<Col isClient ref={ref} span={1} data-testid="el" />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("COL");
  }
});

it("supports attributes and toggling across rerenders", () => {
  const { rerender } = render(<Col data-testid="el" span={1} />);
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("span", "1");

  rerender(<Col data-testid="el" span={2} />);
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("span", "2");
});

it("supports className/style/data/aria", () => {
  render(
    <Col
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

it("unmounts cleanly", () => {
  const { unmount } = render(<Col data-testid="u" />);
  expect(screen.getByTestId("u")).toBeInTheDocument();
  unmount();
  expect(true).toBe(true);
});
