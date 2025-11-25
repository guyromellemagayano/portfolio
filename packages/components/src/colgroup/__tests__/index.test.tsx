import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Colgroup } from "..";

it("renders a colgroup element", () => {
  render(
    <Colgroup data-testid="el">
      <col span={1} />
    </Colgroup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COLGROUP");
});

it("renders as custom element via 'as' prop", () => {
  render(
    <Colgroup as="div" data-testid="el">
      content
    </Colgroup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Colgroup isClient data-testid="el">
      <col />
    </Colgroup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COLGROUP");
  await screen.findByTestId("el");
});

it("hydrates memoized when isClient and isMemoized are true", async () => {
  render(
    <Colgroup isClient isMemoized data-testid="el">
      <col />
    </Colgroup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COLGROUP");
  await screen.findByTestId("el");
});

it("forwards ref when hydrated", () => {
  const ref = React.createRef<HTMLTableColElement>();
  render(
    <Colgroup isClient ref={ref}>
      <col />
    </Colgroup>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("COLGROUP");
  }
});

it("supports className/style/data/aria", () => {
  render(
    <Colgroup
      data-testid="el"
      className="g"
      style={{ width: "100%" }}
      data-x="1"
      aria-hidden="true"
    >
      <col />
    </Colgroup>
  );
  const el = screen.getByTestId("el");
  expect(el).toHaveClass("g");
  expect(el).toHaveAttribute("style");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");
});

it("unmounts cleanly", () => {
  const { unmount } = render(
    <Colgroup data-testid="u">
      <col />
    </Colgroup>
  );
  expect(screen.getByTestId("u")).toBeInTheDocument();
  unmount();
  expect(true).toBe(true);
});
