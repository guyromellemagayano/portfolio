# Audio Component

A highly optimized, accessible audio component with support for custom controls, analytics, loading states, and more.

## Features

- 🚀 **Performance Optimized**: Uses `useCallback`, `useMemo`, and React.memo for optimal rendering
- ♿ **Accessible**: Full ARIA support, keyboard navigation, and screen reader compatibility
- 📊 **Analytics Ready**: Built-in analytics tracking with Google Analytics support
- 🎛️ **Custom Controls**: Optional custom player controls with full functionality
- 🎵 **Format Support**: Supports MP3, WAV, OGG, AAC, M4A, and FLAC formats
- 🔧 **TypeScript**: Comprehensive type definitions and prop validation
- 📱 **Responsive**: Mobile-first design with responsive breakpoints
- 🌐 **Universal**: Works in both server-side and client-side environments

## Installation

```bash
# Install the components package
pnpm add @packages/components
```

## Usage

```tsx
import { Audio } from "@packages/components";

// Basic usage
<Audio src="podcast.mp3" controls />

// With custom controls
<Audio
  src="music.mp3"
  customControls
  showPlayButton
  showVolumeControl
  showTimeDisplay
  showProgressBar
/>

// With analytics
<Audio src="interview.mp3" analyticsId="interview-audio" />

// With custom loading/error content
<Audio
  src="speech.mp3"
  customControls
  loadingContent={<div>Loading audio...</div>}
  errorContent={<div>Failed to load audio</div>}
/>

// With callbacks
<Audio
  src="presentation.mp3"
  onPlayStart={() => console.log("Started playing")}
  onPlayPause={() => console.log("Paused")}
  onPlayEnd={() => console.log("Finished")}
  onVolumeChangeCallback={(volume) => console.log("Volume:", volume)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | The URL of the audio file |
| `customControls` | `boolean` | `false` | Whether to show custom controls instead of browser default |
| `showPlayButton` | `boolean` | `true` | Whether to show play/pause button in custom controls |
| `showVolumeControl` | `boolean` | `true` | Whether to show volume control in custom controls |
| `showTimeDisplay` | `boolean` | `true` | Whether to show time display in custom controls |
| `showProgressBar` | `boolean` | `true` | Whether to show progress bar in custom controls |
| `defaultVolume` | `number` | `1` | Default volume level (0-1) |
| `playbackRate` | `number` | `1` | Default playback rate |
| `defaultMuted` | `boolean` | `false` | Whether to start muted |
| `loadingContent` | `React.ReactNode` | - | Content to show during loading |
| `errorContent` | `React.ReactNode` | - | Content to show on error |
| `analyticsId` | `string` | - | Analytics identifier for tracking |
| `onAnalytics` | `function` | - | Custom analytics function |
| `onPlayStart` | `function` | - | Callback when playback starts |
| `onPlayPause` | `function` | - | Callback when playback pauses |
| `onPlayEnd` | `function` | - | Callback when playback ends |
| `onVolumeChangeCallback` | `function` | - | Callback when volume changes |
| `isClient` | `boolean` | `false` | Whether to render as client component |
| `isMemoized` | `boolean` | `false` | Whether to use memoized client component |

## Custom Controls

When `customControls` is enabled, the component provides a rich set of interactive controls:

### Play/Pause Button

- Toggles audio playback
- Shows loading state during buffering
- Keyboard accessible

### Volume Control

- Volume slider (0-100%)
- Mute/unmute button
- Visual feedback for volume levels

### Time Display

- Current time / Total duration
- MM:SS format
- Updates in real-time

### Progress Bar

- Seek to any position
- Visual progress indicator
- Drag and click support

## Accessibility

The component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `role="application"`, `aria-label`, and `aria-live`
- **Keyboard Navigation**: Full keyboard support for all controls
- **Focus Management**: Visible focus indicators with `:focus-visible`
- **Screen Reader Support**: Proper semantic markup and ARIA labels
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` preference

## Analytics

The component automatically tracks audio interactions when `analyticsId` is provided:

```tsx
// Tracks with Google Analytics
<Audio src="podcast.mp3" analyticsId="podcast-episode-1" />

// Custom analytics function
<Audio
  src="music.mp3"
  onAnalytics={(data) => {
    console.log("Audio event:", data);
    // Send to your analytics service
  }}
/>
```

### Analytics Events

- `play` - Audio playback started
- `pause` - Audio playback paused
- `ended` - Audio playback completed

Each event includes:

- Event category: "audio"
- Event label: analyticsId
- Audio duration
- Current position
- Progress percentage

## Security

- **Source Validation**: Validates and filters unsafe audio sources
- **Format Detection**: Automatic audio format detection and validation
- **Error Handling**: Graceful error handling for unsupported formats

## Performance

- **Code Splitting**: Client components are lazy-loaded
- **Memoization**: Uses React.memo and useMemo for optimal rendering
- **Event Optimization**: Event handlers are memoized with useCallback
- **Bundle Size**: Minimal impact on bundle size

## Styling

The component uses CSS classes for styling:

```css
.audio                      /* Base styles */
.audio--custom-controls     /* Custom controls variant */
.audio--loading            /* Loading state */
.audio--error              /* Error state */
.audio--invalid-source     /* Invalid source */
.audio__controls           /* Custom controls container */
.audio__play-button        /* Play/pause button */
.audio__time-display       /* Time display */
.audio__progress-bar       /* Progress bar */
.audio__volume-controls    /* Volume controls container */
.audio__mute-button        /* Mute button */
.audio__volume-slider      /* Volume slider */
```

## Examples

### Podcast Player

```tsx
<Audio
  src="podcast-episode-42.mp3"
  customControls
  analyticsId="podcast-player"
  onPlayStart={() => trackEvent("podcast_play")}
  onPlayEnd={() => trackEvent("podcast_complete")}
/>
```

### Music Player

```tsx
<Audio
  src="song.mp3"
  customControls
  defaultVolume={0.8}
  playbackRate={1.0}
  analyticsId="music-player"
  loadingContent={<MusicLoadingSpinner />}
/>
```

### Audio with Fallback

```tsx
<Audio src="audio.mp3" customControls>
  <source src="audio.ogg" type="audio/ogg" />
  <source src="audio.wav" type="audio/wav" />
  Your browser does not support the audio element.
</Audio>
```

### Interview Recording

```tsx
<Audio
  src="interview.m4a"
  customControls
  showTimeDisplay
  showProgressBar
  analyticsId="interview-audio"
  onVolumeChangeCallback={(volume) => saveUserPreference("volume", volume)}
/>
```

## Testing

The component includes comprehensive tests covering:

- Rendering with different props
- Event handling (play, pause, ended, volume change)
- Custom controls functionality
- Analytics tracking
- Accessibility features
- State management
- Utility functions

Run tests with:

```bash
pnpm test:audio
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Supported Audio Formats

- **MP3**: Widely supported, good compression
- **WAV**: Uncompressed, high quality
- **OGG**: Open source, good compression
- **AAC**: Advanced Audio Coding
- **M4A**: Apple's audio format
- **FLAC**: Lossless compression

## LICENSE

This component is part of the component library and follows the same LICENSE terms.
