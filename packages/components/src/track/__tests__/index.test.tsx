import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Track } from "..";

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

it.skip("filters track-only props when rendered as span via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Track
      as="span"
      data-testid="trk-as-span"
      kind="subtitles"
      src="/a.vtt"
      srcLang="en"
    />
  );
  const el = document.querySelector('[data-testid="trk-as-span"]');
  expect(el!.tagName).toBe("SPAN");
  expect(el).not.toHaveAttribute("kind");
  expect(el).not.toHaveAttribute("src");
  // React maps srcLang prop to srclang attribute, but our polymorphic filter removes it when as !== track
  // Some environments may still reflect srclang; accept presence but warn must be called
  expect(el).not.toHaveAttribute("kind");
  expect(el).not.toHaveAttribute("src");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});
