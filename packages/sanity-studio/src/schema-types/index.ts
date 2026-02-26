/**
 * @file packages/sanity-studio/src/schema-types/index.ts
 * @author Guy Romelle Magayano
 * @description Aggregates Sanity schema types reusable across Studio hosts.
 */

import { articleSchema } from "./article";
import { pageSchema } from "./page";

export const defaultSanitySchemaTypes = [articleSchema, pageSchema];

export { articleSchema };
export { pageSchema };
