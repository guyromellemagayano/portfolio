// =============================================================================
// MAIN PACKAGE EXPORTS
// @guyromellemagayano/components
// =============================================================================

// =============================================================================
// SHARED TYPES AND UTILITIES
// =============================================================================
export * from "./types";

// =============================================================================
// COMPONENT EXPORTS
// =============================================================================

// A Component
export { A } from "./a";
export type { AProps, ARef } from "./a";

// Abbr Component
export { Abbr } from "./abbr";
export type { AbbrProps, AbbrRef } from "./abbr";

// Address Component
export { Address } from "./address";
export type { AddressProps, AddressRef } from "./address";

// Area Component
export { Area } from "./area";
export type { AreaProps, AreaRef } from "./area";

// Article Component
export { Article } from "./article";
export type { ArticleProps, ArticleRef } from "./article";

// Aside Component
export { Aside } from "./aside";
export type { AsideProps, AsideRef } from "./aside";

// Audio Component
export { Audio } from "./audio";
export type { AudioProps, AudioRef } from "./audio";

// B Component
export { B } from "./b";
export type { BProps, BRef } from "./b";

// Base Component
export { Base } from "./base";
export type { BaseProps, BaseRef } from "./base";

// Bdi Component
export { Bdi } from "./bdi";
export type { BdiProps, BdiRef } from "./bdi";

// Bdo Component
export { Bdo } from "./bdo";
export type { BdoProps, BdoRef } from "./bdo";

// Blockquote Component
export { Blockquote } from "./blockquote";
export type { BlockquoteProps, BlockquoteRef } from "./blockquote";

// Body Component
export { Body } from "./body";
export type { BodyProps, BodyRef } from "./body";

// Br Component
export { Br } from "./br";
export type { BrProps, BrRef } from "./br";

// Button Component
export { Button } from "./button";
export type { ButtonProps, ButtonRef } from "./button";

// Canvas Component
export { Canvas } from "./canvas";
export type { CanvasProps, CanvasRef } from "./canvas";

// =============================================================================
// CLIENT COMPONENT EXPORTS (for advanced use cases)
// =============================================================================

// A Client Components
export { AClient, MemoizedAClient } from "./a/index.client";

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
export const MIGRATED_COMPONENT_COUNT = 16;

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
