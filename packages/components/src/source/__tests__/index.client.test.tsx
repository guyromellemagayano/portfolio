import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSourceClient, SourceClient } from "../index.client";

it("renders a source element (client) inside picture", () => {
  render(
    <picture>
      <SourceClient data-testid="el" srcSet="/a.avif" type="image/avif" />
      <img src="/a.jpg" alt="a" />
    </picture>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SOURCE");
});

it("renders a memoized source element (client) inside video", () => {
  render(
    <video>
      <MemoizedSourceClient data-testid="el" src="/a.webm" type="video/webm" />
    </video>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SOURCE");
});
