import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { type Express, type RequestHandler } from "express";
import morgan from "morgan";

import {
  createLogger,
  generateRequestId,
  LogLevel,
} from "@guyromellemagayano/logger";

// Create app-specific logger with context
const apiLogger = createLogger({
  level: process.env.NODE_ENV === "production" ? LogLevel.INFO : LogLevel.DEBUG,
  defaultContext: {
    component: "api-server",
    metadata: {
      service: "express",
    },
  },
});

// Enhanced Morgan integration with custom logger
const createMorganStream = () => ({
  write: (message: string) => {
    // Remove trailing newline and log as HTTP level
    apiLogger.http(message.trim());
  },
});

// Custom Morgan format with request correlation
morgan.token("id", (req: any) => req.id);
morgan.token("correlation-id", (req: any) => req.correlationId);

const morganFormat =
  process.env.NODE_ENV === "production"
    ? ":id :correlation-id :method :url :status :res[content-length] - :response-time ms"
    : ':id :correlation-id :method :url :status :res[content-length] - :response-time ms ":user-agent"';

export const createServer = (): Express => {
  const app = express();

  app
    .disable("x-powered-by")
    // Add request correlation middleware

    .use((req: any, res, next) => {
      req.id = generateRequestId();
      req.correlationId = req.headers["x-correlation-id"] || req.id;

      // Add correlation ID to response headers
      res.setHeader("x-correlation-id", req.correlationId);

      // Create request-scoped logger
      req.logger = apiLogger.child({
        requestId: req.id,
        metadata: {
          correlationId: req.correlationId,
          method: req.method,
          url: req.originalUrl,
        },
      });

      next();
    })
    // Enhanced Morgan with custom stream
    .use(
      morgan(morganFormat, {
        stream: createMorganStream(),
        // eslint-disable-next-line unused-imports/no-unused-vars
        skip: (req, res) => {
          // Skip health checks in production
          return (
            process.env.NODE_ENV === "production" &&
            req.originalUrl === "/status"
          );
        },
      })
    )
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  const messageHandler: RequestHandler = (req: any, res) => {
    req.logger.info("Processing message request", {
      name: req.params.name,
      userAgent: req.get("User-Agent"),
    });

    res.json({ message: `hello ${req.params.name}` });
  };

  const statusHandler: RequestHandler = (req: any, res) => {
    req.logger.debug("Health check requested");
    res.json({ ok: true });
  };

  // Error handling middleware
  // eslint-disable-next-line unused-imports/no-unused-vars
  app.use((error: Error, req: any, res: any, next: any) => {
    req.logger.error("Unhandled error in request", error, {
      stack: error.stack,
      path: req.path,
      method: req.method,
    });

    res.status(500).json({
      error: "Internal Server Error",
      correlationId: req.correlationId,
    });
  });

  app.get("/message/:name", messageHandler);
  app.get("/status", statusHandler);

  return app;
};
