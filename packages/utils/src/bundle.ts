/**
 * Framework-agnostic bundle size monitoring utilities
 * Works with any bundler (webpack, rollup, vite, etc.)
 */

interface BundleSizeInfo {
  name: string;
  size: number;
  gzipSize: number;
  isTreeShakeable: boolean;
}

interface TreeShakingReport {
  componentName: string;
  isTreeShakeable: boolean;
  exports: string[];
  unusedExports: string[];
  bundleImpact: "low" | "medium" | "high";
}

/**
 * Get bundle size information for a module
 * Framework-agnostic - works with any bundler
 */
export function getBundleSize(moduleName: string): BundleSizeInfo {
  // This would integrate with bundler stats in production
  // For now, it's a placeholder for bundle size monitoring
  return {
    name: moduleName,
    size: 0, // Would be populated from bundler stats
    gzipSize: 0, // Would be populated from bundler stats
    isTreeShakeable: true, // Would be determined by analysis
  };
}

/**
 * Check if a component is tree-shakeable
 * Framework-agnostic - works with any bundler
 */
export function isTreeShakeable(componentName: string): boolean {
  // Check if component uses named exports and pure functions
  const treeShakeablePatterns = [
    "export const",
    "export function",
    "export {",
    "export type",
    "export interface",
  ];

  // This is a simplified check - in practice, you'd analyze the actual code
  return treeShakeablePatterns.some((pattern) =>
    componentName.includes(pattern)
  );
}

/**
 * Verify if a component is properly tree-shakeable
 * Framework-agnostic - works with any bundler
 */
export function verifyTreeShaking(componentName: string): TreeShakingReport {
  // This is a development utility to verify tree shaking
  // In production, this would analyze the actual bundle
  const report: TreeShakingReport = {
    componentName,
    isTreeShakeable: true,
    exports: [],
    unusedExports: [],
    bundleImpact: "low",
  };

  // Check for common tree shaking anti-patterns
  const antiPatterns = [
    "export default",
    "export *",
    "module.exports",
    "window.",
    "global.",
    "document.",
  ];

  // This is a simplified check - in practice, you'd analyze the actual code
  const hasAntiPatterns = antiPatterns.some((pattern) =>
    componentName.includes(pattern)
  );

  if (hasAntiPatterns) {
    report.isTreeShakeable = false;
    report.bundleImpact = "high";
  }

  return report;
}

/** Check if imports are tree-shakeable.Framework-agnostic - works with any bundler */
export function verifyImports(imports: string[]): boolean {
  const treeShakeablePatterns = [
    "import {",
    "import type {",
    "export {",
    "export const",
    "export function",
    "export type",
    "export interface",
  ];

  return imports.every((importStatement) =>
    treeShakeablePatterns.some((pattern) => importStatement.includes(pattern))
  );
}

/**
 * Get environment info for bundle monitoring
 * Framework-agnostic - works in any JavaScript environment
 */
export function getEnvironmentInfo(): {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  bundler?: string;
} {
  const env = globalThis?.process?.env || {};
  const nodeEnv = env.NODE_ENV || "development";

  return {
    isDevelopment: nodeEnv === "development",
    isProduction: nodeEnv === "production",
    isTest: nodeEnv === "test",
    bundler:
      env.BUNDLER || env.VITE_BUNDLER || env.WEBPACK_BUNDLER || undefined,
  };
}
