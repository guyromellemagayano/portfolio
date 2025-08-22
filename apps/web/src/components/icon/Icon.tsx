import React from "react";

import {
  Svg,
  type SvgProps,
  type SvgRef,
} from "@guyromellemagayano/components";
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";

import type { CommonWebAppComponentProps } from "@web/@types/components";

// ============================================================================
// MAIN ICON COMPONENT
// ============================================================================

type IconRef = SvgRef;
interface IconProps extends SvgProps, CommonWebAppComponentProps {}

type CommonIconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<IconRef>
>;

type IconsComponent = CommonIconComponent & {
  X: CommonIconComponent;
  Instagram: CommonIconComponent;
  LinkedIn: CommonIconComponent;
  GitHub: CommonIconComponent;
  Close: CommonIconComponent;
  Sun: CommonIconComponent;
  Moon: CommonIconComponent;
  ChevronDown: CommonIconComponent;
  ChevronRight: CommonIconComponent;
  ArrowLeft: CommonIconComponent;
};

/** Generic icon component for rendering SVG icons with shared props and features. */
export const Icon = setDisplayName(
  React.forwardRef(function Icon(props, ref) {
    const {
      children,
      as: Component = Svg,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    // Prevent empty usage - require either children or use compound components
    if (!children) {
      throw new Error(
        "Icon component requires SVG content. Either:\n" +
          "1. Use predefined icons: <Icon.X />, <Icon.ChevronRight />, etc.\n" +
          '2. Add custom SVG content: <Icon><path d="..." /></Icon>'
      );
    }

    const element = (
      <Component
        {...rest}
        ref={ref}
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-root"
      >
        {children}
      </Component>
    );

    return element;
  })
) as IconsComponent;

// ============================================================================
// SOCIAL ICON COMPONENTS
// ============================================================================

/** X (Twitter) icon. */
const XIcon = setDisplayName(
  React.forwardRef(function XIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-x-root"
      >
        <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** Instagram icon. */
const InstagramIcon = setDisplayName(
  React.forwardRef(function InstagramIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-instagram-root"
      >
        <path d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z" />
        <path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z" />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** LinkedIn icon. */
const LinkedInIcon = setDisplayName(
  React.forwardRef(function LinkedInIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-linkedin-root"
      >
        <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** GitHub icon. */
const GitHubIcon = setDisplayName(
  React.forwardRef(function GitHubIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-github-root"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
        />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** Close icon. */
const CloseIcon = setDisplayName(
  React.forwardRef(function CloseIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-close-root"
      >
        <path
          d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** Sun icon. */
const SunIcon = setDisplayName(
  React.forwardRef(function SunIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-sun-root"
      >
        <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
        <path
          d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
          fill="none"
        />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** Moon icon. */
const MoonIcon = setDisplayName(
  React.forwardRef(function MoonIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-moon-root"
      >
        <path
          d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

// ============================================================================
// MISCELLANEOUS ICON COMPONENTS
// ============================================================================

/** Chevron down icon. */
const ChevronDownIcon = setDisplayName(
  React.forwardRef(function ChevronDownIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 8 6"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-chevron-down-root"
      >
        <path
          d="M1.75 1.75 4 4.25l2.25-2.5"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** Chevron right icon. */
const ChevronRightIcon = setDisplayName(
  React.forwardRef(function ChevronRightIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-chevron-right-root"
      >
        <path
          d="M6.75 5.75 9.25 8l-2.5 2.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

/** Arrow left icon. */
const ArrowLeftIcon = setDisplayName(
  React.forwardRef(function ArrowLeftIcon(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Svg
        {...rest}
        ref={ref}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        data-icon-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="icon-arrow-left-root"
      >
        <path
          d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );

    return element;
  })
) as CommonIconComponent;

Icon.X = XIcon;
Icon.Instagram = InstagramIcon;
Icon.LinkedIn = LinkedInIcon;
Icon.GitHub = GitHubIcon;
Icon.Close = CloseIcon;
Icon.Sun = SunIcon;
Icon.Moon = MoonIcon;
Icon.ChevronDown = ChevronDownIcon;
Icon.ChevronRight = ChevronRightIcon;
Icon.ArrowLeft = ArrowLeftIcon;
