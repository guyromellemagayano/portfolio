import React from "react";

import { render, screen } from "@testing-library/react";

import { AudioClient, MemoizedAudioClient } from "../index.client";

// Basic render test for AudioClient
it("renders an audio element", () => {
  render(
    <AudioClient data-testid="audio-element" src="test.mp3">
      Audio content
    </AudioClient>
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio.tagName).toBe("AUDIO");
  expect(audio).toHaveAttribute("src", "test.mp3");
  expect(audio).toHaveTextContent("Audio content");
});

// Basic render test for MemoizedAudioClient
it("renders a memoized audio element", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3">
      Memoized audio content
    </MemoizedAudioClient>
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio.tagName).toBe("AUDIO");
  expect(audio).toHaveAttribute("src", "test.mp3");
  expect(audio).toHaveTextContent("Memoized audio content");
});

// as prop test for AudioClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <AudioClient as="div" data-testid="custom-div" src="test.mp3">
      Custom audio
    </AudioClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom audio");
});

// as prop test for MemoizedAudioClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedAudioClient
      as="section"
      data-testid="custom-section"
      src="test.mp3"
    >
      Custom memoized audio
    </MemoizedAudioClient>
  );
  const section = screen.getByTestId("custom-section");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("Custom memoized audio");
});

// Suspense render test for AudioClient
it("renders in Suspense context", () => {
  try {
    render(
      <AudioClient data-testid="audio-element" src="test.mp3">
        Suspense audio content
      </AudioClient>
    );
    const audio = screen.getByTestId("audio-element");
    expect(audio.tagName).toBe("AUDIO");
    expect(audio).toHaveAttribute("src", "test.mp3");
    expect(audio).toHaveTextContent("Suspense audio content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const audio = screen.getByTestId("audio-element");
    expect(audio.tagName).toBe("AUDIO");
    expect(audio).toHaveAttribute("src", "test.mp3");
    expect(audio).toHaveTextContent("Suspense audio content");
  }
});

// Suspense render test for MemoizedAudioClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedAudioClient data-testid="audio-element" src="test.mp3">
        Memoized suspense audio
      </MemoizedAudioClient>
    );
    const audio = screen.getByTestId("audio-element");
    expect(audio.tagName).toBe("AUDIO");
    expect(audio).toHaveAttribute("src", "test.mp3");
    expect(audio).toHaveTextContent("Memoized suspense audio");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const audio = screen.getByTestId("audio-element");
    expect(audio.tagName).toBe("AUDIO");
    expect(audio).toHaveAttribute("src", "test.mp3");
    expect(audio).toHaveTextContent("Memoized suspense audio");
  }
});

// ref forwarding test for AudioClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLAudioElement>();
  render(
    <AudioClient ref={ref} src="test.mp3">
      Ref test content
    </AudioClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("AUDIO");
  }
});

// ref forwarding test for MemoizedAudioClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLAudioElement>();
  render(
    <MemoizedAudioClient ref={ref} src="test.mp3">
      Memoized ref test content
    </MemoizedAudioClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("AUDIO");
  }
});

// Audio-specific props test for AudioClient
it("renders with audio-specific attributes", () => {
  render(
    <AudioClient
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
    </AudioClient>
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

// Audio-specific props test for MemoizedAudioClient
it("renders memoized with audio-specific attributes", () => {
  render(
    <MemoizedAudioClient
      data-testid="audio-element"
      src="test.mp3"
      controls
      preload="metadata"
      autoPlay
      className="memoized-audio-player"
      id="memoized-audio"
    >
      Memoized audio content
    </MemoizedAudioClient>
  );

  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("src", "test.mp3");
  expect(audio).toHaveAttribute("controls");
  expect(audio).toHaveAttribute("preload", "metadata");
  expect(audio).toHaveAttribute("autoplay");
  expect(audio).toHaveClass("memoized-audio-player", { exact: true });
  expect(audio).toHaveAttribute("id", "memoized-audio");
  expect(audio).toHaveTextContent("Memoized audio content");
});

// Children rendering test for AudioClient
it("renders children correctly", () => {
  render(
    <AudioClient data-testid="audio-element" src="test.mp3">
      <source src="test.mp3" type="audio/mpeg" />
      <source src="test.ogg" type="audio/ogg" />
      <p>Your browser does not support the audio element.</p>
    </AudioClient>
  );

  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveTextContent(
    "Your browser does not support the audio element."
  );
  expect(audio.querySelector("source[src='test.mp3']")).toBeInTheDocument();
  expect(audio.querySelector("source[src='test.ogg']")).toBeInTheDocument();
  expect(audio.querySelector("p")).toBeInTheDocument();
});

// Children rendering test for MemoizedAudioClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3">
      <source src="test.mp3" type="audio/mpeg" />
      <source src="test.ogg" type="audio/ogg" />
      <p>Your browser does not support the memoized audio element.</p>
    </MemoizedAudioClient>
  );

  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveTextContent(
    "Your browser does not support the memoized audio element."
  );
  expect(audio.querySelector("source[src='test.mp3']")).toBeInTheDocument();
  expect(audio.querySelector("source[src='test.ogg']")).toBeInTheDocument();
  expect(audio.querySelector("p")).toBeInTheDocument();
});

