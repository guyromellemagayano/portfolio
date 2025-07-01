import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const AudioClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AudioClient };
});

const MemoizedAudioClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAudioClient };
});

export type AudioRef = React.ComponentRef<"audio">;

export interface AudioProps
  extends React.AudioHTMLAttributes<HTMLAudioElement>,
    CommonComponentProps {
  /** Whether to show custom controls instead of browser default */
  customControls?: boolean;
  /** Whether to show play/pause button in custom controls */
  showPlayButton?: boolean;
  /** Whether to show volume control in custom controls */
  showVolumeControl?: boolean;
  /** Whether to show time display in custom controls */
  showTimeDisplay?: boolean;
  /** Whether to show progress bar in custom controls */
  showProgressBar?: boolean;
  /** Default volume level (0-1) */
  defaultVolume?: number;
  /** Default playback rate */
  playbackRate?: number;
  /** Whether to start muted */
  defaultMuted?: boolean;
  /** Content to show during loading */
  loadingContent?: React.ReactNode;
  /** Content to show on error */
  errorContent?: React.ReactNode;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    action: string;
    duration?: number;
    position?: number;
  }) => void;
  /** Callback when playback starts */
  onPlayStart?: () => void;
  /** Callback when playback pauses */
  onPlayPause?: () => void;
  /** Callback when playback ends */
  onPlayEnd?: () => void;
  /** Callback when volume changes */
  onVolumeChangeCallback?: (volume: number) => void;
  /** Support for data attributes commonly used in testing */
  [key: `data-${string}`]: string | undefined;
}

// =============================================================================
// AUDIO VALIDATION & UTILITY FUNCTIONS
// =============================================================================

/**
 * Validates if the audio source is safe and supported
 * @param src - The audio source URL
 * @returns boolean indicating if source is valid
 */
function validateAudioSource(src?: string): boolean {
  if (!src || src.trim() === "") {
    return false;
  }

  // Check for supported audio formats
  const audioExtensions = /\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i;
  const dataUrl = /^data:audio\//i;
  const blobUrl = /^blob:/i;
  const httpUrl = /^https?:\/\//i;

  return (
    audioExtensions.test(src) ||
    dataUrl.test(src) ||
    blobUrl.test(src) ||
    httpUrl.test(src)
  );
}

/**
 * Extracts audio format from URL
 * @param src - The audio source URL
 * @returns string format or "Unknown"
 */
function getAudioFormat(src?: string): string {
  if (!src) return "Unknown";

  const match = src.match(/\.([^.?]+)(\?.*)?$/);
  if (match) {
    return match[1].toUpperCase();
  }

  if (src.startsWith("data:audio/")) {
    try {
      const format = src.split(";")[0]?.split("/")[1];
      return format ? format.toUpperCase() : "Unknown";
    } catch {
      return "Unknown";
    }
  }

  return "Unknown";
}

/**
 * Formats time in MM:SS format
 * @param seconds - Time in seconds
 * @returns formatted time string
 */
function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) {
    return "00:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// =============================================================================
// ANALYTICS INTEGRATION
// =============================================================================

/**
 * Fires Google Analytics event for audio interactions
 * @param analyticsId - The analytics identifier
 * @param event - The event type
 * @param audioElement - The audio element for context
 */
function fireAudioAnalytics(
  analyticsId: string,
  event: string,
  audioElement?: HTMLAudioElement
): void {
  try {
    const duration = audioElement?.duration || 0;
    const position = audioElement?.currentTime || 0;
    const progress = duration > 0 ? Math.round((position / duration) * 100) : 0;

    // Google Analytics implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", event, {
        event_category: "audio",
        event_label: analyticsId,
        audio_duration: duration,
        audio_position: position,
        audio_progress: progress,
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics tracking failed:", error);
    }
  }
}

// =============================================================================
// UI COMPONENTS
// =============================================================================

/**
 * Loading component for audio loading states
 * @param content - Custom loading content
 */
function AudioLoading({
  content,
}: {
  content?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="audio audio--loading" role="status" aria-live="polite">
      {content || "Loading audio..."}
    </div>
  );
}

/**
 * Error component for audio error states
 * @param content - Custom error content
 */
