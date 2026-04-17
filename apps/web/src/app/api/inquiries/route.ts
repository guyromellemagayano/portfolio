/**
 * @file apps/web/src/app/api/inquiries/route.ts
 * @author Guy Romelle Magayano
 * @description Handles portfolio inquiry submissions with validation, rate limiting, and optional webhook forwarding.
 */

import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import logger from "@portfolio/logger";

export const runtime = "nodejs";

type UnknownRecord = Record<string, unknown>;
type InquiryPayload = {
  name: string;
  email: string;
  message: string;
  service: string;
  source: string;
  company?: string;
  budget?: string;
  timeline?: string;
  website?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  submittedAt: string;
};
type RateLimitWindow = {
  resetAt: number;
  count: number;
};
type WebhookResult = {
  ok: boolean;
  status?: number;
  error?: string;
};

const INQUIRY_MAX_PER_WINDOW = parsePositiveInt(
  "INQUIRIES_MAX_PER_WINDOW",
  6,
  1,
  30
);
const INQUIRY_WINDOW_MS = parsePositiveInt(
  "INQUIRIES_WINDOW_MS",
  10 * 60 * 1000,
  30_000,
  6 * 60 * 60 * 1000
);
const WEBHOOK_TIMEOUT_MS = parsePositiveInt(
  "INQUIRY_WEBHOOK_TIMEOUT_MS",
  8_000,
  1_000,
  20_000
);

const ALLOWED_SERVICE_VALUES = new Set([
  "Architecture Review",
  "Technical Advisory",
  "Delivery Sprint",
  "General Inquiry",
]);
const RATE_LIMIT_STORE = new Map<string, RateLimitWindow>();

/** Reads and trims an env var from runtime. */
function getEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
}

/** Reads, validates, and clamps a positive integer env var. */
function parsePositiveInt(
  key: string,
  fallback: number,
  min: number,
  max: number
): number {
  const value = Number.parseInt(getEnvVar(key), 10);

  if (!Number.isFinite(value) || value < min || value > max) {
    return fallback;
  }

  return value;
}

/** Reads and normalizes a boolean env var. */
function parseBooleanEnv(key: string, fallback: boolean): boolean {
  const value = getEnvVar(key).toLowerCase();

  if (!value) {
    return fallback;
  }

  if (value === "true" || value === "1" || value === "yes") {
    return true;
  }

  if (value === "false" || value === "0" || value === "no") {
    return false;
  }

  return fallback;
}

/** Derives a single requester identity string from common proxy headers. */
function getRequesterIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(",");
    const normalized = firstIp?.trim();
    if (normalized) {
      return normalized;
    }
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "anonymous"
  );
}

/** Returns true when a request wants a JSON response path. */
function isJsonRequest(request: NextRequest): boolean {
  const acceptHeader = request.headers.get("accept")?.toLowerCase() ?? "";
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (contentType.includes("application/json")) {
    return true;
  }

  return acceptHeader.includes("application/json");
}

/** Parses request body from form/urlencoded or JSON submissions. */
async function parseRequestPayload(
  request: NextRequest
): Promise<UnknownRecord | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as UnknownRecord;

    return body && typeof body === "object" && !Array.isArray(body)
      ? body
      : null;
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

/** Gets a normalized string value from an unknown payload entry. */
function normalizeString(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

/** Gets normalized long-form text and preserves new lines. */
function normalizeLongText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\r\n/g, "\n")
    .replace(/\u0000/g, "")
    .trim();
}

