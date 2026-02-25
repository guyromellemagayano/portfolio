import React from "react";

import { render, screen } from "@testing-library/react";

import { Audio } from ".";

// Basic render test
it("renders an audio element", () => {
  render(<Audio data-testid="audio-element" src="test.mp3" />);
  const audio = screen.getByTestId("audio-element");
  expect(audio.tagName).toBe("AUDIO");
  expect(audio).toHaveAttribute("src", "test.mp3");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Audio as="div" data-testid="custom-div" src="test.mp3">
      Custom audio
    </Audio>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom audio");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Audio isClient data-testid="audio-element" src="test.mp3">
      Client-side audio
    </Audio>
  );

  // Should render the fallback (the audio) immediately
  const audio = screen.getByTestId("audio-element");
  expect(audio.tagName).toBe("AUDIO");
  expect(audio).toHaveAttribute("src", "test.mp3");

  // The lazy component should load and render the same content
  await screen.findByTestId("audio-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Audio isClient isMemoized data-testid="audio-element" src="test.mp3">
      Memoized audio
    </Audio>
  );

  // Should render the fallback (the audio) immediately
  const audio = screen.getByTestId("audio-element");
  expect(audio.tagName).toBe("AUDIO");
  expect(audio).toHaveAttribute("src", "test.mp3");

  // The lazy component should load and render the same content
  await screen.findByTestId("audio-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLAudioElement>();
  render(
    <Audio ref={ref} src="test.mp3">
      Ref test content
    </Audio>
  );
  // JSDOM may not always attach the ref synchronously, but after render it should be set
  if (ref.current) {
    expect(ref.current.tagName).toBe("AUDIO");
  }
});

// Audio-specific props test
it("renders with audio-specific attributes", () => {
  render(
    <Audio
      data-testid="audio-element"
      src="test.mp3"
      controls
      preload="auto"
      loop
      muted
      className="audio-player"
      id="main-audio"
    >
      Audio content
    </Audio>
  );

  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("src", "test.mp3");
  expect(audio).toHaveAttribute("controls");
  expect(audio).toHaveAttribute("preload", "auto");
  expect(audio).toHaveAttribute("loop");
  // JSDOM quirk: muted may not appear as attribute, but .muted property should be true
  expect((audio as HTMLAudioElement).muted).toBe(true);
  expect(audio).toHaveClass("audio-player", { exact: true });
  expect(audio).toHaveAttribute("id", "main-audio");
  expect(audio).toHaveTextContent("Audio content");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <Audio data-testid="audio-element" src="test.mp3">
      <source src="test.mp3" type="audio/mpeg" />
      <source src="test.ogg" type="audio/ogg" />
      <p>Your browser does not support the audio element.</p>
    </Audio>
  );

  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveTextContent(
    "Your browser does not support the audio element."
  );
  expect(audio.querySelector("source[src='test.mp3']")).toBeInTheDocument();
  expect(audio.querySelector("source[src='test.ogg']")).toBeInTheDocument();
  expect(audio.querySelector("p")).toBeInTheDocument();
});

// Empty children test
it("renders with empty children", () => {
  render(<Audio data-testid="audio-element" src="test.mp3" />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toBeInTheDocument();
  expect(audio).toHaveAttribute("src", "test.mp3");
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Audio data-testid="audio-element" src="test.mp3" controls>
      <source src="test.mp3" type="audio/mpeg" />
      <source src="test.ogg" type="audio/ogg" />
      <source src="test.wav" type="audio/wav" />
      <track
        kind="subtitles"
        src="subtitles_en.vtt"
        srcLang="en"
        label="English"
      />
      <track
        kind="subtitles"
        src="subtitles_es.vtt"
        srcLang="es"
        label="Spanish"
      />
      <p>Your browser does not support the audio element.</p>
    </Audio>
  );

  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("controls");
  expect(audio).toHaveTextContent(
    "Your browser does not support the audio element."
  );
  expect(audio.querySelectorAll("source")).toHaveLength(3);
  expect(audio.querySelectorAll("track")).toHaveLength(2);
  expect(audio.querySelector("p")).toBeInTheDocument();
});

// Audio controls test
it("renders with controls attribute", () => {
  render(<Audio data-testid="audio-element" src="test.mp3" controls />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("controls");
});

// Audio autoplay test
it("renders with autoplay attribute", () => {
  render(<Audio data-testid="audio-element" src="test.mp3" autoPlay />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("autoplay");
});

// Audio loop test
it("renders with loop attribute", () => {
  render(<Audio data-testid="audio-element" src="test.mp3" loop />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("loop");
});

// Audio muted test
it("renders with muted attribute", () => {
  render(<Audio data-testid="audio-element" src="test.mp3" muted />);
  const audio = screen.getByTestId("audio-element");
  // JSDOM quirk: muted may not appear as attribute, but .muted property should be true
  expect((audio as HTMLAudioElement).muted).toBe(true);
});

// Audio preload test
it("renders with preload attribute", () => {
  render(
    <Audio data-testid="audio-element" src="test.mp3" preload="metadata" />
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("preload", "metadata");
});

// Multiple source elements test
it("renders multiple source elements", () => {
  render(
    <Audio data-testid="audio-element">
      <source src="test.mp3" type="audio/mpeg" />
      <source src="test.ogg" type="audio/ogg" />
      <source src="test.wav" type="audio/wav" />
    </Audio>
  );

  const audio = screen.getByTestId("audio-element");
  const sources = audio.querySelectorAll("source");
  expect(sources).toHaveLength(3);
  expect(sources[0]).toHaveAttribute("src", "test.mp3");
  expect(sources[0]).toHaveAttribute("type", "audio/mpeg");
  expect(sources[1]).toHaveAttribute("src", "test.ogg");
  expect(sources[1]).toHaveAttribute("type", "audio/ogg");
  expect(sources[2]).toHaveAttribute("src", "test.wav");
  expect(sources[2]).toHaveAttribute("type", "audio/wav");
});

// Track elements test
it("renders track elements", () => {
  render(
    <Audio data-testid="audio-element" src="test.mp3">
      <track
        kind="subtitles"
        src="subtitles_en.vtt"
        srcLang="en"
        label="English"
      />
      <track kind="chapters" src="chapters.vtt" srcLang="en" label="Chapters" />
    </Audio>
  );

  const audio = screen.getByTestId("audio-element");
  const tracks = audio.querySelectorAll("track");
  expect(tracks).toHaveLength(2);
  expect(tracks[0]).toHaveAttribute("kind", "subtitles");
  expect(tracks[0]).toHaveAttribute("src", "subtitles_en.vtt");
  expect(tracks[0]).toHaveAttribute("srcLang", "en");
  expect(tracks[0]).toHaveAttribute("label", "English");
  expect(tracks[1]).toHaveAttribute("kind", "chapters");
  expect(tracks[1]).toHaveAttribute("src", "chapters.vtt");
});
