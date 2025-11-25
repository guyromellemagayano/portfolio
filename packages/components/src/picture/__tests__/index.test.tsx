import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Picture } from "..";

it("renders a picture element with sources and img fallback", () => {
  render(
    <Picture data-testid="el" className="pic">
      <source srcSet="/img.avif" type="image/avif" />
      <source srcSet="/img.webp" type="image/webp" />
      <img src="/img.jpg" alt="x" />
    </Picture>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("PICTURE");
  expect(el).toHaveClass("pic");
  const sources = el.querySelectorAll("source");
  expect(sources.length).toBe(2);
  const img = el.querySelector("img");
  expect(img).not.toBeNull();
  expect(img).toHaveAttribute("src", "/img.jpg");
});
