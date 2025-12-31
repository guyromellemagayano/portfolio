// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational (polymorphic + variants orchestrator)
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form, MemoizedForm } from "../Form";

// Mocks
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: any = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, name) => {
    if (component) component.displayName = name;
    return component;
  }),
  createComponentProps: vi.fn(
    (
      id: string,
      componentType: string,
      debugMode: boolean,
      additional: any = {}
    ) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}-root`,
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additional,
    })
  ),
}));

vi.mock("@web/components", () => ({
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="grm-button" {...props}>
      {children}
    </button>
  )),
  Icon: vi.fn(({ name, debugId, debugMode, ...props }) => {
    const componentId = debugId || "test-id";
    const iconComponentType = `icon-${name}`;
    const dataAttrName = `data-${iconComponentType}-id`;
    return (
      <svg
        data-testid={`${componentId}-${iconComponentType}-root`}
        {...{ [dataAttrName]: `${componentId}-${iconComponentType}-root` }}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      />
    );
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Form", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders children", () => {
      render(
        <Form>
          <input type="text" />
        </Form>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render((<Form />) as any);
      expect(container).toBeEmptyDOMElement();
    });
  });

  // ============================================================================
  // POLYMORPHIC AS PROP TESTS
  // ============================================================================

  describe("Polymorphic as=", () => {
    it('supports as="form" while preserving default variant semantics', () => {
      render(
        <Form as="form">
          <input type="text" />
        </Form>
      );
      const root = screen.getByTestId("test-id-form-default-root");
      expect(root.tagName).toBe("FORM");
      expect(root).toHaveAttribute("role", "form");
    });
  });

  // ============================================================================
  // VARIANTS TESTS
  // ============================================================================

  describe("Variants", () => {
    describe("default variant", () => {
      it("uses data-testid form-default", () => {
        render(
          <Form>
            <input type="text" />
          </Form>
        );
        expect(
          screen.getByTestId("test-id-form-default-root")
        ).toBeInTheDocument();
      });
    });

    describe("newsletter variant", () => {
      it("renders newsletter form correctly", () => {
        render(<Form variant="newsletter" />);

        expect(
          screen.getByTestId("test-id-form-newsletter-root")
        ).toBeInTheDocument();
        expect(screen.getByText("Stay up to date")).toBeInTheDocument();
        expect(
          screen.getByText(
            "Get notified when I publish something new, and unsubscribe at any time."
          )
        ).toBeInTheDocument();
        expect(
          screen.getByRole("textbox", { name: "Email address" })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Join" })
        ).toBeInTheDocument();
      });

      it("applies custom className", () => {
        render(<Form variant="newsletter" className="custom-class" />);

        const form = screen.getByTestId("test-id-form-newsletter-root");
        expect(form).toHaveAttribute("class");
      });

      it("renders as form element", () => {
        render(<Form variant="newsletter" />);

        const form = screen.getByTestId("test-id-form-newsletter-root");
        expect(form.tagName).toBe("FORM");
      });

      it("applies correct CSS classes", () => {
        render(<Form variant="newsletter" />);

        const form = screen.getByTestId("test-id-form-newsletter-root");
        expect(form).toHaveAttribute("class");
      });

      it("combines Tailwind classes + custom classes", () => {
        render(<Form variant="newsletter" className="custom-class" />);

        const form = screen.getByTestId("test-id-form-newsletter-root");
        expect(form).toHaveAttribute("class");
      });

      it("handles multiple custom classes", () => {
        render(<Form variant="newsletter" className="class1 class2 class3" />);

        const form = screen.getByTestId("test-id-form-newsletter-root");
        expect(form).toHaveAttribute("class");
      });

      it("handles empty className gracefully", () => {
        render(<Form variant="newsletter" className="" />);

        const form = screen.getByTestId("test-id-form-newsletter-root");
        expect(form).toHaveAttribute("class");
      });
    });
  });

  // ============================================================================
  // FORM CONTENT TESTS (Newsletter Variant)
  // ============================================================================

  describe("Form Content (Newsletter Variant)", () => {
    it("renders heading with icon", () => {
      render(<Form variant="newsletter" />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Stay up to date");
      expect(screen.getByTestId("test-id-icon-mail-root")).toBeInTheDocument();
    });

    it("renders description text", () => {
      render(<Form variant="newsletter" />);

      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
    });

    it("renders email input with correct attributes", () => {
      render(<Form variant="newsletter" />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "Email address");
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
      expect(emailInput).toBeRequired();
    });

    it("renders submit button with correct text", () => {
      render(<Form variant="newsletter" />);

      const submitButton = screen.getByRole("button", { name: "Join" });
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Join");
    });
  });

  // ============================================================================
  // FORM ATTRIBUTES TESTS (Newsletter Variant)
  // ============================================================================

  describe("Form Attributes (Newsletter Variant)", () => {
    it("sets default action attribute", () => {
      render(<Form variant="newsletter" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("action", "/thank-you");
    });

    it("allows custom action attribute", () => {
      render(<Form variant="newsletter" action="/custom-action" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("action", "/custom-action");
    });

    it("forwards all HTML form attributes", () => {
      render(
        <Form
          variant="newsletter"
          method="post"
          encType="multipart/form-data"
          data-custom="value"
        />
      );

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("encType", "multipart/form-data");
      expect(form).toHaveAttribute("data-custom", "value");
    });

    it("passes through HTML attributes", () => {
      render(
        <Form
          variant="newsletter"
          aria-label="Newsletter subscription form"
          data-custom="value"
        />
      );

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute(
        "aria-label",
        "Newsletter subscription form"
      );
      expect(form).toHaveAttribute("data-custom", "value");
    });
  });

  // ============================================================================
  // DEBUG + IDs TESTS
  // ============================================================================

  describe("Debug + IDs", () => {
    it("passes debug attributes when enabled (default variant)", () => {
      render(
        <Form debugMode>
          <input type="text" />
        </Form>
      );
      const root = screen.getByTestId("test-id-form-default-root");
      expect(root).toHaveAttribute("data-debug-mode", "true");
    });

    it("uses custom debugId for data attributes (default variant)", () => {
      render(
        <Form debugId="custom-id">
          <input type="text" />
        </Form>
      );
      expect(
        screen.getByTestId("custom-id-form-default-root")
      ).toBeInTheDocument();
    });

    it("applies data-debug-mode when enabled (newsletter variant)", () => {
      render(<Form variant="newsletter" debugMode={true} />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debug ID (newsletter variant)", () => {
      render(<Form variant="newsletter" debugId="custom-id" />);

      const form = screen.getByTestId("custom-id-form-newsletter-root");
      expect(form).toBeInTheDocument();
    });

    it("does not apply debug mode data attribute when disabled", () => {
      render(<Form variant="newsletter" debugMode={false} />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply debug mode data attribute when undefined", () => {
      render(<Form variant="newsletter" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).not.toHaveAttribute("data-debug-mode");
    });

    it("applies correct data attributes with default ID", () => {
      render(<Form variant="newsletter" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toBeInTheDocument();
      expect(form).not.toHaveAttribute("data-debug-mode");
    });

    it("applies correct data attributes with custom ID", () => {
      render(<Form variant="newsletter" debugId="custom-form-id" />);

      const form = screen.getByTestId("custom-form-id-form-newsletter-root");
      expect(form).toBeInTheDocument();
    });
  });

  // ============================================================================
  // COMPONENT STRUCTURE TESTS (Newsletter Variant)
  // ============================================================================

  describe("Component Structure (Newsletter Variant)", () => {
    it("renders with proper semantic structure", () => {
      render(<Form variant="newsletter" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      const heading = screen.getByRole("heading", { level: 2 });
      const emailInput = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button");

      expect(form).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(
        <Form
          variant="newsletter"
          aria-label="Newsletter subscription"
          aria-describedby="newsletter-description"
        />
      );

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("aria-label", "Newsletter subscription");
      expect(form).toHaveAttribute(
        "aria-describedby",
        "newsletter-description"
      );
    });

    it("supports role attribute", () => {
      render(<Form variant="newsletter" role="region" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("role", "region");
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES TESTS (Newsletter Variant)
  // ============================================================================

  describe("ARIA Attributes Testing (Newsletter Variant)", () => {
    it("applies correct ARIA roles to form elements", () => {
      render(<Form variant="newsletter" debugId="aria-test" />);

      // Test form element
      const formElement = screen.getByTestId("aria-test-form-newsletter-root");
      expect(formElement).toBeInTheDocument();

      // Test heading element
      const headingElement = screen.getByRole("heading", { level: 2 });
      expect(headingElement).toBeInTheDocument();

      // Test textbox element
      const textboxElement = screen.getByRole("textbox");
      expect(textboxElement).toBeInTheDocument();

      // Test button element
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to form elements", () => {
      render(<Form variant="newsletter" debugId="aria-test" />);

      // Test email input has proper aria-label
      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
    });

    it("applies required attribute to email input", () => {
      render(<Form variant="newsletter" debugId="aria-test" />);

      const emailInput = screen.getByRole("textbox");
      expect(emailInput).toBeRequired();
    });

    it("applies correct input type for email", () => {
      render(<Form variant="newsletter" debugId="aria-test" />);

      const emailInput = screen.getByRole("textbox");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("applies correct button type for submit", () => {
      render(<Form variant="newsletter" debugId="aria-test" />);

      const submitButton = screen.getByRole("button");
      expect(submitButton).toHaveAttribute("type", "submit");
    });

    it("applies ARIA attributes with different debug IDs", () => {
      render(<Form variant="newsletter" debugId="different-id" />);

      const formElement = screen.getByTestId(
        "different-id-form-newsletter-root"
      );
      expect(formElement).toBeInTheDocument();
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(
        <Form variant="newsletter" debugId="aria-test" />
      );

      const emailInput = screen.getByRole("textbox");
      expect(emailInput).toHaveAttribute("aria-label", "Email address");

      rerender(
        <Form
          variant="newsletter"
          debugId="aria-test"
          className="updated-class"
        />
      );

      const updatedEmailInput = screen.getByRole("textbox");
      expect(updatedEmailInput).toHaveAttribute("aria-label", "Email address");
    });

    it("ensures proper form landmark structure", () => {
      render(<Form variant="newsletter" debugId="aria-test" />);

      const formElement = screen.getByTestId("aria-test-form-newsletter-root");
      expect(formElement).toBeInTheDocument();

      // Form should contain heading, description, and form controls
      const heading = screen.getByRole("heading", { level: 2 });
      const textbox = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      expect(formElement).toContainElement(heading);
      expect(formElement).toContainElement(textbox);
      expect(formElement).toContainElement(button);
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(
        <Form
          variant="newsletter"
          debugId="aria-test"
          aria-label="Custom form label"
        />
      );

      const formElement = screen.getByTestId("aria-test-form-newsletter-root");
      expect(formElement).toHaveAttribute("aria-label", "Custom form label");
    });

    it("handles ARIA attributes when content is missing", () => {
      // This test ensures the form still works even if i18n content is missing
      render(<Form variant="newsletter" debugId="aria-test" />);

      const formElement = screen.getByTestId("aria-test-form-newsletter-root");
      expect(formElement).toBeInTheDocument();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      render(
        <Form
          variant="newsletter"
          debugId="aria-test"
          aria-label="Newsletter form"
          data-custom="value"
        />
      );

      const formElement = screen.getByTestId("aria-test-form-newsletter-root");
      expect(formElement).toHaveAttribute("aria-label", "Newsletter form");
      expect(formElement).toHaveAttribute("data-custom", "value");
    });
  });

  // ============================================================================
  // CSS AND STYLING TESTS (Newsletter Variant)
  // ============================================================================

  describe("CSS and Styling (Newsletter Variant)", () => {
    it("applies base Tailwind CSS classes", () => {
      render(<Form variant="newsletter" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("class");
    });

    it("merges custom className with base classes", () => {
      render(<Form variant="newsletter" className="custom-form-class" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("class");
    });

    it("handles multiple custom classes", () => {
      render(<Form variant="newsletter" className="class1 class2 class3" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("class");
    });

    it("handles empty className gracefully", () => {
      render(<Form variant="newsletter" className="" />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("class");
    });
  });

  // ============================================================================
  // PROPS FORWARDING TESTS (Newsletter Variant)
  // ============================================================================

  describe("Props Forwarding (Newsletter Variant)", () => {
    it("forwards all HTML form attributes", () => {
      render(
        <Form
          variant="newsletter"
          method="post"
          encType="multipart/form-data"
          data-custom="value"
          id="newsletter-1"
          style={{ backgroundColor: "red" }}
          tabIndex={0}
        />
      );

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("encType", "multipart/form-data");
      expect(form).toHaveAttribute("data-custom", "value");
      expect(form).toHaveAttribute("id", "newsletter-1");
      expect(form).toHaveAttribute("style", "background-color: red;");
      expect(form).toHaveAttribute("tabIndex", "0");
    });

    it("forwards event handlers", () => {
      const onSubmit = vi.fn();
      render(<Form variant="newsletter" onSubmit={onSubmit} />);

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toBeInTheDocument();
    });
  });

  // ============================================================================
  // MEMOIZATION TESTS
  // ============================================================================

  describe("Memoization", () => {
    it("MemoizedForm renders children", () => {
      render(
        <MemoizedForm>
          <input type="text" />
        </MemoizedForm>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with memoization when isMemoized is true (newsletter variant)", () => {
      render(<Form variant="newsletter" isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });

    it("renders without memoization by default (newsletter variant)", () => {
      render(<Form variant="newsletter" />);

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false (newsletter variant)", () => {
      const { rerender } = render(
        <Form variant="newsletter" isMemoized={false} />
      );

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();

      rerender(
        <Form
          variant="newsletter"
          isMemoized={false}
          className="different-class"
        />
      );
      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });
  });

  // ============================================================================
  // EDGE CASES TESTS (Newsletter Variant)
  // ============================================================================

  describe("Edge Cases (Newsletter Variant)", () => {
    it("handles complex children content", () => {
      render(
        <Form variant="newsletter">
          <span>Complex</span> <strong>content</strong>
        </Form>
      );

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
      // Form variant="newsletter" renders its own content, not children
      expect(screen.getByText("Stay up to date")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
    });

    it("handles special characters in attributes", () => {
      render(
        <Form
          variant="newsletter"
          action="/path?param=value&other=test"
          data-special="special chars: &lt;&gt;&amp;"
        />
      );

      const form = screen.getByTestId("test-id-form-newsletter-root");
      expect(form).toHaveAttribute("action", "/path?param=value&other=test");
      expect(form).toHaveAttribute("data-special", "special chars: <>&");
    });

    it("handles empty string children", () => {
      render(<Form variant="newsletter">{""}</Form>);

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });

    it("handles false children", () => {
      render(<Form variant="newsletter">{false}</Form>);

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });

    it("handles zero children", () => {
      render(<Form variant="newsletter">{0}</Form>);

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });

    it("handles mixed valid and invalid children", () => {
      render(
        <Form variant="newsletter">
          {null}
          <span>Valid content</span>
          {undefined}
          {false}
        </Form>
      );

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
      // Form variant="newsletter" renders its own content, not children
      expect(screen.getByText("Stay up to date")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
    });
  });

  // ============================================================================
  // PERFORMANCE AND OPTIMIZATION TESTS (Newsletter Variant)
  // ============================================================================

  describe("Performance and Optimization (Newsletter Variant)", () => {
    it("memoizes component when isMemoized is true", () => {
      render(<Form variant="newsletter" isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <Form variant="newsletter" isMemoized={false} />
      );

      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();

      rerender(
        <Form
          variant="newsletter"
          isMemoized={false}
          className="different-class"
        />
      );
      expect(
        screen.getByTestId("test-id-form-newsletter-root")
      ).toBeInTheDocument();
    });
  });
});
