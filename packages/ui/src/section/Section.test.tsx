import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from ".";

describe("Section", () => {
  it("merges explicit labels and description references", () => {
    render(
      <Section
        aria-describedby="external-description"
        description="Current package status."
        descriptionProps={{ id: "package-description" }}
        heading="Package quality"
        headingProps={{ id: "package-heading" }}
        id="package-quality"
      >
        <p>Ready for release.</p>
      </Section>
    );

    const section = screen.getByRole("region", { name: "Package quality" });

    expect(section).toHaveAttribute("aria-labelledby", "package-heading");
    expect(section).toHaveAttribute(
      "aria-describedby",
      "external-description package-description"
    );
    expect(screen.getByText("Current package status.")).toHaveAttribute(
      "id",
      "package-description"
    );
  });

  it("does not generate header wiring when named by aria-label", () => {
    render(
      <Section aria-label="Manual section">
        <p>Manual content.</p>
      </Section>
    );

    const section = screen.getByRole("region", { name: "Manual section" });

    expect(section).not.toHaveAttribute("aria-labelledby");
    expect(section).not.toHaveAttribute("aria-describedby");
    expect(document.querySelector('[data-slot="section-header"]')).toBeNull();
  });
});