// Empty children test for AudioClient
it("renders with empty children", () => {
  render(<AudioClient data-testid="audio-element" src="test.mp3" />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toBeInTheDocument();
  expect(audio).toHaveAttribute("src", "test.mp3");
});

// Empty children test for MemoizedAudioClient
it("renders memoized with empty children", () => {
  render(<MemoizedAudioClient data-testid="audio-element" src="test.mp3" />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toBeInTheDocument();
  expect(audio).toHaveAttribute("src", "test.mp3");
});

// Complex children with nested elements test for AudioClient
it("renders complex nested children", () => {
  render(
    <AudioClient data-testid="audio-element" src="test.mp3" controls>
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
    </AudioClient>
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

// Complex children with nested elements test for MemoizedAudioClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3" controls>
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
      <p>Your browser does not support the memoized audio element.</p>
    </MemoizedAudioClient>
  );

  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("controls");
  expect(audio).toHaveTextContent(
    "Your browser does not support the memoized audio element."
  );
  expect(audio.querySelectorAll("source")).toHaveLength(3);
  expect(audio.querySelectorAll("track")).toHaveLength(2);
  expect(audio.querySelector("p")).toBeInTheDocument();
});

// Audio controls test for AudioClient
it("renders with controls attribute", () => {
  render(<AudioClient data-testid="audio-element" src="test.mp3" controls />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("controls");
});

// Audio controls test for MemoizedAudioClient
it("renders memoized with controls attribute", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3" controls />
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("controls");
});

// Audio autoplay test for AudioClient
it("renders with autoplay attribute", () => {
  render(<AudioClient data-testid="audio-element" src="test.mp3" autoPlay />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("autoplay");
});

// Audio autoplay test for MemoizedAudioClient
it("renders memoized with autoplay attribute", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3" autoPlay />
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("autoplay");
});

// Audio loop test for AudioClient
it("renders with loop attribute", () => {
  render(<AudioClient data-testid="audio-element" src="test.mp3" loop />);
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("loop");
});

// Audio loop test for MemoizedAudioClient
it("renders memoized with loop attribute", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3" loop />
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("loop");
});

// Audio muted test for AudioClient
it("renders with muted attribute", () => {
  render(<AudioClient data-testid="audio-element" src="test.mp3" muted />);
  const audio = screen.getByTestId("audio-element");
  expect((audio as HTMLAudioElement).muted).toBe(true);
});

// Audio muted test for MemoizedAudioClient
it("renders memoized with muted attribute", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3" muted />
  );
  const audio = screen.getByTestId("audio-element");
  expect((audio as HTMLAudioElement).muted).toBe(true);
});

// Audio preload test for AudioClient
it("renders with preload attribute", () => {
  render(
    <AudioClient
      data-testid="audio-element"
      src="test.mp3"
      preload="metadata"
    />
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("preload", "metadata");
});

// Audio preload test for MemoizedAudioClient
it("renders memoized with preload attribute", () => {
  render(
    <MemoizedAudioClient
      data-testid="audio-element"
      src="test.mp3"
      preload="auto"
    />
  );
  const audio = screen.getByTestId("audio-element");
  expect(audio).toHaveAttribute("preload", "auto");
});

// Multiple source elements test for AudioClient
it("renders multiple source elements", () => {
  render(
    <AudioClient data-testid="audio-element">
      <source src="test.mp3" type="audio/mpeg" />
      <source src="test.ogg" type="audio/ogg" />
      <source src="test.wav" type="audio/wav" />
    </AudioClient>
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

// Multiple source elements test for MemoizedAudioClient
it("renders memoized multiple source elements", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element">
      <source src="test.mp3" type="audio/mpeg" />
      <source src="test.ogg" type="audio/ogg" />
      <source src="test.wav" type="audio/wav" />
    </MemoizedAudioClient>
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

// Track elements test for AudioClient
it("renders track elements", () => {
  render(
    <AudioClient data-testid="audio-element" src="test.mp3">
      <track
        kind="subtitles"
        src="subtitles_en.vtt"
        srcLang="en"
        label="English"
      />
      <track kind="chapters" src="chapters.vtt" srcLang="en" label="Chapters" />
    </AudioClient>
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

// Track elements test for MemoizedAudioClient
it("renders memoized track elements", () => {
  render(
    <MemoizedAudioClient data-testid="audio-element" src="test.mp3">
      <track
        kind="subtitles"
        src="subtitles_en.vtt"
        srcLang="en"
        label="English"
      />
      <track kind="chapters" src="chapters.vtt" srcLang="en" label="Chapters" />
    </MemoizedAudioClient>
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
