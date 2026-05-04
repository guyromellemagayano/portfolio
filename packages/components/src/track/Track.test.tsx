import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Track } from ".";

it("renders a track within a video", () => {
  render(
    <video>
      <Track
        data-testid="el"
        kind="subtitles"
        src="/sub.vtt"
        srcLang="en"
        label="English"
        default
      />
    </video>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TRACK");
  expect(el).toHaveAttribute("kind", "subtitles");
  expect(el).toHaveAttribute("src", "/sub.vtt");
  expect(el).toHaveAttribute("srclang", "en");
  expect(el).toHaveAttribute("label", "English");
  expect(el).toHaveAttribute("default");
});
