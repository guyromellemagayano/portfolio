import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Style } from "..";

it("renders a style element in document.head with CSS text", () => {
  const css = ".btn{color:red}";
  render(
    <Style data-testid="el" media="all">
      {css}
    </Style>,
    { container: document.head as unknown as HTMLElement }
  );
  const el = document.head!.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("STYLE");
  expect(el).toHaveAttribute("media", "all");
  expect(el!.textContent).toContain(".btn{color:red}");
});

it.skip("adds dev debug attributes in development (head-scoped)", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const css = ".x{display:block}";
  render(<Style data-testid="dbg">{css}</Style>, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('style[data-testid="dbg"]');
  expect(el).not.toBeNull();
  expect(el).toHaveAttribute("data-component", "Style");
  expect(el).toHaveAttribute("data-as", "style");
  process.env.NODE_ENV = original;
});

it.skip("filters style-only props when rendered as div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  const css = ".x{color:red}";
  render(
    <Style as="div" data-testid="sty-as-div" media="print" type="text/css">
      {css}
    </Style>
  );
  const el = document.querySelector('[data-testid="sty-as-div"]');
  expect(el!.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("media");
  expect(el).not.toHaveAttribute("type");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});
