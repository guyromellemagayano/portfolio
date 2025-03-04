# A HTML Component

This repository contains a flexible anchor (`<a>`) component that can be rendered on the server or the client. The goal is to allow a single interface for creating anchor tags - on the server by default, or on the client via lazy loading when interactive features are required.

## Overview

### Files and Structure

```bash
├── A.client.tsx
├── A.tsx
├── README.md
└── index.ts
```

**A.tsx** - The server component implementation. It renders a basic `<a>` element by default. If `isClient` is passed in as `true`, it switches to loading the client version of the component lazily.

**A.client.tsx** - The client component implementation, which uses **React**’s `forwardRef` for **DOM** references. It can handle client-side interactivity _(e.g., custom event listeners or dynamic style changes)_.

**index.ts** - An export barrel that re-exports everything from **A.tsx**.

## Current Features

**Server-Side Rendering (SSR) by Default** - By default, the `<a>` component is rendered on the server, benefiting from faster initial load times and improved **SEO**.

**Client-Side Rendering Option** - Passing `isClient` as `true` will utilize **React**’s `lazy/Suspense` to load a specialized client component dynamically, allowing for client-side interactivity if required.

**Forwarded Refs** - The client component supports `forwardRef`, meaning you can use it to get direct access to the underlying `<a>` **DOM** element _(e.g., for focusing programmatically)._

**Typed Props** - Using **TypeScript** interfaces (`AProps` and `ARef`), it helps ensure strong typing for anchor attributes and any extra custom props.

**Fallback Render** - When `isClient` is `true` but the client bundle hasn’t loaded yet, a fallback server-rendered `<a>` component is shown during the **suspense** phase, providing a seamless user experience.

## Possible Future Features

Below is a list of ideas that could be integrated into the component to extend functionality or improve usability for both the server and client implementations.

### Server Component Feature Ideas

#### Security Enhancements

- Automatic sanitization of `href` attributes to mitigate potential security issues.
- Built-in policy enforcement for `rel="noopener noreferrer"` or `target="_blank"` by default.

#### Advanced SEO Attributes

- Automatic assignment of `rel="nofollow"` or `rel="ugc"` for certain outgoing links.
- Enhanced meta-information for **SSR** to help with link previews in social media.

#### Conditional Rendering

- Logic to render different styles or content server-side depending on environment or user agent data.

#### Global Configuration Support

- A utility to define default behaviors _(e.g., default `target`, `rel`)_ that apply to all `A` components in the application.

---

### Client Component Feature Ideas

#### Interactive States

- Built-in handling of `hover`, `focus`, and `active` states with added animations or transitions.
- Optional use of custom **React** hooks for link-based interactions _(e.g., intercepting link clicks for analytics)_.

#### Analytics / Tracking

- Integration with analytics providers to track link clicks.
- Customizable events for advanced analytics _(e.g., event names, categories)_.

#### Progress Indicators

- A loading indicator _(spinner or progress bar)_ that appears while content is fetched when `isClient` is true.

#### Feature Detection

- Conditional enabling of client-side features depending on user agent capabilities _(e.g., only enable certain JavaScript-based functionalities if the browser supports them)_.

#### Dynamic Styling / Theming

- Integration with a theming system _(e.g., styled-components, CSS modules)_.
- Automatic switching of **CSS** classes or inline styles in response to user actions or theme changes.
