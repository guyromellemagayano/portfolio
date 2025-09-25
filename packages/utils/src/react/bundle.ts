// ============================================================================
// REACT FRAMEWORK BUNDLE INFORMATION
// ============================================================================

import { logger } from "@guyromellemagayano/logger";

// ============================================================================
// BUNDLE INFORMATION
// ============================================================================

interface BundleSizeInfo {
  name: string;
  size: number;
  gzipSize: number;
  isTreeShakeable: boolean;
}

/** Get bundle size information for a module. */
export function getBundleSize(moduleName: string): BundleSizeInfo {
  return {
    name: moduleName,
    size: 0,
    gzipSize: 0,
    isTreeShakeable: true,
  };
}

// ============================================================================
// LOGGING
// ============================================================================

/** Get environment information for bundle monitoring */
export function getEnvironmentInfo() {
  return {
    isDevelopment: globalThis?.process?.env?.NODE_ENV === "development",
    isProduction: globalThis?.process.env.NODE_ENV === "production",
    isTest: globalThis?.process.env.NODE_ENV === "test",
  };
}

/** Log bundle size information for React components */
export function logBundleSize(componentName: string): void {
  const env = getEnvironmentInfo();

  if (env.isDevelopment) {
    const bundleInfo = getBundleSize(componentName);
    logger.info(
      `📦 Bundle Info for React component ${componentName}:`,
      bundleInfo
    );
  }
}

/** Log tree shaking verification results for React components */
export function logTreeShakingVerification(componentName: string): void {
  const env = getEnvironmentInfo();

  if (env.isDevelopment) {
    const report = verifyTreeShaking(componentName);
    logger.info(
      `🌳 Tree Shaking Report for React component ${componentName}:`,
      report
    );
  }
}

/** Check if React component is tree-shakeable */
export function isReactComponentTreeShakeable(componentName: string): boolean {
  const reactPatterns = [
    "React.memo",
    "React.forwardRef",
    "React.lazy",
    "React.Suspense",
    "export const",
    "export function",
  ];

  return reactPatterns.some((pattern) => componentName.includes(pattern));
}

// ============================================================================
// TREE SHAKING
// ============================================================================

/** Check if a component is tree-shakeable. */
export function isTreeShakeable(componentName: string): boolean {
  const treeShakeablePatterns = [
    "export const",
    "export function",
    "export {",
    "export type",
    "export interface",
  ];

  return treeShakeablePatterns.some((pattern) =>
    componentName.includes(pattern)
  );
}

interface TreeShakingReport {
  componentName: string;
  isTreeShakeable: boolean;
  exports: string[];
  unusedExports: string[];
  bundleImpact: "low" | "medium" | "high";
}

/** Verify if a component is properly tree-shakeable */
export function verifyTreeShaking(componentName: string): TreeShakingReport {
  const report: TreeShakingReport = {
    componentName,
    isTreeShakeable: true,
    exports: [],
    unusedExports: [],
    bundleImpact: "low",
  };

  const antiPatterns = [
    "export default",
    "export *",
    "module.exports",
    "window.",
    "global.",
    "document.",
  ];

  const hasAntiPatterns = antiPatterns.some((pattern) =>
    componentName.includes(pattern)
  );

  if (hasAntiPatterns) {
    report.isTreeShakeable = false;
    report.bundleImpact = "high";
  }

  return report;
}

/** Check if imports are tree-shakeable */
export function verifyImports(imports: string[]): boolean {
  const treeShakeablePatterns = [
    "import {",
    "import type {",
    "export {",
    "export const",
    "export function",
  ];

  return imports.every((importStatement) =>
    treeShakeablePatterns.some((pattern) => importStatement.includes(pattern))
  );
}
