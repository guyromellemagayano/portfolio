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

it.skip("adds dev debug attributes in development (head-scoped)", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Meta data-testid="dbg" name="robots" content="index,follow" />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('meta[data-testid="dbg"]');
  expect(el).not.toBeNull();
  expect(el).toHaveAttribute("data-component", "Meta");
  expect(el).toHaveAttribute("data-as", "meta");
  process.env.NODE_ENV = original;
});

it.skip("filters meta-only props when rendered as div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Meta
      as="div"
      data-testid="meta-as-div"
      name="viewport"
      content="width=device-width"
      httpEquiv="content-type"
    />
  );
  const el = document.querySelector('[data-testid="meta-as-div"]');
  expect(el!.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("name");
  expect(el).not.toHaveAttribute("content");
  expect(el).not.toHaveAttribute("http-equiv");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});
