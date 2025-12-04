import { describe, expect, it } from "vitest";

describe("Vitest Presets", () => {
  it("should be able to import presets", async () => {
    // Test that presets can be imported (using .ts files as they are the source)
    const browserPreset = await import("../browser/vitest-preset");
    const nodePreset = await import("../node/vitest-preset");
    const reactPreset = await import("../react/vitest-preset");

    expect(browserPreset.default).toBeDefined();
    expect(nodePreset.default).toBeDefined();
    expect(reactPreset.default).toBeDefined();
  });

  it("should have correct test configuration", async () => {
    const browserPreset = await import("../browser/vitest-preset");
    const config = browserPreset.default;

    expect(config.test).toBeDefined();
    expect(config.test?.environment).toBe("jsdom");
    expect(config.test?.globals).toBe(true);
    expect(config.test?.setupFiles).toContain(
      "@guyromellemagayano/vitest-presets/shared/test-setup.ts"
    );
  });

  it("should have coverage thresholds configured", async () => {
    const browserPreset = await import("../browser/vitest-preset");
    const config = browserPreset.default;

    expect(config.test?.coverage?.thresholds).toBeDefined();
    expect(config.test?.coverage?.thresholds?.statements).toBe(80);
    expect(config.test?.coverage?.thresholds?.branches).toBe(75);
    expect(config.test?.coverage?.thresholds?.functions).toBe(80);
    expect(config.test?.coverage?.thresholds?.lines).toBe(80);
  });

  it("should have all coverage reporters configured", async () => {
    const browserPreset = await import("../browser/vitest-preset");
    const config = browserPreset.default;

    expect(config.test?.coverage?.reporter).toContain("text");
    expect(config.test?.coverage?.reporter).toContain("json");
    expect(config.test?.coverage?.reporter).toContain("html");
    expect(config.test?.coverage?.reporter).toContain("lcov");
    expect(config.test?.coverage?.reporter).toContain("clover");
  });

  it("should have node preset with correct environment", async () => {
    const nodePreset = await import("../node/vitest-preset");
    const config = nodePreset.default;

    expect(config.test?.environment).toBe("node");
    expect(config.test?.coverage?.thresholds?.statements).toBe(85);
    expect(config.test?.coverage?.thresholds?.branches).toBe(80);
    expect(config.test?.coverage?.thresholds?.functions).toBe(85);
    expect(config.test?.coverage?.thresholds?.lines).toBe(85);
  });

  it("should have react preset with correct configuration", async () => {
    const reactPreset = await import("../react/vitest-preset");
    const config = reactPreset.default;

    expect(config.test?.environment).toBe("jsdom");
    expect(config.test?.globals).toBe(true);
    expect(config.test?.css).toBe(true);
    expect(config.test?.setupFiles).toContain(
      "@guyromellemagayano/vitest-presets/shared/test-setup.ts"
    );
    expect(config.test?.coverage?.thresholds?.statements).toBe(80);
  });

  it("should have browser preset with css enabled", async () => {
    const browserPreset = await import("../browser/vitest-preset");
    const config = browserPreset.default;

    expect(config.test?.css).toBe(true);
  });

  it("should have all presets with setupFiles configured", async () => {
    const browserPreset = await import("../browser/vitest-preset");
    const reactPreset = await import("../react/vitest-preset");
    const nodePreset = await import("../node/vitest-preset");

    expect(browserPreset.default.test?.setupFiles).toContain(
      "@guyromellemagayano/vitest-presets/shared/test-setup.ts"
    );
    expect(reactPreset.default.test?.setupFiles).toContain(
      "@guyromellemagayano/vitest-presets/shared/test-setup.ts"
    );
    expect(nodePreset.default.test?.setupFiles).toContain(
      "@guyromellemagayano/vitest-presets/shared/test-setup.ts"
    );
  });

  it("should have all presets with reportOnFailure enabled", async () => {
    const browserPreset = await import("../browser/vitest-preset");
    const reactPreset = await import("../react/vitest-preset");
    const nodePreset = await import("../node/vitest-preset");

    expect(browserPreset.default.test?.coverage?.reportOnFailure).toBe(true);
    expect(reactPreset.default.test?.coverage?.reportOnFailure).toBe(true);
    expect(nodePreset.default.test?.coverage?.reportOnFailure).toBe(true);
  });
});
