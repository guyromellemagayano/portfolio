import { forwardRef } from "react";

import type { CommonComponentProps } from "../types";

export type ButtonRef = React.ElementRef<"button">;
export interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** The type of button (button, submit, reset) */
  type?: "button" | "submit" | "reset";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** The variant of the button */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  /** The size of the button */
  size?: "sm" | "md" | "lg";
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Analytics event name for tracking */
  analyticsEvent?: string;
  /** Analytics properties for tracking */
  analyticsProperties?: Record<string, unknown>;
  /** Allow any additional props for polymorphic usage */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Button component with polymorphic support, analytics, and modern styling.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * <Button as="a" href="/link" variant="outline">
 *   Link Button
 * </Button>
 * ```
 */
export const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      as: Component = "button",
      type = "button",
      disabled = false,
      loading = false,
      variant = "primary",
      size = "md",
      fullWidth = false,
      analyticsEvent,
      analyticsProperties,
      className,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    // Debug logging
    if (process.env.NODE_ENV === "development") {
      console.log("Button Component:", Component);
      console.log("Button props:", { as: Component, ...rest });
    }

    // Analytics tracking
    const handleAnalytics = (
      eventName: string,
      properties?: Record<string, unknown>
    ) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, {
          component: "Button",
          variant,
          size,
          ...properties,
        });
      }
    };

    // Event handlers with analytics
    const handleClick = (event: React.MouseEvent<ButtonRef>) => {
      if (analyticsEvent) {
        handleAnalytics(analyticsEvent, analyticsProperties);
      }
      onClick?.(event);
    };

    const handleMouseEnter = (event: React.MouseEvent<ButtonRef>) => {
      handleAnalytics("button_hover", { variant, size });
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<ButtonRef>) => {
      handleAnalytics("button_leave", { variant, size });
      onMouseLeave?.(event);
    };

    const handleFocus = (event: React.FocusEvent<ButtonRef>) => {
      handleAnalytics("button_focus", { variant, size });
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<ButtonRef>) => {
      handleAnalytics("button_blur", { variant, size });
      onBlur?.(event);
    };

    // Generate BEM class names
    const baseClass = "button";
    const variantClass = `${baseClass}--${variant}`;
    const sizeClass = `${baseClass}--${size}`;
    const stateClasses = [
      disabled && `${baseClass}--disabled`,
      loading && `${baseClass}--loading`,
      fullWidth && `${baseClass}--full-width`,
    ]
      .filter(Boolean)
      .join(" ");

    const buttonClasses = [
      baseClass,
      variantClass,
      sizeClass,
      stateClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Determine if the button should be disabled
    const isDisabled = disabled || loading;

    // Props for the component
    const asElement = typeof Component === "string" ? Component : "unknown";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const componentProps: any = {
      ref,
      className: buttonClasses,
      disabled: isDisabled,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ...rest,
      ...(asElement !== "button" && { "data-polymorphic-element": asElement }),
    };

    // Add type prop only for button elements
    if (Component === "button") {
      componentProps.type = type;
    }

    return (
      <Component {...componentProps}>
        {loading && <span className={`${baseClass}__loading-spinner`} />}
        <span className={`${baseClass}__content`}>{children}</span>
      </Component>
    );
  }
);

Button.displayName = "Button";
