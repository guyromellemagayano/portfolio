// =============================================================================
// MAIN PACKAGE EXPORTS
// @guyromellemagayano/components
// =============================================================================

import { A, type AProps, type ARef } from "./a";
import { Abbr, type AbbrProps, type AbbrRef } from "./abbr";

// =============================================================================
// SHARED TYPES AND UTILITIES
// =============================================================================
export * from "./types";

// =============================================================================
// COMPONENT EXPORTS
// =============================================================================

// A Component
export { A, AProps, ARef };

// Abbr Component
export { Abbr, AbbrProps, AbbrRef };

// Address Component
export type { AddressProps, AddressRef } from "./address";
export { Address } from "./address";

// Area Component
export type { AreaProps, AreaRef } from "./area";
export { Area } from "./area";

// Article Component
export type { ArticleProps, ArticleRef } from "./article";
export { Article } from "./article";

// Aside Component
export type { AsideProps, AsideRef } from "./aside";
export { Aside } from "./aside";

// Audio Component
export type { AudioProps, AudioRef } from "./audio";
export { Audio } from "./audio";

// B Component
export type { BProps, BRef } from "./b";
export { B } from "./b";

// Base Component
export type { BaseProps, BaseRef } from "./base";
export { Base } from "./base";

// Bdi Component
export type { BdiProps, BdiRef } from "./bdi";
export { Bdi } from "./bdi";

// Bdo Component
export type { BdoProps, BdoRef } from "./bdo";
export { Bdo } from "./bdo";

// Blockquote Component
export type { BlockquoteProps, BlockquoteRef } from "./blockquote";
export { Blockquote } from "./blockquote";

// Body Component
export type { BodyProps, BodyRef } from "./body";
export { Body } from "./body";

// Br Component
export type { BrProps, BrRef } from "./br";
export { Br } from "./br";

// Button Component
export type { ButtonProps, ButtonRef } from "./button";
export { Button } from "./button";

// Canvas Component
export type { CanvasProps, CanvasRef } from "./canvas";
export { Canvas } from "./canvas";

// =============================================================================
// CLIENT COMPONENT EXPORTS (for advanced use cases)
// =============================================================================

// Abbr Client Components
export { AbbrClient, MemoizedAbbrClient } from "./abbr/index.client";

// Address Client Components
export { AddressClient, MemoizedAddressClient } from "./address/index.client";

// Area Client Components
export { AreaClient, MemoizedAreaClient } from "./area/index.client";

// Article Client Components
export { ArticleClient, MemoizedArticleClient } from "./article/index.client";

// Aside Client Components
export { AsideClient, MemoizedAsideClient } from "./aside/index.client";

// Audio Client Components
export { AudioClient, MemoizedAudioClient } from "./audio/index.client";

// B Client Components
export { BClient, MemoizedBClient } from "./b/index.client";

// Base Client Components
export { BaseClient, MemoizedBaseClient } from "./base/index.client";

// Bdi Client Components
export { BdiClient, MemoizedBdiClient } from "./bdi/index.client";

// Bdo Client Components
export { BdoClient, MemoizedBdoClient } from "./bdo/index.client";

// Blockquote Client Components
export {
  BlockquoteClient,
  MemoizedBlockquoteClient,
} from "./blockquote/index.client";

// Body Client Components
export { BodyClient, MemoizedBodyClient } from "./body/index.client";

// Br Client Components
export { BrClient, MemoizedBrClient } from "./br/index.client";

// Button Client Components
export { ButtonClient, MemoizedButtonClient } from "./button/index.client";

// Canvas Client Components
export { CanvasClient, MemoizedCanvasClient } from "./canvas/index.client";

// =============================================================================
// COMPONENT COUNT AND METADATA
// =============================================================================

/**
 * Total number of migrated components available in this package
 */
export const MIGRATED_COMPONENT_COUNT = 19;

/**
 * List of all available migrated components
 */
export const AVAILABLE_COMPONENTS = [
  "A",
  "Abbr",
  "Address",
  "Area",
  "Article",
  "Aside",
  "Audio",
  "B",
  "Base",
  "Bdi",
  "Bdo",
  "Blockquote",
  "Body",
  "Br",
  "Button",
  "Canvas",
] as const;

/**
 * Package version and metadata
 */
export const PACKAGE_INFO = {
  name: "@guyromellemagayano/components",
  version: "1.0.0",
  migratedComponents: MIGRATED_COMPONENT_COUNT,
  totalComponents: 115, // Estimated total HTML elements to be supported
  migrationProgress: `${MIGRATED_COMPONENT_COUNT}/115 (${Math.round((MIGRATED_COMPONENT_COUNT / 115) * 100)}%)`,
} as const;
