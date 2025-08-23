import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedRubyClient, RubyClient } from "../index.client";

it("renders ruby element (client)", () => {
  render(
    <RubyClient>
      漢<rp>(</rp>
      <rt>kan</rt>
      <rp>)</rp>
    </RubyClient>
  );
  const node = document.querySelector("ruby");
  expect(node).not.toBeNull();
});

it("renders memoized ruby element (client)", () => {
  render(
    <MemoizedRubyClient>
      漢<rt>kan</rt>
    </MemoizedRubyClient>
  );
  const node = document.querySelector("ruby");
  expect(node).not.toBeNull();
});
