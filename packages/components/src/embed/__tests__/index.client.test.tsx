import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { EmbedClient, MemoizedEmbedClient } from "../index.client";

it("renders an embed element (client)", () => {
  render(<EmbedClient data-testid="el" src="movie.mp4" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("EMBED");
  expect(el).toHaveAttribute("src", "movie.mp4");
});

it("renders memoized embed element (client)", () => {
  render(<MemoizedEmbedClient data-testid="el" src="clip.mp4" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("EMBED");
  expect(el).toHaveAttribute("src", "clip.mp4");
});
