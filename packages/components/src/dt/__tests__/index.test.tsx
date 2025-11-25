import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Dt } from "..";

it("renders a dt element", () => {
  render(<Dt data-testid="el">Term</Dt>);
  expect(screen.getByTestId("el").tagName).toBe("DT");
});

it("supports 'as' prop", () => {
  render(
    <Dt as="div" data-testid="el">
      x
    </Dt>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Dt isClient data-testid="el">
      t
    </Dt>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DT");
  await screen.findByTestId("el");
});

it("switches 'as' across rerenders", () => {
  const { rerender } = render(
    <Dt data-testid="poly" as="dt">
      x
    </Dt>
  );
  expect(screen.getByTestId("poly").tagName).toBe("DT");
  rerender(
    <Dt data-testid="poly" as="div">
      x
    </Dt>
  );
  expect(screen.getByTestId("poly").tagName).toBe("DIV");
});

it("toggles classes/styles across rerenders", () => {
  const { rerender } = render(
    <Dt data-testid="styled" className="a" style={{ color: "red" }}>
      s
    </Dt>
  );
  expect(screen.getByTestId("styled")).toHaveClass("a");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <Dt data-testid="styled" className="b c" style={{ color: "green" }}>
      s
    </Dt>
  );
  expect(screen.getByTestId("styled")).toHaveClass("b", "c");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("toggles data/aria across rerenders", () => {
  const { rerender } = render(
    <Dt data-testid="attrs" data-x="1" aria-hidden="true">
      a
    </Dt>
  );
  let el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <Dt data-testid="attrs" aria-hidden="false">
      a
    </Dt>
  );
  el = screen.getByTestId("attrs");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});

it("renders long, special, and unicode content", () => {
  const long = "A".repeat(2000);
  const special = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const unicode = "🚀🎉🎨";
  render(
    <Dt data-testid="text">
      {long}
      {special}
      {unicode}
    </Dt>
  );
  const el = screen.getByTestId("text");
  expect(el).toHaveTextContent(long);
  expect(el).toHaveTextContent(special);
  expect(el).toHaveTextContent(unicode);
});

it("unmounts cleanly", () => {
  const { unmount } = render(<Dt data-testid="u">u</Dt>);
  expect(screen.getByTestId("u")).toBeInTheDocument();
  unmount();
  expect(true).toBe(true);
});
