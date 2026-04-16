import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTrackClient, TrackClient } from "../index.client";

it("renders a track (client) within a video", () => {
  render(
    <video>
      <TrackClient data-testid="el" kind="captions" src="/c.vtt" />
    </video>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TRACK");
});

it("renders a memoized track (client)", () => {
  render(
    <video>
      <MemoizedTrackClient data-testid="el" kind="subtitles" src="/s.vtt" />
    </video>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TRACK");
});
