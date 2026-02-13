import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock logger
const mockLogger = vi.hoisted(() => ({
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
}));

vi.mock("@portfolio/logger", () => ({
  logger: mockLogger,
}));

import {
  getBundleSize,
  getEnvironmentInfo,
  isReactComponentTreeShakeable,
  isTreeShakeable,
  logBundleSize,
  logTreeShakingVerification,
  verifyImports,
  verifyTreeShaking,
} from "../bundle";

describe("getBundleSize", () => {
  it("returns bundle size info with default values", () => {
    const result = getBundleSize("MyComponent");
    expect(result).toEqual({
      name: "MyComponent",
      size: 0,
      gzipSize: 0,
      isTreeShakeable: true,
    });
  });

  it("returns correct module name", () => {
    const result = getBundleSize("TestModule");
    expect(result.name).toBe("TestModule");
  });

  it("always returns isTreeShakeable as true", () => {
    const result = getBundleSize("AnyComponent");
    expect(result.isTreeShakeable).toBe(true);
  });
});

describe("getEnvironmentInfo", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.clearAllMocks();
  });

  it("returns development info when NODE_ENV is development", () => {
    process.env.NODE_ENV = "development";
    const result = getEnvironmentInfo();
    expect(result).toEqual({
      isDevelopment: true,
      isProduction: false,
      isTest: false,
    });
  });

  it("returns production info when NODE_ENV is production", () => {
    process.env.NODE_ENV = "production";
    const result = getEnvironmentInfo();
    expect(result).toEqual({
      isDevelopment: false,
      isProduction: true,
      isTest: false,
    });
  });

  it("returns test info when NODE_ENV is test", () => {
    process.env.NODE_ENV = "test";
    const result = getEnvironmentInfo();
    expect(result).toEqual({
      isDevelopment: false,
      isProduction: false,
      isTest: true,
    });
  });

  it("returns all false when NODE_ENV is undefined", () => {
    delete process.env.NODE_ENV;
    const result = getEnvironmentInfo();
    expect(result).toEqual({
      isDevelopment: false,
      isProduction: false,
      isTest: false,
    });
  });

  it("returns all false when NODE_ENV is empty string", () => {
    process.env.NODE_ENV = "";
    const result = getEnvironmentInfo();
    expect(result).toEqual({
      isDevelopment: false,
      isProduction: false,
      isTest: false,
    });
  });
});

describe("logBundleSize", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.clearAllMocks();
  });

  it("logs bundle size in development mode", () => {
    process.env.NODE_ENV = "development";
    logBundleSize("MyComponent");

    expect(mockLogger.info).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledWith(
      "📦 Bundle Info for React component MyComponent:",
      {
        name: "MyComponent",
        size: 0,
        gzipSize: 0,
        isTreeShakeable: true,
      }
    );
  });

  it("does not log in production mode", () => {
    process.env.NODE_ENV = "production";
    logBundleSize("MyComponent");

    expect(mockLogger.info).not.toHaveBeenCalled();
  });

  it("does not log in test mode", () => {
    process.env.NODE_ENV = "test";
    logBundleSize("MyComponent");

    expect(mockLogger.info).not.toHaveBeenCalled();
  });

  it("does not log when NODE_ENV is undefined", () => {
    delete process.env.NODE_ENV;
    logBundleSize("MyComponent");

    expect(mockLogger.info).not.toHaveBeenCalled();
  });
});

describe("logTreeShakingVerification", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.clearAllMocks();
  });

  it("logs tree shaking report in development mode", () => {
    process.env.NODE_ENV = "development";
    logTreeShakingVerification("MyComponent");

    expect(mockLogger.info).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledWith(
      "🌳 Tree Shaking Report for React component MyComponent:",
      {
        componentName: "MyComponent",
        isTreeShakeable: true,
        exports: [],
        unusedExports: [],
        bundleImpact: "low",
      }
    );
  });

  it("does not log in production mode", () => {
    process.env.NODE_ENV = "production";
    logTreeShakingVerification("MyComponent");

    expect(mockLogger.info).not.toHaveBeenCalled();
  });

  it("does not log in test mode", () => {
    process.env.NODE_ENV = "test";
    logTreeShakingVerification("MyComponent");

    expect(mockLogger.info).not.toHaveBeenCalled();
  });

  it("logs report with anti-patterns when detected", () => {
    process.env.NODE_ENV = "development";
    logTreeShakingVerification("export default MyComponent");

    expect(mockLogger.info).toHaveBeenCalledTimes(1);
    const callArgs = mockLogger.info.mock.calls[0];
    if (!callArgs) {
      throw new Error("Expected mockLogger.info to be called with arguments");
    }
    expect(callArgs[1]).toMatchObject({
      componentName: "export default MyComponent",
      isTreeShakeable: false,
      bundleImpact: "high",
    });
  });
});

describe("isReactComponentTreeShakeable", () => {
  it("returns true for React.memo pattern", () => {
    expect(isReactComponentTreeShakeable("React.memo(Component)")).toBe(true);
  });

  it("returns true for React.forwardRef pattern", () => {
    expect(isReactComponentTreeShakeable("React.forwardRef(Component)")).toBe(
      true
    );
  });

  it("returns true for React.lazy pattern", () => {
    expect(isReactComponentTreeShakeable("React.lazy(() => Component)")).toBe(
      true
    );
  });

  it("returns true for React.Suspense pattern", () => {
    expect(isReactComponentTreeShakeable("React.Suspense")).toBe(true);
  });

  it("returns true for export const pattern", () => {
    expect(isReactComponentTreeShakeable("export const Component")).toBe(true);
  });

  it("returns true for export function pattern", () => {
    expect(isReactComponentTreeShakeable("export function Component")).toBe(
      true
    );
  });

  it("returns false for non-matching pattern", () => {
    expect(isReactComponentTreeShakeable("import Component")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isReactComponentTreeShakeable("")).toBe(false);
  });

  it("returns true when multiple patterns match", () => {
    expect(
      isReactComponentTreeShakeable("export const Component = React.memo()")
    ).toBe(true);
  });
});

