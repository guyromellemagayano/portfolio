import React from "react";

// ============================================================================
// CENTRALIZED COMPONENT MOCKS
// ============================================================================

/**
 * Creates a mock component with consistent behavior
 */
const createMockComponent = (componentName: string) => {
  return React.forwardRef<HTMLElement, any>(function MockComponent(props, ref) {
    const {
      children,
      className,
      as = "div",
      debugId,
      debugMode,
      ...rest
    } = props;
    const Element = as as React.ElementType;

    return React.createElement(
      Element,
      {
        ref,
        className,
        "data-testid": `mock-${componentName.toLowerCase()}`,
        "data-debug-mode": debugMode ? "true" : undefined,
        ...rest,
      },
      children
    );
  });
};

// ============================================================================
// CARD COMPONENT MOCKS
// ============================================================================

export const Card = Object.assign(createMockComponent("Card"), {
  Title: React.forwardRef<HTMLHeadingElement, any>(
    function MockCardTitle(props, ref) {
      const { children, href, ...rest } = props;
      return React.createElement(
        "h2",
        {
          ref,
          "data-testid": "mock-card-title",
          ...rest,
        },
        href ? React.createElement("a", { href }, children) : children
      );
    }
  ),
  Description: React.forwardRef<HTMLParagraphElement, any>(
    function MockCardDescription(props, ref) {
      const { children, ...rest } = props;
      return React.createElement(
        "p",
        {
          ref,
          "data-testid": "mock-card-description",
          ...rest,
        },
        children
      );
    }
  ),
  Cta: React.forwardRef<HTMLDivElement, any>(function MockCardCta(props, ref) {
    const { children, ...rest } = props;
    return React.createElement(
      "div",
      {
        ref,
        "data-testid": "mock-card-cta",
        ...rest,
      },
      children
    );
  }),
  Eyebrow: React.forwardRef<HTMLParagraphElement, any>(
    function MockCardEyebrow(props, ref) {
      const { children, dateTime, ...rest } = props;
      return React.createElement(
        "p",
        {
          ref,
          "data-testid": "mock-card-eyebrow",
          ...rest,
        },
        dateTime
          ? React.createElement("time", { dateTime, ...rest }, children)
          : children
      );
    }
  ),
  Link: React.forwardRef<HTMLDivElement, any>(
    function MockCardLink(props, ref) {
      const { children, ...rest } = props;
      return React.createElement(
        "div",
        {
          ref,
          "data-testid": "mock-card-link",
          ...rest,
        },
        children
      );
    }
  ),
});

// ============================================================================
// CONTAINER COMPONENT MOCKS
// ============================================================================

export const Container = createMockComponent("Container");

export const ContainerInner = React.forwardRef<HTMLDivElement, any>(
  function MockContainerInner(props, ref) {
    const { children, ...rest } = props;
    return React.createElement(
      "div",
      {
        ref,
        "data-testid": "mock-container-inner",
        ...rest,
      },
      children
    );
  }
);

export const ContainerOuter = React.forwardRef<HTMLDivElement, any>(
  function MockContainerOuter(props, ref) {
    const { children, ...rest } = props;
    return React.createElement(
      "div",
      {
        ref,
        "data-testid": "mock-container-outer",
        ...rest,
      },
      children
    );
  }
);

// ============================================================================
// FOOTER COMPONENT MOCKS
// ============================================================================

export const Footer = createMockComponent("Footer");

export const FooterLegal = React.forwardRef<HTMLParagraphElement, any>(
  function MockFooterLegal(props, ref) {
    const { children, ...rest } = props;
    return React.createElement(
      "p",
      {
        ref,
        "data-testid": "mock-footer-legal",
        ...rest,
      },
      children || "&copy; 2024 Guy Romelle Magayano. All rights reserved."
    );
  }
);

export const FooterNavigation = React.forwardRef<HTMLElement, any>(
  function MockFooterNavigation(props, ref) {
    const { children, ...rest } = props;
    const defaultLinks = [
      React.createElement("a", { key: "about", href: "/about" }, "About"),
      React.createElement(
        "a",
        { key: "articles", href: "/articles" },
        "Articles"
      ),
      React.createElement(
        "a",
        { key: "projects", href: "/projects" },
        "Projects"
      ),
      React.createElement(
        "a",
        { key: "speaking", href: "/speaking" },
        "Speaking"
      ),
      React.createElement("a", { key: "uses", href: "/uses" }, "Uses"),
    ];

    return React.createElement(
      "nav",
      {
        ref,
        "data-testid": "mock-footer-navigation",
        ...rest,
      },
      children || defaultLinks
    );
  }
);

// ============================================================================
// ARTICLE COMPONENT MOCKS
// ============================================================================

export const ArticleBase = createMockComponent("ArticleBase");
export const ArticleLayout = createMockComponent("ArticleLayout");
export const ArticleList = createMockComponent("ArticleList");
export const ArticleListItem = createMockComponent("ArticleListItem");
export const ArticleNavButton = createMockComponent("ArticleNavButton");

// ============================================================================
// OTHER COMPONENT MOCKS
// ============================================================================

export const Prose = createMockComponent("Prose");
export const Icon = {
  ArrowLeft: createMockComponent("IconArrowLeft"),
  ArrowRight: createMockComponent("IconArrowRight"),
};

// ============================================================================
// UTILITY COMPONENT MOCKS
// ============================================================================

export const Div = React.forwardRef<HTMLDivElement, any>(
  function MockDiv(props, ref) {
    const { children, ...rest } = props;
    return React.createElement(
      "div",
      {
        ref,
        "data-testid": "mock-div",
        ...rest,
      },
      children
    );
  }
);

export const Span = React.forwardRef<HTMLSpanElement, any>(
  function MockSpan(props, ref) {
    const { children, ...rest } = props;
    return React.createElement(
      "span",
      {
        ref,
        "data-testid": "mock-span",
        ...rest,
      },
      children
    );
  }
);
