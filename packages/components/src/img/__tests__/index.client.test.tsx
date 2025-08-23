import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { ImgClient, MemoizedImgClient } from "../index.client";

it("renders an img element (client)", () => {
  render(<ImgClient data-testid="el" src="/a.png" alt="a" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("IMG");
});

it("renders memoized img element (client)", () => {
  render(<MemoizedImgClient data-testid="el" src="/b.png" alt="b" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("IMG");
});
