import React from "react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link destination URL */
  href: string;
  /** Content to display within the link */
  children: React.ReactNode;
  /** Whether to open in a new tab/window */
  newTab?: boolean;
  /** Whether this is an external link (auto-detected if not specified) */
  external?: boolean;
  /** Link variant style */
  variant?: "primary" | "secondary" | "underline" | "button";
  /** Link size */
  size?: "small" | "medium" | "large";
  /** Whether the link is disabled */
  disabled?: boolean;
  /** Custom analytics tracking */
  trackingId?: string;
  /** Called when link is clicked */
  onLinkClick?: (
    href: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => void;
}

export type LinkRef = React.ComponentRef<"a">;

/**
 * Enhanced link component with security, accessibility, and performance optimizations.
 * Automatically handles external links with proper security attributes.
 */
export const Link = React.forwardRef<LinkRef, LinkProps>((props, ref) => {
  const {
    href,
    children,
    newTab = false,
    external: externalProp,
    variant = "primary",
    size = "medium",
    disabled = false,
    trackingId,
    onLinkClick,
    className,
    onClick,
    rel: relProp,
    target: targetProp,
    "aria-label": ariaLabel,
    ...rest
  } = props;

  // Auto-detect external links
  const isExternal =
    externalProp ??
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//"));

  // Determine if should open in new tab
  const shouldOpenNewTab = newTab || isExternal;

  // Build security and accessibility attributes
  const target = targetProp || (shouldOpenNewTab ? "_blank" : undefined);

  // Security attributes for external links
  let rel = relProp || "";
  if (shouldOpenNewTab) {
    const relParts = new Set(rel.split(" ").filter(Boolean));
    relParts.add("noopener");
    if (isExternal) {
      relParts.add("noreferrer");
    }
    rel = Array.from(relParts).join(" ");
  }

  // Handle click events
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      // Analytics tracking
      if (trackingId && typeof window !== "undefined") {
        try {
          const gtag = (
            window as unknown as { gtag?: (...args: unknown[]) => void }
          ).gtag;
          if (gtag) {
            gtag("event", "click", {
              event_category: "link",
              event_label: trackingId,
              value: href,
              external: isExternal,
            });
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.warn("Link analytics tracking failed:", error);
          }
        }
      }

      // Custom click handler
      onLinkClick?.(href, event);

      // Original click handler
      onClick?.(event);
    },
    [disabled, trackingId, href, isExternal, onLinkClick, onClick]
  );

  // Build CSS classes
  const baseClass = "link";
  const variantClass = `link--${variant}`;
  const sizeClass = `link--${size}`;
  const disabledClass = disabled ? "link--disabled" : "";
  const externalClass = isExternal ? "link--external" : "";

  const linkClassName = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    externalClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Validate href for security
  const isValidHref = href && !href.toLowerCase().startsWith("javascript:");

  if (!isValidHref) {
    console.warn("Link: Potentially unsafe href detected:", href);
    return (
      <span
        className={`${linkClassName} link--invalid`}
        aria-label="Invalid link"
        role="text"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel || undefined}
      className={linkClassName}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      data-external={isExternal}
      data-tracking-id={trackingId}
      {...rest}
    >
      {children}
      {isExternal && (
        <span className="link-external-indicator" aria-hidden="true">
          ↗
        </span>
      )}
    </a>
  );
});

Link.displayName = "Link";

// Memoized version for performance optimization
export const MemoizedLink = React.memo(Link);

export default Link;
