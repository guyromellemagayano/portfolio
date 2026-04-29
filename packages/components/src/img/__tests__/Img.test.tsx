import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Img } from "..";

it("renders an img element with src/alt", () => {
  render(<Img data-testid="el" src="/a.png" alt="a" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("IMG");
  expect(el).toHaveAttribute("src");
  expect(el).toHaveAttribute("alt", "a");
});

it("supports attribute toggles", () => {
  const { rerender } = render(<Img data-testid="el" src="/a.png" alt="a" />);
  rerender(<Img data-testid="el" src="/b.png" alt="b" />);
  const el = screen.getByTestId("el");
  expect(el).toHaveAttribute("alt", "b");
});
