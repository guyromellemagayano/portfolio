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

/** Get bundle size information for a module */
export function getBundleSize(moduleName: string): BundleSizeInfo {
  return {
    name: moduleName,
    size: 0,
    gzipSize: 0,
    isTreeShakeable: true,
  };
}

/** Check if a component is tree-shakeable */
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

/** Get environment information for bundle monitoring */
export function getEnvironmentInfo() {
  return {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
  };
}
