import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MapClient, MemoizedMapClient } from "../index.client";

it("renders a map element (client)", () => {
  render(
    <MapClient data-testid="el" name="x">
      <area href="#a" />
    </MapClient>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("MAP");
});

it("renders a memoized map element (client)", () => {
  render(
    <MemoizedMapClient data-testid="el" name="y">
      <area href="#b" />
    </MemoizedMapClient>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("MAP");
});
