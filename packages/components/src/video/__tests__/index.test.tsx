import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Video } from "..";

it("renders a video element with controls and sources", () => {
  render(
    <Video data-testid="el" controls width={320} height={240} poster="/p.jpg">
      <source src="/a.webm" type="video/webm" />
      <source src="/a.mp4" type="video/mp4" />
    </Video>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("VIDEO");
  expect(el).toHaveAttribute("controls");
  expect(el).toHaveAttribute("poster", "/p.jpg");
  expect(el!.querySelectorAll("source").length).toBe(2);
});

it("toggles preload attribute across rerenders", () => {
  const { rerender } = render(<Video data-testid="el" preload="none" />);
  let el = document.querySelector('[data-testid="el"]');
  expect(el).toHaveAttribute("preload", "none");
  rerender(<Video data-testid="el" preload="auto" />);
  el = document.querySelector('[data-testid="el"]');
  expect(el).toHaveAttribute("preload", "auto");
});

// Polymorphic helper misuse filtering and dev warnings
it.skip("filters video-only props when rendered as span via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  const { rerender } = render(
    <Video
      as="span"
      data-testid="vid-as-span"
      width={320}
      height={240}
      controls
      poster="/p.jpg"
    />
  );
  let el = document.querySelector('[data-testid="vid-as-span"]');
  expect(el!.tagName).toBe("SPAN");
  expect(el).not.toHaveAttribute("width");
  expect(el).not.toHaveAttribute("height");
  expect(el).not.toHaveAttribute("controls");
  expect(el).not.toHaveAttribute("poster");
  expect(warnSpy).toHaveBeenCalled();

  rerender(
    <Video
      data-testid="vid-as-span"
      width={320}
      height={240}
      controls
      poster="/p.jpg"
    />
  );
  el = document.querySelector('[data-testid="vid-as-span"]');
  expect(el!.tagName).toBe("VIDEO");
  expect(el).toHaveAttribute("width", "320");
  expect(el).toHaveAttribute("height", "240");
  expect(el).toHaveAttribute("controls");
  expect(el).toHaveAttribute("poster", "/p.jpg");

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});
