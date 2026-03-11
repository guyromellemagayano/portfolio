import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Script } from "..";

it("renders a script element with src in document.head", () => {
  render(<Script data-testid="el" src="/a.js" async type="text/javascript" />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector(
    '[data-testid="el"]'
  ) as HTMLScriptElement | null;
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SCRIPT");
  expect(el).toHaveAttribute("src", "/a.js");
  expect(el).toHaveAttribute("async");
  expect(el).toHaveAttribute("type", "text/javascript");
});

it("renders an inline script in document.head", () => {
  const code = "logger.info(1);";
  render(<Script data-testid="el">{code}</Script>, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector(
    '[data-testid="el"]'
  ) as HTMLScriptElement | null;
  expect(el).not.toBeNull();
  expect(el!.textContent).toContain("logger.info(1);");
});

it.skip("adds dev debug attributes in development (head-scoped)", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Script data-testid="dbg" src="/dbg.js" />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('script[data-testid="dbg"]');
  expect(el).not.toBeNull();
  expect(el).toHaveAttribute("data-component", "Script");
  expect(el).toHaveAttribute("data-as", "script");
  process.env.NODE_ENV = original;
});

it.skip("filters script-only props when rendered as div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Script
      as="div"
      data-testid="scr-as-div"
      src="/x.js"
      async
      defer
      type="module"
    />
  );
  const el = document.querySelector('[data-testid="scr-as-div"]');
  expect(el!.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("src");
  expect(el).not.toHaveAttribute("async");
  expect(el).not.toHaveAttribute("defer");
  expect(el).not.toHaveAttribute("type");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});