/** Validates and normalizes an inquiry payload. */
function normalizeAndValidateInquiry(
  rawPayload: UnknownRecord
): { success: true; data: InquiryPayload } | { success: false; code: string } {
  const name = normalizeString(rawPayload.name);
  const email = normalizeString(rawPayload.email);
  const message = normalizeLongText(rawPayload.message);
  const company = normalizeString(rawPayload.company);
  const budget = normalizeString(rawPayload.budget);
  const timeline = normalizeString(rawPayload.timeline);
  const service = normalizeString(rawPayload.service) || "General Inquiry";
  const website = normalizeString(rawPayload.website);
  const source = normalizeString(rawPayload.source) || "hire-page";

  if (website.length > 0) {
    return { success: false, code: "spam_detected" };
  }

  if (name.length < 2 || name.length > 120) {
    return { success: false, code: "invalid_name" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 254) {
    return { success: false, code: "invalid_email" };
  }

  if (message.length < 15 || message.length > 5000) {
    return { success: false, code: "invalid_message" };
  }

  if (company.length > 160) {
    return { success: false, code: "invalid_company" };
  }

  if (budget.length > 80) {
    return { success: false, code: "invalid_budget" };
  }

  if (timeline.length > 80) {
    return { success: false, code: "invalid_timeline" };
  }

  if (!ALLOWED_SERVICE_VALUES.has(service)) {
    return { success: false, code: "invalid_service" };
  }

  return {
    success: true,
    data: {
      name,
      email,
      message,
      company,
      budget,
      timeline,
      service,
      source,
      submittedAt: new Date().toISOString(),
    },
  };
}

/** Checks whether the requester is inside the in-memory submission window. */
function isRateLimited(ip: string): {
  limited: boolean;
  retryAfterSec: number;
} {
  const now = Date.now();
  const existing = RATE_LIMIT_STORE.get(ip);

  if (!existing || existing.resetAt <= now) {
    RATE_LIMIT_STORE.set(ip, {
      count: 1,
      resetAt: now + INQUIRY_WINDOW_MS,
    });

    return { limited: false, retryAfterSec: 0 };
  }

  if (existing.count >= INQUIRY_MAX_PER_WINDOW) {
    const retryAfterSec = Math.ceil((existing.resetAt - now) / 1000);

    return { limited: true, retryAfterSec: Math.max(1, retryAfterSec) };
  }

  existing.count += 1;
  RATE_LIMIT_STORE.set(ip, existing);

  return { limited: false, retryAfterSec: 0 };
}

/** Builds an outbound webhook payload for optional downstream systems. */
function buildWebhookPayload(
  inquiry: InquiryPayload,
  request: NextRequest
): {
  version: string;
  event: string;
  payload: Omit<InquiryPayload, "ipAddress" | "userAgent">;
  metadata: {
    source: string;
    ipAddress: string;
    userAgent: string | null;
    referrer: string | null;
    receivedAt: string;
  };
} {
  const payload = {
    version: "1.0.0",
    event: "portfolio.inquiry.submitted",
    payload: {
      name: inquiry.name,
      email: inquiry.email,
      message: inquiry.message,
      service: inquiry.service,
      source: inquiry.source,
      company: inquiry.company,
      budget: inquiry.budget,
      timeline: inquiry.timeline,
      submittedAt: inquiry.submittedAt,
    },
    metadata: {
      source: "web-portfolio",
      ipAddress: inquiry.ipAddress ?? "redacted",
      userAgent: inquiry.userAgent ?? null,
      referrer: request.headers.get("referer"),
      receivedAt: inquiry.submittedAt,
    },
  };

  return payload;
}

/** Optionally forwards inquiry payloads to third-party endpoints. */
async function forwardToWebhook(
  inquiry: InquiryPayload,
  request: NextRequest
): Promise<WebhookResult> {
  const webhookUrl = getEnvVar("INQUIRIES_WEBHOOK_URL");

  if (!webhookUrl) {
    return { ok: true };
  }

  const webhookSecret = getEnvVar("INQUIRIES_WEBHOOK_SECRET");
  const payload = buildWebhookPayload(inquiry, request);
  const payloadJson = JSON.stringify(payload);
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-portfolio-inquiry-source": "portfolio-web",
  };

  if (webhookSecret) {
    const signature = createHmac("sha256", webhookSecret)
      .update(payloadJson)
      .digest("hex");

    headers["x-portfolio-inquiry-signature"] = signature;
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: payloadJson,
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!webhookResponse.ok) {
      const webhookBody = await webhookResponse
        .text()
        .catch(() => "Unable to read webhook response body");

      return {
        ok: false,
        status: webhookResponse.status,
        error: webhookBody.slice(0, 200),
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown webhook forwarding error",
    };
  }
}

