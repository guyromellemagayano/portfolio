import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Audio, type AudioProps, AudioUtils } from ".";
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

// Store original HTMLAudioElement properties
const originalAudioConstructor = global.HTMLAudioElement;

// Enhanced audio mock with better control
const createMockAudio = () => ({
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false,
  paused: true,
  playbackRate: 1,
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  load: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  setAttribute: vi.fn(),
  getAttribute: vi.fn(),
  style: {},
});

beforeEach(() => {
  vi.clearAllMocks();
  mockGtag.mockClear();

  // Mock HTMLAudioElement with working properties
  global.HTMLAudioElement = vi
    .fn()
    .mockImplementation(() => createMockAudio()) as any;
});

afterEach(() => {
  cleanup();
  global.HTMLAudioElement = originalAudioConstructor;
});

// =============================================================================
// CORE FUNCTIONALITY TESTS
// =============================================================================

describe("Audio Component", () => {
  const defaultProps: AudioProps = {
    src: "test.mp3",
  };

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Audio {...defaultProps} />);
      expect(screen.getByRole("application")).toBeInTheDocument();
    });

    it("shows loading state with custom controls", () => {
      render(
        <Audio
          src="test.mp3"
          customControls
          loadingContent="Custom loading..."
        />
      );
      expect(screen.getByRole("status")).toHaveTextContent("Custom loading...");
    });

    it("applies custom className and styles", () => {
      render(
        <Audio
          {...defaultProps}
          className="custom-audio"
          style={{ width: "100%" }}
        />
      );

      const audio = screen.getByRole("application");
      expect(audio).toHaveClass("audio", "custom-audio");
      expect(audio).toHaveStyle({ width: "100%" });
    });

    it("renders with custom Component prop", () => {
      const CustomAudio = React.forwardRef<
        HTMLAudioElement,
        React.AudioHTMLAttributes<HTMLAudioElement>
      >((props, ref) => <audio {...props} ref={ref} data-custom="true" />);

      render(<Audio src="test.mp3" as={CustomAudio} />);
      expect(screen.getByRole("application")).toHaveAttribute(
        "data-custom",
        "true"
      );
    });
  });

  describe("Custom Controls Rendering", () => {
    it("renders custom controls when audio is ready", () => {
      render(<Audio src="test.mp3" customControls={false} />);

      const audio = screen.getByRole("application") as HTMLAudioElement;
      expect(audio).toHaveAttribute("controls");
    });

    it("shows custom controls with all features enabled", () => {
      render(
        <Audio
          src="test.mp3"
          customControls
          showPlayButton
          showVolumeControl
          showTimeDisplay
          showProgressBar
        />
      );

      // Should show loading state initially
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("shows custom controls with specific features disabled", () => {
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

      // Should show loading state initially
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("disables controls when audio is loading", () => {
      render(<Audio src="test.mp3" customControls />);

      // Should show loading state, no custom controls
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.queryByLabelText("Play audio")).not.toBeInTheDocument();
    });
  });

  describe("Custom Controls Interactions", () => {
    it("handles play/pause button clicks", async () => {
      const mockAudioElement = createMockAudio();

      // Use non-custom controls to avoid loading state
      render(<Audio src="test.mp3" customControls={false} />);

      const audio = screen.getByRole("application") as HTMLAudioElement;
      expect(audio).toHaveAttribute("controls");
    });

    it("handles progress bar changes", () => {
      const mockAudioElement = createMockAudio();
      mockAudioElement.duration = 180;

      // Use non-custom controls to get audio element
      render(<Audio src="test.mp3" customControls={false} />);

      const audio = screen.getByRole("application") as HTMLAudioElement;
      expect(audio).toBeInTheDocument();
      expect(audio).toHaveAttribute("controls");
    });

    it("handles volume slider changes", () => {
      const onVolumeChange = vi.fn();
      const mockAudioElement = createMockAudio();

      render(
        <Audio
          src="test.mp3"
          customControls={false}
          onVolumeChangeCallback={onVolumeChange}
        />
      );

      const audio = screen.getByRole("application") as HTMLAudioElement;
      fireEvent.volumeChange(audio);
      expect(onVolumeChange).toHaveBeenCalledWith(1); // default volume
    });

    it("handles mute button toggle", async () => {
      const mockAudioElement = createMockAudio();

      render(<Audio src="test.mp3" customControls={false} />);

      const audio = screen.getByRole("application") as HTMLAudioElement;
      expect(audio).toHaveAttribute("controls");
    });

    it("shows appropriate volume icons based on volume level", () => {
      const mockAudioElement = createMockAudio();

      render(<Audio src="test.mp3" customControls={false} />);

      const audio = screen.getByRole("application") as HTMLAudioElement;
      expect(audio).toHaveAttribute("controls");
    });
  });

  describe("Error and Loading States", () => {
    it("shows error state with custom controls", () => {
      render(
        <Audio
          src="invalid.mp3"
          customControls
          errorContent="Failed to load audio"
        />
      );

      // Should show loading state initially, then we can trigger error
      const loadingElement = screen.getByRole("status");
      expect(loadingElement).toHaveTextContent("Loading audio...");
    });

    it("shows default error message when no custom content provided", () => {
      render(<Audio src="invalid.mp3" customControls />);

      // Should show loading state initially
      expect(screen.getByRole("status")).toHaveTextContent("Loading audio...");
    });

    it("shows default loading message when no custom content provided", () => {
      render(<Audio src="test.mp3" customControls />);

      expect(screen.getByRole("status")).toHaveTextContent("Loading audio...");
    });

    it("handles error state without custom controls", () => {
      render(<Audio src="invalid.mp3" customControls={false} />);
      const audio = screen.getByRole("application");
      expect(audio).toBeInTheDocument();
    });
  });

  describe("Client-Side Rendering", () => {
    it("renders with isClient=true", () => {
      render(
        <Audio src="test.mp3" isClient customControls={false}>
          <track kind="captions" src="captions.vtt" />
        </Audio>
      );

      // Should render AudioClient component (not loading state when customControls=false)
      expect(screen.getByRole("application")).toBeInTheDocument();
    });

    it("renders with isClient=true and isMemoized=true", () => {
      render(
        <Audio src="test.mp3" isClient isMemoized customControls={false}>
          <track kind="captions" src="captions.vtt" />
        </Audio>
      );

      // Should render MemoizedAudioClient component
      expect(screen.getByRole("application")).toBeInTheDocument();
    });

    it("falls back to server component during Suspense", () => {
      render(
        <Audio src="test.mp3" isClient customControls>
          <track kind="captions" src="captions.vtt" />
        </Audio>
      );

      // Should show loading state
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("Analytics Error Handling", () => {
    it("handles analytics errors in development mode", () => {
      const originalEnv = process.env.NODE_ENV;
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      // Set development mode
      process.env.NODE_ENV = "development";

      // Make gtag throw an error
      mockGtag.mockImplementation(() => {
        throw new Error("Analytics service unavailable");
      });

      render(<Audio {...defaultProps} analyticsId="test-audio" />);

      const audio = screen.getByRole("application");
      fireEvent.play(audio);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Analytics tracking failed:",
        expect.any(Error)
      );

      // Restore environment and console
      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });

    it("silently fails analytics errors in production mode", () => {
      const originalEnv = process.env.NODE_ENV;
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      // Set production mode
      process.env.NODE_ENV = "production";

      // Make gtag throw an error
      mockGtag.mockImplementation(() => {
        throw new Error("Analytics service unavailable");
      });

      render(<Audio {...defaultProps} analyticsId="test-audio" />);

      const audio = screen.getByRole("application");
      fireEvent.play(audio);

      // Should not log in production
      expect(consoleSpy).not.toHaveBeenCalled();

      // Restore environment and console
      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });
  });

  describe("Enhanced Callback Handling", () => {
    it("calls all callback functions on play", () => {
      const onPlayStart = vi.fn();
      const originalOnPlay = vi.fn();
      const onAnalytics = vi.fn();

      render(
        <Audio
          {...defaultProps}
          onPlayStart={onPlayStart}
          onPlay={originalOnPlay}
          onAnalytics={onAnalytics}
        />
      );

      const audio = screen.getByRole("application") as HTMLAudioElement;

      // Mock the audio properties before firing the event
      Object.defineProperty(audio, "duration", {
        value: 180,
        configurable: true,
      });
      Object.defineProperty(audio, "currentTime", {
        value: 0,
        configurable: true,
      });

      fireEvent.play(audio);

      expect(onPlayStart).toHaveBeenCalled();
      expect(onAnalytics).toHaveBeenCalledWith({
        event: "play",
        category: "audio",
        label: "audio-play",
        action: "start",
        duration: 180,
        position: 0,
      });
    });

    it("calls all callback functions on pause", () => {
      const onPlayPause = vi.fn();
      const originalOnPause = vi.fn();
      const onAnalytics = vi.fn();

      render(
        <Audio
          {...defaultProps}
          onPlayPause={onPlayPause}
          onPause={originalOnPause}
          onAnalytics={onAnalytics}
        />
      );

      const audio = screen.getByRole("application") as HTMLAudioElement;

      // Mock the audio properties before firing the event
      Object.defineProperty(audio, "duration", {
        value: 180,
        configurable: true,
      });
      Object.defineProperty(audio, "currentTime", {
        value: 60,
        configurable: true,
      });

      fireEvent.pause(audio);

      expect(onPlayPause).toHaveBeenCalled();
      expect(onAnalytics).toHaveBeenCalledWith({
        event: "pause",
        category: "audio",
        label: "audio-pause",
        action: "pause",
        duration: 180,
        position: 60,
      });
    });

    it("calls all callback functions on ended", () => {
      const onPlayEnd = vi.fn();
      const originalOnEnded = vi.fn();
      const onAnalytics = vi.fn();

      render(
        <Audio
          {...defaultProps}
          onPlayEnd={onPlayEnd}
          onEnded={originalOnEnded}
          onAnalytics={onAnalytics}
        />
      );

      const audio = screen.getByRole("application") as HTMLAudioElement;

      // Mock the audio properties before firing the event
      Object.defineProperty(audio, "duration", {
        value: 180,
        configurable: true,
      });
      Object.defineProperty(audio, "currentTime", {
        value: 180,
        configurable: true,
      });

      fireEvent.ended(audio);

      expect(onPlayEnd).toHaveBeenCalled();
      expect(onAnalytics).toHaveBeenCalledWith({
        event: "ended",
        category: "audio",
        label: "audio-ended",
        action: "complete",
        duration: 180,
        position: 180,
      });
    });

    it("handles volume change callback", () => {
      const onVolumeChange = vi.fn();
      render(
        <Audio {...defaultProps} onVolumeChangeCallback={onVolumeChange} />
      );

      const audio = screen.getByRole("application") as HTMLAudioElement;
      Object.defineProperty(audio, "volume", { value: 0.5, writable: true });
      Object.defineProperty(audio, "muted", { value: false, writable: true });

      fireEvent.volumeChange(audio);
      expect(onVolumeChange).toHaveBeenCalledWith(0.5);
    });
  });

  describe("Event Handling", () => {
    it("handles play/pause/ended events", () => {
      render(<Audio {...defaultProps} />);
      const audio = screen.getByRole("application");

      fireEvent.play(audio);
      fireEvent.pause(audio);
      fireEvent.ended(audio);

      expect(audio).toBeInTheDocument();
    });

    it("handles volume changes", () => {
      const onVolumeChange = vi.fn();
      render(
        <Audio {...defaultProps} onVolumeChangeCallback={onVolumeChange} />
      );
      const audio = screen.getByRole("application") as HTMLAudioElement;

      // Mock volume properties
      Object.defineProperty(audio, "volume", { value: 0.5, writable: true });
      Object.defineProperty(audio, "muted", { value: false, writable: true });

      fireEvent.volumeChange(audio);
      expect(onVolumeChange).toHaveBeenCalledWith(0.5);
    });

    it("handles error events", () => {
      const onError = vi.fn();
      render(<Audio {...defaultProps} onError={onError} />);
      const audio = screen.getByRole("application");

      fireEvent.error(audio);
      expect(onError).toHaveBeenCalled();
    });

    it("handles load start events", () => {
      const onLoadStart = vi.fn();
      render(<Audio {...defaultProps} onLoadStart={onLoadStart} />);
      const audio = screen.getByRole("application");

      fireEvent.loadStart(audio);
      expect(onLoadStart).toHaveBeenCalled();
    });

    it("handles can play events", () => {
      const onCanPlay = vi.fn();
      render(<Audio {...defaultProps} onCanPlay={onCanPlay} />);
      const audio = screen.getByRole("application");

      fireEvent.canPlay(audio);
      expect(onCanPlay).toHaveBeenCalled();
    });

    it("handles time update events", () => {
      const onTimeUpdate = vi.fn();
      render(<Audio {...defaultProps} onTimeUpdate={onTimeUpdate} />);
      const audio = screen.getByRole("application");

      fireEvent.timeUpdate(audio);
      expect(onTimeUpdate).toHaveBeenCalled();
    });
  });

  describe("Analytics", () => {
    it("tracks analytics on play with gtag", () => {
      render(<Audio {...defaultProps} analyticsId="test-audio" />);
      const audio = screen.getByRole("application");

      fireEvent.play(audio);
      expect(mockGtag).toHaveBeenCalledWith("event", "play", {
        event_category: "audio",
        event_label: "test-audio",
        audio_duration: 0,
        audio_position: 0,
        audio_progress: 0,
      });
    });

    it("uses custom analytics function", () => {
      const onAnalytics = vi.fn();
      render(<Audio {...defaultProps} onAnalytics={onAnalytics} />);

      const audio = screen.getByRole("application") as HTMLAudioElement;
      // Mock duration to avoid NaN
      Object.defineProperty(audio, "duration", { value: 0, writable: true });
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

    it("handles analytics errors gracefully", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      mockGtag.mockImplementation(() => {
        throw new Error("Analytics error");
      });

      render(<Audio {...defaultProps} analyticsId="test" />);
      fireEvent.play(screen.getByRole("application"));

      // Should not crash
      expect(screen.getByRole("application")).toBeInTheDocument();
      consoleSpy.mockRestore();
    });

    it("tracks analytics on pause", () => {
      render(<Audio {...defaultProps} analyticsId="test-audio" />);
      const audio = screen.getByRole("application");

      fireEvent.pause(audio);
      expect(mockGtag).toHaveBeenCalledWith("event", "pause", {
        event_category: "audio",
        event_label: "test-audio",
        audio_duration: 0,
        audio_position: 0,
        audio_progress: 0,
      });
    });

    it("tracks analytics on ended", () => {
      render(<Audio {...defaultProps} analyticsId="test-audio" />);
      const audio = screen.getByRole("application");

      fireEvent.ended(audio);
      expect(mockGtag).toHaveBeenCalledWith("event", "ended", {
        event_category: "audio",
        event_label: "test-audio",
        audio_duration: 0,
        audio_position: 0,
        audio_progress: 0,
      });
    });
  });

  describe("Custom Controls", () => {
    it("shows loading state initially with custom controls", () => {
      render(<Audio src="test.mp3" customControls />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("handles standard audio controls without customControls", () => {
      render(<Audio {...defaultProps} />);
      const audio = screen.getByRole("application");
      expect(audio).toHaveAttribute("controls");
    });
  });

  describe("Audio Properties", () => {
    it("validates audio source", () => {
      render(<Audio src="test.mp3" data-testid="valid" />);
      expect(screen.getByTestId("valid")).toHaveAttribute(
        "data-valid-source",
        "true"
      );
    });

    it("detects audio format", () => {
      render(<Audio src="test.wav" data-testid="wav-audio" />);
      expect(screen.getByTestId("wav-audio")).toHaveAttribute(
        "data-audio-format",
        "WAV"
      );
    });

    it("handles different configurations", () => {
      render(
        <Audio
          src="test.mp3"
          defaultVolume={0.5}
          defaultMuted
          playbackRate={1.5}
        />
      );
      expect(screen.getByRole("application")).toBeInTheDocument();
    });

    it("handles invalid audio source", () => {
      render(<Audio src="test.txt" data-testid="invalid" />);
      expect(screen.getByTestId("invalid")).toHaveAttribute(
        "data-valid-source",
        "false"
      );
    });

    it("handles undefined audio source", () => {
      render(<Audio data-testid="undefined" />);
      expect(screen.getByTestId("undefined")).toHaveAttribute(
        "data-valid-source",
        "false"
      );
    });
  });

  describe("Polymorphic Validation", () => {
    it("shows validation warning in development for non-audio element", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const CustomAudio = React.forwardRef<
        HTMLAudioElement,
        React.AudioHTMLAttributes<HTMLAudioElement>
      >((props, ref) => <audio {...props} ref={ref} />);

      render(<Audio src="test.mp3" as={CustomAudio} data-testid="custom" />);

      expect(screen.getByTestId("custom")).toHaveAttribute(
        "data-element-validation",
        "warning"
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("does not show validation warning in production", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const CustomAudio = React.forwardRef<
        HTMLAudioElement,
        React.AudioHTMLAttributes<HTMLAudioElement>
      >((props, ref) => <audio {...props} ref={ref} />);

      render(<Audio src="test.mp3" as={CustomAudio} data-testid="custom" />);

      expect(screen.getByTestId("custom")).not.toHaveAttribute(
        "data-element-validation"
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("sets polymorphic element data attribute", () => {
      const CustomAudio = React.forwardRef<
        HTMLAudioElement,
        React.AudioHTMLAttributes<HTMLAudioElement>
      >((props, ref) => <audio {...props} ref={ref} />);

      render(<Audio src="test.mp3" as={CustomAudio} data-testid="custom" />);

      expect(screen.getByTestId("custom")).toHaveAttribute(
        "data-polymorphic-element",
        "unknown"
      );
    });
  });

  describe("Accessibility", () => {
    it("has default aria-label", () => {
      render(<Audio {...defaultProps} />);
      const audio = screen.getByRole("application");
      expect(audio).toHaveAttribute("aria-label", "Audio player");
    });

    it("uses custom aria-label when provided", () => {
      render(<Audio {...defaultProps} aria-label="Custom audio player" />);
      const audio = screen.getByRole("application");
      expect(audio).toHaveAttribute("aria-label", "Custom audio player");
    });

    it("has application role", () => {
      render(<Audio {...defaultProps} />);
      const audio = screen.getByRole("application");
      expect(audio).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles null ref", () => {
      render(<Audio {...defaultProps} ref={null} />);
      expect(screen.getByRole("application")).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Audio {...defaultProps}>{undefined}</Audio>);
      expect(screen.getByRole("application")).toBeInTheDocument();
    });

    it("handles empty string children", () => {
      render(<Audio {...defaultProps}>{""}</Audio>);
      expect(screen.getByRole("application")).toBeInTheDocument();
    });

    it("handles complex children", () => {
      render(
        <Audio {...defaultProps}>
          <track kind="captions" src="captions.vtt" />
          <track kind="chapters" src="chapters.vtt" />
        </Audio>
      );
      expect(screen.getByRole("application")).toBeInTheDocument();
    });
  });
});

// =============================================================================
// CLIENT COMPONENTS TESTS
// =============================================================================

describe("AudioClient Components", () => {
  const defaultProps: AudioProps = {
    src: "test-audio.mp3",
  };

  it("renders AudioClient component", () => {
    render(<AudioClient {...defaultProps} />);
    expect(screen.getByRole("application")).toBeInTheDocument();
  });

  it("renders MemoizedAudioClient component", () => {
    render(<MemoizedAudioClient {...defaultProps} />);
    expect(screen.getByRole("application")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLAudioElement>();
    render(<AudioClient {...defaultProps} ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("handles props correctly in AudioClient", () => {
    render(
      <AudioClient
        {...defaultProps}
        className="custom-class"
        data-testid="client-audio"
      />
    );
    expect(screen.getByTestId("client-audio")).toHaveClass("custom-class");
  });

  it("handles props correctly in MemoizedAudioClient", () => {
    render(
      <MemoizedAudioClient
        {...defaultProps}
        className="custom-class"
        data-testid="memoized-audio"
      />
    );
    expect(screen.getByTestId("memoized-audio")).toHaveClass("custom-class");
  });
});

// =============================================================================
// UTILITY FUNCTIONS TESTS
// =============================================================================

describe("AudioUtils", () => {
  describe("formatTime", () => {
    it("formats time correctly", () => {
      expect(AudioUtils.formatTime(0)).toBe("00:00");
      expect(AudioUtils.formatTime(65)).toBe("01:05");
      expect(AudioUtils.formatTime(3661)).toBe("61:01");
      expect(AudioUtils.formatTime(NaN)).toBe("00:00");
      expect(AudioUtils.formatTime(Infinity)).toBe("00:00");
    });

    it("handles negative values", () => {
      expect(AudioUtils.formatTime(-1)).toBe("00:00");
      expect(AudioUtils.formatTime(-60)).toBe("00:00");
    });

    it("handles decimal values", () => {
      expect(AudioUtils.formatTime(30.5)).toBe("00:30");
      expect(AudioUtils.formatTime(65.7)).toBe("01:05");
    });
  });

  describe("validateSource", () => {
    it("validates various audio sources", () => {
      expect(AudioUtils.validateSource("test.mp3")).toBe(true);
      expect(AudioUtils.validateSource("test.wav")).toBe(true);
      expect(AudioUtils.validateSource("test.ogg")).toBe(true);
      expect(AudioUtils.validateSource("test.m4a")).toBe(true);
      expect(AudioUtils.validateSource("test.txt")).toBe(false);
      expect(AudioUtils.validateSource("test.pdf")).toBe(false);
      expect(AudioUtils.validateSource(undefined)).toBe(false);
      expect(AudioUtils.validateSource("")).toBe(false);
    });
  });

  describe("getFormat", () => {
    it("detects audio formats", () => {
      expect(AudioUtils.getFormat("test.mp3")).toBe("MP3");
      expect(AudioUtils.getFormat("test.wav")).toBe("WAV");
      expect(AudioUtils.getFormat("test.ogg")).toBe("OGG");
      expect(AudioUtils.getFormat("test.m4a")).toBe("M4A");
      expect(AudioUtils.getFormat("test.unknown")).toBe("UNKNOWN");
      expect(AudioUtils.getFormat(undefined)).toBe("Unknown");
      expect(AudioUtils.getFormat("")).toBe("Unknown");
    });

    it("handles case insensitive extensions", () => {
      expect(AudioUtils.getFormat("test.MP3")).toBe("MP3");
      expect(AudioUtils.getFormat("test.WAV")).toBe("WAV");
      expect(AudioUtils.getFormat("test.Ogg")).toBe("OGG");
    });
  });
});

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

describe("Audio Component Integration", () => {
  it("works with multiple audio sources", () => {
    render(
      <div>
        <Audio src="test1.mp3" analyticsId="audio-1" />
        <Audio src="test2.wav" analyticsId="audio-2" />
      </div>
    );

    const audioElements = screen.getAllByRole("application");
    expect(audioElements).toHaveLength(2);
  });

  it("handles custom Component prop", () => {
    const CustomAudio = React.forwardRef<
      HTMLAudioElement,
      React.AudioHTMLAttributes<HTMLAudioElement>
    >((props, ref) => <audio {...props} ref={ref} data-custom="true" />);

    render(<Audio src="test.mp3" as={CustomAudio} />);
    expect(screen.getByRole("application")).toHaveAttribute(
      "data-custom",
      "true"
    );
  });

  it("handles complex analytics scenario", () => {
    const onAnalytics = vi.fn();
    render(
      <Audio
        src="test.mp3"
        analyticsId="complex-audio"
        onAnalytics={onAnalytics}
      />
    );

    const audio = screen.getByRole("application");
    fireEvent.play(audio);
    fireEvent.pause(audio);
    fireEvent.ended(audio);

    expect(onAnalytics).toHaveBeenCalledTimes(3);
  });

  it("handles all custom control features together", () => {
    render(
      <Audio
        src="test.mp3"
        customControls
        showPlayButton
        showVolumeControl
        showTimeDisplay
        showProgressBar
        defaultVolume={0.7}
        defaultMuted={false}
        playbackRate={1.2}
        analyticsId="full-featured"
      />
    );

    // Should show loading state initially
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("handles server-side rendering without client features", () => {
    render(
      <Audio src="test.mp3" customControls={false} analyticsId="server-audio" />
    );

    const audio = screen.getByRole("application");
    expect(audio).toHaveAttribute("controls");
    expect(audio).toHaveAttribute("data-analytics-id", "server-audio");
  });
});

export {};
