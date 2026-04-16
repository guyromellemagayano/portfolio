import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedMetaClient, MetaClient } from "../index.client";

it("renders meta into document.head (client)", () => {
  render(<MetaClient charSet="utf-8" />, {
    container: document.head as unknown as HTMLElement,
  });
  const meta = document.head!.querySelector('meta[charset="utf-8"]');
  expect(meta).not.toBeNull();
});

it("renders memoized meta into document.head (client)", () => {
  render(<MemoizedMetaClient httpEquiv="refresh" content="0" />, {
    container: document.head as unknown as HTMLElement,
  });
  const meta = document.head!.querySelector(
    'meta[http-equiv="refresh"][content="0"]'
  );
  expect(meta).not.toBeNull();
});
