import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Small } from "..";

it("renders a small element with text", () => {
  render(
    <Small data-testid="el" className="note">
      note
    </Small>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SMALL");
  expect(el).toHaveClass("note");
  expect(el).toHaveTextContent("note");
});

it("toggles class and dir across rerenders", () => {
  const { rerender } = render(
    <Small data-testid="el" className="a" dir="ltr">
      a
    </Small>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  expect(el).toHaveAttribute("dir", "ltr");
  rerender(
    <Small data-testid="el" className="b" dir="rtl">
      b
    </Small>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
  expect(el).toHaveAttribute("dir", "rtl");
});

it("renders via isClient fallback and memoized branch", () => {
  render(
    <Small data-testid="el" isClient>
      c
    </Small>
  );
  expect(screen.getByTestId("el").tagName).toBe("SMALL");
  // memoized branch
  render(
    <Small data-testid="el2" isClient isMemoized>
      d
    </Small>
  );
  expect(screen.getByTestId("el2").tagName).toBe("SMALL");
});

// Note: ref forwarding is handled in client variants; server wrapper does not forward ref in SSR branch
