import { render } from "@testing-library/react";
import { expect, it } from "vitest";

it("renders a wbr element inside text", () => {
  render(
    <p>
      super
      <wbr data-testid="el" />
      long
    </p>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("WBR");
});
