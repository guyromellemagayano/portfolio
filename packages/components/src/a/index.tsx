import React, { Suspense, useCallback, useMemo } from "react";

import { type CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const AClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AClient };
});

const MemoizedAClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAClient };
});

export type ARef = React.ComponentRef<"a">;
export type AVariant = "default" | "primary" | "secondary" | "unstyled";

export interface AProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    CommonComponentProps {
  /** Visual variant of the link */
  variant?: AVariant;
  /** Whether the link is currently active */
  active?: boolean;
  /** Whether the link is disabled */
  disabled?: boolean;
  /** Whether the link is in a loading state */
  loading?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Icon to display alongside the link text */
  icon?: React.ReactNode;
  /** Tooltip text for the link */
  tooltip?: string;
  /** Confirmation message before navigation */
  confirm?: string;
  /** Whether to prefetch the link */
  prefetch?: boolean;
  /** Position of the icon relative to text */
  iconPosition?: "left" | "right";
  /** Whether to show loading spinner */
  showSpinner?: boolean;
}

// =============================================================================
// LINK VALIDATION & SECURITY UTILITIES
// =============================================================================

/**
 * Checks if a URL is external (starts with http:// or https://)
 * Used to apply security attributes and styling
 */
function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * Validates href safety by checking for javascript: protocol
 * Prevents XSS attacks via malicious javascript: URLs
 */
function isSafeHref(href: string): boolean {
  return !/^javascript:/i.test(href);
}

/**
 * Checks if URL is a mailto link
 * Used for special handling of email links
 */
function isMailto(href: string): boolean {
  return href.startsWith("mailto:");
}

/**
 * Checks if URL is a telephone link
 * Used for special handling of phone number links
 */
function isTel(href: string): boolean {
  return href.startsWith("tel:");
}

// =============================================================================
// ANALYTICS INTEGRATION
// =============================================================================

/**
 * Fires Google Analytics event for link interactions
 * Gracefully handles missing gtag and provides error logging
 */
function fireAnalytics(
  analyticsId?: string,
  event?: React.MouseEvent<HTMLAnchorElement>,
  href?: string
): void {
  if (!analyticsId || !event) return;

  try {
    // Google Analytics implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "click", {
        event_category: "link",
        event_label: analyticsId,
        link_url: href,
      });
    }
  } catch (error) {
    console.warn("Analytics tracking failed:", error);
  }
}

// =============================================================================
// UI COMPONENTS
// =============================================================================

/**
 * Loading spinner component for link loading states
 * Provides accessible loading indicator with ARIA support
 */
function LoadingSpinner(): React.ReactElement {
  return (
    <span className="a__spinner" role="status">
      <svg
        className="a__spinner-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="a__spinner-track"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.25"
        />
        <path
          className="a__spinner-indicator"
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 12 12;360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="31.416;0"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
  );
}

/**
 * Universal anchor component with variants, analytics, and accessibility.
 * Supports server-side and client-side rendering.
 *
 * ⚠️ Warning: href, target, download, hrefLang, ping, rel, and referrerPolicy props are
 * primarily meaningful for <a> elements. When using with other elements via the 'as' prop,
 * these attributes may be invalid or have no effect.
 */