/** Creates a redirect or JSON error body depending on request capabilities. */
function buildResponse(
  request: NextRequest,
  status: "success" | "error",
  payload?: {
    code?: string;
    message?: string;
    statusCode?: number;
  }
): NextResponse {
  const defaultErrorCode = {
    "validation-error": "invalid_payload",
    "rate-limit": "rate_limited",
    "webhook-required": "webhook_required",
    unexpected: "unexpected",
  };
  const code =
    status === "success"
      ? "submission_success"
      : (payload?.code ?? "unexpected");
  const statusCode = payload?.statusCode ?? (status === "success" ? 200 : 400);

  if (isJsonRequest(request)) {
    return NextResponse.json(
      {
        success: status === "success",
        error:
          status === "error"
            ? {
                code,
                message: payload?.message,
              }
            : null,
      },
      { status: statusCode }
    );
  }

  const redirectUrl = new URL("/hire", request.url);

  if (status === "success") {
    redirectUrl.searchParams.set("success", "1");
  } else {
    redirectUrl.searchParams.set(
      "error",
      defaultErrorCode[code as keyof typeof defaultErrorCode] ?? code
    );
  }

  return NextResponse.redirect(redirectUrl, { status: 303 });
}

/** Handles incoming inquiry submissions from the /hire page. */
export async function POST(request: NextRequest) {
  const requesterIp = getRequesterIp(request);

  const rateLimit = isRateLimited(requesterIp);
  if (rateLimit.limited) {
    logger.warn("Inquiry API request was blocked by rate limiting", {
      component: "web.api.inquiries",
      operation: "POST",
      ipAddress: requesterIp,
      metadata: { retryAfterSeconds: rateLimit.retryAfterSec },
    });

    return buildResponse(request, "error", {
      code: "rate-limit",
      statusCode: 429,
      message: `Rate limit exceeded. Retry in ${rateLimit.retryAfterSec}s.`,
    });
  }

  let rawPayload: UnknownRecord | null = null;

  try {
    rawPayload = await parseRequestPayload(request);
  } catch (error) {
    logger.warn(
      "Inquiry API request payload could not be parsed",
      error instanceof Error ? { message: error.message } : { payload: error },
      {
        component: "web.api.inquiries",
        operation: "POST",
        metadata: {
          ipAddress: requesterIp,
        },
      }
    );

    return buildResponse(request, "error", {
      code: "validation-error",
      statusCode: 400,
      message: "Invalid form payload.",
    });
  }

  if (!rawPayload) {
    return buildResponse(request, "error", {
      code: "validation-error",
      statusCode: 400,
      message: "Invalid form payload.",
    });
  }

  const validation = normalizeAndValidateInquiry(rawPayload);
  if (!validation.success) {
    logger.warn("Inquiry API request failed validation", {
      component: "web.api.inquiries",
      operation: "POST",
      metadata: {
        ipAddress: requesterIp,
        code: validation.code,
        hasMessage: Boolean(rawPayload.message),
      },
    });

    return buildResponse(request, "error", {
      code: "validation-error",
      statusCode: 400,
      message: "Submission validation failed.",
    });
  }

  const inquiry: InquiryPayload = {
    ...validation.data,
    referrer: request.headers.get("referer") ?? undefined,
    ipAddress: requesterIp,
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  const webhookResult = await forwardToWebhook(inquiry, request);
  const requireWebhook = parseBooleanEnv(
    "INQUIRIES_REQUIRE_WEBHOOK_DELIVERY",
    false
  );

  if (!webhookResult.ok) {
    if (requireWebhook) {
      logger.error("Inquiry webhook delivery failed in strict mode", {
        component: "web.api.inquiries",
        operation: "forwardToWebhook",
        metadata: {
          webhookStatus: webhookResult.status,
          webhookError: webhookResult.error,
        },
      });

      return buildResponse(request, "error", {
        code: "webhook-required",
        statusCode: 502,
        message: "Inquiry forwarding service is unavailable.",
      });
    }

    logger.warn("Inquiry webhook delivery failed; continuing fallback flow", {
      component: "web.api.inquiries",
      operation: "forwardToWebhook",
      metadata: {
        webhookStatus: webhookResult.status,
        webhookError: webhookResult.error,
      },
    });
  }

  logger.info("Inquiry submitted", {
    component: "web.api.inquiries",
    operation: "POST",
    metadata: {
      service: inquiry.service,
      hasCompany: Boolean(inquiry.company),
    },
  });

  return buildResponse(request, "success", { statusCode: 303 });
}

/** Explicitly reject unsupported methods for clarity. */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: { code: "METHOD_NOT_ALLOWED", message: "POST only." },
    },
    { status: 405 }
  );
}
