# Audio Component

Accessible audio component with custom controls and analytics support.

## Features

- Performance optimized with React.memo and hooks
- Full accessibility with ARIA support
- Analytics tracking with Google Analytics
- Custom player controls with full functionality
- Multiple audio format support
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side

## Installation

```bash
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

// With callbacks
<Audio
  src="presentation.mp3"
  onPlayStart={() => console.log("Started playing")}
  onPlayPause={() => console.log("Paused")}
  onPlayEnd={() => console.log("Finished")}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Audio file URL |
| `customControls` | `boolean` | `false` | Use custom controls instead of browser default |
| `showPlayButton` | `boolean` | `true` | Show play/pause button |
| `showVolumeControl` | `boolean` | `true` | Show volume control |
| `showTimeDisplay` | `boolean` | `true` | Show time display |
| `showProgressBar` | `boolean` | `true` | Show progress bar |
| `defaultVolume` | `number` | `1` | Default volume level (0-1) |
| `playbackRate` | `number` | `1` | Default playback rate |
| `defaultMuted` | `boolean` | `false` | Start muted |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `onPlayStart` | `function` | - | Callback when playback starts |
| `onPlayPause` | `function` | - | Callback when playback pauses |
| `onPlayEnd` | `function` | - | Callback when playback ends |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

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
  analyticsId="music-player"
/>
```

### Basic Audio

```tsx
<Audio src="audio.mp3" controls>
  <source src="audio.ogg" type="audio/ogg" />
  <source src="audio.wav" type="audio/wav" />
  Your browser does not support the audio element.
</Audio>
```

## Styling

```css
.audio                      /* Base audio styles */
.audio--custom-controls     /* Custom controls variant */
.audio--loading            /* Loading state */
.audio--error              /* Error state */
.audio__controls           /* Controls container */
.audio__play-button        /* Play/pause button */
.audio__time-display       /* Time display */
.audio__progress-bar       /* Progress bar */
.audio__volume-controls    /* Volume controls */
```

## Accessibility

- ARIA attributes with proper roles and labels
- Keyboard navigation for all controls
- Screen reader compatibility
- Focus management with visible indicators
- High contrast mode support

## Testing

```bash
pnpm test
```

## LICENSE

MIT
