/**
 * @guyromellemagayano/vitest-presets
 *
 * Shared Vitest configuration presets for the monorepo.
 */

// Presets
export { browserPreset } from "./browser/index.ts";
export { nodePreset } from "./node/index.ts";
export { reactPreset } from "./react/index.ts";

// Note: test-setup.ts should be imported directly in vitest.config.ts setupFiles
// Do not import it here as it will execute during config loading
