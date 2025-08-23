import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedRpClient, RpClient } from "../index.client";

it("renders rp element (client)", () => {
  render(
    <ruby>
      a<RpClient>(</RpClient>
      <rt>x</rt>
      <RpClient>)</RpClient>
    </ruby>
  );
  const node = document.querySelector("ruby rp");
  expect(node).not.toBeNull();
});

it("renders memoized rp element (client)", () => {
  render(
    <ruby>
      a<MemoizedRpClient>(</MemoizedRpClient>
      <rt>x</rt>
      <MemoizedRpClient>)</MemoizedRpClient>
    </ruby>
  );
  const node = document.querySelector("ruby rp");
  expect(node).not.toBeNull();
});
