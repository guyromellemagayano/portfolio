import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Embed } from "..";

it("renders an embed element", () => {
  render(<Embed data-testid="el" src="movie.mp4" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("EMBED");
  expect(el).toHaveAttribute("src", "movie.mp4");
});

it("supports 'as' prop", () => {
  render(<Embed as="div" data-testid="el" />);
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(<Embed isClient data-testid="el" src="movie.mp4" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("EMBED");
  await screen.findByTestId("el");
});
