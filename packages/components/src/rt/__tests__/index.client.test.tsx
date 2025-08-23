import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedRtClient, RtClient } from "../index.client";

it("renders rt element (client)", () => {
  render(
    <ruby>
      漢<RtClient>kan</RtClient>
    </ruby>
  );
  const node = document.querySelector("ruby rt");
  expect(node).not.toBeNull();
});

it("renders memoized rt element (client)", () => {
  render(
    <ruby>
      漢<MemoizedRtClient>kan</MemoizedRtClient>
    </ruby>
  );
  const node = document.querySelector("ruby rt");
  expect(node).not.toBeNull();
});
