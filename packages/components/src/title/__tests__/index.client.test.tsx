import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTitleClient, TitleClient } from "../index.client";

it("renders title into head (client)", () => {
  render(<TitleClient>Client Title</TitleClient>, {
    container: document.head as unknown as HTMLElement,
  });
  expect(document.title).toBe("Client Title");
});

it("renders memoized title into head (client)", () => {
  render(<MemoizedTitleClient>Memo Title</MemoizedTitleClient>, {
    container: document.head as unknown as HTMLElement,
  });
  expect(document.title).toBe("Memo Title");
});
