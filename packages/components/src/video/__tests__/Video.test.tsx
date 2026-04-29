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
