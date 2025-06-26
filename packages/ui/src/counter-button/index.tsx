"use client";

import React, { useCallback, useState } from "react";

export interface CounterButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Initial count value */
  initialValue?: number;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment/decrement amount */
  step?: number;
  /** Custom label for accessibility */
  label?: string;
  /** Called when count changes */
  onCountChange?: (count: number) => void;
  /** Button variant style */
  variant?: "primary" | "secondary" | "outline";
  /** Button size */
  size?: "small" | "medium" | "large";
  /** Whether the button is disabled */
  disabled?: boolean;
}

export type CounterButtonRef = React.ComponentRef<"button">;

/**
 * Enhanced counter button component with accessibility and customization support.
 * Follows industry best practices for React component development.
 */
export const CounterButton = React.forwardRef<
  CounterButtonRef,
  CounterButtonProps
>((props, ref) => {
  const {
    initialValue = 0,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    label = "Counter",
    onCountChange,
    variant = "primary",
    size = "medium",
    disabled = false,
    className,
    style,
    "aria-label": ariaLabel,
    ...rest
  } = props;

  const [count, setCount] = useState(initialValue);

  const handleClick = useCallback(() => {
    if (disabled) return;

    const newCount = Math.min(max, Math.max(min, count + step));

    if (newCount !== count) {
      setCount(newCount);
      onCountChange?.(newCount);
    }
  }, [count, min, max, step, disabled, onCountChange]);

  const isAtMax = count >= max;
  const isAtMin = count <= min;
  const isDisabled = disabled || (step > 0 && isAtMax) || (step < 0 && isAtMin);

  // Build CSS classes
  const baseClass = "counter-button";
  const variantClass = `counter-button--${variant}`;
  const sizeClass = `counter-button--${size}`;
  const disabledClass = isDisabled ? "counter-button--disabled" : "";

  const buttonClassName = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="counter-button-container">
      <label htmlFor={`counter-${label}`} className="counter-button-label">
        {label}
      </label>
      <button
        ref={ref}
        id={`counter-${label}`}
        type="button"
        className={buttonClassName}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={ariaLabel || `${label}: ${count}`}
        aria-describedby={`counter-${label}-description`}
        style={style}
        {...rest}
      >
        Count: {count}
      </button>
      <div
        id={`counter-${label}-description`}
        className="counter-button-description"
      >
        Current value: {count}
        {min !== Number.MIN_SAFE_INTEGER && `, minimum: ${min}`}
        {max !== Number.MAX_SAFE_INTEGER && `, maximum: ${max}`}
      </div>
    </div>
  );
});

CounterButton.displayName = "CounterButton";

// Memoized version for performance optimization
export const MemoizedCounterButton = React.memo(CounterButton);

export default CounterButton;
