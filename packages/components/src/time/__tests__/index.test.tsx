import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Time } from "..";

it("renders a time element with dateTime", () => {
  render(
    <Time data-testid="el" dateTime="2020-01-02T03:04:05Z">
      Jan 2, 2020
    </Time>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("TIME");
  expect(el).toHaveAttribute("datetime", "2020-01-02T03:04:05Z");
  expect(el).toHaveTextContent("Jan 2, 2020");
});

it("toggles datetime across rerenders", () => {
  const { rerender } = render(
    <Time data-testid="el" dateTime="2020-01-01">
      A
    </Time>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("datetime", "2020-01-01");
  rerender(
    <Time data-testid="el" dateTime="2020-01-02">
      A
    </Time>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("datetime", "2020-01-02");
});
