import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Source } from "..";

it("renders a source element inside picture", () => {
  render(
    <picture>
      <Source data-testid="el" srcSet="/a.webp" type="image/webp" />
      <img src="/a.jpg" alt="a" />
    </picture>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SOURCE");
  expect(el).toHaveAttribute("type", "image/webp");
});

it("renders a source element inside audio/video", () => {
  render(
    <video>
      <Source data-testid="el" src="/a.mp4" type="video/mp4" />
    </video>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SOURCE");
  expect(el).toHaveAttribute("src", "/a.mp4");
});
