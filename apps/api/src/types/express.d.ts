/**
 * @file apps/api/src/types/express.d.ts
 * @author Guy Romelle Magayano
 * @description Express request augmentation for API gateway request context.
 */

import type { ILogger } from "@portfolio/logger";

declare global {
  namespace Express {
    interface Request {
      id: string;
      correlationId: string;
      logger: ILogger;
    }
  }
}

export {};
