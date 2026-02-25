import { describe, expect, it, vi } from "vitest";

import {
  createElementConfig,
  ELEMENT_CONFIGS,
  type ElementCategory,
  elementSupportsFeature,
  filterElementSpecificProps,
  getElementConfig,
  getElementsByCategory,
  validatePolymorphicProps,
} from "../types";

describe("types utilities coverage", () => {
  it("createElementConfig returns full config with defaults", () => {
    const cfg = createElementConfig("x-tag", ["onlyForX"], "desc", "text", {
      supportsVariants: false,
      supportsStates: false,
    });
    expect(cfg.element).toBe("x-tag");
    expect(cfg.specificProps).toEqual(["onlyForX"]);
    expect(cfg.description).toBe("desc");
    expect(cfg.category).toBe("text");
    expect(cfg.supportsVariants).toBe(false);
    expect(cfg.supportsStates).toBe(false);
    expect(Array.isArray(cfg.defaultVariants)).toBe(true);
  });

  it("filterElementSpecificProps removes element-only props when as != element", () => {
    const cfg = createElementConfig(
      "button",
      ["type", "form"],
      "desc",
      "interactive"
    );
    const props = { type: "submit", form: "f1", id: "ok" } as const;
    const filtered = filterElementSpecificProps(props, "a", cfg);
    expect(filtered).toEqual({ id: "ok" });
  });

  it("filterElementSpecificProps keeps props when as == element", () => {
    const cfg = createElementConfig("button", ["type"], "desc", "interactive");
    const props = { type: "button", id: "x" } as const;
    const filtered = filterElementSpecificProps(props, "button", cfg);
    expect(filtered).toEqual(props);
  });

  it("getElementConfig returns a known config and null for unknown", () => {
    const btn = getElementConfig("button");
    expect(btn?.element).toBe("button");
    const unknown = getElementConfig("unknown-tag");
    expect(unknown).toBeNull();
  });

  it("getElementsByCategory returns configs by category", () => {
    const list = getElementsByCategory("form" as ElementCategory);
    expect(Array.isArray(list)).toBe(true);
    expect(list.some((c) => c.element === "input")).toBe(true);
  });

  it("elementSupportsFeature reflects config flags", () => {
    // From ELEMENT_CONFIGS: FORM sets supportsVariants: false
    expect(elementSupportsFeature("form", "variants")).toBe(false);
    // Many default to true when not set
    expect(elementSupportsFeature("input", "variants")).toBe(true);
    expect(elementSupportsFeature("input", "states")).toBe(true);
    // Unknown returns false
    expect(elementSupportsFeature("unknown-tag", "variants")).toBe(false);
  });

  it("validatePolymorphicProps warns only in development and only when mismatched", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const cfg = createElementConfig(
      "a",
      ["href", "target"],
      "desc",
      "interactive"
    );

    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    // as matches element: no warning
    validatePolymorphicProps("A", "a", { href: "/" }, cfg);
    expect(spy).not.toHaveBeenCalled();

    // as differs and specific props present: warn
    validatePolymorphicProps(
      "A",
      "button",
      { href: "/", target: "_blank" },
      cfg
    );
    expect(spy).toHaveBeenCalledTimes(1);

    // not in development: no warning
    spy.mockClear();
    process.env.NODE_ENV = "production";
    validatePolymorphicProps("A", "button", { href: "/" }, cfg);
    expect(spy).not.toHaveBeenCalled();

    // restore env
    process.env.NODE_ENV = original;
    spy.mockRestore();
  });

  it("ELEMENT_CONFIGS exposes expected keys", () => {
    expect(ELEMENT_CONFIGS.A.element).toBe("a");
    expect(ELEMENT_CONFIGS.BUTTON.element).toBe("button");
    expect(ELEMENT_CONFIGS.INPUT.element).toBe("input");
  });
});
