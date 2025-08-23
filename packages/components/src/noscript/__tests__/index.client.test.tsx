import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedNoscriptClient, NoscriptClient } from "../index.client";

it("renders noscript (client)", () => {
  const { container } = render(
    <NoscriptClient>
      <div>Client</div>
    </NoscriptClient>
  );
  const node = container.querySelector("noscript");
  expect(node).not.toBeNull();
});

it("renders noscript (client, memoized)", () => {
  const { container } = render(
    <MemoizedNoscriptClient>
      <div>Client</div>
    </MemoizedNoscriptClient>
  );
  const node = container.querySelector("noscript");
  expect(node).not.toBeNull();
});
