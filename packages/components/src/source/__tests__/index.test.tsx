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

it.skip("filters source-only props when rendered as div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Source as="div" data-testid="src-as-div" src="/a.mp4" type="video/mp4" />
  );
  const el = document.querySelector('[data-testid="src-as-div"]');
  expect(el!.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("src");
  expect(el).not.toHaveAttribute("type");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});
