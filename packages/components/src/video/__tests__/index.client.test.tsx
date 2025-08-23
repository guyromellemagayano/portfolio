import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedVideoClient, VideoClient } from "../index.client";

it("renders a video element (client) with controls", () => {
  render(<VideoClient data-testid="el" controls />);
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("VIDEO");
});

it("renders a memoized video element (client)", () => {
  render(<MemoizedVideoClient data-testid="el" />);
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("VIDEO");
});
