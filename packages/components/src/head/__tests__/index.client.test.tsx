import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { HeadClient, MemoizedHeadClient } from "../index.client";

it("renders title into document.head (client)", () => {
  render(
    <HeadClient>
      <title>t</title>
    </HeadClient>,
    { container: document.head as unknown as HTMLElement }
  );
  const title = document.head!.querySelector("title");
  expect(title).not.toBeNull();
  if (title) expect(title.textContent).toBe("t");
});

it("renders meta into document.head (client, memoized)", () => {
  render(
    <MemoizedHeadClient>
      <meta name="x" content="y" />
    </MemoizedHeadClient>,
    { container: document.head as unknown as HTMLElement }
  );
  const meta = document.head!.querySelector('meta[name="x"][content="y"]');
  expect(meta).not.toBeNull();
});
