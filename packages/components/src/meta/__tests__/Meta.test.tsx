import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Meta } from "..";

it("renders meta into document.head", () => {
  render(<Meta name="viewport" content="width=device-width" />, {
    container: document.head as unknown as HTMLElement,
  });
  const meta = document.head!.querySelector(
    'meta[name="viewport"][content="width=device-width"]'
  );
  expect(meta).not.toBeNull();
});

it("toggles meta attributes across rerenders", () => {
  const { rerender } = render(<Meta name="theme-color" content="#fff" />, {
    container: document.head as unknown as HTMLElement,
  });
  let meta = document.head!.querySelector(
    'meta[name="theme-color"][content="#fff"]'
  );
  expect(meta).not.toBeNull();
  rerender(<Meta name="theme-color" content="#000" />);
  meta = document.head!.querySelector(
    'meta[name="theme-color"][content="#000"]'
  );
  expect(meta).not.toBeNull();
});
