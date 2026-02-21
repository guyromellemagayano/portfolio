import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Img } from "..";

it("renders an img element with src/alt", () => {
  render(<Img data-testid="el" src="/a.png" alt="a" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("IMG");
  expect(el).toHaveAttribute("src");
  expect(el).toHaveAttribute("alt", "a");
});

it("supports attribute toggles", () => {
  const { rerender } = render(<Img data-testid="el" src="/a.png" alt="a" />);
  rerender(<Img data-testid="el" src="/b.png" alt="b" />);
  const el = screen.getByTestId("el");
  expect(el).toHaveAttribute("alt", "b");
});

it.skip("filters img-only props when rendered as span via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Img
      as="span"
      data-testid="img-as-span"
      src="/a.png"
      alt="a"
      width={100}
      height={50}
    />
  );
  const el = screen.getByTestId("img-as-span");
  expect(el.tagName).toBe("SPAN");
  expect(el).not.toHaveAttribute("src");
  expect(el).not.toHaveAttribute("alt");
  expect(el).not.toHaveAttribute("width");
  expect(el).not.toHaveAttribute("height");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Img data-testid="img-dev" src="/x.png" alt="x" />);
  const el = screen.getByTestId("img-dev");
  expect(el).toHaveAttribute("data-component", "Img");
  expect(el).toHaveAttribute("data-as", "img");
  process.env.NODE_ENV = original;
});
