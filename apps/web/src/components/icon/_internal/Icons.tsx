import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "../_data";

// ============================================================================
// NAVIGATION ICON COMPONENTS
// ============================================================================

/** Chevron down icon. */
const ChevronDownIcon: CommonIconComponent = setDisplayName(
  function ChevronDownIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={`${id}-icon-chevron-down`}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-chevron-down"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>
    );

    return element;
  }
);

/** Chevron right icon. */
const ChevronRightIcon: CommonIconComponent = setDisplayName(
  function ChevronRightIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={`${id}-icon-chevron-right`}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-chevron-right"
      >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    );

    return element;
  }
);

/** Arrow left icon. */
const ArrowLeftIcon: CommonIconComponent = setDisplayName(
  function ArrowLeftIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={`${id}-icon-arrow-left`}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-arrow-left"
      >
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    );

    return element;
  }
);

// ============================================================================
// SOCIAL ICON COMPONENTS
// ============================================================================

/** X (Twitter) icon. */
const XIcon: CommonIconComponent = setDisplayName(function XIcon(props) {
  const { _internalId, _debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  const element = (
    <svg
      {...rest}
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-icon-id={`${id}-icon-x-twitter`}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="icon-x-twitter"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  return element;
});

/** Instagram icon. */
const InstagramIcon: CommonIconComponent = setDisplayName(
  function InstagramIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={`${id}-icon-instagram`}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-instagram"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );

    return element;
  }
);

/** LinkedIn icon. */
const LinkedInIcon: CommonIconComponent = setDisplayName(
  function LinkedInIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={`${id}-icon-linkedin`}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-linkedin"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );

    return element;
  }
);

/** GitHub icon. */
const GitHubIcon: CommonIconComponent = setDisplayName(
  function GitHubIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={`${id}-icon-github`}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-github"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );

    return element;
  }
);

// ============================================================================
// UI ICON COMPONENTS
// ============================================================================

/** Close icon. */
const CloseIcon: CommonIconComponent = setDisplayName(
  function CloseIcon(props) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-close"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    );

    return element;
  }
);

/** Sun icon. */
const SunIcon: CommonIconComponent = setDisplayName(function SunIcon(props) {
  const { _internalId, _debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  const element = (
    <svg
      {...rest}
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-icon-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="icon-sun"
    >
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
    </svg>
  );

  return element;
});

/** Moon icon. */
const MoonIcon: CommonIconComponent = setDisplayName(function MoonIcon(props) {
  const { _internalId, _debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  const element = (
    <svg
      {...rest}
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-icon-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="icon-moon"
    >
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  );

  return element;
});

export {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  XIcon,
};
