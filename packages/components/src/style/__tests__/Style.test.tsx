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
