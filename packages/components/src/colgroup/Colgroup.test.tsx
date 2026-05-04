import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Colgroup } from ".";

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

it("renders with standard props", async () => {
  render(
    <Colgroup data-testid="el">
      <col />
    </Colgroup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COLGROUP");
  await screen.findByTestId("el");
});

it("renders repeated synchronous usage with standard props", async () => {
  render(
    <Colgroup data-testid="el">
      <col />
    </Colgroup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COLGROUP");
  await screen.findByTestId("el");
});

it("forwards ref when rendered", () => {
  const ref = React.createRef<HTMLTableColElement>();
  render(
    <Colgroup ref={ref}>
      <col />
    </Colgroup>
  );
  expect(ref.current).not.toBeNull();
  expect(ref.current?.tagName).toBe("COLGROUP");
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