const AComponent = React.forwardRef<ARef, AProps>((props, ref) => {
  const {
    href = "#",
    variant = "default",
    active = false,
    disabled = false,
    loading = false,
    analyticsId,
    icon,
    iconPosition = "left",
    as: Component = "a",
    tooltip,
    confirm,
    prefetch = false,
    isClient = false,
    isMemoized = false,
    children,
    className,
    onClick,
    onKeyDown,
    style,
    ...rest
  } = props;

  const asElement = typeof Component === "string" ? Component : "unknown";

  // Runtime validation for development - warns about invalid prop usage
  useMemo(() => {
    if (process.env.NODE_ENV === "development" && asElement !== "a") {
      const anchorProps = {
        href,
        target: rest.target,
        download: rest.download,
        hrefLang: rest.hrefLang,
        ping: rest.ping,
        rel: rest.rel,
        referrerPolicy: rest.referrerPolicy,
      };

      const invalidProps = Object.keys(anchorProps).filter(
        (prop) =>
          anchorProps[prop as keyof typeof anchorProps] !== undefined &&
          anchorProps[prop as keyof typeof anchorProps] !== null
      );

      if (invalidProps.length > 0) {
        console.warn(
          `A: The following props are only valid for <a> elements: ${invalidProps.join(", ")}.\n` +
            `You're rendering as <${asElement}>. These props define link behavior and are primarily meaningful for anchor elements.\n` +
            `Consider using a semantic <a> element or removing these props.`
        );
      }
    }
  }, [
    asElement,
    href,
    rest.target,
    rest.download,
    rest.hrefLang,
    rest.ping,
    rest.rel,
    rest.referrerPolicy,
  ]);

  // Computed values
  const safeHref = useMemo(() => (isSafeHref(href) ? href : "#"), [href]);
  const isExternalLink = useMemo(() => isExternal(href), [href]);
  const isSpecialLink = useMemo(() => isMailto(href) || isTel(href), [href]);

  // Props with accessibility and security
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      href: safeHref,
      rel: isExternalLink ? "noopener noreferrer" : rest.rel,
      target: isExternalLink ? "_blank" : rest.target,
      "aria-disabled": disabled || loading,
      "aria-label": tooltip || rest["aria-label"],
      "aria-describedby": tooltip
        ? `${analyticsId || "link"}-tooltip`
        : rest["aria-describedby"],
      "aria-current": active ? "page" : rest["aria-current"],
      "data-variant": variant,
      "data-active": active,
      "data-disabled": disabled || loading,
      "data-loading": loading,
      "data-polymorphic-element": asElement !== "a" ? asElement : undefined,
      "data-element-validation":
        process.env.NODE_ENV === "development" && asElement !== "a"
          ? "warning"
          : undefined,
      className: [
        "a",
        `a--${variant}`,
        active && "a--active",
        (disabled || loading) && "a--disabled",
        loading && "a--loading",
        icon && `a--with-icon a--icon-${iconPosition}`,
        className,
      ]
        .filter(Boolean)
        .join(" "),
      style: {
        ...style,
        pointerEvents: disabled || loading ? "none" : style?.pointerEvents,
      },
      tabIndex: disabled || loading ? -1 : rest.tabIndex,
    }),
    [
      rest,
      safeHref,
      isExternalLink,
      disabled,
      loading,
      tooltip,
      analyticsId,
      active,
      variant,
      icon,
      iconPosition,
      className,
      style,
    ]
  );

  // Event handlers
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }

      if (confirm && !window.confirm(confirm)) {
        event.preventDefault();
        return;
      }

      fireAnalytics(analyticsId, event, href);
      onClick?.(event);
    },
    [disabled, loading, confirm, analyticsId, href, onClick]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      // Keyboard navigation
      if (event.key === "Enter" || event.key === " ") {
        if (disabled || loading) {
          event.preventDefault();
          return;
        }

        if (confirm && !window.confirm(confirm)) {
          event.preventDefault();
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fireAnalytics(analyticsId, event as any, href);
      }

      onKeyDown?.(event);
    },
    [disabled, loading, confirm, analyticsId, href, onKeyDown]
  );

  // Link prefetching
  const handleMouseEnter = useCallback(() => {
    if (prefetch && !isSpecialLink && !isExternalLink) {
      // Implement prefetch logic here
      // e.g., router.prefetch(href)
    }
  }, [prefetch, isSpecialLink, isExternalLink, href]);

  // Icon rendering
  const renderIcon = useCallback(() => {
    if (!icon) return null;

    return (
      <span className={`a__icon a__icon--${iconPosition}`} aria-hidden="true">
        {icon}
      </span>
    );
  }, [icon, iconPosition]);

  // Content rendering
  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <>
          {renderIcon()}
          <LoadingSpinner />
          {children}
        </>
      );
    }

    return (
      <>
        {iconPosition === "left" && renderIcon()}
        {children}
        {iconPosition === "right" && renderIcon()}
      </>
    );
  }, [loading, children, icon, iconPosition, renderIcon]);

  // Base element
  const element = (
    <Component
      ref={ref}
      {...enhancedProps}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
    >
      {renderContent()}
    </Component>
  );

  // Tooltip
  const tooltipElement = tooltip && (
    <div
      id={`${analyticsId || "link"}-tooltip`}
      className="a__tooltip"
      role="tooltip"
    >
      {tooltip}
    </div>
  );

  // Handle client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAClient : AClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...props} ref={ref}>
          {children}
        </ClientComponent>
        {tooltipElement}
      </Suspense>
    );
  }

  return (
    <>
      {element}
      {tooltipElement}
    </>
  );
});

AComponent.displayName = "A";

// Export the server component
export const A = AComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default A;