function AudioError({
  content,
}: {
  content?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="audio audio--error" role="alert">
      {content || "Error loading audio"}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Universal audio component with custom controls, analytics, and accessibility.
 * Supports both native browser controls and custom interactive controls.
 */
const AudioComponent = React.forwardRef<AudioRef, AudioProps>((props, ref) => {
  const {
    src,
    customControls = false,
    showPlayButton = true,
    showVolumeControl = true,
    showTimeDisplay = true,
    showProgressBar = true,
    defaultVolume = 1,
    playbackRate = 1,
    defaultMuted = false,
    loadingContent,
    errorContent,
    analyticsId,
    onAnalytics,
    onPlayStart,
    onPlayPause,
    onPlayEnd,
    onVolumeChangeCallback,
    as: Component = "audio",
    isClient = false,
    isMemoized = false,
    children,
    className,
    onPlay: originalOnPlay,
    onPause: originalOnPause,
    onEnded: originalOnEnded,
    onVolumeChange: originalOnVolumeChange,
    onError: originalOnError,
    onLoadStart: originalOnLoadStart,
    onCanPlay: originalOnCanPlay,
    onTimeUpdate: originalOnTimeUpdate,
    style,
    ...rest
  } = props;

  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(defaultMuted);

  const audioRef = useRef<HTMLAudioElement>(null);
  const hasAnalytics = analyticsId || onAnalytics;
  const isValidSource = validateAudioSource(src);
  const audioFormat = getAudioFormat(src);

  // Enhanced event handlers
  const handlePlay = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      setIsPlaying(true);
      onPlayStart?.();

      if (hasAnalytics && (analyticsId || onAnalytics)) {
        if (onAnalytics) {
          onAnalytics({
            event: "play",
            category: "audio",
            label: analyticsId || "audio-play",
            action: "start",
            duration: event.currentTarget.duration,
            position: event.currentTarget.currentTime,
          });
        } else if (analyticsId) {
          fireAudioAnalytics(analyticsId, "play", event.currentTarget);
        }
      }

      originalOnPlay?.(event);
    },
    [hasAnalytics, analyticsId, onAnalytics, onPlayStart, originalOnPlay]
  );

  const handlePause = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      setIsPlaying(false);
      onPlayPause?.();

      if (hasAnalytics && (analyticsId || onAnalytics)) {
        if (onAnalytics) {
          onAnalytics({
            event: "pause",
            category: "audio",
            label: analyticsId || "audio-pause",
            action: "pause",
            duration: event.currentTarget.duration,
            position: event.currentTarget.currentTime,
          });
        } else if (analyticsId) {
          fireAudioAnalytics(analyticsId, "pause", event.currentTarget);
        }
      }

      originalOnPause?.(event);
    },
    [hasAnalytics, analyticsId, onAnalytics, onPlayPause, originalOnPause]
  );

  const handleEnded = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      setIsPlaying(false);
      onPlayEnd?.();

      if (hasAnalytics && (analyticsId || onAnalytics)) {
        if (onAnalytics) {
          onAnalytics({
            event: "ended",
            category: "audio",
            label: analyticsId || "audio-ended",
            action: "complete",
            duration: event.currentTarget.duration,
            position: event.currentTarget.currentTime,
          });
        } else if (analyticsId) {
          fireAudioAnalytics(analyticsId, "ended", event.currentTarget);
        }
      }

      originalOnEnded?.(event);
    },
    [hasAnalytics, analyticsId, onAnalytics, onPlayEnd, originalOnEnded]
  );

  const handleVolumeChange = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      const audio = event.currentTarget;
      setVolume(audio.volume);
      setIsMuted(audio.muted);
      onVolumeChangeCallback?.(audio.volume);
      originalOnVolumeChange?.(event);
    },
    [onVolumeChangeCallback, originalOnVolumeChange]
  );

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      setHasError(true);
      setIsLoading(false);
      originalOnError?.(event);
    },
    [originalOnError]
  );

  const handleLoadStart = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      setIsLoading(true);
      setHasError(false);
      originalOnLoadStart?.(event);
    },
    [originalOnLoadStart]
  );

  const handleCanPlay = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      setIsLoading(false);
      originalOnCanPlay?.(event);
    },
    [originalOnCanPlay]
  );

  const handleTimeUpdate = useCallback(
    (event: React.SyntheticEvent<HTMLAudioElement>) => {
      const audio = event.currentTarget;
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      originalOnTimeUpdate?.(event);
    },
    [originalOnTimeUpdate]
  );

  // Custom control handlers
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  }, [isPlaying]);

  const handleProgressChange = useCallback(
    (newProgress: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;

      const newTime = (newProgress / 100) * duration;
      audio.currentTime = newTime;
    },
    [duration]
  );

  const handleVolumeSliderChange = useCallback(
    (newVolume: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = newVolume;
      onVolumeChangeCallback?.(newVolume);
    },
    [onVolumeChangeCallback]
  );

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
  }, []);

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = defaultVolume;
    audio.muted = defaultMuted;
    audio.playbackRate = playbackRate;
  }, [defaultVolume, defaultMuted, playbackRate]);

  // Enhanced props with accessibility and semantic structure
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref: ref || audioRef,
      className: [
        "audio",
        customControls && "audio--custom-controls",
        isLoading && "audio--loading",
        hasError && "audio--error",
        !isValidSource && "audio--invalid-source",
        className,
      ]
        .filter(Boolean)
        .join(" "),
      style,
      controls: !customControls,
      onPlay: handlePlay,
      onPause: handlePause,
      onEnded: handleEnded,
      onVolumeChange: handleVolumeChange,
      onError: handleError,
      onLoadStart: handleLoadStart,
      onCanPlay: handleCanPlay,
      onTimeUpdate: handleTimeUpdate,
      "data-analytics-id": analyticsId || undefined,
      "data-audio-format": audioFormat,
      "data-valid-source": String(isValidSource),
      "aria-label": rest["aria-label"] || "Audio player",
      role: "application",
    }),
    [
      rest,
      ref,
      audioRef,
      customControls,
      isLoading,
      hasError,
      isValidSource,
      className,
      style,
      handlePlay,
      handlePause,
      handleEnded,
      handleVolumeChange,
      handleError,
      handleLoadStart,
      handleCanPlay,
      handleTimeUpdate,
      analyticsId,
      audioFormat,
    ]
  );

  // Custom controls rendering
  const customControlsElement = customControls && !isLoading && !hasError && (
    <div className="audio__controls">
      {showPlayButton && (
        <button
          type="button"
          className="audio__play-button"
          onClick={togglePlayPause}
          disabled={isLoading}
          aria-label={`${isPlaying ? "Pause" : "Play"} audio`}
        >
          {isLoading ? "⏳" : isPlaying ? "⏸️" : "▶️"}
        </button>
      )}

      {showTimeDisplay && (
        <div className="audio__time-display">
          <span className="audio__current-time" aria-label="Current time">
            {formatTime(currentTime)}
          </span>
          <span className="audio__duration" aria-label="Total duration">
            / {formatTime(duration)}
          </span>
        </div>
      )}

      {showProgressBar && (
        <input
          type="range"
          className="audio__progress-bar"
          min="0"
          max="100"
          value={duration > 0 ? (currentTime / duration) * 100 : 0}
          onChange={(e) => handleProgressChange(Number(e.target.value))}
          aria-label="Audio progress"
          disabled={!duration}
        />
      )}

      {showVolumeControl && (
        <div className="audio__volume-controls">
          <button
            type="button"
            className="audio__mute-button"
            onClick={toggleMute}
            aria-label={`${isMuted ? "Unmute" : "Mute"} audio`}
          >
            {isMuted ? "🔇" : volume > 0.5 ? "🔊" : "🔉"}
          </button>
          <input
            type="range"
            className="audio__volume-slider"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) =>
              handleVolumeSliderChange(Number(e.target.value) / 100)
            }
            aria-label="Volume control"
          />
        </div>
      )}
    </div>
  );

  // Handle different states
  if (isLoading && customControls) {
    return <AudioLoading content={loadingContent} />;
  }

  if (hasError && customControls) {
    return <AudioError content={errorContent} />;
  }

  // Base element
  const element = (
    <div className="audio-wrapper">
      <Component src={src} {...enhancedProps}>
        {children}
      </Component>
      {customControlsElement}
    </div>
  );

  // Client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAudioClient : AudioClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...props} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

AudioComponent.displayName = "Audio";

// Export the server component
export const Audio = AudioComponent;

// Utility exports for advanced use cases
// eslint-disable-next-line react-refresh/only-export-components
export const AudioUtils = {
  formatTime,
  validateSource: validateAudioSource,
  getFormat: getAudioFormat,
};

// For most use cases, the server component is sufficient
// For client-side interactivity, use isClient=true with isMemoized=true
export default Audio;
