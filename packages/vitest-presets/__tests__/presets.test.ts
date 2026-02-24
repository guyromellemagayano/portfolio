/**
 * @file packages/vitest-presets/__tests__/presets.test.ts
 * @author Guy Romelle Magayano
 * @description Verifies browser, node, and react preset defaults including setup and coverage behavior.
 */

import { describe, expect, it } from "vitest";

describe("Vitest Presets", () => {
  it("should be able to import presets", async () => {
    // Test that presets can be imported (using .ts files as they are the source)
    const browserPreset = await import("../browser/vitest-preset.ts.ts");
    const nodePreset = await import("../node/vitest-preset.ts.ts");
    const reactPreset = await import("../react/vitest-preset.ts.ts");

    expect(browserPreset.browserPreset).toBeDefined();
    expect(nodePreset.nodePreset).toBeDefined();
    expect(reactPreset.reactPreset).toBeDefined();
  });

  it("should have correct test configuration", async () => {
    const browserPreset = await import("../browser/vitest-preset.ts.ts");
    const config = browserPreset.browserPreset;

    expect(config.test).toBeDefined();
    expect(config.test?.environment).toBe("jsdom");
    expect(config.test?.globals).toBe(true);
    expect(config.test?.setupFiles).toContain(
      "@portfolio/vitest-presets/shared/test-setup.ts"
    );
  });

  it("should have coverage thresholds configured", async () => {
    const browserPreset = await import("../browser/vitest-preset.ts.ts");
    const config = browserPreset.browserPreset;

    expect(config.test?.coverage?.thresholds).toBeDefined();
    expect(config.test?.coverage?.thresholds?.statements).toBe(80);
    expect(config.test?.coverage?.thresholds?.branches).toBe(75);
    expect(config.test?.coverage?.thresholds?.functions).toBe(80);
    expect(config.test?.coverage?.thresholds?.lines).toBe(80);
  });

  it("should have all coverage reporters configured", async () => {
    const browserPreset = await import("../browser/vitest-preset.ts.ts");
    const config = browserPreset.browserPreset;

    expect(config.test?.coverage?.reporter).toContain("text");
    expect(config.test?.coverage?.reporter).toContain("json");
    expect(config.test?.coverage?.reporter).toContain("html");
    expect(config.test?.coverage?.reporter).toContain("lcov");
    expect(config.test?.coverage?.reporter).toContain("clover");
  });

  it("should have node preset with correct environment", async () => {
    const nodePreset = await import("../node/vitest-preset.ts.ts");
    const config = nodePreset.nodePreset;

    expect(config.test?.environment).toBe("node");
    expect(config.test?.coverage?.thresholds?.statements).toBe(85);
    expect(config.test?.coverage?.thresholds?.branches).toBe(80);
    expect(config.test?.coverage?.thresholds?.functions).toBe(85);
    expect(config.test?.coverage?.thresholds?.lines).toBe(85);
  });

  it("should have react preset with correct configuration", async () => {
    const reactPreset = await import("../react/vitest-preset.ts.ts");
    const config = reactPreset.reactPreset;

    expect(config.test?.environment).toBe("jsdom");
    expect(config.test?.globals).toBe(true);
    expect(config.test?.css).toBe(true);
    expect(config.test?.setupFiles).toContain(
      "@portfolio/vitest-presets/shared/test-setup.ts"
    );
    expect(config.test?.coverage?.thresholds?.statements).toBe(80);
  });

  it("should have browser preset with css enabled", async () => {
    const browserPreset = await import("../browser/vitest-preset.ts.ts");
    const config = browserPreset.browserPreset;

    expect(config.test?.css).toBe(true);
  });

  it("should have all presets with setupFiles configured", async () => {
    const browserPreset = await import("../browser/vitest-preset.ts.ts");
    const reactPreset = await import("../react/vitest-preset.ts.ts");
    const nodePreset = await import("../node/vitest-preset.ts.ts");

    expect(browserPreset.browserPreset.test?.setupFiles).toContain(
      "@portfolio/vitest-presets/shared/test-setup.ts"
    );
    expect(reactPreset.reactPreset.test?.setupFiles).toContain(
      "@portfolio/vitest-presets/shared/test-setup.ts"
    );
    expect(nodePreset.nodePreset.test?.setupFiles).toContain(
      "@portfolio/vitest-presets/shared/test-setup.ts"
    );
  });

  it("should have all presets with reportOnFailure enabled", async () => {
    const browserPreset = await import("../browser/vitest-preset.ts.ts");
    const reactPreset = await import("../react/vitest-preset.ts.ts");
    const nodePreset = await import("../node/vitest-preset.ts.ts");

    expect(browserPreset.browserPreset.test?.coverage?.reportOnFailure).toBe(
      true
    );
    expect(reactPreset.reactPreset.test?.coverage?.reportOnFailure).toBe(true);
    expect(nodePreset.nodePreset.test?.coverage?.reportOnFailure).toBe(true);
  });
});
