import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { LinkClient, MemoizedLinkClient } from "../index.client";

it("renders link into document.head (client)", () => {
  render(<LinkClient rel="icon" href="/favicon.ico" />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector(
    'link[rel="icon"][href="/favicon.ico"]'
  );
  expect(el).not.toBeNull();
});

it("renders memoized link into document.head (client)", () => {
  render(<MemoizedLinkClient rel="modulepreload" href="/mod.js" />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector(
    'link[rel="modulepreload"][href="/mod.js"]'
  );
  expect(el).not.toBeNull();
});
