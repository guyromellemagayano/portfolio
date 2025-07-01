import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Audio, type AudioProps, AudioUtils } from "./index";
import { AudioClient, MemoizedAudioClient } from "./index.client";

// =============================================================================
// MOCKS & SETUP
// =============================================================================

// Mock window.gtag for analytics testing
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

// Mock HTMLAudioElement methods
beforeEach(() => {
  vi.clearAllMocks();
  mockGtag.mockClear();

  // Mock HTMLAudioElement prototype methods
  HTMLAudioElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  HTMLAudioElement.prototype.pause = vi.fn();
  HTMLAudioElement.prototype.load = vi.fn();

  // Mock audio properties
  Object.defineProperty(HTMLAudioElement.prototype, "duration", {
    writable: true,
    value: 180, // 3 minutes
  });
  Object.defineProperty(HTMLAudioElement.prototype, "currentTime", {
    writable: true,
    value: 0,
  });
  Object.defineProperty(HTMLAudioElement.prototype, "volume", {
    writable: true,
    value: 1,
  });
  Object.defineProperty(HTMLAudioElement.prototype, "muted", {
    writable: true,
    value: false,
  });
});

// =============================================================================
// BASIC RENDERING TESTS
// =============================================================================

describe("Audio Component", () => {
  const defaultProps: AudioProps = {
    src: "test-audio.mp3",
    children: "Your browser does not support the audio element.",
  };

  it("renders with default props", () => {
    render(<Audio {...defaultProps} />);

    const audio = screen.getByRole("application");
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute("src", "test-audio.mp3");
    expect(audio).toHaveClass("audio");
    expect(audio).toHaveAttribute("controls");
  });

  it("renders without controls when customControls is true", () => {
    render(<Audio {...defaultProps} customControls />);

    const audio = screen.getByRole("application");
    expect(audio).not.toHaveAttribute("controls");
    expect(audio).toHaveClass("audio--custom-controls");
  });

  it("shows loading state with custom controls", () => {
    render(
      <Audio {...defaultProps} customControls loadingContent="Loading..." />
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state with custom controls", () => {
    const { rerender } = render(<Audio {...defaultProps} customControls />);

    // Simulate error
    const audio = screen.getByRole("application");
    fireEvent.error(audio);

    rerender(
      <Audio {...defaultProps} customControls errorContent="Error occurred" />
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  it("handles play event", () => {
    const onPlayStart = vi.fn();
    render(<Audio {...defaultProps} onPlayStart={onPlayStart} />);

    const audio = screen.getByRole("application");
    fireEvent.play(audio);

    expect(onPlayStart).toHaveBeenCalledTimes(1);
  });

  it("handles pause event", () => {
    const onPlayPause = vi.fn();
    render(<Audio {...defaultProps} onPlayPause={onPlayPause} />);

    const audio = screen.getByRole("application");
    fireEvent.pause(audio);

    expect(onPlayPause).toHaveBeenCalledTimes(1);
  });

  it("handles ended event", () => {
    const onPlayEnd = vi.fn();
    render(<Audio {...defaultProps} onPlayEnd={onPlayEnd} />);

    const audio = screen.getByRole("application");
    fireEvent.ended(audio);

    expect(onPlayEnd).toHaveBeenCalledTimes(1);
  });

  it("handles volume change", () => {
    const onVolumeChangeCallback = vi.fn();
    render(
      <Audio
        {...defaultProps}
        onVolumeChangeCallback={onVolumeChangeCallback}
      />
    );

    const audio = screen.getByRole("application") as HTMLAudioElement;
    Object.defineProperty(audio, "volume", { value: 0.5, writable: true });
    fireEvent.volumeChange(audio);

    expect(onVolumeChangeCallback).toHaveBeenCalledWith(0.5);
  });

  it("tracks analytics on play", () => {
    render(<Audio {...defaultProps} analyticsId="test-audio" />);

    const audio = screen.getByRole("application") as HTMLAudioElement;
    Object.defineProperty(audio, "duration", { value: 120 });
    Object.defineProperty(audio, "currentTime", { value: 30 });
    fireEvent.play(audio);

    expect(mockGtag).toHaveBeenCalledWith("event", "play", {
      event_category: "audio",
      event_label: "test-audio",
      audio_duration: 120,
      audio_position: 30,
      audio_progress: 25,
    });
  });

  it("uses custom analytics function", () => {
    const onAnalytics = vi.fn();
    render(<Audio {...defaultProps} onAnalytics={onAnalytics} />);

    const audio = screen.getByRole("application") as HTMLAudioElement;
    Object.defineProperty(audio, "duration", { value: 100 });
    Object.defineProperty(audio, "currentTime", { value: 50 });
    fireEvent.play(audio);

    expect(onAnalytics).toHaveBeenCalledWith({
      event: "play",
      category: "audio",
      label: "audio-play",
      action: "start",
      duration: 100,
      position: 50,
    });
  });

  it("applies custom className", () => {
    render(<Audio {...defaultProps} className="custom-audio" />);

    const audio = screen.getByRole("application");
    expect(audio).toHaveClass("custom-audio");
  });

  it("applies custom styles", () => {
    render(<Audio {...defaultProps} style={{ width: "300px" }} />);

    const audio = screen.getByRole("application");
    expect(audio).toHaveStyle({ width: "300px" });
  });

  it("validates audio source", () => {
    render(<Audio {...defaultProps} src="invalid-source" />);

    const audio = screen.getByRole("application");
    expect(audio).toHaveAttribute("data-valid-source", "false");
  });

  it("detects audio format", () => {
    render(<Audio {...defaultProps} src="audio.wav" />);

    const audio = screen.getByRole("application");
    expect(audio).toHaveAttribute("data-audio-format", "WAV");
  });

  it("handles disabled state for custom controls", () => {
    const { rerender } = render(<Audio {...defaultProps} customControls />);

    // Simulate audio can play
    const audio = screen.getByRole("application");
    fireEvent.canPlay(audio);

    rerender(<Audio {...defaultProps} customControls />);

    // Check that controls are rendered
    const wrapper = audio.closest(".audio-wrapper");
    expect(wrapper).toBeInTheDocument();
  });

  it("handles time updates", () => {
    render(<Audio {...defaultProps} />);

    const audio = screen.getByRole("application") as HTMLAudioElement;
    Object.defineProperty(audio, "currentTime", { value: 45 });
    Object.defineProperty(audio, "duration", { value: 180 });
    fireEvent.timeUpdate(audio);

    // State is updated internally - component continues to work
    expect(audio).toBeInTheDocument();
  });

  it("handles load start", () => {
    render(<Audio {...defaultProps} />);

    const audio = screen.getByRole("application");
    fireEvent.loadStart(audio);

    expect(audio).toBeInTheDocument();
  });

  it("renders with different playback rates", () => {
    render(<Audio {...defaultProps} playbackRate={1.5} />);

    const audio = screen.getByRole("application");
    expect(audio).toBeInTheDocument();
  });

  it("renders with default volume", () => {
    render(<Audio {...defaultProps} defaultVolume={0.7} />);

    const audio = screen.getByRole("application");
    expect(audio).toBeInTheDocument();
  });

  it("renders muted by default", () => {
    render(<Audio {...defaultProps} defaultMuted />);

    const audio = screen.getByRole("application");
    expect(audio).toBeInTheDocument();
  });

  // Client component tests
  it("renders AudioClient component", () => {
    render(<AudioClient {...defaultProps} />);

    const audio = screen.getByRole("application");
    expect(audio).toBeInTheDocument();
  });

  it("renders MemoizedAudioClient component", () => {
    render(<MemoizedAudioClient {...defaultProps} />);

    const audio = screen.getByRole("application");
    expect(audio).toBeInTheDocument();
  });

  // Utility function tests
  describe("AudioUtils", () => {
    it("formats time correctly", () => {
      expect(AudioUtils.formatTime(65)).toBe("01:05");
      expect(AudioUtils.formatTime(125)).toBe("02:05");
      expect(AudioUtils.formatTime(0)).toBe("00:00");
      expect(AudioUtils.formatTime(NaN)).toBe("00:00");
      expect(AudioUtils.formatTime(Infinity)).toBe("00:00");
    });

    it("validates audio sources", () => {
      expect(AudioUtils.validateSource("audio.mp3")).toBe(true);
      expect(AudioUtils.validateSource("audio.wav")).toBe(true);
      expect(AudioUtils.validateSource("data:audio/mp3;base64,abc")).toBe(true);
      expect(AudioUtils.validateSource("blob:audio")).toBe(true);
      expect(AudioUtils.validateSource("https://example.com/audio.mp3")).toBe(
        true
      );
      expect(AudioUtils.validateSource("invalid")).toBe(false);
      expect(AudioUtils.validateSource("")).toBe(false);
      expect(AudioUtils.validateSource(undefined)).toBe(false);
    });

    it("gets audio format", () => {
      expect(AudioUtils.getFormat("audio.mp3")).toBe("MP3");
      expect(AudioUtils.getFormat("audio.wav")).toBe("WAV");
      expect(AudioUtils.getFormat("data:audio/ogg;base64,abc")).toBe("OGG");
      expect(AudioUtils.getFormat("invalid")).toBe("Unknown");
      expect(AudioUtils.getFormat(undefined)).toBe("Unknown");
    });
  });

  // NOTE: Client-side rendering is not tested in unit tests as it's just
  // a thin wrapper around the server component with zero business logic
});

// =============================================================================
// CUSTOM CONTROLS TESTS
// =============================================================================

describe("Audio Component - Custom Controls", () => {
  it("should render custom controls when enabled", () => {
    render(<Audio src="test.mp3" customControls />);

    expect(screen.getByLabelText("Play audio")).toBeInTheDocument();
    expect(screen.getByLabelText("Audio progress")).toBeInTheDocument();
    expect(screen.getByLabelText("Volume control")).toBeInTheDocument();
    expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();
  });

  it("should not render native controls when custom controls enabled", () => {
    render(<Audio src="test.mp3" customControls />);
    const audio = screen.getByRole("application", { hidden: true });
    expect(audio).not.toHaveAttribute("controls");
  });

  it("should toggle play/pause with custom controls", async () => {
    const user = userEvent.setup();
    render(<Audio src="test.mp3" customControls />);

    const playButton = screen.getByLabelText("Play audio");
    await user.click(playButton);

    expect(HTMLAudioElement.prototype.play).toHaveBeenCalled();
    expect(playButton).toHaveTextContent("⏸️");
  });

  it("should handle volume slider changes", async () => {
    const user = userEvent.setup();
    const onVolumeChange = vi.fn();

    render(
      <Audio
        src="test.mp3"
        customControls
        onVolumeChangeCallback={onVolumeChange}
      />
    );

    const volumeSlider = screen.getByLabelText("Volume control");
    fireEvent.change(volumeSlider, { target: { value: "50" } });

    expect(onVolumeChange).toHaveBeenCalledWith(0.5);
  });

  it("should toggle mute state", async () => {
    const user = userEvent.setup();
    render(<Audio src="test.mp3" customControls />);

    const muteButton = screen.getByLabelText("Mute audio");
    await user.click(muteButton);

    expect(muteButton).toHaveAttribute("aria-label", "Unmute audio");
    expect(muteButton).toHaveTextContent("🔇");
  });

  it("should show/hide control elements based on props", () => {
    render(
      <Audio
        src="test.mp3"
        customControls
        showPlayButton={false}
        showVolumeControl={false}
        showTimeDisplay={false}
        showProgressBar={false}
      />
    );

    expect(screen.queryByLabelText("Play audio")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Volume control")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Current time")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Audio progress")).not.toBeInTheDocument();
  });
});

// =============================================================================
// STATE MANAGEMENT TESTS
// =============================================================================

describe("Audio Component - State Management", () => {
  it("should handle loading state with custom controls", () => {
    render(<Audio src="test.mp3" customControls />);

    // Component starts in loading state, showing loading message
    expect(screen.getByRole("status")).toHaveTextContent("Loading audio...");
  });

  it("should handle error state", () => {
    render(
      <Audio
        src="invalid.mp3"
        customControls
        errorContent="Failed to load audio"
      />
    );

    // Find audio element and trigger error
    const audioElement = screen.getByRole("application", { hidden: true });
    fireEvent.error(audioElement);

    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load audio");
  });

  it("should update time display during playback", () => {
    render(<Audio src="test.mp3" customControls />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.timeUpdate(audio);

    expect(screen.getByLabelText("Current time")).toHaveTextContent("00:00");
    expect(screen.getByLabelText("Total duration")).toHaveTextContent(
      "/ 03:00"
    );
  });

  it("should handle progress bar changes", async () => {
    const user = userEvent.setup();
    render(<Audio src="test.mp3" customControls />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.canPlay(audio);

    const progressBar = screen.getByLabelText("Audio progress");
    fireEvent.change(progressBar, { target: { value: "50" } });

    // Should update currentTime based on progress
    expect(progressBar).toHaveValue("50");
  });
});

// =============================================================================
// ANALYTICS TESTS
// =============================================================================

describe("Audio Component - Analytics", () => {
  it("should fire analytics on play with native controls", () => {
    render(<Audio src="test.mp3" analyticsId="test-audio" />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.play(audio);

    expect(mockGtag).toHaveBeenCalledWith("event", "play", {
      event_category: "audio",
      event_label: "test-audio",
      audio_duration: 0,
      audio_position: 0,
      audio_progress: 0,
    });
  });

  it("should fire analytics on pause with native controls", () => {
    render(<Audio src="test.mp3" analyticsId="test-audio" />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.pause(audio);

    expect(mockGtag).toHaveBeenCalledWith("event", "pause", {
      event_category: "audio",
      event_label: "test-audio",
      audio_duration: 0,
      audio_position: 0,
      audio_progress: 0,
    });
  });

  it("should use custom analytics callback", () => {
    const onAnalytics = vi.fn();
    render(<Audio src="test.mp3" onAnalytics={onAnalytics} />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.play(audio);

    expect(onAnalytics).toHaveBeenCalledWith({
      event: "play",
      category: "audio",
      label: "audio-play",
      action: "start",
      duration: 0,
      position: 0,
    });
  });
});

// =============================================================================
// EVENT HANDLING TESTS
// =============================================================================

describe("Audio Component - Event Handling", () => {
  it("should call onPlayStart callback", () => {
    const onPlayStart = vi.fn();
    render(<Audio src="test.mp3" onPlayStart={onPlayStart} />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.play(audio);

    expect(onPlayStart).toHaveBeenCalled();
  });

  it("should call onPlayPause callback", () => {
    const onPlayPause = vi.fn();
    render(<Audio src="test.mp3" onPlayPause={onPlayPause} />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.pause(audio);

    expect(onPlayPause).toHaveBeenCalled();
  });

  it("should call onPlayEnd callback", () => {
    const onPlayEnd = vi.fn();
    render(<Audio src="test.mp3" onPlayEnd={onPlayEnd} />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.ended(audio);

    expect(onPlayEnd).toHaveBeenCalled();
  });

  it("should handle original event handlers", () => {
    const onPlay = vi.fn();
    const onPause = vi.fn();
    const onEnded = vi.fn();

    render(
      <Audio
        src="test.mp3"
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      />
    );

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.play(audio);
    fireEvent.pause(audio);
    fireEvent.ended(audio);

    expect(onPlay).toHaveBeenCalled();
    expect(onPause).toHaveBeenCalled();
    expect(onEnded).toHaveBeenCalled();
  });
});

// =============================================================================
// ACCESSIBILITY TESTS
// =============================================================================

describe("Audio Component - Accessibility", () => {
  it("should have proper ARIA labels for controls", () => {
    render(<Audio src="test.mp3" customControls />);

    expect(screen.getByLabelText("Play audio")).toBeInTheDocument();
    expect(screen.getByLabelText("Audio progress")).toBeInTheDocument();
    expect(screen.getByLabelText("Volume control")).toBeInTheDocument();
    expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();
  });

  it("should support keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Audio src="test.mp3" customControls />);

    const playButton = screen.getByLabelText("Play audio");
    await user.tab();
    expect(playButton).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(HTMLAudioElement.prototype.play).toHaveBeenCalled();
  });

  it("should have proper ARIA roles for states", () => {
    render(
      <Audio
        src="invalid.mp3"
        customControls
        errorContent="Error loading audio"
      />
    );

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.error(audio);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

// =============================================================================
// CLIENT COMPONENT TESTS
// =============================================================================

describe("AudioClient Component", () => {
  it("should render AudioClient component", () => {
    render(<AudioClient src="test.mp3" />);
    expect(
      screen.getByRole("application", { hidden: true })
    ).toBeInTheDocument();
  });

  it("should render MemoizedAudioClient component", () => {
    render(<MemoizedAudioClient src="test.mp3" />);
    expect(
      screen.getByRole("application", { hidden: true })
    ).toBeInTheDocument();
  });

  it("should forward ref to audio element", () => {
    const ref = React.createRef<HTMLAudioElement>();
    render(<AudioClient src="test.mp3" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLAudioElement);
  });
});

// =============================================================================
// UTILITY FUNCTIONS TESTS
// =============================================================================

describe("AudioUtils", () => {
  describe("formatTime", () => {
    it("should format seconds to MM:SS", () => {
      expect(AudioUtils.formatTime(0)).toBe("00:00");
      expect(AudioUtils.formatTime(65)).toBe("01:05");
      expect(AudioUtils.formatTime(3661)).toBe("61:01");
    });

    it("should handle infinite values", () => {
      expect(AudioUtils.formatTime(Infinity)).toBe("00:00");
      expect(AudioUtils.formatTime(-Infinity)).toBe("00:00");
      expect(AudioUtils.formatTime(NaN)).toBe("00:00");
    });
  });

  describe("validateSource", () => {
    it("should validate audio file extensions", () => {
      expect(AudioUtils.validateSource("audio.mp3")).toBe(true);
      expect(AudioUtils.validateSource("audio.wav")).toBe(true);
      expect(AudioUtils.validateSource("audio.ogg")).toBe(true);
      expect(AudioUtils.validateSource("audio.m4a")).toBe(true);
    });

    it("should validate data URLs", () => {
      expect(AudioUtils.validateSource("data:audio/mp3;base64,xyz")).toBe(true);
    });

    it("should validate blob URLs", () => {
      expect(AudioUtils.validateSource("blob:http://example.com/xyz")).toBe(
        true
      );
    });

    it("should validate HTTP URLs", () => {
      expect(AudioUtils.validateSource("http://example.com/audio.mp3")).toBe(
        true
      );
      expect(AudioUtils.validateSource("https://example.com/audio.wav")).toBe(
        true
      );
    });

    it("should reject invalid sources", () => {
      expect(AudioUtils.validateSource("")).toBe(false);
      expect(AudioUtils.validateSource(undefined)).toBe(false);
      expect(AudioUtils.validateSource("invalid.txt")).toBe(false);
    });
  });

  describe("getFormat", () => {
    it("should extract audio format from URL", () => {
      expect(AudioUtils.getFormat("audio.mp3")).toBe("MP3");
      expect(AudioUtils.getFormat("audio.wav")).toBe("WAV");
      expect(AudioUtils.getFormat("audio.ogg?v=1")).toBe("OGG");
    });

    it("should handle missing or invalid URLs", () => {
      expect(AudioUtils.getFormat("")).toBe("Unknown");
      expect(AudioUtils.getFormat(undefined)).toBe("Unknown");
      expect(AudioUtils.getFormat("no-extension")).toBe("Unknown");
    });
  });
});

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

describe("Audio Component - Integration", () => {
  it("should work with multiple audio sources", () => {
    render(
      <Audio src="primary.mp3">
        <source src="fallback.wav" type="audio/wav" />
        <source src="fallback.ogg" type="audio/ogg" />
      </Audio>
    );

    const audio = screen.getByRole("application", { hidden: true });
    expect(audio).toHaveAttribute("src", "primary.mp3");

    const sources = audio.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("src", "fallback.wav");
    expect(sources[1]).toHaveAttribute("src", "fallback.ogg");
  });

  it("should handle volume change callback", () => {
    const onVolumeChange = vi.fn();
    render(<Audio src="test.mp3" onVolumeChangeCallback={onVolumeChange} />);

    const audio = screen.getByRole("application", { hidden: true });
    fireEvent.volumeChange(audio);

    expect(onVolumeChange).toHaveBeenCalledWith(1);
  });

  it("should render with data attributes", () => {
    render(
      <Audio src="test.mp3" data-testid="test-audio" data-custom="value" />
    );

    const audio = screen.getByTestId("test-audio");
    expect(audio).toHaveAttribute("data-custom", "value");
  });
});

// =============================================================================
// TYPESCRIPT INTEGRATION TESTS
// =============================================================================

describe("Audio Component - TypeScript Integration", () => {
  it("should accept all HTML audio attributes", () => {
    const props: AudioProps = {
      src: "test.mp3",
      autoPlay: true,
      loop: true,
      muted: true,
      controls: true,
      preload: "metadata",
      crossOrigin: "anonymous",
      customControls: true,
      analyticsId: "test",
    };

    render(<Audio {...props} />);
    expect(
      screen.getByRole("application", { hidden: true })
    ).toBeInTheDocument();
  });

  it("should accept data attributes", () => {
    const props: AudioProps = {
      src: "test.mp3",
      "data-testid": "typescript-audio",
      "data-custom-attr": "custom-value",
    };

    render(<Audio {...props} />);
    expect(screen.getByTestId("typescript-audio")).toBeInTheDocument();
  });
});

export {};
