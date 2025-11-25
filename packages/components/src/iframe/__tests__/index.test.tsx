import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Iframe } from "..";

it("renders an iframe element with src", () => {
  render(<Iframe data-testid="el" src="/page" title="t" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("IFRAME");
  expect(el).toHaveAttribute("src", "/page");
  expect(el).toHaveAttribute("title", "t");
});

it("supports 'as' and attribute toggles", () => {
  const { rerender } = render(<Iframe data-testid="el" src="/a" />);
  expect(screen.getByTestId("el")).toHaveAttribute("src", "/a");
  rerender(<Iframe data-testid="el" src="/b" />);
  expect(screen.getByTestId("el")).toHaveAttribute("src", "/b");
});
