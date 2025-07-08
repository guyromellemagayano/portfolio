<!-- markdownlint-disable line-length -->
# Audio Component

A sophisticated audio component with custom controls, advanced analytics, source validation, and comprehensive state management for professional audio playback experiences.

## 📋 Table of Contents

- [Audio Component](#audio-component)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [Purpose](#purpose)
    - [Key Features](#key-features)
  - [🚀 Quick Start](#-quick-start)
    - [Installation](#installation)
    - [Basic Usage](#basic-usage)
  - [⚙️ Props](#️-props)
    - [Standard Props](#standard-props)
    - [Component-Specific Props](#component-specific-props)
    - [Custom Controls Props](#custom-controls-props)
    - [Callback Props](#callback-props)
  - [🛠️ Utility Functions](#️-utility-functions)
    - [AudioUtils Export](#audioutils-export)
    - [Available Functions](#available-functions)
  - [💡 Examples](#-examples)
    - [Basic Example](#basic-example)
    - [Custom Controls System](#custom-controls-system)
    - [Advanced Analytics Integration](#advanced-analytics-integration)
    - [Loading and Error States](#loading-and-error-states)
    - [Source Validation](#source-validation)
    - [Enhanced Callbacks](#enhanced-callbacks)
    - [Polymorphic Rendering](#polymorphic-rendering)
    - [Client-Side Rendering](#client-side-rendering)
  - [♿ Accessibility](#-accessibility)
    - [Best Practices Followed](#best-practices-followed)
    - [ARIA Attributes](#aria-attributes)
  - [🎨 Styling](#-styling)
    - [BEM Methodology](#bem-methodology)
    - [Base Classes](#base-classes)
    - [Custom Controls Styling](#custom-controls-styling)
    - [State Modifiers](#state-modifiers)
    - [Visual Features](#visual-features)
    - [Customization Options](#customization-options)
    - [CSS Variables](#css-variables)
  - [🧪 Testing](#-testing)
    - [Test Files](#test-files)
    - [Test Coverage](#test-coverage)
    - [Running Tests](#running-tests)
  - [⚡ Performance](#-performance)
    - [Optimization Techniques](#optimization-techniques)
  - [🌐 Browser Support](#-browser-support)
  - [📘 TypeScript](#-typescript)
  - [📚 Migration Guide](#-migration-guide)
    - [From Legacy Component](#from-legacy-component)
    - [Breaking Changes](#breaking-changes)
  - [🤝 Contributing](#-contributing)
    - [Contribution Guidelines](#contribution-guidelines)
  - [🔗 Related Components](#-related-components)

## 📖 Overview

### Purpose

The `Audio` component provides a sophisticated, accessible HTML5 `<audio>` element designed for professional audio playback experiences. Beyond basic audio embedding, it includes a complete custom controls system, advanced analytics with detailed playback data, source validation, loading/error state management, and comprehensive accessibility features.

### Key Features

- **Custom Controls System**: Complete UI controls with play/pause, volume slider, progress bar, and time display
- **Advanced Analytics**: Detailed playback tracking including duration, position, progress percentage, and action types
- **Source Validation**: Automatic validation of audio formats and URLs with visual feedback
- **State Management**: Comprehensive loading, error, and playback state handling
- **AudioUtils Export**: Utility functions for time formatting, source validation, and format detection
- **Enhanced Callbacks**: Rich callback system for playback lifecycle events
- **Responsive Design**: Mobile-optimized controls with touch-friendly interfaces
- **Accessibility Excellence**: Full WCAG 2.1 AA compliance with keyboard navigation and screen reader support

## 🚀 Quick Start

### Installation

To use the `Audio` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Audio` component and use it with native or custom controls:

```typescript
import { Audio } from '@guyromellemagayano/components';

// Basic audio with native controls
<Audio src="podcast.mp3" controls preload="metadata">
  Your browser does not support the audio element.
</Audio>

// Custom controls with analytics
<Audio
  src="music.mp3"
  customControls
  showPlayButton
  showVolumeControl
  showTimeDisplay
  showProgressBar
  analyticsId="music-player"
>
  Custom audio player with full controls
</Audio>
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the component, typically fallback content for unsupported browsers. |
| `className` | `string` | - | Additional CSS classes to apply to the component. |
| `style` | `React.CSSProperties` | - | Inline styles to apply to the component. |
| `as` | `React.ElementType` \| `string` | `"audio"` | The HTML element or custom component to render as. Defaults to `"audio"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; action: string; duration?: number; position?: number; }) => void` | - | A custom function to handle analytics events with detailed playback data. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

Standard HTML5 audio attributes for basic audio control.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | The URL of the audio file to embed. Automatically validated for supported formats. |
| `controls` | `boolean` | `false` | If `true`, shows browser default controls. Ignored when `customControls` is `true`. |
| `autoPlay` | `boolean` | `false` | If `true`, audio starts playing automatically (subject to browser autoplay policies). |
| `loop` | `boolean` | `false` | If `true`, audio automatically restarts when it finishes. |
| `muted` | `boolean` | `false` | If `true`, audio output is muted initially. |
| `preload` | `"none" \| "metadata" \| "auto"` | `"auto"` | Specifies how much audio data should be preloaded. |
| `crossOrigin` | `"anonymous" \| "use-credentials"` | - | Sets the CORS mode for cross-origin audio requests. |

### Custom Controls Props

Advanced props for the sophisticated custom controls system.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customControls` | `boolean` | `false` | If `true`, displays custom UI controls instead of browser default controls. |
| `showPlayButton` | `boolean` | `true` | Whether to show the play/pause button in custom controls. |
| `showVolumeControl` | `boolean` | `true` | Whether to show volume slider and mute button in custom controls. |
| `showTimeDisplay` | `boolean` | `true` | Whether to show current time and duration display in custom controls. |
| `showProgressBar` | `boolean` | `true` | Whether to show the interactive progress bar in custom controls. |
| `defaultVolume` | `number` | `1` | Default volume level (0-1) when audio loads. |
| `playbackRate` | `number` | `1` | Default playback speed (0.5 = half speed, 2 = double speed). |
| `defaultMuted` | `boolean` | `false` | Whether audio starts in muted state. |
| `loadingContent` | `React.ReactNode` | - | Custom content to display during audio loading. |
| `errorContent` | `React.ReactNode` | - | Custom content to display when audio loading fails. |

### Callback Props

Enhanced callback system for comprehensive playback lifecycle management.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPlayStart` | `() => void` | - | Called when audio playback starts. |
| `onPlayPause` | `() => void` | - | Called when audio playback pauses. |
| `onPlayEnd` | `() => void` | - | Called when audio playback ends. |
| `onVolumeChangeCallback` | `(volume: number) => void` | - | Called when volume changes, provides new volume level. |
| `onPlay` | `React.MediaEventHandler<HTMLAudioElement>` | - | Standard HTML audio play event handler. |
| `onPause` | `React.MediaEventHandler<HTMLAudioElement>` | - | Standard HTML audio pause event handler. |
| `onEnded` | `React.MediaEventHandler<HTMLAudioElement>` | - | Standard HTML audio ended event handler. |
| `onError` | `React.MediaEventHandler<HTMLAudioElement>` | - | Standard HTML audio error event handler. |

## 🛠️ Utility Functions

### AudioUtils Export

The component exports comprehensive utility functions for audio management:

```typescript
import { AudioUtils } from '@guyromellemagayano/components';

// Validate audio source URL
const isValid = AudioUtils.validateSource('audio.mp3');

// Get audio format from URL
const format = AudioUtils.getFormat('song.mp3'); // Returns 'MP3'

// Format time for display
const timeString = AudioUtils.formatTime(125); // Returns '02:05'
```

### Available Functions

| Function | Description | Example |
|----------|-------------|---------|
| `validateSource(src?)` | Validates if audio source URL is safe and supported | `AudioUtils.validateSource('audio.mp3')` |
| `getFormat(src?)` | Extracts audio format from URL or returns 'Unknown' | `AudioUtils.getFormat('song.wav')` → `'WAV'` |
| `formatTime(seconds)` | Formats time in MM:SS format with proper validation | `AudioUtils.formatTime(90)` → `'01:30'` |

## 💡 Examples

### Basic Example

Demonstrates fundamental usage with native browser controls.

```typescript
import { Audio } from '@guyromellemagayano/components';

function BasicAudioExample() {
  return (
    <div>
      <h3>Simple Podcast Player</h3>
      <Audio
        src="/podcast/episode-01.mp3" 
        controls 
        preload="metadata"
      >
        <p>Your browser does not support the audio element.</p>
        <a href="/podcast/episode-01.mp3">Download the episode</a>
      </Audio>
    </div>
  );
}
```

### Custom Controls System

Shows the complete custom controls system with all features enabled.

```typescript
import { Audio } from '@guyromellemagayano/components';

function CustomControlsExample() {
  const handleVolumeChange = (volume: number) => {
    console.log(`Volume changed to: ${Math.round(volume * 100)}%`);
  };

  const handlePlaybackEvents = {
    onPlayStart: () => console.log('Playback started'),
    onPlayPause: () => console.log('Playback paused'),
    onPlayEnd: () => console.log('Playback ended'),
  };

  return (
    <div>
      <h3>🎵 Custom Music Player</h3>
      <Audio 
        src="/music/track.mp3"
        customControls
        showPlayButton
        showVolumeControl
        showTimeDisplay
        showProgressBar
        defaultVolume={0.8}
        playbackRate={1}
        onVolumeChangeCallback={handleVolumeChange}
        {...handlePlaybackEvents}
        loadingContent={
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            🎵 Loading your music...
          </div>
        }
      >
        Advanced music player with custom controls
      </Audio>
    </div>
  );
}
```

### Advanced Analytics Integration

Demonstrates comprehensive analytics tracking with detailed playback data.

```typescript
import { Audio } from '@guyromellemagayano/components';

function AnalyticsAudioExample() {
  const handleDetailedAnalytics = (data: {
    event: string;
    category: string;
    label: string;
    action: string;
    duration?: number;
    position?: number;
  }) => {
    // Calculate additional metrics
    const progress = data.duration && data.position 
      ? Math.round((data.position / data.duration) * 100) 
      : 0;

    console.log('Audio Analytics:', {
      ...data,
      progress: `${progress}%`,
      timestamp: new Date().toISOString(),
    });

    // Send to analytics platform with rich data
    gtag('event', data.event, {
      event_category: data.category,
      event_label: data.label,
      action: data.action,
      audio_duration: data.duration,
      audio_position: data.position,
      audio_progress: progress,
      custom_parameter_1: 'podcast_series_1',
      custom_parameter_2: 'episode_12',
    });
  };

  return (
    <div>
      <h3>📊 Analytics-Enabled Player</h3>
      <Audio 
        src="/content/important-webinar.mp3"
        customControls
        analyticsId="webinar-audio-player"
        onAnalytics={handleDetailedAnalytics}
        onPlayStart={() => console.log('User started listening')}
        onPlayPause={() => console.log('User paused playback')}
        onPlayEnd={() => console.log('User completed listening')}
      >
        Webinar recording with detailed analytics
      </Audio>
    </div>
  );
}
```

### Loading and Error States

Shows custom loading and error state handling.

```typescript
import { Audio } from '@guyromellemagayano/components';

function LoadingErrorStatesExample() {
  const customLoadingContent = (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '1.5rem',
      background: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <span>🎧</span>
      <span>Loading high-quality audio...</span>
    </div>
  );

  const customErrorContent = (
    <div style={{ 
      padding: '1.5rem',
      background: '#fee',
      border: '1px solid #fcc',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <p>❌ Failed to load audio file</p>
      <p>Please check your internet connection and try again.</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  return (
    <div>
      <h3>🔄 Loading & Error States</h3>
      
      {/* Example with loading state */}
      <Audio 
        src="/large-audio/symphony.mp3"
        customControls
        loadingContent={customLoadingContent}
        errorContent={customErrorContent}
        preload="none" // Forces loading state to be visible
      >
        Large symphony file with custom loading states
      </Audio>

      {/* Example with likely error state */}
      <Audio
        src="/nonexistent/file.mp3"
        customControls
        errorContent={customErrorContent}
      >
        This will show error state due to invalid source
      </Audio>
    </div>
  );
}
```

### Source Validation

Demonstrates automatic source validation with visual feedback.

```typescript
import { Audio, AudioUtils } from '@guyromellemagayano/components';
import { useState } from 'react';

function SourceValidationExample() {
  const [audioSrc, setAudioSrc] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    format: string;
  } | null>(null);

  const handleSourceChange = (src: string) => {
    setAudioSrc(src);
    const isValid = AudioUtils.validateSource(src);
    const format = AudioUtils.getFormat(src);
    setValidationResult({ isValid, format });
  };

  const sampleSources = [
    { url: '/audio/valid.mp3', label: 'Valid MP3 File' },
    { url: '/audio/sample.wav', label: 'Valid WAV File' },
    { url: 'data:audio/mpeg;base64,//uQx...', label: 'Valid Data URL' },
    { url: '/invalid/file.txt', label: 'Invalid File Type' },
    { url: '', label: 'Empty Source' },
  ];

  return (
    <div>
      <h3>✅ Source Validation Demo</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Audio Source URL:
          <input 
            type="text" 
            value={audioSrc}
            onChange={(e) => handleSourceChange(e.target.value)}
            placeholder="Enter audio URL..."
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p>Quick Test Sources:</p>
        {sampleSources.map((source, index) => (
          <button 
            key={index}
            onClick={() => handleSourceChange(source.url)}
            style={{ margin: '0.25rem', padding: '0.5rem' }}
          >
            {source.label}
          </button>
        ))}
      </div>

      {validationResult && (
        <div style={{ 
          padding: '1rem', 
          background: validationResult.isValid ? '#e6ffe6' : '#ffe6e6',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <p>✅ Valid Source: {validationResult.isValid ? 'Yes' : 'No'}</p>
          <p>🎵 Detected Format: {validationResult.format}</p>
        </div>
      )}

      <Audio
        src={audioSrc}
        customControls
        analyticsId="validation-demo"
      >
        Validation demo audio player
      </Audio>
    </div>
  );
}
```

### Enhanced Callbacks

Shows the comprehensive callback system for playback lifecycle management.

```typescript
import { Audio } from '@guyromellemagayano/components';
import { useState } from 'react';

function EnhancedCallbacksExample() {
  const [playbackState, setPlaybackState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playCount: 0,
  });

  const [eventLog, setEventLog] = useState<string[]>([]);

  const logEvent = (event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog(prev => [`${timestamp}: ${event}`, ...prev.slice(0, 9)]);
  };

  const callbacks = {
    onPlayStart: () => {
      setPlaybackState(prev => ({ 
        ...prev, 
        isPlaying: true, 
        playCount: prev.playCount + 1 
      }));
      logEvent('Playback started');
    },
    
    onPlayPause: () => {
      setPlaybackState(prev => ({ ...prev, isPlaying: false }));
      logEvent('Playback paused');
    },
    
    onPlayEnd: () => {
      setPlaybackState(prev => ({ ...prev, isPlaying: false }));
      logEvent('Playback completed');
    },
    
    onVolumeChangeCallback: (volume: number) => {
      setPlaybackState(prev => ({ ...prev, volume }));
      logEvent(`Volume changed to ${Math.round(volume * 100)}%`);
    },

    onTimeUpdate: (event: React.SyntheticEvent<HTMLAudioElement>) => {
      const audio = event.currentTarget;
      setPlaybackState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    },
  };

  return (
    <div>
      <h3>🎛️ Enhanced Callbacks Demo</h3>
      
      <Audio 
        src="/demo/callback-test.mp3"
        customControls
        {...callbacks}
        onTimeUpdate={callbacks.onTimeUpdate}
      >
        Callback demonstration audio
      </Audio>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4>📊 Playback State</h4>
          <p>Playing: {playbackState.isPlaying ? '▶️' : '⏸️'}</p>
          <p>Time: {AudioUtils.formatTime(playbackState.currentTime)} / {AudioUtils.formatTime(playbackState.duration)}</p>
          <p>Volume: {Math.round(playbackState.volume * 100)}%</p>
          <p>Play Count: {playbackState.playCount}</p>
        </div>

        <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4>📝 Event Log</h4>
          <div style={{ fontSize: '0.875rem', maxHeight: '150px', overflowY: 'auto' }}>
            {eventLog.map((event, index) => (
              <div key={index}>{event}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Polymorphic Rendering

Shows rendering as different elements with validation warnings.

```typescript
import { Audio } from '@guyromellemagayano/components';
import React from 'react';

function PolymorphicAudioExample() {
  const CustomDiv = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} className="custom-audio-container" />
  ));

  return (
    <div>
      <h3>⚠️ Polymorphic Rendering (Development Warnings)</h3>
      
      {/* This will show validation warnings in development */}
      <Audio
        as={CustomDiv}
        src="/audio/sample.mp3"
        controls  // This prop is invalid for div elements
        customControls={false}
        style={{ 
          border: '2px dashed #ffa500',
          padding: '1rem',
          borderRadius: '8px'
        }}
      >
        <p>This is rendered as a div with invalid audio props.</p>
        <p>Check console for validation warnings in development mode.</p>
      </Audio>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <strong>Note:</strong> When using the <code>as</code> prop with non-audio elements:
        <ul>
          <li>Audio-specific props (src, controls, etc.) will be invalid</li>
          <li>Native audio functionality will not work</li>
          <li>Development mode shows validation warnings</li>
          <li>Use only for special wrapper cases</li>
        </ul>
      </div>
    </div>
  );
}
```

### Client-Side Rendering

Demonstrates client-side rendering with dynamic audio management.

```typescript
import { Audio } from '@guyromellemagayano/components';
import React, { useState, useEffect } from 'react';

function ClientAudioExample() {
  const [playlist, setPlaylist] = useState([
    { id: 1, src: '/music/track1.mp3', title: 'Song One' },
    { id: 2, src: '/music/track2.mp3', title: 'Song Two' },
    { id: 3, src: '/music/track3.mp3', title: 'Song Three' },
  ]);
  
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);

  const handleTrackEnd = () => {
    const nextTrack = isShuffled 
      ? Math.floor(Math.random() * playlist.length)
      : (currentTrack + 1) % playlist.length;
    
    setCurrentTrack(nextTrack);
  };

  const currentSong = playlist[currentTrack];

  return (
    <div>
      <h3>🎵 Dynamic Playlist Player</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => setIsShuffled(!isShuffled)}
          style={{ 
            padding: '0.5rem 1rem',
            background: isShuffled ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {isShuffled ? '🔀 Shuffle ON' : '📄 Shuffle OFF'}
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4>Now Playing: {currentSong.title}</h4>
        <p>Track {currentTrack + 1} of {playlist.length}</p>
      </div>

      <Audio 
        key={currentSong.id} // Force re-render on track change
        src={currentSong.src}
        customControls
        isClient 
        isMemoized
        onPlayEnd={handleTrackEnd}
        analyticsId={`playlist-track-${currentSong.id}`}
        autoPlay // Auto-play next track
      >
        {currentSong.title}
      </Audio>

      <div style={{ marginTop: '1rem' }}>
        <h4>📋 Playlist</h4>
        {playlist.map((track, index) => (
          <button
            key={track.id}
            onClick={() => setCurrentTrack(index)}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              margin: '0.25rem 0',
              background: index === currentTrack ? '#e7f3ff' : '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            {index === currentTrack ? '▶️' : '⏸️'} {track.title}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for multimedia:

- **Semantic HTML**: Utilizes the native `<audio>` element with proper roles and attributes.
- **Keyboard Navigation**: Full keyboard support for all custom controls including play/pause, volume, and progress.
- **Screen Reader Support**: Comprehensive ARIA labels and live regions for state announcements.
- **Focus Management**: Logical focus order and visible focus indicators for all interactive elements.
- **Alternative Content**: Support for fallback content and text alternatives.
- **High Contrast**: Enhanced styling for high contrast mode with proper color ratios.
- **Reduced Motion**: Respects user's motion preferences by disabling animations.
- **Time Information**: Accessible time displays with proper formatting and announcements.

### ARIA Attributes

Comprehensive ARIA attributes are automatically applied:

- `role="application"`: Applied to custom audio players for screen reader context.
- `aria-label`: Descriptive labels for all control buttons and sliders.
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`: Proper slider accessibility for volume and progress.
- `aria-live="polite"`: Live regions for time updates and state changes.
- `aria-pressed`: Toggle states for play/pause and mute buttons.
- `aria-describedby`: Links to additional descriptive content.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.audio`: The base class with fundamental audio element styling.
- `.audio-wrapper`: Container wrapper for custom controls layout.

### Custom Controls Styling

The custom controls system includes comprehensive styling:

- `.audio__controls`: Main controls container with flexbox layout.
- `.audio__play-button`: Circular play/pause button with hover effects.
- `.audio__time-display`: Monospace time display with current/duration format.
- `.audio__progress-bar`: Interactive progress slider with custom thumb styling.
- `.audio__volume-controls`: Volume controls container.
- `.audio__volume-slider`: Volume slider with precise control.
- `.audio__mute-button`: Mute toggle button with icon states.

### State Modifiers

- `.audio--custom-controls`: Applied when using custom controls system.
- `.audio--loading`: Loading state with pulse animation.
- `.audio--error`: Error state with warning styling and icon.
- `.audio--invalid-source`: Visual indicator for invalid audio sources.

### Visual Features

The component includes sophisticated visual features:

- **Responsive Design**: Mobile-optimized controls with touch-friendly sizes
- **Smooth Animations**: CSS transitions for hover states and interactions
- **Custom Sliders**: Styled range inputs with custom thumbs and tracks
- **Loading States**: Animated loading indicators with proper feedback
- **Error Handling**: Clear error messaging with actionable feedback
- **Focus Indicators**: Prominent focus outlines for keyboard navigation
- **Dark Mode**: Comprehensive dark mode support with proper contrast ratios

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Variables**: Override the extensive set of CSS custom properties.
2. **CSS Classes**: Extend or override styles via the `className` prop.
3. **Inline Styles**: Apply component-specific styling via the `style` prop.
4. **Custom Content**: Replace loading and error content with custom components.

### CSS Variables

The component provides extensive styling customization:

```css
/* Base styling variables */
.audio {
  --color-background: #f8f9fa;
  --color-border: #e9ecef;
  --color-focus: #007bff;
  --color-primary: #007bff;
  --color-primary-hover: #0056b3;
  --color-disabled: #6c757d;
}

/* Custom controls styling */
.audio__play-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-primary);
  transition: all 0.2s ease-in-out;
}

.audio__progress-bar {
  height: 6px;
  background: var(--color-background-secondary);
  border-radius: 3px;
  cursor: pointer;
}

/* Responsive breakpoints */
@media (max-width: 640px) {
  .audio__controls {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .audio__play-button {
    width: 40px;
    height: 40px;
  }
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests, custom controls, analytics, and AudioUtils function tests.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Custom Controls**: Tests all control interactions including play/pause, volume, progress, and mute functionality.
- **State Management**: Tests loading states, error states, and playback state transitions.
- **Analytics Integration**: Validates comprehensive analytics tracking with detailed playback data.
- **Source Validation**: Tests audio format validation and invalid source handling.
- **Enhanced Callbacks**: Tests the complete callback system for playback lifecycle events.
- **Accessibility**: Ensures proper ARIA attributes, keyboard navigation, and screen reader compatibility.
- **Utility Functions**: Comprehensive tests for all AudioUtils functions including edge cases.
- **Error Handling**: Tests graceful handling of analytics failures and playback errors.
- **Client-Side Rendering**: Tests lazy loading and memoized components.

### Running Tests

To execute tests for the `Audio` component:

```bash
# Run all tests for the Audio component
pnpm test src/audio/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **State Optimization**: Efficient useState and useCallback usage for complex state management.
- **Audio Validation**: Fast source validation without loading entire files.
- **Custom Controls**: Optimized rendering of controls only when needed.
- **Analytics Batching**: Efficient analytics tracking with error handling.
- **Memory Management**: Proper cleanup of audio elements and event listeners.
- **Client-Side Code Splitting**: AudioClient components lazy-loaded on demand.
- **CSS Optimizations**: Hardware-accelerated animations and efficient transitions.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile with touch-friendly controls.
- **Audio Formats**: Support for MP3, WAV, OGG, M4A, AAC, and FLAC formats.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.

## 📘 TypeScript

Full TypeScript support is provided with comprehensive type safety:

```typescript
import { 
  Audio, 
  AudioUtils,
  type AudioProps, 
  type AudioRef 
} from '@guyromellemagayano/components';
import React, { useRef, useState } from 'react';

const MyAudioPlayer: React.FC = () => {
  const audioRef = useRef<AudioRef>(null);
  const [playbackData, setPlaybackData] = useState({
    isPlaying: false,
    currentTime: 0,
    volume: 1,
  });
  
  const handleAnalytics = (data: Parameters<NonNullable<AudioProps['onAnalytics']>>[0]) => {
    console.log(`Audio "${data.label}" - ${data.action}`, {
      duration: data.duration,
      position: data.position,
    });
  };

  const handleVolumeChange = (volume: number) => {
    setPlaybackData(prev => ({ ...prev, volume }));
  };

  // Type-safe utility usage
  const isValidSource = AudioUtils.validateSource('/music/song.mp3');
  const audioFormat = AudioUtils.getFormat('/music/song.mp3');
  const formattedTime = AudioUtils.formatTime(125);

  return (
    <Audio 
      ref={audioRef}
      src="/music/song.mp3"
      customControls
      showPlayButton
      showVolumeControl
      showTimeDisplay
      showProgressBar
      defaultVolume={0.8}
      analyticsId="main-player"
      onAnalytics={handleAnalytics}
      onVolumeChangeCallback={handleVolumeChange}
      onPlayStart={() => setPlaybackData(prev => ({ ...prev, isPlaying: true }))}
      onPlayPause={() => setPlaybackData(prev => ({ ...prev, isPlaying: false }))}
    >
      Professional audio player with TypeScript integration
    </Audio>
  );
};

// Access utility functions with full type safety
const sourceValid = AudioUtils.validateSource('https://example.com/audio.mp3');
const detectedFormat = AudioUtils.getFormat('data:audio/mpeg;base64,...');
const timeDisplay = AudioUtils.formatTime(3661); // "61:01"
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version to this `Audio` component:

1. **Import Changes**: Update to `import { Audio, AudioUtils } from '@guyromellemagayano/components';`.
2. **Custom Controls**: Migrate to the new custom controls system with individual feature toggles.
3. **Analytics Enhancement**: Update to the new analytics system with detailed playback data.
4. **Callback System**: Migrate to the enhanced callback system for playback lifecycle events.
5. **Utility Functions**: Migrate to use `AudioUtils` for source validation and time formatting.

### Breaking Changes

- Custom controls now require explicit feature props (`showPlayButton`, etc.)
- Analytics function signature changed to include `action`, `duration`, and `position` parameters
- Source validation is now automatic with visual feedback
- Enhanced callback system replaces simple event handlers

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Audio` component:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md).
2. **Test All Features**: Include tests for custom controls, analytics, state management, and utility functions.
3. **Update Documentation**: Keep controls system and analytics documentation current.
4. **Accessibility Focus**: Prioritize keyboard navigation and screen reader compatibility.
5. **Performance**: Ensure audio handling and state management remain efficient.

## 🔗 Related Components

- [Video](../video/README.md)
- [Canvas](../canvas/README.md)
- [Source](../source/README.md)