describe("isTreeShakeable", () => {
  it("returns true for export const pattern", () => {
    expect(isTreeShakeable("export const Component")).toBe(true);
  });

  it("returns true for export function pattern", () => {
    expect(isTreeShakeable("export function Component")).toBe(true);
  });

  it("returns true for export { pattern", () => {
    expect(isTreeShakeable("export { Component }")).toBe(true);
  });

  it("returns true for export type pattern", () => {
    expect(isTreeShakeable("export type Component")).toBe(true);
  });

  it("returns true for export interface pattern", () => {
    expect(isTreeShakeable("export interface Component")).toBe(true);
  });

  it("returns false for export default pattern", () => {
    expect(isTreeShakeable("export default Component")).toBe(false);
  });

  it("returns false for non-matching pattern", () => {
    expect(isTreeShakeable("import Component")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isTreeShakeable("")).toBe(false);
  });

  it("returns true when multiple patterns match", () => {
    expect(isTreeShakeable("export const Component = export function")).toBe(
      true
    );
  });
});

describe("verifyTreeShaking", () => {
  it("returns tree-shakeable report for valid component", () => {
    const result = verifyTreeShaking("MyComponent");
    expect(result).toEqual({
      componentName: "MyComponent",
      isTreeShakeable: true,
      exports: [],
      unusedExports: [],
      bundleImpact: "low",
    });
  });

  it("returns non-tree-shakeable report for export default", () => {
    const result = verifyTreeShaking("export default MyComponent");
    expect(result).toEqual({
      componentName: "export default MyComponent",
      isTreeShakeable: false,
      exports: [],
      unusedExports: [],
      bundleImpact: "high",
    });
  });

  it("returns non-tree-shakeable report for export *", () => {
    const result = verifyTreeShaking("export * from './module'");
    expect(result.isTreeShakeable).toBe(false);
    expect(result.bundleImpact).toBe("high");
  });

  it("returns non-tree-shakeable report for module.exports", () => {
    const result = verifyTreeShaking("module.exports = Component");
    expect(result.isTreeShakeable).toBe(false);
    expect(result.bundleImpact).toBe("high");
  });

  it("returns non-tree-shakeable report for window.", () => {
    const result = verifyTreeShaking("window.Component = Component");
    expect(result.isTreeShakeable).toBe(false);
    expect(result.bundleImpact).toBe("high");
  });

  it("returns non-tree-shakeable report for global.", () => {
    const result = verifyTreeShaking("global.Component = Component");
    expect(result.isTreeShakeable).toBe(false);
    expect(result.bundleImpact).toBe("high");
  });

  it("returns non-tree-shakeable report for document.", () => {
    const result = verifyTreeShaking("document.getElementById('app')");
    expect(result.isTreeShakeable).toBe(false);
    expect(result.bundleImpact).toBe("high");
  });

  it("preserves component name in report", () => {
    const result = verifyTreeShaking("CustomComponentName");
    expect(result.componentName).toBe("CustomComponentName");
  });

  it("returns low impact for tree-shakeable components", () => {
    const result = verifyTreeShaking("export const Component");
    expect(result.bundleImpact).toBe("low");
  });
});

describe("verifyImports", () => {
  it("returns true for all tree-shakeable imports", () => {
    const imports = [
      "import { Component } from './module'",
      "import type { Type } from './types'",
      "export { Component }",
      "export const Component",
      "export function Component",
    ];
    expect(verifyImports(imports)).toBe(true);
  });

  it("returns true for import { pattern", () => {
    const imports = ["import { Component } from './module'"];
    expect(verifyImports(imports)).toBe(true);
  });

  it("returns true for import type { pattern", () => {
    const imports = ["import type { Type } from './types'"];
    expect(verifyImports(imports)).toBe(true);
  });

  it("returns true for export { pattern", () => {
    const imports = ["export { Component }"];
    expect(verifyImports(imports)).toBe(true);
  });

  it("returns true for export const pattern", () => {
    const imports = ["export const Component"];
    expect(verifyImports(imports)).toBe(true);
  });

  it("returns true for export function pattern", () => {
    const imports = ["export function Component"];
    expect(verifyImports(imports)).toBe(true);
  });

  it("returns false when any import is not tree-shakeable", () => {
    const imports = [
      "import { Component } from './module'",
      "import Component from './module'", // default import
    ];
    expect(verifyImports(imports)).toBe(false);
  });

  it("returns false for empty array", () => {
    expect(verifyImports([])).toBe(true);
  });

  it("returns false for non-matching patterns", () => {
    const imports = ["import Component from './module'", "require('./module')"];
    expect(verifyImports(imports)).toBe(false);
  });

  it("returns true when all imports match at least one pattern", () => {
    const imports = [
      "import { A } from './a'",
      "export const B",
      "import type { C } from './c'",
    ];
    expect(verifyImports(imports)).toBe(true);
  });
});
