import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { IframeClient, MemoizedIframeClient } from "../index.client";

it("renders an iframe element (client)", () => {
  render(<IframeClient data-testid="el" src="/a" title="t" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("IFRAME");
  expect(el).toHaveAttribute("src", "/a");
});

it("renders memoized iframe element (client)", () => {
  render(<MemoizedIframeClient data-testid="el" src="/b" title="t" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("IFRAME");
  expect(el).toHaveAttribute("src", "/b");
});
