import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Script } from ".";

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
